// MISSION-INCIDENTS & CONTINUITY EVENT LOGS
// Module 6: Offline Event Storage with Earth Deep Space Network synchronization status

export const RECENT_INCIDENTS = [
  {
    id: 'INC-2026-142-01',
    timestamp: 'MET 142d 04:22:15',
    severity: 'WARNING',
    type: 'Fatigue & Cognitive Saccade Drift',
    targetAstronautId: 'AST-01',
    targetAstronautName: 'Dr. Elena Vance',
    summary: 'Resting pulse elevated to 84 bpm (+31%). 72-hour sleep debt reached 6.4h. Isolation forest anomaly score dropped to -0.42.',
    resolutionStatus: 'Active - Action Pending',
    syncStatus: 'Cached Locally (Deep Space DSN Latency 14m 22s)',
    assignedOfficer: 'Cmdr. Sarah Chen',
    actionsTaken: [
      'ASTRA SENSE continuous ECG band switched to high-resolution mode.',
      'AI Recommendation generated: Postpone non-urgent medical duties and assign backup.'
    ]
  },
  {
    id: 'INC-2026-141-03',
    timestamp: 'MET 141d 19:15:00',
    severity: 'ADVISORY',
    type: 'Microgravity Fluid Shift Nasal Congestion',
    targetAstronautId: 'AST-03',
    targetAstronautName: 'Lt. Marcus Reyes',
    summary: 'Cephalad venous engorgement detected during sleep cycle. SpO2 dipped transiently to 95%.',
    resolutionStatus: 'Resolved',
    syncStatus: 'Synced with Houston Mission Control',
    assignedOfficer: 'Dr. Elena Vance',
    actionsTaken: [
      'Lower Body Negative Pressure (LBNP) 20 min session administered.',
      'SpO2 recovered to 98% baseline within 30 minutes.'
    ]
  },
  {
    id: 'INC-2026-139-02',
    timestamp: 'MET 139d 11:08:44',
    severity: 'ADVISORY',
    type: 'Wearable Sensor Motion Artifact',
    targetAstronautId: 'AST-04',
    targetAstronautName: 'Dr. Kenji Sato',
    summary: 'Lead contact impedance fluctuation during treadmill ergometer exercise session.',
    resolutionStatus: 'Auto-Recovered',
    syncStatus: 'Synced with Houston Mission Control',
    assignedOfficer: 'System Auto-Filter',
    actionsTaken: [
      'ASTRA SENSE noise suppression algorithm engaged.',
      'Electrode gel integrity re-verified.'
    ]
  }
];

export const RECOVERY_TIMELINES = [
  {
    astronautId: 'AST-01',
    name: 'Dr. Elena Vance',
    protocol: 'Spaceflight Fatigue Recovery Protocol (SOP-MED-09)',
    currentStep: 'Step 2: 8-Hour Protected Sleep Cycle in Sound-Isolated Sleep Quarters',
    progressPercent: 35,
    projectedFullRecoveryMET: '143d 08:00:00',
    sleepDebtTarget: 'Reduce from 6.4h to < 1.5h',
    exercisePermitted: 'Light Stretching Only (No Resistance ARED exercise until sleep verified)',
    circadianLightProfile: 'Filtered Red Shift (450nm notch filter engaged)'
  },
  {
    astronautId: 'AST-02',
    name: 'Cmdr. Sarah Chen',
    protocol: 'Nominal Mission Endurance Maintenance',
    currentStep: 'Cardiovascular Conditioning Phase 3',
    progressPercent: 90,
    projectedFullRecoveryMET: 'Fully Ready',
    sleepDebtTarget: 'Maintain < 1.0h',
    exercisePermitted: 'Full Protocol (T2 Treadmill + ARED Squats)',
    circadianLightProfile: 'Dynamic White Daylight (6500K)'
  }
];

