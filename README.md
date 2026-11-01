# ASTRA SENSE // ORBITAL GUARD
## NASA Space Apps Challenge
### Autonomous Physiological Surveillance, AI Intelligence & Clinical Decision Support for Deep Space Missions

**ASTRA SENSE / ORBITAL GUARD** is an aerospace-grade, offline-first health monitoring and mission continuity intelligence system designed for multi-astronaut interplanetary missions (Lunar Gateway, Mars Transit, and Surface Operations). 

It is engineered to operate with **zero dependency on real-time Earth connectivity**, providing autonomous clinical intelligence during high-latency (14 to 24-minute round-trip delay) Deep Space Network (DSN) windows and total Wi-Fi / Earth disconnections.

---

### System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│ REACT + VITE DASHBOARD (NASA-STD-3001 Calm Flight Deck UI)            │
│  - Real-time 60fps Canvas ECG Oscilloscope                             │
│  - Crew Matrix (Duty Handoff & Certified Backup Automation)            │
│  - Personal Baseline & Scikit-Learn Isolation Forest Anomaly Analysis  │
│  - Mission Medic Offline Clinical SOP Checklist & Symptom Interview    │
│  - Med Vault Resource Inventory & Radiation Degradation Tracking       │
│  - Mission Continuity Recovery Timelines & DSN Sync Queue              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / WebSocket (Proxy /api)
┌───────────────────────────────────▼────────────────────────────────────┐
│ PYTHON + FASTAPI BACKEND (Offline Edge Engine)                         │
│  - Data Ingestion & Quality Filtering (SNR, lead contact, noise filter)│
│  - Deterministic Flight Safety Rules (< 1ms immediate alerts)          │
│  - Scikit-Learn Isolation Forest Engine (Unsupervised anomaly scoring) │
│  - Crew Operational Readiness Index (4 dimensions: 68 -> 82/100)       │
│  - 100% Offline NASA SOP Knowledge Base & Semantic Search Retrieval   │
│  - Hybrid Google Gemini 2.0 Flash Assistant (Graceful offline fallback)│
│  - Local SQLite with Write-Ahead Logging (WAL) & Audit Trails          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ ESP32 WEARABLE HARNESS PROTOCOL (10 Hz BLE / Serial Telemetry)         │
│  - Lead-II ECG (mV), SpO2 (%), Pulse (bpm), Skin Temp (°C), IMU 6-Axis │
│  - Packet CRC32 checksums & Lead-off impedance verification            │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Key Capabilities & Differentiators

1. **Earth-Independent Autonomous Edge Intelligence**:
   - Critical health monitoring, biometric anomaly scoring, emergency rule checking, and flight standard operating procedures run **100% locally** on spacecraft hardware.
2. **Simplified, Plain-Language User Experience**:
   - Complex medical and aerospace diagnostics are presented in clear, user-friendly language so crew members can act swiftly without cognitive overload.
3. **Multi-Astronaut Monitoring (4 Crew Profiles)**:
   - **Dr. Elena Vance** (Medical Officer): *Tired (Needs Rest) — Active Health Alert*
   - **Cmdr. Sarah Chen** (Navigation): *Healthy & Alert — Level 2 Flight Medicine Certified Backup*
   - **Lt. Marcus Reyes** (Engineering): *Healthy & Active*
   - **Dr. Kenji Sato** (Research): *Healthy & Focused*
4. **Crew Operational Readiness Index (68/100 -> 82/100)**:
   - Calculates operational readiness across 4 simple dimensions: *Physical Energy*, *Sleep & Rest*, *Backup Readiness*, and *Living Environment*.
   - 1-click duty handoff transfers clinical duties from Dr. Vance to Cmdr. Chen, boosting readiness to 82/100.
5. **Personal Baseline & Scikit-learn Isolation Forest**:
   - Learns individual astronaut baselines to detect subtle physiological degradation (HRV depression, sleep debt, pulse drift) before emergencies happen.
6. **Mission Medic Offline Clinical Protocols**:
   - Step-by-step interactive response checklists for *Fatigue & Rest (SOP-01)*, *Cabin Oxygen (SOP-02)*, and *Heart Rhythm (SOP-03)*.
7. **Hybrid Google Gemini 2.0 AI Assistant**:
   - When connected to Earth, Gemini explains alerts in friendly, conversational language. If disconnected or offline, the local retrieval engine instantly answers without failing.

---

### Quick Start Guide

#### 1. Start the React Frontend Dashboard

```bash
# Install Node dependencies
npm install

# Start Vite dev server on port 5173
npm run dev

# Or build for production deployment
npm run build
npm run preview
```

Open `http://localhost:5173` in your browser.

#### 2. Start the Python FastAPI Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment and install requirements
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt

# Start FastAPI server on port 8000
python run.py
```

- API Base: `http://127.0.0.1:8000`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

#### 3. Running Automated Tests

```bash
# Run pytest automated test suite (11 passed)
.\.venv\Scripts\pytest backend/tests

# Run direct 10-subsystem integration test
.\.venv\Scripts\python backend/test_direct.py
```

---

### Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas 60fps ECG.
- **Backend**: Python 3.12, FastAPI, Pydantic v2, Uvicorn.
- **Machine Learning**: Scikit-learn (Isolation Forest), NumPy, Pandas.
- **AI Intelligence**: Google Gemini 2.0 Flash (`google-genai`) with 100% offline flight SOP fallback.
- **Database**: SQLite with Write-Ahead Logging (WAL mode), optional Supabase cloud sync.
- **IoT / Hardware**: ESP32 wearable sensor packet spec (10 Hz, CRC32 verification).
