import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const finishedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = window.setTimeout(() => {
      setPhase('exit');
    }, 1500);

    const t2 = window.setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onComplete();
      }
    }, 2400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="intro-splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={phase === 'exit'}
    >
      <motion.div
        className="intro-splash-text-wrap"
        initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
        animate={
          phase === 'exit'
            ? { opacity: 0, scale: 1.05, filter: 'blur(6px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: phase === 'exit' ? 0.9 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="intro-splash-title">Zyni</span>
      </motion.div>
    </motion.div>
  );
}
