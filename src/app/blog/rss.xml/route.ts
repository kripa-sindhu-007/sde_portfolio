import { getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { toISODate } from "@/blog-kit/lib/frontmatter";

/** Native posts only. A feed emitting items that point at another domain is not
 *  what someone subscribes for. */
export async function GET() {
  const posts = getPosts();
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const date = new Date(`${toISODate(p.fm.created)}T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${esc(p.fm.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date}</pubDate>
      ${p.fm.deck ? `<description>${esc(p.fm.deck)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kripa Sindhu — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Distributed systems, performance, and what only shows up once something is running.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
