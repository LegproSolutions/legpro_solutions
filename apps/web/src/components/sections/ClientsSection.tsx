"use client";

import { site } from "@/lib/content";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

const partnerStyles: Record<string, { bg: string; border: string; text: string }> = {
  SMR: { bg: "rgba(29, 78, 216, 0.1)", border: "rgba(29, 78, 216, 0.3)", text: "#1D4ED8" }, // light blue tint, dark blue text
  Overdrive: { bg: "rgba(255, 165, 0, 0.1)", border: "rgba(255, 165, 0, 0.3)", text: "#FF6600" }, // orange brand
  OEL: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)", text: "#10B981" }, // teal/green
  UEL: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)", text: "#10B981" }, // teal/green
  Veira: { bg: "rgba(124, 58, 237, 0.1)", border: "rgba(124, 58, 237, 0.3)", text: "#7C3AED" }, // purple
  "New Holland": { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.3)", text: "#F59E0B" }, // amber
  Lava: { bg: "rgba(220, 38, 38, 0.1)", border: "rgba(220, 38, 38, 0.3)", text: "#DC2626" }, // red
  LAVA: { bg: "rgba(220, 38, 38, 0.1)", border: "rgba(220, 38, 38, 0.3)", text: "#DC2626" }, // red
  ITC: { bg: "rgba(13, 148, 136, 0.1)", border: "rgba(13, 148, 136, 0.3)", text: "#0D9488" }, // teal
  UFLEX: { bg: "rgba(220, 38, 38, 0.1)", border: "rgba(220, 38, 38, 0.3)", text: "#E53E3E" },
  "PMT EXIM": { bg: "rgba(30, 58, 138, 0.1)", border: "rgba(30, 58, 138, 0.3)", text: "#1E3A8A" },
  "JIVA AYURVEDA": { bg: "rgba(194, 65, 12, 0.1)", border: "rgba(194, 65, 12, 0.3)", text: "#C2410C" },
  SG: { bg: "rgba(15, 23, 42, 0.1)", border: "rgba(15, 23, 42, 0.3)", text: "#0F172A" },
  ILJIN: { bg: "rgba(234, 88, 12, 0.1)", border: "rgba(234, 88, 12, 0.3)", text: "#EA580C" },
  "CNH Industrial": { bg: "rgba(31, 41, 55, 0.1)", border: "rgba(31, 41, 55, 0.3)", text: "#1F2937" },
  "Kanodia Group": { bg: "rgba(14, 165, 233, 0.1)", border: "rgba(14, 165, 233, 0.3)", text: "#0EA5E9" },
  "ICICI Foundation": { bg: "rgba(249, 115, 22, 0.1)", border: "rgba(249, 115, 22, 0.3)", text: "#F97316" },
  Tecno: { bg: "rgba(37, 99, 235, 0.1)", border: "rgba(37, 99, 235, 0.3)", text: "#2563EB" },
  Incise: { bg: "rgba(132, 204, 22, 0.1)", border: "rgba(132, 204, 22, 0.3)", text: "#84CC16" },
  "Jupiter Laminators": { bg: "rgba(136, 19, 55, 0.1)", border: "rgba(136, 19, 55, 0.3)", text: "#881337" },
  Inkofix: { bg: "rgba(236, 72, 153, 0.1)", border: "rgba(236, 72, 153, 0.3)", text: "#EC4899" },
  "JPan Tubular": { bg: "rgba(30, 64, 175, 0.1)", border: "rgba(30, 64, 175, 0.3)", text: "#1E40AF" },
};

const partnerLogos: Record<string, string> = {
  "New Holland": "/logos/new-holland.png",
  "ITC": "/logos/itc.jpg",
  "UEL": "/logos/oel.png",
  "OEL": "/logos/oel.png",
  "Veira": "/logos/veira.png",
  "Overdrive": "/logos/overdrive.jpg",
  "UFLEX": "/logos/uflex.jpg",
  "PMT EXIM": "/logos/pmt-exim.jpg",
  "JIVA AYURVEDA": "/logos/jiva-ayurveda.jpg",
  "SG": "/logos/sg.jpg",
  "ILJIN": "/logos/iljin.jpg",
  "SMR": "/logos/smr.jpg",
  Lava: "/logos/lava.jpg",
  LAVA: "/logos/lava.jpg",
  "CNH Industrial": "/logos/cnh-industrial.png",
  "Kanodia Group": "/logos/kanodia-group.jpg",
  "ICICI Foundation": "/logos/icici-foundation.png",
  Tecno: "/logos/tecno.jpg",
  Incise: "/logos/incise.jpg",
  "Jupiter Laminators": "/logos/jupiter-laminators.png",
  Inkofix: "/logos/inkofix.png",
  "JPan Tubular": "/logos/jpan-tubular.png",
};

export function ClientsSection() {
  // Double the partners to ensure seamless marquee looping (-50% translation)
  const partners = [...site.partners, ...site.partners];

  return (
    <Section id="clients" className="!py-10 md:!py-12 bg-white overflow-hidden">
      <Container>
        <SectionHeader title="Partners" dark={false} />
        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right Fading Gradients for Premium Overlay */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-6">
            {partners.map((name, i) => {
              const logoSrc = partnerLogos[name];
              const styles = partnerStyles[name] || {
                bg: "rgba(255,255,255,0.1)",
                border: "rgba(200,200,200,0.3)",
                text: "#4B5563"
              };
              return (
                <div
                  key={`${name}-${i}`}
                  style={{
                    backgroundColor: logoSrc ? "#FFFFFF" : styles.bg,
                    borderColor: logoSrc ? "rgba(229, 231, 235, 1)" : styles.border,
                  }}
                  className="flex h-16 w-44 items-center justify-center rounded-xl border px-4 shadow-sm transition-all duration-300 hover:scale-105 shrink-0"
                >
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${name} Logo`}
                      className="h-10 w-[120px] object-contain"
                    />
                  ) : (
                    <span
                      className="text-lg font-extrabold tracking-wider transition-colors duration-300"
                      style={{ color: styles.text }}
                    >
                      {name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
