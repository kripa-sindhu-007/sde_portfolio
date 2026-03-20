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
      "A full-stack feature flag management platform with a Go backend (Chi router), Next.js 16 dashboard, and a client SDK — enabling dynamic feature rollouts across distributed services.",
    longDescription:
      "Architected a production-grade feature flag platform from scratch. The Go backend uses a clean layered architecture (Handler → Service → Repository) with PostgreSQL persistence and Redis caching. Real-time flag propagation is handled via Server-Sent Events (SSE) with Redis pub/sub, achieving sub-second update delivery across horizontally scaled instances. The deterministic percentage rollout engine uses FNV-1a hashing, ensuring consistent feature exposure for the same user across Go and TypeScript runtimes with O(1) local evaluation. The Next.js 16 dashboard provides a management UI for creating, toggling, and monitoring flags. Includes role-based API key authentication and containerized deployment via Docker Compose.",
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
      "A distributed task processing system with a Go backend, Redis-backed priority queue, and Next.js real-time dashboard — visualizing the full task lifecycle from scheduling to dead-letter handling.",
    longDescription:
      "Built a complete distributed task processing system that demonstrates production-grade patterns. The Go backend implements a concurrent worker pool using goroutines and sync.WaitGroup with graceful shutdown via OS signal trapping and context cancellation, ensuring safe in-flight task completion during deployments. The priority queue leverages Redis sorted sets for O(log N) priority dequeue and atomic hash counters for thread-safe metrics. An exponential backoff retry engine (delay = min(2^retries × 1s, 60s)) with dead-letter queue isolation handles failure recovery. The Next.js 15 dashboard provides real-time visualization of the full task lifecycle — priority scheduling, concurrent execution, retry logic, and dead-letter handling. Containerized with multi-stage Docker builds and automated CI/CD via GitHub Actions for Docker Hub publishing with commit-SHA tagging.",
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
    id: "ai-travel-planner",
    title: "AI Travel Planner",
    tagline: "AI-powered trip planning for effortless travel",
    description:
      "An Android application that leverages AI to generate comprehensive travel plans. Users input destination, trip duration, travel type, and budget to receive personalized day-by-day itineraries.",
    longDescription:
      "A complete AI-integrated mobile application that takes user preferences — destination, number of days, travel style (family, couple, or friends), and budget constraints — and generates detailed day-by-day travel plans using AI capabilities. The app processes natural language inputs and returns structured itineraries with location recommendations, time estimates, and budget breakdowns. Features include saved trips for offline access, shareable plan exports, and budget optimization per day. Built with React Native for cross-platform compatibility and integrated with AI APIs for intelligent itinerary generation. The most starred repository in the profile, demonstrating real user adoption and practical utility.",
    techStack: [
      "React Native",
      "JavaScript",
      "AI APIs",
      "Android",
      "Firebase",
    ],
    highlights: [
      "AI-generated personalized itineraries based on travel style and budget",
      "Day-by-day plan breakdown with locations, timings, and cost estimates",
      "Most starred repository — real user adoption and engagement",
      "Shareable travel plans with offline access for saved trips",
      "Budget-aware optimization across the full trip duration",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/ai_travel_planner_app",
    category: "Mobile / AI",
    icon: "travel_explore",
    codePreview: [
      "const plan = await ai.generate({",
      "  dest: \"Tokyo\",",
      "  days: 5, budget: \"$$\"",
      "})",
    ],
  },
  {
    id: "http-server-js",
    title: "HTTP Server from Scratch",
    tagline: "Custom HTTP server built on raw TCP sockets",
    description:
      "A fully custom HTTP server implemented in JavaScript without any frameworks — handling raw TCP connections, HTTP parsing, routing, and response serialization from the ground up.",
    longDescription:
      "A deep-dive systems project that implements an HTTP/1.1 server from scratch using Node.js net module (raw TCP sockets). Instead of relying on Express or any HTTP framework, this server manually parses incoming TCP byte streams into HTTP requests — handling method extraction, URL parsing, header parsing, and body reading. It implements a custom routing system with path matching, serves static files with proper MIME type detection, and constructs HTTP responses byte-by-byte including status lines, headers, and content-length calculation. The project demonstrates low-level understanding of how the web actually works — the TCP handshake, HTTP protocol format, connection keep-alive, and chunked transfer encoding. An exercise in understanding what frameworks abstract away.",
    techStack: ["JavaScript", "Node.js", "TCP Sockets", "HTTP/1.1"],
    highlights: [
      "Raw TCP socket handling with Node.js net module — no HTTP framework",
      "Manual HTTP request parsing: method, URL, headers, and body extraction",
      "Custom routing system with path matching and static file serving",
      "Proper MIME type detection and HTTP response serialization",
      "Deep understanding of the HTTP protocol and what frameworks abstract away",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/http-server-js",
    category: "Systems / Networking",
    icon: "dns",
    codePreview: [
      "const conn = net.createServer()",
      "conn.on('data', parseHTTP)",
      "res.write('HTTP/1.1 200 OK')",
      "res.end(body)",
    ],
  },
  {
    id: "mern-project-cli",
    title: "MERN Project CLI",
    tagline: "One command to scaffold a full-stack MERN project",
    description:
      "A CLI tool that automates the creation of a complete MERN stack project — setting up an Express backend, React frontend, directory structure, Git initialization, and dependency installation in one command.",
    longDescription:
      "A developer tooling project that solves the repetitive boilerplate problem for MERN stack development. Running a single command scaffolds a production-ready project structure: an Express backend with organized routes, controllers, and middleware directories; a React frontend via create-react-app; shared configuration files; Git initialization with a proper .gitignore; and automatic dependency installation for both client and server. The CLI handles error cases gracefully — checking for existing directories, validating project names, and providing clear progress feedback during setup. Published as an npm package for easy global installation. Demonstrates understanding of CLI tooling, file system operations, child process management, and developer experience design.",
    techStack: [
      "JavaScript",
      "Node.js",
      "npm",
      "Express",
      "React",
      "CLI",
    ],
    highlights: [
      "Single-command full MERN stack scaffolding with proper directory structure",
      "Automated Git init, .gitignore, and dependency installation for both client and server",
      "Graceful error handling — directory validation, name checks, and progress feedback",
      "Published npm package for global CLI installation",
      "Child process management for running multiple setup tasks in sequence",
    ],
    githubUrl: "https://github.com/kripa-sindhu-007/mern-project-cli",
    category: "Developer Tooling",
    icon: "terminal",
    codePreview: [
      "$ npx create-mern-app myApp",
      ">> scaffolding backend...",
      ">> creating React frontend...",
      ">> installing dependencies...",
    ],
  },
];
