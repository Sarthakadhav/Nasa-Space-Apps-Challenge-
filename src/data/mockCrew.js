// ASTRA-SENSE: Long-Duration Crew Health Profile Data
// Human-centered physiological models with friendly, plain-language clinical insights

export const CREW_DATA = [
  {
    id: 'AST-01',
    name: 'Dr. Elena Vance',
    callsign: 'Vance',
    role: 'Medical Officer',
    dutyCategory: 'Medical',
    condition: 'Tired (Needs Rest)',
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
      status: 'Fatigue Alert (Needs Rest)',
      primaryFactors: [
        { feature: 'Heart Rhythm Variability', deviation: '-56% (Body Stress)', impact: 0.44 },
        { feature: 'Missed Sleep (72h)', deviation: '6.4 hours deficit', impact: 0.32 },
        { feature: 'Resting Heart Rate', deviation: '+31% higher than normal', impact: 0.18 },
        { feature: 'Body Temperature', deviation: '+0.5°C slight elevation', impact: 0.06 }
      ],
      cognitiveLatencyDelta_ms: +185,
      isolationForestConfidence: 94.2
    },
    responsibilities: [
      { id: 'RESP-01', title: 'Daily Crew Health Checks', priority: 'High', canDelegate: true },
      { id: 'RESP-02', title: 'Emergency Surgery Standby', priority: 'Critical', canDelegate: true },
      { id: 'RESP-03', title: 'Medicine Vault Dispensing', priority: 'Medium', canDelegate: true }
    ],
    backupOfficer: {
      id: 'AST-02',
      name: 'Cmdr. Sarah Chen',
      qualification: 'Certified Backup Flight Doctor'
    },
    recommendation: 'Dr. Vance worked 38 hours straight and is short on sleep. We recommend handing over routine medical tasks to Cmdr. Sarah Chen so Dr. Vance can get 8 hours of quiet sleep.',
    assignedBackupId: 'AST-02',
    isReassigned: false,
    timelineNotes: 'Worked 38 hours continuously repairing life-support filters. Needs an 8-hour sleep break to recharge.'
  },
  {
    id: 'AST-02',
    name: 'Cmdr. Sarah Chen',
    callsign: 'Apex',
    role: 'Navigation & Commander',
    dutyCategory: 'Navigation',
    condition: 'Healthy & Alert',
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
      status: 'Normal & Healthy',
      primaryFactors: [
        { feature: 'Heart Rate Stability', deviation: 'Normal (+1.5%)', impact: 0.08 },
        { feature: 'Sleep Quality', deviation: 'Well-Rested (+4.0%)', impact: 0.05 }
      ],
      cognitiveLatencyDelta_ms: -15,
      isolationForestConfidence: 98.7
    },
    responsibilities: [
      { id: 'RESP-05', title: 'Orbital Path Calculations', priority: 'Critical', canDelegate: false },
      { id: 'RESP-06', title: 'Earth Antenna Communications', priority: 'Medium', canDelegate: true },
      { id: 'RESP-07', title: 'Spacecraft Flight Steering', priority: 'Critical', canDelegate: false }
    ],
    backupOfficer: {
      id: 'AST-03',
      name: 'Lt. Marcus Reyes',
      qualification: 'Secondary Flight Guidance Specialist'
    },
    recommendation: 'Excellent physical condition and sharp alertness. Ready to take over medical checkups for Dr. Vance.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Completed 8 hours of restful sleep and full workout.'
  },
  {
    id: 'AST-03',
    name: 'Lt. Marcus Reyes',
    callsign: 'Reyes',
    role: 'Engineering & Life Support',
    dutyCategory: 'Engineering',
    condition: 'Healthy & Energetic',
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
      status: 'Normal & Healthy',
      primaryFactors: [
        { feature: 'Breathing Rhythm', deviation: 'Normal (+0.5%)', impact: 0.04 },
        { feature: 'Body Heat Balance', deviation: 'Optimal (0.0°C)', impact: 0.02 }
      ],
      cognitiveLatencyDelta_ms: 5,
      isolationForestConfidence: 97.9
    },
    responsibilities: [
      { id: 'RESP-08', title: 'Cabin Oxygen & Air Balancer', priority: 'Critical', canDelegate: false },
      { id: 'RESP-09', title: 'Solar Power Alignment', priority: 'Medium', canDelegate: true },
      { id: 'RESP-10', title: 'Water Recycling Maintenance', priority: 'High', canDelegate: false }
    ],
    backupOfficer: {
      id: 'AST-04',
      name: 'Dr. Kenji Sato',
      qualification: 'Secondary Life Support Specialist'
    },
    recommendation: 'In top physical shape. Fully ready to support station engineering or spacewalk duties.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Finished life support check with normal heart rate and zero fatigue.'
  },
  {
    id: 'AST-04',
    name: 'Dr. Kenji Sato',
    callsign: 'Kitsune',
    role: 'Science & Payload Research',
    dutyCategory: 'Research',
    condition: 'Healthy & Focused',
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
      status: 'Normal & Healthy',
      primaryFactors: [
        { feature: 'Muscle Activity', deviation: 'Normal (-2.1%)', impact: 0.11 },
        { feature: 'Hydration Level', deviation: 'Optimal (-1.4%)', impact: 0.07 }
      ],
      cognitiveLatencyDelta_ms: 12,
      isolationForestConfidence: 96.1
    },
    responsibilities: [
      { id: 'RESP-11', title: 'Biology Lab Experiments', priority: 'Medium', canDelegate: true },
      { id: 'RESP-12', title: 'Space Radiation Sensor Checks', priority: 'High', canDelegate: false },
      { id: 'RESP-13', title: 'Fresh Plant Growth Garden', priority: 'Low', canDelegate: true }
    ],
    backupOfficer: {
      id: 'AST-01',
      name: 'Dr. Elena Vance',
      qualification: 'Secondary Biological Laboratory Specialist'
    },
    recommendation: 'Stable health and good focus. Ready for laboratory research and daily tasks.',
    assignedBackupId: null,
    isReassigned: false,
    timelineNotes: 'Completed 4 hours of plant biology experiments smoothly.'
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
  statusDescription: 'Attention Needed: Dr. Vance is tired. Handing off duties will bring the team to full readiness.',
  disclaimer: 'Demonstration readiness score based on astronaut vitals, sleep, and backup coverage.',
  dimensions: [
    { label: 'Body Energy & Vitals', value: 72, max: 100 },
    { label: 'Sleep & Rest (Circadian)', value: 58, max: 100 },
    { label: 'Team Backup Coverage', value: 74, max: 100 },
    { label: 'Cabin & Air Safety', value: 89, max: 100 }
  ],
  aiRecommendation: 'Dr. Elena Vance has accumulated 6.4 hours of sleep debt. Recommend handing over routine medical checks to Cmdr. Sarah Chen so Dr. Vance can get 8 hours of quiet sleep.'
};
