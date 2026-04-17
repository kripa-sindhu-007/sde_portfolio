export interface MediumArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  formattedDate: string;
  categories: string[];
  thumbnail: string | null;
  excerpt: string;
  readingTimeMin: number;
}

const FEED_URL = "https://medium.com/feed/@sindhukripa007";
const PROFILE_URL = "https://medium.com/@sindhukripa007";

function pickTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`);
  const m = xml.match(re);
  return m ? m[1] : "";
}

function pickAllTag(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "g");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

function unwrapCdata(s: string): string {
  const trimmed = s.trim();
  const m = trimmed.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (m ? m[1] : trimmed).trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImgSrc(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function slugFromLink(link: string, idx: number): string {
  try {
    const u = new URL(link);
    const last = u.pathname.split("/").filter(Boolean).pop() ?? `article-${idx}`;
    return last.slice(0, 80);
  } catch {
    return `article-${idx}`;
  }
}

function parseFeed(xml: string): MediumArticle[] {
  const items = pickAllTag(xml, "item");
  return items.map((raw, idx) => {
    const title = unwrapCdata(pickTag(raw, "title"));
    const link = unwrapCdata(pickTag(raw, "link"));
    const pubDate = unwrapCdata(pickTag(raw, "pubDate"));
    const categories = pickAllTag(raw, "category").map(unwrapCdata);
    const content = unwrapCdata(pickTag(raw, "content:encoded"));

    return {
      id: slugFromLink(link, idx),
      title,
      link,
      pubDate,
      formattedDate: formatDate(pubDate),
      categories,
      thumbnail: firstImgSrc(content),
      excerpt: stripHtml(content).slice(0, 220),
      readingTimeMin: estimateReadingTime(content),
    };
  });
}

export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://medium.com/@sindhukripa007)",
        Accept: "application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml);
  } catch {
    return [];
  }
}

export const mediumProfileUrl = PROFILE_URL;
