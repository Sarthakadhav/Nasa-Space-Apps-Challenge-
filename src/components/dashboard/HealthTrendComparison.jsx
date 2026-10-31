import React, { useState } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { useMission } from '../../context/MissionContext';
import { useTheme } from '../../context/ThemeContext';

export const HealthTrendComparison = () => {
  const { trendHistory } = useMission();
  const { isDark } = useTheme();
  const [metricMode, setMetricMode] = useState('heartRate');

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-lg border text-xs bg-white dark:bg-[#1a1b1f] border-gray-100 dark:border-[#28292e] shadow-lg">
          <p className="font-medium text-gray-900 dark:text-gray-100 pb-1 mb-1 border-b border-gray-50 dark:border-[#26272c]">
            Timeline: {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-3 py-0.5 text-gray-600 dark:text-gray-300">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span>{entry.name}:</span>
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100 tabular-nums">
                {entry.value} {metricMode === 'heartRate' ? 'bpm' : '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Physiological Analytics
          </span>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Multi-Astronaut Health Comparison
          </h3>
        </div>

        <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#202126] p-1 rounded-lg border border-gray-100 dark:border-[#28292e] text-xs">
          <button
            onClick={() => setMetricMode('heartRate')}
            className={`px-3 py-1 rounded transition-colors ${
              metricMode === 'heartRate'
                ? 'bg-white dark:bg-[#15161a] text-gray-900 dark:text-white font-medium shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Heart Rate
          </button>
          <button
            onClick={() => setMetricMode('readiness')}
            className={`px-3 py-1 rounded transition-colors ${
              metricMode === 'readiness'
                ? 'bg-white dark:bg-[#15161a] text-gray-900 dark:text-white font-medium shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Readiness Index
          </button>
        </div>
      </div>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="2 2" 
              stroke={isDark ? '#23252b' : '#f3f4f6'} 
              vertical={false} 
            />
            <XAxis 
              dataKey="time" 
              tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }}
              stroke={isDark ? '#28292e' : '#e5e7eb'}
            />
            <YAxis 
              domain={metricMode === 'heartRate' ? [55, 95] : [60, 95]} 
              tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }}
              stroke={isDark ? '#28292e' : '#e5e7eb'}
            />
            <Tooltip content={customTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: 10, fontSize: 11 }}
            />
            {metricMode === 'heartRate' ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="vanceHR" 
                  name="Dr. Vance (Fatigued)" 
                  stroke="#d97706" 
                  strokeWidth={2} 
                  dot={{ r: 2.5, fill: '#d97706' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="chenHR" 
                  name="Cmdr. Chen" 
                  stroke={isDark ? '#e5e7eb' : '#374151'} 
                  strokeWidth={1.5} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="reyesHR" 
                  name="Lt. Reyes" 
                  stroke={isDark ? '#9ca3af' : '#6b7280'} 
                  strokeWidth={1.5} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="satoHR" 
                  name="Dr. Sato" 
                  stroke={isDark ? '#6b7280' : '#9ca3af'} 
                  strokeWidth={1.5} 
                  dot={false} 
                />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey="crewAvgReadiness" 
                name="Crew Readiness" 
                stroke={isDark ? '#e5e7eb' : '#111827'} 
                strokeWidth={2} 
                dot={{ r: 2.5 }} 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
