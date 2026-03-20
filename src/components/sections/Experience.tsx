"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { experiences, type Experience as Exp } from "@/data/experience";

/* ── Uptime calculator ── */
function useUptime(startDate?: string) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    if (!startDate || !now) return null;
    const start = new Date(startDate);
    const diff = now.getTime() - start.getTime();
    if (diff < 0) return null;

    const totalDays = Math.floor(diff / 86_400_000);
    const months = Math.floor(totalDays / 30.44);
    const days = Math.floor(totalDays % 30.44);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);

    return { totalDays, months, days, hours, minutes };
  }, [startDate, now]);
}

/* ── Single timeline node ── */
function TimelineNode({
  exp,
  index,
  isLast,
}: {
  exp: Exp;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isActive = exp.status === "active";
  const uptime = useUptime(exp.startDate);
  const [showUptime, setShowUptime] = useState(false);

  useEffect(() => {
    if (!showUptime) return;
    const id = setTimeout(() => setShowUptime(false), 4000);
    const close = (e: MouseEvent) => {
      // Let the dot's own click toggle it; close on everything else
      if (!(e.target as HTMLElement).closest("[data-uptime-dot]")) {
        setShowUptime(false);
      }
    };
    document.addEventListener("click", close);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", close);
    };
  }, [showUptime]);

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-8">
      {/* ── Vertical spine ── */}
      <div className="relative flex flex-col items-center pt-5">
        {/* Node dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          data-uptime-dot=""
          onClick={isActive && uptime ? () => setShowUptime((v) => !v) : undefined}
          className={`relative z-10 w-3 h-3 rounded-full shrink-0 ${
            isActive
              ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.4)] cursor-pointer"
              : "bg-outline-variant/40"
          }`}
        >
          {isActive && (
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          )}

          {/* Uptime tooltip */}
          <AnimatePresence>
            {showUptime && uptime && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: -4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap px-3.5 py-2 bg-surface-container-highest/95 backdrop-blur-md rounded-lg border border-green-400/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Arrow */}
                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-green-400/20" />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-green-400/60 tracking-wider">
                    uptime:
                  </span>
                  <span className="font-mono text-[11px] text-green-400 font-semibold tracking-wide">
                    {uptime.months > 0 && `${uptime.months}mo `}
                    {uptime.days}d {uptime.hours}h {uptime.minutes}m
                  </span>
                </div>
                <div className="font-mono text-[8px] text-on-surface-variant/30 mt-0.5 tracking-wider">
                  Running for {uptime.totalDays} days
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`w-[1px] flex-1 origin-top min-h-[40px] ${
              isActive
                ? "bg-gradient-to-b from-green-400/25 via-primary/10 to-outline-variant/5"
                : "bg-gradient-to-b from-outline-variant/20 to-outline-variant/5"
            }`}
          />
        )}
      </div>

      {/* ── Terminal Process Card ── */}
      <motion.div
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        animate={
          isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}
        }
        transition={{
          delay: 0.3 + index * 0.1,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`group relative flex-1 mb-10 rounded-xl border overflow-hidden transition-all duration-300 ${
          isActive
            ? "bg-surface-container-low/60 border-primary/12 hover:border-primary/25"
            : "bg-surface-container-low/30 border-outline-variant/8 hover:border-outline-variant/20"
        }`}
      >
        {/* ── Terminal Chrome Header ── */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-b ${
            isActive
              ? "border-primary/8 bg-primary/[0.03]"
              : "border-outline-variant/6 bg-surface-container-highest/15"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-green-400/80" : "bg-outline-variant/20"
                }`}
              />
              <span className="w-2 h-2 rounded-full bg-outline-variant/15" />
              <span className="w-2 h-2 rounded-full bg-outline-variant/15" />
            </div>
            <span className="font-mono text-[9px] text-on-surface-variant/30 tracking-wider ml-1.5">
              {isActive
                ? `process://${exp.company.toLowerCase().replace(/\s+/g, "-")}`
                : `archive://${exp.company.toLowerCase().replace(/\s+/g, "-")}`}
            </span>
          </div>

          {/* Status badge */}
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md ${
              isActive
                ? "bg-green-400/8 border border-green-400/15"
                : "bg-surface-container-highest/30 border border-outline-variant/8"
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full ${
                isActive ? "bg-green-400" : "bg-outline-variant/30"
              }`}
            />
            <span
              className={`font-mono text-[8px] tracking-[0.15em] uppercase ${
                isActive ? "text-green-400/80" : "text-on-surface-variant/30"
              }`}
            >
              {isActive ? "Running" : "Exit 0"}
            </span>
          </div>
        </div>

        {/* ── Card Body ── */}
        <div className="relative p-5 md:p-7">
          {/* Watermark icon */}
          <div className="absolute top-2 right-4 pointer-events-none overflow-hidden">
            <span
              className={`material-symbols-outlined text-[100px] md:text-[130px] ${
                isActive
                  ? "text-primary/[0.025]"
                  : "text-on-surface-variant/[0.02]"
              }`}
            >
              {exp.icon}
            </span>
          </div>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4 relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/25 rounded-md border border-outline-variant/6">
              <span className="material-symbols-outlined text-[11px] text-on-surface-variant/35">
                schedule
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant/45 tracking-wider">
                {exp.period}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/25 rounded-md border border-outline-variant/6">
              <span className="material-symbols-outlined text-[11px] text-on-surface-variant/35">
                location_on
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant/45 tracking-wider">
                {exp.location}
              </span>
            </div>
          </div>

          {/* Role + Company */}
          <div className="relative z-10 mb-1.5">
            <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface tracking-tight leading-tight">
              {exp.role}
            </h3>
          </div>
          <p
            className={`font-label text-sm font-medium mb-4 relative z-10 ${
              isActive ? "text-primary/60" : "text-on-surface-variant/45"
            }`}
          >
            {exp.company}
          </p>

          {/* Description */}
          <p className="font-body text-sm text-on-surface-variant/50 leading-relaxed mb-5 relative z-10">
            {exp.description}
          </p>

          {/* ── Log Output Block ── */}
          <div className="relative bg-surface-container-lowest/50 rounded-lg border border-outline-variant/6 overflow-hidden mb-5">
            {/* Log header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/5 bg-surface-container-lowest/30">
              <span className="material-symbols-outlined text-[11px] text-on-surface-variant/25">
                terminal
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant/25 tracking-wider uppercase">
                Output Log
              </span>
            </div>

            {/* Log lines */}
            <div className="p-4 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3 group/line"
                >
                  <span className="font-mono text-[10px] text-primary/25 mt-[3px] select-none shrink-0 w-5 text-right tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[13px] text-on-surface-variant/60 leading-relaxed group-hover/line:text-on-surface-variant/80 transition-colors duration-200">
                    {bullet}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Tech Stack Footer ── */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[9px] text-on-surface-variant/25 uppercase tracking-[0.15em] shrink-0">
                Dependencies
              </span>
              <div className="h-[1px] flex-1 bg-outline-variant/6" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-surface-container-highest/30 rounded-md font-mono text-[10px] text-primary/45 uppercase tracking-wider border border-outline-variant/5 group-hover:text-primary/65 group-hover:border-primary/10 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Experience Section ── */
export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-tertiary/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              cat ~/experience.log
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
            Experience
          </h2>
          <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
            A chronological log of my journey — education, internships,
            and the milestones along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl">
          {experiences.map((exp, i) => (
            <TimelineNode
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}

          {/* Timeline end marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-5 md:gap-8"
          >
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-outline-variant/15 border border-dashed border-outline-variant/20" />
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant/25 tracking-wider uppercase">
              More chapters loading...
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
