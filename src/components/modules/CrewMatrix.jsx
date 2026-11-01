import React from 'react';
import { Check, ArrowRight, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/MissionContext';

export const CrewMatrix = () => {
  const { 
    crew, crewReadiness, applyWorkloadRedistribution, 
    isRedistributed, resetAllSimulations 
  } = useMission();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 3 – Crew Intelligence
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Crew Roles & Backup Coverage
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Keep the mission running smoothly. If any crew member gets tired or needs medical rest, their backup can safely take over their responsibilities.
          </p>
        </div>

        <div>
          {!isRedistributed ? (
            <button
              onClick={applyWorkloadRedistribution}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Hand Over Non-Urgent Tasks (Let Dr. Vance Rest)
            </button>
          ) : (
            <button
              onClick={resetAllSimulations}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-300 text-xs hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Scenario</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm">
        <div className="flex items-start space-x-3.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Autonomous Recommendation
            </span>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 mt-1 leading-relaxed">
              "{crewReadiness.aiRecommendation}"
            </p>
          </div>
        </div>
      </div>

      {/* 4 Astronaut Comprehensive Responsibility & Backup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {crew.map(ast => {
          const isWarning = ast.conditionSeverity === 'warning' || ast.conditionSeverity === 'critical';
          return (
            <div 
              key={ast.id}
              className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={ast.photo}
                    alt={ast.name}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-[#333]"
                  />
                  <div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {ast.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {ast.role} • {ast.id}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    isWarning 
                      ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' 
                      : 'bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'
                  }`}>
                    {ast.condition}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    Readiness: {ast.readinessScore}%
                  </div>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-1.5 pt-2 border-t border-gray-50 dark:border-[#24252a]">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 block mb-2">
                  Current Tasks:
                </span>
                {ast.responsibilities.map(resp => (
                  <div 
                    key={resp.id}
                    className="p-2.5 rounded-lg bg-gray-50/70 dark:bg-[#202126] text-xs flex items-center justify-between text-gray-700 dark:text-gray-300"
                  >
                    <span>{resp.title}</span>
                    <span className="text-[10px] text-gray-400">
                      {resp.priority} Priority
                    </span>
                  </div>
                ))}
              </div>

              {/* Designated Backup */}
              {ast.backupOfficer && (
                <div className="pt-2 border-t border-gray-50 dark:border-[#24252a] text-xs space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    Trained Backup Crew Member:
                  </span>
                  <div className="p-3 rounded-lg bg-gray-50/70 dark:bg-[#202126]">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {ast.backupOfficer.name}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {ast.backupOfficer.qualification}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
