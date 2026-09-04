/** The frontmatter contract shared by the workshop and the published blog. */
export type Frontmatter = {
  title: string;
  slug: string;
  deck?: string;
  status: "idea" | "draft" | "ready" | "posted";
  created: string | Date;
  channels?: string[];
  posted?: Record<string, string | null>;
  canonical?: string | null;
  topics?: string[];
  source?: string;
  /** basename of the cover pair, e.g. "cover" → cover-dark.png / cover-light.png */
  cover?: string;
};

/** YAML auto-parses an unquoted `2026-09-04` into a Date, so this has to accept
 *  both. Always formatted in UTC — otherwise a post dated the 4th shows as the
 *  3rd for anyone west of London. */
/** YAML turns an unquoted date into a Date, and String(Date) is
 *  "Fri Sep 04 2026 …" — so slicing it gives junk. Normalise first. */
export function toISODate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

export function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}
