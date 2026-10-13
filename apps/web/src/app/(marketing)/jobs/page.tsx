"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { fetchJobs, type Job } from "@/lib/api";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { CandidateDetailsModal } from "@/components/modals/CandidateDetailsModal";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | undefined>(undefined);

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

  const handleApplyClick = (jobTitle?: string) => {
    setSelectedJobTitle(jobTitle);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-dark">
      <Container className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <button
            type="button"
            onClick={() => handleApplyClick()}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition active:scale-98 self-start sm:self-auto"
          >
            <Sparkles size={16} />
            <span>Register for JobMela</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          <TypewriterText text="Job Mela — Open Positions" cursorColor="#0ea5e9" />
        </h1>
        <p className="mt-2 text-slate-400">
          Search verified vacancies and submit your candidate details to directly enter the JobMela portal.
        </p>

        <form onSubmit={handleSearch} className="mt-8 glass-card p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#071329] px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
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
          <div className="mt-12 text-center text-slate-400 space-y-4">
            <p>No jobs match your search.</p>
            <button
              type="button"
              onClick={() => handleApplyClick()}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <span>Register Directly for JobMela</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article key={job._id} className="glass-card p-6 flex flex-col justify-between">
                <div>
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
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyClick(job.title)}
                  className="btn-primary mt-5 w-full text-sm flex items-center justify-center gap-2"
                >
                  <span>Apply via JobMela</span>
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        )}

        {/* Candidate Details Popup Modal */}
        <CandidateDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          jobTitle={selectedJobTitle}
        />
      </Container>
    </div>
  );
}
