import type { Attribute, Potential, SoulRealm } from "./types";

/** Tiny classNames joiner (no dependency needed). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const ATTRIBUTE_META: Record<
  Attribute,
  { color: string; icon: string; label: string }
> = {
  Fire: { color: "#EF4444", icon: "🔥", label: "Api" },
  Lightning: { color: "#FBBF24", icon: "⚡", label: "Petir" },
  Wind: { color: "#7CFC9A", icon: "🌪️", label: "Angin" },
  Water: { color: "#38BDF8", icon: "💧", label: "Air" },
  Ice: { color: "#A5F3FC", icon: "❄️", label: "Es" },
  Wood: { color: "#4ADE80", icon: "🌿", label: "Kayu" },
  Earth: { color: "#D6A85F", icon: "⛰️", label: "Tanah" },
  Light: { color: "#FDE68A", icon: "✨", label: "Cahaya" },
};

/** Indonesian display labels for the Soul Realm tiers. */
export const SOUL_REALM_LABELS: Record<SoulRealm, string> = {
  Mortal: "Fana",
  Spiritual: "Spiritual",
  Heavenly: "Surgawi",
  "Di Realm": "Alam Di",
};

/** Indonesian display labels for the potential tiers. */
export const POTENTIAL_LABELS: Record<Potential, string> = {
  Ordinary: "Biasa",
  Genius: "Jenius",
  "Monster Genius": "Jenius Monster",
  "Peak Prodigy": "Prodigi Puncak",
  "Future Dou Di": "Calon Dou Di",
};

export function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
}
