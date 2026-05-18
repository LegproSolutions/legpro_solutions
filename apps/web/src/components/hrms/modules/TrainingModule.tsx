"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, BookOpen, Users, Award, PlayCircle, CheckCircle2, Search, Filter, Plus, X 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  category: "Technical" | "Compliance" | "Leadership" | "Soft Skills";
  duration: string;
  enrolledCount: number;
  completionRate: number;
  status: "Mandatory" | "Optional" | "Recommended";
  isEnrolled?: boolean;
};

const initialCourses: Course[] = [
  { id: "TRN-201", title: "Next.js 15 & React 19 Advanced Patterns", category: "Technical", duration: "12 Hours", enrolledCount: 28, completionRate: 85, status: "Recommended", isEnrolled: true },
  { id: "TRN-202", title: "Enterprise Cybersecurity & GDPR Compliance", category: "Compliance", duration: "2 Hours", enrolledCount: 156, completionRate: 98, status: "Mandatory", isEnrolled: true },
  { id: "TRN-203", title: "Effective Team Leadership & OKR Coaching", category: "Leadership", duration: "8 Hours", enrolledCount: 14, completionRate: 60, status: "Optional" },
  { id: "TRN-204", title: "B2B Sales Negotiation & Deal Closing", category: "Soft Skills", duration: "6 Hours", enrolledCount: 32, completionRate: 75, status: "Recommended" },
  { id: "TRN-205", title: "Cloud Architecture & AWS Deployment", category: "Technical", duration: "16 Hours", enrolledCount: 19, completionRate: 40, status: "Optional" },
];

export function TrainingModule() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "Technical" as Course["category"],
    duration: "4 Hours",
    status: "Optional" as Course["status"],
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `TRN-${Math.floor(300 + Math.random() * 700)}`,
      title: courseForm.title || "New Training Module",
      category: courseForm.category,
      duration: courseForm.duration,
      enrolledCount: 0,
      completionRate: 0,
      status: courseForm.status,
    };
    setCourses([newCourse, ...courses]);
    setIsModalOpen(false);
    setCourseForm({ title: "", category: "Technical", duration: "4 Hours", status: "Optional" });
  };

  const toggleEnroll = (id: string) => {
    setCourses(courses.map(c => c.id === id ? { 
      ...c, 
      isEnrolled: !c.isEnrolled,
      enrolledCount: c.isEnrolled ? c.enrolledCount - 1 : c.enrolledCount + 1 
    } : c));
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || c.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Training & Upskilling</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage learning catalogs, employee certifications, and compliance training modules.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Courses</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{courses.length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><BookOpen size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Enrollments</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {courses.reduce((acc, c) => acc + c.enrolledCount, 0)}
              </p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><Users size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Avg Completion</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round(courses.reduce((acc, c) => acc + c.completionRate, 0) / courses.length)}%
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><CheckCircle2 size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Mandatory Modules</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{courses.filter(c => c.status === "Mandatory").length}</p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"><Award size={20} /></div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Compliance">Compliance</option>
            <option value="Leadership">Leadership</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 flex flex-col justify-between group transition-all hover:border-primary/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  course.status === "Mandatory" && "bg-rose-500/15 text-rose-700 dark:text-rose-400",
                  course.status === "Recommended" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                  course.status === "Optional" && "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                )}>
                  {course.status}
                </span>
                <span className="font-mono text-xs text-slate-500">{course.id}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.duration}</span>
                <span>•</span>
                <span>{course.enrolledCount} enrolled</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Completion Rate</span>
                  <span>{course.completionRate}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${course.completionRate}%` }} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleEnroll(course.id)}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-semibold transition shadow-sm",
                  course.isEnrolled ? "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10" : "bg-gradient-to-r from-primary to-accent text-white shadow-primary/20 hover:opacity-95"
                )}
              >
                {course.isEnrolled ? "Enrolled (Click to Leave)" : "Enroll Now"}
              </button>
              {course.isEnrolled && (
                <button
                  type="button"
                  onClick={() => alert(`Launching course: ${course.title}`)}
                  className="rounded-xl bg-slate-900 p-2.5 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  title="Launch Training Video"
                >
                  <PlayCircle size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Add Training Course</h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddCourse} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Course Title</label>
                  <input type="text" required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Next.js 15 & React 19 Advanced Patterns" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Category</label>
                    <select value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value as Course["category"]})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="Technical">Technical</option><option value="Compliance">Compliance</option><option value="Leadership">Leadership</option><option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Duration</label>
                    <input type="text" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} placeholder="e.g. 12 Hours" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Requirement Status</label>
                  <select value={courseForm.status} onChange={e => setCourseForm({...courseForm, status: e.target.value as Course["status"]})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                    <option value="Mandatory">Mandatory</option><option value="Recommended">Recommended</option><option value="Optional">Optional</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Create Course</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
