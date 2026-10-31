import React from 'react';
import { Sun, Moon, Radio, Layers, RotateCcw, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useMission } from '../../context/MissionContext';

export const Header = () => {
  const { isDark, toggleTheme, isMinimalView, toggleMinimalView } = useTheme();
  const { 
    met, dsnLatencySeconds, crewReadiness, triggerDrill, 
    resetAllSimulations, activeDrill, isRedistributed 
  } = useMission();

  const formatDelay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#15161a]/95 border-b border-gray-100 dark:border-[#26272c] backdrop-blur transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Mission Status */}
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white inline-block"></span>
                <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  ASTRA SENSE
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                  / NASA Space Apps
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                Long-Duration Crew Health Monitoring
              </p>
            </div>
          </div>

          {/* Central Calm Telemetry */}
          <div className="hidden md:flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Mission Elapsed:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200 tabular-nums">
                Day {met.days} • {String(met.hours).padStart(2, '0')}:{String(met.mins).padStart(2, '0')}:{String(met.secs).padStart(2, '0')}
              </span>
            </div>

            <div className="h-3 w-px bg-gray-200 dark:bg-[#2e3036]"></div>

            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>DSN Delay: {formatDelay(dsnLatencySeconds)}</span>
              <span className="text-[11px] text-gray-400">(Offline AI Active)</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Simulation controls */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-gray-50 dark:bg-[#1e2025] px-2 py-1 rounded-md border border-gray-100 dark:border-[#2a2c33]">
              <span className="text-[11px] text-gray-400 px-1">Simulate:</span>
              <button
                onClick={() => triggerDrill('SCENARIO-01')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  activeDrill?.id === 'SCENARIO-01'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Fatigue
              </button>
              <button
                onClick={() => triggerDrill('SCENARIO-02')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  activeDrill?.id === 'SCENARIO-02'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Hypoxia
              </button>
              {(activeDrill || isRedistributed) && (
                <button
                  onClick={resetAllSimulations}
                  title="Reset"
                  className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Minimal View Toggle */}
            <button
              onClick={toggleMinimalView}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs transition-colors border ${
                isMinimalView
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white font-medium'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#1a1b1f] dark:border-[#2a2c33] dark:text-gray-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isMinimalView ? 'Minimal View' : 'Detailed View'}</span>
            </button>

            {/* Day / Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-gray-200 dark:border-[#2a2c33] bg-white dark:bg-[#1a1b1f] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#23252b] transition-colors"
              title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
