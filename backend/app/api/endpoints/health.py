import json
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException
from app.database.connection import get_db
from app.intelligence.baseline_engine import calculate_baseline_deviations
from app.intelligence.anomaly_detection import anomaly_engine

router = APIRouter()

class IsolationForestRequest(BaseModel):
    astronaut_id: Optional[str] = "AST-01"
    heart_rate: Optional[float] = 84.0
    heart_rate_baseline: Optional[float] = 64.0
    hrv: Optional[float] = 24.0
    spo2: Optional[float] = 96.0
    temperature: Optional[float] = 37.1
    temperature_baseline: Optional[float] = 36.6
    sleep_debt_hours: Optional[float] = 6.4
    cognitive_latency_delta_ms: Optional[float] = 185.0

@router.get("/health/{astronaut_id}", summary="Get astronaut health telemetry & status")
def get_astronaut_health(astronaut_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM astronauts WHERE id = ?;", (astronaut_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Astronaut not found.")
        
        vitals = json.loads(row["vitals"])
        ml_model = json.loads(row["mlModel"])
        reliability = json.loads(row["sensorReliability"])

        return {
            "id": row["id"],
            "name": row["name"],
            "condition": row["condition"],
            "conditionSeverity": row["conditionSeverity"],
            "vitals": vitals,
            "sensorReliability": reliability,
            "mlModel": ml_model,
            "baselineComparisons": calculate_baseline_deviations(vitals)
        }

@router.get("/health/{astronaut_id}/baseline", summary="Get personalized baseline comparisons")
def get_personal_baseline(astronaut_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT vitals FROM astronauts WHERE id = ?;", (astronaut_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Astronaut not found.")
        vitals = json.loads(row["vitals"])
        return {
            "astronaut_id": astronaut_id,
            "baselineComparisons": calculate_baseline_deviations(vitals)
        }

@router.post("/ml/isolation-forest", summary="Execute Scikit-learn Isolation Forest scoring")
def run_isolation_forest_scoring(req: IsolationForestRequest):
    """
    Contract endpoint: POST /api/v1/ml/isolation-forest
    Runs Scikit-learn Isolation Forest on astronaut parameters and returns anomaly metrics.
    """
    scoring = anomaly_engine.score_astronaut(
        hr=req.heart_rate,
        hr_baseline=req.heart_rate_baseline,
        hrv=req.hrv,
        spo2=req.spo2,
        temp=req.temperature,
        temp_baseline=req.temperature_baseline,
        sleep_debt=req.sleep_debt_hours,
        latency_drift_ms=req.cognitive_latency_delta_ms
    )
    return {
        "astronaut_id": req.astronaut_id,
        "engine": "Scikit-Learn IsolationForest (n_estimators=100, contamination=0.15)",
        **scoring
    }
