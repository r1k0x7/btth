"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#scanner", label: "Pemindai" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-page">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled ? "glass-strong" : "border border-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold to-flame text-lg shadow-glow shadow-gold/40">
              🔥
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Dou Qi<span className="text-gradient-gold"> Realm</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#scanner"
            className="hidden rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-gold ring-1 ring-gold/30 transition hover:bg-gold/10 md:inline-block"
          >
            Mulai Pindai
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-200 ring-1 ring-white/10 md:hidden"
          >
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </nav>

        {open && (
          <div className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
