"""
MISSION-MEDIC: 100% Offline Deep Space Clinical Protocol Knowledge Base
Adheres to NASA-STD-3001 spaceflight clinical standard operating procedures.
Written in simple, clear, actionable plain language for crew safety.
Runs locally on spacecraft hardware with zero dependency on Earth communications.
"""

MEDICAL_PROTOCOLS = [
    {
        "id": "SOP-FATIGUE-01",
        "title": "Astronaut Fatigue & Rest Protocol",
        "category": "Sleep & Mental Alertness",
        "keywords": ["fatigue", "sleep", "tired", "cognitive", "reaction", "exhaustion", "modafinil", "rest", "circadian", "vance"],
        "triggerCriteria": "Missing over 4 hours of sleep OR noticeable decrease in recovery (HRV drop > 35%)",
        "summary": "Step-by-step action plan to help a tired astronaut recover safely without compromising ongoing mission tasks.",
        "steps": [
            {
                "step": 1,
                "instruction": "Pause High-Focus Work: Hand over complex or medical tasks to the designated trained backup crew member.",
                "actionRequired": "Reassign tasks in the Crew Matrix"
            },
            {
                "step": 2,
                "instruction": "Quick Reaction Check: Complete a short 3-minute visual alertness test on the workstation screen.",
                "actionRequired": "Check reaction time"
            },
            {
                "step": 3,
                "instruction": "Sleep Period: Enter a quiet, dark sleep cabin for 6 to 8 hours with warm, dim lighting.",
                "actionRequired": "Start protected sleep cycle"
            },
            {
                "step": 4,
                "instruction": "Emergency Alertness Only: If an unavoidable station emergency occurs, take 100mg Modafinil with a full glass of water.",
                "actionRequired": "Authorize medicine from Med Vault"
            }
        ],
        "contraindications": "Do not take alertness medication if heart rate is unusually irregular or blood pressure is very high."
    },
    {
        "id": "SOP-HYPOXIA-02",
        "title": "Low Oxygen & Cabin Air Emergency",
        "category": "Breathing & Life Support",
        "keywords": ["hypoxia", "oxygen", "spo2", "cabin", "pressure", "breathing", "air", "eclss", "suffocation", "co2", "leak"],
        "triggerCriteria": "Blood Oxygen (SpO2) drops below 92% OR Cabin Air Pressure falls below safe limits",
        "summary": "Urgent emergency steps if air pressure falls or carbon dioxide builds up in the spacecraft cabin.",
        "steps": [
            {
                "step": 1,
                "instruction": "Put on Oxygen Mask: Wear the emergency oxygen mask immediately and confirm a tight face seal.",
                "actionRequired": "Put on emergency mask"
            },
            {
                "step": 2,
                "instruction": "Check Air Console: Verify cabin carbon dioxide levels on the life support screen and turn on extra air scrubbers.",
                "actionRequired": "Activate backup scrubbers"
            },
            {
                "step": 3,
                "instruction": "Watch Oxygen Recovery: Keep checking wearable sensor until blood oxygen rises safely above 97%.",
                "actionRequired": "Confirm oxygen returns to normal"
            }
        ],
        "contraindications": "Once cabin air is confirmed safe and oxygen levels stay above 96%, carefully remove mask to avoid excess oxygen."
    },
    {
        "id": "SOP-ARRHYTHMIA-03",
        "title": "Irregular Heart Rhythm Care Protocol",
        "category": "Heart Health",
        "keywords": ["arrhythmia", "cardiac", "heart", "flutter", "pulse", "aed", "potassium", "electrolyte", "palpitation"],
        "triggerCriteria": "Wearable sensor detects recurring skipped beats or resting pulse stays above 120 bpm",
        "summary": "Clear care steps if weightlessness causes fluid shifts or mineral imbalances affecting heart rhythm.",
        "steps": [
            {
                "step": 1,
                "instruction": "Lie Down & Rest: Rest comfortably in the medical bay bunk in a stable, secure position.",
                "actionRequired": "Rest in medical bay"
            },
            {
                "step": 2,
                "instruction": "Record High-Detail Heart Trace: Switch the wearable sensor to high-detail mode to record the heart wave.",
                "actionRequired": "Start detailed heart recording"
            },
            {
                "step": 3,
                "instruction": "Check Body Minerals: Run a quick finger-prick blood test to check potassium and magnesium levels.",
                "actionRequired": "Check mineral test cartridge"
            },
            {
                "step": 4,
                "instruction": "Keep Defibrillator (AED) on Standby: Place the automated defibrillator nearby as a safety precaution.",
                "actionRequired": "Confirm AED is ready nearby"
            }
        ],
        "contraindications": "Always test body mineral levels before taking heart rhythm medications."
    }
]

EMERGENCY_SCENARIOS = [
    {
        "id": "SCENARIO-01",
        "name": "Astronaut Fatigue Crisis",
        "description": "Dr. Elena Vance has accumulated over 6 hours of sleep debt from long maintenance shifts.",
        "requiredSupplies": [
            {"item": "Alertness Tablet (Modafinil 100mg)", "qty": "1 tablet if emergency duty"},
            {"item": "Relaxation / Light Visor", "qty": "30 min rest session"},
            {"item": "Duty Handover to Backup", "qty": "Cmdr. Chen covers medical checks"}
        ],
        "predictedRecoveryHours": 14.5,
        "crewReadinessImpact": "-16 pts"
    },
    {
        "id": "SCENARIO-02",
        "name": "Low Cabin Air Pressure",
        "description": "Cabin air pressure drops, triggering automatic oxygen mask protocols.",
        "requiredSupplies": [
            {"item": "Emergency Oxygen Mask", "qty": "2 masks"},
            {"item": "Anti-Bleeding Vials (TXA)", "qty": "2 vials"},
            {"item": "Ultrasound Bubble Sensor", "qty": "1 probe"}
        ],
        "predictedRecoveryHours": 48,
        "crewReadinessImpact": "-38 pts"
    },
    {
        "id": "SCENARIO-03",
        "name": "Irregular Heart Rhythm",
        "description": "Weightlessness fluid shift creates temporary mineral shortage, causing heart palpitations.",
        "requiredSupplies": [
            {"item": "Spaceflight AED", "qty": "1 on standby"},
            {"item": "Hydration / Mineral Pack", "qty": "2 pouches"},
            {"item": "Portable Ultrasound", "qty": "1 scan"}
        ],
        "predictedRecoveryHours": 24,
        "crewReadinessImpact": "-25 pts"
    }
]
