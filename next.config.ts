import type { NextConfig } from "next";
import { RESUME_FILE } from "./src/lib/resume";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/resume", destination: RESUME_FILE },
      { source: "/resume.pdf", destination: RESUME_FILE },
      { source: "/cv", destination: RESUME_FILE },
      { source: "/cv.pdf", destination: RESUME_FILE },
    ];
  },

  async redirects() {
    // The pre-2026-09 address is already out in sent applications.
    return [
      {
        source: "/Kripa_Sindhu_SDE1.pdf",
        destination: "/resume",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(resume|cv)(.pdf)?",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Kripa_Sindhu_SDE1.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
