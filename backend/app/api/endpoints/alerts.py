import json
import time
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from app.database.connection import get_db
from app.schemas.alert_schema import AlertItem, AlertAcknowledgeRequest, AlertResolveRequest
from app.core.logging import logger

router = APIRouter()

@router.get("/alerts", summary="Get all active and historical alerts")
def get_alerts(status_filter: Optional[str] = None):
    with get_db() as conn:
        cursor = conn.cursor()
        if status_filter:
            cursor.execute("SELECT * FROM health_alerts WHERE status = ? ORDER BY created_at DESC;", (status_filter,))
        else:
            cursor.execute("SELECT * FROM health_alerts ORDER BY created_at DESC;")
        rows = cursor.fetchall()
        result = []
        for r in rows:
            d = dict(r)
            d["actions_taken"] = json.loads(d.get("actions_taken") or "[]")
            result.append(d)
        return result

@router.post("/alerts/{alert_id}/acknowledge", summary="Acknowledge active alert")
def acknowledge_alert(alert_id: str, req: AlertAcknowledgeRequest):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM health_alerts WHERE id = ?;", (alert_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Alert not found.")

        actions = json.loads(row["actions_taken"] or "[]")
        if req.notes:
            actions.append(f"Acknowledged by {req.officer_id}: {req.notes}")
        else:
            actions.append(f"Acknowledged by {req.officer_id}")

        cursor.execute("""
        UPDATE health_alerts
        SET status = 'ACKNOWLEDGED',
            acknowledged_by = ?,
            acknowledged_at_met = ?,
            actions_taken = ?
        WHERE id = ?;
        """, (req.officer_id, "MET 142d 04:40:00", json.dumps(actions), alert_id))
        conn.commit()

    return {"status": "ACKNOWLEDGED", "alert_id": alert_id, "officer": req.officer_id}

@router.post("/alerts/{alert_id}/resolve", summary="Resolve active alert")
def resolve_alert(alert_id: str, req: AlertResolveRequest):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM health_alerts WHERE id = ?;", (alert_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Alert not found.")

        actions = json.loads(row["actions_taken"] or "[]")
        actions.append(f"Resolved by {req.officer_id}: {req.resolution_notes}")

        cursor.execute("""
        UPDATE health_alerts
        SET status = 'RESOLVED',
            resolved_by = ?,
            resolved_at_met = ?,
            actions_taken = ?
        WHERE id = ?;
        """, (req.officer_id, "MET 142d 05:00:00", json.dumps(actions), alert_id))
        conn.commit()

    return {"status": "RESOLVED", "alert_id": alert_id, "officer": req.officer_id}
