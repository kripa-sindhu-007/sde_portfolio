# SDE Portfolio

Personal developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.  
Showcases selected projects, skills, experience, and publications using a clean, data-driven setup (`src/data/*`).

## Tech Stack
- **Framework:** Next.js
- **Language:** TypeScript
- **UI:** Tailwind CSS, React Icons, Motion
- **Video (optional):** Remotion (portfolio demo rendering)
- **Tooling:** ESLint

## Quick Start

### 1) Install
```bash
npm install
```

### 2) Run locally
```bash
npm run dev
```

Then open `http://localhost:3000`.

### 3) Build / start
```bash
npm run build
npm run start
```

## Where to edit content (important)
This portfolio is **data-driven**. Update these files to change what appears on the site:

- `src/data/projects.ts` — projects shown on the portfolio
- `src/data/skills.ts` — skills list
- `src/data/experience.ts` — experience timeline
- `src/data/publications.ts` — publications/articles
- `src/data/social.ts` — social/contact links

## Featured Projects (from `src/data/projects.ts`)
- **Feature Flag Platform** — Dynamic feature rollouts without redeployment  
  Tech: Go, Next.js, TypeScript, PostgreSQL, Redis, SSE, Docker  
  Repo: https://github.com/kripa-sindhu-007/feature-flag-system

- **Distributed Task Queue** — Priority scheduling with real-time monitoring  
  Tech: Go, Next.js, Redis, Docker, GitHub Actions, TypeScript  
  Repo: https://github.com/kripa-sindhu-007/task-queue-educational-dashboard

- **AI Travel Planner** — AI-powered trip planning for effortless travel  
  Tech: React Native, JavaScript, AI APIs, Android, Firebase  
  Repo: https://github.com/kripa-sindhu-007/ai_travel_planner_app

- **HTTP Server from Scratch** — Custom HTTP server built on raw TCP sockets  
  Tech: JavaScript, Node.js, TCP Sockets, HTTP/1.1  
  Repo: https://github.com/kripa-sindhu-007/http-server-js

- **MERN Project CLI** — One command to scaffold a full-stack MERN project  
  Tech: JavaScript, Node.js, npm, Express, React, CLI  
  Repo: https://github.com/kripa-sindhu-007/mern-project-cli

## Remotion (optional)
If you’re using the Remotion demo:

- Open Remotion Studio:
```bash
npm run remotion:studio
```

- Render the demo video:
```bash
npm run remotion:render
```

Output: `out/demo.mp4`

## Deployment
Deploy easily on **Vercel** (recommended for Next.js).  
After deploying, add the live URL to your GitHub repo “About” section.

## License
This project is for personal portfolio use. If you fork it, please replace the data in `src/data/*` with your own.
