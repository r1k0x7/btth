"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TOP_CULTIVATORS } from "@/lib/cultivators";
import { formatNumber } from "@/lib/utils";

const MEDAL = ["🥇", "🥈", "🥉"];

export function TopCultivators() {
  return (
    <section id="cultivators" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Aula Para Legenda"
          title="Kultivator Teratas"
          subtitle="Sosok-sosok terkuat yang pernah menapaki Benua Dou Qi, diperingkat berdasarkan bobot kekuatan mereka."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {TOP_CULTIVATORS.map((c, i) => (
            <motion.div
              key={c.rank}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05] sm:p-5"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 text-xl font-bold ring-1 ring-white/10">
                {MEDAL[i] ?? `#${c.rank}`}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-display text-lg font-bold text-white">
                    {c.name}
                  </h3>
                  <span className="text-sm text-slate-500">{c.cn}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-gold">
                  {c.title} · {c.realm}
                </p>
                <p className="mt-1 hidden text-sm text-slate-400 sm:block">
                  {c.blurb}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-xl font-bold text-gradient-gold">
                  {formatNumber(c.power)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Kekuatan
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
