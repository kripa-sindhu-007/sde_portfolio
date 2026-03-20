"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MenuItem {
  label: string;
  icon: string;
  hint: string;
  action: () => void;
}

export default function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const items: MenuItem[] = [
    {
      label: "View Source",
      icon: "code",
      hint: "GitHub",
      action: () =>
        window.open("https://github.com/kripa-sindhu-007", "_blank"),
    },
    {
      label: "Copy Email",
      icon: "content_copy",
      hint: "clipboard",
      action: () => {
        navigator.clipboard.writeText("sindhukripa007@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      label: "Download Resume",
      icon: "download",
      hint: "PDF",
      action: () => window.open("/Kripa_Sindhu_SDE1.pdf", "_blank"),
    },
    {
      label: "Report Bug",
      icon: "bug_report",
      hint: "mailto",
      action: () =>
        window.open(
          "mailto:sindhukripa007@gmail.com?subject=Portfolio%20Bug%20Report",
          "_blank"
        ),
    },
  ];

  const handleContext = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const menuW = 220;
    const menuH = 230;
    const x = Math.min(e.clientX, window.innerWidth - menuW - 12);
    const y = Math.min(e.clientY, window.innerHeight - menuH - 12);
    setPos({ x, y });
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContext);
    return () => document.removeEventListener("contextmenu", handleContext);
  }, [handleContext]);

  // Close on click outside, scroll, or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("click", close);
    document.addEventListener("scroll", close, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("scroll", close, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(2px)" }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ left: pos.x, top: pos.y }}
          className="fixed z-[9999] w-[220px] bg-surface-container-high/95 backdrop-blur-xl rounded-xl border border-outline-variant/12 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Terminal chrome header */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-outline-variant/8 bg-surface-container-highest/30">
            <span className="w-1.5 h-1.5 rounded-full bg-error/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/40" />
            <span className="ml-1.5 font-mono text-[8px] text-on-surface-variant/25 tracking-wider">
              context://menu
            </span>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {items.map((item, i) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  if (item.label !== "Copy Email") close();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 hover:bg-primary/[0.06] transition-colors duration-150 cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[15px] text-on-surface-variant/35 group-hover:text-primary/70 transition-colors">
                  {item.label === "Copy Email" && copied
                    ? "check"
                    : item.icon}
                </span>
                <span className="font-label text-[12px] text-on-surface-variant/70 group-hover:text-on-surface transition-colors flex-1 text-left">
                  {item.label === "Copy Email" && copied
                    ? "Copied!"
                    : item.label}
                </span>
                <span className="font-mono text-[8px] text-on-surface-variant/20 tracking-wider uppercase group-hover:text-primary/30 transition-colors">
                  {item.hint}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3.5 py-2 border-t border-outline-variant/6">
            <span className="font-mono text-[8px] text-on-surface-variant/20 tracking-wider">
              ENGINEER_ATELIER v2.0.4
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
