"use client";

import { motion } from "motion/react";

export default function ScrollBottom() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative z-[3] flex flex-col items-center gap-3 py-10 select-none"
    >
      {/* Thin divider */}
      <div className="w-12 h-[1px] bg-outline-variant/8 mb-1" />

      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] text-on-surface-variant/20 tracking-[0.12em]">
          You scrolled all the way down.
        </span>
        <span className="text-sm" role="img" aria-label="rocket">
          🚀
        </span>
      </div>

      <span className="font-display text-[11px] font-bold text-primary/25 tracking-wider uppercase">
        Respect.
      </span>

      {/* Tiny terminal prompt */}
      <div className="mt-2 flex items-center gap-1.5 opacity-[0.15]">
        <span className="font-mono text-[9px] text-green-400">❯</span>
        <span className="font-mono text-[9px] text-on-surface-variant">
          EOF reached — no more bytes to read
        </span>
      </div>
    </motion.div>
  );
}
