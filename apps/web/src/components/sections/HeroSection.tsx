"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/lib/content";
import { Container } from "@/components/ui/Section";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-[72px] mesh-bg"
    >
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles size={16} />
              {site.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Delivering{" "}
              <span className="text-gradient">Tailored Staffing Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              {site.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#contact" className="btn-primary">
                {site.hero.ctaPrimary}
                <ArrowRight size={18} />
              </Link>
              <Link href="/jobs" className="btn-secondary">
                {site.hero.ctaSecondary}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {["5+ Years", "Multi-Industry", "Compliance-First"].map((item) => (
                <motion.div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="glass-card p-8">
              <div className="space-y-4">
                {[
                  { label: "Time-to-Hire", value: "Reduced" },
                  { label: "Cost-per-Hire", value: "Optimized" },
                  { label: "Workforce Quality", value: "Enhanced" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="font-semibold text-accent">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 p-4 text-center text-sm text-slate-300">
                Trusted recruitment partner across India
              </p>
            </div>
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
