"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import ThemePicker from "@/components/ui/ThemePicker";
import { RESUME_URL } from "@/lib/resume";

// Order mirrors the section order in app/page.tsx. The scroll spy walks this
// array against each section's offsetTop, so the two must stay in step.
const navLinks = [
  { label: "Projects", href: "#projects", icon: "folder_special" },
  { label: "Writing", href: "#writing", icon: "article" },
  { label: "Experience", href: "#experience", icon: "work_history" },
  { label: "Publications", href: "#publications", icon: "menu_book" },
  { label: "Skills", href: "#skills", icon: "code" },
  { label: "Achievements", href: "#achievements", icon: "emoji_events" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

function LiveClock() {
  const [time, setTime] = useState("");
  const [tz, setTz] = useState("");

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(zone.split("/").pop()?.replace(/_/g, " ") ?? zone);

    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] tracking-[0.05em] text-on-surface-variant/60 tabular-nums">
      {time} <span className="text-on-surface-variant/35">{tz}</span>
    </span>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll spy ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const sections = navLinks
      .map((l) => ({
        id: l.href.slice(1),
        el: document.getElementById(l.href.slice(1)),
      }))
      .filter((s) => s.el);

    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i].el!;
      if (el.offsetTop <= scrollPos) {
        setActiveSection(`#${sections[i].id}`);
        return;
      }
    }
    setActiveSection("");
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-container-lowest/70 backdrop-blur-2xl border-b border-outline-variant/10 shadow-[0_1px_40px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-8 h-16 w-full max-w-[1800px] mx-auto">
          {/* ── Left: Logo ── */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="group flex items-center gap-2.5 shrink-0 cursor-pointer">
            <div className="relative w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
              <span className="font-display text-[11px] font-black text-primary tracking-tighter">
                KS
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-sm font-bold tracking-[-0.03em] text-on-surface/90 leading-none">
                Kripa Sindhu
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant/35 tracking-[0.08em] uppercase leading-none mt-0.5">
                Software Engineer
              </span>
            </div>
          </a>

          {/* ── Center: Nav links (desktop) ── */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-0.5 px-1.5 py-1 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/6">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                    onClick={() => setActiveSection(link.href)}
                    className={`relative px-3.5 py-1.5 font-label text-[10px] uppercase tracking-[0.08em] transition-all duration-300 rounded-md ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant/40 hover:text-on-surface/70"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/8 rounded-md border border-primary/12"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </nav>

          {/* ── Right: Status + Resume + Mobile toggle ── */}
          <div className="flex items-center gap-2.5">
            {/* System status pill */}
            <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/6">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.06em] text-green-400/70 uppercase">
                  Online
                </span>
              </div>
              <div className="w-[1px] h-3 bg-outline-variant/12" />
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px] text-on-surface-variant/30">
                  schedule
                </span>
                <LiveClock />
              </div>
            </div>

            {/* Theme picker */}
            <div className="hidden sm:block">
              <ThemePicker />
            </div>

            {/* Writing — the blog is a primary destination, not a section */}
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 hover:bg-primary/15 border border-primary/15 hover:border-primary/30 rounded-lg transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-[14px] text-primary/60 group-hover:text-primary transition-colors duration-300">
                article
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.08em] text-primary/70 group-hover:text-primary transition-colors duration-300">
                Writing
              </span>
            </Link>

            {/* Resume button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 hover:bg-primary/15 border border-primary/15 hover:border-primary/30 rounded-lg transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-[14px] text-primary/60 group-hover:text-primary transition-colors duration-300">
                description
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.08em] text-primary/70 group-hover:text-primary transition-colors duration-300">
                Resume
              </span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-lg border border-outline-variant/10 bg-surface-container-lowest/50 hover:bg-surface-container-high/50 transition-all duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center gap-[5px] w-4">
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 7, width: 18 }
                      : { rotate: 0, y: 0, width: 16 }
                  }
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-on-surface-variant/60 rounded-full origin-center"
                  style={{ width: 16 }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block h-[1.5px] w-3 bg-on-surface-variant/40 rounded-full"
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -7, width: 18 }
                      : { rotate: 0, y: 0, width: 10 }
                  }
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-on-surface-variant/60 rounded-full origin-center"
                  style={{ width: 10 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col pt-24 px-8"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-outline-variant/10">
                <span className="w-2 h-2 rounded-full bg-error/40" />
                <span className="w-2 h-2 rounded-full bg-tertiary/40" />
                <span className="w-2 h-2 rounded-full bg-green-400/40" />
                <span className="ml-3 font-mono text-[10px] text-on-surface-variant/30 tracking-wider">
                  navigation.sh
                </span>
              </div>

              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-4 py-4 border-b border-outline-variant/6 transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant/50 hover:text-on-surface/80"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-on-surface-variant/20 w-6 tabular-nums">
                      0{i + 1}
                    </span>
                    <span
                      className={`material-symbols-outlined text-lg ${
                        isActive
                          ? "text-primary/70"
                          : "text-on-surface-variant/25 group-hover:text-on-surface-variant/50"
                      } transition-colors duration-300`}
                    >
                      {link.icon}
                    </span>
                    <span className="font-headline text-xl font-bold tracking-tight">
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </motion.a>
                );
              })}

              {/* Writing link in mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + navLinks.length * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-4 border-b border-outline-variant/6 text-on-surface-variant/50 hover:text-primary transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] text-on-surface-variant/20 w-6 tabular-nums">
                    /
                  </span>
                  <span className="material-symbols-outlined text-[18px]">article</span>
                  <span className="font-headline text-lg">Writing</span>
                </Link>
              </motion.div>

              {/* Resume link in mobile */}
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + navLinks.length * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4 py-4 border-b border-outline-variant/6 text-on-surface-variant/50 hover:text-primary transition-colors duration-300"
              >
                <span className="font-mono text-[10px] text-on-surface-variant/20 w-6 tabular-nums">
                  0{navLinks.length + 1}
                </span>
                <span className="material-symbols-outlined text-lg text-on-surface-variant/25">
                  description
                </span>
                <span className="font-headline text-xl font-bold tracking-tight">
                  Resume
                </span>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/20 ml-auto">
                  open_in_new
                </span>
              </motion.a>

              {/* Theme picker (mobile) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + (navLinks.length + 1) * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4 py-4 border-b border-outline-variant/6"
              >
                <span className="font-mono text-[10px] text-on-surface-variant/20 w-6 tabular-nums">
                  0{navLinks.length + 2}
                </span>
                <span className="material-symbols-outlined text-lg text-on-surface-variant/25">
                  palette
                </span>
                <span className="font-headline text-xl font-bold tracking-tight text-on-surface-variant/50">
                  Theme
                </span>
                <div className="ml-auto">
                  <ThemePicker />
                </div>
              </motion.div>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center gap-3"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant/30 tracking-wider">
                  Available for opportunities
                </span>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
