import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const EcgWaveform = ({ heartRate = 72, isAbnormal = false, height = 54 }) => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = canvas.parentElement.clientWidth || 300;
    canvas.height = height;

    const points = [];
    const maxPoints = Math.floor(width / 2);
    let t = 0;

    const getEcgSample = (timeRatio) => {
      const cycle = timeRatio % 1.0;
      if (cycle < 0.15) return 0;
      if (cycle >= 0.15 && cycle < 0.25) {
        return Math.sin((cycle - 0.15) * Math.PI * 10) * 0.15;
      }
      if (cycle >= 0.25 && cycle < 0.35) return 0;
      if (cycle >= 0.35 && cycle < 0.38) return -0.12;
      if (cycle >= 0.38 && cycle < 0.44) {
        const rPos = (cycle - 0.38) / 0.06;
        return Math.sin(rPos * Math.PI) * 0.95;
      }
      if (cycle >= 0.44 && cycle < 0.48) return -0.22;
      if (cycle >= 0.48 && cycle < 0.58) return 0;
      if (cycle >= 0.58 && cycle < 0.74) {
        return Math.sin((cycle - 0.58) * Math.PI * 6.25) * 0.22;
      }
      return 0;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle center reference line
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const beatsPerSec = Math.max(40, heartRate) / 60;
      t += 0.016 * beatsPerSec;

      const rawSample = getEcgSample(t);
      const jitter = isAbnormal ? (Math.random() - 0.5) * 0.06 : 0;
      const midY = height / 2;
      const amplitude = (height / 2) * 0.75;
      const currentY = midY - (rawSample + jitter) * amplitude;

      points.push(currentY);
      if (points.length > maxPoints) {
        points.shift();
      }

      // Minimalist Trace
      ctx.strokeStyle = isAbnormal
        ? (isDark ? '#fbbf24' : '#d97706')
        : (isDark ? '#e5e7eb' : '#374151');
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const px = i * 2;
        const py = points[i];
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 300;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [heartRate, isAbnormal, height, isDark]);

  return (
    <div className="w-full relative overflow-hidden rounded-lg bg-gray-50/60 dark:bg-[#15161a] border border-gray-100 dark:border-[#24252b]">
      <canvas ref={canvasRef} className="block w-full" style={{ height: `${height}px` }} />
    </div>
  );
};
