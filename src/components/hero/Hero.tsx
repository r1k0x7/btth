"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { FloatingFlame } from "./FloatingFlame";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const HIGHLIGHTS = [
  { icon: "⚡", label: "Bakat & Potensi" },
  { icon: "🎴", label: "Kartu Takdir" },
  { icon: "🔒", label: "Deterministik" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
      {/* Soft ambient glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-glow shadow-gold/60" />
            斗破苍穹 · Battle Through the Heavens
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Dou Qi
            <br />
            <span className="heading-shimmer">Realm Scanner</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Temukan takdirmu di dunia Battle Through the Heavens. Masukkan
            namamu, nyalakan array spiritual, dan biarkan api mengungkap kedalaman
            kultivasi serta bakat yang bersemayam dalam jiwamu.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="#scanner">
              <GlowButton>Pindai Kultivasiku</GlowButton>
            </Link>
            <Link href="#cara-kerja">
              <GlowButton variant="ghost">Cara Kerja</GlowButton>
            </Link>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300"
          >
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
              >
                <span aria-hidden>{h.icon}</span>
                {h.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="animate-float-y"
        >
          <FloatingFlame />
        </motion.div>
      </div>
    </section>
  );
}
