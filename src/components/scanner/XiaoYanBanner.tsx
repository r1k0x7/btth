"use client";

import { motion } from "framer-motion";

/** Legendary title banner shown for a destined successor of Xiao Yan. */
export function XiaoYanBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-gold/50 p-6 text-center"
      style={{
        background:
          "linear-gradient(120deg, rgba(255,215,0,0.12), rgba(239,68,68,0.1))",
        boxShadow: "0 0 80px -20px rgba(255,215,0,0.8)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 30%, rgba(255,215,0,0.35) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
      />
      <div className="relative">
        <div className="mb-2 text-4xl">🐉</div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          Pencapaian Eksklusif Terbuka
        </p>
        <h3 className="mt-2 font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
          Penerus Takdir Xiao Yan
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
          Aura naga emas melingkari jiwamu. Langit sendiri mengakuimu sebagai
          pewaris Sang Kaisar Api — sebuah legenda yang sedang lahir.
        </p>
      </div>
    </motion.div>
  );
}
