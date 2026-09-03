// To publish a new version: add the dated file under public/resume/ and change
// RESUME_FILE. The rewrite, the links, and the hero's "Updated" label all follow.
export const RESUME_FILE = "/resume/Kripa_Sindhu_SDE1_2026-09.pdf";

export const RESUME_URL = "/resume";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

// Static month table rather than Intl, so server and client render the same string.
export const RESUME_UPDATED = (() => {
  const stamp = /_(\d{4})-(\d{2})\.pdf$/.exec(RESUME_FILE);
  if (!stamp) return "";

  const year = stamp[1];
  const month = MONTHS[Number(stamp[2]) - 1];

  return month ? `${month} ${year}` : year;
})();
