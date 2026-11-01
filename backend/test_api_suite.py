import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

import asyncio
import httpx
from app.main import app
from app.database.init_db import init_database
from app.api.endpoints.crew import reset_crew_simulation

async def run_suite():
    print("--- 1. Initializing Database ---", flush=True)
    init_database()
    reset_crew_simulation()

    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        print("\n--- 2. Testing Root / Docs ---", flush=True)
        res = await client.get("/")
        assert res.status_code == 200
        print("Root OK:", res.json(), flush=True)

        print("\n--- 3. Testing Crew Endpoints ---", flush=True)
        res_crew = await client.get("/api/v1/crew")
        assert res_crew.status_code == 200
        crew_list = res_crew.json()
        print(f"Crew fetched successfully: {len(crew_list)} astronauts", flush=True)
        for ast in crew_list:
            print(f"  - [{ast['id']}] {ast['name']} ({ast['role']}) - Status: {ast['condition']}, Readiness: {ast['readinessScore']}", flush=True)

        print("\n--- 4. Testing Crew Operational Readiness Index ---", flush=True)
        res_readiness = await client.get("/api/v1/crew/readiness")
        if res_readiness.status_code != 200:
            print("FAILED /api/v1/crew/readiness:", res_readiness.status_code, res_readiness.text)
        assert res_readiness.status_code == 200
        readiness_data = res_readiness.json()
        print(f"Overall Crew Score: {readiness_data['overallScore']}/100", flush=True)
        print(f"Status: {readiness_data['statusDescription']}", flush=True)
        for dim in readiness_data['dimensions']:
            print(f"  * {dim['label']}: {dim['value']}/{dim['max']}", flush=True)

        print("\n--- 5. Testing Workload Redistribution Engine (Module 3) ---", flush=True)
        redist_payload = {
            "primary_astronaut_id": "AST-01",
            "backup_astronaut_id": "AST-02",
            "approved_by": "Cmdr. Sarah Chen",
            "reason": "Elevated neuro-fatigue and cognitive latency drift (+185ms)"
        }
        res_redist = await client.post("/api/v1/crew/redistribute", json=redist_payload)
        assert res_redist.status_code == 200
        redist_data = res_redist.json()
        print(f"Redistribution Status: {redist_data['status']}", flush=True)
        print(f"New Crew Readiness Score: {redist_data['new_crew_readiness_score']}/100", flush=True)
        print(f"Vance Status Now: {redist_data['primary_astronaut']['condition']}", flush=True)

        print("\n--- 6. Testing Scikit-Learn Isolation Forest Scoring (Module 2) ---", flush=True)
        ml_payload = {
            "astronaut_id": "AST-01",
            "heart_rate": 84.0,
            "heart_rate_baseline": 64.0,
            "hrv": 24.0,
            "spo2": 96.0,
            "temperature": 37.1,
            "temperature_baseline": 36.6,
            "sleep_debt_hours": 6.4,
            "cognitive_latency_delta_ms": 185.0
        }
        res_ml = await client.post("/api/v1/ml/isolation-forest", json=ml_payload)
        assert res_ml.status_code == 200
        ml_data = res_ml.json()
        print(f"Isolation Forest Anomaly Score: {ml_data['anomalyScore']}", flush=True)
        print(f"Is Anomaly: {ml_data['is_anomaly']}", flush=True)
        print(f"Status: {ml_data['status']}", flush=True)
        print(f"Primary Contributing Factors: {ml_data['primaryFactors']}", flush=True)

        print("\n--- 7. Testing ESP32 Telemetry Ingestion (Module 1) ---", flush=True)
        esp32_packet = {
            "packet_id": 142098,
            "timestamp_met": "142:04:36:18",
            "astronaut_id": "AST-01",
            "sensor_stream": {
                "ecg_lead2_mv": 1.14,
                "spo2_pct": 96.0,
                "heart_rate_bpm": 84.0,
                "skin_temp_c": 37.1,
                "imu_accel_g": [0.02, 0.04, 0.01],
                "impedance_ohms": 480.0
            },
            "battery_level_pct": 94.0,
            "crc32_valid": True
        }
        res_ingest = await client.post("/api/v1/telemetry/ingest", json=esp32_packet)
        assert res_ingest.status_code == 200
        ingest_data = res_ingest.json()
        print(f"Ingestion Status: {ingest_data['status']}", flush=True)
        print(f"Sensor Quality: {ingest_data['quality_status']}", flush=True)
        print(f"Anomaly Detected: {ingest_data['is_anomaly']}", flush=True)

        print("\n--- 8. Testing Offline AI Medical Assistant (Module 5) ---", flush=True)
        assistant_query = {
            "question": "What is the emergency countermeasure protocol for acute spaceflight fatigue?",
            "astronaut_id": "AST-01",
            "include_vitals": True
        }
        res_ai = await client.post("/api/v1/assistant/ask", json=assistant_query)
        assert res_ai.status_code == 200
        ai_data = res_ai.json()
        print(f"AI Assistant Mode: {ai_data['intelligence_mode']}", flush=True)
        print(f"Confidence: {ai_data['confidence']}", flush=True)
        print("AI Response Answer:\n", ai_data['answer'][:300], "...", flush=True)
        print("Referenced Protocols:", ai_data['referenced_protocols'], flush=True)

        print("\n--- 9. Testing Medical Vault & Emergency Supplies (Module 4) ---", flush=True)
        res_inv = await client.get("/api/v1/inventory")
        assert res_inv.status_code == 200
        inv_list = res_inv.json()
        print(f"Medical inventory loaded: {len(inv_list)} items", flush=True)
        modafinil = next(i for i in inv_list if i["id"] == "MED-01")
        print(f"Modafinil stock: {modafinil['stock']} {modafinil['unit']}", flush=True)

        consume_req = {
            "item_id": "MED-01",
            "quantity": 2,
            "reason": "Fatigue countermeasure dispensation",
            "authorized_by": "Dr. Elena Vance"
        }
        res_consume = await client.post("/api/v1/inventory/consume", json=consume_req)
        assert res_consume.status_code == 200
        print("Dispensed successfully, new stock:", res_consume.json()["remaining_stock"], flush=True)

        print("\n--- 10. Testing Deep Space Network Sync Queue (Module 6) ---", flush=True)
        res_dsn = await client.post("/api/v1/dsn/sync-queue")
        assert res_dsn.status_code == 200
        dsn_data = res_dsn.json()
        print(f"DSN Status: {dsn_data['status']}", flush=True)
        print(f"Synced Events: {dsn_data['synced_events_count']}", flush=True)
        print(f"Details: {dsn_data['details']}", flush=True)

        print("\n--- 11. Testing System Autonomous Health Status ---", flush=True)
        res_sys = await client.get("/api/v1/system/status")
        assert res_sys.status_code == 200
        sys_data = res_sys.json()
        print("System Flight Mode:", sys_data["flight_mode"], flush=True)
        print("Earth Independent:", sys_data["offline_capabilities"]["is_earth_independent"], flush=True)
        print("Gemini Status:", sys_data["connectivity"]["gemini_ai_status"], flush=True)
        print("Supabase Status:", sys_data["connectivity"]["supabase_status"], flush=True)
        print("DSN Latency:", sys_data["connectivity"]["dsn_latency_display"], flush=True)

    print("\n=======================================================", flush=True)
    print("ALL 11 BACKEND SUBSYSTEM VERIFICATION TESTS PASSED 100%!", flush=True)
    print("=======================================================", flush=True)

if __name__ == "__main__":
    asyncio.run(run_suite())
