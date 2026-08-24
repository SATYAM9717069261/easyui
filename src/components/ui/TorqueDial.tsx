import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TorqueDialProps {
  /** Current numerical value. */
  value: number;
  /** Minimum selectable value. Default is 0. */
  min?: number;
  /** Maximum selectable value. Default is 100. */
  max?: number;
  /** Step increment. Default is 1. */
  step?: number;
  /** Change callback. */
  onChange: (value: number) => void;
  /** End of interaction / release callback. */
  onChangeEnd?: () => void;
  /** Accessible label. Default is 'Dial control'. */
  label?: string;
  /** Render numeric value at center or below. Default is true. */
  showValue?: boolean;
  /** Sizing diameter in pixels. Default is 120. */
  size?: number;
  /** Disables interaction. */
  disabled?: boolean;
  /** Apply realistic angular release momentum. Default is true. */
  momentum?: boolean;
  /** Custom unit or suffix (e.g., '°', '%', 'dB'). */
  unit?: string;
  /** Custom CSS class names. */
  className?: string;
}

export const TorqueDial: React.FC<TorqueDialProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeEnd,
  label = 'Dial control',
  showValue = true,
  size = 120,
  disabled = false,
  momentum = true,
  unit = '',
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Map value to angle (-135deg to +135deg, total 270deg sweep)
  const angleRange = 270;
  const startAngle = -135;
  const normalizedProgress = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const currentAngle = startAngle + normalizedProgress * angleRange;

  const clampValue = useCallback(
    (val: number) => {
      const stepped = Math.round((val - min) / step) * step + min;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(2))));
    },
    [min, max, step]
  );

  const calculateAngleFromEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dialRef.current) return 0;
      const rect = dialRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rad = Math.atan2(clientY - centerY, clientX - centerX);
      let deg = (rad * 180) / Math.PI + 90; // Align 0deg to top
      if (deg > 180) deg -= 360;
      return deg;
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsDragging(true);

    const deg = calculateAngleFromEvent(e.nativeEvent);
    lastAngleRef.current = deg;
    velocityRef.current = 0;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const newAngle = calculateAngleFromEvent(moveEvent);
      const deltaAngle = newAngle - lastAngleRef.current;
      velocityRef.current = deltaAngle;
      lastAngleRef.current = newAngle;

      // Update value proportional to angular delta
      const valueDelta = (deltaAngle / angleRange) * (max - min);
      const updated = clampValue(value + valueDelta);
      onChange(updated);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (momentum && Math.abs(velocityRef.current) > 0.5) {
        let currentVel = velocityRef.current;
        let currentValue = value;

        const applyDecay = () => {
          currentVel *= 0.92; // Friction damping factor
          if (Math.abs(currentVel) > 0.05) {
            const delta = (currentVel / angleRange) * (max - min);
            currentValue = clampValue(currentValue + delta);
            onChange(currentValue);
            animFrameRef.current = requestAnimationFrame(applyDecay);
          } else {
            if (onChangeEnd) onChangeEnd();
          }
        };

        animFrameRef.current = requestAnimationFrame(applyDecay);
      } else {
        if (onChangeEnd) onChangeEnd();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (disabled) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? step : -step;
    onChange(clampValue(value + delta));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(clampValue(value + step));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(clampValue(value - step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(min);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(max);
    }
  };

  const handleDoubleClick = () => {
    if (disabled) return;
    onChange(clampValue((max + min) / 2));
  };

  return (
    <div
      className={cn('inline-flex flex-col items-center select-none', className)}
      onWheel={handleWheel}
    >
      <div
        ref={dialRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        style={{ width: size, height: size }}
        className={cn(
          'relative rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-white transition-shadow',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        {/* Outer Circular Track */}
        <svg
          style={{ width: size, height: size }}
          className="absolute inset-0 -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#1C1C1C"
            strokeWidth="5"
            strokeDasharray="200"
            strokeDashoffset="60"
            strokeLinecap="round"
          />
          {/* Active Value Progress Track */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#F5F5F5"
            strokeWidth="5"
            strokeDasharray="200"
            strokeDashoffset={200 - normalizedProgress * 140}
            strokeLinecap="round"
            transition={isDragging ? { duration: 0 } : motionTransitions.springSnappy}
          />
        </svg>

        {/* Center Rotating Knob */}
        <motion.div
          style={{
            width: size * 0.65,
            height: size * 0.65,
            rotate: currentAngle,
          }}
          transition={isDragging ? { duration: 0 } : motionTransitions.springSnappy}
          className={cn(
            'relative rounded-full bg-[#0E0E0E] border border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.8)] flex items-center justify-center',
            isDragging && 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
          )}
        >
          {/* Top Indicator Pip / Notch */}
          <span className="absolute top-2 w-1.5 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          {/* Center tactile metallic ring */}
          <div className="w-4 h-4 rounded-full bg-[#1A1A1A] border border-white/10" />
        </motion.div>
      </div>

      {/* Numeric Value Display */}
      {showValue && (
        <div className="mt-3 text-center">
          <div className="text-sm font-mono font-semibold text-white tracking-tight">
            {value}
            {unit}
          </div>
          <span className="text-[10px] font-mono text-[#666666]">{label}</span>
        </div>
      )}
    </div>
  );
};
