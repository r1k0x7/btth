import type { MetadataRoute } from "next";

const BASE = "https://dou-qi-realm-scanner.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${BASE}/heavenly-flames`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
