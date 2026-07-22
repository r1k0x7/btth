"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-energy">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div
        className={
          "divider-glow mt-5 h-px w-24 " + (align === "center" ? "mx-auto" : "")
        }
      />
      {subtitle && (
        <p
          className={
            "mt-4 text-base leading-relaxed text-slate-400 " +
            (align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")
          }
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
