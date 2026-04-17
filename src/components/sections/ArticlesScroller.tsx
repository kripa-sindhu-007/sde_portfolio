"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { MediumArticle } from "@/lib/medium";

function ArticleCard({ article }: { article: MediumArticle }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden cursor-pointer hover:border-primary/25 transition-all duration-400 shadow-[0_4px_40px_rgba(0,0,0,0.3)] flex flex-col"
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-[180px] bg-surface-container-lowest/60 border-b border-outline-variant/6 overflow-hidden">
        {/* Terminal chrome */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 px-4 pt-3.5 pb-1 bg-gradient-to-b from-black/40 to-transparent">
          <span className="w-2 h-2 rounded-full bg-error/50" />
          <span className="w-2 h-2 rounded-full bg-tertiary/40" />
          <span className="w-2 h-2 rounded-full bg-green-400/40" />
          <span className="ml-2 font-mono text-[9px] text-on-surface-variant/50 tracking-wider">
            {article.id.slice(0, 24)}.md
          </span>
        </div>

        {article.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={article.thumbnail}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-primary/15">
              article
            </span>
          </div>
        )}

        {/* Bottom fade over image */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-container-low/90 to-transparent" />

        {/* Medium badge */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 bg-background/70 backdrop-blur-md rounded-md border border-outline-variant/15">
          <span className="material-symbols-outlined text-[11px] text-primary/80">
            article
          </span>
          <span className="font-mono text-[9px] text-on-surface-variant/70 uppercase tracking-[0.1em]">
            Medium
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex-1 flex flex-col p-4 pb-3">
        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-on-surface-variant/40 uppercase tracking-[0.1em]">
          <span>{article.formattedDate}</span>
          <span className="text-on-surface-variant/20">·</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]">
              schedule
            </span>
            {article.readingTimeMin} min
          </span>
        </div>

        <h3 className="font-headline font-bold text-[15px] text-on-surface tracking-tight leading-snug line-clamp-2 group-hover:text-primary/90 transition-colors">
          {article.title}
        </h3>

        <p className="mt-2 font-body text-[12px] text-on-surface-variant/55 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 bg-surface-container-highest/40 rounded font-mono text-[9px] text-primary/50 uppercase tracking-wider border border-outline-variant/5"
              >
                {cat}
              </span>
            ))}
            {article.categories.length > 3 && (
              <span className="px-2 py-0.5 font-mono text-[9px] text-on-surface-variant/35">
                +{article.categories.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-outline-variant/6">
          <span className="font-mono text-[9px] text-on-surface-variant/40">
            Read on Medium
          </span>
          <span className="font-mono text-[10px] text-primary/50 flex items-center gap-1 group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[13px]">
              arrow_outward
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

function EmptyState({ profileUrl }: { profileUrl: string }) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] rounded-xl border border-dashed border-outline-variant/15 flex flex-col items-center justify-center gap-3 text-center px-8 hover:border-primary/25 transition-colors group"
    >
      <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 group-hover:text-primary/60 transition-colors">
        rss_feed
      </span>
      <span className="font-mono text-[11px] text-on-surface-variant/50 tracking-wider uppercase">
        Feed temporarily unavailable
      </span>
      <span className="font-body text-xs text-on-surface-variant/35 leading-relaxed">
        Articles couldn&apos;t be loaded right now. Browse them directly on
        Medium.
      </span>
      <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-primary/60 uppercase tracking-[0.1em] group-hover:text-primary">
        Open Medium
        <span className="material-symbols-outlined text-[14px]">
          open_in_new
        </span>
      </span>
    </a>
  );
}

export default function ArticlesScroller({
  articles,
  profileUrl,
}: {
  articles: MediumArticle[];
  profileUrl: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Toolbar: View all + scroll controls (desktop) */}
      <div className="hidden md:flex items-center justify-end gap-3 px-6 md:px-16 lg:px-24 mb-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high/30 hover:bg-surface-container-highest/50 border border-outline-variant/10 hover:border-primary/20 text-on-surface-variant/50 hover:text-primary rounded-lg transition-all duration-300 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            open_in_new
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
            View all on Medium
          </span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll articles left"
            className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll articles right"
            className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Right edge fade */}
      <div className="absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-16 lg:px-24 pb-6 scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {articles.length === 0 ? (
          <EmptyState profileUrl={profileUrl} />
        ) : (
          <>
            {articles.map((article, i) => (
              <motion.div
                key={article.id + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}

            {/* "More coming soon" placeholder */}
            <div className="flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] rounded-xl border border-dashed border-outline-variant/10 flex flex-col items-center justify-center gap-3 opacity-30">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant/45">
                add_circle
              </span>
              <span className="font-mono text-[11px] text-on-surface-variant/45 tracking-wider uppercase">
                More coming soon
              </span>
            </div>
          </>
        )}
      </div>

      {/* Mobile swipe hint */}
      {articles.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="md:hidden flex items-center justify-center gap-2 pt-2 pb-1"
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="material-symbols-outlined text-[14px] text-primary/40"
          >
            swipe_left
          </motion.span>
          <span className="font-mono text-[9px] text-on-surface-variant/40 tracking-[0.1em] uppercase">
            Swipe to explore
          </span>
        </motion.div>
      )}
    </div>
  );
}
