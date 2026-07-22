"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold to-flame text-lg shadow-glow shadow-gold/40 transition-transform duration-300 group-hover:scale-105">
              🔥
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Dou Qi<span className="text-gradient-gold"> Realm</span>
            </span>
          </Link>

          <Link
            href="/#scanner"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2 text-sm font-semibold text-gold ring-1 ring-gold/30 transition hover:bg-gold/10 hover:ring-gold/50"
          >
            <span className="hidden sm:inline">Mulai</span> Pindai
            <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
