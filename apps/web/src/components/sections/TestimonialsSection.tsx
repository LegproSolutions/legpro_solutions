"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote: "Legpro Solution's customized staffing approach completely transformed our engineering pipeline. We reduced time-to-hire by nearly 50% while getting top-tier talent.",
    author: "Rahul Sharma",
    role: "VP of Engineering",
    company: "TechNexus Systems",
    rating: 5,
  },
  {
    quote: "Their bulk hiring solutions for our new plant expansion in Noida was outstanding. They sourced, screened, and onboarded over 150 skilled operators in record time.",
    author: "Priya Nair",
    role: "Human Resources Director",
    company: "Vanguard Manufacturing",
    rating: 5,
  },
  {
    quote: "We partner with Legpro for executive search requirements. Their approach is highly professional, confidential, and they consistently deliver excellent candidates.",
    author: "Arjun Mehta",
    role: "Chief Operating Officer",
    company: "Aura Logistics Group",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="!py-10 md:!py-12 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Success Stories"
          title="What Our Clients Say"
          description="Read experiences from some of India's leading organizations who trust us for staffing excellence."
          dark={false}
        />

        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glass-card-hover p-8 border-white/5 relative flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <Quote className="absolute right-8 top-8 h-12 w-12 text-teal-500/10 pointer-events-none" />

                <p className="text-slate-800 text-sm leading-relaxed italic relative z-10">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{test.author}</p>
                  <p className="text-xs text-slate-400">{test.role}</p>
                  <p className="text-xs text-accent font-semibold mt-0.5">{test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
