"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const R = 130;
const CIRC = 2 * Math.PI * R;

const MESSAGES = [
  "Menyalakan array spiritual",
  "Mendeteksi tanda Dou Qi",
  "Memetakan meridian",
  "Membaca persepsi jiwa",
  "Mencari Api Surgawi",
  "Menyusun takdirmu",
];

/** Full 3-second spiritual scanning sequence. */
export function ScanningAnimation({ duration = 3000 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const msgTimer = setInterval(
      () => setMsg((m) => (m + 1) % MESSAGES.length),
      duration / MESSAGES.length,
    );
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(msgTimer);
    };
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center py-6"
    >
      <div className="relative grid h-[300px] w-[300px] place-items-center">
        {/* particle burst */}
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold"
            initial={{ opacity: 0 }}
            animate={{
              x: Math.cos((i / 12) * Math.PI * 2) * [90, 150, 90][i % 3]!,
              y: Math.sin((i / 12) * Math.PI * 2) * [90, 150, 90][i % 3]!,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeOut",
            }}
          />
        ))}

        {/* rotating rings */}
        <div
          className="absolute inset-2 rounded-full border-2 border-dashed border-gold/40"
          style={{ animation: "spin-slow 8s linear infinite" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border-t-2 border-energy"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-16 rounded-full border-b-2 border-cultivation"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />

        {/* progress ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="scan-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
          <circle cx="150" cy="150" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="url(#scan-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress / 100)}
            style={{ filter: "drop-shadow(0 0 6px rgba(139,92,246,0.8))" }}
          />
        </svg>

        {/* pulsing core */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-28 w-28 place-items-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #fff, #ffe08a 30%, #ff9a3c 65%, #7a1500)",
            boxShadow: "0 0 60px rgba(255,154,60,0.7)",
          }}
        >
          <span className="font-display text-3xl font-bold text-void-900 tabular-nums">
            {progress}%
          </span>
        </motion.div>
      </div>

      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-energy">
        {MESSAGES[msg]}
        <span className="ml-0.5 animate-pulse">…</span>
      </p>
    </motion.div>
  );
}
