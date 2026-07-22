"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** A one-shot full-screen golden burst for the legendary realms. */
export function LegendaryFlash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 grid place-items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.9), rgba(255,215,0,0) 55%)",
            }}
          />
          {[...Array(40)].map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const dist = 220 + (i % 5) * 90;
            return (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-gold"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  opacity: 0,
                }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                style={{ boxShadow: "0 0 12px #ffd700" }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
