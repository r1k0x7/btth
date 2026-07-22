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
    blurb: "The first breath of Dou Qi stirring within the meridians.",
  },
  {
    id: "dou-zhe",
    name: "Dou Zhe",
    cn: "斗者",
    color: "#4DD0E1",
    levelType: "star",
    maxLevel: 9,
    blurb: "A fighter who has stepped onto the cultivation path.",
  },
  {
    id: "dou-shi",
    name: "Dou Shi",
    cn: "斗师",
    color: "#38BDF8",
    levelType: "star",
    maxLevel: 9,
    blurb: "Dou Qi flows freely; the body begins to leave the ground.",
  },
  {
    id: "da-dou-shi",
    name: "Da Dou Shi",
    cn: "大斗师",
    color: "#5C8DF6",
    levelType: "star",
    maxLevel: 9,
    blurb: "A grand master — a pillar among ordinary cultivators.",
  },
  {
    id: "dou-ling",
    name: "Dou Ling",
    cn: "斗灵",
    color: "#8B5CF6",
    levelType: "star",
    maxLevel: 9,
    blurb: "Soul perception awakens and energy answers your intent.",
  },
  {
    id: "dou-wang",
    name: "Dou Wang",
    cn: "斗王",
    color: "#A855F7",
    levelType: "star",
    maxLevel: 9,
    blurb: "A King of Dou Qi whose name carries weight across a region.",
  },
  {
    id: "dou-huang",
    name: "Dou Huang",
    cn: "斗皇",
    color: "#EC4899",
    levelType: "star",
    maxLevel: 9,
    blurb: "Emperor-tier might able to wound the sky and shake the earth.",
  },
  {
    id: "dou-zong",
    name: "Dou Zong",
    cn: "斗宗",
    color: "#FB923C",
    levelType: "star",
    maxLevel: 9,
    blurb: "Dou Qi condenses into wings — true flight becomes yours.",
  },
  {
    id: "dou-zun",
    name: "Dou Zun",
    cn: "斗尊",
    color: "#FBBF24",
    levelType: "star",
    maxLevel: 9,
    blurb: "A venerate whose gaze bends the space around them.",
  },
  {
    id: "ban-sheng",
    name: "Ban Sheng",
    cn: "半圣",
    color: "#FFD700",
    levelType: "none",
    maxLevel: 0,
    blurb: "Half-Saint — one breath away from sainthood.",
  },
  {
    id: "dou-sheng",
    name: "Dou Sheng",
    cn: "斗圣",
    color: "#F87171",
    levelType: "star",
    maxLevel: 9,
    blurb: "A Saint who can seize the heavens and reshape the world.",
  },
  {
    id: "dou-di",
    name: "Dou Di",
    cn: "斗帝",
    color: "#EF4444",
    levelType: "none",
    maxLevel: 0,
    blurb: "The apex — a god among mortals before whom the heavens bow.",
  },
];

/** Render the level/star suffix for a realm result. */
export function formatRealmLevel(realmIndex: number, level: number): string {
  const realm = REALMS[realmIndex];
  if (!realm || realm.levelType === "none") return "";
  if (realm.levelType === "level") return `Level ${level}`;
  return "★".repeat(level) + "☆".repeat(Math.max(0, realm.maxLevel - level));
}
