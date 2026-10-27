"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";

type Service = {
  id: string;
  title: string;
  image: string;
  href: string;
};

const servicesList: Service[] = [
  {
    id: "talent-acquisition",
    title: "Talent Acquisition",
    image: "/service-aedp.png",
    href: "/talent-acquisition",
  },
  {
    id: "contractual-staffing",
    title: "Contractual Staffing",
    image: "/service-contractual.png",
    href: "/contractual-staffing",
  },
  {
    id: "naps-nats",
    title: "NAPS/NATS",
    image: "/service-naps.png",
    href: "/naps-nats",
  },
  {
    id: "bvoc-dvoc",
    title: "BVoc./ DVoc.",
    image: "/service-bvoc.png",
    href: "/bvoc-dvoc",
  },
  {
    id: "learning-staffing",
    title: "Learning Skills",
    image: "/service-nats.png",
    href: "/learning-staffing",
  },
  {
    id: "international-recruitment",
    title: "International Recruitment",
    image: "/service-international.png",
    href: "/international-recruitment",
  },
  {
    id: "eor-services",
    title: "EOR Services",
    image: "/service-eor.png",
    href: "/eor-services",
  },
];

export function ServicesSection() {
  return (
    <Section id="services" className="!py-12 sm:!py-16 bg-white border-y border-slate-100">
      <Container>
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-wide">
            Our Services
          </h2>
          <div className="mt-4 sm:mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mt-8 sm:mt-12">
          {servicesList.map((service, index) => {
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group relative flex flex-col items-center justify-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[300px] sm:h-[340px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer border border-slate-100"
              >
                {/* Image Background */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-all duration-300" />

                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 z-10">
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide leading-snug transition-transform duration-300 group-hover:-translate-y-1 max-w-[240px] mb-3 sm:mb-4">
                    {service.title}
                  </h3>

                  {/* Know More Button */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span>Know More</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>


      </Container>
    </Section>
  );
}
