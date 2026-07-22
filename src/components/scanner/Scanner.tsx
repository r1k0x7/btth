"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const runScan = useCallback((targetName: string) => {
    setPhase("scanning");
    timer.current = setTimeout(() => {
      setResult(generateScan(targetName));
      setPhase("result");
    }, SCAN_MS);
  }, []);

  const startScan = useCallback(() => {
    if (phase === "scanning") return;
    runScan(name);
  }, [name, phase, runScan]);

  const scanAgain = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setResult(null);
    setPhase("idle");
  }, []);

  // Deep link: `/?name=...` reproduces a shared destiny automatically.
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get("name");
    if (!shared) return;
    const trimmed = shared.slice(0, 28);
    setName(trimmed);
    runScan(trimmed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="scanner" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pemindai Kultivasi"
          title="Pindai Kultivasimu"
          subtitle="Masukkan nama kultivasimu dan biarkan array spiritual membaca kedalaman Dou Qi, bakat, serta api yang bersemayam di dalam jiwamu."
        />

        <div className="relative mx-auto mt-12 max-w-2xl">
          {/* Soft animated aura behind the card (blurred so it reads as a gentle glow). */}
          <div
            aria-hidden
            className="animate-spin-slower pointer-events-none absolute -inset-8 rounded-[48px] opacity-40 blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,215,0,0.35), rgba(139,92,246,0.35), rgba(56,189,248,0.35), rgba(239,68,68,0.3), rgba(255,215,0,0.35))",
            }}
          />
          <GlassCard
            strong
            glow="rgba(139,92,246,0.35)"
            className="relative min-h-[420px]"
          >
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="flex flex-col items-center gap-6 py-10"
                >
                  <div className="relative grid h-24 w-24 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/10" />
                    <span className="absolute inset-2 rounded-full border border-gold/20" />
                    <span
                      className="absolute inset-0 rounded-full border-t border-gold/50"
                      style={{ animation: "spin-slow 6s linear infinite" }}
                    />
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold/20 to-flame/20 text-4xl ring-1 ring-gold/30">
                      🔮
                    </div>
                  </div>
                  <div className="w-full max-w-md">
                    <label
                      htmlFor="cultivator-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                    >
                      Nama Kultivator
                    </label>
                    <input
                      id="cultivator-name"
                      type="text"
                      value={name}
                      maxLength={28}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && startScan()}
                      placeholder="Masukkan nama kultivasimu..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-gold/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <GlowButton onClick={startScan} className="mt-2">
                    Pindai Kultivasiku
                  </GlowButton>
                  <p className="text-xs text-slate-500">
                    Nama yang sama, takdir yang sama — langit tak pernah berdusta dua kali.
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
