import { themeInitScript } from "@/blog-kit/theme";
import "@/blog-kit/article.css";
import "./blog.css";

/**
 * The blog is the only themeable part of the site (D8). The portfolio stays a
 * deliberate dark showpiece; light-ifying its hero, glow and illustrations is a
 * separate redesign.
 *
 * article.css is imported here rather than in the root layout so it only loads
 * on /blog routes and cannot touch the portfolio's tokens.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* blocking, before first paint — otherwise the wrong theme flashes */}
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <div className="blog-root">{children}</div>
    </>
  );
}
