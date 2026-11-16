"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** The hero's one entrance on load: text lines rise in sequence. */
export function HeroText({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate="shown"
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
    >
      {children}
    </motion.div>
  );
}

export function HeroLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        shown: { opacity: 1, y: 0, transition: { duration: 1, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** The hero photograph opens from the bottom and settles from a slight zoom. */
export function HeroMedia({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(18% 0% 0% 0% round 28px)", opacity: 0.4 }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
      transition={{ duration: 1.4, ease, delay: 0.1 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
