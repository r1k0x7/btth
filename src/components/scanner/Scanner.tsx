"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generateScan } from "@/lib/scan";
import type { ScanResult } from "@/lib/types";
import { ResultReveal } from "./ResultReveal";
import { ScanningAnimation } from "./ScanningAnimation";

type Phase = "idle" | "scanning" | "result";
const SCAN_MS = 3000;

export function Scanner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [name, setName] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScan = useCallback(() => {
    if (phase === "scanning") return;
    setPhase("scanning");
    timer.current = setTimeout(() => {
      setResult(generateScan(name));
      setPhase("result");
    }, SCAN_MS);
  }, [name, phase]);

  const scanAgain = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setResult(null);
    setPhase("idle");
  }, []);

  return (
    <section id="scanner" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Cultivation Scanner"
          title="Scan Your Cultivation"
          subtitle="Enter your cultivation name and let the spiritual array read the depth of your Dou Qi, your talent, and the flame that dwells within your soul."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <GlassCard strong glow="rgba(139,92,246,0.35)" className="min-h-[420px]">
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="flex flex-col items-center gap-6 py-10"
                >
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold/20 to-flame/20 text-4xl ring-1 ring-gold/30">
                    🔮
                  </div>
                  <div className="w-full max-w-md">
                    <label
                      htmlFor="cultivator-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                    >
                      Cultivator Name
                    </label>
                    <input
                      id="cultivator-name"
                      type="text"
                      value={name}
                      maxLength={28}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && startScan()}
                      placeholder="Enter your cultivation name..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <GlowButton onClick={startScan} className="mt-2">
                    Scan My Cultivation
                  </GlowButton>
                  <p className="text-xs text-slate-500">
                    Same name, same destiny — the heavens never lie twice.
                  </p>
                </motion.div>
              )}

              {phase === "scanning" && (
                <ScanningAnimation key="scanning" duration={SCAN_MS} />
              )}

              {phase === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResultReveal result={result} onScanAgain={scanAgain} />
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
