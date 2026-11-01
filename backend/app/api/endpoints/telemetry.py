import json
from fastapi import APIRouter, HTTPException, status
from app.schemas.telemetry_schema import TelemetryPacket, IngestResponse
from app.database.connection import get_db
from app.intelligence.decision_engine import assess_telemetry_event
from app.core.logging import logger

router = APIRouter()

@router.post("/telemetry/ingest", response_model=IngestResponse, summary="Ingest raw ESP32 packet")
def ingest_telemetry_packet(packet: TelemetryPacket):
    """
    Ingests 10 Hz continuous sensor stream from ESP32 wearable harness.
    Verifies CRC, assesses signal quality, checks safety rules, and evaluates Isolation Forest ML anomaly score.
    """
    # 1. Evaluate event through decision engine
    assessment = assess_telemetry_event(
        astronaut_id=packet.astronaut_id,
        vital_reading={
            "heart_rate_bpm": packet.sensor_stream.heart_rate_bpm,
            "spo2_pct": packet.sensor_stream.spo2_pct,
            "skin_temp_c": packet.sensor_stream.skin_temp_c,
            "hrv": 24.0 if packet.astronaut_id == "AST-01" else 55.0,
            "heartRateBaseline": 64.0 if packet.astronaut_id == "AST-01" else 65.0,
            "tempBaseline": 36.6,
            "sleepDebtHours": 6.4 if packet.astronaut_id == "AST-01" else 0.5,
            "cognitiveLatencyDelta_ms": 185.0 if packet.astronaut_id == "AST-01" else 0.0
        },
        impedance=packet.sensor_stream.impedance_ohms,
        battery=packet.battery_level_pct or 95.0,
        crc_valid=bool(packet.crc32_valid)
    )

    # 2. Persist to SQLite
    with get_db() as conn:
        cursor = conn.cursor()

        # Save raw telemetry entry
        cursor.execute("""
        INSERT INTO telemetry_history (
            packet_id, astronaut_id, timestamp_met, ecg_lead2_mv, spo2_pct,
            heart_rate_bpm, skin_temp_c, imu_accel_g, impedance_ohms,
            battery_level_pct, crc32_valid, quality_status, anomaly_score, is_anomaly
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            packet.packet_id,
            packet.astronaut_id,
            packet.timestamp_met,
            packet.sensor_stream.ecg_lead2_mv,
            packet.sensor_stream.spo2_pct,
            packet.sensor_stream.heart_rate_bpm,
            packet.sensor_stream.skin_temp_c,
            json.dumps(packet.sensor_stream.imu_accel_g),
            packet.sensor_stream.impedance_ohms,
            packet.battery_level_pct,
            1 if packet.crc32_valid else 0,
            assessment["quality_status"],
            assessment["anomaly_score"],
            1 if assessment["is_anomaly"] else 0
        ))

        # Check if astronaut exists and update vitals
        cursor.execute("SELECT vitals, mlModel FROM astronauts WHERE id = ?;", (packet.astronaut_id,))
        row = cursor.fetchone()
        if row:
            current_vitals = json.loads(row["vitals"])
            current_vitals["heartRate"] = packet.sensor_stream.heart_rate_bpm
            current_vitals["spo2"] = packet.sensor_stream.spo2_pct
            current_vitals["temperature"] = packet.sensor_stream.skin_temp_c

            current_ml = json.loads(row["mlModel"])
            current_ml["anomalyScore"] = assessment["anomaly_score"]
            current_ml["status"] = assessment["ml_status"]

            cursor.execute("""
            UPDATE astronauts
            SET vitals = ?, mlModel = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
            """, (json.dumps(current_vitals), json.dumps(current_ml), packet.astronaut_id))

        # Trigger automatic health alert if critical or high anomaly
        if assessment.get("safety_alert"):
            alert_id = f"ALT-{packet.timestamp_met.replace(':', '-')}-{packet.packet_id}"
            cursor.execute("""
            INSERT OR IGNORE INTO health_alerts (
                id, astronaut_id, severity, type, message, status, created_at_met
            ) VALUES (?, ?, ?, ?, ?, 'NEW', ?)
            """, (
                alert_id,
                packet.astronaut_id,
                assessment["safety_severity"],
                "Physiological Safety Rule Violation",
                assessment["safety_alert"],
                packet.timestamp_met
            ))
            logger.warning(f"Safety Alert Generated: {assessment['safety_alert']}")

        conn.commit()

    return IngestResponse(
        status="ACCEPTED" if assessment["quality_status"] == "OPTIMAL" else assessment["quality_status"],
        packet_id=packet.packet_id,
        astronaut_id=packet.astronaut_id,
        quality_status=assessment["quality_status"],
        is_anomaly=assessment["is_anomaly"],
        anomaly_score=assessment["anomaly_score"],
        safety_alert=assessment.get("safety_alert"),
        processed_at_met=packet.timestamp_met
    )

@router.get("/telemetry/history/{astronaut_id}", summary="Get recent telemetry history")
def get_telemetry_history(astronaut_id: str, limit: int = 50):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        SELECT * FROM telemetry_history
        WHERE astronaut_id = ?
        ORDER BY id DESC LIMIT ?;
        """, (astronaut_id, limit))
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
