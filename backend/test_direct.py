import sys
from pathlib import Path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from app.database.init_db import init_database
from app.api.endpoints.crew import get_crew, get_crew_readiness, redistribute_workload, reset_crew_simulation
from app.schemas.crew_schema import WorkloadRedistributionRequest
from app.api.endpoints.health import run_isolation_forest_scoring, IsolationForestRequest, get_personal_baseline
from app.api.endpoints.telemetry import ingest_telemetry_packet
from app.schemas.telemetry_schema import TelemetryPacket, SensorStreamData
from app.api.endpoints.assistant import ask_ai_assistant
from app.schemas.assistant_schema import AssistantQueryRequest
from app.api.endpoints.inventory import get_inventory, consume_inventory
from app.schemas.inventory_schema import ConsumeInventoryRequest
from app.api.endpoints.incidents import get_incidents, get_recovery_timelines
from app.api.endpoints.dsn import sync_dsn_queue
from app.api.endpoints.alerts import get_alerts

def main():
    print("=== [1/9] INITIALIZING LOCAL FLIGHT DATABASE ===")
    init_database()
    reset_crew_simulation()
    print("Database tables initialized & seeded with 4 crew profiles.")

    print("\n=== [2/9] TESTING CREW MATRIX & READINESS ===")
    crew = get_crew()
    assert len(crew) == 4, f"Expected 4 astronauts, got {len(crew)}"
    print(f"Crew profiles verified: {[c['name'] for c in crew]}")

    readiness = get_crew_readiness()
    score = readiness["overallScore"] if isinstance(readiness, dict) else readiness.overallScore
    desc = readiness["statusDescription"] if isinstance(readiness, dict) else readiness.statusDescription
    print(f"Initial Crew Readiness: {score}/100")
    print(f"Status Description: {desc}")
    assert score == 68

    print("\n=== [3/9] TESTING WORKLOAD REDISTRIBUTION ENGINE ===")
    redist_req = WorkloadRedistributionRequest(
        primary_astronaut_id="AST-01",
        backup_astronaut_id="AST-02",
        approved_by="Cmdr. Sarah Chen",
        reason="Acute neuro-fatigue and cognitive latency drift (+185ms)"
    )
    redist_res = redistribute_workload(redist_req)
    print(f"Redistribution Status: {redist_res.status}")
    print(f"New Crew Readiness: {redist_res.new_crew_readiness_score}/100")
    print(f"Dr. Vance Condition Now: {redist_res.primary_astronaut['condition']}")
    assert redist_res.new_crew_readiness_score == 82
    assert redist_res.primary_astronaut["condition"] == "Resting / Relieved"

    print("\n=== [4/9] TESTING SCIKIT-LEARN ISOLATION FOREST ANOMALY DETECTION ===")
    ml_req = IsolationForestRequest(
        astronaut_id="AST-01",
        heart_rate=84.0,
        heart_rate_baseline=64.0,
        hrv=24.0,
        spo2=96.0,
        temperature=37.1,
        temperature_baseline=36.6,
        sleep_debt_hours=6.4,
        cognitive_latency_delta_ms=185.0
    )
    ml_res = run_isolation_forest_scoring(ml_req)
    print(f"ML Engine: {ml_res['engine']}")
    print(f"Isolation Forest Anomaly Score: {ml_res['anomalyScore']}")
    print(f"Status: {ml_res['status']}")
    print(f"Contributing Factors: {ml_res['primaryFactors']}")
    assert ml_res["is_anomaly"] is True
    assert ml_res["anomalyScore"] < 0

    print("\n=== [5/9] TESTING ESP32 BIO-TELEMETRY INGESTION ===")
    packet = TelemetryPacket(
        packet_id=142099,
        timestamp_met="142:04:36:20",
        astronaut_id="AST-01",
        sensor_stream=SensorStreamData(
            ecg_lead2_mv=1.14,
            spo2_pct=96.0,
            heart_rate_bpm=84.0,
            skin_temp_c=37.1,
            imu_accel_g=[0.02, 0.04, 0.01],
            impedance_ohms=480.0
        ),
        battery_level_pct=94.0,
        crc32_valid=True
    )
    ingest_res = ingest_telemetry_packet(packet)
    print(f"Ingestion Status: {ingest_res.status}")
    print(f"Signal Quality: {ingest_res.quality_status}")
    print(f"Evaluated Anomaly Score: {ingest_res.anomaly_score}")
    assert ingest_res.packet_id == 142099

    print("\n=== [6/9] TESTING HYBRID AI MEDICAL ASSISTANT (OFFLINE FLIGHT KNOWLEDGE) ===")
    ai_req = AssistantQueryRequest(
        question="What is the protocol for astronaut acute fatigue and cognitive latency drift?",
        astronaut_id="AST-01",
        include_vitals=True
    )
    ai_res = ask_ai_assistant(ai_req)
    print(f"Intelligence Mode: {ai_res.intelligence_mode}")
    print(f"Confidence: {ai_res.confidence}")
    print(f"Answer Preview:\n{ai_res.answer[:250]}...\n")
    print(f"Referenced Protocols: {[p.protocol_id for p in ai_res.referenced_protocols]}")
    assert len(ai_res.referenced_protocols) > 0
    assert "SOP-FATIGUE-01" in [p.protocol_id for p in ai_res.referenced_protocols]

    print("\n=== [7/9] TESTING MED VAULT PHARMACEUTICALS & CONSUMPTION ===")
    inventory = get_inventory()
    print(f"Loaded {len(inventory)} medical items.")
    consume_req = ConsumeInventoryRequest(
        item_id="MED-01",
        quantity=1,
        reason="Flight Fatigue Crisis Protocol Step 4",
        authorized_by="Cmdr. Sarah Chen"
    )
    consume_res = consume_inventory(consume_req)
    print(f"Dispensation: {consume_res['item_name']} - Remaining Stock: {consume_res['remaining_stock']}")

    print("\n=== [8/9] TESTING MISSION CONTINUITY & DSN EARTH SYNC ===")
    incidents = get_incidents()
    print(f"Active incident ledger: {len(incidents)} incidents.")
    recovery = get_recovery_timelines()
    print(f"Recovery tracking active for: {[r['name'] for r in recovery]}")

    dsn_res = sync_dsn_queue()
    print(f"DSN Status: {dsn_res.status}")
    print(f"Synced Events across DSN: {dsn_res.synced_events_count}")
    print(f"Simulated Latency: {dsn_res.latency_seconds}s (Earth-Mars)")

    print("\n=== [9/9] TESTING ALERT MANAGEMENT LIFECYCLE ===")
    alerts = get_alerts()
    print(f"Health Alerts in System: {len(alerts)}")

    print("\n=== [10/10] TESTING SYSTEM STATUS & EMERGENCY DRILL ===")
    from app.api.endpoints.system import get_system_status, trigger_emergency_drill, DrillRequest
    import asyncio
    sys_status = asyncio.run(get_system_status())
    print(f"System Status: {sys_status['status']}, Mode: {sys_status['flight_mode']}")
    print(f"Earth Independent: {sys_status['offline_capabilities']['is_earth_independent']}")

    drill_res = trigger_emergency_drill(DrillRequest(scenario_id="SCENARIO-02"))
    print(f"Emergency Drill Activated: {drill_res['scenario']}, New Crew Readiness: {drill_res['new_crew_readiness']}")
    assert drill_res['new_crew_readiness'] == 48

    print("\n" + "="*60)
    print(">>> ALL 10 ORBITAL GUARD CORE MODULE TESTS PASSED 100%! <<<")
    print("="*60)

if __name__ == "__main__":
    main()
