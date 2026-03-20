"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

/* ── Animated counter ── */
function AnimatedStat({
  value,
  from,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const startVal = from ?? 0;
  const [count, setCount] = useState(startVal);

  useEffect(() => {
    if (!isInView) return;
    const totalSteps = Math.abs(value - startVal);
    if (totalSteps === 0) return;
    const stepTime = (duration * 1000) / totalSteps;
    const clampedStep = Math.max(stepTime, 16);
    const stepsPerTick = Math.ceil(totalSteps / (duration * 1000 / clampedStep));
    const dir = value > startVal ? 1 : -1;
    let current = startVal;

    const timer = setInterval(() => {
      current += stepsPerTick * dir;
      if ((dir === 1 && current >= value) || (dir === -1 && current <= value)) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, clampedStep);

    return () => clearInterval(timer);
  }, [isInView, value, startVal, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Achievement data ── */
const achievements = [
  {
    id: "gate",
    icon: "military_tech",
    metric: "Top 5%",
    label: "GATE CSE",
    sublabel: "2024 & 2025",
    description:
      "Secured rank within the top 5% of candidates nationwide in Graduate Aptitude Test in Engineering — Computer Science, demonstrating strong fundamentals across OS, DBMS, Networks, Algorithms, and Theory of Computation.",
    accent: "tertiary" as const,
    numericValue: 5,
    numericSuffix: "%",
    numericPrefix: "Top ",
  },
  {
    id: "leetcode",
    icon: "emoji_events",
    metric: "1914",
    label: "LeetCode Rating",
    sublabel: "Knight Badge",
    description:
      "Achieved Knight rank on LeetCode with 1000+ problems solved across data structures and algorithms. Consistent contest participation with a peak rating of 1914.",
    accent: "primary" as const,
    numericValue: 1914,
    numericSuffix: "",
    numericPrefix: "",
  },
  {
    id: "problems",
    icon: "data_object",
    metric: "1000+",
    label: "Problems Solved",
    sublabel: "DSA & Algorithms",
    description:
      "Solved 1000+ competitive programming problems spanning arrays, graphs, dynamic programming, trees, and advanced algorithmic paradigms.",
    accent: "primary" as const,
    numericValue: 1000,
    numericSuffix: "+",
    numericPrefix: "",
  },
  {
    id: "publication",
    icon: "auto_stories",
    metric: "Springer",
    label: "Published Research",
    sublabel: "Computing, Vol. 108",
    description:
      "Co-authored EV-GREEN — a hybrid MILP and graph-based framework for electric-vehicle eco-routing, published in Computing (Springer Nature).",
    accent: "tertiary" as const,
    numericValue: 0,
    numericSuffix: "",
    numericPrefix: "",
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-[20%] right-[-6%] w-[500px] h-[500px] bg-tertiary/[0.025] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-8%] w-[400px] h-[400px] bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-tertiary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-tertiary uppercase">
              ./benchmarks --run
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
            Achievements
          </h2>
          <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
            Milestones and benchmarks that quantify the grind.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl">
          {/* GATE — large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              delay: 0.1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-7 group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden hover:border-tertiary/20 transition-colors duration-300"
          >
            <div className="h-[2px] bg-gradient-to-r from-tertiary/40 via-tertiary/10 to-transparent" />
            {/* Background watermark */}
            <div className="absolute top-4 right-4 font-display text-[80px] md:text-[160px] font-black leading-none text-on-surface/[0.02] select-none pointer-events-none tracking-tighter overflow-hidden">
              5%
            </div>
            <div className="relative p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-2xl">
                    military_tech
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-tertiary/10 border border-tertiary/15 font-mono text-[9px] text-tertiary uppercase tracking-widest">
                      National Rank
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant/50">
                      2024 & 2025
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight">
                    GATE — Computer Science & Engineering
                  </h3>
                </div>
              </div>

              {/* Big stat */}
              <div className="mb-5">
                <span className="font-display text-6xl md:text-7xl font-black tracking-tighter text-gradient-tertiary">
                  <AnimatedStat
                    value={5}
                    from={50}
                    prefix="Top "
                    suffix="%"
                    duration={1.5}
                  />
                </span>
                <p className="font-mono text-[11px] text-on-surface-variant/40 mt-2 tracking-wider uppercase">
                  of candidates nationwide
                </p>
              </div>

              <p className="font-body text-sm text-on-surface-variant/50 leading-relaxed max-w-md">
                {achievements[0].description}
              </p>

              {/* Subject chips */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-outline-variant/8">
                {["OS", "DBMS", "Networks", "Algorithms", "TOC", "Digital Logic"].map(
                  (s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-surface-container-highest/40 rounded-md font-mono text-[10px] text-tertiary/60 uppercase tracking-wider border border-outline-variant/5"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* LeetCode — tall card */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-5 group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden hover:border-primary/20 transition-colors duration-300"
          >
            <div className="h-[2px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
            {/* Background watermark */}
            <div className="absolute bottom-2 right-4 font-display text-[70px] md:text-[130px] font-black leading-none text-on-surface/[0.02] select-none pointer-events-none tracking-tighter overflow-hidden">
              LC
            </div>
            <div className="relative p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    emoji_events
                  </span>
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/15 font-mono text-[9px] text-primary uppercase tracking-widest">
                    Knight Badge
                  </span>
                  <h3 className="font-headline font-bold text-base text-on-surface tracking-tight mt-1">
                    LeetCode
                  </h3>
                </div>
              </div>

              {/* Rating stat */}
              <div className="mb-4">
                <span className="font-display text-5xl md:text-6xl font-black tracking-tighter text-gradient-primary">
                  <AnimatedStat value={1914} duration={2} />
                </span>
                <p className="font-mono text-[11px] text-on-surface-variant/40 mt-1 tracking-wider uppercase">
                  Peak Contest Rating
                </p>
              </div>

              {/* Problems stat */}
              <div className="mt-auto pt-5 border-t border-outline-variant/8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black tracking-tight text-on-surface/80">
                    <AnimatedStat value={1000} suffix="+" duration={2} />
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase tracking-wider">
                    problems solved
                  </span>
                </div>
                {/* Mini progress segments */}
                <div className="flex gap-1 mt-3">
                  {[
                    { label: "Easy", w: "20%", color: "bg-green-400/40" },
                    { label: "Medium", w: "55%", color: "bg-tertiary/40" },
                    { label: "Hard", w: "25%", color: "bg-error/40" },
                  ].map((seg) => (
                    <motion.div
                      key={seg.label}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{
                        delay: 0.8,
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`h-1.5 rounded-full origin-left ${seg.color}`}
                      style={{ width: seg.w }}
                      title={seg.label}
                    />
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  {[
                    { label: "Easy", color: "bg-green-400/40" },
                    { label: "Medium", color: "bg-tertiary/40" },
                    { label: "Hard", color: "bg-error/40" },
                  ].map((seg) => (
                    <div key={seg.label} className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${seg.color}`}
                      />
                      <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-wider">
                        {seg.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom row — two smaller cards */}
          {/* Springer Publication */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-5 group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden hover:border-tertiary/20 transition-colors duration-300"
          >
            <div className="h-[2px] bg-gradient-to-r from-tertiary/30 via-tertiary/8 to-transparent" />
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-tertiary/8 border border-tertiary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary/70 text-lg">
                    auto_stories
                  </span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-on-surface tracking-tight">
                    Published Research
                  </h3>
                  <span className="font-mono text-[10px] text-on-surface-variant/50">
                    Computing (Springer Nature)
                  </span>
                </div>
              </div>
              <p className="font-body text-sm text-on-surface-variant/45 leading-relaxed line-clamp-2">
                EV-GREEN — hybrid MILP framework for electric-vehicle eco-routing with
                V2G incentive integration.
              </p>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-outline-variant/6">
                <span className="font-mono text-[10px] text-tertiary/50 tracking-wider">
                  Vol. 108 &middot; Article 27 &middot; Feb 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* Competitive Programming */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              delay: 0.45,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-7 group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden hover:border-primary/20 transition-colors duration-300"
          >
            <div className="h-[2px] bg-gradient-to-r from-primary/30 via-primary/8 to-transparent" />
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary/70 text-lg">
                    terminal
                  </span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-on-surface tracking-tight">
                    Competitive Programming
                  </h3>
                  <span className="font-mono text-[10px] text-on-surface-variant/50">
                    DSA & Algorithmic Problem Solving
                  </span>
                </div>
              </div>
              {/* Terminal-style output */}
              <div className="bg-surface-container-lowest/60 rounded-lg border border-outline-variant/6 p-4 font-mono text-[11px] leading-relaxed">
                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-outline-variant/6">
                  <span className="w-2 h-2 rounded-full bg-error/40" />
                  <span className="w-2 h-2 rounded-full bg-tertiary/40" />
                  <span className="w-2 h-2 rounded-full bg-green-400/40" />
                  <span className="ml-2 text-[9px] text-on-surface-variant/25 tracking-wider">
                    stats.sh
                  </span>
                </div>
                <p className="text-on-surface-variant/40">
                  <span className="text-primary/50">$</span> platform
                  <span className="text-tertiary/60"> &quot;LeetCode&quot;</span>
                </p>
                <p className="text-on-surface-variant/40">
                  <span className="text-green-400/50">{">>"}</span> rank:{" "}
                  <span className="text-on-surface/70">Knight</span> | rating:{" "}
                  <span className="text-on-surface/70">1914</span> | solved:{" "}
                  <span className="text-on-surface/70">1000+</span>
                </p>
                <p className="text-on-surface-variant/40 mt-1.5">
                  <span className="text-primary/50">$</span> topics
                  <span className="text-tertiary/60"> --top</span>
                </p>
                <p className="text-on-surface-variant/40">
                  <span className="text-green-400/50">{">>"}</span>{" "}
                  <span className="text-on-surface-variant/55">
                    DP, Graphs, Trees, Binary Search, Greedy, Segment Trees
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
