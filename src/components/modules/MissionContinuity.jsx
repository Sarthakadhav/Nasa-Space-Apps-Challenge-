import React from 'react';
import { useMission } from '../../context/MissionContext';

export const MissionContinuity = () => {
  const { incidents, recoveryTimelines } = useMission();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 6 – Mission Continuity
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Recovery Tracker & Offline Incident Sync
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Post-incident rehabilitation milestones, sleep debt banking, and delayed Earth DSN synchronization.
          </p>
        </div>

        <div className="text-xs text-gray-500">
          Local Storage: <strong className="text-gray-800 dark:text-gray-200">1 Event Pending DSN Sync</strong>
        </div>
      </div>

      {/* Recovery Timelines */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Active Crew Rehabilitation Trajectories
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Tracking sleep debt recovery, circadian normalization, and return-to-duty clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {recoveryTimelines.map((rec, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-3"
            >
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {rec.name}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {rec.progressPercent}%
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 dark:bg-gray-100 rounded-full"
                  style={{ width: `${rec.progressPercent}%` }}
                />
              </div>

              <div className="space-y-1 text-gray-500 dark:text-gray-400">
                <div><strong>Protocol:</strong> {rec.protocol}</div>
                <div><strong>Current Step:</strong> {rec.currentStep}</div>
                <div><strong>Projected Return:</strong> {rec.projectedFullRecoveryMET}</div>
                <div><strong>Target:</strong> {rec.sleepDebtTarget}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident History Table */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Incident History & Offline Ledger
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Locally persisted clinical events queued for transmission across Deep Space Network.
          </p>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-[#24252a] text-xs">
          {incidents.map(inc => (
            <div key={inc.id} className="py-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                    inc.severity === 'WARNING'
                      ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {inc.type}
                  </span>
                  <span className="text-gray-400">
                    — {inc.targetAstronautName}
                  </span>
                </div>
                <span className="text-gray-400">
                  {inc.timestamp}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                {inc.summary}
              </p>

              <div className="flex items-center justify-between text-gray-400 text-[11px] pt-1">
                <span>Officer: {inc.assignedOfficer}</span>
                <span className="text-emerald-700 dark:text-emerald-400">{inc.syncStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
