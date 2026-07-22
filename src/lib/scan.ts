import { HEAVENLY_FLAMES } from "./flames";
import { hashSeed, Rng } from "./random";
import { REALMS } from "./realms";
import type {
  Attribute,
  FlameReveal,
  Potential,
  ScanResult,
  SoulRealm,
} from "./types";

const ATTRIBUTES: Attribute[] = [
  "Fire",
  "Lightning",
  "Wind",
  "Water",
  "Ice",
  "Wood",
  "Earth",
  "Light",
];

/** Chance of obtaining a Heavenly Flame, keyed by potential. */
const FLAME_CHANCE: Record<Potential, number> = {
  Ordinary: 0.05,
  Genius: 0.15,
  "Monster Genius": 0.35,
  "Peak Prodigy": 0.6,
  "Future Dou Di": 0.9,
};

function potentialFor(talent: number): Potential {
  if (talent >= 98) return "Future Dou Di";
  if (talent >= 90) return "Peak Prodigy";
  if (talent >= 75) return "Monster Genius";
  if (talent >= 50) return "Genius";
  return "Ordinary";
}

/** Bias the soul realm by talent while keeping some spread. */
function soulRealmFor(rng: Rng, talent: number): SoulRealm {
  const roll = talent / 100 + (rng.next() - 0.5) * 0.5;
  if (roll >= 0.95) return "Di Realm";
  if (roll >= 0.72) return "Heavenly";
  if (roll >= 0.4) return "Spiritual";
  return "Mortal";
}

/** Higher talent biases toward higher realms. */
function realmIndexFor(rng: Rng, talent: number): number {
  const spread = (rng.next() - 0.5) * 3.2;
  const base = (talent / 100) * (REALMS.length - 1);
  return Math.max(0, Math.min(REALMS.length - 1, Math.round(base + spread)));
}

function buildFlame(rng: Rng): FlameReveal {
  // Lower ranks (stronger flames) are rarer: skew the roll toward the tail.
  const skew = Math.pow(rng.next(), 1.8);
  const index = Math.floor(skew * HEAVENLY_FLAMES.length);
  const flame = HEAVENLY_FLAMES[Math.min(index, HEAVENLY_FLAMES.length - 1)]!;
  const compatibility = rng.int(62, 100);
  return { ...flame, compatibility };
}

function buildFate(result: {
  name: string;
  realmName: string;
  attribute: Attribute;
  potential: Potential;
  hasFlame: boolean;
  soulRealm: SoulRealm;
}): string {
  const { name, realmName, attribute, potential, hasFlame, soulRealm } = result;
  const elementLine: Record<Attribute, string> = {
    Fire: "wreathed in flame that answers only to your will",
    Lightning: "crackling with heaven-splitting lightning",
    Wind: "borne aloft on winds that no wall can stop",
    Water: "flowing ever forward like an unyielding tide",
    Ice: "sheathed in ice that stills the beating of lesser hearts",
    Wood: "rooted in life that renews faster than it can be cut down",
    Earth: "grounded in an earth that will not be moved",
    Light: "haloed in a light that pierces the deepest abyss",
  };

  const potentialLine: Record<Potential, string> = {
    Ordinary:
      "The road is steep and the heavens indifferent, yet even the humblest spark has toppled empires.",
    Genius:
      "Talent runs bright in your veins; masters will fight to call you disciple.",
    "Monster Genius":
      "You are the kind of prodigy the elders whisper about in fear and hope.",
    "Peak Prodigy":
      "A once-in-a-generation prodigy — the continent itself seems to lean toward your rise.",
    "Future Dou Di":
      "The heavens have marked you. Where you walk, a new legend of the Dou Di is written.",
  };

  const soulLine =
    soulRealm === "Di Realm"
      ? " Your soul has already touched the Di Realm, a height few reach in ten thousand years."
      : soulRealm === "Heavenly"
        ? " Your soul perception has climbed into the Heavenly Realm."
        : "";

  const flameLine = hasFlame
    ? " A Heavenly Flame has chosen you as its vessel — cherish it, for it will carve your name into the flame rankings."
    : " No Heavenly Flame answers your call yet, but the strongest of all fires can still be seized by those who dare.";

  return `${name}, a ${realmName} cultivator ${elementLine[attribute]}. ${potentialLine[potential]}${soulLine}${flameLine}`;
}

/**
 * Produce a fully-resolved scan result. Deterministic per (trimmed, lowercased)
 * name; an empty name falls back to a fresh random destiny each time.
 */
export function generateScan(rawName: string): ScanResult {
  const name = rawName.trim() || "Nameless Cultivator";
  const seedSource = rawName.trim().toLowerCase();
  const seed = seedSource ? hashSeed(seedSource) : (Math.random() * 2 ** 32) >>> 0;
  const rng = new Rng(seed);

  const talent = rng.int(1, 100);
  const potential = potentialFor(talent);
  const soulRealm = soulRealmFor(rng, talent);
  const attribute = rng.pick(ATTRIBUTES);
  const realmIndex = realmIndexFor(rng, talent);
  const realm = REALMS[realmIndex]!;
  const level =
    realm.levelType === "none" ? 0 : rng.int(1, realm.maxLevel);

  const flames: FlameReveal[] = [];
  const gotFlame = rng.next() < FLAME_CHANCE[potential];
  if (gotFlame) {
    flames.push(buildFlame(rng));
    // Dual Heavenly Flame Mode for the truly exceptional.
    if (talent > 95 && rng.next() < 0.7) {
      let second = buildFlame(rng);
      let guard = 0;
      while (second.rank === flames[0]!.rank && guard < 6) {
        second = buildFlame(rng);
        guard++;
      }
      flames.push(second);
    }
  }

  const isDualFlame = flames.length >= 2;
  const isLegendaryRealm = realm.id === "dou-sheng" || realm.id === "dou-di";
  const isXiaoYanDestiny =
    talent >= 98 &&
    flames.length > 0 &&
    (soulRealm === "Heavenly" || soulRealm === "Di Realm");

  const fate = buildFate({
    name,
    realmName: realm.name,
    attribute,
    potential,
    hasFlame: flames.length > 0,
    soulRealm,
  });

  return {
    name,
    realm,
    realmIndex,
    level,
    attribute,
    soulRealm,
    talent,
    potential,
    fate,
    flames,
    isDualFlame,
    isXiaoYanDestiny,
    isLegendaryRealm,
  };
}
