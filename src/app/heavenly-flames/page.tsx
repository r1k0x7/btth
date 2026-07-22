import type { Metadata } from "next";
import Link from "next/link";
import { FlameEncyclopedia } from "@/components/flames/FlameEncyclopedia";

export const metadata: Metadata = {
  title: "Heavenly Flames Encyclopedia",
  description:
    "Browse all 23 Heavenly Flames from Battle Through the Heavens — ranked by power, with lore, rarity and power ratings. Search, filter and sort the strange fires.",
  openGraph: {
    title: "Heavenly Flames Encyclopedia · Dou Qi Realm Scanner",
    description:
      "All 23 Heavenly Flames from Battle Through the Heavens, ranked with lore and power ratings.",
  },
};

export default function HeavenlyFlamesPage() {
  return (
    <div className="container-page pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-3xl text-center">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-slate-400 transition hover:text-gold"
        >
          ← Back to Scanner
        </Link>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-flame">
          异火榜 · The Flame Rankings
        </p>
        <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
          Heavenly Flames <span className="text-gradient-gold">Encyclopedia</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
          Twenty-three strange fires burn across the Dou Qi Continent, from the
          humble Mystic Yellow Flame to the world-ending Emperor Flame. Search
          the rankings and study the fire that could one day be yours.
        </p>
      </div>

      <div className="mt-14">
        <FlameEncyclopedia />
      </div>
    </div>
  );
}
