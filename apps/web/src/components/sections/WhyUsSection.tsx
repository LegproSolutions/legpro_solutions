"use client";

import { CheckCircle } from "lucide-react";
import { site } from "@/lib/content";
import { Section, Container } from "@/components/ui/Section";
import { StatsCounter } from "@/components/ui/StatsCounter";

export function WhyUsSection() {
  return (
    <Section id="why-us">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Why Choose Us</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{site.whyUs.title}</h2>
            <ul className="mt-8 space-y-4">
              {site.whyUs.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {site.whyUs.stats.map((stat) => (
              <StatsCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
