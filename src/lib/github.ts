// Server-only by construction: this module is imported from a server component
// and uses fetch caching that has no meaning in the browser.
const USER = "kripa-sindhu-007";

export type GitHubStats = {
  repos: number;
  commits: number;
  /** every language across every public repo, not just each repo's primary one */
  languages: number;
  languageNames: string[];
  stars: number;
  /** whole years since the account was created */
  yearsOnGitHub: number;
  /** false when GitHub rate-limited us and the numbers are a fallback */
  live: boolean;
};

/**
 * Fetched on the server and cached for a day.
 *
 * This used to run in the browser on every visit. Unauthenticated GitHub allows
 * 60 requests/hour *per IP*, and the card made three per visitor, so a modest
 * burst of traffic exhausted the quota and everyone after that saw zeros. Doing
 * it here means one set of calls per revalidation regardless of traffic, no
 * fetch in the hero's critical path, and no numbers arriving late to shift the
 * layout.
 *
 * The budget also makes the language count honest: /languages per repo instead
 * of each repo's single primary language, which was hiding Go behind TypeScript
 * on both flagship projects.
 */
const DAY = 60 * 60 * 24;

const FALLBACK: GitHubStats = {
  repos: 13,
  commits: 1228,
  languages: 9,
  languageNames: [],
  stars: 6,
  yearsOnGitHub: 2,
  live: false,
};

async function gh<T>(path: string, accept?: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: accept ? { Accept: accept } : {},
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const [user, commitSearch, repos] = await Promise.all([
    gh<{ public_repos: number; created_at: string }>(`/users/${USER}`),
    gh<{ total_count: number }>(
      `/search/commits?q=author:${USER}&per_page=1`,
      "application/vnd.github.cloak-preview+json",
    ),
    gh<Array<{ name: string; fork: boolean; stargazers_count: number }>>(
      `/users/${USER}/repos?per_page=100&sort=updated`,
    ),
  ]);

  if (!user || !repos) return FALLBACK;

  const own = repos.filter((r) => !r.fork);
  const stars = own.reduce((n, r) => n + (r.stargazers_count ?? 0), 0);

  // one call per repo — affordable here, never on a visitor's machine
  const perRepo = await Promise.all(
    own.map((r) => gh<Record<string, number>>(`/repos/${USER}/${r.name}/languages`)),
  );
  const languages = new Set<string>();
  perRepo.forEach((langs) => {
    if (langs) Object.keys(langs).forEach((l) => languages.add(l));
  });

  const created = new Date(user.created_at);
  const years = Math.max(
    1,
    Math.floor((Date.now() - created.getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
  );

  return {
    repos: user.public_repos ?? FALLBACK.repos,
    commits: commitSearch?.total_count ?? FALLBACK.commits,
    languages: languages.size || FALLBACK.languages,
    languageNames: [...languages].sort(),
    stars,
    yearsOnGitHub: years,
    live: true,
  };
}
