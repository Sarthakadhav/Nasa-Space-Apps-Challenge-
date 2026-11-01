import json
from pydantic import BaseModel
from fastapi import APIRouter
from app.config import settings
from app.database.connection import get_db
from app.database.supabase_client import supabase_manager
from app.intelligence.anomaly_detection import anomaly_engine
from app.intelligence.crew_readiness import calculate_crew_readiness_metrics

router = APIRouter()

class DrillRequest(BaseModel):
    scenario_id: str = "SCENARIO-02"

@router.get("/system/status", summary="Check backend health, offline readiness, sensors & AI connectivity")
async def get_system_status():
    supabase_status = await supabase_manager.test_connection()
    gemini_configured = bool(settings.GEMINI_API_KEY.strip())

    return {
        "status": "OPERATIONAL",
        "system_name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "flight_mode": "AUTONOMOUS_DEEP_SPACE_MODE",
        "offline_capabilities": {
            "is_earth_independent": True,
            "local_ml_engine": "Scikit-Learn IsolationForest (Online)",
            "local_clinical_protocols": "NASA-STD-3001 SOP-01/02/03 (Loaded)",
            "primary_storage": "SQLite WAL High-Concurrency Local Store"
        },
        "connectivity": {
            "gemini_ai_status": "CONFIGURED_ONLINE" if gemini_configured else "OFFLINE_FALLBACK_ACTIVE",
            "gemini_api_key_present": gemini_configured,
            "supabase_status": supabase_status["status"],
            "supabase_configured": supabase_status["configured"],
            "dsn_latency_seconds": settings.DSN_LATENCY_SECONDS,
            "dsn_latency_display": "14m 22s Earth-Mars Delay"
        },
        "mission_clock": {
            "met_days": settings.DEFAULT_MET_DAYS,
            "mission_phase": "Trans-Mars Coast Phase"
        }
    }

@router.post("/simulation/drill", summary="Simulate emergency flight drill")
def trigger_emergency_drill(req: DrillRequest):
    """
    Simulates mission emergencies:
    - SCENARIO-02: Cabin Depressurization / DCS (SpO2 drops across crew, readiness drops to 48)
    - SCENARIO-03: Acute Arrhythmia on Astronaut D (Heart rate elevates to 132 bpm, Anomaly score -0.78)
    """
    with get_db() as conn:
        cursor = conn.cursor()

        if req.scenario_id == "SCENARIO-02":
            cursor.execute("SELECT id, vitals FROM astronauts;")
            rows = cursor.fetchall()
            for r in rows:
                v = json.loads(r["vitals"])
                v["spo2"] = max(88.0, v["spo2"] - 7.0)
                v["heartRate"] = v["heartRate"] + 25.0
                v["respiration"] = v["respiration"] + 6.0
                cursor.execute("UPDATE astronauts SET vitals = ? WHERE id = ?;", (json.dumps(v), r["id"]))

            # Insert critical alert
            cursor.execute("""
            INSERT OR REPLACE INTO health_alerts (id, astronaut_id, severity, type, message, status, created_at_met)
            VALUES (?, 'ALL_CREW', 'CRITICAL', 'Cabin Depressurization Emergency', 'Micro-meteoroid cabin breach detected. Engage 100% O2 mask (SOP-HYPOXIA-02).', 'NEW', '142:05:10:00');
            """, (f"ALT-DRILL-{req.scenario_id}",))

        elif req.scenario_id == "SCENARIO-03":
            cursor.execute("SELECT vitals, mlModel FROM astronauts WHERE id = 'AST-04';")
            row = cursor.fetchone()
            if row:
                v = json.loads(row["vitals"])
                v["heartRate"] = 132.0
                v["hrv"] = 18.0
                ml = json.loads(row["mlModel"])
                ml["anomalyScore"] = -0.78
                ml["status"] = "CRITICAL CARDIAC OUTLIER"
                cursor.execute("""
                UPDATE astronauts
                SET condition = 'Arrhythmia Alert', conditionSeverity = 'critical', vitals = ?, mlModel = ?
                WHERE id = 'AST-04';
                """, (json.dumps(v), json.dumps(ml)))

            cursor.execute("""
            INSERT OR REPLACE INTO health_alerts (id, astronaut_id, severity, type, message, status, created_at_met)
            VALUES (?, 'AST-04', 'CRITICAL', 'Acute Cardiac Dysrhythmia', 'Dr. Kenji Sato sustained tachycardia at 132 bpm with PVCs. Stage AED (SOP-ARRHYTHMIA-03).', 'NEW', '142:05:15:00');
            """, (f"ALT-DRILL-{req.scenario_id}",))

        conn.commit()

    readiness = calculate_crew_readiness_metrics(active_drill_id=req.scenario_id)
    return {
        "scenario": req.scenario_id,
        "status": "DRILL_ACTIVE",
        "new_crew_readiness": readiness["overallScore"],
        "recommendation": readiness["aiRecommendation"]
    }
