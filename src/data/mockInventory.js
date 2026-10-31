// MED-VAULT: Deep Space Medical Inventory & Resource Intelligence
// Module 4: Tracks supplies, shelf life under cosmic radiation, and simulated emergency consumption

export const MEDICAL_INVENTORY = [
  {
    id: 'MED-01',
    category: 'Pharmaceuticals',
    name: 'Modafinil 200mg',
    indication: 'Acute Fatigue & Circadian Re-synchronization',
    stock: 74,
    unit: 'tabs',
    minSafeStock: 30,
    shelfLifeDays: 412,
    radiationDegradationRate: '0.04%/mo',
    vitalUrgency: 'High',
    status: 'Nominal',
    location: 'Cryo-Lock Drawer A-2',
    contraindications: 'Severe hypertension, active arrhythmia'
  },
  {
    id: 'MED-02',
    category: 'Pharmaceuticals',
    name: 'Epinephrine Auto-Injector 0.3mg',
    indication: 'Anaphylaxis / Severe Systemic Shock',
    stock: 12,
    unit: 'syringes',
    minSafeStock: 6,
    shelfLifeDays: 280,
    radiationDegradationRate: '0.08%/mo',
    vitalUrgency: 'Critical',
    status: 'Nominal',
    location: 'Emergency Trauma Kit Alpha',
    contraindications: 'Direct IV without dilution'
  },
  {
    id: 'MED-03',
    category: 'Pharmaceuticals',
    name: 'Ondansetron 8mg (Sublingual)',
    indication: 'Space Adaptation Sickness & Severe Nausea',
    stock: 88,
    unit: 'wafers',
    minSafeStock: 25,
    shelfLifeDays: 520,
    radiationDegradationRate: '0.02%/mo',
    vitalUrgency: 'Medium',
    status: 'Nominal',
    location: 'Cryo-Lock Drawer B-1',
    contraindications: 'Prolonged QT interval'
  },
  {
    id: 'MED-04',
    category: 'Pharmaceuticals',
    name: 'Tranexamic Acid (TXA) 1000mg',
    indication: 'Uncontrolled Microgravity Hemorrhage',
    stock: 8,
    unit: 'vials',
    minSafeStock: 6,
    shelfLifeDays: 340,
    radiationDegradationRate: '0.05%/mo',
    vitalUrgency: 'Critical',
    status: 'Low Reserve Warning',
    location: 'Emergency Trauma Kit Alpha',
    contraindications: 'Known active thromboembolic disease'
  },
  {
    id: 'MED-05',
    category: 'Critical Equipment',
    name: 'Deep Space Ultrasound Scanner (V-Scan Handheld)',
    indication: 'FAST Trauma Protocol, Optic Nerve Sheath & SANS Imaging',
    stock: 2,
    unit: 'units',
    minSafeStock: 2,
    shelfLifeDays: 1400,
    batteryChargePercent: 94,
    vitalUrgency: 'Critical',
    status: 'Calibrated & Operational',
    location: 'Med-Bay Diagnostic Station Rack 1'
  },
  {
    id: 'MED-06',
    category: 'Critical Equipment',
    name: 'Microgravity Automated External Defibrillator (AED)',
    indication: 'Ventricular Fibrillation / Tachycardia',
    stock: 2,
    unit: 'units',
    minSafeStock: 1,
    shelfLifeDays: 980,
    batteryChargePercent: 98,
    vitalUrgency: 'Critical',
    status: 'Self-Test Passed 06:00 MET',
    location: 'Airlock Pre-Chamber & Habitat Node 2'
  },
  {
    id: 'MED-07',
    category: 'Wearable Hardware',
    name: 'ESP32 Bio-Telemetry Replacement Sensor Straps',
    indication: 'ASTRA SENSE 5-Lead ECG & Dual Optical SpO2',
    stock: 6,
    unit: 'harnesses',
    minSafeStock: 4,
    shelfLifeDays: 1800,
    vitalUrgency: 'High',
    status: '4 Active / 2 Cold Spares',
    location: 'Avionics Drawer C-3'
  },
  {
    id: 'MED-08',
    category: 'Supplies',
    name: 'Tactical Hemostatic Gauze & Tourniquets',
    indication: 'EVA Laceration / Rapid Decompression Puncture',
    stock: 14,
    unit: 'kits',
    minSafeStock: 8,
    shelfLifeDays: 780,
    vitalUrgency: 'Critical',
    status: 'Nominal',
    location: 'EVA Prep Station'
  }
];

export const SIMULATED_EMERGENCY_SCENARIOS = [
  {
    id: 'SCENARIO-01',
    name: 'Astronaut A Fatigue Crisis (Active)',
    description: 'Dr. Vance sleep debt reaches critical threshold during scheduled clinical shift.',
    requiredSupplies: [
      { item: 'Modafinil 200mg', qty: '1 tab (emergency dose)' },
      { item: 'Circadian Light Therapy Visor', qty: '45 min session' },
      { item: 'Workload Handoff to Backup', qty: 'Cmdr. Chen assumed medical triage' }
    ],
    predictedRecoveryHours: 14.5,
    crewReadinessImpact: '-16 pts'
  },
  {
    id: 'SCENARIO-02',
    name: 'Cabin Depressurization / Decompression Sickness (DCS)',
    description: 'Simulate micro-meteoroid strike causing 12 kPa cabin drop and acute nitrogen bubbles.',
    requiredSupplies: [
      { item: '100% Hyperbaric Oxygen Mask', qty: '2 units' },
      { item: 'Tranexamic Acid', qty: '2 vials' },
      { item: 'ESP32 Continuous Bubble Doppler', qty: '1 probe' }
    ],
    predictedRecoveryHours: 48,
    crewReadinessImpact: '-38 pts'
  },
  {
    id: 'SCENARIO-03',
    name: 'Acute Cardiac Arrhythmia in Microgravity',
    description: 'Simulate fluid shift-induced potassium imbalance causing sustained premature ventricular contractions.',
    requiredSupplies: [
      { item: 'Microgravity AED', qty: '1 stand-by' },
      { item: 'Electrolyte Infusion IV 500ml', qty: '2 bags' },
      { item: 'Deep Space Ultrasound', qty: '1 scan' }
    ],
    predictedRecoveryHours: 24,
    crewReadinessImpact: '-25 pts'
  }
];

