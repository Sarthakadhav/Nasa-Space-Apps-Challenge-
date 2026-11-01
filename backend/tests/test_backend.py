import pytest
import httpx
from app.main import app
from app.api.endpoints.crew import reset_crew_simulation

@pytest.fixture(autouse=True)
def setup_baseline():
    reset_crew_simulation()

@pytest.mark.anyio
async def test_root_endpoint():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "FLIGHT_ACTIVE"
        assert "/docs" in data["api_documentation"]

@pytest.mark.anyio
async def test_get_crew():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/crew")
        assert res.status_code == 200
        data = res.json()
        assert len(data) == 4
        vance = next(a for a in data if a["id"] == "AST-01")
        assert vance["name"] == "Dr. Elena Vance"

@pytest.mark.anyio
async def test_crew_readiness():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/crew/readiness")
        assert res.status_code == 200
        data = res.json()
        assert data["overallScore"] == 68
        assert len(data["dimensions"]) == 4

@pytest.mark.anyio
async def test_workload_redistribution():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        payload = {
            "primary_astronaut_id": "AST-01",
            "backup_astronaut_id": "AST-02",
            "approved_by": "Cmdr. Sarah Chen",
            "reason": "Elevated neuro-fatigue and cognitive latency drift"
        }
        res = await client.post("/api/v1/crew/redistribute", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "EXECUTED"
        assert data["new_crew_readiness_score"] == 82
        assert data["primary_astronaut"]["condition"] == "Resting / Relieved"

@pytest.mark.anyio
async def test_isolation_forest_scoring():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        payload = {
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
        res = await client.post("/api/v1/ml/isolation-forest", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "anomalyScore" in data
        assert data["anomalyScore"] < 0
        assert data["is_anomaly"] is True

@pytest.mark.anyio
async def test_telemetry_ingest():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        sample_packet = {
            "packet_id": 142099,
            "timestamp_met": "142:04:36:20",
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
        res = await client.post("/api/v1/telemetry/ingest", json=sample_packet)
        assert res.status_code == 200
        data = res.json()
        assert data["quality_status"] == "OPTIMAL"
        assert data["packet_id"] == 142099

@pytest.mark.anyio
async def test_offline_ai_assistant():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        payload = {
            "question": "What is the clinical protocol for astronaut acute fatigue and high sleep debt?",
            "astronaut_id": "AST-01",
            "include_vitals": True
        }
        res = await client.post("/api/v1/assistant/ask", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "answer" in data
        assert len(data["answer"]) > 20
        assert data["intelligence_mode"] in ("ONLINE_GEMINI_AI", "OFFLINE_FLIGHT_KNOWLEDGE")

@pytest.mark.anyio
async def test_medical_inventory():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/inventory")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 8

@pytest.mark.anyio
async def test_inventory_consume():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        payload = {
            "item_id": "MED-01",
            "quantity": 1,
            "reason": "Emergency fatigue countermeasure",
            "authorized_by": "Dr. Elena Vance"
        }
        res = await client.post("/api/v1/inventory/consume", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "DISPENSED"

@pytest.mark.anyio
async def test_dsn_sync_queue():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post("/api/v1/dsn/sync-queue")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "DSN_TRANSMISSION_COMPLETE"

@pytest.mark.anyio
async def test_system_status():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/system/status")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "OPERATIONAL"
        assert data["offline_capabilities"]["is_earth_independent"] is True
