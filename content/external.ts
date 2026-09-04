/**
 * Writing published elsewhere.
 *
 * Listed on the blog index so it shows the whole body of work, but never
 * republished here: those articles are already indexed with Medium as their
 * canonical, and the task-queue one is the standing first-comment link on the
 * LinkedIn series. Duplicating the text would split the URL for no gain.
 *
 * Excluded from RSS on purpose — a feed pointing at another domain is not
 * what someone subscribes for.
 */
export type ExternalPost = {
  title: string;
  url: string;
  platform: string;
  date: string;
  deck: string;
  topics: string[];
};

export const externalPosts: ExternalPost[] = [
  {
    title: "I Took My Task Queue From a Demo to a Distributed System",
    url: "https://medium.com/@sindhukripa007/i-took-my-task-queue-from-a-demo-to-a-distributed-system-e2ff90db3186",
    platform: "Medium",
    date: "2026-08-16",
    deck: "Leases, reapers and owner fencing — what it takes to survive kill -9 without losing work.",
    topics: ["distributed-systems", "go", "redis"],
  },
  {
    title: "10 TypeScript Pitfalls That Look Correct (But Aren't)",
    url: "https://medium.com/@sindhukripa007/10-typescript-pitfalls-that-look-correct-but-arent-part1-c465feb8aee4",
    platform: "Medium",
    date: "2026-04-17",
    deck: "Type-level mistakes that compile cleanly and still bite you at runtime.",
    topics: ["typescript"],
  },
  {
    title: "I Built a Distributed Task Queue From Scratch to Actually Understand How They Work",
    url: "https://medium.com/@sindhukripa007/i-built-a-distributed-task-queue-from-scratch-to-actually-understand-how-they-work-37fa0452ff9b",
    platform: "Medium",
    date: "2026-03-04",
    deck: "Priority queues, retries and dead letters, built the slow way on purpose.",
    topics: ["distributed-systems", "go", "redis"],
  },
];
