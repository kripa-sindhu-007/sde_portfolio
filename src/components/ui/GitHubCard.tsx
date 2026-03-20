"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const GITHUB_USERNAME = "kripa-sindhu-007";

const WISDOM_LINES = [
  { prompt: true, text: "echo $PHILOSOPHY" },
  { prompt: false, text: '"First, solve the problem.' },
  { prompt: false, text: ' Then, write the code."' },
  { prompt: false, text: "  — John Johnson" },
  { prompt: true, text: "cat principles.conf" },
  { prompt: false, text: "SIMPLICITY > CLEVERNESS" },
  { prompt: false, text: "SHIP_FAST  = true" },
  { prompt: false, text: "TESTS      = non-negotiable" },
];

function TerminalTyper() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Delay start
    const startDelay = setTimeout(() => {
      setVisibleLines(1);
    }, 2500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (visibleLines === 0 || visibleLines > WISDOM_LINES.length) return;

    const currentLine = WISDOM_LINES[visibleLines - 1];
    const fullText = currentLine.text;

    if (charIndex < fullText.length) {
      // Type speed: faster for non-prompt lines
      const speed = currentLine.prompt ? 60 : 30;
      const timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      // Line done — pause then show next
      const pause = currentLine.prompt ? 600 : 200;
      const timer = setTimeout(() => {
        if (visibleLines < WISDOM_LINES.length) {
          setVisibleLines((v) => v + 1);
          setCharIndex(0);
        } else {
          // All done, restart after a long pause
          const restart = setTimeout(() => {
            setVisibleLines(1);
            setCharIndex(0);
          }, 6000);
          return () => clearTimeout(restart);
        }
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, charIndex]);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {WISDOM_LINES.slice(0, visibleLines).map((line, i) => {
        const isCurrentLine = i === visibleLines - 1;
        const displayText = isCurrentLine
          ? line.text.slice(0, charIndex)
          : line.text;

        return (
          <div key={`${i}-${line.text}`} className="flex items-start gap-0 leading-relaxed">
            {line.prompt ? (
              <>
                <span className="font-mono text-[11px] text-green-400/70 shrink-0 select-none">
                  ❯{" "}
                </span>
                <span className="font-mono text-[11px] text-primary/80">
                  {displayText}
                </span>
              </>
            ) : (
              <span className="font-mono text-[11px] text-on-surface-variant/50 pl-3.5">
                {displayText}
              </span>
            )}
            {isCurrentLine && (
              <span
                className={`inline-block w-[5px] h-[14px] bg-primary/70 ml-[1px] mt-[1px] ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        );
      })}
      {visibleLines === 0 && (
        <div className="flex items-center gap-0">
          <span className="font-mono text-[11px] text-green-400/70 select-none">
            ❯{" "}
          </span>
          <span
            className={`inline-block w-[5px] h-[14px] bg-primary/70 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
    </>
  );
}

interface GitHubStats {
  repos: number;
  commits: number;
  languages: number;
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return <>{display.toLocaleString()}</>;
}

export default function GitHubCard() {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    commits: 0,
    languages: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, commitsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&per_page=1`,
            { headers: { Accept: "application/vnd.github.cloak-preview+json" } }
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
          ),
        ]);

        const userData = await userRes.json();
        const commitData = await commitsRes.json();
        const reposData = await reposRes.json();

        const langs = new Set<string>();
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: { language?: string }) => {
            if (repo.language) langs.add(repo.language);
          });
        }

        setStats({
          repos: userData.public_repos ?? 0,
          commits: commitData.total_count ?? 0,
          languages: langs.size || 0,
        });
        setLoaded(true);
      } catch {
        setStats({ repos: 39, commits: 1171, languages: 11 });
        setLoaded(true);
      }
    }

    fetchStats();
  }, []);

  const commitPercent = Math.min((stats.commits / 1500) * 100, 95);

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
      initial="hidden"
      animate="show"
      className="mt-16 lg:mt-0 lg:absolute lg:right-12 xl:right-20 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[400px] xl:w-[440px] space-y-3 pointer-events-none"
    >
      {/* Main GitHub stats card */}
      <motion.div
        variants={fadeIn}
        className="animate-float bg-surface-container-low/40 backdrop-blur-2xl p-6 rounded-xl border border-outline-variant/8 shadow-[0_8px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 fill-primary"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-on-surface-variant/60 uppercase">
              GitHub_Stats
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto font-mono text-[9px] text-primary/40 hover:text-primary transition-colors duration-300"
            >
              @{GITHUB_USERNAME}
            </a>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Commit progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-wider">
                Total Commits
              </span>
              <span className="font-mono text-[9px] text-primary/50">
                {loaded ? stats.commits.toLocaleString() : "---"}
              </span>
            </div>
            <div className="h-1 bg-surface-container-highest/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: loaded ? `${commitPercent}%` : "0%" }}
                transition={{ delay: 1.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full"
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/5">
              <span className="block font-mono text-[8px] text-on-surface-variant/50 uppercase mb-1.5 tracking-wider">
                Repos
              </span>
              <span className="font-headline font-bold text-xl tracking-tight">
                {loaded ? <AnimatedNumber value={stats.repos} delay={1200} /> : "--"}
              </span>
            </div>
            <div className="p-3 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/5">
              <span className="block font-mono text-[8px] text-on-surface-variant/50 uppercase mb-1.5 tracking-wider">
                Commits
              </span>
              <span className="font-headline font-bold text-xl tracking-tight">
                {loaded ? (
                  <>
                    <AnimatedNumber value={stats.commits} delay={1400} />
                  </>
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-3 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/5">
              <span className="block font-mono text-[8px] text-on-surface-variant/50 uppercase mb-1.5 tracking-wider">
                Languages
              </span>
              <span className="font-headline font-bold text-xl tracking-tight">
                {loaded ? <AnimatedNumber value={stats.languages} delay={1600} /> : "--"}
              </span>
            </div>
          </div>

          {/* Activity bars */}
          <div className="flex items-end gap-[3px] h-6 pt-2">
            {[40, 65, 30, 85, 50, 70, 45, 90, 55, 75, 35, 80, 60, 40, 70, 50].map(
              (h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    delay: 1.8 + i * 0.04,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex-1 bg-primary/15 rounded-[1px]"
                />
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Terminal card */}
      <motion.div
        variants={fadeIn}
        className="animate-float-delayed bg-surface-container-lowest/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 ml-0 lg:ml-6 overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.3)]"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container-high/40 border-b border-outline-variant/8">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
          </div>
          <span className="font-mono text-[9px] text-on-surface-variant/30 tracking-wider">
            ~/wisdom.sh
          </span>
          <span className="font-mono text-[9px] text-on-surface-variant/20">
            bash
          </span>
        </div>
        {/* Terminal body — fixed height, content clips at bottom */}
        <div className="px-4 py-3.5 h-[160px] overflow-hidden">
          <div className="space-y-2">
            <TerminalTyper />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
