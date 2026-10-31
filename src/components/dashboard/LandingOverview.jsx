import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { useTheme } from '../../context/ThemeContext';
import { AstronautCard } from './AstronautCard';
import { CrewReadinessGauge } from './CrewReadinessGauge';
import { ActiveAlertsBanner } from './ActiveAlertsBanner';
import { HealthTrendComparison } from './HealthTrendComparison';
import { EcgWaveform } from '../common/EcgWaveform';

export const LandingOverview = () => {
  const { 
    crew, selectedAstronaut, dsnLatencySeconds, inventory, 
    incidents, setActiveTab 
  } = useMission();
  const { isMinimalView } = useTheme();

  const criticalSupplies = inventory.filter(item => item.vitalUrgency === 'Critical').slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 1. Calm Mission Status Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">
            Mission Link
          </span>
          <div className="flex items-center space-x-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              14m 22s Delay
            </span>
          </div>
          <span className="text-xs text-gray-400 block mt-0.5">
            Offline Edge Mode
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">
            Crew Status
          </span>
          <div className="flex items-center space-x-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              3 Healthy, 1 Fatigued
            </span>
          </div>
          <span className="text-xs text-gray-400 block mt-0.5">
            Dr. Vance Resting
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">
            Readiness Index
          </span>
          <div className="flex items-center space-x-1.5 mt-1.5">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
              68 / 100
            </span>
          </div>
          <span className="text-xs text-gray-400 block mt-0.5">
            Operational Risk
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">
            Med Vault
          </span>
          <div className="flex items-center space-x-1.5 mt-1.5">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              8 Categories Loaded
            </span>
          </div>
          <span className="text-xs text-gray-400 block mt-0.5">
            1 Low Stock (TXA)
          </span>
        </div>
      </div>

      {/* 2. Active Medical Alerts (Minimal human banner) */}
      <ActiveAlertsBanner />

      {/* 3. Catchy Multi-Astronaut Profile Cards with Photos & Spacing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Astronaut Profiles
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Select an astronaut to review live physiological telemetry and clinical status.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('crew-matrix')}
            className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center space-x-1"
          >
            <span>Crew Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {crew.map(astronaut => (
            <AstronautCard key={astronaut.id} astronaut={astronaut} />
          ))}
        </div>
      </div>

      {/* 4. Live ECG Trace for Selected Astronaut */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Live Cardiac Trace: {selectedAstronaut.name} ({selectedAstronaut.role})
            </h3>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Heart Rate: <strong className="text-gray-800 dark:text-gray-200">{selectedAstronaut.vitals.heartRate} bpm</strong></span>
            <span>SpO₂: <strong className="text-gray-800 dark:text-gray-200">{selectedAstronaut.vitals.spo2}%</strong></span>
            <span>HRV: <strong className="text-gray-800 dark:text-gray-200">{selectedAstronaut.vitals.hrv} ms</strong></span>
          </div>
        </div>

        <EcgWaveform
          heartRate={selectedAstronaut.vitals.heartRate}
          isAbnormal={selectedAstronaut.conditionSeverity !== 'nominal'}
          height={60}
        />
      </div>

      {/* 5. Crew Operational Readiness 68/100 Demonstration */}
      <CrewReadinessGauge />

      {/* 6. Multi-Astronaut Health Trend Comparison */}
      <HealthTrendComparison />

      {/* 7. Bottom Split: Available Medical Resources & Recent Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Med Vault Resources */}
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#24252a]">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Medical Inventory
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                Critical Reserves
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('med-vault')}
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              View Vault →
            </button>
          </div>

          <div className="divide-y divide-gray-50 dark:divide-[#24252a] text-xs">
            {criticalSupplies.map(item => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900 dark:text-gray-100 block">
                    {item.name}
                  </span>
                  <span className="text-gray-400 text-[11px]">
                    {item.indication}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`font-medium block ${item.stock <= item.minSafeStock ? 'text-amber-600' : 'text-gray-800 dark:text-gray-200'}`}>
                    {item.stock} {item.unit}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Exp: {item.shelfLifeDays}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents & Offline Queue */}
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#24252a]">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Offline Event Storage
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                Incident & Sync Ledger
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('mission-incidents')}
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              View Ledger →
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {incidents.slice(0, 2).map(inc => (
              <div key={inc.id} className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {inc.type}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {inc.timestamp}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  {inc.summary}
                </p>
                <div className="pt-1 text-[11px] text-gray-400 flex justify-between">
                  <span>Assigned: {inc.assignedOfficer}</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{inc.syncStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
