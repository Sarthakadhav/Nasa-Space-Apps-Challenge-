import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CREW_DATA, CREW_READINESS_METRICS, CREW_TREND_HISTORY } from '../data/mockCrew';
import { MEDICAL_INVENTORY, SIMULATED_EMERGENCY_SCENARIOS } from '../data/mockInventory';
import { RECENT_INCIDENTS, RECOVERY_TIMELINES } from '../data/mockIncidents';
import { MEDICAL_PROTOCOLS } from '../data/mockProtocols';

const MissionContext = createContext();

export const MissionProvider = ({ children }) => {
  const [crew, setCrew] = useState(CREW_DATA);
  const [selectedAstronautId, setSelectedAstronautId] = useState('AST-01');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Real-time IoT simulator controls
  const [isEspStreaming, setIsEspStreaming] = useState(true);
  const [sensorNoiseLevel, setSensorNoiseLevel] = useState('low'); // 'low' | 'moderate' | 'high'
  const [dsnLatencySeconds, setDsnLatencySeconds] = useState(862); // 14 mins 22 secs Earth-Mars delay
  const [activeDrill, setActiveDrill] = useState(null);

  // Operational Readiness state
  const [crewReadiness, setCrewReadiness] = useState(CREW_READINESS_METRICS);
  
  // Inventory state
  const [inventory, setInventory] = useState(MEDICAL_INVENTORY);
  
  // Incidents and recovery logs
  const [incidents, setIncidents] = useState(RECENT_INCIDENTS);
  const [recoveryTimelines, setRecoveryTimelines] = useState(RECOVERY_TIMELINES);
  
  // Workload redistribution state
  const [isRedistributed, setIsRedistributed] = useState(false);

  // Mission Elapsed Time (MET) counter
  const [met, setMet] = useState({ days: 142, hours: 4, mins: 36, secs: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setMet(prev => {
        let { days, hours, mins, secs } = prev;
        secs += 1;
        if (secs >= 60) {
          secs = 0;
          mins += 1;
        }
        if (mins >= 60) {
          mins = 0;
          hours += 1;
        }
        if (hours >= 24) {
          hours = 0;
          days += 1;
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live IoT telemetry fluctuations (heartbeat & breath variance)
  useEffect(() => {
    if (!isEspStreaming) return;

    const interval = setInterval(() => {
      setCrew(prevCrew =>
        prevCrew.map(ast => {
          // Add organic micro-variations
          const hrJitter = (Math.random() - 0.5) * 1.5;
          const tempJitter = (Math.random() - 0.5) * 0.05;
          const hrvJitter = (Math.random() - 0.5) * 1.0;

          // If Vance is under resting protocol, vitals gradually stabilize
          let currentHR = ast.vitals.heartRate;
          if (ast.id === 'AST-01' && isRedistributed) {
            currentHR = Math.max(68, currentHR - 0.1);
          }

          return {
            ...ast,
            vitals: {
              ...ast.vitals,
              heartRate: Math.round((currentHR + hrJitter) * 10) / 10,
              temperature: Math.round((ast.vitals.temperature + tempJitter) * 100) / 100,
              hrv: Math.max(15, Math.round((ast.vitals.hrv + hrvJitter) * 10) / 10),
            }
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isEspStreaming, isRedistributed]);

  // Execute Workload Redistribution (Core Module 3 demonstration)
  const applyWorkloadRedistribution = useCallback(() => {
    setIsRedistributed(true);
    
    // Update Vance's state
    setCrew(prev =>
      prev.map(ast => {
        if (ast.id === 'AST-01') {
          return {
            ...ast,
            condition: 'Resting & Recovering',
            conditionSeverity: 'nominal',
            isReassigned: true,
            recommendation: 'Duties safely handed over to Cmdr. Sarah Chen. Quiet rest period is active.',
            readinessScore: 78
          };
        }
        if (ast.id === 'AST-02') {
          return {
            ...ast,
            responsibilities: [
              ...ast.responsibilities,
              { id: 'RESP-01-TRANSFER', title: '[Covering for Vance] Daily Health Checkups', priority: 'High', canDelegate: false }
            ]
          };
        }
        return ast;
      })
    );

    // Update Crew Readiness Score from 68/100 to 82/100
    setCrewReadiness(prev => ({
      ...prev,
      overallScore: 82,
      statusDescription: 'Stable - Dr. Vance is resting while Cmdr. Chen covers duties',
      aiRecommendation: 'Workload transfer complete! Commander Chen is covering medical duties. Dr. Vance will rest for 8 hours.'
    }));

    // Add Incident Entry
    const newIncident = {
      id: `INC-2026-${Date.now().toString().slice(-4)}`,
      timestamp: `MET ${met.days}d ${String(met.hours).padStart(2, '0')}:${String(met.mins).padStart(2, '0')}:${String(met.secs).padStart(2, '0')}`,
      severity: 'NOMINAL',
      type: 'Crew Workload Handover Complete',
      targetAstronautId: 'AST-01',
      targetAstronautName: 'Dr. Elena Vance',
      summary: 'Medical tasks were safely handed to Cmdr. Sarah Chen. Dr. Vance has started an 8-hour sleep break.',
      resolutionStatus: 'In Progress - Astronaut Resting',
      syncStatus: 'Saved locally (Will send to Earth on next connection)',
      assignedOfficer: 'Cmdr. Sarah Chen',
      actionsTaken: [
        'Astronaut moved to quiet sleep cabin.',
        'Emergency first-response coverage handed to Cmdr. Chen.'
      ]
    };

    setIncidents(prev => [newIncident, ...prev]);
  }, [met]);

  // Trigger emergency drill scenario for demoing
  const triggerDrill = useCallback((scenarioId) => {
    const drill = SIMULATED_EMERGENCY_SCENARIOS.find(s => s.id === scenarioId);
    if (!drill) return;

    setActiveDrill(drill);

    if (scenarioId === 'SCENARIO-02') {
      // Cabin Depressurization / DCS
      setCrew(prev =>
        prev.map(ast => ({
          ...ast,
          vitals: {
            ...ast.vitals,
            spo2: Math.max(88, ast.vitals.spo2 - 7),
            heartRate: ast.vitals.heartRate + 25,
            respiration: ast.vitals.respiration + 6
          }
        }))
      );
      setCrewReadiness(prev => ({
        ...prev,
        overallScore: 48,
        statusDescription: 'URGENT ALERT: Low Cabin Air Pressure Detected',
        aiRecommendation: 'Put on oxygen masks right away. Pause all routine work until pressure stabilizes.'
      }));
    } else if (scenarioId === 'SCENARIO-03') {
      // Arrhythmia on Astronaut D
      setCrew(prev =>
        prev.map(ast => {
          if (ast.id === 'AST-04') {
            return {
              ...ast,
              condition: 'Irregular Heart Rhythm',
              conditionSeverity: 'critical',
              vitals: {
                ...ast.vitals,
                heartRate: 132,
                hrv: 18
              },
              mlModel: {
                ...ast.mlModel,
                anomalyScore: -0.78,
                status: 'Unusual heart rhythm detected - please rest'
              }
            };
          }
          return ast;
        })
      );
    }
  }, []);

  const resetAllSimulations = useCallback(() => {
    setCrew(CREW_DATA);
    setCrewReadiness(CREW_READINESS_METRICS);
    setIsRedistributed(false);
    setActiveDrill(null);
    setInventory(MEDICAL_INVENTORY);
  }, []);

  const selectedAstronaut = crew.find(a => a.id === selectedAstronautId) || crew[0];

  return (
    <MissionContext.Provider
      value={{
        crew,
        selectedAstronaut,
        selectedAstronautId,
        setSelectedAstronautId,
        activeTab,
        setActiveTab,
        crewReadiness,
        isEspStreaming,
        setIsEspStreaming,
        sensorNoiseLevel,
        setSensorNoiseLevel,
        dsnLatencySeconds,
        activeDrill,
        inventory,
        setInventory,
        incidents,
        recoveryTimelines,
        isRedistributed,
        applyWorkloadRedistribution,
        triggerDrill,
        resetAllSimulations,
        met,
        trendHistory: CREW_TREND_HISTORY
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};

