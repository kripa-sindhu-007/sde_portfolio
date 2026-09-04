"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  ACCENTS,
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  THEME_STORAGE_KEY,
  type AccentId,
  type ThemeChoice,
} from "../theme";

const ORDER: ThemeChoice[] = ["system", "light", "dark"];
const LABEL: Record<ThemeChoice, string> = { system: "auto", light: "light", dark: "dark" };

/**
 * localStorage is external state, so it is read through useSyncExternalStore
 * rather than an effect. That avoids setState-during-effect, and gives an
 * explicit server snapshot so the first client render matches the SSR output —
 * the blocking script in <head> has already applied the real value to <html>,
 * so nothing visible depends on this component's first render.
 */
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function useStored<T extends string>(key: string, fallback: T): T {
  return useSyncExternalStore(
    subscribe,
    useCallback(() => (localStorage.getItem(key) as T) || fallback, [key, fallback]),
    useCallback(() => fallback, [fallback]),
  );
}

export function ThemeToggle() {
  const theme = useStored<ThemeChoice>(THEME_STORAGE_KEY, "system");
  const accent = useStored<AccentId>(ACCENT_STORAGE_KEY, DEFAULT_ACCENT);

  function applyTheme(next: ThemeChoice) {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    const root = document.documentElement;
    if (next === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", next);
    const dark =
      next === "dark" ||
      (next === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    root.style.colorScheme = dark ? "dark" : "light";
    emit();
  }

  function applyAccent(next: AccentId) {
    localStorage.setItem(ACCENT_STORAGE_KEY, next);
    document.documentElement.setAttribute("data-accent", next);
    emit();
  }

  return (
    <div className="tt">
      <button
        className="tt-mode"
        onClick={() => applyTheme(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length] as ThemeChoice)}
        aria-label={`Theme: ${theme}. Click to change.`}
      >
        {LABEL[theme]}
      </button>
      <div className="tt-accents">
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            onClick={() => applyAccent(a.id)}
            aria-label={a.label}
            aria-pressed={accent === a.id}
            className={accent === a.id ? "on" : ""}
            style={{ background: a.dark }}
          />
        ))}
      </div>
    </div>
  );
}
