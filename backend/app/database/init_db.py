import json
import sqlite3
from app.database.connection import get_db
from app.core.logging import logger

INITIAL_CREW = [
    {
        "id": "AST-01",
        "name": "Dr. Elena Vance",
        "callsign": "Vance",
        "role": "Medical Officer",
        "dutyCategory": "Medical",
        "condition": "Tired (Needs Rest)",
        "conditionSeverity": "warning",
        "photo": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
        "avatar": "EV",
        "age": 38,
        "bloodType": "O+",
        "missionDay": 142,
        "suitId": "EVA-SUIT-03",
        "readinessScore": 52,
        "readinessBreakdown": json.dumps({"physical": 64, "cognitive": 46, "circadian": 42, "cardiovascular": 56}),
        "vitals": json.dumps({
            "heartRate": 84, "heartRateBaseline": 64,
            "spo2": 96, "spo2Baseline": 98,
            "temperature": 37.1, "tempBaseline": 36.6,
            "hrv": 24, "hrvBaseline": 55,
            "respiration": 18, "respirationBaseline": 14,
            "bloodPressure": "128/86", "bpBaseline": "116/74",
            "imuActivity": "Restless / Low",
            "sleepDebtHours": 6.4, "sleepLast24h": 3.2, "deepSleepPercent": 8,
            "circadianPhaseShiftHours": 2.8,
            "radiationDoseDaily_mSv": 0.84, "radiationCumulative_mSv": 118.6
        }),
        "sensorReliability": json.dumps({
            "overall": 98, "leadContact": "Nominal", "signalToNoiseRatio": 28.4,
            "packetLossPercent": 0.2, "hardwareStatus": "ESP32 Active"
        }),
        "mlModel": json.dumps({
            "anomalyScore": -0.42, "status": "Unusual Pattern (Needs Rest)",
            "primaryFactors": [
                {"feature": "Heart Rate Variability", "deviation": "-56%", "impact": 0.44},
                {"feature": "Sleep Debt (72h)", "deviation": "+6.4h", "impact": 0.32},
                {"feature": "Resting Pulse Drift", "deviation": "+31%", "impact": 0.18},
                {"feature": "Core Temperature", "deviation": "+0.5°C", "impact": 0.06}
            ],
            "cognitiveLatencyDelta_ms": 185,
            "isolationForestConfidence": 94.2
        }),
        "responsibilities": json.dumps([
            {"id": "RESP-01", "title": "Crew Clinical Checkups", "priority": "High", "canDelegate": True},
            {"id": "RESP-02", "title": "Emergency Trauma Surgery Readiness", "priority": "Critical", "canDelegate": True},
            {"id": "RESP-03", "title": "Pharmacy Vault Dispensation", "priority": "Medium", "canDelegate": True}
        ]),
        "backupOfficer": json.dumps({"id": "AST-02", "name": "Cmdr. Sarah Chen", "qualification": "Level 2 Flight Medicine Certified"}),
        "recommendation": "Dr. Vance is showing signs of high fatigue. To keep the crew safe and ready, consider letting Commander Chen cover non-urgent tasks so Dr. Vance can rest.",
        "assignedBackupId": "AST-02",
        "isReassigned": False,
        "timelineNotes": "Continuous 38h duty following ECLSS filter maintenance. High restorative sleep deficit."
    },
    {
        "id": "AST-02",
        "name": "Cmdr. Sarah Chen",
        "callsign": "Apex",
        "role": "Navigation",
        "dutyCategory": "Navigation",
        "condition": "Healthy",
        "conditionSeverity": "nominal",
        "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        "avatar": "SC",
        "age": 44,
        "bloodType": "A+",
        "missionDay": 142,
        "suitId": "EVA-SUIT-01",
        "readinessScore": 89,
        "readinessBreakdown": json.dumps({"physical": 92, "cognitive": 88, "circadian": 86, "cardiovascular": 90}),
        "vitals": json.dumps({
            "heartRate": 66, "heartRateBaseline": 65,
            "spo2": 99, "spo2Baseline": 99,
            "temperature": 36.6, "tempBaseline": 36.5,
            "hrv": 58, "hrvBaseline": 60,
            "respiration": 13, "respirationBaseline": 13,
            "bloodPressure": "118/76", "bpBaseline": "118/75",
            "imuActivity": "Active",
            "sleepDebtHours": 0.5, "sleepLast24h": 7.8, "deepSleepPercent": 21,
            "circadianPhaseShiftHours": -0.2,
            "radiationDoseDaily_mSv": 0.79, "radiationCumulative_mSv": 112.4
        }),
        "sensorReliability": json.dumps({
            "overall": 99, "leadContact": "Optimal", "signalToNoiseRatio": 34.2,
            "packetLossPercent": 0.05, "hardwareStatus": "ESP32 Active"
        }),
        "mlModel": json.dumps({
            "anomalyScore": 0.38, "status": "Nominal Baseline",
            "primaryFactors": [
                {"feature": "Cardiovascular Stability", "deviation": "+1.5%", "impact": 0.08},
                {"feature": "Sleep Architecture", "deviation": "+4.0%", "impact": 0.05}
            ],
            "cognitiveLatencyDelta_ms": -15,
            "isolationForestConfidence": 98.7
        }),
        "responsibilities": json.dumps([
            {"id": "RESP-05", "title": "Orbital Insertion Calculation", "priority": "Critical", "canDelegate": False},
            {"id": "RESP-06", "title": "Deep Space Network Sync", "priority": "Medium", "canDelegate": True},
            {"id": "RESP-07", "title": "Station Flight Operations", "priority": "Critical", "canDelegate": False}
        ]),
        "backupOfficer": json.dumps({"id": "AST-03", "name": "Lt. Marcus Reyes", "qualification": "Secondary Flight Guidance Specialist"}),
        "recommendation": "Nominal baseline. High cognitive alertness. Eligible to assume medical duties for Dr. Vance.",
        "assignedBackupId": None,
        "isReassigned": False,
        "timelineNotes": "Completed 8h regular rest cycle and countermeasure workout."
    },
    {
        "id": "AST-03",
        "name": "Lt. Marcus Reyes",
        "callsign": "Reyes",
        "role": "Engineering",
        "dutyCategory": "Engineering",
        "condition": "Healthy",
        "conditionSeverity": "nominal",
        "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "avatar": "MR",
        "age": 35,
        "bloodType": "B+",
        "missionDay": 142,
        "suitId": "EVA-SUIT-02",
        "readinessScore": 94,
        "readinessBreakdown": json.dumps({"physical": 96, "cognitive": 92, "circadian": 94, "cardiovascular": 95}),
        "vitals": json.dumps({
            "heartRate": 70, "heartRateBaseline": 68,
            "spo2": 98, "spo2Baseline": 98,
            "temperature": 36.7, "tempBaseline": 36.7,
            "hrv": 52, "hrvBaseline": 54,
            "respiration": 14, "respirationBaseline": 14,
            "bloodPressure": "120/78", "bpBaseline": "119/77",
            "imuActivity": "Working Load",
            "sleepDebtHours": 0.8, "sleepLast24h": 7.4, "deepSleepPercent": 19,
            "circadianPhaseShiftHours": 0.4,
            "radiationDoseDaily_mSv": 0.82, "radiationCumulative_mSv": 115.1
        }),
        "sensorReliability": json.dumps({
            "overall": 97, "leadContact": "Nominal", "signalToNoiseRatio": 31.8,
            "packetLossPercent": 0.12, "hardwareStatus": "ESP32 Active"
        }),
        "mlModel": json.dumps({
            "anomalyScore": 0.41, "status": "Nominal Baseline",
            "primaryFactors": [
                {"feature": "Respiration Symmetry", "deviation": "+0.5%", "impact": 0.04},
                {"feature": "Core Thermal Regulation", "deviation": "0.0%", "impact": 0.02}
            ],
            "cognitiveLatencyDelta_ms": 5,
            "isolationForestConfidence": 97.9
        }),
        "responsibilities": json.dumps([
            {"id": "RESP-08", "title": "ECLSS O2/CO2 Partial Pressure Balancer", "priority": "Critical", "canDelegate": False},
            {"id": "RESP-09", "title": "Solar Array Alignment Calibration", "priority": "Medium", "canDelegate": True},
            {"id": "RESP-10", "title": "Water Recycling Maintenance", "priority": "High", "canDelegate": False}
        ]),
        "backupOfficer": json.dumps({"id": "AST-04", "name": "Dr. Kenji Sato", "qualification": "Secondary Life Support Systems"}),
        "recommendation": "Baseline in exceptional condition. Ready to support primary engineering or backup EVA duties.",
        "assignedBackupId": None,
        "isReassigned": False,
        "timelineNotes": "Completed maintenance on Sabatier reactor without physiological stress."
    },
    {
        "id": "AST-04",
        "name": "Dr. Kenji Sato",
        "callsign": "Kitsune",
        "role": "Research",
        "dutyCategory": "Research",
        "condition": "Healthy",
        "conditionSeverity": "nominal",
        "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "avatar": "KS",
        "age": 41,
        "bloodType": "AB-",
        "missionDay": 142,
        "suitId": "EVA-SUIT-04",
        "readinessScore": 86,
        "readinessBreakdown": json.dumps({"physical": 84, "cognitive": 89, "circadian": 83, "cardiovascular": 88}),
        "vitals": json.dumps({
            "heartRate": 68, "heartRateBaseline": 67,
            "spo2": 98, "spo2Baseline": 99,
            "temperature": 36.8, "tempBaseline": 36.6,
            "hrv": 49, "hrvBaseline": 52,
            "respiration": 15, "respirationBaseline": 14,
            "bloodPressure": "122/79", "bpBaseline": "120/78",
            "imuActivity": "Laboratory Work",
            "sleepDebtHours": 1.6, "sleepLast24h": 6.9, "deepSleepPercent": 17,
            "circadianPhaseShiftHours": -0.6,
            "radiationDoseDaily_mSv": 0.81, "radiationCumulative_mSv": 114.7
        }),
        "sensorReliability": json.dumps({
            "overall": 94, "leadContact": "Nominal", "signalToNoiseRatio": 26.5,
            "packetLossPercent": 0.45, "hardwareStatus": "ESP32 Active"
        }),
        "mlModel": json.dumps({
            "anomalyScore": 0.34, "status": "Nominal Baseline",
            "primaryFactors": [
                {"feature": "Muscular Tonus", "deviation": "-2.1%", "impact": 0.11},
                {"feature": "Hydration Osmolarity", "deviation": "-1.4%", "impact": 0.07}
            ],
            "cognitiveLatencyDelta_ms": 12,
            "isolationForestConfidence": 96.1
        }),
        "responsibilities": json.dumps([
            {"id": "RESP-11", "title": "Bio-Incubator Sequencing", "priority": "Medium", "canDelegate": True},
            {"id": "RESP-12", "title": "Cosmic Radiation Dosimetry", "priority": "High", "canDelegate": False},
            {"id": "RESP-13", "title": "Hydroponics Growth Monitoring", "priority": "Low", "canDelegate": True}
        ]),
        "backupOfficer": json.dumps({"id": "AST-01", "name": "Dr. Elena Vance", "qualification": "Secondary Biological Laboratory"}),
        "recommendation": "Stable physiological profile. Ready to assist station research and operations.",
        "assignedBackupId": None,
        "isReassigned": False,
        "timelineNotes": "Completed 4-hour specimen incubation protocol in glovebox."
    }
]

INITIAL_INVENTORY = [
    {
        "id": "MED-01", "category": "Pharmaceuticals", "name": "Modafinil 200mg",
        "indication": "Acute Fatigue & Circadian Re-synchronization", "stock": 74, "unit": "tabs",
        "minSafeStock": 30, "shelfLifeDays": 412, "radiationDegradationRate": "0.04%/mo",
        "vitalUrgency": "High", "status": "Nominal", "location": "Cryo-Lock Drawer A-2",
        "contraindications": "Severe hypertension, active arrhythmia", "batteryChargePercent": None
    },
    {
        "id": "MED-02", "category": "Pharmaceuticals", "name": "Epinephrine Auto-Injector 0.3mg",
        "indication": "Anaphylaxis / Severe Systemic Shock", "stock": 12, "unit": "syringes",
        "minSafeStock": 6, "shelfLifeDays": 280, "radiationDegradationRate": "0.08%/mo",
        "vitalUrgency": "Critical", "status": "Nominal", "location": "Emergency Trauma Kit Alpha",
        "contraindications": "Direct IV without dilution", "batteryChargePercent": None
    },
    {
        "id": "MED-03", "category": "Pharmaceuticals", "name": "Ondansetron 8mg (Sublingual)",
        "indication": "Space Adaptation Sickness & Severe Nausea", "stock": 88, "unit": "wafers",
        "minSafeStock": 25, "shelfLifeDays": 520, "radiationDegradationRate": "0.02%/mo",
        "vitalUrgency": "Medium", "status": "Nominal", "location": "Cryo-Lock Drawer B-1",
        "contraindications": "Prolonged QT interval", "batteryChargePercent": None
    },
    {
        "id": "MED-04", "category": "Pharmaceuticals", "name": "Tranexamic Acid (TXA) 1000mg",
        "indication": "Uncontrolled Microgravity Hemorrhage", "stock": 8, "unit": "vials",
        "minSafeStock": 6, "shelfLifeDays": 340, "radiationDegradationRate": "0.05%/mo",
        "vitalUrgency": "Critical", "status": "Low Reserve Warning", "location": "Emergency Trauma Kit Alpha",
        "contraindications": "Known active thromboembolic disease", "batteryChargePercent": None
    },
    {
        "id": "MED-05", "category": "Critical Equipment", "name": "Deep Space Ultrasound Scanner (V-Scan Handheld)",
        "indication": "FAST Trauma Protocol, Optic Nerve Sheath & SANS Imaging", "stock": 2, "unit": "units",
        "minSafeStock": 2, "shelfLifeDays": 1400, "radiationDegradationRate": "0.01%/mo",
        "vitalUrgency": "Critical", "status": "Calibrated & Operational", "location": "Med-Bay Diagnostic Station Rack 1",
        "contraindications": None, "batteryChargePercent": 94
    },
    {
        "id": "MED-06", "category": "Critical Equipment", "name": "Microgravity Automated External Defibrillator (AED)",
        "indication": "Ventricular Fibrillation / Tachycardia", "stock": 2, "unit": "units",
        "minSafeStock": 1, "shelfLifeDays": 980, "radiationDegradationRate": "0.01%/mo",
        "vitalUrgency": "Critical", "status": "Self-Test Passed 06:00 MET", "location": "Airlock Pre-Chamber & Habitat Node 2",
        "contraindications": None, "batteryChargePercent": 98
    },
    {
        "id": "MED-07", "category": "Wearable Hardware", "name": "ESP32 Bio-Telemetry Replacement Sensor Straps",
        "indication": "ASTRA SENSE 5-Lead ECG & Dual Optical SpO2", "stock": 6, "unit": "harnesses",
        "minSafeStock": 4, "shelfLifeDays": 1800, "radiationDegradationRate": "0.00%/mo",
        "vitalUrgency": "High", "status": "4 Active / 2 Cold Spares", "location": "Avionics Drawer C-3",
        "contraindications": None, "batteryChargePercent": None
    },
    {
        "id": "MED-08", "category": "Supplies", "name": "Tactical Hemostatic Gauze & Tourniquets",
        "indication": "EVA Laceration / Rapid Decompression Puncture", "stock": 14, "unit": "kits",
        "minSafeStock": 8, "shelfLifeDays": 780, "radiationDegradationRate": "0.02%/mo",
        "vitalUrgency": "Critical", "status": "Nominal", "location": "EVA Prep Station",
        "contraindications": None, "batteryChargePercent": None
    }
]

INITIAL_INCIDENTS = [
    {
        "id": "INC-2026-142-01",
        "timestamp": "MET 142d 04:22:15",
        "severity": "WARNING",
        "type": "Fatigue & Slowed Reaction Notice",
        "targetAstronautId": "AST-01",
        "targetAstronautName": "Dr. Elena Vance",
        "summary": "Resting pulse elevated to 84 bpm (+31%). 72-hour sleep debt reached 6.4h. Isolation forest anomaly score dropped to -0.42.",
        "resolutionStatus": "Active - Action Pending",
        "syncStatus": "Cached Locally (Deep Space DSN Latency 14m 22s)",
        "assignedOfficer": "Cmdr. Sarah Chen",
        "actionsTaken": json.dumps([
            "ASTRA SENSE continuous ECG band switched to high-resolution mode.",
            "AI Recommendation generated: Postpone non-urgent medical duties and assign backup."
        ])
    },
    {
        "id": "INC-2026-141-03",
        "timestamp": "MET 141d 19:15:00",
        "severity": "ADVISORY",
        "type": "Microgravity Fluid Shift Nasal Congestion",
        "targetAstronautId": "AST-03",
        "targetAstronautName": "Lt. Marcus Reyes",
        "summary": "Cephalad venous engorgement detected during sleep cycle. SpO2 dipped transiently to 95%.",
        "resolutionStatus": "Resolved",
        "syncStatus": "Synced with Houston Mission Control",
        "assignedOfficer": "Dr. Elena Vance",
        "actionsTaken": json.dumps([
            "Lower Body Negative Pressure (LBNP) 20 min session administered.",
            "SpO2 recovered to 98% baseline within 30 minutes."
        ])
    },
    {
        "id": "INC-2026-139-02",
        "timestamp": "MET 139d 11:08:44",
        "severity": "ADVISORY",
        "type": "Wearable Sensor Motion Artifact",
        "targetAstronautId": "AST-04",
        "targetAstronautName": "Dr. Kenji Sato",
        "summary": "Lead contact impedance fluctuation during treadmill ergometer exercise session.",
        "resolutionStatus": "Auto-Recovered",
        "syncStatus": "Synced with Houston Mission Control",
        "assignedOfficer": "System Auto-Filter",
        "actionsTaken": json.dumps([
            "ASTRA SENSE noise suppression algorithm engaged.",
            "Electrode gel integrity re-verified."
        ])
    }
]

INITIAL_RECOVERY = [
    {
        "astronautId": "AST-01",
        "name": "Dr. Elena Vance",
        "protocol": "Spaceflight Fatigue Recovery Protocol (SOP-MED-09)",
        "currentStep": "Step 2: 8-Hour Protected Sleep Cycle in Sound-Isolated Sleep Quarters",
        "progressPercent": 35,
        "projectedFullRecoveryMET": "143d 08:00:00",
        "sleepDebtTarget": "Reduce from 6.4h to < 1.5h",
        "exercisePermitted": "Light Stretching Only (No Resistance ARED exercise until sleep verified)",
        "circadianLightProfile": "Filtered Red Shift (450nm notch filter engaged)"
    },
    {
        "astronautId": "AST-02",
        "name": "Cmdr. Sarah Chen",
        "protocol": "Nominal Mission Endurance Maintenance",
        "currentStep": "Cardiovascular Conditioning Phase 3",
        "progressPercent": 90,
        "projectedFullRecoveryMET": "Fully Ready",
        "sleepDebtTarget": "Maintain < 1.0h",
        "exercisePermitted": "Full Protocol (T2 Treadmill + ARED Squats)",
        "circadianLightProfile": "Dynamic White Daylight (6500K)"
    }
]

def init_database():
    """Initializes tables and seeds initial data in SQLite."""
    with get_db() as conn:
        cursor = conn.cursor()

        # Astronauts Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS astronauts (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            callsign TEXT,
            role TEXT NOT NULL,
            dutyCategory TEXT NOT NULL,
            condition TEXT NOT NULL,
            conditionSeverity TEXT NOT NULL,
            photo TEXT,
            avatar TEXT,
            age INTEGER,
            bloodType TEXT,
            missionDay INTEGER,
            suitId TEXT,
            readinessScore INTEGER,
            readinessBreakdown TEXT,
            vitals TEXT,
            sensorReliability TEXT,
            mlModel TEXT,
            responsibilities TEXT,
            backupOfficer TEXT,
            recommendation TEXT,
            assignedBackupId TEXT,
            isReassigned INTEGER DEFAULT 0,
            timelineNotes TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Telemetry History Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS telemetry_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            packet_id INTEGER,
            astronaut_id TEXT,
            timestamp_met TEXT,
            ecg_lead2_mv REAL,
            spo2_pct REAL,
            heart_rate_bpm REAL,
            skin_temp_c REAL,
            imu_accel_g TEXT,
            impedance_ohms REAL,
            battery_level_pct REAL,
            crc32_valid INTEGER,
            quality_status TEXT,
            anomaly_score REAL,
            is_anomaly INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Health Alerts Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS health_alerts (
            id TEXT PRIMARY KEY,
            astronaut_id TEXT NOT NULL,
            severity TEXT NOT NULL,
            type TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'NEW',
            source TEXT DEFAULT 'LOCAL_HEALTH_ENGINE',
            created_at_met TEXT NOT NULL,
            acknowledged_by TEXT,
            acknowledged_at_met TEXT,
            resolved_by TEXT,
            resolved_at_met TEXT,
            actions_taken TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Incidents Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS incidents (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            severity TEXT NOT NULL,
            type TEXT NOT NULL,
            targetAstronautId TEXT NOT NULL,
            targetAstronautName TEXT NOT NULL,
            summary TEXT NOT NULL,
            resolutionStatus TEXT NOT NULL,
            syncStatus TEXT NOT NULL,
            assignedOfficer TEXT NOT NULL,
            actionsTaken TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Medical Inventory Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS medical_inventory (
            id TEXT PRIMARY KEY,
            category TEXT NOT NULL,
            name TEXT NOT NULL,
            indication TEXT,
            stock INTEGER NOT NULL,
            unit TEXT NOT NULL,
            minSafeStock INTEGER NOT NULL,
            shelfLifeDays INTEGER NOT NULL,
            radiationDegradationRate TEXT,
            vitalUrgency TEXT NOT NULL,
            status TEXT NOT NULL,
            location TEXT,
            contraindications TEXT,
            batteryChargePercent INTEGER,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Recovery Timelines Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS recovery_timelines (
            astronautId TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            protocol TEXT NOT NULL,
            currentStep TEXT NOT NULL,
            progressPercent INTEGER NOT NULL,
            projectedFullRecoveryMET TEXT NOT NULL,
            sleepDebtTarget TEXT,
            exercisePermitted TEXT,
            circadianLightProfile TEXT
        );
        """)

        # Audit Logs Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_officer TEXT,
            action TEXT NOT NULL,
            details TEXT,
            timestamp_met TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Seed initial crew if empty
        cursor.execute("SELECT COUNT(*) FROM astronauts;")
        if cursor.fetchone()[0] == 0:
            for ast in INITIAL_CREW:
                cursor.execute("""
                INSERT INTO astronauts (
                    id, name, callsign, role, dutyCategory, condition, conditionSeverity,
                    photo, avatar, age, bloodType, missionDay, suitId, readinessScore,
                    readinessBreakdown, vitals, sensorReliability, mlModel, responsibilities,
                    backupOfficer, recommendation, assignedBackupId, isReassigned, timelineNotes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    ast["id"], ast["name"], ast["callsign"], ast["role"], ast["dutyCategory"],
                    ast["condition"], ast["conditionSeverity"], ast["photo"], ast["avatar"],
                    ast["age"], ast["bloodType"], ast["missionDay"], ast["suitId"],
                    ast["readinessScore"], ast["readinessBreakdown"], ast["vitals"],
                    ast["sensorReliability"], ast["mlModel"], ast["responsibilities"],
                    ast["backupOfficer"], ast["recommendation"], ast["assignedBackupId"],
                    ast["isReassigned"], ast["timelineNotes"]
                ))
            logger.info("Database initialized with 4 crew profiles.")

        # Seed initial inventory if empty
        cursor.execute("SELECT COUNT(*) FROM medical_inventory;")
        if cursor.fetchone()[0] == 0:
            for item in INITIAL_INVENTORY:
                cursor.execute("""
                INSERT INTO medical_inventory (
                    id, category, name, indication, stock, unit, minSafeStock,
                    shelfLifeDays, radiationDegradationRate, vitalUrgency, status,
                    location, contraindications, batteryChargePercent
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    item["id"], item["category"], item["name"], item["indication"],
                    item["stock"], item["unit"], item["minSafeStock"], item["shelfLifeDays"],
                    item["radiationDegradationRate"], item["vitalUrgency"], item["status"],
                    item["location"], item["contraindications"], item["batteryChargePercent"]
                ))
            logger.info("Database initialized with medical inventory items.")

        # Seed initial incidents if empty
        cursor.execute("SELECT COUNT(*) FROM incidents;")
        if cursor.fetchone()[0] == 0:
            for inc in INITIAL_INCIDENTS:
                cursor.execute("""
                INSERT INTO incidents (
                    id, timestamp, severity, type, targetAstronautId, targetAstronautName,
                    summary, resolutionStatus, syncStatus, assignedOfficer, actionsTaken
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    inc["id"], inc["timestamp"], inc["severity"], inc["type"],
                    inc["targetAstronautId"], inc["targetAstronautName"], inc["summary"],
                    inc["resolutionStatus"], inc["syncStatus"], inc["assignedOfficer"],
                    inc["actionsTaken"]
                ))
            logger.info("Database initialized with historical mission incidents.")

        # Seed recovery timelines if empty
        cursor.execute("SELECT COUNT(*) FROM recovery_timelines;")
        if cursor.fetchone()[0] == 0:
            for rec in INITIAL_RECOVERY:
                cursor.execute("""
                INSERT INTO recovery_timelines (
                    astronautId, name, protocol, currentStep, progressPercent,
                    projectedFullRecoveryMET, sleepDebtTarget, exercisePermitted,
                    circadianLightProfile
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    rec["astronautId"], rec["name"], rec["protocol"], rec["currentStep"],
                    rec["progressPercent"], rec["projectedFullRecoveryMET"],
                    rec["sleepDebtTarget"], rec["exercisePermitted"], rec["circadianLightProfile"]
                ))
            logger.info("Database initialized with crew recovery timelines.")

        # Seed initial active alert if empty
        cursor.execute("SELECT COUNT(*) FROM health_alerts;")
        if cursor.fetchone()[0] == 0:
            cursor.execute("""
            INSERT INTO health_alerts (
                id, astronaut_id, severity, type, message, status, created_at_met
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                "ALT-2026-142-01",
                "AST-01",
                "WARNING",
                "Fatigue & Slowed Reaction Notice",
                "Dr. Elena Vance: Resting pulse is slightly high at 84 bpm. Missing 6.4 hours of sleep over the past 3 days. Rest recommended.",
                "NEW",
                "142:04:22:15"
            ))
            logger.info("Database initialized with initial active alert.")

        conn.commit()
