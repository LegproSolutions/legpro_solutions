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
];

export function ServicesSection() {
  return (
    <Section id="services" className="!py-16 bg-white border-y border-slate-100">
      <Container>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-black text-black uppercase tracking-wide">
            Our Services
          </h2>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-12 justify-center">
          {servicesList.map((service, index) => {
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col items-center justify-center h-[360px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer border border-slate-100"
              >
                {/* Image Background */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-all duration-300" />

                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide leading-snug transition-transform duration-300 group-hover:-translate-y-1 max-w-[280px] mb-4">
                    {service.title}
                  </h3>

                  {/* Know More Button */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
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
