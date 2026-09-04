import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getIndexEntries, type IndexEntry } from "@/lib/posts";
import { formatDate } from "@/blog-kit/lib/frontmatter";
import { SITE_URL } from "@/lib/site";
import { BlogBar } from "./BlogBar";
import { Filters } from "./Filters";

export const metadata: Metadata = {
  // no name suffix — the root layout's title template already appends it
  title: "Writing",
  description:
    "Notes on distributed systems, performance and the things that only show up once something is running.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
};

function CardInner({ entry }: { entry: IndexEntry }) {
  return (
    <>
      <div className={`c-thumb${entry.cover ? "" : " none"}`}>
        {entry.cover ? (
          <>
            {/* both render; CSS shows whichever matches the active theme */}
            <Image
              className="fig-light"
              src={`${entry.cover}-light.png`}
              alt=""
              width={1200}
              height={628}
            />
            <Image
              className="fig-dark"
              src={`${entry.cover}-dark.png`}
              alt=""
              width={1200}
              height={628}
            />
          </>
        ) : entry.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={entry.thumbnail} alt="" loading="lazy" />
        ) : (
          <span>{entry.platform ?? "note"}</span>
        )}
      </div>

      <div className="c-body">
        <div className="c-meta">
          <span>{formatDate(entry.date)}</span>
          {entry.minutes ? <span>· {entry.minutes} min</span> : null}
          {entry.kind === "external" ? (
            <span className="c-off">{entry.platform} ↗</span>
          ) : null}
        </div>
        <div className="c-title">{entry.title}</div>
        {entry.deck ? <div className="c-deck">{entry.deck}</div> : null}
        <div className="c-tags">
          {entry.topics.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}

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

        <div id="entries" className="blog-grid">
          {entries.map((entry) =>
            entry.kind === "native" ? (
              <Link
                key={entry.href}
                href={entry.href}
                className="card entry"
                data-topics={entry.topics.join(" ")}
              >
                <CardInner entry={entry} />
              </Link>
            ) : (
              <a
                key={entry.href}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card entry"
                data-topics={entry.topics.join(" ")}
              >
                <CardInner entry={entry} />
              </a>
            ),
          )}
        </div>
      </div>
    </>
  );
}
