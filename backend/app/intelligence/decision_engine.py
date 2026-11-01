from typing import Dict, Any, Optional
from app.intelligence.safety_rules import evaluate_physiological_safety
from app.intelligence.data_quality import assess_sensor_quality
from app.intelligence.anomaly_detection import anomaly_engine
from app.intelligence.baseline_engine import calculate_baseline_deviations

def assess_telemetry_event(
    astronaut_id: str,
    vital_reading: Dict[str, Any],
    impedance: float = 480.0,
    battery: float = 95.0,
    crc_valid: bool = True
) -> Dict[str, Any]:
    """
    Combined decision engine:
    1. Sensor Quality & Signal-to-Noise check
    2. Deterministic Life-Safety Rules
    3. Scikit-learn Isolation Forest ML Anomaly Detection
    4. Personal Baseline Deviation
    """
    hr = vital_reading.get("heart_rate_bpm") or vital_reading.get("heartRate", 70.0)
    spo2 = vital_reading.get("spo2_pct") or vital_reading.get("spo2", 98.0)
    temp = vital_reading.get("skin_temp_c") or vital_reading.get("temperature", 36.6)
    hrv = vital_reading.get("hrv", 50.0)

    # 1. Data Quality Gate
    quality_status, quality_desc, snr_db = assess_sensor_quality(
        spo2=spo2, hr=hr, impedance=impedance, battery=battery, crc_valid=crc_valid
    )

    if quality_status in ("CORRUPTED_CRC", "INVALID_RANGE"):
        return {
            "status": "RECHECK_REQUIRED",
            "quality_status": quality_status,
            "quality_description": quality_desc,
            "snr_db": snr_db,
            "is_anomaly": False,
            "anomaly_score": 0.0,
            "safety_alert": None,
            "action_required": "QUARANTINE_PACKET"
        }

    # 2. Safety Rules Check (Synchronous deterministic)
    safety_result = evaluate_physiological_safety(
        hr=hr, spo2=spo2, temp=temp, hrv=hrv, impedance=impedance
    )

    # 3. ML Isolation Forest Anomaly Detection
    ml_result = anomaly_engine.score_astronaut(
        hr=hr,
        hr_baseline=vital_reading.get("heartRateBaseline", 65.0),
        hrv=hrv,
        spo2=spo2,
        temp=temp,
        temp_baseline=vital_reading.get("tempBaseline", 36.6),
        sleep_debt=vital_reading.get("sleepDebtHours", 0.0),
        latency_drift_ms=vital_reading.get("cognitiveLatencyDelta_ms", 0.0)
    )

    return {
        "status": "PROCESSED",
        "quality_status": quality_status,
        "quality_description": quality_desc,
        "snr_db": snr_db,
        "safety_alert": safety_result.message if safety_result else None,
        "safety_severity": safety_result.severity if safety_result else "NOMINAL",
        "is_critical": safety_result.is_critical if safety_result else False,
        "is_anomaly": ml_result["is_anomaly"],
        "anomaly_score": ml_result["anomalyScore"],
        "ml_status": ml_result["status"],
        "primary_factors": ml_result["primaryFactors"]
    }
