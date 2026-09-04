"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { IndexEntry } from "@/lib/posts";
import { formatDate } from "@/blog-kit/lib/frontmatter";

const CARD =
  "group relative flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden cursor-pointer hover:border-primary/25 transition-all duration-400 shadow-[0_4px_40px_rgba(0,0,0,0.3)] flex flex-col";

function CardBody({ entry }: { entry: IndexEntry }) {
  return (
    <>
      {/* Thumbnail — the homepage is dark-only, so the dark cover always.
          No terminal chrome here: it fights the artwork, which already has its
          own composition. That device belongs to Featured Work.

          rounded-t-xl is not redundant with the card's rounding: the card uses
          backdrop-blur, and in Chromium a backdrop-filter creates a backdrop
          root that stops border-radius clipping its descendants — so the image
          corners render square unless rounded here too. */}
      <div className="relative h-[180px] bg-surface-container-lowest/60 border-b border-outline-variant/6 overflow-hidden rounded-t-xl">
        {entry.cover ? (
          <Image
            src={`${entry.cover}-dark.png`}
            alt=""
            width={1200}
            height={628}
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
        ) : entry.thumbnail ? (
          /* Remote Medium image. Plain <img> on purpose: routing someone else's
             CDN through next/image buys nothing here and spends transformations.
             The parent box is a fixed height, so there is no layout shift. */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={entry.thumbnail}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-primary/15">article</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2.5 font-mono text-[10px] text-on-surface-variant/35 flex-wrap">
          <span>{formatDate(entry.date)}</span>
          {entry.minutes ? <span>· {entry.minutes} min</span> : null}
          {entry.kind === "external" ? (
            <span className="px-1.5 py-0.5 rounded border border-outline-variant/15 text-primary/60">
              {entry.platform} ↗
            </span>
          ) : null}
        </div>

        <h3 className="mt-2.5 font-headline text-lg leading-snug text-on-surface/85 group-hover:text-primary transition-colors duration-300 line-clamp-3">
          {entry.title}
        </h3>

        {entry.deck ? (
          <p className="mt-2 text-sm text-on-surface-variant/50 leading-relaxed line-clamp-3">
            {entry.deck}
          </p>
        ) : null}

        <div className="mt-auto pt-3 flex gap-2 flex-wrap font-mono text-[10px] text-on-surface-variant/30">
          {entry.topics.slice(0, 3).map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function WritingScroller({
  entries,
  children,
}: {
  entries: IndexEntry[];
  /** the section header, rendered on the server and placed beside the controls */
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* header and controls share one row — the controls used to sit on their
          own line below, which wasted a band of vertical space */}
      <div className="px-6 md:px-16 lg:px-24 mb-8 flex items-end justify-between gap-8">
        <div className="min-w-0">{children}</div>

        <div className="hidden md:flex items-center gap-3 shrink-0 pb-1">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high/30 hover:bg-surface-container-highest/50 border border-outline-variant/10 hover:border-primary/20 text-on-surface-variant/50 hover:text-primary rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">article</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em]">All writing</span>
          </Link>
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll writing left"
            className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll writing right"
            className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-16 lg:px-24 pb-6 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {entries.map((entry, i) => (
          <motion.div
            key={entry.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {entry.kind === "native" ? (
              <Link href={entry.href} className={CARD}>
                <CardBody entry={entry} />
              </Link>
            ) : (
              <a href={entry.href} target="_blank" rel="noopener noreferrer" className={CARD}>
                <CardBody entry={entry} />
              </a>
            )}
          </motion.div>
        ))}

        {/* trailing card into the blog, mirroring the Featured Work pattern */}
        <Link
          href="/blog"
          className="flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] rounded-xl border border-dashed border-outline-variant/15 flex flex-col items-center justify-center gap-3 text-center px-8 hover:border-primary/25 transition-colors group"
        >
          <span className="material-symbols-outlined text-4xl text-primary/25 group-hover:text-primary/50 transition-colors">
            arrow_forward
          </span>
          <span className="font-headline text-lg text-on-surface/70 group-hover:text-primary transition-colors">
            All writing
          </span>
          <span className="font-mono text-[10px] text-on-surface-variant/35">
            everything, in one place
          </span>
        </Link>
      </div>
    </div>
  );
}
