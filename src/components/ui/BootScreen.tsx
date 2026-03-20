"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const BOOT_LINES = [
  { text: "[kernel]  initializing system...", delay: 0 },
  { text: "[boot]    loading modules ██████░░ 75%", delay: 200 },
  { text: "[net]     establishing connections...", delay: 400 },
  { text: "[gpu]     rendering pipeline ready", delay: 550 },
  { text: "[auth]    identity: kripa_sindhu", delay: 700 },
  { text: "[config]  theme: engineer_atelier_dark", delay: 850 },
  { text: "[status]  all systems operational ✓", delay: 1050 },
];

const TOTAL_DURATION = 2800;
const PROGRESS_DURATION = 1800;

export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready" | "exit">("boot");
  const [interrupted, setInterrupted] = useState(false);
  const skippedRef = useRef(false);

  const startExit = useCallback(() => {
    setPhase("exit");
    setTimeout(() => setVisible(false), 600);
  }, []);

  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setInterrupted(true);
    setLines(BOOT_LINES.map((_, i) => i));
    setProgress(100);
    // Brief pause to show the interrupt message, then exit
    setTimeout(() => startExit(), 800);
  }, [startExit]);

  useEffect(() => {
    // Lock scroll during boot
    document.body.style.overflow = "hidden";

    // Reveal boot lines
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Animate progress bar
    const progressStart = performance.now();
    const animateProgress = (now: number) => {
      if (skippedRef.current) return;
      const elapsed = now - progressStart;
      const p = Math.min(elapsed / PROGRESS_DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) requestAnimationFrame(animateProgress);
    };
    requestAnimationFrame(animateProgress);

    // Transition to ready state
    const readyTimer = setTimeout(() => setPhase("ready"), PROGRESS_DURATION + 200);

    // Auto exit
    const exitTimer = setTimeout(startExit, TOTAL_DURATION);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [startExit]);

  // Unlock scroll when unmounting
  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  // Respect reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      document.body.style.overflow = "";
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center cursor-pointer"
          onClick={phase !== "exit" ? handleSkip : undefined}
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, color-mix(in srgb, var(--color-primary) 1.5%, transparent) 2px, color-mix(in srgb, var(--color-primary) 1.5%, transparent) 4px)",
              }}
            />
          </div>

          {/* Center content */}
          <div className="relative w-full max-w-md px-8">
            {/* KS Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span
                  className="font-display text-base font-black text-primary tracking-tighter"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  KS
                </span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-on-surface/90 tracking-tight">
                  ENGINEER_ATELIER
                </div>
                <div className="font-mono text-[9px] text-on-surface-variant/40 tracking-[0.1em] uppercase">
                  Portfolio v2.0.4
                </div>
              </div>
            </motion.div>

            {/* Terminal boot log */}
            <div className="bg-surface-container-lowest/70 rounded-lg border border-outline-variant/8 overflow-hidden mb-6">
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-outline-variant/8 bg-surface-container-high/30">
                <span className="w-2 h-2 rounded-full bg-error/50" />
                <span className="w-2 h-2 rounded-full bg-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-green-400/40" />
                <span className="ml-2 font-mono text-[9px] text-on-surface-variant/30 tracking-wider">
                  boot.sh
                </span>
              </div>

              {/* Boot lines */}
              <div className="px-4 py-3 h-[180px] overflow-hidden">
                {BOOT_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={
                      lines.includes(i)
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -8 }
                    }
                    transition={{ duration: 0.15 }}
                    className="font-mono text-[11px] leading-[1.8]"
                  >
                    {line.text.includes("✓") ? (
                      <span className="text-green-400/70">{line.text}</span>
                    ) : line.text.includes("kripa") ||
                      line.text.includes("engineer") ? (
                      <span className="text-primary/60">{line.text}</span>
                    ) : (
                      <span className="text-on-surface-variant/45">
                        {line.text}
                      </span>
                    )}
                  </motion.div>
                ))}

                {/* Interrupt message */}
                <AnimatePresence>
                  {interrupted && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className="font-mono text-[11px] leading-[1.8] text-tertiary/70"
                    >
                      {"> boot sequence interrupted by user"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="h-[3px] bg-surface-container-highest/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    interrupted
                      ? "bg-gradient-to-r from-tertiary/70 via-tertiary to-tertiary/70 transition-all duration-300"
                      : "bg-gradient-to-r from-primary/70 via-primary to-primary/70 transition-none"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-on-surface-variant/40 tracking-wider">
                  {interrupted ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-tertiary/70"
                    >
                      Skipping...
                    </motion.span>
                  ) : phase === "boot" ? (
                    "Initializing..."
                  ) : phase === "ready" ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400/70"
                    >
                      System ready
                    </motion.span>
                  ) : (
                    <span className="text-green-400/70">Launching →</span>
                  )}
                </span>
                <span className="font-mono text-[9px] text-on-surface-variant/30 tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Click to skip hint */}
            {!interrupted && phase === "boot" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-center mt-6"
              >
                <span className="font-mono text-[9px] text-on-surface-variant/20 tracking-[0.1em]">
                  click anywhere to skip
                </span>
              </motion.div>
            )}
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-outline-variant/10" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-outline-variant/10" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-outline-variant/10" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-outline-variant/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
