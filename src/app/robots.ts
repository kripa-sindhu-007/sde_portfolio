import type { MetadataRoute } from "next";
import { SITE_URL, SITE_HOST } from "@/lib/site";

/**
 * Everything is crawlable. The resume is kept out of the index by an
 * X-Robots-Tag header in next.config.ts rather than a rule here — the hero
 * links to /resume, and a URL that is disallowed but linked can still surface
 * as a bare result with no title. Disallow stops crawling; noindex stops
 * indexing, and only the second one is what we actually want.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  };
}
