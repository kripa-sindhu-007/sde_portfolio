"use client";

import { useState } from "react";

/** Client-side filtering, not routes — there is not enough here yet to justify
 *  the extra SEO surface (Q4). */
export function Filters({ topics }: { topics: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  function pick(t: string | null) {
    setActive(t);
    document.querySelectorAll<HTMLElement>("#entries .entry").forEach((el) => {
      const show = !t || (el.dataset.topics ?? "").split(" ").includes(t);
      el.style.display = show ? "flex" : "none";
    });
  }

  return (
    <div className="filters">
      <button className={active === null ? "on" : ""} onClick={() => pick(null)}>all</button>
      {topics.map((t) => (
        <button key={t} className={active === t ? "on" : ""} onClick={() => pick(t)}>#{t}</button>
      ))}
    </div>
  );
}
