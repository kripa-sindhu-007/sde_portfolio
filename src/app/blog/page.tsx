import type { Metadata } from "next";
import Link from "next/link";
import { getIndexEntries } from "@/lib/posts";
import { formatDate } from "@/blog-kit/lib/frontmatter";
import { SITE_URL } from "@/lib/site";
import { BlogBar } from "./BlogBar";
import { Filters } from "./Filters";

export const metadata: Metadata = {
  title: "Writing — Kripa Sindhu",
  description:
    "Notes on distributed systems, performance and the things that only show up once something is running.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  const entries = getIndexEntries();
  const topics = [...new Set(entries.flatMap((e) => e.topics))].sort();

  return (
    <>
      <BlogBar />
      <div className="idx">
        <div className="eyebrow">ls ~/writing</div>
        <h1>Writing</h1>
        <p className="sub">
          Distributed systems, performance, and the things that only show up once something is
          actually running. Occasionally what broke while I was fixing something else.
        </p>

        <Filters topics={topics} />

        <div id="entries">
          {entries.map((e) => {
            const meta = (
              <>
                <div className="em">
                  <span>{formatDate(e.date)}</span>
                  {e.minutes && <span>{e.minutes} min</span>}
                  {e.kind === "external" && <span className="off">on {e.platform} ↗</span>}
                  {e.topics.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
                <div className="et">{e.title}</div>
                {e.deck && <div className="ed">{e.deck}</div>}
              </>
            );
            return e.kind === "native" ? (
              <Link key={e.href} href={e.href} className="entry" data-topics={e.topics.join(" ")}>
                {meta}
              </Link>
            ) : (
              <a
                key={e.href}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="entry"
                data-topics={e.topics.join(" ")}
              >
                {meta}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
