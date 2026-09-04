// Hardcoded fallback, not env-only: a missing env var made production advertise a
// stale *.vercel.app URL as canonical.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kripasindhu.dev";

export const SITE_HOST = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
})();
