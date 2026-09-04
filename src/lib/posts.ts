import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "@/blog-kit/lib/reading-time";
import { toISODate, type Frontmatter } from "@/blog-kit/lib/frontmatter";
import { externalPosts, type ExternalPost } from "../../content/external";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  fm: Frontmatter;
  body: string;
  minutes: number;
};

/** Only pieces published here. Drafts live in the private `writing` repo and are
 *  copied in on publish — a file in a public repo is readable the moment it is
 *  pushed, regardless of any draft flag. */
export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getPost(f.replace(/\.mdx$/, "")))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (toISODate(a.fm.created) < toISODate(b.fm.created) ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { slug, fm: data as Frontmatter, body: content, minutes: readingTime(content) };
}

export type IndexEntry = {
  kind: "native" | "external";
  title: string;
  href: string;
  date: string;
  deck?: string;
  topics: string[];
  minutes?: number;
  platform?: string;
  /** basename of the dual cover pair, e.g. /blog/<slug>/cover */
  cover?: string;
};

/** Native and external, merged and sorted — the index is the single home for
 *  everything written, wherever it lives. */
export function getIndexEntries(): IndexEntry[] {
  const native: IndexEntry[] = getPosts().map((p) => ({
    kind: "native",
    title: p.fm.title,
    href: `/blog/${p.slug}`,
    date: toISODate(p.fm.created),
    deck: p.fm.deck,
    topics: p.fm.topics ?? [],
    minutes: p.minutes,
    cover: p.fm.cover ? `/blog/${p.slug}/${p.fm.cover}` : undefined,
  }));
  const ext: IndexEntry[] = externalPosts.map((e: ExternalPost) => ({
    kind: "external",
    title: e.title,
    href: e.url,
    date: e.date,
    deck: e.deck,
    topics: e.topics,
    platform: e.platform,
  }));
  return [...native, ...ext].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Previous and next by date, for the article footer. */
export function getNeighbours(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  // posts are newest-first, so "next" is the newer one
  return { next: posts[i - 1] ?? null, prev: posts[i + 1] ?? null };
}
