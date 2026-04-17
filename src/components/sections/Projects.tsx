"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Project } from "@/data/projects";

/* Theme-aware color helpers for SVGs */
const pc = (pct: number) => `color-mix(in srgb, var(--color-primary) ${pct}%, transparent)`;
const tc = (pct: number) => `color-mix(in srgb, var(--color-tertiary) ${pct}%, transparent)`;

/* ── Project Illustrations ── */
function ProjectIllustration({ id }: { id: string }) {
  switch (id) {
    /* ── Feature Flag: branching decision flow ── */
    case "feature-flag-system":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* SDK node */}
          <rect x="30" y="50" width="60" height="32" rx="6" strokeWidth="1" style={{ stroke: pc(30), fill: pc(4) }} />
          <text x="60" y="70" textAnchor="middle" className="fill-primary/50 text-[9px]" fontFamily="monospace">SDK</text>
          {/* Arrow to engine */}
          <line x1="90" y1="66" x2="135" y2="66" strokeWidth="1" strokeDasharray="4 3" style={{ stroke: pc(20) }} />
          <polygon points="133,62 140,66 133,70" style={{ fill: pc(25) }} />
          {/* Flag Engine node */}
          <rect x="140" y="44" width="90" height="44" rx="8" strokeWidth="1.2" style={{ stroke: pc(40), fill: pc(6) }} />
          <text x="185" y="62" textAnchor="middle" className="fill-primary/40 text-[8px]" fontFamily="monospace">FLAG</text>
          <text x="185" y="76" textAnchor="middle" className="fill-primary/60 text-[10px]" fontFamily="monospace" fontWeight="600">Engine</text>
          {/* Branch to Enabled */}
          <line x1="230" y1="56" x2="278" y2="36" stroke="rgba(74,222,128,0.35)" strokeWidth="1" />
          <polygon points="275,31 282,35 276,40" fill="rgba(74,222,128,0.4)" />
          {/* Enabled node */}
          <rect x="282" y="20" width="68" height="30" rx="6" stroke="rgba(74,222,128,0.35)" strokeWidth="1" fill="rgba(74,222,128,0.06)" />
          <circle cx="296" cy="35" r="3" fill="rgba(74,222,128,0.6)" />
          <text x="322" y="39" textAnchor="middle" className="fill-green-400/60 text-[9px]" fontFamily="monospace">ON</text>
          {/* Branch to Disabled */}
          <line x1="230" y1="76" x2="278" y2="96" strokeWidth="1" style={{ stroke: tc(30) }} />
          <polygon points="275,92 282,96 276,101" style={{ fill: tc(35) }} />
          {/* Disabled node */}
          <rect x="282" y="82" width="68" height="30" rx="6" strokeWidth="1" style={{ stroke: tc(25), fill: tc(4) }} />
          <circle cx="296" cy="97" r="3" style={{ fill: tc(40) }} />
          <text x="322" y="101" textAnchor="middle" className="fill-tertiary/40 text-[9px]" fontFamily="monospace">OFF</text>
          {/* Rollout bar */}
          <text x="30" y="120" className="fill-primary/25 text-[8px]" fontFamily="monospace">rollout</text>
          <rect x="75" y="114" width="120" height="6" rx="3" strokeWidth="0.5" style={{ fill: pc(6), stroke: pc(10) }} />
          <rect x="75" y="114" width="88" height="6" rx="3" style={{ fill: pc(15) }} />
          <text x="200" y="120" className="fill-primary/35 text-[8px]" fontFamily="monospace">73%</text>
        </svg>
      );

    /* ── Task Queue: priority pipeline ── */
    case "task-queue-dashboard":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* Queue label */}
          <text x="42" y="18" textAnchor="middle" className="fill-primary/25 text-[8px]" fontFamily="monospace">QUEUE</text>
          {/* Priority tasks */}
          <rect x="20" y="26" width="44" height="20" rx="4" strokeWidth="1" style={{ fill: tc(12), stroke: tc(30) }} />
          <text x="42" y="40" textAnchor="middle" className="fill-tertiary/60 text-[9px]" fontFamily="monospace" fontWeight="600">HIGH</text>
          <rect x="20" y="52" width="44" height="20" rx="4" strokeWidth="1" style={{ fill: pc(8), stroke: pc(25) }} />
          <text x="42" y="66" textAnchor="middle" className="fill-primary/50 text-[9px]" fontFamily="monospace">MED</text>
          <rect x="20" y="78" width="44" height="20" rx="4" strokeWidth="1" style={{ fill: pc(4), stroke: pc(12) }} />
          <text x="42" y="92" textAnchor="middle" className="fill-primary/25 text-[9px]" fontFamily="monospace">LOW</text>
          {/* Arrows to workers */}
          <line x1="70" y1="55" x2="115" y2="55" strokeWidth="1" strokeDasharray="4 3" style={{ stroke: pc(15) }} />
          <polygon points="113,51 120,55 113,59" style={{ fill: pc(20) }} />
          {/* Worker pool */}
          <text x="170" y="18" textAnchor="middle" className="fill-primary/25 text-[8px]" fontFamily="monospace">WORKERS</text>
          <rect x="125" y="26" width="90" height="76" rx="8" strokeWidth="1" strokeDasharray="4 4" style={{ stroke: pc(15), fill: pc(2) }} />
          {/* Worker nodes */}
          {[
            [150, 46], [184, 46], [150, 72], [184, 72],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="10" strokeWidth="1" style={{ fill: pc(6), stroke: pc(20) }} />
              <circle cx={cx} cy={cy} r="3" fill={i < 3 ? "rgba(74,222,128,0.5)" : undefined} style={i >= 3 ? { fill: pc(15) } : undefined} />
            </g>
          ))}
          {/* Arrow to output */}
          <line x1="220" y1="55" x2="255" y2="55" strokeWidth="1" strokeDasharray="4 3" style={{ stroke: pc(15) }} />
          <polygon points="253,51 260,55 253,59" style={{ fill: pc(20) }} />
          {/* Output */}
          <text x="305" y="18" textAnchor="middle" className="fill-primary/25 text-[8px]" fontFamily="monospace">OUTPUT</text>
          {/* Completed tasks */}
          {[32, 52, 72, 92].map((y, i) => (
            <g key={i}>
              <rect x="270" y={y} width="70" height="14" rx="3" strokeWidth="0.5" fill={i < 3 ? "rgba(74,222,128,0.06)" : undefined} stroke={i < 3 ? "rgba(74,222,128,0.15)" : undefined} style={i >= 3 ? { fill: pc(3), stroke: pc(8) } : undefined} />
              {i < 3 && <text x="290" y={y + 10} className="fill-green-400/40 text-[7px]" fontFamily="monospace">done</text>}
              {i === 3 && <text x="290" y={y + 10} className="fill-primary/20 text-[7px]" fontFamily="monospace">retry</text>}
            </g>
          ))}
          {/* Backoff label */}
          <text x="30" y="118" className="fill-primary/20 text-[8px]" fontFamily="monospace">backoff: 2^n</text>
          <text x="130" y="118" className="fill-primary/20 text-[8px]" fontFamily="monospace">pool: 4</text>
          <text x="270" y="118" className="fill-green-400/25 text-[8px]" fontFamily="monospace">processed: 847</text>
        </svg>
      );

    /* ── AI Travel Planner: route with waypoints ── */
    case "ai-travel-planner":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* Route path (curved) */}
          <path
            d="M 50 80 C 90 30, 130 30, 155 55 S 210 90, 250 50 S 310 20, 340 60"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            fill="none"
            style={{ stroke: pc(15) }}
          />
          {/* Waypoint 1 - Start */}
          <circle cx="50" cy="80" r="12" strokeWidth="1" style={{ fill: pc(6), stroke: pc(30) }} />
          <circle cx="50" cy="80" r="4" style={{ fill: pc(50) }} />
          <text x="50" y="104" textAnchor="middle" className="fill-primary/40 text-[8px]" fontFamily="monospace">Delhi</text>
          <text x="50" y="114" textAnchor="middle" className="fill-primary/20 text-[7px]" fontFamily="monospace">Day 1</text>
          {/* Waypoint 2 */}
          <circle cx="155" cy="55" r="10" strokeWidth="1" style={{ fill: tc(6), stroke: tc(30) }} />
          <circle cx="155" cy="55" r="3.5" style={{ fill: tc(50) }} />
          <text x="155" y="78" textAnchor="middle" className="fill-tertiary/40 text-[8px]" fontFamily="monospace">Tokyo</text>
          <text x="155" y="88" textAnchor="middle" className="fill-tertiary/20 text-[7px]" fontFamily="monospace">Day 3</text>
          {/* Waypoint 3 */}
          <circle cx="250" cy="50" r="10" strokeWidth="1" style={{ fill: pc(6), stroke: pc(25) }} />
          <circle cx="250" cy="50" r="3.5" style={{ fill: pc(40) }} />
          <text x="250" y="73" textAnchor="middle" className="fill-primary/35 text-[8px]" fontFamily="monospace">Kyoto</text>
          <text x="250" y="83" textAnchor="middle" className="fill-primary/20 text-[7px]" fontFamily="monospace">Day 4</text>
          {/* Waypoint 4 - Destination */}
          <circle cx="340" cy="60" r="14" fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.3)" strokeWidth="1.2" />
          <circle cx="340" cy="60" r="5" fill="rgba(74,222,128,0.5)" />
          <circle cx="340" cy="60" r="8" fill="none" stroke="rgba(74,222,128,0.15)" strokeWidth="0.8" />
          <text x="340" y="86" textAnchor="middle" className="fill-green-400/40 text-[8px]" fontFamily="monospace">Osaka</text>
          <text x="340" y="96" textAnchor="middle" className="fill-green-400/25 text-[7px]" fontFamily="monospace">Day 5</text>
          {/* Budget indicator */}
          <text x="20" y="130" className="fill-primary/20 text-[8px]" fontFamily="monospace">budget: $$</text>
          <text x="120" y="130" className="fill-primary/20 text-[8px]" fontFamily="monospace">travelers: 2</text>
          <text x="250" y="130" className="fill-tertiary/25 text-[8px]" fontFamily="monospace">AI-optimized route</text>
        </svg>
      );

    /* ── EV Routing: green-zone aware route with charging ── */
    case "ev-routing-green-v2g":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* Green-zone patches */}
          <rect x="80" y="24" width="70" height="36" rx="8" fill="rgba(74,222,128,0.05)" stroke="rgba(74,222,128,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="115" y="44" textAnchor="middle" className="fill-green-400/40 text-[7px]" fontFamily="monospace">GREEN ZONE</text>
          <rect x="220" y="70" width="80" height="34" rx="8" fill="rgba(74,222,128,0.05)" stroke="rgba(74,222,128,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="260" y="90" textAnchor="middle" className="fill-green-400/40 text-[7px]" fontFamily="monospace">GREEN ZONE</text>
          {/* Route path (curved, biased through green zones) */}
          <path
            d="M 30 80 C 70 60, 100 38, 145 42 S 210 70, 260 86 S 320 60, 350 50"
            strokeWidth="1.6"
            strokeDasharray="5 3"
            fill="none"
            style={{ stroke: pc(25) }}
          />
          {/* Start */}
          <circle cx="30" cy="80" r="6" strokeWidth="1" style={{ fill: pc(6), stroke: pc(35) }} />
          <circle cx="30" cy="80" r="2.5" style={{ fill: pc(50) }} />
          <text x="30" y="98" textAnchor="middle" className="fill-primary/40 text-[7px]" fontFamily="monospace">START</text>
          {/* Charging station 1 (mid-route) */}
          <rect x="138" y="36" width="14" height="14" rx="2" strokeWidth="0.8" style={{ stroke: tc(35), fill: tc(10) }} />
          <text x="145" y="46" textAnchor="middle" className="fill-tertiary/60 text-[8px]" fontFamily="monospace" fontWeight="700">⚡</text>
          <text x="145" y="60" textAnchor="middle" className="fill-tertiary/40 text-[6px]" fontFamily="monospace">V2G</text>
          {/* Charging station 2 */}
          <rect x="253" y="80" width="14" height="14" rx="2" strokeWidth="0.8" style={{ stroke: tc(35), fill: tc(10) }} />
          <text x="260" y="90" textAnchor="middle" className="fill-tertiary/60 text-[8px]" fontFamily="monospace" fontWeight="700">⚡</text>
          {/* Destination */}
          <circle cx="350" cy="50" r="8" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.35)" strokeWidth="1.2" />
          <circle cx="350" cy="50" r="3" fill="rgba(74,222,128,0.6)" />
          <text x="350" y="34" textAnchor="middle" className="fill-green-400/45 text-[7px]" fontFamily="monospace">END</text>
          {/* Battery indicator */}
          <rect x="20" y="118" width="50" height="7" rx="1.5" strokeWidth="0.7" style={{ stroke: pc(20), fill: pc(4) }} />
          <rect x="70" y="120.5" width="2" height="2" style={{ fill: pc(20) }} />
          <rect x="22" y="120" width="32" height="3" style={{ fill: "rgba(74,222,128,0.45)" }} />
          <text x="80" y="125" className="fill-primary/30 text-[8px]" fontFamily="monospace">SOC 68%</text>
          {/* Algo label */}
          <text x="170" y="125" className="fill-primary/25 text-[8px]" fontFamily="monospace">ACO + V2G bias</text>
          <text x="290" y="125" className="fill-green-400/30 text-[8px]" fontFamily="monospace">eco-optimal</text>
        </svg>
      );

    /* ── 404-UI: framework adapters from one npm package ── */
    case "404-lib":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* npm pill */}
          <rect x="20" y="14" width="46" height="14" rx="3" strokeWidth="0.8" style={{ stroke: tc(30), fill: tc(8) }} />
          <text x="43" y="24" textAnchor="middle" className="fill-tertiary/70 text-[8px]" fontFamily="monospace" fontWeight="700">npm</text>
          <text x="72" y="24" className="fill-primary/40 text-[8px]" fontFamily="monospace">@kripa006/404-ui</text>
          {/* Central 404 block */}
          <rect x="30" y="42" width="110" height="74" rx="10" strokeWidth="1.2" style={{ stroke: pc(35), fill: pc(5) }} />
          <text x="85" y="82" textAnchor="middle" className="fill-primary/60 text-[32px]" fontFamily="monospace" fontWeight="800">404</text>
          <text x="85" y="100" textAnchor="middle" className="fill-primary/30 text-[7px]" fontFamily="monospace">not found</text>
          <text x="85" y="110" textAnchor="middle" className="fill-primary/25 text-[7px]" fontFamily="monospace">animated</text>
          {/* Branching arrows to frameworks */}
          <line x1="140" y1="60" x2="200" y2="52" strokeWidth="1" strokeDasharray="3 2" style={{ stroke: pc(20) }} />
          <polygon points="198,48 205,52 198,56" style={{ fill: pc(25) }} />
          <line x1="140" y1="80" x2="200" y2="80" strokeWidth="1" strokeDasharray="3 2" style={{ stroke: pc(20) }} />
          <polygon points="198,76 205,80 198,84" style={{ fill: pc(25) }} />
          <line x1="140" y1="100" x2="200" y2="108" strokeWidth="1" strokeDasharray="3 2" style={{ stroke: pc(20) }} />
          <polygon points="198,104 205,108 198,112" style={{ fill: pc(25) }} />
          {/* React adapter */}
          <rect x="208" y="40" width="86" height="20" rx="4" strokeWidth="0.8" style={{ stroke: pc(30), fill: pc(6) }} />
          <circle cx="220" cy="50" r="4" fill="none" strokeWidth="0.8" style={{ stroke: pc(55) }} />
          <circle cx="220" cy="50" r="1.2" style={{ fill: pc(60) }} />
          <text x="232" y="54" className="fill-primary/55 text-[9px]" fontFamily="monospace" fontWeight="600">react</text>
          {/* Vue adapter */}
          <rect x="208" y="68" width="86" height="20" rx="4" strokeWidth="0.8" style={{ stroke: "rgba(74,222,128,0.3)", fill: "rgba(74,222,128,0.05)" }} />
          <polygon points="214,72 226,72 220,84" style={{ fill: "rgba(74,222,128,0.45)" }} />
          <text x="234" y="82" className="fill-green-400/55 text-[9px]" fontFamily="monospace" fontWeight="600">vue</text>
          {/* Vanilla JS adapter */}
          <rect x="208" y="96" width="86" height="20" rx="4" strokeWidth="0.8" style={{ stroke: tc(30), fill: tc(6) }} />
          <rect x="215" y="101" width="10" height="10" rx="1.5" style={{ fill: tc(40) }} />
          <text x="221" y="110" textAnchor="middle" className="fill-tertiary/80 text-[7px]" fontFamily="monospace" fontWeight="800">JS</text>
          <text x="234" y="110" className="fill-tertiary/55 text-[9px]" fontFamily="monospace" fontWeight="600">vanilla</text>
          {/* Build label */}
          <text x="308" y="80" className="fill-primary/20 text-[7px]" fontFamily="monospace">tree-</text>
          <text x="308" y="90" className="fill-primary/20 text-[7px]" fontFamily="monospace">shakable</text>
          <circle cx="340" cy="86" r="10" strokeWidth="0.8" style={{ stroke: pc(20), fill: pc(3) }} />
          <text x="340" y="89" textAnchor="middle" className="fill-primary/50 text-[9px]" fontFamily="monospace" fontWeight="700">TS</text>
        </svg>
      );

    /* ── Environment Manager: reservation grid ── */
    case "env-allocation":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* Section labels */}
          <text x="28" y="18" className="fill-primary/30 text-[8px]" fontFamily="monospace">BACKEND</text>
          <text x="180" y="18" className="fill-primary/30 text-[8px]" fontFamily="monospace">FRONTEND</text>
          <text x="320" y="18" className="fill-primary/30 text-[8px]" fontFamily="monospace">QA</text>
          {/* Environment cells — left column (backend) */}
          {[
            { x: 20, y: 26, label: "be-01", status: "free" },
            { x: 20, y: 52, label: "be-02", status: "reserved" },
            { x: 20, y: 78, label: "be-03", status: "stale" },
            { x: 20, y: 104, label: "be-04", status: "free" },
          ].map((c, i) => {
            const colors =
              c.status === "free"
                ? { stroke: "rgba(74,222,128,0.35)", fill: "rgba(74,222,128,0.07)", text: "fill-green-400/60" }
                : c.status === "reserved"
                ? { stroke: tc(30), fill: tc(8), text: "fill-tertiary/60" }
                : { stroke: pc(15), fill: pc(3), text: "fill-primary/25" };
            return (
              <g key={`be-${i}`}>
                <rect x={c.x} y={c.y} width="120" height="18" rx="3" strokeWidth="0.8" stroke={colors.stroke} fill={colors.fill} />
                <circle cx={c.x + 8} cy={c.y + 9} r="2" fill={colors.stroke} />
                <text x={c.x + 18} y={c.y + 12} className={`${colors.text} text-[8px]`} fontFamily="monospace" fontWeight="600">{c.label}</text>
                <text x={c.x + 112} y={c.y + 12} textAnchor="end" className={`${colors.text} text-[7px]`} fontFamily="monospace">{c.status.toUpperCase()}</text>
              </g>
            );
          })}
          {/* Environment cells — middle column (frontend) */}
          {[
            { x: 150, y: 26, label: "fe-01", status: "reserved" },
            { x: 150, y: 52, label: "fe-02", status: "free" },
            { x: 150, y: 78, label: "fe-03", status: "reserved" },
            { x: 150, y: 104, label: "fe-04", status: "free" },
          ].map((c, i) => {
            const colors =
              c.status === "free"
                ? { stroke: "rgba(74,222,128,0.35)", fill: "rgba(74,222,128,0.07)", text: "fill-green-400/60" }
                : { stroke: tc(30), fill: tc(8), text: "fill-tertiary/60" };
            return (
              <g key={`fe-${i}`}>
                <rect x={c.x} y={c.y} width="120" height="18" rx="3" strokeWidth="0.8" stroke={colors.stroke} fill={colors.fill} />
                <circle cx={c.x + 8} cy={c.y + 9} r="2" fill={colors.stroke} />
                <text x={c.x + 18} y={c.y + 12} className={`${colors.text} text-[8px]`} fontFamily="monospace" fontWeight="600">{c.label}</text>
                <text x={c.x + 112} y={c.y + 12} textAnchor="end" className={`${colors.text} text-[7px]`} fontFamily="monospace">{c.status.toUpperCase()}</text>
              </g>
            );
          })}
          {/* QA notification panel */}
          <rect x="285" y="26" width="80" height="96" rx="6" strokeWidth="0.8" style={{ stroke: pc(15), fill: pc(3) }} />
          <circle cx="325" cy="42" r="7" strokeWidth="0.8" style={{ stroke: tc(35), fill: tc(10) }} />
          <path d="M 322 40 L 322 45 L 328 45" fill="none" strokeWidth="0.8" style={{ stroke: tc(50) }} />
          <circle cx="330" cy="38" r="2.5" fill="rgba(239,68,68,0.7)" />
          <text x="327" y="39" textAnchor="middle" className="fill-white/80 text-[5px]" fontFamily="monospace" fontWeight="700">3</text>
          <text x="325" y="62" textAnchor="middle" className="fill-tertiary/40 text-[7px]" fontFamily="monospace">NOTIFY</text>
          {/* notification rows */}
          <rect x="293" y="70" width="64" height="10" rx="1.5" style={{ fill: tc(6) }} />
          <rect x="293" y="82" width="64" height="10" rx="1.5" style={{ fill: pc(4) }} />
          <rect x="293" y="94" width="64" height="10" rx="1.5" style={{ fill: pc(4) }} />
          <text x="325" y="118" textAnchor="middle" className="fill-primary/25 text-[7px]" fontFamily="monospace">activity</text>
        </svg>
      );

    /* ── Browser Volume Control: tab gain pipeline ── */
    case "browser-volume-control":
      return (
        <svg viewBox="0 0 380 140" fill="none" className="w-full h-full">
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 22}
                cy={10 + row * 18}
                r="0.5"
                style={{ fill: pc(8) }}
              />
            ))
          )}
          {/* Browser tab strip */}
          <rect x="20" y="14" width="200" height="14" rx="2" strokeWidth="0.8" style={{ stroke: pc(15), fill: pc(3) }} />
          <rect x="24" y="17" width="54" height="8" rx="1" style={{ fill: pc(15) }} />
          <text x="51" y="23.5" textAnchor="middle" className="fill-primary/70 text-[6px]" fontFamily="monospace" fontWeight="600">youtube</text>
          <rect x="82" y="17" width="46" height="8" rx="1" style={{ fill: pc(5) }} />
          <text x="105" y="23.5" textAnchor="middle" className="fill-primary/35 text-[6px]" fontFamily="monospace">spotify</text>
          <rect x="132" y="17" width="42" height="8" rx="1" style={{ fill: pc(5) }} />
          <text x="153" y="23.5" textAnchor="middle" className="fill-primary/35 text-[6px]" fontFamily="monospace">docs</text>
          {/* Audio source */}
          <rect x="20" y="40" width="70" height="40" rx="6" strokeWidth="1" style={{ stroke: pc(25), fill: pc(5) }} />
          <text x="55" y="54" textAnchor="middle" className="fill-primary/35 text-[7px]" fontFamily="monospace">AUDIO SRC</text>
          {/* Tiny input waveform */}
          <path d="M 28 68 Q 33 58 38 68 T 48 68 T 58 68 T 68 68 T 78 68" strokeWidth="1" fill="none" style={{ stroke: pc(40) }} />
          {/* Arrow to gain */}
          <line x1="92" y1="60" x2="118" y2="60" strokeWidth="1" strokeDasharray="3 2" style={{ stroke: pc(20) }} />
          <polygon points="116,56 123,60 116,64" style={{ fill: pc(25) }} />
          {/* Gain node */}
          <circle cx="155" cy="60" r="26" strokeWidth="1.2" style={{ stroke: tc(40), fill: tc(6) }} />
          <text x="155" y="56" textAnchor="middle" className="fill-tertiary/70 text-[8px]" fontFamily="monospace" fontWeight="700">GAIN</text>
          <text x="155" y="68" textAnchor="middle" className="fill-tertiary/50 text-[7px]" fontFamily="monospace">0.50</text>
          {/* Arrow to output */}
          <line x1="182" y1="60" x2="210" y2="60" strokeWidth="1" strokeDasharray="3 2" style={{ stroke: pc(20) }} />
          <polygon points="208,56 215,60 208,64" style={{ fill: pc(25) }} />
          {/* Output destination */}
          <rect x="220" y="40" width="76" height="40" rx="6" strokeWidth="1" stroke="rgba(74,222,128,0.3)" fill="rgba(74,222,128,0.05)" />
          <text x="258" y="54" textAnchor="middle" className="fill-green-400/50 text-[7px]" fontFamily="monospace">OUTPUT</text>
          {/* Smaller output waveform */}
          <path d="M 228 68 Q 232 63 236 68 T 244 68 T 252 68 T 260 68 T 268 68 T 276 68 T 284 68 T 292 68" strokeWidth="1" fill="none" stroke="rgba(74,222,128,0.45)" />
          {/* Volume slider */}
          <rect x="20" y="96" width="200" height="4" rx="2" style={{ fill: pc(6) }} />
          <rect x="20" y="96" width="100" height="4" rx="2" style={{ fill: tc(45) }} />
          <circle cx="120" cy="98" r="5" strokeWidth="1" style={{ stroke: tc(50), fill: pc(4) }} />
          <text x="20" y="116" className="fill-primary/30 text-[8px]" fontFamily="monospace">0%</text>
          <text x="120" y="116" textAnchor="middle" className="fill-tertiary/50 text-[8px]" fontFamily="monospace" fontWeight="600">50%</text>
          <text x="220" y="116" textAnchor="end" className="fill-primary/30 text-[8px]" fontFamily="monospace">100%</text>
          {/* Presets */}
          {["Q", "M", "L", "F"].map((p, i) => (
            <g key={p}>
              <rect x={236 + i * 16} y="94" width="12" height="12" rx="2" strokeWidth="0.7" style={{ stroke: pc(20), fill: pc(4) }} />
              <text x={242 + i * 16} y="103" textAnchor="middle" className="fill-primary/50 text-[7px]" fontFamily="monospace" fontWeight="700">{p}</text>
            </g>
          ))}
          <text x="278" y="103" className="fill-primary/25 text-[7px]" fontFamily="monospace">presets</text>
          {/* Footer */}
          <text x="20" y="130" className="fill-primary/20 text-[8px]" fontFamily="monospace">per-tab</text>
          <text x="100" y="130" className="fill-primary/20 text-[8px]" fontFamily="monospace">no system audio</text>
          <text x="230" y="130" className="fill-green-400/25 text-[8px]" fontFamily="monospace">local-first</text>
        </svg>
      );

    default:
      return null;
  }
}

/* ── Project Card ── */
function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onExpand}
      className="group relative flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[360px] bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden cursor-pointer hover:border-primary/25 transition-all duration-400 shadow-[0_4px_40px_rgba(0,0,0,0.3)]"
    >
      {/* ── Top: Illustration area ── */}
      <div className="relative h-[190px] bg-surface-container-lowest/60 border-b border-outline-variant/6 overflow-hidden">
        {/* Terminal chrome */}
        <div className="relative z-10 flex items-center gap-1.5 px-4 pt-3.5 pb-1">
          <span className="w-2 h-2 rounded-full bg-error/50" />
          <span className="w-2 h-2 rounded-full bg-tertiary/40" />
          <span className="w-2 h-2 rounded-full bg-green-400/40" />
          <span className="ml-2 font-mono text-[9px] text-on-surface-variant/25 tracking-wider">
            {project.id}.sys
          </span>
        </div>

        {/* SVG Illustration */}
        <div className="relative z-10 px-2 h-[145px]">
          <ProjectIllustration id={project.id} />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-container-lowest/60 to-transparent" />
      </div>

      {/* ── Bottom: Info area ── */}
      <div className="relative h-[170px]">
        {/* Always visible — title + category + tech */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-base">
                  {project.icon}
                </span>
              </div>
              <div>
                <motion.h3
                  layoutId={`title-${project.id}`}
                  className="font-headline font-bold text-[15px] text-on-surface tracking-tight leading-tight"
                >
                  {project.title}
                </motion.h3>
                <span className="font-mono text-[8px] text-primary/40 uppercase tracking-[0.1em]">
                  {project.category}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant/15 group-hover:text-primary/50 transition-colors mt-0.5">
              open_in_full
            </span>
          </div>

          <motion.p
            layoutId={`tagline-${project.id}`}
            className="font-label text-xs text-on-surface-variant/55 leading-relaxed line-clamp-1"
          >
            {project.tagline}
          </motion.p>

          {/* Tech chips — always visible */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-surface-container-highest/40 rounded font-mono text-[9px] text-primary/50 uppercase tracking-wider border border-outline-variant/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 font-mono text-[9px] text-on-surface-variant/35">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Hover reveal — description panel slides up */}
        <div className="absolute inset-0 bg-surface-container-low/95 backdrop-blur-md border-t border-outline-variant/8 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] p-4 flex flex-col">
          <p className="font-body text-[13px] text-on-surface-variant/65 leading-relaxed line-clamp-4 flex-1">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-3 mt-auto border-t border-outline-variant/6">
            <div className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 16 16"
                className="w-3 h-3 fill-on-surface-variant/30"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="font-mono text-[9px] text-on-surface-variant/40">
                View source
              </span>
            </div>
            <span className="font-mono text-[10px] text-primary/50 flex items-center gap-1">
              Details
              <span className="material-symbols-outlined text-[13px]">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Expanded Modal ── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
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
        layoutId={`card-${project.id}`}
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
          <div className="flex items-start gap-4 pr-10">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">
                {project.icon}
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em] mb-1 block">
                {project.category}
              </span>
              <motion.h3
                layoutId={`title-${project.id}`}
                className="font-headline font-bold text-2xl md:text-3xl text-on-surface tracking-tight"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={`tagline-${project.id}`}
                className="font-label text-base text-on-surface-variant/60 mt-1"
              >
                {project.tagline}
              </motion.p>
            </div>
          </div>

          {/* Full description */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Overview
            </h4>
            <p className="font-body text-[15px] text-on-surface-variant/70 leading-[1.8]">
              {project.longDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Key Highlights
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 p-3 bg-surface-container-lowest/40 rounded-lg border border-outline-variant/5"
                >
                  <span className="material-symbols-outlined text-primary/50 text-[16px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body text-sm text-on-surface-variant/60 leading-relaxed">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-primary/50 uppercase tracking-[0.15em]">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-surface-container-highest/40 rounded-lg font-mono text-[11px] text-primary/70 uppercase tracking-wider border border-outline-variant/8"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-outline-variant/8">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-surface-container-highest/50 hover:bg-surface-container-highest border border-outline-variant/10 hover:border-primary/20 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-on-surface-variant/50 group-hover:fill-primary transition-colors"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="font-label text-sm text-on-surface-variant/70 group-hover:text-on-surface transition-colors">
                View Source
              </span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-all duration-300 glow-button cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  open_in_new
                </span>
                <span className="font-label text-sm font-bold">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Projects Section ── */
export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-16 lg:px-24 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
                ls ~/projects
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
              Featured Work
            </h2>
            <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
              A selection of projects that showcase my engineering approach —
              from distributed systems to open-source libraries.
            </p>
          </div>

          {/* Scroll controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_back
              </span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-high/30 hover:bg-surface-container-highest/50 hover:border-primary/20 text-on-surface-variant/40 hover:text-primary transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
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
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard
                project={project}
                onExpand={() => setSelected(project)}
              />
            </motion.div>
          ))}

          {/* "More coming" placeholder */}
          <div className="flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[360px] rounded-xl border border-dashed border-outline-variant/10 flex flex-col items-center justify-center gap-3 opacity-30">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant/45">
              add_circle
            </span>
            <span className="font-mono text-[11px] text-on-surface-variant/45 tracking-wider uppercase">
              More coming soon
            </span>
          </div>
        </div>

        {/* Mobile swipe hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="md:hidden flex items-center justify-center gap-2 pt-2 pb-1"
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="material-symbols-outlined text-[14px] text-primary/40"
          >
            swipe_left
          </motion.span>
          <span className="font-mono text-[9px] text-on-surface-variant/40 tracking-[0.1em] uppercase">
            Swipe to explore
          </span>
        </motion.div>
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
