import { motion } from 'motion/react';
import React from 'react';

export interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  key?: React.Key;
}

export default function FadeContent({
  children,
  blur = false,
  duration = 1000,
  delay = 0,
  threshold = 0.1,
  className = ''
}: FadeContentProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: blur ? 'blur(10px)' : 'none',
        y: 12
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
