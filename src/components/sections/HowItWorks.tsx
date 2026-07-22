"use client";

import { motion, type Variants } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    icon: "✍️",
    title: "Masukkan Namamu",
    body: "Tuliskan nama kultivasimu. Nama itu menjadi benih takdir — langit membacanya sebagai satu jiwa yang unik.",
  },
  {
    icon: "🌀",
    title: "Nyalakan Array",
    body: "Array spiritual berputar dan memindai kedalaman Dou Qi-mu, mengukur bakat serta potensi yang tersembunyi.",
  },
  {
    icon: "🎴",
    title: "Terima Takdirmu",
    body: "Saksikan reveal sinematik takdirmu, lalu simpan sebagai kartu dan bagikan tautannya kepada sesama kultivator.",
  },
];

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.12 },
  }),
};

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Tiga Langkah Menuju Takdir"
          subtitle="Tanpa pendaftaran, tanpa kerumitan — hanya kau, sebuah nama, dan api yang menunggu untuk mengungkap jalanmu."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <GlassCard className="group h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold/20 to-flame/20 text-2xl ring-1 ring-gold/25">
                    {step.icon}
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-gold/80">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.body}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
