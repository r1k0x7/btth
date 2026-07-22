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
    Fire: "diselubungi api yang hanya tunduk pada kehendakmu",
    Lightning: "bergemuruh dengan petir pembelah langit",
    Wind: "terangkat oleh angin yang tak terhentikan tembok mana pun",
    Water: "mengalir maju tanpa henti bagai gelombang yang tak kenal menyerah",
    Ice: "berselubung es yang menghentikan detak jantung mereka yang lebih lemah",
    Wood: "berakar pada kehidupan yang pulih lebih cepat daripada ia bisa ditebang",
    Earth: "berpijak pada bumi yang tak tergoyahkan",
    Light: "bermahkota cahaya yang menembus jurang terdalam",
  };

  const potentialLine: Record<Potential, string> = {
    Ordinary:
      "Jalan ini terjal dan langit tak acuh, namun percikan paling kecil sekalipun pernah menumbangkan kekaisaran.",
    Genius:
      "Bakat bersinar terang di nadimu; para master akan berebut menjadikanmu murid.",
    "Monster Genius":
      "Kau adalah prodigi yang dibisikkan para tetua dengan rasa takut sekaligus harap.",
    "Peak Prodigy":
      "Prodigi sekali dalam satu generasi — benua ini seolah condong menyambut kebangkitanmu.",
    "Future Dou Di":
      "Langit telah menandaimu. Ke mana pun kau melangkah, legenda baru Dou Di tertulis.",
  };

  const soulLine =
    soulRealm === "Di Realm"
      ? " Jiwamu telah menyentuh Alam Di, ketinggian yang jarang dicapai dalam sepuluh ribu tahun."
      : soulRealm === "Heavenly"
        ? " Persepsi jiwamu telah menanjak hingga Alam Surgawi."
        : "";

  const flameLine = hasFlame
    ? " Sebuah Api Surgawi telah memilihmu sebagai wadahnya — jagalah baik-baik, sebab ia akan mengukir namamu di peringkat api."
    : " Belum ada Api Surgawi yang menjawab panggilanmu, tetapi api terkuat sekalipun masih bisa direbut oleh mereka yang berani.";

  return `${name}, seorang kultivator ${realmName} yang ${elementLine[attribute]}. ${potentialLine[potential]}${soulLine}${flameLine}`;
}

/**
 * Produce a fully-resolved scan result. Deterministic per (trimmed, lowercased)
 * name; an empty name falls back to a fresh random destiny each time.
 */
export function generateScan(rawName: string): ScanResult {
  const name = rawName.trim() || "Kultivator Tanpa Nama";
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
