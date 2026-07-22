import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold to-flame text-lg">
            🔥
          </span>
          <span className="font-display text-lg font-bold text-white">
            Dou Qi Realm Scanner
          </span>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-slate-500">
          A fan-made tribute to <em>Battle Through the Heavens</em> (斗破苍穹).
          Cultivation realms, Heavenly Flames and lore belong to their original
          creator, Tian Can Tu Dou. Built for fun — no affiliation or endorsement.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <Link href="/#scanner" className="transition hover:text-gold">
            Scanner
          </Link>
          <Link href="/heavenly-flames" className="transition hover:text-gold">
            Heavenly Flames
          </Link>
          <Link href="/#lore" className="transition hover:text-gold">
            Lore
          </Link>
        </div>
        <p className="text-xs tracking-wider text-slate-600">
          © {new Date().getFullYear()} Dou Qi Realm Scanner · Discover your destiny.
        </p>
      </div>
    </footer>
  );
}
