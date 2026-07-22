import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          900: "#050816",
          800: "#0B1120",
          700: "#111827",
        },
        gold: "#FFD700",
        energy: "#38BDF8",
        cultivation: "#8B5CF6",
        flame: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px var(--tw-shadow-color)",
        "glow-lg": "0 0 80px -12px var(--tw-shadow-color)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.25) 0%, transparent 70%)",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(6%, 4%, 0) rotate(8deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        aurora: "aurora 24s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
