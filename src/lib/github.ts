// Server-only by construction: this module is imported from a server component
// and uses fetch caching that has no meaning in the browser.
const USER = "kripa-sindhu-007";

export type UpstreamPR = {
  /** owner/name, e.g. open-feature/go-sdk */
  repo: string;
  /** the repository's stars, not this account's — context for the work, nothing more */
  stars: number;
  number: number;
  title: string;
  url: string;
  state: "merged" | "review";
};

export type UpstreamStats = {
  /** merged first, then the newest still in review */
  recent: UpstreamPR[];
  /** false when GitHub rate-limited us and `recent` is the cached copy below */
  live: boolean;
};

/**
 * Fetched on the server and cached for a day.
 *
 * Unauthenticated GitHub allows 60 requests/hour *per IP*, so anything the hero
 * needs is fetched here rather than in the browser: one set of calls per
 * revalidation regardless of traffic, nothing in the hero's critical path, and no
 * numbers arriving late to shift the layout.
 *
 * `-user:` is the term that makes this mean anything. Without it the search also
 * counts pull requests merged into this account's own repositories, which anyone
 * can do to themselves; with it, every row is work a maintainer elsewhere took.
 *
 * Stars are deliberately per-row rather than a ranked list of repositories. Any
 * ranking the API can express misrepresents: by stars, a one-line addition to
 * standard-schema's ecosystem list (3.6k) outranks four merged fixes in
 * open-feature/go-sdk (249).
 */
const DAY = 60 * 60 * 24;

/** Shown with a "cached" marker, never with the live indicator — see UpstreamCard. */
const FALLBACK: UpstreamPR[] = [
  {
    repo: "open-feature/go-sdk",
    stars: 249,
    number: 575,
    title: "return an empty flag metadata record on evaluate's early returns",
    url: "https://github.com/open-feature/go-sdk/pull/575",
    state: "merged",
  },
  {
    repo: "open-feature/go-sdk",
    stars: 249,
    number: 574,
    title: "resolve disabled flags without an error",
    url: "https://github.com/open-feature/go-sdk/pull/574",
    state: "merged",
  },
  {
    repo: "open-feature/go-sdk",
    stars: 249,
    number: 566,
    title: "return default value from ObjectValueDetails on abnormal execution",
    url: "https://github.com/open-feature/go-sdk/pull/566",
    state: "merged",
  },
  {
    repo: "go-git/go-git",
    stars: 7710,
    number: 2373,
    title: "keep locally held shallow boundaries reachable",
    url: "https://github.com/go-git/go-git/pull/2373",
    state: "review",
  },
];

type SearchItem = {
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
};

async function search(state: "merged" | "open"): Promise<SearchItem[] | null> {
  const q = `author:${USER}+type:pr+is:${state}+-user:${USER}`;
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=${q}&sort=created&order=desc&per_page=30`,
      { next: { revalidate: DAY } },
    );
    if (!res.ok) return null;
    return ((await res.json()) as { items: SearchItem[] }).items;
  } catch {
    return null;
  }
}

async function starsFor(repo: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: DAY },
    });
    if (!res.ok) return 0;
    return ((await res.json()) as { stargazers_count: number }).stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

/** repository_url is an API url; the owner/name pair is its last two segments */
function repoOf(repositoryUrl: string): string {
  return repositoryUrl.split("/").slice(-2).join("/");
}

/** Conventional-commit prefixes carry no meaning outside the repo they came from. */
function stripPrefix(title: string): string {
  return title
    .replace(/^(fix|feat|docs|chore|refactor|test)(\([^)]*\))?:\s*/, "")
    .replace(/\.?\s*Fixes #\d+\.?$/i, "");
}

export async function getUpstreamStats(): Promise<UpstreamStats> {
  const [merged, open] = await Promise.all([search("merged"), search("open")]);

  if (!merged?.length) return { recent: FALLBACK, live: false };

  // Merged work leads; one in-review row shows the pipeline is still moving.
  const picked = [
    ...merged.slice(0, 3).map((i) => ({ item: i, state: "merged" as const })),
    ...(open ?? []).slice(0, 1).map((i) => ({ item: i, state: "review" as const })),
  ];

  const repos = [...new Set(picked.map((p) => repoOf(p.item.repository_url)))];
  const stars = new Map(
    await Promise.all(repos.map(async (r) => [r, await starsFor(r)] as const)),
  );

  return {
    recent: picked.map(({ item, state }) => {
      const repo = repoOf(item.repository_url);
      return {
        repo,
        stars: stars.get(repo) ?? 0,
        number: item.number,
        title: stripPrefix(item.title),
        url: item.html_url,
        state,
      };
    }),
    live: true,
  };
}
