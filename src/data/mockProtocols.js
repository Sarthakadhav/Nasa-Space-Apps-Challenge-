// MISSION-MEDIC: Offline Deep Space Clinical Protocol Knowledge Base
// Module 5: Operates 100% locally when Earth communication has 14-24 min one-way delay

export const MEDICAL_PROTOCOLS = [
  {
    id: 'SOP-FATIGUE-01',
    title: 'Acute Spaceflight Fatigue & Cognitive Degradation Countermeasure',
    category: 'Neuro-Cognitive & Circadian',
    triggerCriteria: 'Sleep debt > 4h OR HRV drop > 35% OR Anomaly Score < -0.30',
    steps: [
      {
        step: 1,
        instruction: 'Immediate Workload Freeze: Reassign active high-risk mission duties (EVA, Medical, Docking) to primary backup.',
        actionRequired: 'Execute Crew Matrix Task Redistribution'
      },
      {
        step: 2,
        instruction: 'Administer Neuro-Cognitive Saccade and PVT (Psychomotor Vigilance Test) via station terminal.',
        actionRequired: 'Verify PVT reaction latency'
      },
      {
        step: 3,
        instruction: 'Initiate 6-8h protected dark sleep cycle with circadian blue-light restriction (< 10 lux warm ambient).',
        actionRequired: 'Crew habitat environmental adjustment'
      },
      {
        step: 4,
        instruction: 'If acute operational alertness is unavoidable for critical station emergency, administer Modafinil 100-200mg PO with 500ml water.',
        actionRequired: 'Med-Vault dispensation authorization'
      }
    ]
  },
  {
    id: 'SOP-HYPOXIA-02',
    title: 'Hypoxia & ECLSS Cabin Atmosphere Contamination Emergency',
    category: 'Respiratory / Life Support',
    triggerCriteria: 'SpO2 < 92% OR Cabin pO2 < 18 kPa OR Ambient CO2 > 4.5 mmHg',
    steps: [
      {
        step: 1,
        instruction: 'Don Emergency Oxygen Mask (100% O2 positive pressure regulator) immediately.',
        actionRequired: 'Immediate mask seal check'
      },
      {
        step: 2,
        instruction: 'Verify cabin pCO2 on ECLSS telemetry console; engage auxiliary lithium hydroxide canister scrubbers.',
        actionRequired: 'ECLSS manual override'
      },
      {
        step: 3,
        instruction: 'Continuously sample SpO2 and peripheral perfusion index via ASTRA SENSE wearable telemetry.',
        actionRequired: 'Monitor return to > 97% SpO2'
      }
    ]
  },
  {
    id: 'SOP-ARRHYTHMIA-03',
    title: 'Microgravity Induced Cardiac Dysrhythmia & Electrolyte Derangement',
    category: 'Cardiovascular',
    triggerCriteria: 'ASTRA SENSE detection of persistent PVCs > 6/min or sustained tachycardia > 120 bpm at rest',
    steps: [
      {
        step: 1,
        instruction: 'Place astronaut in horizontal restraint harness in Med-Bay station.',
        actionRequired: 'Patient stabilization'
      },
      {
        step: 2,
        instruction: 'Deploy 5-lead diagnostic telemetry with ASTRA SENSE high-fidelity sampling mode (250 Hz).',
        actionRequired: 'Run 12-lead equivalent rhythm trace'
      },
      {
        step: 3,
        instruction: 'Measure serum potassium and magnesium via in-flight i-STAT point-of-care dry cartridge analyzer.',
        actionRequired: 'Check electrolytes within 5 minutes'
      },
      {
        step: 4,
        instruction: 'If ventricular arrhythmia refractory, stage Automated External Defibrillator (AED) in standby mode.',
        actionRequired: 'AED readiness verified'
      }
    ]
  }
];

export const OFFLINE_DIAGNOSTIC_FLOWS = {
  fatigue: {
    symptomPrompt: 'Astronaut is exhibiting elevated resting pulse, micro-sleep episodes, or delayed reaction times.',
    questions: [
      {
        id: 'q1',
        text: 'How many hours of uninterrupted sleep was achieved in the preceding 24 hours?',
        options: ['Less than 4 hours', '4 to 6 hours', 'Greater than 6 hours']
      },
      {
        id: 'q2',
        text: 'Are there symptoms of headaches, nausea, or visual aura (space motion / SANS)?',
        options: ['No neurological symptoms, strictly exhaustion', 'Mild headache & eye strain', 'Marked nausea and dizziness']
      },
      {
        id: 'q3',
        text: 'Is the astronaut scheduled for imminent critical mission procedures (EVA, docking, ECLSS surgery)?',
        options: ['Yes - High Risk Duties Imminent', 'No - Standby / Laboratory Duties Only']
      }
    ]
  }
};

