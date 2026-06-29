"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, UserCheck, CheckCircle2 } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

const steps = [
  {
    step: "01",
    title: "Requirement Analysis",
    description: "We work close with your leadership and HR teams to fully map out exact technical skills, experience requirements, and cultural fit.",
    icon: ClipboardList,
    color: "from-blue-600 to-indigo-600",
  },
  {
    step: "02",
    title: "Talent Sourcing",
    description: "Leveraging our massive database, active networks, and digital platforms to identify potential active and passive candidates.",
    icon: Search,
    color: "from-teal-600 to-emerald-600",
  },
  {
    step: "03",
    title: "Screening & Interview",
    description: "Conducting multi-stage assessments, background verification checkups, and technical interviews before presenting a curated shortlist.",
    icon: UserCheck,
    color: "from-amber-500 to-orange-500",
  },
  {
    step: "04",
    title: "Successful Onboarding",
    description: "Managing offer negotiations, compliance verification, and post-onboarding orientation to ensure high candidate retention.",
    icon: CheckCircle2,
    color: "from-blue-600 to-teal-500",
  },
];

export function ProcessSection() {
  return (
    <Section id="process" className="!py-10 md:!py-12 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Our Process"
          title="How We Deliver Outstanding Talent"
          description="A systematic, transparent recruitment flow designed to connect you with the right professionals efficiently."
          dark={false}
        />

        <div className="relative mt-16">
          {/* Connector Line for Desktop */}
          <div className="absolute top-[38px] left-[15%] right-[15%] hidden h-0.5 bg-gradient-to-r from-blue-100 via-teal-100 to-blue-50 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Step Bubble */}
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-xl shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>

                  <span className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-600">
                    Step {step.step}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
