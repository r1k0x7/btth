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
    title: "Kaisar Api",
    realm: "Dou Di",
    power: 9999,
    signatureFlame: "Api Kaisar",
    blurb:
      "Dari jenius yang lumpuh menjadi penguasa api — sang protagonis yang melahap langit itu sendiri.",
  },
  {
    rank: 2,
    name: "Yao Lao",
    cn: "药老",
    title: "Tetua Agung Alkimia",
    realm: "Dou Sheng",
    power: 9420,
    signatureFlame: "Api Pembeku Tulang",
    blurb:
      "Jiwa yang bersemayam dalam cincin dan menempa seorang kaisar — alkemis tanpa tanding dan mentor Xiao Yan.",
  },
  {
    rank: 3,
    name: "Hun Tiandi",
    cn: "魂天帝",
    title: "Kaisar Jiwa",
    realm: "Dou Di",
    power: 9380,
    blurb:
      "Penguasa Klan Jiwa yang ambisinya menempa ulang Api Kaisar mengguncang seluruh benua.",
  },
  {
    rank: 4,
    name: "Gu Yuan",
    cn: "古元",
    title: "Patriark Klan Kuno",
    realm: "Dou Sheng",
    power: 9260,
    blurb:
      "Pemimpin Klan Kuno dan sekutu setia Xiao Yan, gunung kekuatan dalam perang terakhir.",
  },
  {
    rank: 5,
    name: "Zhu Kun",
    cn: "烛坤",
    title: "Penguasa Api Penelan Kehampaan",
    realm: "Dou Sheng",
    power: 9180,
    signatureFlame: "Api Penelan Kehampaan",
    blurb:
      "Leluhur klan Naga Kuno Taixu, yang apinya mampu menelan api-api dunia.",
  },
];
