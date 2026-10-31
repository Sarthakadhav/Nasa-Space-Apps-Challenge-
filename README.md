# ASTRA SENSE // NASA Space Apps Challenge
## AI-Powered Health Monitoring & Autonomous Medical Decision Support for Astronauts on Long-Duration Space Missions

**ASTRA SENSE** is a flight-grade, multi-astronaut physiological monitoring and clinical decision support system designed specifically for deep space missions (Lunar Gateway, Mars Transit, and Surface Operations). It operates with **zero dependency on real-time Earth communication**, providing autonomous clinical intelligence during high-latency (14 to 24-minute round-trip delay) Deep Space Network (DSN) windows.

---

### Key Capabilities & Differentiators

- **No Generic "AI Gradient" Aesthetics**: Authentic, aerospace-grade flight deck user experience adhering to NASA-STD-3001 human factors engineering.
- **Day & Night Operations Mode**: Switch between high-contrast daylight flight deck mode and night-shift dark space mode.
- **Minimal View Mode**: One-click toggle between an executive minimal summary with catchy astronaut cards and deep-dive multi-channel telemetry streams.
- **Multi-Astronaut Monitoring**: Real-time cross-crew monitoring with individual profiles for all 4 crew members:
  - **Astronaut A (Dr. Elena Vance)**: Medical Officer — *Condition: Fatigued (Active Medical Alert)*
  - **Astronaut B (Cmdr. Sarah Chen)**: Navigation & Flight Dynamics — *Condition: Healthy (Qualified Medical Backup)*
  - **Astronaut C (Lt. Marcus Reyes)**: ECLSS & Flight Engineering — *Condition: Healthy*
  - **Astronaut D (Dr. Kenji Sato)**: Exobiology & Payload Research — *Condition: Healthy*
- **Crew Operational Readiness Index (68/100)**: Illustrative simulated score calculating cross-crew functional redundancy, fatigue accumulation, and operational risk.
- **Workload Redistribution Engine**: 1-click execution to transfer non-urgent medical duties from fatigued Astronaut A to qualified backup Cmdr. Chen, boosting crew readiness from 68/100 to 82/100.
- **Live 60fps ECG & Sensor Reliability**: Dynamic canvas-based Lead-II cardiac waveforms, SNR ratios, electrode impedance checks, and packet loss detection.

---

### Three Levels of Mission Intelligence

```
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 3: MISSION INTELLIGENCE                               │
│ - Med Vault Resource Forecasting                            │
│ - Emergency Scenario Simulation (Depressurization, DCS)    │
│ - Offline DSN Queue & Delayed Earth Synchronization         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ LEVEL 2: CREW INTELLIGENCE                                  │
│ - Multi-Astronaut Operational Readiness (68/100)            │
│ - Responsibility Matrix & Cross-Trained Backup Mapping      │
│ - Dynamic Task Redistribution & Rest Scheduling             │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ LEVEL 1: INDIVIDUAL INTELLIGENCE                            │
│ - Personalized Physiological Baseline Learning              │
│ - Scikit-Learn Isolation Forest Anomaly Scoring (-0.42)     │
│ - Circadian Phase Drift & 72h Sleep Debt Analytics          │
└─────────────────────────────────────────────────────────────┘
```

---

### The 6 Core Modules

1. **Module 1 – ASTRA SENSE (Wearable Health Monitoring)**
   - ESP32 wearable prototype telemetry streamer (10 Hz).
   - Real-time Heart Rate, SpO₂, Core Temperature, and IMU 6-axis motion.
   - Sensor reliability checking (SNR, lead-off detection, battery status).
   - Live 60fps Canvas-based ECG oscilloscope.

2. **Module 2 – PERSONAL BASELINE (Intelligent Health Analysis)**
   - Learns individual astronaut baselines.
   - Scikit-learn Isolation Forest Anomaly Detection (Outlier Score: -0.42).
   - Feature contribution breakdown (HRV drop 44%, sleep debt 32%, pulse drift 18%).
   - Psychomotor Vigilance Test (PVT) reaction latency drift.

3. **Module 3 – CREW MATRIX (Crew Readiness Intelligence - Main Differentiator)**
   - Responsibility mapping across medical, navigation, engineering, and science.
   - Qualified backup crew identification based on NASA flight medicine certifications.
   - Interactive workload redistribution engine.

4. **Module 4 – MED VAULT (Medical Resource Intelligence)**
   - Deep space pharmaceutical & critical equipment inventory.
   - Radiation degradation modeling under galactic cosmic rays.
   - Simulated emergency consumption (Fatigue crisis, Cabin hypoxia, Arrhythmia).

5. **Module 5 – MISSION MEDIC (Offline Medical Assistant)**
   - 100% offline local space medicine clinical protocol database (NASA SOP-01/02/03).
   - Interactive astronaut symptom triage interview.
   - Action recording and local incident logging.

6. **Module 6 – MISSION CONTINUITY (Recovery and Operations)**
   - Rehabilitation and sleep banking recovery milestones.
   - Local encrypted SQLite event cache.
   - Batch sync queue for 14-minute Earth DSN transmissions.

---

### Quick Start (Frontend Development Server)

```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev

# Build for flight deployment
npm run build
```

Open `http://localhost:3000` in your browser.

---

### Backend Integration Contracts (For FastAPI / Flask Team Members)

The frontend is ready to bind to your local Python SQLite/FastAPI endpoints:

- `POST /api/v1/telemetry/ingest`: Ingests raw ESP32 JSON packet with CRC verification.
- `POST /api/v1/ml/isolation-forest`: Runs scikit-learn Isolation Forest scoring.
- `GET /api/v1/crew/readiness`: Returns aggregate crew score (68/100) and distribution suggestions.
- `POST /api/v1/dsn/sync-queue`: Transmits batched local incident logs to Houston Mission Control.
