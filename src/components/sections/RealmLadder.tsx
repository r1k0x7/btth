"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REALMS } from "@/lib/realms";

export function RealmLadder() {
  return (
    <section id="realms" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Path of Dou Qi"
          title="Cultivation Realms"
          subtitle="Twelve realms stand between a mortal's first breath of Dou Qi and the throne of the Dou Di. Each is a world of its own."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REALMS.map((realm, i) => (
            <motion.div
              key={realm.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              style={{ boxShadow: `inset 0 0 0 1px transparent` }}
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: realm.color }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-3xl font-black"
                  style={{ color: realm.color, textShadow: `0 0 20px ${realm.color}66` }}
                >
                  {realm.cn}
                </span>
                <span className="font-display text-sm font-bold text-slate-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">{realm.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {realm.blurb}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {realm.levelType === "level"
                  ? "Levels 1–10"
                  : realm.levelType === "star"
                    ? "1–9 Stars"
                    : "Peak Realm"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
