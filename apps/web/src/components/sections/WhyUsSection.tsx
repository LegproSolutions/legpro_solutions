"use client";

import { Sliders, Shield, Scale, Clock, TrendingUp, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui/Section";
import { StatsCounter } from "@/components/ui/StatsCounter";

const metrics = [
  { value: 10000, suffix: "+", label: "Successful Placements" },
  { value: 500, suffix: "+", label: "Clients Handled" },
  { value: 50, suffix: "+", label: "Industry Verticals" },
  { value: 100, suffix: "%", label: "PAN India Operations" },
];

const reasons = [
  {
    text: "Customized hiring strategies tailored to your workspace & culture.",
    icon: Sliders,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    text: "Rigorous multi-stage vetting process ensuring 98% candidate accuracy.",
    icon: Shield,
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    text: "Compliance-first policies aligning with national and local labor standards.",
    icon: Scale,
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    text: "Substantially reduced time-to-hire (under 48 hours average response).",
    icon: Clock,
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    text: "Scale seamlessly with permanent, contract, or bulk staffing options.",
    icon: TrendingUp,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    text: "Dedicated client relationship managers for continuous partnership support.",
    icon: Headphones,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

export function WhyUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <Section id="why-us" className="!py-10 md:!py-12 bg-white">
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-12">
          {/* Left Column: Timeline Feature Cards */}
          <div className="lg:col-span-7">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Why Choose Us</p>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
              Pioneering Recruitment Standards
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-2xl">
              We go beyond traditional staffing to ensure that every placement matches your exact technical requirements and cultural dynamics.
            </p>

            {/* Vertical Timeline Layout */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative mt-10 pl-6 border-l border-slate-100 space-y-6"
            >
              {reasons.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative flex gap-4 items-start rounded-xl border border-slate-50 bg-slate-50/30 p-4 hover:border-slate-200 hover:bg-slate-50/80 transition-all duration-300 group"
                  >
                    {/* Timeline Dot with Icon */}
                    <div className="absolute -left-[43px] top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 shadow-sm text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300">
                      <Icon size={14} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${point.color}`}>
                      <Icon size={16} />
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                      {point.text}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Grid of Statistics Counter */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((stat) => (
                <StatsCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  className="bg-slate-50/50 hover:border-blue-500/20 hover:scale-[1.03]"
                />
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl shadow-blue-500/10">
              <p className="text-sm font-bold uppercase tracking-wider opacity-90">Our Promise</p>
              <p className="mt-2 text-sm leading-relaxed opacity-95">
                We combine industry expertise, robust technology, and strict compliance parameters to secure candidates who build long-term value.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
