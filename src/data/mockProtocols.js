// MISSION-MEDIC: Offline Deep Space Clinical Protocol Knowledge Base
// Simple, step-by-step emergency instructions that work 100% locally without internet

export const MEDICAL_PROTOCOLS = [
  {
    id: 'SOP-FATIGUE-01',
    title: 'Protocol 1: Astronaut Rest & Fatigue Recovery',
    category: 'Rest & Alertness',
    triggerCriteria: 'Sleep debt > 4 hours OR heart rate elevated from tiredness',
    steps: [
      {
        step: 1,
        instruction: 'Hand Over Active Duties: Reassign high-focus mission tasks (medical checkups, spacewalks) to your certified backup.',
        actionRequired: 'Click "Reassign Duties" in Crew Matrix'
      },
      {
        step: 2,
        instruction: 'Take Quick Reaction Check: Complete a 2-minute focus test on the station screen to measure reaction speed.',
        actionRequired: 'Verify reaction time'
      },
      {
        step: 3,
        instruction: 'Protected Sleep: Rest for 6 to 8 hours in dark, quiet sleep quarters with dimmed warm lighting.',
        actionRequired: 'Dim sleep quarters lights'
      },
      {
        step: 4,
        instruction: 'Emergency Alertness Tablet: If an urgent station emergency arises and sleep is impossible, take 1 Modafinil tablet with water.',
        actionRequired: 'Dispense 1 Modafinil from Med Vault'
      }
    ]
  },
  {
    id: 'SOP-HYPOXIA-02',
    title: 'Protocol 2: Low Oxygen & Cabin Air Emergency',
    category: 'Air & Breathing',
    triggerCriteria: 'Oxygen saturation (SpO2) drops below 92% OR cabin air pressure falls',
    steps: [
      {
        step: 1,
        instruction: 'Put on Emergency Oxygen Mask immediately (100% pure oxygen supply).',
        actionRequired: 'Secure mask seal over nose and mouth'
      },
      {
        step: 2,
        instruction: 'Switch on extra air scrubbers to clean cabin air and remove excess carbon dioxide.',
        actionRequired: 'Turn on backup air recyclers'
      },
      {
        step: 3,
        instruction: 'Watch wearable sensor readings until blood oxygen rises back to healthy levels (98%+).',
        actionRequired: 'Verify SpO2 returns above 97%'
      }
    ]
  },
  {
    id: 'SOP-ARRHYTHMIA-03',
    title: 'Protocol 3: Irregular Heartbeat & Pulse Guide',
    category: 'Heart Health',
    triggerCriteria: 'Resting pulse exceeds 120 bpm OR irregular heartbeat patterns detected',
    steps: [
      {
        step: 1,
        instruction: 'Rest in medical bed: Have the astronaut lie down comfortably in the medical station.',
        actionRequired: 'Rest astronaut in calm position'
      },
      {
        step: 2,
        instruction: 'Turn on high-detail heart monitoring on the wearable strap.',
        actionRequired: 'Switch ECG to diagnostic mode'
      },
      {
        step: 3,
        instruction: 'Test mineral and hydration levels (potassium and magnesium) using the handheld analyzer.',
        actionRequired: 'Run quick blood droplet test'
      },
      {
        step: 4,
        instruction: 'Keep emergency defibrillator on standby nearby as a safety precaution.',
        actionRequired: 'Verify defibrillator battery is ready'
      }
    ]
  }
];

export const OFFLINE_DIAGNOSTIC_FLOWS = {
  fatigue: {
    symptomPrompt: 'Astronaut is showing signs of tiredness, elevated resting heart rate, or slower reaction time.',
    questions: [
      {
        id: 'q1',
        text: 'How many hours of uninterrupted sleep did the astronaut get in the last 24 hours?',
        options: ['Less than 4 hours (Severe deficit)', '4 to 6 hours (Moderate fatigue)', 'More than 6 hours (Normal)']
      },
      {
        id: 'q2',
        text: 'Is the astronaut experiencing headaches, eye strain, or motion sickness?',
        options: ['No headaches, just feeling tired', 'Mild headache & heavy eyes', 'Dizzy or nauseous']
      },
      {
        id: 'q3',
        text: 'Is the astronaut scheduled for high-focus duties (spacewalk, docking, critical maintenance) right now?',
        options: ['Yes — High-risk duties coming up (Reassign now)', 'No — Standby or quiet lab tasks only']
      }
    ]
  }
};
