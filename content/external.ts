/**
 * Writing published elsewhere — Medium and dev.to.
 *
 * Listed on the blog index so it shows the whole body of work, but never
 * republished here: those articles are already indexed with Medium as their
 * canonical, and the task-queue one is the standing first-comment link on the
 * LinkedIn series. Duplicating the text would split the URL for no gain.
 *
 * Excluded from RSS on purpose — a feed pointing at another domain is not
 * what someone subscribes for.
 *
 * NOTE the dev.to piece is currently its own canonical because it predates this
 * blog. When it is re-homed here, set canonical_url on dev.to to the blog URL
 * and move it out of this list.
 */
export type ExternalPost = {
  title: string;
  url: string;
  platform: string;
  date: string;
  deck: string;
  topics: string[];
  /** Lifted from the Medium RSS feed once. Static so the homepage does not have
   *  to fetch the feed just to show a thumbnail. Re-run the extraction if a
   *  cover changes upstream. */
  thumbnail?: string;
};

export const externalPosts: ExternalPost[] = [
  {
    title: "Your .env.example is lying to you: catching config drift in TypeScript",
    url: "https://dev.to/kripasindhu007/your-envexample-is-lying-to-you-catching-config-drift-in-typescript-2j7c",
    platform: "dev.to",
    date: "2026-09-02",
    deck: "A schema that generates your .env.example, and fails CI when the two disagree.",
    topics: ["typescript", "prahari", "config"],
    thumbnail:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fsrk7q8zox03cfpnujslv.png",
  },
  {
    title: "I Took My Task Queue From a Demo to a Distributed System",
    url: "https://medium.com/@sindhukripa007/i-took-my-task-queue-from-a-demo-to-a-distributed-system-e2ff90db3186",
    platform: "Medium",
    date: "2026-08-16",
    deck: "Leases, reapers and owner fencing — what it takes to survive kill -9 without losing work.",
    topics: ["distributed-systems", "go", "redis"],
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*tHLpBdOGEEK-hiDDExRVyQ.png",
  },
  {
    title: "10 TypeScript Pitfalls That Look Correct (But Aren't)",
    url: "https://medium.com/@sindhukripa007/10-typescript-pitfalls-that-look-correct-but-arent-part1-c465feb8aee4",
    platform: "Medium",
    date: "2026-04-17",
    deck: "Type-level mistakes that compile cleanly and still bite you at runtime.",
    topics: ["typescript"],
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*sIltMEX-Q7hk6rTyNW5fJw.png",
  },
  {
    title: "I Built a Distributed Task Queue From Scratch to Actually Understand How They Work",
    url: "https://medium.com/@sindhukripa007/i-built-a-distributed-task-queue-from-scratch-to-actually-understand-how-they-work-37fa0452ff9b",
    platform: "Medium",
    date: "2026-03-04",
    deck: "Priority queues, retries and dead letters, built the slow way on purpose.",
    topics: ["distributed-systems", "go", "redis"],
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*UaiLU7KeNJIUPx4HXIaDwg.png",
  },
];
