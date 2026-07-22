import type { Metadata } from "next";
import Link from "next/link";
import { FlameEncyclopedia } from "@/components/flames/FlameEncyclopedia";

export const metadata: Metadata = {
  title: "Ensiklopedia Api Surgawi",
  description:
    "Jelajahi seluruh 23 Api Surgawi dari Battle Through the Heavens — diperingkat berdasarkan kekuatan, lengkap dengan kisah, kelangkaan, dan level kekuatan. Cari, saring, dan urutkan api-api aneh ini.",
  openGraph: {
    title: "Ensiklopedia Api Surgawi · Dou Qi Realm Scanner",
    description:
      "Seluruh 23 Api Surgawi dari Battle Through the Heavens, diperingkat dengan kisah dan level kekuatan.",
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
          ← Kembali ke Pemindai
        </Link>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-flame">
          异火榜 · Peringkat Api
        </p>
        <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
          Ensiklopedia <span className="text-gradient-gold">Api Surgawi</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
          Dua puluh tiga api aneh membara di seantero Benua Dou Qi, dari Api
          Kuning Mistis yang sederhana hingga Api Kaisar yang mampu mengakhiri
          dunia. Telusuri peringkatnya dan pelajari api yang kelak bisa menjadi
          milikmu.
        </p>
      </div>

      <div className="mt-14">
        <FlameEncyclopedia />
      </div>
    </div>
  );
}
