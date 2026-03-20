import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/* ── Color Palette (matches portfolio) ── */
const C = {
  bg: "#131314",
  surface: "#1c1b1c",
  surfaceHigh: "#2a2a2b",
  primary: "#adc6ff",
  primaryDim: "rgba(173,198,255,0.15)",
  tertiary: "#ffb786",
  onSurface: "#e5e2e3",
  onSurfaceVariant: "#c2c6d6",
  muted: "rgba(194,198,214,0.4)",
  green: "#4ade80",
  error: "#ffb4ab",
  outline: "rgba(66,71,84,0.5)",
};

const FONT =
  '"Outfit", "Segoe UI", system-ui, sans-serif';
const MONO =
  '"JetBrains Mono", "Courier New", monospace';
const DISPLAY =
  '"Syne", "Outfit", system-ui, sans-serif';

/* ── Utility: fade + slide ── */
function fadeSlide(
  frame: number,
  start: number,
  dir: "up" | "left" | "right" = "up",
  distance = 60
) {
  const opacity = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const axis = dir === "up" ? "Y" : "X";
  const sign = dir === "right" ? 1 : dir === "left" ? -1 : 1;
  const offset = interpolate(frame, [start, start + 20], [distance * sign, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, transform: `translate${axis}(${offset}px)` };
}

function fadeOut(frame: number, start: number, dur = 12) {
  return interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/* ── Scene 1: Boot Sequence (0-4s, frames 0-120) ── */
const BootScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    { text: "[kernel]  initializing system...", delay: 10 },
    { text: "[boot]    loading modules ██████░░ 75%", delay: 20 },
    { text: "[net]     establishing connections...", delay: 30 },
    { text: "[gpu]     rendering pipeline ready", delay: 38 },
    { text: "[auth]    identity: kripa_sindhu", delay: 46 },
    { text: "[config]  theme: engineer_atelier_dark", delay: 54 },
    { text: "[status]  all systems operational ✓", delay: 64 },
  ];

  const progressPct = interpolate(frame, [10, 80], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const exitOpacity = fadeOut(frame, 100, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(173,198,255,0.015) 2px, rgba(173,198,255,0.015) 4px)`,
          pointerEvents: "none",
        }}
      />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 40, left: 40, width: 50, height: 50, borderLeft: `1px solid ${C.outline}`, borderTop: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", top: 40, right: 40, width: 50, height: 50, borderRight: `1px solid ${C.outline}`, borderTop: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", bottom: 40, left: 40, width: 50, height: 50, borderLeft: `1px solid ${C.outline}`, borderBottom: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", bottom: 40, right: 40, width: 50, height: 50, borderRight: `1px solid ${C.outline}`, borderBottom: `1px solid ${C.outline}` }} />

      <div style={{ width: 600 }}>
        {/* KS monogram */}
        <div style={{ ...fadeSlide(frame, 0), display: "flex", alignItems: "center", gap: 18, marginBottom: 50 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(173,198,255,0.1)",
              border: "1px solid rgba(173,198,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 900, color: C.primary, letterSpacing: -2 }}>
              KS
            </span>
          </div>
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: C.onSurface }}>
              ENGINEER_ATELIER
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, letterSpacing: 2 }}>
              PORTFOLIO v2.0.4
            </div>
          </div>
        </div>

        {/* Terminal window */}
        <div
          style={{
            background: "rgba(14,14,15,0.7)",
            borderRadius: 12,
            border: `1px solid ${C.outline}`,
            overflow: "hidden",
            marginBottom: 36,
          }}
        >
          {/* Chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderBottom: `1px solid ${C.outline}` }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,180,171,0.5)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,183,134,0.4)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(74,222,128,0.4)" }} />
            <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted, marginLeft: 8 }}>boot.sh</span>
          </div>

          {/* Boot lines */}
          <div style={{ padding: "18px 24px", height: 230, overflow: "hidden" }}>
            {lines.map((line, i) => {
              const lineOpacity = interpolate(frame, [line.delay, line.delay + 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const isGreen = line.text.includes("✓");
              const isPrimary = line.text.includes("kripa") || line.text.includes("engineer");
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: MONO,
                    fontSize: 14,
                    lineHeight: 2,
                    opacity: lineOpacity,
                    color: isGreen
                      ? "rgba(74,222,128,0.7)"
                      : isPrimary
                      ? "rgba(173,198,255,0.6)"
                      : "rgba(194,198,214,0.45)",
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 4, background: "rgba(53,52,54,0.5)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, rgba(173,198,255,0.7), ${C.primary}, rgba(173,198,255,0.7))`,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: frame > 80 ? "rgba(74,222,128,0.7)" : C.muted }}>
            {frame > 80 ? "System ready" : "Initializing..."}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted }}>
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 2: Hero Intro (4-10s, frames 120-300) ── */
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitOpacity = fadeOut(frame, 160, 15);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        padding: "0 120px",
        justifyContent: "center",
        opacity: exitOpacity,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "rgba(173,198,255,0.035)",
          filter: "blur(180px)",
        }}
      />

      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: interpolate(frame, [5, 30], [0, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: 1,
          background: `linear-gradient(to left, rgba(173,198,255,0.25), transparent)`,
        }}
      />

      {/* Breadcrumb */}
      <div style={{ ...fadeSlide(frame, 5), marginBottom: 50 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            background: "rgba(42,42,43,0.5)",
            borderRadius: 8,
            border: `1px solid ${C.outline}`,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.primary, letterSpacing: 2 }}>
            INITIALIZE_KERNEL
          </span>
          <span style={{ color: C.muted, fontSize: 14 }}>/</span>
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.muted, letterSpacing: 2 }}>
            PORTFOLIO_V2.0.4
          </span>
          <div
            style={{
              width: 8,
              height: 18,
              background: `rgba(173,198,255,0.7)`,
              opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Name */}
      <div style={fadeSlide(frame, 15)}>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -6,
            lineHeight: 0.9,
            background: `linear-gradient(135deg, ${C.primary}, #4d8eff, ${C.primary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          Kripa Sindhu
        </h1>
      </div>

      {/* Role */}
      <div style={{ ...fadeSlide(frame, 28), marginTop: 20 }}>
        <p style={{ fontFamily: FONT, fontSize: 56, fontWeight: 700, color: "rgba(229,226,227,0.85)", letterSpacing: -1, margin: 0 }}>
          Software Engineer
        </p>
      </div>
      <div style={{ ...fadeSlide(frame, 35), marginTop: 8 }}>
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 600, color: "rgba(229,226,227,0.55)", margin: 0 }}>
          crafting scalable
        </p>
      </div>
      <div style={{ ...fadeSlide(frame, 42), marginTop: 8 }}>
        <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 600, color: "rgba(229,226,227,0.35)", margin: 0 }}>
          systems & experiences
        </p>
      </div>

      {/* Tech tags */}
      <div style={{ display: "flex", gap: 12, marginTop: 50, flexWrap: "wrap" }}>
        {["Full-Stack", "Distributed Systems", "Performance", "Open Source"].map((tag, i) => (
          <div
            key={tag}
            style={{
              ...fadeSlide(frame, 55 + i * 6),
              padding: "10px 20px",
              borderRadius: 10,
              border: `1px solid ${C.outline}`,
              background: "rgba(42,42,43,0.3)",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 13, color: "rgba(194,198,214,0.7)", letterSpacing: 1 }}>
              {tag.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 3: Experience (10-16s, frames 300-480) ── */
const ExperienceScene: React.FC = () => {
  const frame = useCurrentFrame();

  const exitOpacity = fadeOut(frame, 160, 15);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, padding: "80px 120px", opacity: exitOpacity }}>
      {/* Section header */}
      <div style={fadeSlide(frame, 5)}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", background: "rgba(42,42,43,0.5)", borderRadius: 6, border: `1px solid ${C.outline}`, marginBottom: 16 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.primary, letterSpacing: 2 }}>CAT ~/EXPERIENCE.LOG</span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 800, color: C.onSurface, letterSpacing: -3, margin: "10px 0 40px" }}>
          Experience
        </h2>
      </div>

      {/* Timeline cards */}
      <div style={{ display: "flex", gap: 40 }}>
        {/* Active card */}
        <div style={{ ...fadeSlide(frame, 20, "left"), flex: 1 }}>
          <div style={{ background: "rgba(28,27,28,0.6)", borderRadius: 16, border: "1px solid rgba(173,198,255,0.12)", overflow: "hidden" }}>
            {/* Terminal chrome */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(173,198,255,0.08)", background: "rgba(173,198,255,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(74,222,128,0.8)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted, marginLeft: 8 }}>process://beatroute</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 6, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />
                <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(74,222,128,0.8)", letterSpacing: 2 }}>RUNNING</span>
              </div>
            </div>
            {/* Body */}
            <div style={{ padding: 30 }}>
              <h3 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.onSurface, margin: "0 0 6px" }}>
                Software Engineer Intern
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(173,198,255,0.6)", margin: "0 0 20px" }}>BeatRoute</p>
              <div style={{ fontFamily: MONO, fontSize: 12, color: C.muted, marginBottom: 6 }}>May 2025 - Present</div>
              {/* Log lines */}
              <div style={{ background: "rgba(14,14,15,0.5)", borderRadius: 10, padding: 16, marginTop: 16 }}>
                {["Built scalable microservices", "Optimized API response times", "Implemented caching layers"].map((line, i) => (
                  <div key={i} style={{ ...fadeSlide(frame, 40 + i * 8), display: "flex", gap: 14, marginBottom: 8 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(173,198,255,0.25)", width: 20, textAlign: "right" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: FONT, fontSize: 14, color: "rgba(194,198,214,0.6)" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Archived card */}
        <div style={{ ...fadeSlide(frame, 35, "left"), flex: 1 }}>
          <div style={{ background: "rgba(28,27,28,0.3)", borderRadius: 16, border: "1px solid rgba(66,71,84,0.15)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(66,71,84,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted, marginLeft: 8 }}>archive://education</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 6, background: "rgba(53,52,54,0.3)", border: "1px solid rgba(66,71,84,0.15)" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(66,71,84,0.3)" }} />
                <span style={{ fontFamily: MONO, fontSize: 9, color: C.muted, letterSpacing: 2 }}>EXIT 0</span>
              </div>
            </div>
            <div style={{ padding: 30 }}>
              <h3 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.onSurface, margin: "0 0 6px" }}>
                B.Tech Computer Science
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 16, color: "rgba(194,198,214,0.45)", margin: 0 }}>KIIT University</p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 4: Projects (16-22s, frames 480-660) ── */
const ProjectsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exitOpacity = fadeOut(frame, 160, 15);

  const projects = [
    { title: "Feature Flag System", tag: "Backend", tech: ["Go", "Redis", "SSE"] },
    { title: "Task Queue Dashboard", tag: "Full-Stack", tech: ["Node.js", "React", "Bull"] },
    { title: "AI Travel Planner", tag: "AI/ML", tech: ["Python", "OpenAI", "Next.js"] },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, padding: "80px 120px", opacity: exitOpacity }}>
      <div style={fadeSlide(frame, 5)}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", background: "rgba(42,42,43,0.5)", borderRadius: 6, border: `1px solid ${C.outline}`, marginBottom: 16 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.primary, letterSpacing: 2 }}>LS ~/PROJECTS</span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 800, color: C.onSurface, letterSpacing: -3, margin: "10px 0 50px" }}>
          Featured Work
        </h2>
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {projects.map((proj, i) => (
          <div
            key={proj.title}
            style={{
              ...fadeSlide(frame, 20 + i * 12, "up"),
              flex: 1,
              borderRadius: 16,
              border: `1px solid ${C.outline}`,
              background: "rgba(28,27,28,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Terminal chrome */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: `1px solid ${C.outline}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,180,171,0.5)" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,183,134,0.4)" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(74,222,128,0.4)" }} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: C.muted, marginLeft: 6 }}>
                {proj.title.toLowerCase().replace(/\s+/g, "-")}.sys
              </span>
            </div>

            {/* Illustration area */}
            <div style={{ height: 200, background: "rgba(14,14,15,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 48, color: "rgba(173,198,255,0.06)", fontWeight: 900, letterSpacing: -2 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(173,198,255,0.08)", border: "1px solid rgba(173,198,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: MONO, fontSize: 14, color: C.primary }}>#</span>
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.onSurface }}>{proj.title}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(173,198,255,0.4)", letterSpacing: 2 }}>{proj.tag.toUpperCase()}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {proj.tech.map((t) => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: 10, color: "rgba(173,198,255,0.5)", padding: "4px 10px", borderRadius: 6, background: "rgba(53,52,54,0.4)", border: "1px solid rgba(66,71,84,0.15)", letterSpacing: 1 }}>
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 5: Achievements (22-27s, frames 660-810) ── */
const AchievementsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exitOpacity = fadeOut(frame, 130, 15);

  const gateValue = interpolate(frame, [25, 70], [50, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lcValue = interpolate(frame, [40, 85], [0, 1914], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, padding: "80px 120px", opacity: exitOpacity }}>
      <div style={fadeSlide(frame, 5)}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", background: "rgba(42,42,43,0.5)", borderRadius: 6, border: `1px solid ${C.outline}`, marginBottom: 16 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.tertiary }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.tertiary, letterSpacing: 2 }}>./BENCHMARKS --RUN</span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 800, color: C.onSurface, letterSpacing: -3, margin: "10px 0 50px" }}>
          Achievements
        </h2>
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {/* GATE Card */}
        <div style={{ ...fadeSlide(frame, 18), flex: 7 }}>
          <div style={{ background: "rgba(28,27,28,0.5)", borderRadius: 16, border: `1px solid ${C.outline}`, overflow: "hidden", padding: 40 }}>
            <div style={{ height: 2, background: `linear-gradient(to right, rgba(255,183,134,0.4), rgba(255,183,134,0.1), transparent)`, marginTop: -40, marginLeft: -40, marginRight: -40, marginBottom: 30 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(255,183,134,0.1)", border: "1px solid rgba(255,183,134,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 28 }}>🏅</span>
              </div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: C.tertiary, letterSpacing: 3, marginBottom: 4 }}>NATIONAL RANK</div>
                <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.onSurface }}>GATE — CSE</div>
              </div>
            </div>
            <div style={{ fontFamily: DISPLAY, fontSize: 96, fontWeight: 900, letterSpacing: -4, background: `linear-gradient(135deg, ${C.tertiary}, #df7412, ${C.tertiary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Top {Math.round(gateValue)}%
            </div>
            <div style={{ fontFamily: MONO, fontSize: 13, color: C.muted, marginTop: 10, letterSpacing: 2 }}>
              OF CANDIDATES NATIONWIDE
            </div>
          </div>
        </div>

        {/* LeetCode Card */}
        <div style={{ ...fadeSlide(frame, 30), flex: 5 }}>
          <div style={{ background: "rgba(28,27,28,0.5)", borderRadius: 16, border: `1px solid ${C.outline}`, overflow: "hidden", padding: 40 }}>
            <div style={{ height: 2, background: `linear-gradient(to right, rgba(173,198,255,0.4), rgba(173,198,255,0.1), transparent)`, marginTop: -40, marginLeft: -40, marginRight: -40, marginBottom: 30 }} />
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.primary, letterSpacing: 3, marginBottom: 4 }}>KNIGHT BADGE</div>
            <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 20 }}>LeetCode</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 80, fontWeight: 900, letterSpacing: -3, background: `linear-gradient(135deg, ${C.primary}, #4d8eff, ${C.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {Math.round(lcValue)}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 13, color: C.muted, marginTop: 8, letterSpacing: 2 }}>
              PEAK CONTEST RATING
            </div>
            {/* Progress bars */}
            <div style={{ display: "flex", gap: 4, marginTop: 30 }}>
              <div style={{ width: "20%", height: 8, borderRadius: 4, background: "rgba(74,222,128,0.4)" }} />
              <div style={{ width: "55%", height: 8, borderRadius: 4, background: "rgba(255,183,134,0.4)" }} />
              <div style={{ width: "25%", height: 8, borderRadius: 4, background: "rgba(255,180,171,0.4)" }} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              {[{ l: "Easy", c: "rgba(74,222,128,0.4)" }, { l: "Medium", c: "rgba(255,183,134,0.4)" }, { l: "Hard", c: "rgba(255,180,171,0.4)" }].map((s) => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.c }} />
                  <span style={{ fontFamily: MONO, fontSize: 10, color: C.muted }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 6: Outro / CTA (27-30s, frames 810-900) ── */
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(173,198,255,0.04)", filter: "blur(160px)" }} />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 40, left: 40, width: 50, height: 50, borderLeft: `1px solid ${C.outline}`, borderTop: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", top: 40, right: 40, width: 50, height: 50, borderRight: `1px solid ${C.outline}`, borderTop: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", bottom: 40, left: 40, width: 50, height: 50, borderLeft: `1px solid ${C.outline}`, borderBottom: `1px solid ${C.outline}` }} />
      <div style={{ position: "absolute", bottom: 40, right: 40, width: 50, height: 50, borderRight: `1px solid ${C.outline}`, borderBottom: `1px solid ${C.outline}` }} />

      <div style={{ textAlign: "center" }}>
        {/* KS Logo */}
        <div style={{ ...fadeSlide(frame, 5), display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(173,198,255,0.1)", border: "1px solid rgba(173,198,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 900, color: C.primary, letterSpacing: -3 }}>KS</span>
          </div>
        </div>

        <div style={fadeSlide(frame, 15)}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 800, color: C.onSurface, letterSpacing: -3, margin: "0 0 16px" }}>
            Let&apos;s Build Together
          </h2>
        </div>

        <div style={fadeSlide(frame, 25)}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: C.muted, margin: "0 0 40px" }}>
            sindhukripa007@gmail.com
          </p>
        </div>

        <div style={fadeSlide(frame, 35)}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 32px", borderRadius: 12, background: C.primary }}>
            <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: "#002e6a" }}>
              View Portfolio
            </span>
          </div>
        </div>

        <div style={{ ...fadeSlide(frame, 50), marginTop: 50 }}>
          <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(194,198,214,0.25)", letterSpacing: 3 }}>
            ENGINEER_ATELIER // 2026
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ── */
export const PortfolioDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Scene 1: Boot (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <BootScene />
      </Sequence>

      {/* Scene 2: Hero (4-10s) */}
      <Sequence from={120} durationInFrames={180}>
        <HeroScene />
      </Sequence>

      {/* Scene 3: Experience (10-16s) */}
      <Sequence from={300} durationInFrames={180}>
        <ExperienceScene />
      </Sequence>

      {/* Scene 4: Projects (16-22s) */}
      <Sequence from={480} durationInFrames={180}>
        <ProjectsScene />
      </Sequence>

      {/* Scene 5: Achievements (22-27s) */}
      <Sequence from={660} durationInFrames={150}>
        <AchievementsScene />
      </Sequence>

      {/* Scene 6: Outro (27-30s) */}
      <Sequence from={810} durationInFrames={90}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
