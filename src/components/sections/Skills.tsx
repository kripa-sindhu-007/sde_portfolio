"use client";

import { motion } from "motion/react";
import { skillStrips, type SkillStrip, type SkillItem } from "@/data/skills";
import { type IconType } from "react-icons";
import {
  SiGo,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiReactivex,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithubactions,
  SiGitlab,
  SiJasmine,
  SiWebpack,
  SiNpm,
} from "react-icons/si";
import { FaJava, FaDatabase, FaAws } from "react-icons/fa";
import { VscBeaker } from "react-icons/vsc";

/* ── Icon map ── */
const iconMap: Record<string, IconType> = {
  go: SiGo,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  cplusplus: SiCplusplus,
  java: FaJava,
  sql: FaDatabase,
  angular: SiAngular,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  rxjs: SiReactivex,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  firebase: SiFirebase,
  docker: SiDocker,
  aws: FaAws,
  linux: SiLinux,
  git: SiGit,
  githubactions: SiGithubactions,
  gitlab: SiGitlab,
  jasmine: SiJasmine,
  karma: VscBeaker,
  webpack: SiWebpack,
  npm: SiNpm,
};

/* ── Skill chip ── */
function SkillChip({ item }: { item: SkillItem }) {
  const Icon = iconMap[item.iconKey];

  return (
    <div className="flex items-center gap-2.5 px-5 py-3 rounded-lg border border-outline-variant/8 bg-surface-container-low/40 backdrop-blur-sm shrink-0 hover:border-primary/25 hover:bg-primary/[0.06] transition-all duration-300">
      {Icon ? (
        <Icon className="w-4 h-4 text-primary/50 shrink-0" />
      ) : (
        <span className="font-mono text-[10px] text-primary/30 select-none">
          //
        </span>
      )}
      <span className="font-label text-sm text-on-surface-variant/70 tracking-wide whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

/* ── Single marquee strip ── */
function MarqueeStrip({ strip, index }: { strip: SkillStrip; index: number }) {
  // Render items twice for seamless loop
  const set = [...strip.items, ...strip.items];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Category label */}
      <div className="flex items-center gap-2 mb-3 px-6 md:px-16 lg:px-24">
        <span className="material-symbols-outlined text-[14px] text-primary/40">
          {strip.materialIcon}
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-primary/50 uppercase">
          {strip.label}
        </span>
        <div className="flex-1 h-[1px] bg-outline-variant/8 ml-2" />
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className={`flex w-max gap-4 ${
            strip.direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }`}
          style={{ animationDuration: `${28 + index * 4}s` }}
        >
          {set.map((item, i) => (
            <SkillChip key={`${item.iconKey}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skills Section ── */
export default function Skills() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-[-5%] w-[400px] h-[400px] bg-tertiary/[0.02] blur-[140px] rounded-full pointer-events-none" />

      {/* Section header */}
      <div className="px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase">
              echo $STACK
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface">
            Tech Stack
          </h2>
          <p className="mt-3 text-on-surface-variant/50 font-body text-lg max-w-lg">
            The tools and technologies I work with daily — from low-level
            systems to polished frontends.
          </p>
        </motion.div>
      </div>

      {/* Marquee strips */}
      <div className="space-y-6">
        {skillStrips.map((strip, i) => (
          <MarqueeStrip key={strip.label} strip={strip} index={i} />
        ))}
      </div>
    </section>
  );
}
