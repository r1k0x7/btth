import { Aurora } from "./Aurora";
import { Embers } from "./Embers";
import { LightRays } from "./LightRays";
import { ParticleField } from "./ParticleField";

/**
 * The full fixed-position atmospheric backdrop shared across pages: aurora
 * glow, cinematic light rays, drifting energy particles and floating embers.
 */
export function Atmosphere() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Aurora />
      <LightRays />
      <ParticleField />
      <Embers />
      {/* Subtle vignette to focus the centre */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(5,8,22,0.75) 100%)",
        }}
      />
    </div>
  );
}
