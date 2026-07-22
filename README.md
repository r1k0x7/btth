# Dou Qi Realm Scanner 🔥

A premium, cinematic web experience themed around **Battle Through the Heavens** (斗破苍穹). Enter your cultivation name, run a spiritual scan, and discover your **cultivation realm, talent, Dou Qi attribute, Soul Realm, and Heavenly Flame** — plus rare destinies like Dual Heavenly Flame Fusion and the *Destined Successor of Xiao Yan*.

Built with **Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion**. Deploy to Vercel with zero extra configuration.

## Features

- **Cultivation Scanner** — glassmorphism card with a 3-second rotating energy-ring scan and a spectacular result reveal.
- **12 Cultivation Realms** — the official ladder from Dou Zhi Qi to Dou Di.
- **23 Heavenly Flames** — full encyclopedia at `/heavenly-flames` with search, rarity filter, and sort.
- **Result system** — realm, attribute, soul realm, animated talent rating, potential, and an epic generated fate reading.
- **Heavenly Flame system** — potential-weighted drop rates, rarity tiers, power levels, and per-scan compatibility.
- **Legendary moments** — Dual Flame Fusion (talent > 95), the Xiao Yan successor title, and a full-screen burst for Dou Sheng / Dou Di.
- **Premium atmosphere** — animated particle canvas, aurora glow, light rays, floating embers, mouse parallax, and smooth transitions.
- **Deterministic** — the same name always yields the same destiny.
- **SEO ready** — metadata, Open Graph + Twitter cards, dynamic OG image, `sitemap.xml`, `robots.txt`, and an SVG favicon.
- **Responsive** across mobile, tablet, desktop, and ultrawide, with `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deploy

Push the repo and import it into [Vercel](https://vercel.com/new) — the framework is detected automatically and it builds with no extra configuration.

## Project structure

```
src/
├── app/                  # App Router: layout, pages, SEO routes, OG image
│   ├── heavenly-flames/  # Encyclopedia page
│   ├── icon.svg          # Favicon
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── background/       # Atmosphere: particles, aurora, rays, embers
│   ├── flames/           # Encyclopedia grid + cards
│   ├── hero/             # Hero + floating Heavenly Flame
│   ├── layout/           # Navbar + Footer
│   ├── scanner/          # Scanner, scanning animation, result reveal
│   ├── sections/         # Realms, leaderboard, lore
│   └── ui/               # Reusable primitives (GlassCard, GlowButton, …)
├── hooks/                # useCountUp, useMouseParallax
└── lib/                  # Domain data + logic (realms, flames, scan, types)
```

## Disclaimer

A fan-made tribute. *Battle Through the Heavens*, its realms, characters, and Heavenly Flames belong to their original creator, Tian Can Tu Dou. This project is non-commercial and unaffiliated.
