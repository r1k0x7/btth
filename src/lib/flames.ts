import type { HeavenlyFlame, Rarity } from "./types";

interface FlameSeed {
  rank: number;
  name: string;
  description: string;
}

const FLAME_SEEDS: FlameSeed[] = [
  {
    rank: 1,
    name: "Api Kaisar",
    description:
      "Penguasa segala api aneh, lahir dari kehendak yang menyatu dari setiap api surgawi. Menggenggamnya berarti memegang otoritas seorang Dou Di di telapak tanganmu.",
  },
  {
    rank: 2,
    name: "Api Penelan Kehampaan",
    description:
      "Api rakus yang melahap api lain agar terus menguat, konon mampu menelan langit itu sendiri.",
  },
  {
    rank: 3,
    name: "Api Teratai Iblis Penyucian",
    description:
      "Teratai api yang tenang dan menyucikan segala kotoran; permukaannya yang damai menyembunyikan suhu yang mampu memusnahkan materi.",
  },
  {
    rank: 4,
    name: "Api Surgawi Pembakar Kaisar Emas",
    description:
      "Kobaran emas nan megah yang pembakarannya tak menyisakan apa pun — bukan abu, bukan kenangan, bahkan gema di kehampaan pun tiada.",
  },
  {
    rank: 5,
    name: "Api Kehidupan",
    description:
      "Api paradoks yang memberi vitalitas semudah ia merenggutnya, mampu menyalakan kembali nyawa dari ambang kematian.",
  },
  {
    rank: 6,
    name: "Api Penghancur Delapan Kehampaan",
    description:
      "Api dahsyat yang meluluhlantakkan delapan penjuru, ditakuti sebagai pertanda kehancuran di seluruh benua.",
  },
  {
    rank: 7,
    name: "Api Leluhur Emas Sembilan Keheningan",
    description:
      "Api emas leluhur yang ditarik dari sembilan jurang hening, dipuja klan-klan buas sebagai warisan purba.",
  },
  {
    rank: 8,
    name: "Api Karma Teratai Merah",
    description:
      "Kobaran karma yang membakar dosa sekaligus takdir; siapa pun yang tersentuh terputus dari lingkaran sebab-akibat.",
  },
  {
    rank: 9,
    name: "Api Membakar Tiga Ribu",
    description:
      "Api yang merekah menjadi tiga ribu lidah api, masing-masing cukup panas untuk menghanguskan barisan pegunungan.",
  },
  {
    rank: 10,
    name: "Api Angin Sembilan Neraka",
    description:
      "Api biru pucat bak hantu yang menunggangi angin sembilan alam neraka, membekukan dan membakar dalam satu embusan yang sama.",
  },
  {
    rank: 11,
    name: "Api Pembeku Tulang",
    description:
      "Api pucat yang lebih dingin dari es, membekukan sumsum siapa pun yang mendekat sebelum panasnya melahap mereka.",
  },
  {
    rank: 12,
    name: "Api Petir Sembilan Naga",
    description:
      "Sembilan naga api dan guntur yang melingkar, raungannya membelah langit dengan busur petir yang menyilaukan.",
  },
  {
    rank: 13,
    name: "Api Tanah Spiritual Kura-Kura",
    description:
      "Api tanah kuno yang dijaga dalam tempurung kura-kura roh, sabar dan tahan lama bagai batuan dasar itu sendiri.",
  },
  {
    rank: 14,
    name: "Api Hati Jatuh",
    description:
      "Api vulkanik yang tersembunyi di bawah Kekaisaran Jia Ma, api yang dulu menempa tekad Xiao Yan muda.",
  },
  {
    rank: 15,
    name: "Api Hati Samudra",
    description:
      "Kobaran laut dalam yang menyala di bawah ombak tanpa pernah padam, disayangi klan-klan akuatik.",
  },
  {
    rank: 16,
    name: "Api Air Awan Api",
    description:
      "Api paradoks yang melayang bagai awan dan mengalir bagai air, sulit ditangkap dan tanpa henti menyesuaikan diri.",
  },
  {
    rank: 17,
    name: "Api Batu Vulkanik",
    description:
      "Api cair yang tertidur di jantung gunung berapi mati, meletus dengan amarah inti bumi.",
  },
  {
    rank: 18,
    name: "Api Ilusi Angin dan Guntur",
    description:
      "Api penipu yang ditenun dari angin dan guntur, menyelubungi penggunanya dalam badai ilusi yang terus berubah.",
  },
  {
    rank: 19,
    name: "Api Inti Teratai Hijau",
    description:
      "Api teratai hijau giok yang lahir di inti bumi, api berharga yang menopang pendakian awal Xiao Yan.",
  },
  {
    rank: 20,
    name: "Api Naga Phoenix",
    description:
      "Dua roh naga dan phoenix yang terjalin dalam api, api langka yang diperebutkan kedua garis darah hewan kerajaan.",
  },
  {
    rank: 21,
    name: "Api Reinkarnasi Enam Jalan",
    description:
      "Api siklus yang menggemakan enam jalan reinkarnasi, kobarannya berputar bagai roda yang lambat dan khidmat.",
  },
  {
    rank: 22,
    name: "Api Seribu Buas",
    description:
      "Api liar yang menjelma dalam wujud beragam hewan, melolong dengan semangat rimba yang tak terjinakkan.",
  },
  {
    rank: 23,
    name: "Api Kuning Mistis",
    description:
      "Api kuning kekuningan yang sederhana dan entri umum di peringkat api — namun tetap harta di luar jangkauan manusia fana.",
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

export const RARITY_LABELS: Record<Rarity, string> = {
  Mythic: "Mistis",
  Legendary: "Legendaris",
  Epic: "Epik",
  Rare: "Langka",
  Uncommon: "Tidak Umum",
};

export function flameByRank(rank: number): HeavenlyFlame | undefined {
  return HEAVENLY_FLAMES.find((f) => f.rank === rank);
}
