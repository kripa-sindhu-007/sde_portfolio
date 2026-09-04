import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
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

export default function Home() {
  return (
    <div className="noise-overlay relative">
      <BootScreen />
      <ContextMenu />
      <BinaryTorch />
      <Navbar />
      <main className="pt-16 min-h-screen relative z-[3]">
        <Hero />
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
