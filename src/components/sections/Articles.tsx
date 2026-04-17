import {
  fetchMediumArticles,
  mediumProfileUrl,
  type MediumArticle,
} from "@/lib/medium";
import ArticlesScroller from "./ArticlesScroller";

export default async function Articles() {
  const articles: MediumArticle[] = await fetchMediumArticles();

  return (
    <section id="articles" className="relative py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary/[0.02] blur-[160px] rounded-full pointer-events-none" />

      {/* Section header */}
      <div className="px-6 md:px-16 lg:px-24 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              curl medium.com/@sindhukripa007
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
            Articles
          </h2>
          <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
            Notes and deep-dives published on Medium — engineering patterns,
            lessons learned, and the occasional rant.
          </p>
        </div>
      </div>

      <ArticlesScroller
        articles={articles}
        profileUrl={mediumProfileUrl}
      />
    </section>
  );
}
