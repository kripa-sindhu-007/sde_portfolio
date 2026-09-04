import "@/blog-kit/article.css";
import "./blog.css";

/**
 * The blog is the only themeable part of the site (D8). The portfolio stays a
 * deliberate dark showpiece; light-ifying its hero, glow and illustrations is a
 * separate redesign.
 *
 * article.css is imported here rather than in the root layout so it only loads
 * on /blog routes and cannot touch the portfolio's tokens. That scoping also
 * carries `color-scheme`, so the portfolio keeps its dark scrollbars.
 *
 * The anti-flash script lives in the ROOT layout's <head>: a <script> returned
 * from a component is DOM-inserted, and browsers never execute those.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-root">{children}</div>
  );
}
