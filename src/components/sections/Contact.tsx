"use client";

import { motion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/kripa-sindhu-007",
    icon: SiGithub,
    handle: "@kripa-sindhu-007",
    description: "Open source & projects",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kripasindhu007",
    icon: FaLinkedinIn,
    handle: "kripasindhu007",
    description: "Professional network",
  },
  {
    label: "Email",
    href: "mailto:sindhukripa007@gmail.com",
    icon: HiOutlineMail,
    handle: "sindhukripa007@gmail.com",
    description: "Direct communication",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative pt-24 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Top divider line */}
      <div className="px-6 md:px-16 lg:px-24 mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent origin-center"
        />
      </div>

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-surface-container-high/50 rounded-md border border-outline-variant/10">
            <span className="w-1 h-1 rounded-full bg-green-400" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-green-400 uppercase">
              ssh connect --open
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-[-0.04em] text-on-surface mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-on-surface-variant/50 font-body text-lg leading-relaxed">
            Open to opportunities, collaborations, and conversations about
            distributed systems, frontend engineering, or anything that ships
            great software.
          </p>
        </motion.div>

        {/* Connection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mb-24">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-surface-container-low/50 backdrop-blur-xl rounded-xl border border-outline-variant/8 overflow-hidden hover:border-primary/25 transition-all duration-300 cursor-pointer"
              >
                {/* Top accent */}
                <div className="h-[1px] bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-300" />

                <div className="p-5">
                  {/* Icon + label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest/40 border border-outline-variant/8 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/15 transition-all duration-300">
                      <Icon className="w-4.5 h-4.5 text-on-surface-variant/40 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/15 group-hover:text-primary/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                      arrow_outward
                    </span>
                  </div>

                  {/* Details */}
                  <h3 className="font-headline font-bold text-sm text-on-surface tracking-tight mb-0.5">
                    {social.label}
                  </h3>
                  <p className="font-mono text-[10px] text-on-surface-variant/50 tracking-wider mb-2">
                    {social.description}
                  </p>
                  <p className="font-mono text-[11px] text-primary/50 group-hover:text-primary/80 transition-colors duration-300 truncate">
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="border-t border-outline-variant/8 pt-8 pb-4"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left — branding */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-display text-sm font-bold tracking-[-0.02em] text-on-surface/60">
                ENGINEER_ATELIER
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant/25">
                //
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant/25 tracking-wider">
                v2.0.4
              </span>
            </div>

            {/* Center — status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant/50 tracking-wider">
                  All systems operational
                </span>
              </div>
              <span className="hidden md:inline font-mono text-[10px] text-on-surface-variant/15">
                |
              </span>
              <span className="hidden md:inline font-mono text-[10px] text-on-surface-variant/25 tracking-wider">
                Built with Next.js + Tailwind
              </span>
            </div>

            {/* Right — copyright */}
            <div className="font-mono text-[10px] text-on-surface-variant/25 tracking-wider">
              &copy; {new Date().getFullYear()} Kripa Sindhu
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
