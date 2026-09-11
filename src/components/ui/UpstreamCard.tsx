"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import type { UpstreamStats } from "@/lib/github";

const GITHUB_USERNAME = "kripa-sindhu-007";

// Outfit has no U+2605 and the Material Symbols ligature does not form here, so
// the star is an inline path. Do not swap it back to a glyph.

// No API expresses "this fix resolves a downstream regression" — the connection
// exists only in prose on the linked issue. Keyed to the pull request so it
// disappears with it rather than quietly ageing on the page.
const DOWNSTREAM = {
  pr: 2373,
  text: "resolves a shallow-push regression in flipt-io/flipt (4.9k stars)",
  url: "https://github.com/flipt-io/flipt/issues/6478",
};

/** Simple original silhouettes rather than the trademarked emblems. */
function JokerMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] shrink-0" aria-hidden="true">
      <path
        d="M4.2 9.5C3 7.6 3.4 5 5.2 3.8c-.3 1.7.4 3 1.6 3.8M19.8 9.5c1.2-1.9.8-4.5-1-5.7.3 1.7-.4 3-1.6 3.8"
        className="stroke-green-400/70"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13" r="7" className="stroke-on-surface-variant/45" strokeWidth="1.3" fill="none" />
      <circle cx="9.4" cy="11.6" r="1" className="fill-on-surface-variant/60" />
      <circle cx="14.6" cy="11.6" r="1" className="fill-on-surface-variant/60" />
      <path
        d="M8 15c1 2 2.4 3 4 3s3-1 4-3"
        className="stroke-error/70"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatMark() {
  return (
    <svg viewBox="0 0 48 22" className="w-[21px] h-[10px] shrink-0" aria-hidden="true">
      <path
        className="fill-on-surface/55"
        d="M24 3c1.1 0 1.9 1.3 2.2 2.8.6-.5 1.3-.8 2.1-.8 1.6 0 2.9 1.1 3.4 2.6C33.3 5.6 35.4 4.2 37.9 4.2c2.5 0 4.7 1.2 6.3 3-1.4-.4-2.8.1-3.7 1.1-1 1.3-.9 3.1-.2 4.8-2.3-1.5-5.3-2-8.2-1.1-2.4.7-4.3 2.2-5.5 4.2L24 19l-2.6-2.8c-1.2-2-3.1-3.5-5.5-4.2-2.9-.9-5.9-.4-8.2 1.1.7-1.7.8-3.5-.2-4.8-.9-1-2.3-1.5-3.7-1.1 1.6-1.8 3.8-3 6.3-3 2.5 0 4.6 1.4 6.2 3.4C16.8 6.1 18.1 5 19.7 5c.8 0 1.5.3 2.1.8C22.1 4.3 22.9 3 24 3z"
      />
    </svg>
  );
}

type Snippet = {
  lang: string;
  file: string;
  code: string[];
  /** the reading — the reason the snippet is that snippet */
  note: string;
  mark?: "joker" | "bat";
};

/**
 * One idiom per language, rotating on a two-hour slot. Each is real, idiomatic
 * code for its language and each means something; the comment is the reading.
 */
const SNIPPETS: Snippet[] = [
  {
    lang: "go",
    file: "debt.go",
    code: [
      "func run() {",
      "    defer settle(debt)",
      '    panic("plans change")',
      "}",
    ],
    note: "deferred is not cancelled — it still runs on the way out",
  },
  {
    lang: "typescript",
    file: "excuses.ts",
    code: [
      "function noExcuse(reason: never): never {",
      "  throw new Error(`unhandled: ${reason}`)",
      "}",
    ],
    note: "the case you skipped is the one that ships",
  },
  {
    lang: "react",
    file: "reset.tsx",
    code: ["<Self key={lesson} />"],
    note: "some things restart cleaner than they repair",
  },
  {
    lang: "angular",
    file: "effort.ts",
    code: [
      "effort = signal(0);",
      "outcome = computed(() => this.effort() ** 2);",
    ],
    note: "outcome is derived, never assigned",
  },
  {
    lang: "javascript",
    file: "worth.js",
    code: [
      "Object.groupBy(work, w =>",
      '  w.paid ? "yes" : "never"',
      ")",
    ],
    note: "if you're good at something, never do it for free",
    mark: "joker",
  },
  {
    lang: "python",
    file: "brave.py",
    code: [
      "match odds:",
      '    case "against": go()',
      "    case _: go()",
    ],
    note: "men are brave",
    mark: "bat",
  },
];

const SLOT_MS = 2 * 60 * 60 * 1000;

/**
 * A clock read during render would disagree with the server-rendered HTML and
 * trip hydration; useSyncExternalStore is the sanctioned way to read changing
 * external state, and it keeps the rotation out of an effect (this repo lints
 * setState-in-effect as an error).
 */
function subscribeToSlot(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
const currentSlot = () => Math.floor(Date.now() / SLOT_MS) % SNIPPETS.length;
/** The server has no meaningful clock for this; the client corrects on hydrate. */
const serverSlot = () => 0;

/** The cursor is the only thing that moves now; the quotes are always whole. */
function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`inline-block w-[5px] h-[13px] bg-primary/70 align-middle ${
        on ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

/**
 * z-20 because the hero's <h1> sits at z-10 and its box overlaps this card:
 * without it the h1 wins the hit test and the left half of every row is dead.
 * The container stays pointer-events-none, so only the links themselves take
 * clicks and everything behind the card is still reachable.
 *
 * Presentational only. Counts are fetched on the server (see lib/github.ts) and
 * passed in, so the browser makes no GitHub calls and the numbers are in the
 * server-rendered HTML rather than arriving late and shifting the layout.
 */
export default function UpstreamCard({ upstream }: { upstream: UpstreamStats }) {
  const downstream = upstream.recent.some((pr) => pr.number === DOWNSTREAM.pr);
  const slot = useSyncExternalStore(subscribeToSlot, currentSlot, serverSlot);
  const snippet = SNIPPETS[slot];

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
      initial="hidden"
      animate="show"
      className="relative z-20 mt-16 lg:mt-0 lg:absolute lg:right-12 xl:right-20 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[400px] xl:w-[440px] space-y-3 pointer-events-none"
    >
      {/* Upstream contributions card */}
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
              Upstream_PRs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto font-mono text-[9px] text-primary/40 hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded transition-colors duration-300"
            >
              @{GITHUB_USERNAME}
            </a>
            {upstream.live ? (
              <span className="relative flex h-1.5 w-1.5" title="Live from the GitHub API">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
            ) : (
              <span
                className="flex items-center gap-1.5"
                title="GitHub rate-limited the request; showing the last known list"
              >
                <span className="font-mono text-[8px] uppercase tracking-wider text-on-surface-variant/35">
                  cached
                </span>
                <span className="inline-flex rounded-full h-1.5 w-1.5 bg-on-surface-variant/25" />
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-[9px] leading-relaxed text-on-surface-variant/40">
            Pull requests into repositories maintained by other people.
          </p>

          {/* Named, not counted: at these numbers the repository carries far
              more than any total would. Stars are the repository's, labelled as
              such, and sit on the row they belong to. */}
          <div className="space-y-px">
            {upstream.recent.map((pr) => (
              <a
                key={pr.url}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                title={pr.title}
                className="pointer-events-auto group block py-1.5 px-2 -mx-2 rounded-md hover:bg-primary/[0.06] focus-visible:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors duration-300"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] text-primary/60 group-hover:text-primary shrink-0 transition-colors duration-300">
                    #{pr.number}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface/70 group-hover:text-on-surface truncate transition-colors duration-300">
                    {pr.repo}
                  </span>
                  {pr.stars > 0 && (
                    <span
                      className="flex items-center gap-0.5 shrink-0 text-on-surface-variant/35"
                      title={`${pr.repo} has ${pr.stars.toLocaleString()} stars`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[9px] h-[9px] fill-current shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="font-mono text-[9px]">
                        {pr.stars.toLocaleString()}
                      </span>
                    </span>
                  )}
                  <span className="grow" />
                  <span
                    className={`font-mono text-[7px] uppercase tracking-wider px-1.5 py-px rounded shrink-0 border ${
                      pr.state === "merged"
                        ? "text-primary/70 border-primary/20 bg-primary/[0.07]"
                        : "text-on-surface-variant/55 border-outline-variant/20 bg-surface-container-highest/30"
                    }`}
                  >
                    {pr.state === "merged" ? "merged" : "in review"}
                  </span>
                </span>
                <span className="block font-mono text-[9px] text-on-surface-variant/40 truncate mt-0.5">
                  {pr.title}
                </span>
              </a>
            ))}
          </div>

          {downstream && (
            <a
              href={DOWNSTREAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto block pt-3 border-t border-outline-variant/8 font-mono text-[9px] leading-relaxed text-on-surface-variant/40 hover:text-on-surface-variant/70 focus-visible:text-on-surface-variant/70 focus-visible:outline-none transition-colors duration-300"
            >
              <span className="text-primary/50">#{DOWNSTREAM.pr}</span> {DOWNSTREAM.text}
            </a>
          )}
        </div>
      </motion.div>

      {/* Terminal card — one language idiom, rotating every two hours */}
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
            ~/{snippet.lang}/{snippet.file}
          </span>
          <span className="font-mono text-[9px] text-on-surface-variant/20">
            {snippet.lang}
          </span>
        </div>
        {/* Height follows the content: nothing here can grow at runtime, so a
            fixed box would only invent a way to clip. */}
        <div className="px-4 py-3.5 space-y-2.5 min-h-[150px]">
          <div className="flex items-start gap-0">
            <span className="font-mono text-[11px] text-green-400/70 shrink-0 select-none">
              ❯{" "}
            </span>
            <span className="font-mono text-[11px] text-primary/80">
              cat {snippet.file}
            </span>
          </div>

          <div className="pl-3.5 space-y-0.5">
            {snippet.code.map((line) => (
              <div
                key={line}
                className={`font-mono text-[11px] leading-relaxed whitespace-pre ${
                  line.trimStart().startsWith("//") || line.trimStart().startsWith("#")
                    ? "text-on-surface-variant/35"
                    : "text-on-surface-variant/70"
                }`}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-3.5">
            {snippet.mark && (
              <span className="w-6 flex justify-center shrink-0">
                {snippet.mark === "joker" ? <JokerMark /> : <BatMark />}
              </span>
            )}
            <p className="font-mono text-[10px] leading-relaxed text-on-surface-variant/35">
              {snippet.mark ? "" : "# "}
              {snippet.note}
            </p>
          </div>

          <div className="flex items-center gap-0 pt-0.5">
            <span className="font-mono text-[11px] text-green-400/70 shrink-0 select-none">
              ❯{" "}
            </span>
            <Cursor />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
