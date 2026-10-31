import React, { useState } from 'react';
import { useMission } from '../../context/MissionContext';

export const HardwareSimulator = () => {
  const { 
    isEspStreaming, setIsEspStreaming, sensorNoiseLevel, 
    setSensorNoiseLevel, selectedAstronaut 
  } = useMission();

  const samplePacket = {
    packet_id: 142098,
    timestamp_met: '142:04:36:18',
    astronaut_id: selectedAstronaut.id,
    sensor_stream: {
      ecg_lead2_mv: 1.14,
      spo2_pct: selectedAstronaut.vitals.spo2,
      heart_rate_bpm: selectedAstronaut.vitals.heartRate,
      skin_temp_c: selectedAstronaut.vitals.temperature,
      imu_accel_g: [0.02, 0.04, 0.01],
      impedance_ohms: 480
    },
    battery_level_pct: 94,
    crc32_valid: true
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Hardware Bridge
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            ESP32 Wearable Integration & Backend Spec
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Protocol specifications for physical wearable micro-controller, BLE streaming, and FastAPI / Flask backend.
          </p>
        </div>

        <button
          onClick={() => setIsEspStreaming(!isEspStreaming)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isEspStreaming
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300'
          }`}
        >
          {isEspStreaming ? 'Streaming Online' : 'Stream Paused'}
        </button>
      </div>

      {/* Hardware Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm text-xs space-y-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">BLE Wireless Protocol</span>
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">GATT Service 0x180D</div>
          <span className="text-gray-400 block">Packet Sampling Rate: 10 Hz</span>
        </div>

        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm text-xs space-y-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">Sensor Impedance Filter</span>
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {sensorNoiseLevel === 'low' ? 'Low Noise (Resting)' : sensorNoiseLevel === 'moderate' ? 'Moderate (IVA Motion)' : 'High (EVA Exercise)'}
          </div>
          <span className="text-gray-400 block">Lead-off impedance: 480 ohms</span>
        </div>

        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] p-5 rounded-2xl shadow-sm text-xs space-y-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide block">Earth DSN Window</span>
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">14m 22s Latency</div>
          <span className="text-gray-400 block">Local Edge Autonomy Mandated</span>
        </div>
      </div>

      {/* Raw JSON Stream Sample */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Raw ESP32 Sensor Packet (10 Hz Telemetry Payload)
        </h3>
        <pre className="p-4 rounded-xl bg-gray-50 dark:bg-[#202126] text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-100 dark:border-[#27282e]">
          {JSON.stringify(samplePacket, null, 2)}
        </pre>
      </div>

      {/* FastAPI / Flask Backend Contract */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Backend API Contract (FastAPI / Flask + SQLite)
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Reference endpoints ready for your team members to connect Python and Scikit-learn:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">POST /api/v1/telemetry/ingest</div>
            <p className="text-gray-500">Ingests raw ESP32 packet, verifies CRC, and saves reading to SQLite.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">POST /api/v1/ml/isolation-forest</div>
            <p className="text-gray-500">Runs Scikit-learn Isolation Forest model and returns anomaly score.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">GET /api/v1/crew/readiness</div>
            <p className="text-gray-500">Returns overall crew readiness score (68/100) and duty redistribution.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">POST /api/v1/dsn/sync-queue</div>
            <p className="text-gray-500">Batches locally cached incidents for transmission over Deep Space Network.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
