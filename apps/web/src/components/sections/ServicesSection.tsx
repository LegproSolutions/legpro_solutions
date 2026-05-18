"use client";

import {
  Briefcase,
  Clock,
  Target,
  ShieldCheck,
  GraduationCap,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/content";
import { Section, SectionHeader, Container } from "@/components/ui/Section";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Clock,
  Target,
  ShieldCheck,
  GraduationCap,
  Cpu,
};

export function ServicesSection() {
  return (
    <Section id="services" light>
      <Container>
        <SectionHeader
          eyebrow="Our Services"
          title="Comprehensive Recruitment Services"
          description="Tailored staffing solutions for every industry."
          dark={false}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Briefcase;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg"
              >
                <span className="text-xs font-bold text-primary">{service.number}</span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/#contact" className="btn-primary">
            Discuss Your Needs
          </Link>
        </div>
      </Container>
    </Section>
  );
}
