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

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center pt-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold"
          >
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
            namamu, nyalakan array spiritual, dan biarkan api mengungkap alam
            kultivasi, bakat, serta Api Surgawimu.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="#scanner">
              <GlowButton>Pindai Kultivasiku</GlowButton>
            </Link>
            <Link href="/heavenly-flames">
              <GlowButton variant="ghost">Jelajahi Api Surgawi</GlowButton>
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400"
          >
            <div>
              <div className="font-display text-2xl font-bold text-white">12</div>
              Alam Kultivasi
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">23</div>
              Api Surgawi
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">∞</div>
              Takdir untuk Ditempa
            </div>
          </motion.div>
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
