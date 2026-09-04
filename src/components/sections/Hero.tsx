"use client";

import { motion } from "motion/react";
import GitHubCard from "@/components/ui/GitHubCard";
import { RESUME_UPDATED, RESUME_URL } from "@/lib/resume";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(12px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 data-grid-bg scanlines overflow-hidden">
      {/* Ambient glow orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute top-[10%] right-[-8%] w-[700px] h-[700px] bg-primary/[0.035] blur-[180px] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-[-15%] left-[-12%] w-[550px] h-[550px] bg-tertiary/[0.02] blur-[140px] rounded-full pointer-events-none"
      />

      {/* Accent corner lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-[400px] h-[1px] bg-gradient-to-l from-primary/25 to-transparent pointer-events-none origin-right"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-[1px] h-[250px] bg-gradient-to-b from-primary/25 to-transparent pointer-events-none origin-top"
      />

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        {/* System breadcrumb */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-3 px-3 py-1.5 mb-10 bg-surface-container-high/50 backdrop-blur-sm rounded-md border border-outline-variant/10"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              Initialize_Kernel
            </span>
          </span>
          <span className="text-outline-variant/30 text-xs">/</span>
          <span className="font-mono text-[10px] tracking-[0.12em] text-on-surface-variant/50 uppercase">
            Portfolio_v2.0.4
          </span>
          <span className="w-[6px] h-[14px] bg-primary/70 cursor-blink" />
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={scaleIn}
          className="mb-4 text-[clamp(3rem,9vw,8rem)] font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-gradient-primary"
        >
          Kripa Sindhu
        </motion.h1>

        {/* Role + Tagline */}
        <motion.div variants={fadeUp} className="mb-8">
          <p className="text-[clamp(1.4rem,3.5vw,3.2rem)] font-headline font-bold tracking-[-0.02em] text-on-surface/85 leading-[1.2]">
            Software Engineer
          </p>
          <p className="text-[clamp(1.2rem,2.8vw,2.6rem)] font-headline font-semibold tracking-[-0.01em] text-on-surface/55 leading-[1.2] mt-1">
            crafting scalable
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{
                delay: 1.6,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden md:inline-block h-[2px] bg-gradient-to-r from-primary/40 to-transparent align-middle ml-4 rounded-full"
            />
          </p>
          <p className="text-[clamp(1.2rem,2.8vw,2.6rem)] font-headline font-semibold tracking-[-0.01em] text-on-surface/35 leading-[1.2] mt-1">
            systems &amp; experiences
          </p>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {[
            { label: "Full-Stack", icon: "stacks" },
            { label: "Distributed Systems", icon: "hub" },
            { label: "Performance", icon: "speed" },
            { label: "Open Source", icon: "code_blocks" },
          ].map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.4 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/[0.06] transition-all duration-300 cursor-default"
            >
              <span className="material-symbols-outlined text-[16px] text-primary/50 group-hover:text-primary transition-colors duration-300">
                {tag.icon}
              </span>
              <span className="font-mono text-[11px] tracking-[0.06em] text-on-surface-variant/70 group-hover:text-on-surface transition-colors duration-300 uppercase">
                {tag.label}
              </span>
              <span className="absolute -top-px -right-px w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary/50 transition-all duration-300" />
            </motion.span>
          ))}
        </motion.div>

        {/* Resume — terminal file card */}
        <motion.div variants={fadeUp}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 pl-4 pr-5 py-3 rounded-xl border border-outline-variant/10 bg-surface-container-low/40 backdrop-blur-sm hover:border-primary/25 hover:bg-surface-container-low/70 transition-all duration-400 cursor-pointer active:scale-[0.98] overflow-hidden"
          >
            {/* Hover sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent pointer-events-none" />

            {/* File icon block */}
            <div className="relative w-10 h-12 rounded-md bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0 group-hover:bg-primary/12 group-hover:border-primary/20 transition-all duration-300">
              <span className="material-symbols-outlined text-primary/60 group-hover:text-primary text-xl transition-colors duration-300">
                description
              </span>
              {/* File type badge */}
              <span className="absolute -bottom-1 -right-1 px-1 py-px rounded bg-primary/15 border border-primary/20 font-mono text-[7px] font-bold text-primary/70 uppercase tracking-wider">
                PDF
              </span>
            </div>

            {/* File info */}
            <div className="relative z-10 flex flex-col min-w-0">
              <span className="font-label text-sm font-semibold text-on-surface/80 group-hover:text-on-surface tracking-tight transition-colors duration-300">
                Kripa_Sindhu_Resume
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant/35 tracking-wider mt-0.5">
                PDF &middot; Updated {RESUME_UPDATED}
              </span>
            </div>

            {/* Arrow */}
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant/20 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300 ml-2">
              arrow_outward
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* GitHub Stats Card */}
      <GitHubCard />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-scroll-bounce">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-on-surface-variant/25">
          Scroll_to_explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary/25 to-transparent" />
      </div>

      {/* Coordinate stamp */}
      <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-3 opacity-15">
        <span className="font-mono text-[9px] tracking-wider text-on-surface-variant">
          48.8566° N, 2.3522° E
        </span>
      </div>
    </section>
  );
}
