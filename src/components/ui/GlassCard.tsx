import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Accent colour used for the ambient border glow. */
  glow?: string;
  strong?: boolean;
  style?: CSSProperties;
}

export function GlassCard({
  children,
  className,
  glow,
  strong,
  style,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 sm:p-8",
        strong ? "glass-strong" : "glass",
        className,
      )}
      style={{
        ...(glow
          ? { boxShadow: `0 0 60px -20px ${glow}, inset 0 1px 0 0 rgba(255,255,255,0.06)` }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
