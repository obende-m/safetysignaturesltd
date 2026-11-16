"use client";

import { motion, useReducedMotion } from "motion/react";

/** Page transition: each new page settles in with a short fade and rise. */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className="outline-none"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
