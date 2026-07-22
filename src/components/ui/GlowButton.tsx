"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
} & HTMLMotionProps<"button">;

export function GlowButton({
  children,
  variant = "primary",
  className,
  ...rest
}: GlowButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "text-void-900"
          : "border border-gold/40 text-gold hover:bg-gold/10",
        className,
      )}
      style={
        variant === "primary"
          ? {
              backgroundImage:
                "linear-gradient(120deg, #fff3c4, #ffd700 55%, #f59e0b)",
              boxShadow:
                "0 10px 40px -10px rgba(255,215,0,0.6), inset 0 0 12px rgba(255,255,255,0.4)",
            }
          : undefined
      }
      {...rest}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="animate-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
