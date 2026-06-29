"use client";

import { site } from "@/lib/content";
import { Section, SectionHeader, Container } from "@/components/ui/Section";
import { StatsCounter } from "@/components/ui/StatsCounter";

export function AboutSection() {
  return (
    <Section id="about" className="!py-10 md:!py-12">
      <Container>
        <SectionHeader
          eyebrow="About Us"
          title={site.about.title}
          description={site.about.overview}
        />
        <p className="mx-auto mb-12 max-w-3xl text-center text-slate-400">{site.about.highlight}</p>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="glass-card p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">{site.about.mission.title}</h3>
            <p className="text-slate-400">{site.about.mission.text}</p>
          </div>
          <div className="glass-card p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">{site.about.values.title}</h3>
            <ul className="space-y-2">
              {site.about.values.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16 glass-card p-8">
          <h3 className="mb-3 text-xl font-semibold text-white">{site.about.journey.title}</h3>
          <p className="text-slate-400">{site.about.journey.text}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.about.timeline.map((step) => (
              <div key={step.year} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-accent">{step.year}</p>
                <p className="mt-1 text-sm text-slate-400">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.about.stats.map((stat) => (
            <StatsCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
