"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Award, Target, Star, Plus, Check, X, 
  BarChart2, Users, Calendar as CalendarIcon, CheckCircle2 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { cn } from "@/lib/utils";

type Goal = {
  id: string;
  employee: string;
  title: string;
  category: string;
  progress: number;
  targetDate: string;
  status: "On Track" | "At Risk" | "Completed";
};

type ReviewCycle = {
  id: string;
  name: string;
  period: string;
  completion: number;
  status: "Active" | "Upcoming" | "Closed";
};

const initialGoals: Goal[] = [
  { id: "G-1", employee: "Aditi Sharma", title: "Complete HR Automation Setup", category: "Process Improvement", progress: 85, targetDate: "2026-06-30", status: "On Track" },
  { id: "G-2", employee: "Vikram Patel", title: "Reduce Ticket SLA by 15%", category: "Operations", progress: 40, targetDate: "2026-05-31", status: "At Risk" },
  { id: "G-3", employee: "Neha Gupta", title: "Migrate Legacy Module to Next.js 15", category: "Engineering", progress: 100, targetDate: "2026-04-30", status: "Completed" },
  { id: "G-4", employee: "Arjun Rao", title: "Expand Enterprise Client Base by 20%", category: "Sales", progress: 75, targetDate: "2026-06-30", status: "On Track" },
];

const initialCycles: ReviewCycle[] = [
  { id: "CYC-26Q1", name: "Q1 2026 Performance Review", period: "Jan 1 – Mar 31, 2026", completion: 100, status: "Closed" },
  { id: "CYC-26Q2", name: "Q2 2026 Mid-Year Review", period: "Apr 1 – Jun 30, 2026", completion: 65, status: "Active" },
  { id: "CYC-26Q3", name: "Q3 2026 Goal Alignment", period: "Jul 1 – Sep 30, 2026", completion: 0, status: "Upcoming" },
];

const teamPerformanceData = [
  { dept: "Engineering", rating: 4.6, kpi: 92 },
  { dept: "Sales", rating: 4.3, kpi: 88 },
  { dept: "HR & Ops", rating: 4.5, kpi: 90 },
  { dept: "Finance", rating: 4.4, kpi: 85 },
];

const radarData = [
  { skill: "Technical Skill", A: 95, B: 85, fullMark: 100 },
  { skill: "Leadership", A: 88, B: 90, fullMark: 100 },
  { skill: "Communication", A: 92, B: 85, fullMark: 100 },
  { skill: "Problem Solving", A: 90, B: 88, fullMark: 100 },
  { skill: "Teamwork", A: 96, B: 92, fullMark: 100 },
];

export function PerformanceModule() {
  const [activeTab, setActiveTab] = useState<"kpis" | "cycles" | "charts">("kpis");
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [cycles, setCycles] = useState<ReviewCycle[]>(initialCycles);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Goal Form
  const [goalForm, setGoalForm] = useState({
    employee: "Aditi Sharma",
    title: "",
    category: "Professional Development",
    progress: 10,
    targetDate: "",
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: Goal = {
      id: `G-${Math.floor(10 + Math.random() * 90)}`,
      employee: goalForm.employee,
      title: goalForm.title || "New KPI Goal",
      category: goalForm.category,
      progress: goalForm.progress,
      targetDate: goalForm.targetDate || new Date().toISOString().split("T")[0],
      status: goalForm.progress >= 100 ? "Completed" : "On Track",
    };
    setGoals([newGoal, ...goals]);
    setIsGoalModalOpen(false);
    setGoalForm({ employee: "Aditi Sharma", title: "", category: "Professional Development", progress: 10, targetDate: "" });
  };

  const updateProgress = (id: string, newProgress: number) => {
    setGoals(goals.map(g => g.id === id ? { 
      ...g, 
      progress: newProgress, 
      status: newProgress >= 100 ? "Completed" : newProgress < 50 ? "At Risk" : "On Track" 
    } : g));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Performance & Goals</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track KPIs, manage OKRs, conduct review cycles, and analyze team ratings.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsGoalModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> Assign New Goal
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Org Avg Rating</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">4.45 <span className="text-sm font-normal text-slate-500">/ 5.0</span></p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><Star size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Goals</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{goals.filter(g => g.status !== "Completed").length}</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><Target size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Goals Completed</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{goals.filter(g => g.status === "Completed").length}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><CheckCircle2 size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Review Cycle</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">Q2 2026</p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"><Award size={20} /></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 overflow-x-auto">
        {[
          { id: "kpis", label: "KPI Tracking & Goals", icon: Target },
          { id: "cycles", label: "Review Cycles & Ratings", icon: Award },
          { id: "charts", label: "Team Performance Charts", icon: BarChart2 },
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

      {/* TAB 1: KPI Tracking & Goals */}
      {activeTab === "kpis" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Employee Goals & OKRs</h3>
            <button
              type="button"
              onClick={() => setIsGoalModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <Plus size={14} /> Assign Goal
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Goal / KPI Objective</th>
                  <th className="px-6 py-3.5 font-semibold">Category</th>
                  <th className="px-6 py-3.5 font-semibold">Progress</th>
                  <th className="px-6 py-3.5 font-semibold">Target Date</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {goals.map((goal) => (
                  <tr key={goal.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{goal.employee}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{goal.title}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{goal.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                          <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${goal.progress}%` }} />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{goal.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{goal.targetDate}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        goal.status === "Completed" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                        goal.status === "On Track" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                        goal.status === "At Risk" && "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                      )}>
                        {goal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {goal.progress < 100 && (
                        <button
                          type="button"
                          onClick={() => updateProgress(goal.id, Math.min(100, goal.progress + 25))}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                          +25%
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Review Cycles */}
      {activeTab === "cycles" && (
        <div className="grid gap-6 md:grid-cols-3">
          {cycles.map((cyc) => (
            <div key={cyc.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    cyc.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : cyc.status === "Upcoming" ? "bg-blue-500/15 text-blue-700 dark:text-blue-400" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                  )}>
                    {cyc.status}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{cyc.id}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{cyc.name}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><CalendarIcon size={14} /> {cyc.period}</p>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Review Completion</span>
                    <span>{cyc.completion}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${cyc.completion}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-4 dark:border-white/10">
                <button type="button" className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                  {cyc.status === "Closed" ? "View Final Reports" : "Manage Reviews"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Team Performance Charts */}
      {activeTab === "charts" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Department-wise KPI Achievement (%)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
                  <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="kpi" fill="#10b981" radius={[6, 6, 0, 0]} name="KPI Achievement %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Core Competencies Radar</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid className="stroke-slate-200 dark:stroke-white/10" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Org Average" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Assign Goal Modal */}
      <AnimatePresence>
        {isGoalModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Assign KPI / Goal</h3>
                <button type="button" onClick={() => setIsGoalModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddGoal} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Select Employee</label>
                  <select value={goalForm.employee} onChange={e => setGoalForm({...goalForm, employee: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                    <option value="Aditi Sharma">Aditi Sharma</option><option value="Vikram Patel">Vikram Patel</option><option value="Neha Gupta">Neha Gupta</option><option value="Arjun Rao">Arjun Rao</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Goal / KPI Title</label>
                  <input type="text" required value={goalForm.title} onChange={e => setGoalForm({...goalForm, title: e.target.value})} placeholder="e.g. Complete HR Automation Setup" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Category</label>
                    <select value={goalForm.category} onChange={e => setGoalForm({...goalForm, category: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="Process Improvement">Process Improvement</option><option value="Operations">Operations</option><option value="Engineering">Engineering</option><option value="Sales">Sales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Target Date</label>
                    <input type="date" required value={goalForm.targetDate} onChange={e => setGoalForm({...goalForm, targetDate: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsGoalModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Assign Goal</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
