"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LORE } from "@/lib/lore";

export function LoreSection() {
  return (
    <section id="lore" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Codex"
          title="The World of Battle Through the Heavens"
          subtitle="A primer on the forces that shape the Dou Qi Continent — for those about to forge their own legend."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {LORE.map((entry, i) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className={
                "glass rounded-3xl p-6 sm:p-7 " +
                (i === LORE.length - 1 && LORE.length % 2 === 1
                  ? "md:col-span-2"
                  : "")
              }
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
                {entry.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {entry.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
