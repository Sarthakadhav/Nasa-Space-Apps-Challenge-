import React, { useState } from 'react';
import { useMission } from '../../context/MissionContext';
import { useTheme } from '../../context/ThemeContext';

export const AstronautCard = ({ astronaut }) => {
  const { selectedAstronautId, setSelectedAstronautId, setActiveTab } = useMission();
  const { isMinimalView } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isSelected = selectedAstronautId === astronaut.id;
  const isWarning = astronaut.conditionSeverity === 'warning' || astronaut.conditionSeverity === 'critical';

  return (
    <div
      onClick={() => setSelectedAstronautId(astronaut.id)}
      className={`relative bg-white dark:bg-[#1a1b1f] rounded-2xl p-6 border transition-all cursor-pointer ${
        isSelected
          ? 'border-gray-900 dark:border-white shadow-sm ring-1 ring-gray-900 dark:ring-white'
          : 'border-gray-100 dark:border-[#27282e] hover:border-gray-300 dark:hover:border-[#3a3c44] shadow-sm'
      }`}
    >
      {/* Top Header: Photo, Name, Role, Condition Badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          {/* Astronaut Portrait Photo */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#23252b] shrink-0 border border-gray-100 dark:border-[#2a2c33]">
            {astronaut.photo && (
              <img
                src={astronaut.photo}
                alt={astronaut.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center font-medium text-xs text-gray-500">
                {astronaut.avatar}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {astronaut.name}
              </h3>
              <span className="text-xs text-gray-400">
                ({astronaut.callsign})
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {astronaut.role}
            </p>
          </div>
        </div>

        {/* Condition Status Badge */}
        <div>
          {isWarning ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
              {astronaut.condition}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300 border border-gray-100 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              {astronaut.condition}
            </span>
          )}
        </div>
      </div>

      {/* Operational Readiness Bar */}
      <div className="mt-5 pt-4 border-t border-gray-50 dark:border-[#24252a]">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Readiness
          </span>
          <div className="flex items-baseline space-x-1">
            <span className={`text-sm font-semibold tabular-nums ${
              astronaut.readinessScore < 70 
                ? 'text-amber-700 dark:text-amber-400' 
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {astronaut.readinessScore}%
            </span>
            <span className="text-[11px] text-gray-400">/ 100</span>
          </div>
        </div>

        <div className="w-full bg-gray-100 dark:bg-[#28292e] h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              astronaut.readinessScore < 70
                ? 'bg-amber-500'
                : 'bg-neutral-800 dark:bg-gray-200'
            }`}
            style={{ width: `${astronaut.readinessScore}%` }}
          />
        </div>
      </div>

      {/* Clean Vitals Grid with generous negative space */}
      <div className="mt-5 grid grid-cols-4 gap-2 pt-1 text-center">
        <div className="p-2 rounded-lg bg-gray-50/70 dark:bg-[#202126]">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">HR</span>
          <span className={`text-xs font-semibold tabular-nums mt-0.5 block ${
            astronaut.vitals.heartRate > 80 ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-gray-200'
          }`}>
            {astronaut.vitals.heartRate}
          </span>
          <span className="text-[10px] text-gray-400 block">bpm</span>
        </div>

        <div className="p-2 rounded-lg bg-gray-50/70 dark:bg-[#202126]">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">SpO₂</span>
          <span className="text-xs font-semibold tabular-nums text-gray-800 dark:text-gray-200 mt-0.5 block">
            {astronaut.vitals.spo2}%
          </span>
          <span className="text-[10px] text-gray-400 block">sat</span>
        </div>

        <div className="p-2 rounded-lg bg-gray-50/70 dark:bg-[#202126]">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">HRV</span>
          <span className={`text-xs font-semibold tabular-nums mt-0.5 block ${
            astronaut.vitals.hrv < 30 ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-gray-200'
          }`}>
            {astronaut.vitals.hrv}
          </span>
          <span className="text-[10px] text-gray-400 block">ms</span>
        </div>

        <div className="p-2 rounded-lg bg-gray-50/70 dark:bg-[#202126]">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Temp</span>
          <span className="text-xs font-semibold tabular-nums text-gray-800 dark:text-gray-200 mt-0.5 block">
            {astronaut.vitals.temperature}°
          </span>
          <span className="text-[10px] text-gray-400 block">°C</span>
        </div>
      </div>

      {/* Expanded detail section when minimal view is toggled off */}
      {!isMinimalView && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#24252a] text-xs space-y-1.5">
          <div className="flex justify-between text-gray-500">
            <span>Health Pattern:</span>
            <span className={`font-medium ${astronaut.mlModel.anomalyScore < 0 ? 'text-amber-600' : 'text-gray-700 dark:text-gray-300'}`}>
              {astronaut.mlModel.anomalyScore < 0 ? 'Unusual (Needs rest)' : 'Normal & Steady'}
            </span>
          </div>
          {astronaut.backupOfficer && (
            <div className="flex justify-between text-gray-500">
              <span>Assigned Backup:</span>
              <span className="text-gray-800 dark:text-gray-200">
                {astronaut.backupOfficer.name}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
