// MISSION-INCIDENTS & CONTINUITY EVENT LOGS
// Offline Event Storage with Earth Deep Space Network (DSN) transmission status

export const RECENT_INCIDENTS = [
  {
    id: 'INC-2026-142-01',
    timestamp: 'MET 142d 04:22:15',
    severity: 'WARNING',
    type: 'Astronaut Tiredness & Slowed Reaction',
    targetAstronautId: 'AST-01',
    targetAstronautName: 'Dr. Elena Vance',
    summary: 'Resting pulse rose to 84 bpm (normal is 64). Sleep debt reached 6.4 hours after a 38-hour shift. Recommend duty handoff so Dr. Vance can sleep.',
    resolutionStatus: 'Active - Action Pending',
    syncStatus: 'Saved Onboard (Earth Link Delay 14m 22s)',
    assignedOfficer: 'Cmdr. Sarah Chen',
    actionsTaken: [
      'Heart monitoring strap switched to high-resolution mode.',
      'AI Recommendation: Hand over routine medical tasks to Cmdr. Sarah Chen.'
    ]
  },
  {
    id: 'INC-2026-141-03',
    timestamp: 'MET 141d 19:15:00',
    severity: 'ADVISORY',
    type: 'Mild Stuffy Nose from Space Weightlessness',
    targetAstronautId: 'AST-03',
    targetAstronautName: 'Lt. Marcus Reyes',
    summary: 'Blood and fluids shifted toward head during sleep, causing mild sinus congestion. Oxygen dipped briefly to 95%.',
    resolutionStatus: 'Resolved',
    syncStatus: 'Synced with Houston Mission Control',
    assignedOfficer: 'Dr. Elena Vance',
    actionsTaken: [
      '20-minute gentle leg pressure session given to bring blood flow down.',
      'Oxygen levels returned to healthy 98% within 30 minutes.'
    ]
  },
  {
    id: 'INC-2026-139-02',
    timestamp: 'MET 139d 11:08:44',
    severity: 'ADVISORY',
    type: 'Chest Sensor Moved During Treadmill Workout',
    targetAstronautId: 'AST-04',
    targetAstronautName: 'Dr. Kenji Sato',
    summary: 'Chest strap moved slightly during treadmill running, creating temporary reading noise.',
    resolutionStatus: 'Auto-Recovered',
    syncStatus: 'Synced with Houston Mission Control',
    assignedOfficer: 'System Auto-Filter',
    actionsTaken: [
      'Software automatically cleaned and filtered out motion noise.',
      'Chest sensor strap position verified.'
    ]
  }
];

export const RECOVERY_TIMELINES = [
  {
    astronautId: 'AST-01',
    name: 'Dr. Elena Vance',
    protocol: 'Astronaut Sleep & Rest Plan',
    currentStep: 'Step 2: 8 Hours of Quiet Sleep in Isolated Sleep Pod',
    progressPercent: 35,
    projectedFullRecoveryMET: 'Day 143, 08:00 AM',
    sleepDebtTarget: 'Reduce sleep deficit from 6.4h to under 1.5h',
    exercisePermitted: 'Light stretching only (no heavy treadmill until rested)',
    circadianLightProfile: 'Warm soothing amber lighting'
  },
  {
    astronautId: 'AST-02',
    name: 'Cmdr. Sarah Chen',
    protocol: 'Daily Fitness & Health Routine',
    currentStep: 'Cardio & Strength Training Phase 3',
    progressPercent: 90,
    projectedFullRecoveryMET: 'Fully Ready & Fit',
    sleepDebtTarget: 'Maintain under 1.0h',
    exercisePermitted: 'Full workout (treadmill and weights)',
    circadianLightProfile: 'Bright daytime daylight (6500K)'
  }
];
