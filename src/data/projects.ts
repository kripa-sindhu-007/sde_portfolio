export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  icon: string;
  codePreview: string[];
}

export const projects: Project[] = [
  {
    id: "feature-flag-system",
    title: "Feature Flag Platform",
    tagline: "Dynamic feature rollouts without redeployment",
    description:
      "A self-hosted feature flag platform with a Go backend (Chi router), Next.js dashboard, and client SDK — supporting percentage rollouts, targeted users, and real-time propagation via SSE.",
    longDescription:
      "A fully transparent alternative to LaunchDarkly / Flagsmith, built from scratch. The Go backend follows a clean layered architecture (Handler → Service → Repository) with PostgreSQL persistence and Redis caching. Real-time flag propagation is handled via Server-Sent Events backed by Redis pub/sub, achieving sub-second update delivery across horizontally scaled instances. The deterministic percentage rollout engine uses FNV-1a hashing, guaranteeing consistent feature exposure for the same user across Go and TypeScript runtimes with O(1) local evaluation. The Next.js dashboard provides a management UI for creating, toggling, and monitoring flags. Includes role-based API key authentication and containerized deployment via Docker Compose.",
    techStack: [
      "Go",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "SSE",
      "Docker",
    ],
    highlights: [
      "Real-time flag propagation via SSE + Redis pub/sub with sub-second delivery",
      "Deterministic percentage rollout using FNV-1a hashing — consistent across Go & TS runtimes",
      "Clean layered architecture: Handler → Service → Repository",
      "Role-based API key auth with PostgreSQL persistence and Redis caching",
      "Containerized deployment via Docker Compose with health-check dependencies",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/feature-flag-system",
    category: "Full-Stack / DevOps",
    icon: "flag",
    codePreview: [
      "flag := sdk.GetFlag(\"dark-mode\")",
      "if flag.IsEnabled(userID) {",
      "  render(NewDashboard)",
      "}",
    ],
  },
  {
    id: "task-queue-dashboard",
    title: "Distributed Task Queue",
    tagline: "Priority scheduling with real-time monitoring",
    description:
      "A visual, hands-on distributed task queue with Go workers, Redis-backed jobs, and a live Next.js dashboard — showing tasks flow through priority queues, retries, and dead-letter storage in real time.",
    longDescription:
      "A production-pattern distributed task processing system built for learning and demonstration. The Go backend implements a concurrent worker pool using goroutines and sync.WaitGroup with graceful shutdown via OS signal trapping and context cancellation, ensuring safe in-flight completion during deployments. The priority queue leverages Redis sorted sets for O(log N) priority dequeue, with atomic hash counters for thread-safe metrics. An exponential backoff retry engine (delay = min(2^retries × 1s, 60s)) with dead-letter queue isolation handles failure recovery. The Next.js dashboard visualizes the full task lifecycle — submission → delayed queue → ready queue → worker → outcome — with live counters, worker pulses, and a color-coded event stream. Shipped as multi-stage Docker images via GitHub Actions to Docker Hub with commit-SHA tagging.",
    techStack: [
      "Go",
      "Next.js",
      "Redis",
      "Docker",
      "GitHub Actions",
      "TypeScript",
    ],
    highlights: [
      "Concurrent worker pool with goroutines, WaitGroup, and graceful OS signal shutdown",
      "Redis sorted sets for O(log N) priority dequeue with atomic hash counters",
      "Exponential backoff retry engine with dead-letter queue isolation",
      "Multi-stage Docker builds with CI/CD via GitHub Actions and commit-SHA tagging",
      "Real-time dashboard visualizing the complete task lifecycle",
    ],
    githubUrl:
      "https://github.com/kripa-sindhu-007/task-queue-educational-dashboard",
    category: "Distributed Systems",
    icon: "hub",
    codePreview: [
      "queue.Push(task, priority: HIGH)",
      "worker.Process(ctx, pool: 8)",
      "retry.Backoff(2^n, max: 60s)",
      "dlq.Isolate(failed)",
    ],
  },
  {
    id: "prahari",
    title: "prahari",
    tagline: "Type-safe env config that can't quietly drift",
    description:
      "An npm-published TypeScript library that validates your entire environment once at boot and crashes with one readable report — plus a CLI that fails CI when .env.example stops matching the schema.",
    longDescription:
      "process.env.* is a bag of untyped strings an app trusts blindly, so a misconfigured deploy doesn't fail when you ship it — it fails later, in production, far from the cause. prahari turns those strings into a typed, validated, frozen config: port() infers number, oneOf([...]) infers a literal union, and every problem in the environment is reported at once in a single table with secrets redacted, at startup. The part no other env library has is the CLI — prahari sync diffs the schema against .env.example and exits 1 in CI, so the file physically cannot drift out of sync with reality. It is schema-agnostic via Standard Schema (bring your own Zod / Valibot / ArkType, or use the built-ins), ships framework boundary guards for Next.js and Vite that throw if a server secret is read from the browser, and the library import pulls in zero dependencies — the CLI's jiti loader never enters your app's runtime. Published to npm with signed provenance, >97% test coverage, and a public API frozen by contract tests.",
    techStack: [
      "TypeScript",
      "Node.js",
      "Standard Schema",
      "Vitest",
      "tsup",
      "npm",
      "CLI",
    ],
    highlights: [
      "prahari sync exits 1 in CI — .env.example cannot silently stop describing reality",
      "Validates the whole environment at boot: one readable table, every error at once, secrets redacted",
      "Full type inference — port() → number, oneOf([...]) → a literal union",
      "Schema-agnostic via Standard Schema: bring your own Zod / Valibot / ArkType",
      "Next.js & Vite boundary guards throw if a server secret is read in the browser",
      "Published to npm with signed provenance, zero-dependency import, >97% coverage",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/prahari",
    liveUrl: "https://prahari.kripasindhu.dev",
    category: "Open Source / Developer Tooling",
    icon: "shield",
    codePreview: [
      "const env = defineEnv({",
      "  PORT: port().default(3000),",
      "})  // env.PORT → number",
      "$ prahari sync  → exit 1",
    ],
  },
  {
    id: "ev-routing-green-v2g",
    title: "EV Routing with V2G",
    tagline: "Green-zone-aware routing for electric vehicles",
    description:
      "Published research implementing heuristic and exact routing algorithms for electric vehicles, with green-zone prioritization, charging infrastructure, and Vehicle-to-Grid (V2G) incentives.",
    longDescription:
      "A research project comparing five routing strategies for electric vehicles on urban road networks: an Ant Colony Optimization heuristic biased toward green-zone edges with V2G incentives and intelligent charging station management; Bellman-Ford eco-routing weighted by energy consumption; Dijkstra-based shortest-path and fastest-path baselines; and a CRPTC cost-based router using Mixed Integer Linear Programming (via Gurobi / PuLP). Energy consumption uses the physics-based model from De Nunzio et al. (2016), and network simulation incorporates charging infrastructure, green zones, and V2G-enabled stations. The work was peer-reviewed and published in Computing (Springer, 2026).",
    techStack: [
      "Python",
      "NumPy",
      "NetworkX",
      "Gurobi",
      "PuLP",
      "Folium",
      "Jupyter",
    ],
    highlights: [
      "Published in Computing (Springer, 2026) — DOI 10.1007/s00607-026-01625-0",
      "ACO heuristic with green-zone bias, V2G incentives, and charging-station logic",
      "MILP formulation via Gurobi / PuLP for cost-optimal routing under traffic prediction",
      "Physics-based energy consumption model (De Nunzio et al., 2016)",
      "Comparative analysis against shortest-path, fastest-path, and eco-routing baselines",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/ev-routing-green-v2g",
    liveUrl:
      "https://link.springer.com/article/10.1007/s00607-026-01625-0",
    category: "Research / Optimization",
    icon: "route",
    codePreview: [
      "graph = build_network(zones, chargers)",
      "route = aco.optimize(",
      "  bias='green', v2g=True",
      ")",
    ],
  },
  {
    id: "404-lib",
    title: "404-UI",
    tagline: "Animated 404 pages for React, Vue, and vanilla JS",
    description:
      "An open-source npm package of animated 404 error pages with framework-specific entry points for React, Vue, and vanilla JavaScript — built with TypeScript and Tailwind.",
    longDescription:
      "A framework-agnostic UI library that turns dead ends into moments of delight. Published as @kripa006/404-ui on npm, it ships separate, tree-shakable entry points for React, Vue, and vanilla JavaScript so consumers import only the adapter they need. Templates are built with Tailwind CSS, are keyboard-accessible and semantically marked up, and ship with full TypeScript definitions. The project includes an Astro-powered documentation site with a live gallery, a Vite-based build pipeline producing framework-specific bundles, and supports dark mode out of the box. A small but end-to-end exercise in library authoring: public API design, multi-target builds, docs tooling, and npm publishing.",
    techStack: [
      "TypeScript",
      "React",
      "Vue",
      "Astro",
      "Tailwind CSS",
      "Vite",
      "npm",
    ],
    highlights: [
      "Published to npm as @kripa006/404-ui with tree-shakable framework adapters",
      "Separate entry points for React, Vue, and vanilla JS — pick only what you use",
      "Full TypeScript definitions bundled; Tailwind-powered theming; dark mode ready",
      "Astro documentation site with live gallery of 404 templates",
      "Multi-target build pipeline producing framework-specific bundles",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/404_lib",
    liveUrl: "https://kripa-sindhu-007.github.io/404_lib/",
    category: "Open Source / UI",
    icon: "deployed_code",
    codePreview: [
      "import { Space404 } from",
      "  '@kripa006/404-ui/react'",
      "",
      "<Space404 onHome={goHome} />",
    ],
  },
];
