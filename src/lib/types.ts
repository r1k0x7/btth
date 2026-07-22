export type LevelType = "level" | "star" | "none";

export interface Realm {
  /** Stable id (kebab-case). */
  id: string;
  /** Romanised name, e.g. "Dou Zun". */
  name: string;
  /** Chinese name, e.g. "斗尊". */
  cn: string;
  /** Accent colour (hex). */
  color: string;
  /** How progress within this realm is expressed. */
  levelType: LevelType;
  /** Max level/stars (10 for Dou Zhi Qi, 9 for star realms, 0 for none). */
  maxLevel: number;
  /** One-line lore blurb. */
  blurb: string;
}

export type Rarity = "Mythic" | "Legendary" | "Epic" | "Rare" | "Uncommon";

export interface HeavenlyFlame {
  rank: number;
  name: string;
  rarity: Rarity;
  powerLevel: number;
  description: string;
}

export type Attribute =
  | "Fire"
  | "Lightning"
  | "Wind"
  | "Water"
  | "Ice"
  | "Wood"
  | "Earth"
  | "Light";

export type SoulRealm = "Mortal" | "Spiritual" | "Heavenly" | "Di Realm";

export type Potential =
  | "Ordinary"
  | "Genius"
  | "Monster Genius"
  | "Peak Prodigy"
  | "Future Dou Di";

export interface FlameReveal extends HeavenlyFlame {
  /** Per-scan compatibility percentage. */
  compatibility: number;
}

export interface ScanResult {
  name: string;
  realm: Realm;
  realmIndex: number;
  /** Level or star count within the realm; 0 when the realm has none. */
  level: number;
  attribute: Attribute;
  soulRealm: SoulRealm;
  talent: number;
  potential: Potential;
  fate: string;
  flames: FlameReveal[];
  /** True when two flames were obtained (Dual Heavenly Flame Mode). */
  isDualFlame: boolean;
  /** True when the Xiao Yan successor conditions are met. */
  isXiaoYanDestiny: boolean;
  /** True for the legendary realms (Dou Sheng / Dou Di). */
  isLegendaryRealm: boolean;
}
