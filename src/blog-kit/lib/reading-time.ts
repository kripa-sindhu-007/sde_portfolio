/** Computed, never hand-written — one less thing to forget or let go stale. */
const WPM = 220;

export function readingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")      // code is skimmed, not read
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}
