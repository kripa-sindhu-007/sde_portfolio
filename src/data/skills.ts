export interface SkillItem {
  name: string;
  iconKey: string;
}

export interface SkillStrip {
  label: string;
  materialIcon: string;
  items: SkillItem[];
  direction: "left" | "right";
}

export const skillStrips: SkillStrip[] = [
  {
    label: "Languages",
    materialIcon: "code",
    items: [
      { name: "Go", iconKey: "go" },
      { name: "Python", iconKey: "python" },
      { name: "JavaScript", iconKey: "javascript" },
      { name: "TypeScript", iconKey: "typescript" },
      { name: "C++", iconKey: "cplusplus" },
      { name: "Java", iconKey: "java" },
      { name: "SQL", iconKey: "sql" },
    ],
    direction: "left",
  },
  {
    label: "Frameworks",
    materialIcon: "dashboard_customize",
    items: [
      { name: "Angular", iconKey: "angular" },
      { name: "React.js", iconKey: "react" },
      { name: "Next.js", iconKey: "nextjs" },
      { name: "Node.js", iconKey: "nodejs" },
      { name: "Express.js", iconKey: "express" },
      { name: "RxJS", iconKey: "rxjs" },
      { name: "Tailwind CSS", iconKey: "tailwind" },
    ],
    direction: "right",
  },
  {
    label: "Infrastructure",
    materialIcon: "storage",
    items: [
      { name: "PostgreSQL", iconKey: "postgresql" },
      { name: "MongoDB", iconKey: "mongodb" },
      { name: "Redis", iconKey: "redis" },
      { name: "Firebase", iconKey: "firebase" },
      { name: "Docker", iconKey: "docker" },
      { name: "AWS", iconKey: "aws" },
      { name: "Linux", iconKey: "linux" },
    ],
    direction: "left",
  },
  {
    label: "Tooling",
    materialIcon: "build",
    items: [
      { name: "Git", iconKey: "git" },
      { name: "GitHub Actions", iconKey: "githubactions" },
      { name: "GitLab CI", iconKey: "gitlab" },
      { name: "Jasmine", iconKey: "jasmine" },
      { name: "Karma", iconKey: "karma" },
      { name: "Webpack", iconKey: "webpack" },
      { name: "Docker Compose", iconKey: "docker" },
    ],
    direction: "right",
  },
];
