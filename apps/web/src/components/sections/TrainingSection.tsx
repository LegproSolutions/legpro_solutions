"use client";

import { Languages, Award, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/content";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

const icons = { Languages, Award, Wrench };

export function TrainingSection() {
  return (
    <Section id="training" className="!py-10 md:!py-12">
      <Container>
        <SectionHeader
          eyebrow="Training Programs"
          title="Skill Development & Certification"
          description="Programs bridging education and industry for ITI, Diploma, and skilled professionals."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {site.training.map((course, i) => {
            const Icon = icons[course.icon as keyof typeof icons] || Wrench;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <Icon className="h-10 w-10 text-accent" />
                <h3 className="mt-4 text-xl font-semibold text-white">{course.title}</h3>
                <p className="mt-2 text-slate-400">{course.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
