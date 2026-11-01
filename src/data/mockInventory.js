// MED-VAULT: Medical Supplies & Equipment Tracker
// Tracks medications, life-support tools, shelf life, and emergency supplies

export const MEDICAL_INVENTORY = [
  {
    id: 'MED-01',
    category: 'Medications',
    name: 'Modafinil 200mg',
    indication: 'Alertness Tablet (For Emergency Wakefulness & Fatigue)',
    stock: 74,
    unit: 'tablets',
    minSafeStock: 30,
    shelfLifeDays: 412,
    radiationDegradationRate: '0.04%/mo',
    vitalUrgency: 'High',
    status: 'In Stock',
    location: 'Medicine Drawer A-2',
    contraindications: 'Do not use with severe high blood pressure'
  },
  {
    id: 'MED-02',
    category: 'Medications',
    name: 'EpiPen Auto-Injector 0.3mg',
    indication: 'Severe Allergy & Shock Emergency Pen',
    stock: 12,
    unit: 'injectors',
    minSafeStock: 6,
    shelfLifeDays: 280,
    radiationDegradationRate: '0.08%/mo',
    vitalUrgency: 'Critical',
    status: 'In Stock',
    location: 'Emergency Trauma Kit Alpha',
    contraindications: 'For severe allergic emergencies only'
  },
  {
    id: 'MED-03',
    category: 'Medications',
    name: 'Ondansetron 8mg (Dissolvable)',
    indication: 'Space Motion Sickness & Nausea Relief Wafer',
    stock: 88,
    unit: 'wafers',
    minSafeStock: 25,
    shelfLifeDays: 520,
    radiationDegradationRate: '0.02%/mo',
    vitalUrgency: 'Medium',
    status: 'In Stock',
    location: 'Medicine Drawer B-1',
    contraindications: 'Consult doctor if history of heart rhythm issues'
  },
  {
    id: 'MED-04',
    category: 'Medications',
    name: 'Tranexamic Acid (TXA) 1000mg',
    indication: 'Bleeding Control Medicine (Rapid Clotting Aid)',
    stock: 8,
    unit: 'vials',
    minSafeStock: 6,
    shelfLifeDays: 340,
    radiationDegradationRate: '0.05%/mo',
    vitalUrgency: 'Critical',
    status: 'Low Stock Warning',
    location: 'Emergency Trauma Kit Alpha',
    contraindications: 'Active blood clot history'
  },
  {
    id: 'MED-05',
    category: 'Critical Equipment',
    name: 'Handheld Ultrasound Scanner',
    indication: 'Internal Organ & Eye Health Scanner',
    stock: 2,
    unit: 'scanners',
    minSafeStock: 2,
    shelfLifeDays: 1400,
    batteryChargePercent: 94,
    vitalUrgency: 'Critical',
    status: 'Calibrated & Ready to Use',
    location: 'Med-Bay Diagnostic Station Rack 1'
  },
  {
    id: 'MED-06',
    category: 'Critical Equipment',
    name: 'Automated External Defibrillator (AED)',
    indication: 'Emergency Heart Restart Machine',
    stock: 2,
    unit: 'devices',
    minSafeStock: 1,
    shelfLifeDays: 980,
    batteryChargePercent: 98,
    vitalUrgency: 'Critical',
    status: 'Self-Test Passed Today',
    location: 'Airlock Pre-Chamber & Living Quarters'
  },
  {
    id: 'MED-07',
    category: 'Wearable Hardware',
    name: 'Spare Bio-Telemetry Sensor Straps',
    indication: 'Replacement Heart, Oxygen & Temp Chest Straps',
    stock: 6,
    unit: 'straps',
    minSafeStock: 4,
    shelfLifeDays: 1800,
    vitalUrgency: 'High',
    status: '4 Active / 2 Spares Ready',
    location: 'Electronics Cabinet C-3'
  },
  {
    id: 'MED-08',
    category: 'Supplies',
    name: 'Emergency Bandages & Tourniquets',
    indication: 'Rapid Wound Dressing & Spacewalk First Aid',
    stock: 14,
    unit: 'kits',
    minSafeStock: 8,
    shelfLifeDays: 780,
    vitalUrgency: 'Critical',
    status: 'In Stock',
    location: 'Spacewalk Prep Station'
  }
];

export const SIMULATED_EMERGENCY_SCENARIOS = [
  {
    id: 'SCENARIO-01',
    name: 'Astronaut Fatigue Crisis',
    description: 'Dr. Vance runs out of energy after working 38 hours straight.',
    requiredSupplies: [
      { item: 'Modafinil 200mg', qty: '1 tablet (emergency dose)' },
      { item: 'Warm Amber Lighting Visor', qty: '45-minute calming rest session' },
      { item: 'Duty Transfer to Sarah Chen', qty: 'Sarah takes over routine medical checks' }
    ],
    predictedRecoveryHours: 14.5,
    crewReadinessImpact: '-16 points'
  },
  {
    id: 'SCENARIO-02',
    name: 'Cabin Air & Pressure Drop',
    description: 'Simulates sudden cabin air leak — crew puts on emergency oxygen masks.',
    requiredSupplies: [
      { item: '100% Emergency Oxygen Mask', qty: '2 units' },
      { item: 'Bleeding Control (TXA)', qty: '2 vials' },
      { item: 'Chest Bubble Doppler Probe', qty: '1 probe' }
    ],
    predictedRecoveryHours: 48,
    crewReadinessImpact: '-38 points'
  },
  {
    id: 'SCENARIO-03',
    name: 'Sudden Irregular Heartbeat',
    description: 'Simulates mineral shift causing irregular rapid heartbeats.',
    requiredSupplies: [
      { item: 'Heart Defibrillator (AED)', qty: '1 unit on standby' },
      { item: 'Electrolyte Mineral Drink 500ml', qty: '2 packets' },
      { item: 'Handheld Ultrasound', qty: '1 heart scan' }
    ],
    predictedRecoveryHours: 24,
    crewReadinessImpact: '-25 points'
  }
];
