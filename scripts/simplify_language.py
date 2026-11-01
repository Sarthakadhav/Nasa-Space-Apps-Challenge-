import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def update_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = content
    for old, new in replacements:
        if old not in modified:
            print(f"[WARN] Target not found in {path}: {old[:50]}...")
        else:
            modified = modified.replace(old, new)
            print(f"[OK] Replaced in {path}: {old[:40]}...")
            
    with open(path, 'w', encoding='utf-8') as f:
        f.write(modified)
    print(f"Finished updating {path}\n")

# 1. src/context/MissionContext.jsx
update_file('src/context/MissionContext.jsx', [
    ("condition: 'Resting / Relieved'", "condition: 'Resting & Recovering'"),
    ("recommendation: 'Workload successfully transferred to Cmdr. Sarah Chen. Protected rest cycle active.'",
     "recommendation: 'Duties safely handed over to Cmdr. Sarah Chen. Quiet rest period is active.'"),
    ("title: '[Assumed] Crew Clinical Checkups'", "title: '[Covering for Vance] Daily Health Checkups'"),
    ("statusDescription: 'Stabilized - Medical Officer in Deep Rest Cycle, Duties Transferred'",
     "statusDescription: 'Stable - Dr. Vance is resting while Cmdr. Chen covers duties'"),
    ("aiRecommendation: 'Workload rebalance effective. Cmdr. Sarah Chen assumed clinical oversight. Re-evaluate Dr. Vance in 8 hours.'",
     "aiRecommendation: 'Workload transfer complete! Commander Chen is covering medical duties. Dr. Vance will rest for 8 hours.'"),
    ("type: 'Crew Workload Redistribution Executed'", "type: 'Crew Workload Handover Complete'"),
    ("summary: 'Clinical responsibilities safely delegated to Cmdr. Sarah Chen (Level 2 Flight Med cert). 8-hour protected sleep cycle initiated.'",
     "summary: 'Medical tasks were safely handed to Cmdr. Sarah Chen. Dr. Vance has started an 8-hour sleep break.'"),
    ("resolutionStatus: 'Active - Monitoring Rest'", "resolutionStatus: 'In Progress - Astronaut Resting'"),
    ("syncStatus: 'Queued for Earth DSN Sync'", "syncStatus: 'Saved locally (Will send to Earth on next connection)'"),
    ("'Astronaut A transferred to acoustic-damped sleep pod.'", "'Astronaut moved to quiet sleep cabin.'"),
    ("'Emergency trauma standby assigned to Cmdr. Chen.'", "'Emergency first-response coverage handed to Cmdr. Chen.'"),
    ("statusDescription: 'CRITICAL EMERGENCY: Cabin Pressure Anomaly Detected'",
     "statusDescription: 'URGENT ALERT: Low Cabin Air Pressure Detected'"),
    ("aiRecommendation: 'Engage 100% Oxygen Protocol immediately. Halt non-essential activities.'",
     "aiRecommendation: 'Put on oxygen masks right away. Pause all routine work until pressure stabilizes.'"),
    ("condition: 'Arrhythmia Alert'", "condition: 'Irregular Heart Rhythm'"),
    ("status: 'CRITICAL CARDIAC OUTLIER'", "status: 'Unusual heart rhythm detected - please rest'")
])

# 2. src/components/dashboard/ActiveAlertsBanner.jsx
update_file('src/components/dashboard/ActiveAlertsBanner.jsx', [
    (
        "Resting pulse elevated to {primaryAlert.vitals.heartRate} bpm (+31%). Cumulative 72-hour sleep debt reached {primaryAlert.vitals.sleepDebtHours}h. \n              Reaction latency delayed by +{primaryAlert.mlModel.cognitiveLatencyDelta_ms}ms.",
        "Heart rate is slightly high at {primaryAlert.vitals.heartRate} bpm. Missing {primaryAlert.vitals.sleepDebtHours} hours of needed sleep over the last 3 days, causing slower reaction time (+{primaryAlert.mlModel.cognitiveLatencyDelta_ms}ms). Recommended: take a rest break and hand over non-urgent tasks."
    ),
    (
        "Manage Duty Handoff",
        "Review Task Handover"
    )
])

# 3. src/components/dashboard/CrewReadinessGauge.jsx
update_file('src/components/dashboard/CrewReadinessGauge.jsx', [
    ("Crew Operational Readiness", "Overall Crew Readiness"),
    ("Reassign Non-Urgent Duties", "Hand Over Non-Urgent Tasks"),
    ("Duties Reassigned & Active", "Duties Handed Over & Rest Active"),
    ("const isFatigued = ast.condition === 'Fatigued';", "const isWarning = ast.conditionSeverity === 'warning' || ast.conditionSeverity === 'critical';"),
    (
        """{isFatigued ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                        Fatigued
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Healthy
                      </span>
                    )}""",
        """{isWarning ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                        {ast.condition}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        {ast.condition}
                      </span>
                    )}"""
    )
])

# 4. src/components/dashboard/AstronautCard.jsx
update_file('src/components/dashboard/AstronautCard.jsx', [
    ("const isFatigued = astronaut.condition === 'Fatigued';", "const isWarning = astronaut.conditionSeverity === 'warning' || astronaut.conditionSeverity === 'critical';"),
    (
        """{isFatigued ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
              Fatigued
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300 border border-gray-100 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              Healthy
            </span>
          )}""",
        """{isWarning ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
              {astronaut.condition}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300 border border-gray-100 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              {astronaut.condition}
            </span>
          )}"""
    ),
    (
        "<span>ML Anomaly Score:</span>",
        "<span>Health Pattern:</span>"
    ),
    (
        "{astronaut.mlModel.anomalyScore < 0 ? 'Outlier (-0.42)' : 'Inlier (+0.38)'}",
        "{astronaut.mlModel.anomalyScore < 0 ? 'Unusual (Needs rest)' : 'Normal & Steady'}"
    ),
    (
        "<span>Designated Backup:</span>",
        "<span>Assigned Backup:</span>"
    )
])

# 5. src/components/modules/MissionMedic.jsx
update_file('src/components/modules/MissionMedic.jsx', [
    (
        "Spaceflight clinical standard operating procedures (SOPs) executable locally in deep space without Earth link.",
        "Step-by-step health emergency guides that work completely offline, even when there is no internet or Earth connection."
    ),
    (
        """{selectedAstronaut.id === 'AST-01' ? (
                <span>
                  Acute Circadian Desynchronosis and Workload-Induced Neuro-Fatigue. 
                  Cumulative sleep debt is 6.4h, resting pulse elevated to 84 bpm (baseline 64), and HRV depressed to 24 ms. 
                  Cognitive reaction latency is delayed (+185ms), elevating operational risk for complex procedures.
                </span>
              ) : (
                <span>
                  Nominal physiological adaptation. Zero signs of acute microgravity cephalad fluid congestion or cognitive decline. 
                  Full operational readiness confirmed.
                </span>
              )}""",
        """{selectedAstronaut.id === 'AST-01' ? (
                <span>
                  High Fatigue & Sleep Shortage: Elena is missing over 6.4 hours of sleep from long shifts. 
                  Her resting heart rate is slightly elevated at 84 bpm (normal is 64 bpm), and her recovery speed is down. 
                  Because her reaction time is 185ms slower than usual, having a crewmate cover her complex duties and taking a rest break is strongly advised.
                </span>
              ) : (
                <span>
                  All vitals are normal and healthy: Good heart rate, clear oxygen levels, and sharp reaction times. 
                  Fully ready for normal spaceflight activities.
                </span>
              )}"""
    ),
    ("Approved Response Checklist", "Step-by-Step Action Guide"),
    ("In-Flight Symptom Questionnaire", "Quick Health Check-In"),
    ("placeholder=\"e.g. Administered 100mg Modafinil, re-measured vitals...\"", "placeholder=\"e.g. Took a 20-minute rest break, drank water, re-checked pulse...\""),
    ("✓ Recorded locally to SQLite and queued for DSN transmission.", "✓ Saved safely on your local device. (Will sync with Earth when signal returns).")
])

# 6. src/components/modules/PersonalBaseline.jsx
update_file('src/components/modules/PersonalBaseline.jsx', [
    (
        "Learned physiological normal baselines tailored per astronaut to detect microgravity degradation.",
        "Every astronaut has a unique, healthy baseline. Orbital Guard learns each person's normal numbers and detects early signs of fatigue or stress before they turn into emergencies."
    ),
    (
        "status: selectedAstronaut.vitals.heartRate > 80 ? 'Elevated (Sympathetic Stress)' : 'Nominal'",
        "status: selectedAstronaut.vitals.heartRate > 80 ? 'Slightly High (Needs rest)' : 'Normal & Healthy'"
    ),
    (
        "status: selectedAstronaut.vitals.hrv < 30 ? 'Critically Depressed' : 'Nominal'",
        "status: selectedAstronaut.vitals.hrv < 30 ? 'Low Recovery (Fatigue)' : 'Optimal Recovery'"
    ),
    (
        "status: selectedAstronaut.vitals.spo2 < 97 ? 'Mild Hypoxic Dip' : 'Optimal'",
        "status: selectedAstronaut.vitals.spo2 < 97 ? 'Slight Drop' : 'Optimal'"
    ),
    (
        "status: 'Circadian Drift'",
        "status: 'Normal Body Temp'"
    ),
    (
        "status: selectedAstronaut.vitals.sleepDebtHours > 4.0 ? 'Severe Deficit' : 'Nominal'",
        "status: selectedAstronaut.vitals.sleepDebtHours > 4.0 ? 'High Sleep Debt' : 'Well Rested'"
    ),
    (
        "<th className=\"pb-3 font-normal\">Live Telemetry</th>",
        "<th className=\"pb-3 font-normal\">Live Reading</th>"
    ),
    (
        "<th className=\"pb-3 font-normal\">Individual Baseline</th>",
        "<th className=\"pb-3 font-normal\">Personal Normal</th>"
    ),
    (
        "<th className=\"pb-3 font-normal\">Variance</th>",
        "<th className=\"pb-3 font-normal\">Difference</th>"
    ),
    (
        "<th className=\"pb-3 font-normal text-right\">Clinical Evaluation</th>",
        "<th className=\"pb-3 font-normal text-right\">Health Status</th>"
    )
])

# 7. src/components/modules/CrewMatrix.jsx
update_file('src/components/modules/CrewMatrix.jsx', [
    ("Crew Matrix: Responsibility & Backup Mapping", "Crew Roles & Backup Coverage"),
    (
        "Cross-crew readiness tracking, backup certifications, and automated duty redistribution.",
        "Keep the mission running smoothly. If any crew member gets tired or needs medical rest, their backup can safely take over their responsibilities."
    ),
    ("Approve AI Duty Redistribution", "Hand Over Non-Urgent Tasks (Let Dr. Vance Rest)"),
    ("const isFatigued = ast.condition === 'Fatigued';", "const isWarning = ast.conditionSeverity === 'warning' || ast.conditionSeverity === 'critical';"),
    ("Primary Responsibilities:", "Current Tasks:"),
    ("Designated Mission Backup:", "Trained Backup Crew Member:")
])

# 8. src/components/modules/MedVault.jsx
update_file('src/components/modules/MedVault.jsx', [
    ("Med Vault: Resource Intelligence", "Medical Kit & Supplies"),
    (
        "Pharmaceutical inventory tracking, equipment operational state, and radiation degradation modeling.",
        "Check medicines, emergency first-aid supplies, and equipment status. See what is in stock and what will be needed during an emergency."
    ),
    ("Simulated Emergency Supply Depletion", "Emergency Supply Calculator (What-If Scenarios)"),
    ("<th className=\"pb-3 font-normal\">Stock</th>", "<th className=\"pb-3 font-normal\">In Stock</th>"),
    ("<th className=\"pb-3 font-normal\">Shelf Life</th>", "<th className=\"pb-3 font-normal\">Expires In</th>"),
    ("<th className=\"pb-3 font-normal\">Cosmic Degradation</th>", "<th className=\"pb-3 font-normal\">Radiation Shielding</th>"),
    ("<th className=\"pb-3 font-normal\">Location</th>", "<th className=\"pb-3 font-normal\">Storage Locker</th>")
])

# 9. src/components/modules/MissionContinuity.jsx
update_file('src/components/modules/MissionContinuity.jsx', [
    ("Recovery Tracker & Offline Incident Sync", "Recovery Tracker & Logged Events"),
    (
        "Post-incident rehabilitation milestones, sleep debt banking, and delayed Earth DSN synchronization.",
        "Track crew recovery progress and see past health events. All updates are saved locally so they are never lost."
    ),
    ("1 Event Pending DSN Sync", "Ready to send to Earth on next connection"),
    ("Active Crew Rehabilitation Trajectories", "Crew Rest & Recovery Progress"),
    (
        "Tracking sleep debt recovery, circadian normalization, and return-to-duty clearance.",
        "Track when resting crew members will be fully recovered and ready to resume duties."
    ),
    ("Incident History & Offline Ledger", "Recent Health Events & Care Log")
])

# 10. src/components/modules/AstraSenseIoT.jsx
update_file('src/components/modules/AstraSenseIoT.jsx', [
    ("Wearable Telemetry & Sensor Reliability", "Astronaut Wearable Sensors & Signal Quality"),
    (
        "Continuous vital-sign acquisition via ESP32 bio-sensor harness (ECG, SpO₂, Core Temp, IMU motion).",
        "Live health readings streaming from the astronaut's wearable device. Orbital Guard automatically checks signal quality so loose patches never trigger false alarms."
    ),
    ("<th className=\"pb-3 font-normal\">Electrode Contact</th>", "<th className=\"pb-3 font-normal\">Skin Contact</th>"),
    ("<th className=\"pb-3 font-normal\">SNR</th>", "<th className=\"pb-3 font-normal\">Signal Clarity</th>"),
    ("<th className=\"pb-3 font-normal\">Packet Loss</th>", "<th className=\"pb-3 font-normal\">Data Loss</th>"),
    ("<th className=\"pb-3 font-normal text-right\">Reliability</th>", "<th className=\"pb-3 font-normal text-right\">Sensor Health</th>")
])

# 11. src/components/dashboard/LandingOverview.jsx
update_file('src/components/dashboard/LandingOverview.jsx', [
    ("3 Healthy, 1 Fatigued", "3 Alert, 1 Needs Rest"),
    ("Operational Risk", "Fatigue Warning"),
    ("Select an astronaut to review live physiological telemetry and clinical status.",
     "Click any crew member to view their real-time heart rate, oxygen levels, and wellness status."),
    ("Critical Reserves", "Essential First-Aid & Meds"),
    ("Incident & Sync Ledger", "Recent Health Events & Offline Log")
])

# 12. src/components/dashboard/HealthTrendComparison.jsx
update_file('src/components/dashboard/HealthTrendComparison.jsx', [
    ("Physiological Analytics", "Crew Health Trends"),
    ("Multi-Astronaut Health Comparison", "Crew Health Over Time"),
    ("Dr. Vance (Fatigued)", "Dr. Vance (Needs Rest)")
])

print("All frontend updates processed successfully!")
