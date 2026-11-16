"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** The hero's one entrance on load: text lines rise in sequence. */
export function HeroText({ children, className, delay = 0.25 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate="shown"
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
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
        hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
        shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Full-bleed hero photograph: settles from a slow zoom on load, then drifts and dims
 * a little as the visitor scrolls away from the hero.
 */
export function HeroBackdrop({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  return (
    <div ref={ref} className={className}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Inner-page hero photograph: opens from the bottom and settles from a slight zoom. */
export function HeroMedia({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(16% 8% 0% 8% round 24px)", opacity: 0.3 }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
      transition={{ duration: 1.4, ease, delay: 0.15 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.16 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A thin rule that draws from left to right once on load. */
export function HeroRule({ className, delay = 0.9 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "0% 50%" }}
      initial={reduce ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.4, ease, delay }}
      aria-hidden="true"
    />
  );
}
