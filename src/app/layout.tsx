import type { Metadata, Viewport } from "next";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/cinzel/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";

const SITE_URL = "https://dou-qi-realm-scanner.vercel.app";
const TITLE = "Dou Qi Realm Scanner — Battle Through the Heavens";
const DESCRIPTION =
  "Discover your destiny in the world of Battle Through the Heavens. Scan your cultivation realm, talent, Dou Qi attribute and Heavenly Flame.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Dou Qi Realm Scanner",
  },
  description: DESCRIPTION,
  keywords: [
    "Battle Through the Heavens",
    "斗破苍穹",
    "Dou Qi",
    "cultivation scanner",
    "Heavenly Flames",
    "Dou Di",
    "Xiao Yan",
  ],
  authors: [{ name: "Dou Qi Realm Scanner" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Dou Qi Realm Scanner",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <Atmosphere />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
