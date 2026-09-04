import { getIndexEntries } from "@/lib/posts";
import WritingScroller from "./WritingScroller";

/**
 * Replaces the old Articles section, which fetched the Medium RSS feed directly.
 *
 * It now reads the same merged list the blog index uses — native posts plus the
 * pieces published elsewhere — so there is one source of truth for "what I have
 * written" rather than two lists that drift. It also drops a network fetch from
 * the homepage's render path.
 *
 * Horizontally scrollable cards, matching the Featured Work pattern — the blog
 * is the destination, this is the shop window.
 */
export default function Writing() {
  const entries = getIndexEntries();

  return (
    <section id="writing" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <WritingScroller entries={entries}>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
            cat ~/writing/*.md
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
          Writing
        </h2>
        <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
          Distributed systems, performance, and the things that only show up once
          something is actually running.
        </p>
      </WritingScroller>
    </section>
  );
}
