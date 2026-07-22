"use client";

import { motion, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

/**
 * The centrepiece hero visual: a floating Heavenly Flame orb wrapped in
 * counter-rotating energy rings, reacting subtly to the pointer.
 */
export function FloatingFlame() {
  const { x, y } = useMouseParallax();
  const tx = useTransform(x, [-1, 1], [-24, 24]);
  const ty = useTransform(y, [-1, 1], [-18, 18]);

  return (
    <motion.div
      style={{ x: tx, y: ty }}
      className="relative mx-auto grid h-[300px] w-[300px] place-items-center sm:h-[380px] sm:w-[380px]"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />

      {/* Rotating energy rings */}
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-gold/30 [box-shadow:0_0_50px_-10px_rgba(255,215,0,0.5)_inset]" />
      <div
        className="absolute inset-6 rounded-full border-2 border-dashed border-energy/40"
        style={{ animation: "spin-slow 26s linear infinite reverse" }}
      />
      <motion.div
        className="absolute inset-12 rounded-full border-t-2 border-cultivation/70"
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-20 rounded-full border-b-2 border-flame/70"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Core */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-32 w-32 place-items-center rounded-full text-6xl sm:h-40 sm:w-40 sm:text-7xl"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, #fff 0%, #ffe08a 30%, #ff9a3c 60%, #7a1500 100%)",
          boxShadow:
            "0 0 80px rgba(255,154,60,0.7), 0 0 140px rgba(239,68,68,0.4)",
        }}
      >
        <span className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">🔥</span>
      </motion.div>
    </motion.div>
  );
}
