import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 py-12">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0 mx-auto max-w-md" />
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
          Persembahan penggemar untuk <em>Battle Through the Heavens</em> (斗破苍穹).
          Dunia kultivasi dan kisahnya adalah milik penciptanya, Tian Can Tu Dou.
          Dibuat untuk kesenangan — tanpa afiliasi atau dukungan resmi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <Link href="/#scanner" className="transition hover:text-gold">
            Pemindai
          </Link>
        </div>
        <p className="text-sm text-slate-400">
          Dibuat dengan <span className="text-flame">🔥</span> oleh{" "}
          <a
            href="https://github.com/r1k0x7"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold transition hover:text-gold/80"
          >
            r1k0x7
          </a>
        </p>
        <p className="text-xs tracking-wider text-slate-600">
          © {new Date().getFullYear()} Dou Qi Realm Scanner · Temukan takdirmu.
        </p>
      </div>
    </footer>
  );
}
