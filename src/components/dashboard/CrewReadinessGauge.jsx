import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useMission } from '../../context/MissionContext';

export const CrewReadinessGauge = () => {
  const { crewReadiness, crew, applyWorkloadRedistribution, isRedistributed } = useMission();

  return (
    <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Header with Readiness Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-[#24252a] gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Crew Intelligence
          </span>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Overall Crew Readiness
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {crewReadiness.disclaimer}
          </p>
        </div>

        {/* Big Score Readout */}
        <div className="flex items-baseline space-x-2 sm:self-center">
          <span className={`text-4xl sm:text-5xl font-light tracking-tight tabular-nums ${
            crewReadiness.overallScore < 70 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'
          }`}>
            {crewReadiness.overallScore}
          </span>
          <span className="text-sm text-gray-400 font-light">/ 100</span>
        </div>
      </div>

      {/* Sub-Dimensions in clean minimal progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-100 dark:border-[#24252a]">
        {crewReadiness.dimensions.map((dim, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-500">
              <span className="truncate pr-1">{dim.label}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{dim.value}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-[#28292e] h-1 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  dim.value < 65 ? 'bg-amber-500' : 'bg-neutral-800 dark:bg-gray-300'
                }`}
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Direct Requirement: Crew Table */}
      <div className="py-5 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-50 dark:border-[#24252a] text-[11px]">
              <th className="pb-3 font-normal">Astronaut</th>
              <th className="pb-3 font-normal">Condition</th>
              <th className="pb-3 font-normal">Mission Responsibility</th>
              <th className="pb-3 font-normal text-right">Readiness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-[#24252a]">
            {crew.map(ast => {
              const isWarning = ast.conditionSeverity === 'warning' || ast.conditionSeverity === 'critical';
              return (
                <tr key={ast.id} className="hover:bg-gray-50/50 dark:hover:bg-[#202126] transition-colors">
                  <td className="py-3 font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2.5">
                    <img 
                      src={ast.photo} 
                      alt={ast.name}
                      className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-[#333]" 
                    />
                    <span>{ast.name}</span>
                  </td>
                  <td className="py-3">
                    {isWarning ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                        {ast.condition}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        {ast.condition}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {ast.role}
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900 dark:text-gray-100 tabular-nums">
                    {ast.readinessScore}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* AI Recommendation & Action Button */}
      <div className="mt-4 pt-5 border-t border-gray-100 dark:border-[#24252a] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/70 dark:bg-[#202126] p-4 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
              AI Recommendation
            </span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            "{crewReadiness.aiRecommendation}"
          </p>
        </div>

        <div className="shrink-0">
          {!isRedistributed ? (
            <button
              onClick={applyWorkloadRedistribution}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Hand Over Non-Urgent Tasks
            </button>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <Check className="w-4 h-4 mr-1" />
              Duties Handed Over & Rest Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
