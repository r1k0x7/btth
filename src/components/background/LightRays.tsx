/**
 * Cinematic light rays descending from the top of the viewport.
 */
export function LightRays() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
      }}
    >
      <div className="absolute left-1/2 top-[-20%] h-[120%] w-[140%] -translate-x-1/2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-[14%] origin-top opacity-[0.06]"
            style={{
              left: `${8 + i * 13}%`,
              transform: `rotate(${(i - 3) * 6}deg)`,
              background:
                "linear-gradient(to bottom, rgba(255,215,0,0.9), transparent 65%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
