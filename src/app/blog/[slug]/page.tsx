import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getNeighbours, getPost, getPosts } from "@/lib/posts";
import { formatDate } from "@/blog-kit/lib/frontmatter";
import { mdxComponents } from "@/blog-kit/components/mdx-components";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { BlogBar } from "../BlogBar";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    // no name suffix here — the root layout's title template already appends it
    title: post.fm.title,
    description: post.fm.deck,
    alternates: { canonical: post.fm.canonical ?? url },
    openGraph: {
      title: post.fm.title,
      description: post.fm.deck,
      url,
      type: "article",
      // social has no theme signal, so always the dark cover (D5)
      images: [`/blog/${slug}/cover-dark.png`],
    },
  };
}

/** Dual themes as CSS variables — no runtime JS, and it follows the toggle. */
const prettyCode: [typeof rehypePrettyCode, Options] = [
  rehypePrettyCode,
  { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false },
];

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { fm, body, minutes } = post;
  const posted = Object.entries(fm.posted ?? {}).filter(([k, v]) => v && k !== "blog");
  const { prev, next } = getNeighbours(slug);

  return (
    <>
      <BlogBar back={{ href: "/blog", label: "← all writing" }} />
      <div className="wrap">
        <header className="post-head">
          <div className="eyebrow">{fm.topics?.[0] ?? "Writing"}</div>
          <h1>{fm.title}</h1>
          {fm.deck && <div className="deck">{fm.deck}</div>}
          <div className="byline">
            <span>{formatDate(fm.created)}</span>
            <span className="sep">·</span>
            <span>{minutes} min read</span>
            {fm.topics?.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        </header>

        <div className="prose">
          <MDXRemote
            source={body}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [prettyCode] } }}
          />
        </div>

        <footer className="post-foot">
          <div className="rule" />
          <div className="xp">
            {posted.length > 0 && <span style={{ color: "var(--faint)" }}>Also published:</span>}
            {posted.map(([channel]) => (
              <span key={channel} className="chan">
                {channel}
              </span>
            ))}
            <a href="/blog/rss.xml">Subscribe via RSS feed</a>
          </div>

          {/* Always present, so the article never dead-ends. With a single post
              there are no neighbours, so both slots fall back to the index. */}
          <div className="neighbours">
            {prev ? (
              <Link className="nb" href={`/blog/${prev.slug}`}>
                <div className="l">← Previous</div>
                <div className="t">{prev.fm.title}</div>
              </Link>
            ) : (
              <Link className="nb" href="/blog">
                <div className="l">← Index</div>
                <div className="t">All writing</div>
              </Link>
            )}
            {next ? (
              <Link className="nb next" href={`/blog/${next.slug}`}>
                <div className="l">Next →</div>
                <div className="t">{next.fm.title}</div>
              </Link>
            ) : (
              <Link className="nb next" href="/blog">
                <div className="l">More →</div>
                <div className="t">Everything I have written</div>
              </Link>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
