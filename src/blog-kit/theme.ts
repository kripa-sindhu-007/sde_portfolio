/**
 * Theme + accent for the blog.
 *
 * COPIED VERBATIM into sde_portfolio when the blog ships. Edit here, copy there.
 * See blog-kit/README.md.
 */

export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "blog-theme";

/**
 * Accent presets. Free hex entry was removed deliberately: guaranteeing contrast
 * for an arbitrary colour across two themes is not solvable, six hand-checked
 * pairs are. Ratios measured against #faf9f7 (light) and #131314 (dark);
 * targeted 5.5:1 rather than the 4.5:1 AA floor so a later background tweak
 * cannot silently push the whole set under.
 */
export const ACCENTS = [
  { id: "blue", label: "Blue", dark: "#adc6ff", light: "#0551ff" },
  { id: "rose", label: "Rose", dark: "#f4a0b6", light: "#c9093b" },
  { id: "mint", label: "Mint", dark: "#8ee4af", light: "#147439" },
  { id: "gold", label: "Gold", dark: "#f0c566", light: "#865e04" },
  { id: "lavender", label: "Lavender", dark: "#c4b5fd", light: "#6239ff" },
  { id: "peach", label: "Peach", dark: "#ffb088", light: "#b13b00" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];
export const DEFAULT_ACCENT: AccentId = "blue";
export const ACCENT_STORAGE_KEY = "blog-accent";

/**
 * Runs before first paint, blocking, in <head>.
 *
 * Without this a reader whose stored choice differs from their device gets a
 * full-page flash of the wrong theme on every navigation. It also sets
 * color-scheme so native scrollbars and form controls match immediately.
 *
 * Deliberately dependency-free and tiny — it is inlined, so every byte is
 * render-blocking.
 */
export const themeInitScript = `
(function(){
  try{
    var t = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) || "system";
    var dark = t === "dark" || (t === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
    var r = document.documentElement;
    if (t !== "system") r.setAttribute("data-theme", t);
    r.style.colorScheme = dark ? "dark" : "light";
    var a = localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)});
    if (a) r.setAttribute("data-accent", a);
  }catch(e){}
})();
`.trim();
