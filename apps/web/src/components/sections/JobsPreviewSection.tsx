"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

const previewJobs = [
  { id: "1", title: "Production Engineer", company: "Manufacturing Client", location: "Ghaziabad, UP", type: "Full-time" },
  { id: "2", title: "HR Executive", company: "Corporate Client", location: "Noida, UP", type: "Full-time" },
  { id: "3", title: "IT Support Specialist", company: "Technology Client", location: "Delhi NCR", type: "Contract" },
];

export function JobsPreviewSection() {
  return (
    <Section id="jobs-preview">
      <Container>
        <SectionHeader eyebrow="Careers" title="Open Positions" description="Explore opportunities and apply with your resume." />
        <div className="grid gap-6 md:grid-cols-3">
          {previewJobs.map((job) => (
            <article key={job.id} className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                <Briefcase size={14} /> {job.company}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} /> {job.location}
              </p>
              <span className="mt-3 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">{job.type}</span>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/jobs" className="btn-primary inline-flex items-center gap-2">
            View all jobs <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
