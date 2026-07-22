export interface TopCultivator {
  rank: number;
  name: string;
  cn: string;
  title: string;
  realm: string;
  power: number;
  signatureFlame?: string;
  blurb: string;
}

export const TOP_CULTIVATORS: TopCultivator[] = [
  {
    rank: 1,
    name: "Xiao Yan",
    cn: "萧炎",
    title: "Flame Emperor",
    realm: "Dou Di",
    power: 9999,
    signatureFlame: "Emperor Flame",
    blurb:
      "From a crippled genius to the sovereign of flame — the protagonist who devoured the heavens themselves.",
  },
  {
    rank: 2,
    name: "Yao Lao",
    cn: "药老",
    title: "Grand Elder of Alchemy",
    realm: "Dou Sheng",
    power: 9420,
    signatureFlame: "Bone Chilling Flame",
    blurb:
      "The soul that dwelt in a ring and forged an emperor — peerless alchemist and mentor of Xiao Yan.",
  },
  {
    rank: 3,
    name: "Hun Tiandi",
    cn: "魂天帝",
    title: "Soul Emperor",
    realm: "Dou Di",
    power: 9380,
    blurb:
      "Sovereign of the Soul Clan whose ambition to reforge the Emperor Flame shook the entire continent.",
  },
  {
    rank: 4,
    name: "Gu Yuan",
    cn: "古元",
    title: "Ancient Clan Patriarch",
    realm: "Dou Sheng",
    power: 9260,
    blurb:
      "Leader of the Ancient Clan and Xiao Yan's staunch ally, a mountain of strength in the final war.",
  },
  {
    rank: 5,
    name: "Zhu Kun",
    cn: "烛坤",
    title: "Void Swallowing Flame Lord",
    realm: "Dou Sheng",
    power: 9180,
    signatureFlame: "Void Devouring Flame",
    blurb:
      "Ancestor of the Taixu Ancient Dragon clan, whose flame could swallow the fires of the world.",
  },
];
