import type { HeavenlyFlame, Rarity } from "./types";

interface FlameSeed {
  rank: number;
  name: string;
  description: string;
}

const FLAME_SEEDS: FlameSeed[] = [
  {
    rank: 1,
    name: "Emperor Flame",
    description:
      "The sovereign of all strange fires, born from the fused will of every heavenly flame. To wield it is to hold the authority of a Dou Di in your palm.",
  },
  {
    rank: 2,
    name: "Void Devouring Flame",
    description:
      "A ravenous flame that swallows other fires to grow ever stronger, said to be able to consume the heavens themselves.",
  },
  {
    rank: 3,
    name: "Purifying Demonic Lotus Flame",
    description:
      "A serene lotus of fire that cleanses all impurity, its calm surface hiding a temperature that unmakes matter.",
  },
  {
    rank: 4,
    name: "Golden Emperor Incinerating Heavenly Flame",
    description:
      "A regal golden blaze whose incineration leaves nothing behind — not ash, not memory, not even echoes in the void.",
  },
  {
    rank: 5,
    name: "Flame of Life",
    description:
      "The paradox fire that grants vitality as readily as it takes it, capable of rekindling life from the edge of death.",
  },
  {
    rank: 6,
    name: "Eight Desolations Destruction Flame",
    description:
      "A cataclysmic fire that lays waste to the eight directions, feared as a harbinger of ruin across the continent.",
  },
  {
    rank: 7,
    name: "Nine Serenities Golden Ancestral Flame",
    description:
      "An ancestral gold flame drawn from the nine serene abysses, revered by beast clans as a primordial inheritance.",
  },
  {
    rank: 8,
    name: "Red Lotus Karma Flame",
    description:
      "A karmic blaze that burns away sin and fate alike; those it touches are severed from the cycle of cause and effect.",
  },
  {
    rank: 9,
    name: "Three Thousand Burning Flame",
    description:
      "A flame that blossoms into three thousand tongues of fire, each one hot enough to scorch a mountain range.",
  },
  {
    rank: 10,
    name: "Nine Nether Wind Flame",
    description:
      "A ghostly azure fire riding the winds of the nine nether realms, chilling and burning in the very same breath.",
  },
  {
    rank: 11,
    name: "Bone Chilling Flame",
    description:
      "A pale flame colder than ice, freezing the marrow of any who draw near before its heat consumes them.",
  },
  {
    rank: 12,
    name: "Nine Dragon Lightning Flame",
    description:
      "Nine coiling dragons of fire and thunder, their roar splitting the sky with arcs of blinding lightning.",
  },
  {
    rank: 13,
    name: "Turtle Spiritual Earth Flame",
    description:
      "An ancient earthen flame guarded within a spirit turtle's shell, patient and enduring as the bedrock itself.",
  },
  {
    rank: 14,
    name: "Fallen Heart Flame",
    description:
      "A volcanic flame hidden beneath the Jia Ma Empire, the very fire that once tempered a young Xiao Yan's resolve.",
  },
  {
    rank: 15,
    name: "Sea Heart Flame",
    description:
      "A deep-sea blaze that burns beneath the waves without ever being quenched, cherished by aquatic clans.",
  },
  {
    rank: 16,
    name: "Fire Cloud Water Flame",
    description:
      "A flame of paradox that drifts like cloud and flows like water, elusive and endlessly adaptive.",
  },
  {
    rank: 17,
    name: "Volcanic Stone Flame",
    description:
      "A molten fire slumbering in the heart of dead volcanoes, erupting with the fury of the earth's core.",
  },
  {
    rank: 18,
    name: "Wind and Thunder Illusion Flame",
    description:
      "A trickster's flame woven from wind and thunder, cloaking its wielder in storms of shifting illusion.",
  },
  {
    rank: 19,
    name: "Green Lotus Core Flame",
    description:
      "A jade-green lotus fire born in the earth's core, the treasured flame that anchored Xiao Yan's early ascent.",
  },
  {
    rank: 20,
    name: "Dragon Phoenix Flame",
    description:
      "Twin spirits of dragon and phoenix entwined in flame, a rare fire coveted by both royal beast bloodlines.",
  },
  {
    rank: 21,
    name: "Six Dao Reincarnation Flame",
    description:
      "A cyclic fire echoing the six paths of reincarnation, its flames turning like a slow and solemn wheel.",
  },
  {
    rank: 22,
    name: "Myriad Beast Flame",
    description:
      "A wild flame that takes the shape of countless beasts, howling with the untamed spirit of the wilderness.",
  },
  {
    rank: 23,
    name: "Mystic Yellow Flame",
    description:
      "A humble amber fire and a common entry on the flame rankings — yet still a treasure beyond mortal reach.",
  },
];

export function rarityForRank(rank: number): Rarity {
  if (rank <= 3) return "Mythic";
  if (rank <= 8) return "Legendary";
  if (rank <= 15) return "Epic";
  if (rank <= 20) return "Rare";
  return "Uncommon";
}

/** Higher-ranked (lower number) flames carry a higher power level. */
function powerForRank(rank: number): number {
  const top = 9990;
  const bottom = 1200;
  const t = (rank - 1) / (FLAME_SEEDS.length - 1);
  return Math.round(top - t * (top - bottom));
}

export const HEAVENLY_FLAMES: HeavenlyFlame[] = FLAME_SEEDS.map((f) => ({
  rank: f.rank,
  name: f.name,
  description: f.description,
  rarity: rarityForRank(f.rank),
  powerLevel: powerForRank(f.rank),
}));

export const RARITY_ORDER: Rarity[] = [
  "Mythic",
  "Legendary",
  "Epic",
  "Rare",
  "Uncommon",
];

export const RARITY_COLORS: Record<Rarity, string> = {
  Mythic: "#EF4444",
  Legendary: "#FFD700",
  Epic: "#8B5CF6",
  Rare: "#38BDF8",
  Uncommon: "#7CFC9A",
};

export function flameByRank(rank: number): HeavenlyFlame | undefined {
  return HEAVENLY_FLAMES.find((f) => f.rank === rank);
}
