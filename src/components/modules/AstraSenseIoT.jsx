import React from 'react';
import { useMission } from '../../context/MissionContext';
import { EcgWaveform } from '../common/EcgWaveform';

export const AstraSenseIoT = () => {
  const { 
    crew, selectedAstronaut, setSelectedAstronautId, 
    isEspStreaming, setIsEspStreaming, sensorNoiseLevel, setSensorNoiseLevel 
  } = useMission();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 1 – ASTRA SENSE
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Astronaut Wearable Sensors & Signal Quality
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Live health readings streaming from the astronaut's wearable device. Orbital Guard automatically checks signal quality so loose patches never trigger false alarms.
          </p>
        </div>

        {/* Hardware Stream Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setIsEspStreaming(!isEspStreaming)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              isEspStreaming
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300'
            }`}
          >
            {isEspStreaming ? 'Streaming Active' : 'Stream Paused'}
          </button>

          <select
            value={sensorNoiseLevel}
            onChange={(e) => setSensorNoiseLevel(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1a1b1f] border border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 text-xs"
          >
            <option value="low">Noise Filter: Low</option>
            <option value="moderate">Noise: Moderate</option>
            <option value="high">Noise: Motion High</option>
          </select>
        </div>
      </div>

      {/* Selected Astronaut Telemetry Stage */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-50 dark:border-[#24252a]">
          <div className="flex items-center space-x-3.5">
            <img
              src={selectedAstronaut.photo}
              alt={selectedAstronaut.name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-[#333]"
            />
            <div>
              <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {selectedAstronaut.name} — Live Channel
              </h3>
              <p className="text-xs text-gray-400">
                {selectedAstronaut.role} • Sensor Reliability: {selectedAstronaut.sensorReliability.overall}%
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-400">
            <span>SNR: {selectedAstronaut.sensorReliability.signalToNoiseRatio} dB</span>
          </div>
        </div>

        {/* Oscilloscope */}
        <EcgWaveform
          heartRate={selectedAstronaut.vitals.heartRate}
          isAbnormal={selectedAstronaut.conditionSeverity !== 'nominal'}
          height={80}
        />

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Heart Rate</span>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1 block">
              {selectedAstronaut.vitals.heartRate} <span className="text-xs font-normal text-gray-400">bpm</span>
            </span>
            <span className="text-[11px] text-gray-400">Base: {selectedAstronaut.vitals.heartRateBaseline}</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">SpO₂ Oxygen</span>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1 block">
              {selectedAstronaut.vitals.spo2}%
            </span>
            <span className="text-[11px] text-gray-400">Base: {selectedAstronaut.vitals.spo2Baseline}%</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Core Temp</span>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1 block">
              {selectedAstronaut.vitals.temperature}°C
            </span>
            <span className="text-[11px] text-gray-400">Base: {selectedAstronaut.vitals.tempBaseline}°C</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">HRV</span>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1 block">
              {selectedAstronaut.vitals.hrv} <span className="text-xs font-normal text-gray-400">ms</span>
            </span>
            <span className="text-[11px] text-gray-400">Base: {selectedAstronaut.vitals.hrvBaseline}ms</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Respiration</span>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1 block">
              {selectedAstronaut.vitals.respiration} <span className="text-xs font-normal text-gray-400">rpm</span>
            </span>
            <span className="text-[11px] text-gray-400">Base: {selectedAstronaut.vitals.respirationBaseline}</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#202126] text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Motion Load</span>
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200 mt-1.5 block truncate">
              {selectedAstronaut.vitals.imuActivity}
            </span>
            <span className="text-[11px] text-gray-400">6-Axis Accel</span>
          </div>
        </div>
      </div>

      {/* Sensor Reliability Checking Table */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Sensor Reliability & Signal Integrity
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Continuous lead contact impedance and packet delivery tracking across all 4 wearable harnesses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-50 dark:border-[#24252a] text-[11px]">
                <th className="pb-3 font-normal">Astronaut</th>
                <th className="pb-3 font-normal">Skin Contact</th>
                <th className="pb-3 font-normal">Signal Clarity</th>
                <th className="pb-3 font-normal">Data Loss</th>
                <th className="pb-3 font-normal text-right">Sensor Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#24252a]">
              {crew.map(ast => (
                <tr 
                  key={ast.id}
                  onClick={() => setSelectedAstronautId(ast.id)}
                  className="hover:bg-gray-50/50 dark:hover:bg-[#202126] cursor-pointer"
                >
                  <td className="py-3 font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2.5">
                    <img 
                      src={ast.photo} 
                      alt={ast.name}
                      className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-[#333]" 
                    />
                    <span>{ast.name}</span>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {ast.sensorReliability.leadContact}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {ast.sensorReliability.signalToNoiseRatio} dB
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {ast.sensorReliability.packetLossPercent}%
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                    {ast.sensorReliability.overall}%
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
