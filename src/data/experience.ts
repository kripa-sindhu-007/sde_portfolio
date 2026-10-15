export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate?: string;
  status: "active" | "completed";
  description: string;
  bullets: string[];
  techStack: string[];
  icon: string;
}

export const experiences: Experience[] = [
  {
    id: "beatroute",
    role: "Software Engineer",
    company: "BeatRoute Innovation",
    location: "Gurugram, India",
    period: "May 2025 — Present",
    startDate: "2025-05-01",
    status: "active",
    description:
      "Building multi-tenant analytics and AI features for a SaaS platform: the self-serve Report Builder (Angular 20 UI plus a Cube.js semantic layer) and a React AI copilot.",
    bullets: [
      "Own the self-serve Report Builder end to end: the Angular 20 UI and the Cube.js semantic layer behind it",
      "Model and extend a 73-cube Cube.js semantic layer over a dbt-built multi-tenant PostgreSQL warehouse",
      "Profiled client-side aggregation: grid-state reads cut from 800,000 to 1 per pass and 100,000-row reports from a tab crash to 2.8 s (optimisation study)",
      "Shipped the React 19 + WebSocket AI copilot's report-building surface: multi-table artifacts, cancellation and reply recovery",
      "Hardened multi-tenant analytics correctness and extended a TypeScript/Express + MongoDB Tally ERP sync broker",
      "Built EU/US multi-region bundles and CI deploys; authored 188 Jasmine/Karma spec files (~1,970 cases)",
    ],
    techStack: ["Angular", "React", "TypeScript", "Cube.js", "PostgreSQL", "Node.js"],
    icon: "work",
  },
  {
    id: "iiitg",
    role: "B.Tech in Computer Science & Engineering",
    company: "IIIT Guwahati",
    location: "Assam, India",
    period: "Dec 2021 — Apr 2025",
    status: "completed",
    description:
      "Graduated with a focus on systems programming, distributed computing, and full-stack development. Published research in Springer Nature.",
    bullets: [
      "GATE CSE 2024 & 2025 — top 5% nationwide, strong CS fundamentals",
      "LeetCode Knight rank with 1000+ problems solved, peak rating 1914",
      "Co-authored EV-GREEN paper published in Computing (Springer Nature), Vol. 108",
      "Built distributed systems and full-stack projects with Go, Next.js, Redis, and Docker",
    ],
    techStack: ["Go", "Python", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    icon: "school",
  },
];
