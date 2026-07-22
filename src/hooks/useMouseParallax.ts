"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface ParallaxValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks the pointer position relative to the viewport centre and returns
 * spring-smoothed motion values in the range [-1, 1]. Disabled on touch to
 * avoid janky behaviour and to respect reduced-motion preferences.
 */
export function useMouseParallax(): ParallaxValues {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const onMove = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return { x: sx, y: sy };
}
