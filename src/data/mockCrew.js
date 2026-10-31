// ASTRA-SENSE: Long-Duration Crew Health Profile Data
// Clean, minimal, human-centered physiological models & Isolation Forest analytics

export const CREW_DATA = [
  {
    id: 'AST-01',
    name: 'Dr. Elena Vance',
    callsign: 'Vance',
    role: 'Medical Officer',
    dutyCategory: 'Medical',
    condition: 'Fatigued',
    conditionSeverity: 'warning',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    avatar: 'EV',
    age: 38,
    bloodType: 'O+',
    missionDay: 142,
    suitId: 'EVA-SUIT-03',
    readinessScore: 52,
    readinessBreakdown: {
      physical: 64,
      cognitive: 46,
      circadian: 42,
      cardiovascular: 56
    },
    vitals: {
      heartRate: 84,
      heartRateBaseline: 64,
      spo2: 96,
      spo2Baseline: 98,
      temperature: 37.1,
      tempBaseline: 36.6,
      hrv: 24,
      hrvBaseline: 55,
      respiration: 18,
      respirationBaseline: 14,
      bloodPressure: '128/86',
      bpBaseline: '116/74',
      imuActivity: 'Restless / Low',
      sleepDebtHours: 6.4,
      sleepLast24h: 3.2,
      deepSleepPercent: 8,
      circadianPhaseShiftHours: +2.8,
      radiationDoseDaily_mSv: 0.84,
      radiationCumulative_mSv: 118.6
    },
    sensorReliability: {
      overall: 98,
      leadContact: 'Nominal',
      signalToNoiseRatio: 28.4,
      packetLossPercent: 0.2,
      hardwareStatus: 'ESP32 Active'
    },
    mlModel: {
      anomalyScore: -0.42,
      status: 'Fatigue Outlier',
      primaryFactors: [
        { feature: 'Heart Rate Variability', deviation: '-56%', impact: 0.44 },
        { feature: 'Sleep Debt (72h)', deviation: '+6.4h', impact: 0.32 },
        { feature: 'Resting Pulse Drift', deviation: '+31%', impact: 0.18 },
        { feature: 'Core Temperature', deviation: '+0.5°C', impact: 0.06 }
      ],
      cognitiveLatencyDelta_ms: +185,
      isolationForestConfidence: 94.2
    },
    responsibilities: [
      { id: 'RESP-01', title: 'Crew Clinical Checkups', priority: 'High', canDelegate: true },
      { id: 'RESP-02', title: 'Emergency Trauma Surgery Readiness', priority: 'Critical', canDelegate: true },
      { id: 'RESP-03', title: 'Pharmacy Vault Dispensation', priority: 'Medium', canDelegate: true }
    ],
    backupOfficer: {
      id: 'AST-02',
      name: 'Cmdr. Sarah Chen',
      qualification: 'Level 2 Flight Medicine Certified'
    },
    recommendation: 'Astronaut A has reported significant fatigue. Consider postponing non-urgent medical duties, assigning a qualified backup, and reassessing readiness after rest.',
    assignedBackupId: 'AST-02',
    isReassigned: false,
    timelineNotes: 'Continuous 38h duty following ECLSS filter maintenance. High restorative sleep deficit.'
  },
  {
    id: 'AST-02',
    name: 'Cmdr. Sarah Chen',
    callsign: 'Apex',
    role: 'Navigation',
    dutyCategory: 'Navigation',
    condition: 'Healthy',
    conditionSeverity: 'nominal',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    avatar: 'SC',
    age: 44,
    bloodType: 'A+',
    missionDay: 142,
    suitId: 'EVA-SUIT-01',
    readinessScore: 89,
    readinessBreakdown: {
      physical: 92,
      cognitive: 88,
      circadian: 86,
      cardiovascular: 90
    },
    vitals: {
      heartRate: 66,
      heartRateBaseline: 65,
      spo2: 99,
      spo2Baseline: 99,
      temperature: 36.6,
      tempBaseline: 36.5,
      hrv: 58,
      hrvBaseline: 60,
      respiration: 13,
      respirationBaseline: 13,
      bloodPressure: '118/76',
      bpBaseline: '118/75',
      imuActivity: 'Active',
      sleepDebtHours: 0.5,
      sleepLast24h: 7.8,
      deepSleepPercent: 21,
      circadianPhaseShiftHours: -0.2,
      radiationDoseDaily_mSv: 0.79,
      radiationCumulative_mSv: 112.4
    },
    sensorReliability: {
      overall: 99,
      leadContact: 'Optimal',
      signalToNoiseRatio: 34.2,
      packetLossPercent: 0.05,
      hardwareStatus: 'ESP32 Active'
    },
    mlModel: {
      anomalyScore: 0.38,
      status: 'Nominal Baseline',
      primaryFactors: [
        { feature: 'Cardiovascular Stability', deviation: '+1.5%', impact: 0.08 },
        { feature: 'Sleep Architecture', deviation: '+4.0%', impact: 0.05 }
      ],
      cognitiveLatencyDelta_ms: -15,
      isolationForestConfidence: 98.7
    },
    responsibilities: [
      { id: 'RESP-05', title: 'Orbital Insertion Calculation', priority: 'Critical', canDelegate: false },
      { id: 'RESP-06', title: 'Deep Space Network Sync', priority: 'Medium', canDelegate: true },
      { id: 'RESP-07', title: 'Station Flight Operations', priority: 'Critical', canDelegate: false }
    ],
    backupOfficer: {
      id: 'AST-03',
      name: 'Lt. Marcus Reyes',
      qualification: 'Secondary Flight Guidance Specialist'
    },
    recommendation: 'Nominal baseline. High cognitive alertness. Eligible to assume medical duties for Dr. Vance.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Completed 8h regular rest cycle and countermeasure workout.'
  },
  {
    id: 'AST-03',
    name: 'Lt. Marcus Reyes',
    callsign: 'Reyes',
    role: 'Engineering',
    dutyCategory: 'Engineering',
    condition: 'Healthy',
    conditionSeverity: 'nominal',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    avatar: 'MR',
    age: 35,
    bloodType: 'B+',
    missionDay: 142,
    suitId: 'EVA-SUIT-02',
    readinessScore: 94,
    readinessBreakdown: {
      physical: 96,
      cognitive: 92,
      circadian: 94,
      cardiovascular: 95
    },
    vitals: {
      heartRate: 70,
      heartRateBaseline: 68,
      spo2: 98,
      spo2Baseline: 98,
      temperature: 36.7,
      tempBaseline: 36.7,
      hrv: 52,
      hrvBaseline: 54,
      respiration: 14,
      respirationBaseline: 14,
      bloodPressure: '120/78',
      bpBaseline: '119/77',
      imuActivity: 'Working Load',
      sleepDebtHours: 0.8,
      sleepLast24h: 7.4,
      deepSleepPercent: 19,
      circadianPhaseShiftHours: +0.4,
      radiationDoseDaily_mSv: 0.82,
      radiationCumulative_mSv: 115.1
    },
    sensorReliability: {
      overall: 97,
      leadContact: 'Nominal',
      signalToNoiseRatio: 31.8,
      packetLossPercent: 0.12,
      hardwareStatus: 'ESP32 Active'
    },
    mlModel: {
      anomalyScore: 0.41,
      status: 'Nominal Baseline',
      primaryFactors: [
        { feature: 'Respiration Symmetry', deviation: '+0.5%', impact: 0.04 },
        { feature: 'Core Thermal Regulation', deviation: '0.0%', impact: 0.02 }
      ],
      cognitiveLatencyDelta_ms: +5,
      isolationForestConfidence: 97.9
    },
    responsibilities: [
      { id: 'RESP-08', title: 'ECLSS O2/CO2 Partial Pressure Balancer', priority: 'Critical', canDelegate: false },
      { id: 'RESP-09', title: 'Solar Array Alignment Calibration', priority: 'Medium', canDelegate: true },
      { id: 'RESP-10', title: 'Water Recycling Maintenance', priority: 'High', canDelegate: false }
    ],
    backupOfficer: {
      id: 'AST-04',
      name: 'Dr. Kenji Sato',
      qualification: 'Secondary Life Support Systems'
    },
    recommendation: 'Baseline in exceptional condition. Ready to support primary engineering or backup EVA duties.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Completed maintenance on Sabatier reactor without physiological stress.'
  },
  {
    id: 'AST-04',
    name: 'Dr. Kenji Sato',
    callsign: 'Kitsune',
    role: 'Research',
    dutyCategory: 'Research',
    condition: 'Healthy',
    conditionSeverity: 'nominal',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    avatar: 'KS',
    age: 41,
    bloodType: 'AB-',
    missionDay: 142,
    suitId: 'EVA-SUIT-04',
    readinessScore: 86,
    readinessBreakdown: {
      physical: 84,
      cognitive: 89,
      circadian: 83,
      cardiovascular: 88
    },
    vitals: {
      heartRate: 68,
      heartRateBaseline: 67,
      spo2: 98,
      spo2Baseline: 99,
      temperature: 36.8,
      tempBaseline: 36.6,
      hrv: 49,
      hrvBaseline: 52,
      respiration: 15,
      respirationBaseline: 14,
      bloodPressure: '122/79',
      bpBaseline: '120/78',
      imuActivity: 'Laboratory Work',
      sleepDebtHours: 1.6,
      sleepLast24h: 6.9,
      deepSleepPercent: 17,
      circadianPhaseShiftHours: -0.6,
      radiationDoseDaily_mSv: 0.81,
      radiationCumulative_mSv: 114.7
    },
    sensorReliability: {
      overall: 94,
      leadContact: 'Nominal',
      signalToNoiseRatio: 26.5,
      packetLossPercent: 0.45,
      hardwareStatus: 'ESP32 Active'
    },
    mlModel: {
      anomalyScore: 0.34,
      status: 'Nominal Baseline',
      primaryFactors: [
        { feature: 'Muscular Tonus', deviation: '-2.1%', impact: 0.11 },
        { feature: 'Hydration Osmolarity', deviation: '-1.4%', impact: 0.07 }
      ],
      cognitiveLatencyDelta_ms: +12,
      isolationForestConfidence: 96.1
    },
    responsibilities: [
      { id: 'RESP-11', title: 'Bio-Incubator Sequencing', priority: 'Medium', canDelegate: true },
      { id: 'RESP-12', title: 'Cosmic Radiation Dosimetry', priority: 'High', canDelegate: false },
      { id: 'RESP-13', title: 'Hydroponics Growth Monitoring', priority: 'Low', canDelegate: true }
    ],
    backupOfficer: {
      id: 'AST-01',
      name: 'Dr. Elena Vance',
      qualification: 'Secondary Biological Laboratory'
    },
    recommendation: 'Stable physiological profile. Ready to assist station research and operations.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Completed 4-hour specimen incubation protocol in glovebox.'
  }
];

export const CREW_TREND_HISTORY = [
  { time: '00:00', vanceHR: 76, chenHR: 64, reyesHR: 69, satoHR: 66, crewAvgReadiness: 79 },
  { time: '02:00', vanceHR: 79, chenHR: 62, reyesHR: 67, satoHR: 65, crewAvgReadiness: 77 },
  { time: '04:00', vanceHR: 83, chenHR: 61, reyesHR: 66, satoHR: 64, crewAvgReadiness: 74 },
  { time: '06:00', vanceHR: 85, chenHR: 67, reyesHR: 71, satoHR: 67, crewAvgReadiness: 71 },
  { time: '08:00', vanceHR: 87, chenHR: 72, reyesHR: 74, satoHR: 70, crewAvgReadiness: 69 },
  { time: '10:00', vanceHR: 86, chenHR: 68, reyesHR: 72, satoHR: 69, crewAvgReadiness: 68 },
  { time: '12:00', vanceHR: 84, chenHR: 66, reyesHR: 70, satoHR: 68, crewAvgReadiness: 68 }
];

export const CREW_READINESS_METRICS = {
  overallScore: 68,
  statusDescription: 'Elevated Operational Risk — Medical Redundancy Depleted',
  disclaimer: 'Illustrative simulated score, not a clinically validated measurement.',
  dimensions: [
    { label: 'Physical Status', value: 72, max: 100 },
    { label: 'Fatigue & Circadian', value: 58, max: 100 },
    { label: 'Task Coverage Redundancy', value: 74, max: 100 },
    { label: 'Environmental Tolerance', value: 89, max: 100 }
  ],
  aiRecommendation: 'Astronaut A has reported significant fatigue. Consider postponing non-urgent medical duties, assigning a qualified backup, and reassessing readiness after rest.'
};
