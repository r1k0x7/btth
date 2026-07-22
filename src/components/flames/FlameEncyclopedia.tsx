"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { HEAVENLY_FLAMES, RARITY_COLORS, RARITY_ORDER } from "@/lib/flames";
import type { Rarity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FlameCard } from "./FlameCard";

type SortKey = "rank-asc" | "rank-desc" | "power-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "rank-asc", label: "Rank ↑" },
  { key: "rank-desc", label: "Rank ↓" },
  { key: "power-desc", label: "Power" },
];

export function FlameEncyclopedia() {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<Rarity | "All">("All");
  const [sort, setSort] = useState<SortKey>("rank-asc");

  const flames = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = HEAVENLY_FLAMES.filter((f) => {
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q);
      const matchesRarity = rarity === "All" || f.rarity === rarity;
      return matchesQuery && matchesRarity;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rank-asc") return a.rank - b.rank;
      if (sort === "rank-desc") return b.rank - a.rank;
      return b.powerLevel - a.powerLevel;
    });
    return list;
  }, [query, rarity, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="glass sticky top-20 z-20 mb-10 flex flex-col gap-4 rounded-3xl p-4 sm:p-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Heavenly Flames..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
        />
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={rarity === "All"} onClick={() => setRarity("All")}>
            All
          </FilterChip>
          {RARITY_ORDER.map((r) => (
            <FilterChip
              key={r}
              active={rarity === r}
              color={RARITY_COLORS[r]}
              onClick={() => setRarity(r)}
            >
              {r}
            </FilterChip>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Sort
            </span>
            {SORTS.map((s) => (
              <FilterChip
                key={s.key}
                active={sort === s.key}
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-500">
        Showing <span className="text-white">{flames.length}</span> of{" "}
        {HEAVENLY_FLAMES.length} Heavenly Flames
      </p>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {flames.map((f) => (
            <FlameCard key={f.rank} flame={f} />
          ))}
        </AnimatePresence>
      </motion.div>

      {flames.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
          No Heavenly Flame matches your search.
        </div>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  color,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
        active
          ? "text-void-900"
          : "text-slate-300 ring-1 ring-white/10 hover:bg-white/5",
      )}
      style={
        active
          ? { background: color ?? "#FFD700" }
          : undefined
      }
    >
      {children}
    </button>
  );
}
