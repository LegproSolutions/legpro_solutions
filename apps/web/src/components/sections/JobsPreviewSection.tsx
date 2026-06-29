"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Calendar } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/ui/Section";
import { motion } from "framer-motion";

const previewJobs = [
  { id: "1", title: "Senior Software Engineer", experience: "5 - 8 Years", location: "Bangalore (WFH/Hybrid)", type: "Full-time" },
  { id: "2", title: "Assistant Production Manager", experience: "3 - 6 Years", location: "Pune, Maharashtra", type: "Full-time" },
  { id: "3", title: "HR Generalist & Recruiter", experience: "1 - 3 Years", location: "Noida, UP", type: "Full-time" },
  { id: "4", title: "Logistics Operations Lead", experience: "4 - 7 Years", location: "Chennai, Tamil Nadu", type: "Contract" },
];

export function JobsPreviewSection() {
  return (
    <Section id="jobs-preview" className="!py-10 md:!py-12 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Featured Openings"
          title="Current Job Openings"
          description="Join some of the fastest-growing organizations in India. Apply today."
          dark={false}
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {previewJobs.map((job, index) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card glass-card-hover p-6 border-white/5 flex flex-col justify-between h-[250px]"
            >
              <div>
                <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">
                  {job.type}
                </span>
                
                <h3 className="text-lg font-bold text-slate-800 tracking-tight mt-3 line-clamp-2 leading-snug">
                  {job.title}
                </h3>
                
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin size={14} className="text-accent" />
                    <span>{job.location}</span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar size={14} className="text-accent" />
                    <span>{job.experience}</span>
                  </p>
                </div>
              </div>
              
              <Link
                href="/jobs"
                className="mt-6 w-full text-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-2.5 text-xs font-semibold text-white shadow-md hover:opacity-95 transition active:scale-[0.98]"
              >
                Apply Now
              </Link>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/jobs" className="btn-secondary inline-flex items-center gap-2">
            <span>Explore All Vacancies</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
