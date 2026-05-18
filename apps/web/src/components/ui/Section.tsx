"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  light?: boolean;
};

export function Section({ id, className, children, light }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding relative overflow-hidden",
        light ? "bg-slate-50 text-slate-900" : "bg-surface-dark text-slate-100",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.2em]",
            dark ? "text-accent" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold md:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-slate-400" : "text-slate-600"
          )}
        >
          {description}
        </p>
      )}
      <motion.div
        className={cn(
          "mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent",
          align === "center" && "mx-auto"
        )}
        layoutId="section-divider"
      />
    </motion.div>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </motion.div>
  );
}
