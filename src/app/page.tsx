import { Hero } from "@/components/hero/Hero";
import { Scanner } from "@/components/scanner/Scanner";
import { LoreSection } from "@/components/sections/LoreSection";
import { RealmLadder } from "@/components/sections/RealmLadder";
import { TopCultivators } from "@/components/sections/TopCultivators";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Scanner />
      <RealmLadder />
      <TopCultivators />
      <LoreSection />
    </>
  );
}
