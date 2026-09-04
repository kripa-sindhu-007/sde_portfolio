import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { toISODate } from "@/blog-kit/lib/frontmatter";
import { SITE_URL } from "@/lib/site";

/**
 * Driven by getPosts() so a new .mdx registers itself — the same source
 * generateStaticParams uses, which is what keeps the two from drifting.
 *
 * External pieces are deliberately absent: they live on Medium and dev.to and
 * are canonical there. Listing another domain's URLs here claims nothing and
 * just invites a mismatch warning.
 *
 * /resume is absent too — it is noindex'd (see next.config.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  // the index is only as fresh as the newest thing on it
  const newest = posts[0] ? toISODate(posts[0].fm.created) : undefined;

  return [
    {
      url: SITE_URL,
      lastModified: newest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: toISODate(p.fm.created),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
