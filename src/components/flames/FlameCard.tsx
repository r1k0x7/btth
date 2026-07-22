"use client";

import { motion } from "framer-motion";
import { RARITY_COLORS, RARITY_LABELS } from "@/lib/flames";
import type { HeavenlyFlame } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function FlameCard({ flame }: { flame: HeavenlyFlame }) {
  const color = RARITY_COLORS[flame.rarity];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl p-6"
      style={{
        border: `1px solid ${color}55`,
        background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        boxShadow: `0 0 50px -24px ${color}`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
        style={{ background: color }}
      />
      <div className="relative flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl text-2xl" style={{ background: `${color}22` }}>
          🔥
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-black text-white">
            #{flame.rank}
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color }}
          >
            {RARITY_LABELS[flame.rarity]}
          </span>
        </div>
      </div>

      <h3 className="relative mt-4 font-display text-lg font-bold leading-tight text-white">
        {flame.name}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400">
        {flame.description}
      </p>

      <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
          Kekuatan
        </span>
        <span className="font-display text-lg font-bold" style={{ color }}>
          {formatNumber(flame.powerLevel)}
        </span>
      </div>
    </motion.article>
  );
}
