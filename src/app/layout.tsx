import type { Metadata } from "next";
import {
  Outfit,
  Space_Grotesk,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { themeInitScript } from "@/blog-kit/theme";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = SITE_URL;

const title = "Kripa Sindhu — Software Engineer";
const description =
  "Software engineer building distributed systems, AI-adjacent tooling, and the occasional open-source library. Published in Computing (Springer, 2026).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s // Kripa Sindhu",
  },
  description,
  applicationName: "Kripa Sindhu",
  authors: [{ name: "Kripa Sindhu", url: siteUrl }],
  creator: "Kripa Sindhu",
  keywords: [
    "Kripa Sindhu",
    "Software Engineer",
    "Portfolio",
    "Distributed Systems",
    "Go",
    "Next.js",
    "TypeScript",
    "Feature Flags",
    "EV Routing",
    "Open Source",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Kripa Sindhu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@sindhukripa007",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the blog's theme script sets data-theme and
    // colorScheme on <html> before React hydrates. That mismatch is deliberate.
    <html
      suppressHydrationWarning
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        {/* Mirrors the reader's stored blog theme onto <html> before first paint.
            Must be parser-inserted here — a script rendered inside a component
            never executes. Harmless off /blog: nothing there reads these. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Material Symbols, subsetted to the icons we actually use via icon_names,
            with the axes pinned to single values. The unsubsetted full-axis font is
            1.1 MB; this is ~7 KB. ADDING A NEW ICON MEANS ADDING IT TO icon_names IN
            BOTH URLS BELOW, or it renders as its ligature text.
            Still loaded non-render-blocking via the media swap; suppressHydrationWarning
            because the inline script flips media to "all" before React hydrates. */}
        {/* eslint-disable-next-line @next/next/google-font-display -- display=block is
            correct for an icon font: with swap the browser paints the ligature text
            ("arrow_forward") before the font arrives, which both looks broken and
            shifts layout. The subsetted font is ~7 KB, so the block period is tiny. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add_circle,arrow_back,arrow_forward,arrow_outward,article,auto_stories,bug_report,build,check_circle,close,code,code_blocks,content_copy,dashboard_customize,data_object,deployed_code,description,dns,download,emoji_events,flag,folder_special,hub,location_on,mail,menu_book,military_tech,neurology,open_in_full,open_in_new,palette,person,route,rss_feed,schedule,school,shield,speed,stacks,storage,swipe_left,terminal,travel_explore,undo,volume_up,work,work_history&display=block"
          media="print"
          data-media="all"
          suppressHydrationWarning
        />
        <noscript>
        {/* eslint-disable-next-line @next/next/google-font-display -- display=block is
            correct for an icon font: with swap the browser paints the ligature text
            ("arrow_forward") before the font arrives, which both looks broken and
            shifts layout. The subsetted font is ~7 KB, so the block period is tiny. */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add_circle,arrow_back,arrow_forward,arrow_outward,article,auto_stories,bug_report,build,check_circle,close,code,code_blocks,content_copy,dashboard_customize,data_object,deployed_code,description,dns,download,emoji_events,flag,folder_special,hub,location_on,mail,menu_book,military_tech,neurology,open_in_full,open_in_new,palette,person,route,rss_feed,schedule,school,shield,speed,stacks,storage,swipe_left,terminal,travel_explore,undo,volume_up,work,work_history&display=block"
          />
        </noscript>
      </head>
      <body className="min-h-screen antialiased cursor-default">
        {children}
        {/* Flip async-loaded stylesheets from media=print to media=all once HTML is parsed. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('link[data-media]').forEach(function(l){l.media=l.dataset.media;});",
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
