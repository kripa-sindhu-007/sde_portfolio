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
      "Building and scaling production SaaS applications, leading frontend architecture modernization and delivering flagship product features across 15+ countries.",
    bullets: [
      "Led migration of two production SaaS apps from Angular 14 to Angular 19 with zero downtime",
      "Designed a real-time chatbot interface using Angular & WebSockets for 15+ countries",
      "Architected the Report Builder module — the company's flagship feature for dynamic report configuration & visualization",
      "Co-developed an internal Angular UI component library adopted across multiple teams, reducing dev effort by 30%",
      "Built unit & integration testing framework with Jasmine/Karma achieving 90%+ code coverage",
      "Optimized SaaS analytics dashboard performance by fixing rendering bottlenecks and change detection patterns",
    ],
    techStack: ["Angular", "TypeScript", "WebSockets", "Jasmine", "Karma", "Docker"],
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
