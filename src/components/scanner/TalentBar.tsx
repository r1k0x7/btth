"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

export function TalentBar({ talent }: { talent: number }) {
  const value = useCountUp(talent, true, 1600);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Talent Rating
        </span>
        <span className="font-display text-2xl font-bold text-gold tabular-nums">
          {value}
          <span className="text-sm text-slate-500">/100</span>
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${talent}%` }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #38bdf8, #8b5cf6 55%, #ffd700)",
            boxShadow: "0 0 18px rgba(139,92,246,0.6)",
          }}
        />
      </div>
    </div>
  );
}
