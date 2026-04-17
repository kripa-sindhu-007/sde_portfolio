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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sde-portfolio-lemon-phi.vercel.app";

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
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Material Symbols — loaded non-render-blocking via media swap.
            suppressHydrationWarning: the inline script below flips media to
            "all" before React hydrates, which would otherwise cause a mismatch. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          media="print"
          data-media="all"
          suppressHydrationWarning
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
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
