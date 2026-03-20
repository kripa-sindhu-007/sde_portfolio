"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { publications, type Publication } from "@/data/publications";

/* ── Publication Card ── */
function PublicationCard({
  pub,
  onExpand,
}: {
  pub: Publication;
  onExpand: () => void;
}) {
  return (
    <motion.div
      layoutId={`pub-card-${pub.id}`}
      onClick={onExpand}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden cursor-pointer hover:border-primary/20 transition-colors duration-300 shadow-[0_4px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Top accent */}
      <div className="h-[2px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />

      <div className="p-6 md:p-8 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-primary text-xl">
                {pub.icon}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/15 font-mono text-[9px] text-primary uppercase tracking-widest">
                  Journal Article
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant/35">
                  {pub.date}
                </span>
              </div>
              <motion.h3
                layoutId={`pub-title-${pub.id}`}
                className="font-headline font-bold text-base md:text-lg text-on-surface tracking-tight leading-snug"
              >
                {pub.shortTitle}
              </motion.h3>
              <motion.p
                layoutId={`pub-journal-${pub.id}`}
                className="font-label text-sm text-on-surface-variant/50 mt-1"
              >
                {pub.journal} &middot; {pub.volume}
              </motion.p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant/20 group-hover:text-primary/50 transition-colors text-lg mt-1 shrink-0">
            open_in_full
          </span>
        </div>

        {/* Abstract preview */}
        <p className="font-body text-sm text-on-surface-variant/50 leading-relaxed line-clamp-2">
          {pub.abstract}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5">
          {pub.keywords.slice(0, 4).map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-1 bg-surface-container-highest/40 rounded-md font-mono text-[10px] text-primary/50 uppercase tracking-wider border border-outline-variant/5"
            >
              {kw}
            </span>
          ))}
          {pub.keywords.length > 4 && (
            <span className="px-2.5 py-1 font-mono text-[10px] text-on-surface-variant/30">
              +{pub.keywords.length - 4}
            </span>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant/30">
              person
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant/40">
              {pub.authors.join(", ")}
            </span>
          </div>
          <span className="font-mono text-[10px] text-primary/40 group-hover:text-primary/70 transition-colors flex items-center gap-1">
            Read more
            <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Expanded Modal ── */
function PublicationModal({
  pub,
  onClose,
}: {
  pub: Publication;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal card */}
      <motion.div
        layoutId={`pub-card-${pub.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-surface-container-low/90 backdrop-blur-2xl rounded-2xl border border-outline-variant/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Top accent */}
        <div className="h-[2px] bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-surface-container-highest/50 hover:bg-surface-container-highest text-on-surface-variant/50 hover:text-on-surface transition-all z-20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="pr-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {pub.icon}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/15 font-mono text-[9px] text-primary uppercase tracking-widest">
                  Journal Article
                </span>
                <span className="font-mono text-[11px] text-on-surface-variant/40">
                  {pub.date}
                </span>
              </div>
            </div>
            <motion.h3
              layoutId={`pub-title-${pub.id}`}
              className="font-headline font-bold text-xl md:text-2xl text-on-surface tracking-tight leading-snug"
            >
              {pub.title}
            </motion.h3>
            <motion.p
              layoutId={`pub-journal-${pub.id}`}
              className="font-label text-base text-on-surface-variant/60 mt-2"
            >
              {pub.journal} &middot; {pub.volume}
            </motion.p>
            <p className="font-mono text-xs text-on-surface-variant/40 mt-2">
              Authors: {pub.authors.join(", ")}
            </p>
          </div>

          {/* Abstract */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Abstract
            </h4>
            <p className="font-body text-[15px] text-on-surface-variant/70 leading-[1.8]">
              {pub.abstract}
            </p>
          </div>

          {/* Key contributions */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Key Contributions
            </h4>
            <ul className="space-y-3">
              {pub.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 p-3 bg-surface-container-lowest/40 rounded-lg border border-outline-variant/5"
                >
                  <span className="material-symbols-outlined text-primary/50 text-[16px] mt-0.5 shrink-0">
                    neurology
                  </span>
                  <span className="font-body text-sm text-on-surface-variant/60 leading-relaxed">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {pub.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 bg-surface-container-highest/40 rounded-lg font-mono text-[11px] text-primary/70 uppercase tracking-wider border border-outline-variant/8"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Action link */}
          {pub.url && (
            <div className="pt-4 border-t border-outline-variant/8">
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-all duration-300 glow-button cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  open_in_new
                </span>
                <span className="font-label text-sm font-bold">
                  Read on Springer
                </span>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Publications Section ── */
export default function Publications() {
  const [selected, setSelected] = useState<Publication | null>(null);

  return (
    <section id="publications" className="relative py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-1/4 right-[-8%] w-[450px] h-[450px] bg-primary/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              cat ~/publications.bib
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
            Publications
          </h2>
          <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
            Peer-reviewed research contributions to the scientific community.
          </p>
        </motion.div>

        {/* Publication card */}
        <div className="max-w-3xl">
          <PublicationCard
            pub={publications[0]}
            onExpand={() => setSelected(publications[0])}
          />
        </div>
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <PublicationModal
            pub={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
