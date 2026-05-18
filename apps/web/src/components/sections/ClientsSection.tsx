"use client";

import { site } from "@/lib/content";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

export function ClientsSection() {
  const partners = [...site.partners, ...site.partners];

  return (
    <Section id="clients" light>
      <Container>
        <SectionHeader eyebrow="Clients & Partners" title="Trusted by Industry Leaders" dark={false} />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 py-8">
          <div className="flex animate-marquee whitespace-nowrap">
            {partners.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="mx-8 flex shrink-0 items-center rounded-xl border border-white/10 bg-white/5 px-10 py-4"
              >
                <span className="text-lg font-semibold text-white/80">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <blockquote className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-900 p-8 text-center">
          <p className="text-lg italic text-slate-300">
            &ldquo;Legpro streamlined our hiring process and delivered quality candidates.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-accent">— HR Partner, Manufacturing Sector</footer>
        </blockquote>
      </Container>
    </Section>
  );
}
