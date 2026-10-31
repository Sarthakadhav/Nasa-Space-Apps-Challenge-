import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useMission } from '../../context/MissionContext';

export const AudioAlerts = () => {
  const { audioEnabled } = useTheme();
  const { selectedAstronaut } = useMission();
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!audioEnabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
    } catch {
      // Audio not permitted in this context
      return;
    }

    const interval = setInterval(() => {
      if (!audioEnabled || !audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }

      try {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const isAbnormal = selectedAstronaut?.conditionSeverity !== 'nominal';
        osc.type = 'sine';
        // Subtle crisp telemetry chirp
        osc.frequency.setValueAtTime(isAbnormal ? 740 : 880, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime); // Very gentle subtle volume
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch {
        // Safe fail
      }
    }, Math.max(500, (60 / (selectedAstronaut?.vitals?.heartRate || 70)) * 1000));

    return () => clearInterval(interval);
  }, [audioEnabled, selectedAstronaut?.vitals?.heartRate, selectedAstronaut?.conditionSeverity]);

  return null;
};

