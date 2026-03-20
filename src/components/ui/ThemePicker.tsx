"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_HEX = "#adc6ff";

const PRESETS = [
  { hex: "#adc6ff", label: "Blue" },
  { hex: "#f4a0b6", label: "Rose" },
  { hex: "#8ee4af", label: "Mint" },
  { hex: "#f0c566", label: "Gold" },
  { hex: "#c4b5fd", label: "Lavender" },
  { hex: "#ffb088", label: "Peach" },
];

/* ── Color utilities ── */

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function derivePalette(hex: string): Record<string, string> {
  const [h, s, l] = hexToHsl(hex);
  const [r, g, b] = hexToRgb(hex);

  // Complementary warm accent — offset hue by ~150°
  const th = (h + 150) % 360;

  return {
    "--color-primary": hex,
    "--color-primary-container": hslToHex(
      h,
      Math.min(s + 20, 100),
      Math.max(l - 20, 35)
    ),
    "--color-on-primary": hslToHex(h, Math.min(s, 80), 15),
    "--color-on-primary-container": hslToHex(h, Math.min(s, 70), 12),
    "--color-primary-fixed": hslToHex(h, Math.max(s * 0.4, 15), 90),
    "--color-primary-fixed-dim": hex,
    "--color-inverse-primary": hslToHex(
      h,
      Math.min(s + 10, 95),
      Math.max(l - 35, 25)
    ),
    "--color-surface-tint": hex,
    "--primary-rgb": `${r}, ${g}, ${b}`,
    // Tertiary — derived complementary accent
    "--color-tertiary": hslToHex(th, Math.min(s + 10, 90), Math.min(l + 5, 78)),
    "--color-tertiary-container": hslToHex(
      th,
      Math.min(s + 20, 95),
      Math.max(l - 25, 35)
    ),
    "--color-on-tertiary": hslToHex(th, Math.min(s, 70), 15),
    "--color-on-tertiary-container": hslToHex(th, Math.min(s, 60), 12),
    "--color-tertiary-fixed": hslToHex(th, Math.max(s * 0.4, 15), 88),
    "--color-tertiary-fixed-dim": hslToHex(
      th,
      Math.min(s + 10, 90),
      Math.min(l + 5, 78)
    ),
  };
}

function applyPalette(palette: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

function clearPalette() {
  const root = document.documentElement;
  [
    "--color-primary",
    "--color-primary-container",
    "--color-on-primary",
    "--color-on-primary-container",
    "--color-primary-fixed",
    "--color-primary-fixed-dim",
    "--color-inverse-primary",
    "--color-surface-tint",
    "--primary-rgb",
    "--color-tertiary",
    "--color-tertiary-container",
    "--color-on-tertiary",
    "--color-on-tertiary-container",
    "--color-tertiary-fixed",
    "--color-tertiary-fixed-dim",
  ].forEach((k) => root.style.removeProperty(k));
}

/* ── Component ── */

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(DEFAULT_HEX);
  const [input, setInput] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme-primary");
      if (saved && /^#[0-9a-fA-F]{6}$/.test(saved)) {
        setHex(saved);
        applyPalette(derivePalette(saved));
      }
    } catch {
      /* noop */
    }
  }, []);

  const apply = useCallback((newHex: string) => {
    const clean = newHex.startsWith("#") ? newHex : `#${newHex}`;
    if (!/^#[0-9a-fA-F]{6}$/.test(clean)) return;
    setHex(clean);
    const palette = derivePalette(clean);
    applyPalette(palette);
    try {
      localStorage.setItem("theme-primary", clean);
      localStorage.setItem("theme-palette", JSON.stringify(palette));
    } catch {
      /* noop */
    }
  }, []);

  const reset = useCallback(() => {
    setHex(DEFAULT_HEX);
    setInput(DEFAULT_HEX);
    clearPalette();
    try {
      localStorage.removeItem("theme-primary");
      localStorage.removeItem("theme-palette");
    } catch {
      /* noop */
    }
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setInput(hex);
      setTimeout(() => inputRef.current?.select(), 120);
    }
  }, [open, hex]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-outline-variant/8 bg-surface-container-lowest/50 hover:border-primary/20 hover:bg-surface-container-high/40 transition-all duration-300 cursor-pointer group"
        aria-label="Change theme accent color"
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-white/10 shrink-0 transition-colors duration-300"
          style={{ backgroundColor: hex }}
        />
        <span className="material-symbols-outlined text-[13px] text-on-surface-variant/30 group-hover:text-on-surface-variant/60 transition-colors">
          palette
        </span>
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-[230px] bg-surface-container-high/95 backdrop-blur-xl rounded-xl border border-outline-variant/12 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
          >
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-outline-variant/8 bg-surface-container-highest/30">
              <span className="w-1.5 h-1.5 rounded-full bg-error/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/40" />
              <span className="ml-1.5 font-mono text-[8px] text-on-surface-variant/25 tracking-wider">
                theme://accent
              </span>
            </div>

            <div className="p-3.5 space-y-3.5">
              {/* Hex input */}
              <form onSubmit={(e) => { e.preventDefault(); apply(input); }}>
                <label className="font-mono text-[9px] text-on-surface-variant/30 tracking-wider uppercase block mb-1.5">
                  $ set-primary
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container-lowest/60 rounded-lg border border-outline-variant/8 focus-within:border-primary/25 transition-colors">
                    <span className="font-mono text-[11px] text-on-surface-variant/30 select-none">
                      #
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      maxLength={6}
                      value={input.replace("#", "")}
                      onChange={(e) => {
                        const v = e.target.value
                          .replace(/[^0-9a-fA-F]/g, "")
                          .slice(0, 6);
                        setInput(`#${v}`);
                        if (v.length === 6) apply(`#${v}`);
                      }}
                      className="bg-transparent font-mono text-[12px] text-on-surface/80 tracking-wider w-full outline-none placeholder:text-on-surface-variant/20"
                      placeholder="adc6ff"
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                  {/* Live color swatch */}
                  <div
                    className="w-7 h-7 rounded-lg border border-outline-variant/10 shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: hex }}
                  />
                </div>
              </form>

              {/* Presets */}
              <div>
                <span className="font-mono text-[8px] text-on-surface-variant/25 tracking-wider uppercase block mb-2">
                  Presets
                </span>
                <div className="flex items-center gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() => {
                        apply(preset.hex);
                        setInput(preset.hex);
                      }}
                      title={preset.label}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
                        hex.toLowerCase() === preset.hex.toLowerCase()
                          ? "border-on-surface/50 scale-110"
                          : "border-outline-variant/15 hover:border-outline-variant/30"
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Reset button — only when not on default */}
              {hex.toLowerCase() !== DEFAULT_HEX.toLowerCase() && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 font-mono text-[9px] text-on-surface-variant/30 hover:text-on-surface-variant/60 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[12px]">
                    undo
                  </span>
                  Reset to default
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
