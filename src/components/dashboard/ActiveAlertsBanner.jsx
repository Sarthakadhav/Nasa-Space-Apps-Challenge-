import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useMission } from '../../context/MissionContext';

export const ActiveAlertsBanner = () => {
  const { crew, setActiveTab, setSelectedAstronautId, isRedistributed } = useMission();

  const alertedAstronauts = crew.filter(a => a.conditionSeverity !== 'nominal');

  if (alertedAstronauts.length === 0) {
    return null;
  }

  const primaryAlert = alertedAstronauts[0];

  return (
    <div className="bg-white dark:bg-[#1a1b1f] border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Active Health Notice
              </span>
              <span className="text-xs text-gray-400">• Day 142</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              {primaryAlert.name} — {primaryAlert.condition}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
              Heart rate is slightly high at {primaryAlert.vitals.heartRate} bpm. Missing {primaryAlert.vitals.sleepDebtHours} hours of needed sleep over the last 3 days, causing slower reaction time (+{primaryAlert.mlModel.cognitiveLatencyDelta_ms}ms). Recommended: take a rest break and hand over non-urgent tasks.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 sm:self-center">
          <button
            onClick={() => {
              setSelectedAstronautId(primaryAlert.id);
              setActiveTab('crew-matrix');
            }}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-neutral-800 transition-colors"
          >
            Review Task Handover
          </button>
        </div>
      </div>
    </div>
  );
};
