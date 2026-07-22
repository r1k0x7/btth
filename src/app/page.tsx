import { Hero } from "@/components/hero/Hero";
import { Scanner } from "@/components/scanner/Scanner";
import { HowItWorks } from "@/components/sections/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Scanner />
      <HowItWorks />
    </>
  );
}
