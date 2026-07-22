"use client";

import { motion } from "framer-motion";
import { RARITY_COLORS } from "@/lib/flames";
import type { FlameReveal } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function HeavenlyFlameCard({
  flame,
  delay = 0,
}: {
  flame: FlameReveal;
  delay?: number;
}) {
  const color = RARITY_COLORS[flame.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl p-6"
      style={{
        border: `1px solid ${color}66`,
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        boxShadow: `0 0 60px -18px ${color}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* animated flame aura */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${color}, transparent 70%)`,
        }}
      />

      {/* floating embers */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute bottom-2 h-1 w-1 rounded-full"
          style={{ left: `${12 + i * 15}%`, background: color }}
          animate={{ y: [0, -80], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color, background: `${color}1f`, border: `1px solid ${color}55` }}
          >
            {flame.rarity}
          </span>
          <span className="font-display text-sm font-bold text-slate-300">
            Rank #{flame.rank}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl"
            style={{ background: `${color}22`, boxShadow: `0 0 30px -6px ${color}` }}
          >
            🔥
          </motion.div>
          <div>
            <h4 className="font-display text-xl font-bold leading-tight text-white">
              {flame.name}
            </h4>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color }}>
              Heavenly Flame
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {flame.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Power Level" value={formatNumber(flame.powerLevel)} color={color} />
          <Stat label="Compatibility" value={`${flame.compatibility}%`} color={color} />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10">
      <div className="font-display text-lg font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
    </div>
  );
}
