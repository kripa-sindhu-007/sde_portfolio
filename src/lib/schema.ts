import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { toISODate, type Frontmatter } from "@/blog-kit/lib/frontmatter";

/**
 * JSON-LD, built around one Person node with a stable @id.
 *
 * The point is entity resolution, not decoration. "Kripa Sindhu" is shared with
 * 40+ LinkedIn profiles, a published CV researcher, and a Sanskrit term, so a
 * page that merely *says* the name settles nothing. `sameAs` is how Google
 * decides which of them this site belongs to: a set of profiles that already
 * corroborate each other and point back here.
 *
 * Every page repeats the Person node rather than only referencing @id across
 * pages. Cross-document @id resolution is not guaranteed, and a node that fails
 * to resolve is worth less than one stated twice.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Profiles that corroborate the identity. Every one verified to resolve.
 *  Order is deliberate: highest-authority first. */
const SAME_AS = [
  "https://github.com/kripa-sindhu-007",
  "https://www.linkedin.com/in/kripasindhu007",
  "https://medium.com/@sindhukripa007",
  "https://dev.to/kripasindhu007",
  "https://www.npmjs.com/~kripa006",
  "https://link.springer.com/article/10.1007/s00607-026-01625-0",
];

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Kripa Sindhu",
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: "Software Engineer",
  description:
    "Software engineer building distributed systems, AI-adjacent tooling, and the occasional open-source library. Published in Computing (Springer, 2026).",
  worksFor: {
    "@type": "Organization",
    name: "BeatRoute Innovation",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressCountry: "IN",
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology Guwahati",
    sameAs: "https://www.iiitg.ac.in/",
  },
  knowsAbout: [
    "Distributed Systems",
    "Go",
    "TypeScript",
    "Angular",
    "Next.js",
    "PostgreSQL",
    "Redis",
    "Web Performance",
    "Feature Flags",
  ],
  sameAs: SAME_AS,
};

/** No `image` on the Person: there is no portrait in the repo, and a generated
 *  OG card is not a photo of a human. An absent property beats a wrong one. */

export function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Kripa Sindhu",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "Kripa Sindhu — Software Engineer",
        isPartOf: { "@id": WEBSITE_ID },
        // says "this page is *about* that person" — the association the
        // namesake problem actually needs
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}

export function blogIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "Writing — Kripa Sindhu",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      breadcrumb([{ name: "Home", url: SITE_URL }, { name: "Writing" }]),
    ],
  };
}

export function articleSchema({
  slug,
  fm,
  body,
}: {
  slug: string;
  fm: Frontmatter;
  body: string;
}) {
  const url = `${SITE_URL}/blog/${slug}`;
  const published = toISODate(fm.created);

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        headline: fm.title,
        description: fm.deck,
        datePublished: published,
        // nothing tracks edits yet, so this is honest rather than invented
        dateModified: published,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        inLanguage: "en",
        keywords: fm.topics?.join(", "),
        wordCount: countWords(body),
        ...(fm.cover
          ? { image: [`${SITE_URL}/blog/${slug}/${fm.cover}-dark.png`] }
          : {}),
      },
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Writing", url: `${SITE_URL}/blog` },
        { name: fm.title },
      ]),
    ],
  };
}

/** The last crumb carries no `item` — it is the current page, and pointing a
 *  breadcrumb at itself is what trips the "invalid item" warning. */
function breadcrumb(trail: Array<{ name: string; url?: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };
}

/** Matches readingTime's definition of a word so the two never disagree. */
function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}
