"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ArrowLeft } from "lucide-react";
import { fetchJobs, type Job } from "@/lib/api";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({ title, location, type });
      setJobs(data);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs();
  };

  return (
    <div className="min-h-screen bg-surface-dark">
      <Container className="py-12">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-display text-4xl font-bold text-white">
          <TypewriterText text="Job Mela — Open Positions" cursorColor="#0ea5e9" />
        </h1>
        <p className="mt-2 text-slate-400">Search and apply for current job openings.</p>

        <form onSubmit={handleSearch} className="mt-8 glass-card p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white"
            >
              <option value="">All types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>
            <button type="submit" className="btn-primary">
              <Search size={18} /> Search
            </button>
          </div>
        </form>

        {loading ? (
          <p className="mt-12 text-center text-slate-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="mt-12 text-center text-slate-400">No jobs match your search.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article key={job._id} className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white">{job.title}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <Briefcase size={14} /> {job.company}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={14} /> {job.location}
                </p>
                <span className="mt-3 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
                  {job.type}
                </span>
                <p className="mt-3 line-clamp-2 text-sm text-slate-400">{job.description}</p>
                <button type="button" className="btn-primary mt-4 w-full text-sm">
                  Apply Now
                </button>
              </article>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
