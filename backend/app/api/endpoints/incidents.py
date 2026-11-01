import json
import time
from typing import List
from fastapi import APIRouter
from app.database.connection import get_db
from app.schemas.incident_schema import IncidentItem, IncidentCreate, RecoveryTimeline
from app.database.supabase_client import supabase_manager
from app.core.logging import logger

router = APIRouter()

@router.get("/incidents", response_model=List[IncidentItem], summary="Get mission incident history")
def get_incidents():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM incidents ORDER BY created_at DESC;")
        rows = cursor.fetchall()
        result = []
        for r in rows:
            d = dict(r)
            d["actionsTaken"] = json.loads(d["actionsTaken"] or "[]")
            result.append(d)
        return result

@router.post("/incidents", summary="Record a new incident in offline ledger")
async def create_incident(inc: IncidentCreate):
    incident_id = f"INC-2026-{int(time.time())}"
    timestamp_met = "MET 142d 04:45:00"

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO incidents (
            id, timestamp, severity, type, targetAstronautId, targetAstronautName,
            summary, resolutionStatus, syncStatus, assignedOfficer, actionsTaken
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active - Action Pending', 'Queued for Earth DSN Sync', ?, ?);
        """, (
            incident_id,
            timestamp_met,
            inc.severity,
            inc.type,
            inc.targetAstronautId,
            inc.targetAstronautName,
            inc.summary,
            inc.assignedOfficer,
            json.dumps(inc.actionsTaken)
        ))
        conn.commit()

    # Attempt Supabase sync if online and configured
    sync_result = await supabase_manager.sync_incident({
        "id": incident_id,
        "timestamp": timestamp_met,
        "severity": inc.severity,
        "type": inc.type,
        "target_astronaut": inc.targetAstronautName,
        "summary": inc.summary,
        "assigned_officer": inc.assignedOfficer
    })

    return {
        "status": "RECORDED_LOCALLY",
        "incident_id": incident_id,
        "sync_status": sync_result.get("status", "CACHED_LOCALLY"),
        "timestamp": timestamp_met
    }

@router.get("/recovery", response_model=List[RecoveryTimeline], summary="Get active crew recovery trajectories")
def get_recovery_timelines():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM recovery_timelines;")
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
