import type { Attribute } from "./types";

/** Tiny classNames joiner (no dependency needed). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const ATTRIBUTE_META: Record<
  Attribute,
  { color: string; icon: string }
> = {
  Fire: { color: "#EF4444", icon: "🔥" },
  Lightning: { color: "#FBBF24", icon: "⚡" },
  Wind: { color: "#7CFC9A", icon: "🌪️" },
  Water: { color: "#38BDF8", icon: "💧" },
  Ice: { color: "#A5F3FC", icon: "❄️" },
  Wood: { color: "#4ADE80", icon: "🌿" },
  Earth: { color: "#D6A85F", icon: "⛰️" },
  Light: { color: "#FDE68A", icon: "✨" },
};

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
