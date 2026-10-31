import React from 'react';
import { useMission } from '../../context/MissionContext';

export const PersonalBaseline = () => {
  const { crew, selectedAstronaut, setSelectedAstronautId } = useMission();

  const isAnomaly = selectedAstronaut.mlModel.anomalyScore < 0;

  const baselineComparisons = [
    {
      metric: 'Resting Heart Rate',
      current: `${selectedAstronaut.vitals.heartRate} bpm`,
      baseline: `${selectedAstronaut.vitals.heartRateBaseline} bpm`,
      delta: `${selectedAstronaut.vitals.heartRate > selectedAstronaut.vitals.heartRateBaseline ? '+' : ''}${Math.round(((selectedAstronaut.vitals.heartRate - selectedAstronaut.vitals.heartRateBaseline) / selectedAstronaut.vitals.heartRateBaseline) * 100)}%`,
      status: selectedAstronaut.vitals.heartRate > 80 ? 'Elevated (Sympathetic Stress)' : 'Nominal'
    },
    {
      metric: 'Heart Rate Variability (RMSSD)',
      current: `${selectedAstronaut.vitals.hrv} ms`,
      baseline: `${selectedAstronaut.vitals.hrvBaseline} ms`,
      delta: `${Math.round(((selectedAstronaut.vitals.hrv - selectedAstronaut.vitals.hrvBaseline) / selectedAstronaut.vitals.hrvBaseline) * 100)}%`,
      status: selectedAstronaut.vitals.hrv < 30 ? 'Critically Depressed' : 'Nominal'
    },
    {
      metric: 'Oxygen Saturation (SpO₂)',
      current: `${selectedAstronaut.vitals.spo2}%`,
      baseline: `${selectedAstronaut.vitals.spo2Baseline}%`,
      delta: `${selectedAstronaut.vitals.spo2 - selectedAstronaut.vitals.spo2Baseline}%`,
      status: selectedAstronaut.vitals.spo2 < 97 ? 'Mild Hypoxic Dip' : 'Optimal'
    },
    {
      metric: 'Core Body Temperature',
      current: `${selectedAstronaut.vitals.temperature} °C`,
      baseline: `${selectedAstronaut.vitals.tempBaseline} °C`,
      delta: `+${Math.round((selectedAstronaut.vitals.temperature - selectedAstronaut.vitals.tempBaseline) * 10) / 10} °C`,
      status: 'Circadian Drift'
    },
    {
      metric: '72-Hour Sleep Debt',
      current: `${selectedAstronaut.vitals.sleepDebtHours} hrs`,
      baseline: '< 1.0 hr target',
      delta: `+${selectedAstronaut.vitals.sleepDebtHours}h`,
      status: selectedAstronaut.vitals.sleepDebtHours > 4.0 ? 'Severe Deficit' : 'Nominal'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 2 – Individual Intelligence
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Personal Health Baseline & Isolation Forest
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Learned physiological normal baselines tailored per astronaut to detect microgravity degradation.
          </p>
        </div>

        {/* Astronaut Selector */}
        <div className="flex items-center space-x-1.5 bg-gray-50 dark:bg-[#1e2025] p-1 rounded-lg border border-gray-100 dark:border-[#28292e] text-xs">
          {crew.map(ast => (
            <button
              key={ast.id}
              onClick={() => setSelectedAstronautId(ast.id)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedAstronaut.id === ast.id
                  ? 'bg-white dark:bg-[#15161a] text-gray-900 dark:text-white font-medium shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {ast.name.split(' ')[1] || ast.callsign}
            </button>
          ))}
        </div>
      </div>

      {/* Isolation Forest Scoring Card */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-50 dark:border-[#24252a] gap-4">
          <div className="flex items-center space-x-3.5">
            <img
              src={selectedAstronaut.photo}
              alt={selectedAstronaut.name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-[#333]"
            />
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Scikit-Learn Isolation Forest
              </span>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                {selectedAstronaut.name} — {selectedAstronaut.mlModel.status}
              </h3>
              <p className="text-xs text-gray-400">
                Confidence: {selectedAstronaut.mlModel.isolationForestConfidence}% • Vigilance Reaction Drift: +{selectedAstronaut.mlModel.cognitiveLatencyDelta_ms}ms
              </p>
            </div>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-gray-400">Score:</span>
            <span className={`text-2xl font-light tabular-nums ${isAnomaly ? 'text-amber-600' : 'text-gray-900 dark:text-gray-100'}`}>
              {selectedAstronaut.mlModel.anomalyScore > 0 ? `+${selectedAstronaut.mlModel.anomalyScore}` : selectedAstronaut.mlModel.anomalyScore}
            </span>
            <span className="text-xs text-gray-400">[-1.0 ... +1.0]</span>
          </div>
        </div>

        {/* Feature Contribution Breakdown */}
        <div className="space-y-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400 block">
            Key Contributing Deviations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedAstronaut.mlModel.primaryFactors.map((factor, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span className="truncate pr-1">{factor.feature}</span>
                  <span className={`font-medium ${isAnomaly ? 'text-amber-700 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {factor.deviation}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#333] h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isAnomaly ? 'bg-amber-500' : 'bg-neutral-800 dark:bg-gray-200'}`}
                    style={{ width: `${Math.min(100, factor.impact * 150)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 block">
                  Impact: {(factor.impact * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Baseline vs. Real-Time Telemetry Matrix
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Comparison against personalized pre-flight physiological baseline models.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-50 dark:border-[#24252a] text-[11px]">
                <th className="pb-3 font-normal">Metric</th>
                <th className="pb-3 font-normal">Live Telemetry</th>
                <th className="pb-3 font-normal">Individual Baseline</th>
                <th className="pb-3 font-normal">Variance</th>
                <th className="pb-3 font-normal text-right">Clinical Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#24252a]">
              {baselineComparisons.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#202126]">
                  <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                    {row.metric}
                  </td>
                  <td className="py-3 text-gray-800 dark:text-gray-200 font-medium">
                    {row.current}
                  </td>
                  <td className="py-3 text-gray-400">
                    {row.baseline}
                  </td>
                  <td className="py-3">
                    <span className={`font-medium ${row.delta.startsWith('+') && !row.status.includes('Nominal') ? 'text-amber-700 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {row.delta}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-500">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
