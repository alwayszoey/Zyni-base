import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0
}: ShinyTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const dirMultiplier = useRef(direction === 'left' ? 1 : -1);

  const durationMs = speed * 1000;
  const delayMs = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || isHovered) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += delta;

    if (yoyo) {
      const cycle = durationMs + delayMs;
      const doubleCycle = cycle * 2;
      const mod = elapsedRef.current % doubleCycle;
      if (mod < durationMs) {
        const p = (mod / durationMs) * 100;
        progress.set(dirMultiplier.current === 1 ? p : 100 - p);
      } else if (mod < cycle) {
        progress.set(dirMultiplier.current === 1 ? 100 : 0);
      } else if (mod < cycle + durationMs) {
        const p = 100 - ((mod - cycle) / durationMs) * 100;
        progress.set(dirMultiplier.current === 1 ? p : 100 - p);
      } else {
        progress.set(dirMultiplier.current === 1 ? 0 : 100);
      }
    } else {
      const cycle = durationMs + delayMs;
      const mod = elapsedRef.current % cycle;
      if (mod < durationMs) {
        const p = (mod / durationMs) * 100;
        progress.set(dirMultiplier.current === 1 ? p : 100 - p);
      } else {
        progress.set(dirMultiplier.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    dirMultiplier.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);

  const bgPosition = useTransform(progress, (v) => `${150 - v * 2}% center`);
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.span
      className={`shiny-text ${className}`.trim()}
      style={{ ...style, backgroundPosition: bgPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
}
