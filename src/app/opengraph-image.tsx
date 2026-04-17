import { ImageResponse } from "next/og";

export const alt = "Kripa Sindhu — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#0e0e0f",
  surface: "#131314",
  surfaceHigh: "#1c1b1c",
  border: "rgba(194, 198, 214, 0.08)",
  borderStrong: "rgba(194, 198, 214, 0.16)",
  text: "#e5e2e3",
  textDim: "rgba(229, 226, 227, 0.55)",
  textMuted: "rgba(229, 226, 227, 0.35)",
  primary: "#adc6ff",
  primarySoft: "rgba(173, 198, 255, 0.12)",
  primaryBorder: "rgba(173, 198, 255, 0.24)",
  tertiary: "#ffb786",
  green: "#4ade80",
  red: "rgba(255, 180, 171, 0.7)",
  amber: "rgba(255, 183, 134, 0.7)",
};

function getSiteHost(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://sde-portfolio-lemon-phi.vercel.app";
  try {
    return new URL(raw).host;
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export default async function OGImage() {
  const host = getSiteHost();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: COLORS.bg,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(173,198,255,0.08), transparent 55%), radial-gradient(circle at 85% 80%, rgba(255,183,134,0.05), transparent 50%)`,
          padding: 56,
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, ui-sans-serif, system-ui",
          color: COLORS.text,
          position: "relative",
        }}
      >
        {/* ── Top bar: terminal chrome + KS badge ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              background: COLORS.surfaceHigh,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: COLORS.red,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: COLORS.amber,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: COLORS.green,
              }}
            />
            <div
              style={{
                marginLeft: 14,
                fontSize: 16,
                color: COLORS.textMuted,
                letterSpacing: 2,
                display: "flex",
              }}
            >
              kripa-sindhu ~ portfolio
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 16px",
              background: COLORS.primarySoft,
              border: `1px solid ${COLORS.primaryBorder}`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: COLORS.primary,
                letterSpacing: -1,
                display: "flex",
              }}
            >
              KS
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: COLORS.green,
              }}
            />
          </div>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          {/* prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              color: COLORS.primary,
              letterSpacing: 3,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: COLORS.primary,
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>$ whoami</div>
          </div>

          {/* name */}
          <div
            style={{
              fontSize: 124,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 1,
              color: COLORS.text,
              display: "flex",
            }}
          >
            Kripa Sindhu
          </div>

          {/* role */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: COLORS.tertiary,
              marginTop: 16,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            Software Engineer
          </div>

          {/* tagline */}
          <div
            style={{
              fontSize: 26,
              color: COLORS.textDim,
              marginTop: 28,
              maxWidth: 900,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Distributed systems · AI tooling · Published in Computing (Springer,
            2026)
          </div>

          {/* tech chips */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {["Go", "Next.js", "TypeScript", "Redis", "PostgreSQL", "Python"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    padding: "8px 16px",
                    fontSize: 18,
                    color: COLORS.primary,
                    background: COLORS.primarySoft,
                    border: `1px solid ${COLORS.primaryBorder}`,
                    borderRadius: 8,
                    letterSpacing: 1,
                    display: "flex",
                  }}
                >
                  {t}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Footer status bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `1px solid ${COLORS.border}`,
            fontSize: 18,
            color: COLORS.textMuted,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: COLORS.green,
                display: "flex",
              }}
            />
            <div style={{ display: "flex", color: COLORS.green }}>ONLINE</div>
            <div style={{ display: "flex", marginLeft: 18 }}>
              available for opportunities
            </div>
          </div>

          <div style={{ display: "flex", color: COLORS.textDim }}>{host}</div>
        </div>
      </div>
    ),
    size
  );
}
