import type { Realm } from "./types";

/**
 * The official Dou Qi cultivation ladder from Battle Through the Heavens,
 * ordered from lowest to highest.
 */
export const REALMS: Realm[] = [
  {
    id: "dou-zhi-qi",
    name: "Dou Zhi Qi",
    cn: "斗之气",
    color: "#7CFC9A",
    levelType: "level",
    maxLevel: 10,
    blurb: "Napas pertama Dou Qi yang menggeliat di dalam meridian.",
  },
  {
    id: "dou-zhe",
    name: "Dou Zhe",
    cn: "斗者",
    color: "#4DD0E1",
    levelType: "star",
    maxLevel: 9,
    blurb: "Seorang petarung yang telah melangkah ke jalan kultivasi.",
  },
  {
    id: "dou-shi",
    name: "Dou Shi",
    cn: "斗师",
    color: "#38BDF8",
    levelType: "star",
    maxLevel: 9,
    blurb: "Dou Qi mengalir bebas; tubuh mulai meninggalkan tanah.",
  },
  {
    id: "da-dou-shi",
    name: "Da Dou Shi",
    cn: "大斗师",
    color: "#5C8DF6",
    levelType: "star",
    maxLevel: 9,
    blurb: "Seorang master agung — pilar di antara para kultivator biasa.",
  },
  {
    id: "dou-ling",
    name: "Dou Ling",
    cn: "斗灵",
    color: "#8B5CF6",
    levelType: "star",
    maxLevel: 9,
    blurb: "Persepsi jiwa terbangun dan energi menuruti kehendakmu.",
  },
  {
    id: "dou-wang",
    name: "Dou Wang",
    cn: "斗王",
    color: "#A855F7",
    levelType: "star",
    maxLevel: 9,
    blurb: "Raja Dou Qi yang namanya disegani di seantero wilayah.",
  },
  {
    id: "dou-huang",
    name: "Dou Huang",
    cn: "斗皇",
    color: "#EC4899",
    levelType: "star",
    maxLevel: 9,
    blurb: "Kekuatan setara kaisar yang mampu melukai langit dan mengguncang bumi.",
  },
  {
    id: "dou-zong",
    name: "Dou Zong",
    cn: "斗宗",
    color: "#FB923C",
    levelType: "star",
    maxLevel: 9,
    blurb: "Dou Qi memadat menjadi sayap — terbang sejati kini menjadi milikmu.",
  },
  {
    id: "dou-zun",
    name: "Dou Zun",
    cn: "斗尊",
    color: "#FBBF24",
    levelType: "star",
    maxLevel: 9,
    blurb: "Sang mulia yang tatapannya membengkokkan ruang di sekitarnya.",
  },
  {
    id: "ban-sheng",
    name: "Ban Sheng",
    cn: "半圣",
    color: "#FFD700",
    levelType: "none",
    maxLevel: 0,
    blurb: "Setengah Suci — tinggal satu napas menuju kesucian.",
  },
  {
    id: "dou-sheng",
    name: "Dou Sheng",
    cn: "斗圣",
    color: "#F87171",
    levelType: "star",
    maxLevel: 9,
    blurb: "Seorang Suci yang mampu merebut langit dan membentuk ulang dunia.",
  },
  {
    id: "dou-di",
    name: "Dou Di",
    cn: "斗帝",
    color: "#EF4444",
    levelType: "none",
    maxLevel: 0,
    blurb: "Puncak segalanya — dewa di antara manusia yang di hadapannya langit pun tunduk.",
  },
];

/** Render the level/star suffix for a realm result. */
export function formatRealmLevel(realmIndex: number, level: number): string {
  const realm = REALMS[realmIndex];
  if (!realm || realm.levelType === "none") return "";
  if (realm.levelType === "level") return `Tingkat ${level}`;
  return "★".repeat(level) + "☆".repeat(Math.max(0, realm.maxLevel - level));
}
