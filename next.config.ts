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
    // The PDF carries a phone number and a personal email. A phone number in
    // Google's cache is effectively permanent, so the resume is noindex'd —
    // via a header rather than a robots.txt disallow, because the hero links to
    // /resume and a disallowed-but-linked URL can still surface as a bare
    // result. Drop the `X-Robots-Tag` entries to let it index once the PDF
    // itself is cleaned up; "Kripa Sindhu resume" is a query worth owning.
    const noindex = {
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    };

    return [
      {
        source: "/(resume|cv)(.pdf)?",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Kripa_Sindhu_SDE1.pdf"',
          },
          noindex,
        ],
      },
      // the rewrite target, reachable directly
      { source: "/resume/:file*", headers: [noindex] },
    ];
  },
};

export default nextConfig;
