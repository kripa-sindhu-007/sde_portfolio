import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { getGitHubStats } from "@/lib/github";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Writing from "@/components/sections/Writing";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import BinaryTorch from "@/components/ui/BinaryTorch";
import BootScreen from "@/components/ui/BootScreen";
import ContextMenu from "@/components/ui/ContextMenu";
import ScrollBottom from "@/components/ui/ScrollBottom";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schema";

// Declared on the page rather than the root layout: a canonical in the layout is
// inherited, so any future route that forgot to set its own would claim to be
// the homepage.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default async function Home() {
  // fetched here rather than in the browser: one set of calls per
  // revalidation instead of three per visitor against a 60/hour IP limit
  const stats = await getGitHubStats();

  return (
    <div className="noise-overlay relative">
      <JsonLd data={homepageSchema()} />
      <BootScreen />
      <ContextMenu />
      <BinaryTorch />
      <Navbar />
      <main className="pt-16 min-h-screen relative z-[3]">
        <Hero stats={stats} />
        <Projects />
        <Writing />
        <Experience />
        <Publications />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <ScrollBottom />
    </div>
  );
}
