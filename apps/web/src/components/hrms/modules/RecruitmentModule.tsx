"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, UserPlus, Calendar as CalendarIcon, FileText, 
  Plus, Check, X, Clock, Search, Filter, Eye, ArrowRight, UserCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

type JobPosting = {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  status: "Active" | "Closed" | "Draft";
  applicants: number;
};

type Candidate = {
  id: string;
  name: string;
  jobTitle: string;
  stage: "Applied" | "Shortlisted" | "Interviewing" | "Offered" | "Hired";
  appliedDate: string;
  rating: number;
};

type Interview = {
  id: string;
  candidate: string;
  job: string;
  date: string;
  time: string;
  interviewer: string;
  round: string;
};

const initialJobs: JobPosting[] = [
  { id: "JOB-01", title: "Senior React Developer", dept: "IT", location: "Bangalore (Hybrid)", type: "Full-time", experience: "5-8 Yrs", status: "Active", applicants: 42 },
  { id: "JOB-02", title: "HR Business Partner", dept: "HR", location: "Mumbai (On-site)", type: "Full-time", experience: "3-5 Yrs", status: "Active", applicants: 18 },
  { id: "JOB-03", title: "Sales Account Executive", dept: "Sales", location: "Delhi NCR", type: "Full-time", experience: "2-4 Yrs", status: "Active", applicants: 31 },
  { id: "JOB-04", title: "DevOps Engineer", dept: "IT", location: "Remote", type: "Full-time", experience: "4-6 Yrs", status: "Closed", applicants: 25 },
];

const initialCandidates: Candidate[] = [
  { id: "CAN-101", name: "Rohan Sharma", jobTitle: "Senior React Developer", stage: "Interviewing", appliedDate: "2026-05-10", rating: 4.5 },
  { id: "CAN-102", name: "Priya Menon", jobTitle: "HR Business Partner", stage: "Shortlisted", appliedDate: "2026-05-12", rating: 4.2 },
  { id: "CAN-103", name: "Amit Patel", jobTitle: "Sales Account Executive", stage: "Applied", appliedDate: "2026-05-15", rating: 3.8 },
  { id: "CAN-104", name: "Sneha Roy", jobTitle: "Senior React Developer", stage: "Offered", appliedDate: "2026-05-05", rating: 4.8 },
  { id: "CAN-105", name: "Karan Johar", jobTitle: "DevOps Engineer", stage: "Hired", appliedDate: "2026-04-20", rating: 4.9 },
];

const initialInterviews: Interview[] = [
  { id: "INT-1", candidate: "Rohan Sharma", job: "Senior React Developer", date: "2026-05-19", time: "02:30 PM", interviewer: "Neha Gupta", round: "Technical Round 2" },
  { id: "INT-2", candidate: "Priya Menon", job: "HR Business Partner", date: "2026-05-20", time: "11:00 AM", interviewer: "Aditi Sharma", round: "HR Manager Round" },
];

export function RecruitmentModule() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "jobs" | "interviews" | "resumes">("pipeline");
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);

  // Modals state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

  // Job Form
  const [jobForm, setJobForm] = useState({
    title: "",
    dept: "IT",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-5 Yrs",
  });

  // Interview Form
  const [interviewForm, setInterviewForm] = useState({
    candidate: "Rohan Sharma",
    job: "Senior React Developer",
    date: "",
    time: "10:00 AM",
    interviewer: "Neha Gupta",
    round: "Technical Round 1",
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobPosting = {
      id: `JOB-${Math.floor(10 + Math.random() * 90)}`,
      title: jobForm.title || "New Job Posting",
      dept: jobForm.dept,
      location: jobForm.location,
      type: jobForm.type,
      experience: jobForm.experience,
      status: "Active",
      applicants: 0,
    };
    setJobs([newJob, ...jobs]);
    setIsJobModalOpen(false);
    setJobForm({ title: "", dept: "IT", location: "Bangalore", type: "Full-time", experience: "3-5 Yrs" });
  };

  const handleAddInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt: Interview = {
      id: `INT-${Math.floor(10 + Math.random() * 90)}`,
      candidate: interviewForm.candidate,
      job: interviewForm.job,
      date: interviewForm.date || new Date().toISOString().split("T")[0],
      time: interviewForm.time,
      interviewer: interviewForm.interviewer,
      round: interviewForm.round,
    };
    setInterviews([newInt, ...interviews]);
    setIsInterviewModalOpen(false);
  };

  const moveStage = (id: string, nextStage: Candidate["stage"]) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, stage: nextStage } : c));
  };

  const stages: Array<Candidate["stage"]> = ["Applied", "Shortlisted", "Interviewing", "Offered", "Hired"];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Recruitment & Hiring</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage job postings, candidate pipelines, interviews, and resume databases.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsInterviewModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <CalendarIcon size={18} /> Schedule Interview
          </button>
          <button
            type="button"
            onClick={() => setIsJobModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
          >
            <Plus size={18} /> Post New Job
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Jobs</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{jobs.filter(j => j.status === "Active").length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><Briefcase size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Applicants</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {jobs.reduce((acc, j) => acc + j.applicants, 0)}
              </p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><UserPlus size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Upcoming Interviews</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{interviews.length}</p>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"><CalendarIcon size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Candidates Hired</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {candidates.filter(c => c.stage === "Hired").length}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><UserCheck size={20} /></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 overflow-x-auto">
        {[
          { id: "pipeline", label: "Candidate Pipeline Kanban", icon: UserPlus },
          { id: "jobs", label: "Job Postings", icon: Briefcase },
          { id: "interviews", label: "Interview Scheduling", icon: CalendarIcon },
          { id: "resumes", label: "Resume Database & Tracker", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors",
                active ? "border-primary text-primary dark:border-accent dark:text-accent" : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Candidate Pipeline Kanban */}
      {activeTab === "pipeline" && (
        <div className="grid gap-4 md:grid-cols-5 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter(c => c.stage === stage);
            return (
              <div key={stage} className="flex flex-col min-w-[260px] rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-slate-900/40">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3 dark:border-white/10">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{stage}</h3>
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                    {stageCandidates.length}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  {stageCandidates.map((cand) => (
                    <div key={cand.id} className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary/40 dark:border-white/10 dark:bg-slate-900">
                      <p className="font-semibold text-slate-900 dark:text-white">{cand.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cand.jobTitle}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-white/10">
                        <span className="text-amber-500 font-semibold">★ {cand.rating}</span>
                        {stage !== "Hired" && (
                          <button
                            type="button"
                            onClick={() => {
                              const nextIdx = stages.indexOf(stage) + 1;
                              if (nextIdx < stages.length) moveStage(cand.id, stages[nextIdx]);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 font-semibold text-primary transition hover:bg-primary/20 dark:bg-accent/10 dark:text-accent dark:hover:bg-accent/20"
                          >
                            Next <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Job Postings */}
      {activeTab === "jobs" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Active & Closed Job Openings</h3>
            <button
              type="button"
              onClick={() => setIsJobModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <Plus size={14} /> Post Job
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Job Title</th>
                  <th className="px-6 py-3.5 font-semibold">Department</th>
                  <th className="px-6 py-3.5 font-semibold">Location</th>
                  <th className="px-6 py-3.5 font-semibold">Experience</th>
                  <th className="px-6 py-3.5 font-semibold">Applicants</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {jobs.map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{job.title}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.dept}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.location}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.experience}</td>
                    <td className="px-6 py-4 font-bold text-primary dark:text-accent">{job.applicants} Candidates</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        job.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300"
                      )}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Interview Scheduling */}
      {activeTab === "interviews" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Scheduled Candidate Interviews</h3>
            <button
              type="button"
              onClick={() => setIsInterviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <Plus size={14} /> Schedule Interview
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Candidate</th>
                  <th className="px-6 py-3.5 font-semibold">Job Position</th>
                  <th className="px-6 py-3.5 font-semibold">Interview Date & Time</th>
                  <th className="px-6 py-3.5 font-semibold">Interviewer</th>
                  <th className="px-6 py-3.5 font-semibold">Round</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {interviews.map((int) => (
                  <tr key={int.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{int.candidate}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{int.job}</td>
                    <td className="px-6 py-4 font-medium text-primary dark:text-accent">{int.date} at {int.time}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{int.interviewer}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{int.round}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Resume Database */}
      {activeTab === "resumes" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4 dark:border-white/10">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Resume Database & Talent Pool</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Parsed candidate resumes, scores, and interview histories.</p>
            </div>
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search skills, names, previous roles..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
          </div>
          <div className="space-y-3">
            {candidates.map((cand, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><FileText size={20} /></div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{cand.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Applied for {cand.jobTitle} • {cand.appliedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">★ {cand.rating} Fit Score</span>
                  <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 dark:hover:text-white" title="View Resume PDF"><Eye size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      <AnimatePresence>
        {isJobModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Post New Job Opening</h3>
                <button type="button" onClick={() => setIsJobModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddJob} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Job Title</label>
                  <input type="text" required value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} placeholder="e.g. Senior React Developer" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Department</label>
                    <select value={jobForm.dept} onChange={e => setJobForm({...jobForm, dept: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="IT">IT</option><option value="HR">HR</option><option value="Sales">Sales</option><option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Location</label>
                    <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} placeholder="e.g. Bangalore (Hybrid)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Employment Type</label>
                    <select value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="Full-time">Full-time</option><option value="Contract">Contract</option><option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Experience Required</label>
                    <input type="text" value={jobForm.experience} onChange={e => setJobForm({...jobForm, experience: e.target.value})} placeholder="e.g. 3-5 Yrs" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsJobModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Post Job Opening</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {isInterviewModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Schedule Candidate Interview</h3>
                <button type="button" onClick={() => setIsInterviewModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddInterview} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Select Candidate</label>
                  <select value={interviewForm.candidate} onChange={e => setInterviewForm({...interviewForm, candidate: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                    {candidates.map(c => <option key={c.id} value={c.name}>{c.name} ({c.jobTitle})</option>)}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Interview Date</label>
                    <input type="date" required value={interviewForm.date} onChange={e => setInterviewForm({...interviewForm, date: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Time</label>
                    <input type="text" required value={interviewForm.time} onChange={e => setInterviewForm({...interviewForm, time: e.target.value})} placeholder="10:00 AM" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Interviewer Name</label>
                    <input type="text" required value={interviewForm.interviewer} onChange={e => setInterviewForm({...interviewForm, interviewer: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Interview Round</label>
                    <input type="text" required value={interviewForm.round} onChange={e => setInterviewForm({...interviewForm, round: e.target.value})} placeholder="e.g. Technical Round 1" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsInterviewModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Schedule Interview</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
