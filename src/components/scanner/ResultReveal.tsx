"use client";

import { motion, type Variants } from "framer-motion";
import { formatRealmLevel } from "@/lib/realms";
import type { ScanResult } from "@/lib/types";
import {
  ATTRIBUTE_META,
  cn,
  POTENTIAL_LABELS,
  SOUL_REALM_LABELS,
} from "@/lib/utils";
import { HeavenlyFlameCard } from "./HeavenlyFlameCard";
import { LegendaryFlash } from "./LegendaryFlash";
import { ShareActions } from "./ShareActions";
import { TalentBar } from "./TalentBar";
import { XiaoYanBanner } from "./XiaoYanBanner";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.15 + i * 0.12, ease: "easeOut" },
  }),
};

export function ResultReveal({
  result,
  onScanAgain,
}: {
  result: ScanResult;
  onScanAgain: () => void;
}) {
  const attr = ATTRIBUTE_META[result.attribute];
  const realmColor = result.realm.color;

  return (
    <div className="relative">
      {result.isLegendaryRealm && <LegendaryFlash />}

      <motion.div initial="hidden" animate="show" className="space-y-6">
        {/* Cultivator + realm */}
        <motion.div custom={0} variants={reveal} className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Kultivator
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
            {result.name}
          </h3>

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
            className="mx-auto mt-6 grid h-40 w-40 place-items-center rounded-full"
            style={{
              border: `2px solid ${realmColor}`,
              background: `radial-gradient(circle at 50% 35%, ${realmColor}22, rgba(0,0,0,0.3))`,
              boxShadow: `0 0 60px -10px ${realmColor}`,
            }}
          >
            <div className="text-center">
              <div
                className="font-display text-4xl font-black"
                style={{ color: realmColor, textShadow: `0 0 24px ${realmColor}` }}
              >
                {result.realm.cn}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {result.realm.name}
              </div>
            </div>
          </motion.div>

          {formatRealmLevel(result.realmIndex, result.level) && (
            <div
              className="mt-3 text-lg tracking-[3px]"
              style={{ color: realmColor }}
            >
              {formatRealmLevel(result.realmIndex, result.level)}
            </div>
          )}
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            {result.realm.blurb}
          </p>
        </motion.div>

        {/* Attribute / Soul / Potential */}
        <motion.div custom={1} variants={reveal} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoTile
            label="Atribut Dou Qi"
            value={`${attr.icon} ${attr.label}`}
            color={attr.color}
          />
          <InfoTile
            label="Alam Jiwa"
            value={SOUL_REALM_LABELS[result.soulRealm]}
            color="#38BDF8"
          />
          <InfoTile
            label="Potensi"
            value={POTENTIAL_LABELS[result.potential]}
            color="#8B5CF6"
          />
        </motion.div>

        {/* Talent */}
        <motion.div custom={2} variants={reveal} className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
          <TalentBar talent={result.talent} />
        </motion.div>

        {/* Fate */}
        <motion.div
          custom={3}
          variants={reveal}
          className="rounded-2xl border-l-2 border-gold/60 bg-white/[0.03] p-5"
        >
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-gold">
            Bacaan Takdir
          </p>
          <p className="text-sm italic leading-relaxed text-slate-300">
            {result.fate}
          </p>
        </motion.div>

        {/* Xiao Yan destiny */}
        {result.isXiaoYanDestiny && (
          <motion.div custom={4} variants={reveal}>
            <XiaoYanBanner />
          </motion.div>
        )}

        {/* Heavenly flames */}
        <motion.div custom={5} variants={reveal}>
          {result.flames.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/40" />
                <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                  {result.isDualFlame
                    ? "Fusi Ganda Api Surgawi"
                    : "Api Surgawi Diperoleh"}
                </p>
                <span className="h-px w-10 bg-gold/40" />
              </div>
              {result.isDualFlame && (
                <p className="text-center text-xs text-slate-400">
                  Bakatmu begitu langka hingga dua api aneh berikatan dengan jiwamu
                  sekaligus — aura mereka berbenturan dalam badai energi.
                </p>
              )}
              <div className={cn("grid gap-4", result.isDualFlame ? "md:grid-cols-2" : "")}>
                {result.flames.map((f, i) => (
                  <HeavenlyFlameCard key={f.rank} flame={f} delay={0.1 + i * 0.15} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <p className="text-sm text-slate-400">
                🔥 Tak ada Api Surgawi yang menjawab panggilanmu kali ini — tetapi api
                terkuat direbut oleh mereka yang pantang menyerah. Berkultivasilah dan pindai lagi.
              </p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div custom={6} variants={reveal}>
          <ShareActions result={result} onScanAgain={onScanAgain} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function InfoTile({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4 text-center ring-1 ring-white/10">
      <div className="font-display text-lg font-bold" style={{ color }}>
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
    </div>
  );
}
