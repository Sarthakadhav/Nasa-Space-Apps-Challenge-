# ORBITAL GUARD // Flight Deck Backend Architecture
## Autonomous Physiological Surveillance & Clinical Decision Support System for Deep Space Missions

ORBITAL GUARD is an aerospace-grade, offline-first backend designed for multi-astronaut interplanetary missions (Lunar Gateway, Mars Transit, and Surface Habitats). It is engineered to operate with **zero dependency on continuous Earth connectivity**, functioning during high-latency Deep Space Network (DSN) windows (14 to 24-minute one-way delay) and complete Wi-Fi / Earth disconnections.

---

### Core Architectural Principles

1. **Earth-Independent Autonomous Edge Intelligence**:
   - Critical health monitoring, biometric anomaly scoring, emergency rule checking, and flight standard operating procedures run **100% locally** on the spacecraft onboard computer using SQLite with Write-Ahead Logging (WAL) and local Scikit-Learn Isolation Forest models.
2. **Hybrid Intelligence Architecture**:
   - **Local Safety Rules**: Immediate deterministic threshold checks (< 1 ms latency).
   - **Local ML Anomaly Engine**: Scikit-learn `IsolationForest` detecting multidimensional physiological drift (HRV depression, circadian phase shift, sleep debt).
   - **Local Flight Medicine Knowledge Base**: Onboard retrieval over NASA flight standard operating procedures (`SOP-FATIGUE-01`, `SOP-HYPOXIA-02`, `SOP-ARRHYTHMIA-03`).
   - **Google Gemini 2.0 Flash (`google-genai`)**: Engaged when external Earth communication is available for natural-language clinical explanations. If disconnected, the system seamlessly and instantly falls back to the onboard knowledge engine without failing.
   - **Supabase Cloud Synchronization**: Synchronizes mission telemetry, alert logs, and incident records when connectivity to Earth is active. During disconnection, events are queued locally in SQLite.

---

### System Directory Layout

```
backend/
├── app/
│   ├── main.py                     # FastAPI application setup, CORS, lifespan, exception handlers
│   ├── config.py                   # Environment configuration & settings
│   ├── api/
│   │   ├── router.py               # API V1 router aggregation
│   │   └── endpoints/
│   │       ├── telemetry.py        # ESP32 packet ingestion, CRC verification, live history
│   │       ├── crew.py             # 4 crew profiles, readiness index (68->82), workload redistribution
│   │       ├── health.py           # Individual health summary, baseline comparisons, Isolation Forest
│   │       ├── alerts.py           # Alert lifecycle (NEW -> ACKNOWLEDGED -> RESOLVED)
│   │       ├── assistant.py        # Hybrid AI assistant (Gemini 2.0 + Offline Flight SOPs)
│   │       ├── inventory.py        # Med Vault inventory, cosmic radiation degradation, consumption
│   │       ├── incidents.py        # Offline incident ledger, recovery milestones
│   │       ├── dsn.py              # Earth Deep Space Network batch sync queue (14m 22s latency)
│   │       └── system.py           # System health check, autonomous mode, emergency drills
│   ├── core/
│   │   ├── security.py             # CRC32 verification and hardware integrity
│   │   ├── logging.py              # Aerospace flight deck logger
│   │   └── exceptions.py           # Domain exceptions
│   ├── database/
│   │   ├── connection.py           # SQLite connection with WAL mode enabled
│   │   ├── init_db.py              # Table DDL & initial seed datasets
│   │   └── supabase_client.py      # Supabase cloud synchronization client with offline fallback
│   ├── intelligence/
│   │   ├── safety_rules.py         # Deterministic spaceflight clinical safety thresholds
│   │   ├── data_quality.py         # Signal-to-noise ratio, lead contact, noise filtering
│   │   ├── baseline_engine.py      # Individual baseline deviation calculation
│   │   ├── anomaly_detection.py    # Scikit-learn Isolation Forest model training & scoring
│   │   ├── crew_readiness.py       # Operational readiness index (4 dimensions: 68/100 -> 82/100)
│   │   └── decision_engine.py      # Fusion of safety rules, baselines, and ML anomaly
│   ├── local_ai/
│   │   ├── knowledge_base.py       # NASA Flight Medicine Standard Operating Procedures (SOPs)
│   │   └── local_retrieval.py      # Fast keyword/semantic scoring retrieval engine (100% offline)
│   └── ai/
│       └── gemini_service.py       # Google GenAI client (Gemini Flash) with automated local fallback
├── tests/
│   ├── __init__.py
│   └── test_backend.py             # 11 comprehensive automated tests
├── test_direct.py                  # End-to-end direct subsystem verification script
├── test_api_suite.py               # Async HTTP test suite
├── .env                            # Active environment configuration
├── .env.example                    # Environment template
├── pytest.ini                      # Pytest configuration
├── requirements.txt                # Python dependencies
└── run.py                          # Server launcher
```

---

### Quick Start Guide

#### 1. Setup Virtual Environment & Dependencies

```bash
# Windows
python -m venv .venv
.\.venv\Scripts\pip install -r backend/requirements.txt
```

#### 2. Configure Environment

Copy `.env.example` to `.env`:
```bash
cp backend/.env.example backend/.env
```

Optional keys:
- `GEMINI_API_KEY`: Enter your Google AI Studio API key if testing cloud assistance. (If left blank, the system automatically uses 100% offline local flight SOPs).
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`: Enter your Supabase project keys if testing remote synchronization. (If left blank, local SQLite remains the primary flight store).

#### 3. Start the FastAPI Server

```bash
cd backend
python run.py
```
The server will boot on `http://localhost:8000`.

- **Interactive Swagger Documentation**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

---

### Core API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | System flight deck root and API documentation links |
| `POST` | `/api/v1/telemetry/ingest` | Ingests 10 Hz ESP32 sensor packet, verifies CRC, checks safety rules, evaluates ML anomaly |
| `GET` | `/api/v1/telemetry/history/{astronaut_id}` | Returns recent historical telemetry packets |
| `GET` | `/api/v1/crew` | Fetches all 4 astronaut profiles with vitals and ML models |
| `GET` | `/api/v1/crew/{astronaut_id}` | Fetches individual astronaut profile |
| `GET` | `/api/v1/crew/readiness` | Returns crew operational readiness index (68/100 or 82/100) and dimensional breakdown |
| `POST` | `/api/v1/crew/redistribute` | Executes workload redistribution from fatigued Astronaut A to Cmdr. Sarah Chen |
| `POST` | `/api/v1/crew/reset` | Resets simulations to initial nominal flight baseline |
| `POST` | `/api/v1/ml/isolation-forest` | Executes Scikit-learn Isolation Forest scoring and feature importance |
| `GET` | `/api/v1/health/{astronaut_id}` | Returns health profile and baseline comparisons |
| `GET` | `/api/v1/health/{astronaut_id}/baseline` | Returns personal baseline deviation table |
| `GET` | `/api/v1/alerts` | Lists all active and historical alerts |
| `POST` | `/api/v1/alerts/{alert_id}/acknowledge` | Acknowledges an active alert with officer ID |
| `POST` | `/api/v1/alerts/{alert_id}/resolve` | Resolves an active alert with clinical notes |
| `POST` | `/api/v1/assistant/ask` | Queries Hybrid AI Assistant (Gemini 2.0 when online, NASA Flight SOPs when offline) |
| `GET` | `/api/v1/inventory` | Lists all pharmaceutical and equipment supplies in Med Vault |
| `POST` | `/api/v1/inventory/consume` | Dispenses medication or equipment and checks reserve threshold |
| `GET` | `/api/v1/inventory/scenarios` | Lists simulated emergency supply scenarios |
| `GET` | `/api/v1/incidents` | Fetches mission continuity incident ledger |
| `POST` | `/api/v1/incidents` | Records a new incident in offline ledger |
| `GET` | `/api/v1/recovery` | Fetches active crew rehabilitation trajectories |
| `POST` | `/api/v1/dsn/sync-queue` | Batches cached incidents for transmission across Deep Space Network |
| `GET` | `/api/v1/system/status` | Comprehensive status of sensors, offline engines, Gemini, and Supabase |
| `POST` | `/api/v1/simulation/drill` | Simulates cabin depressurization or acute arrhythmia drill |

---

### Running Automated Verification Tests

```bash
# Run complete test suite with pytest
cd backend
pytest -c pytest.ini -v

# Or run direct verification script
python test_direct.py
```
