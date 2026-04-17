import {
  fetchMediumArticles,
  mediumProfileUrl,
  type MediumArticle,
} from "@/lib/medium";
import ArticlesScroller from "./ArticlesScroller";

function ArticlesHeader() {
  return (
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
  );
}

export function ArticlesSkeleton() {
  return (
    <section
      id="articles"
      className="relative py-24 overflow-hidden"
      aria-busy="true"
    >
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary/[0.02] blur-[160px] rounded-full pointer-events-none" />
      <ArticlesHeader />
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-6 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-6 overflow-hidden px-6 md:px-16 lg:px-24 pb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[min(340px,82vw)] md:w-[380px] h-[420px] rounded-xl bg-surface-container-low/30 border border-outline-variant/8 overflow-hidden animate-pulse"
            >
              <div className="h-[180px] bg-surface-container-lowest/40" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-surface-container-highest/30 rounded w-1/3" />
                <div className="h-4 bg-surface-container-highest/40 rounded w-5/6" />
                <div className="h-4 bg-surface-container-highest/40 rounded w-2/3" />
                <div className="h-3 bg-surface-container-highest/20 rounded w-full mt-3" />
                <div className="h-3 bg-surface-container-highest/20 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Articles() {
  const articles: MediumArticle[] = await fetchMediumArticles();

  return (
    <section id="articles" className="relative py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <ArticlesHeader />
      <ArticlesScroller
        articles={articles}
        profileUrl={mediumProfileUrl}
      />
    </section>
  );
}
