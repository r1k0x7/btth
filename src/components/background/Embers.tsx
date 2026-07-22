"use client";

import { useMemo } from "react";

/**
 * Floating embers drifting upward. Positions/durations are memoised so they are
 * stable across re-renders (and identical between server and client markup is
 * avoided by only rendering after mount via CSS-only animation).
 */
export function Embers({ count = 26 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic-ish spread using the index so SSR and client agree.
        const left = (i * 37) % 100;
        const size = 2 + ((i * 13) % 5);
        const duration = 8 + ((i * 7) % 9);
        const delay = -((i * 5) % 12);
        const drift = ((i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 8));
        return { left, size, duration, delay, drift, key: i };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.key}
          className="absolute bottom-[-12px] rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background:
              "radial-gradient(circle, #ffe08a 0%, #ff7a18 60%, transparent 70%)",
            animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
            // custom property consumed by the keyframes below
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes ember-rise {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
