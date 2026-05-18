"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ListTodo, Plus, CheckCircle2, Clock, AlertCircle, X, Search, Filter, User 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  assignedTo: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

const initialTasks: Task[] = [
  { id: "TSK-101", title: "Review Q1 Attendance Logs", assignedTo: "Aditi Sharma", priority: "High", status: "In Progress", dueDate: "2026-05-20" },
  { id: "TSK-102", title: "Finalize Payroll Batch Files", assignedTo: "Vikram Patel", priority: "High", status: "Pending", dueDate: "2026-05-25" },
  { id: "TSK-103", title: "Schedule Interviews for React Dev", assignedTo: "Pooja Verma", priority: "Medium", status: "In Progress", dueDate: "2026-05-19" },
  { id: "TSK-104", title: "Update Onboarding Documents", assignedTo: "Neha Gupta", priority: "Low", status: "Completed", dueDate: "2026-05-15" },
  { id: "TSK-105", title: "Prepare Monthly HR Analytics Report", assignedTo: "Aditi Sharma", priority: "Medium", status: "Pending", dueDate: "2026-05-28" },
];

export function TasksModule() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const [taskForm, setTaskForm] = useState({
    title: "",
    assignedTo: "Aditi Sharma",
    priority: "Medium" as Task["priority"],
    dueDate: "",
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: taskForm.title || "New Task",
      assignedTo: taskForm.assignedTo,
      priority: taskForm.priority,
      status: "Pending",
      dueDate: taskForm.dueDate || new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
    setIsTaskModalOpen(false);
    setTaskForm({ title: "", assignedTo: "Aditi Sharma", priority: "Medium", dueDate: "" });
  };

  const updateStatus = (id: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filteredTasks = tasks.filter(t => filter === "All" || t.status === filter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Task Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Assign, track, and collaborate on internal HR and administrative tasks.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsTaskModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> Add New Task
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Tasks</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{tasks.length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><ListTodo size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">In Progress</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{tasks.filter(t => t.status === "In Progress").length}</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><Clock size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pending</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{tasks.filter(t => t.status === "Pending").length}</p>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"><AlertCircle size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Completed</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{tasks.filter(t => t.status === "Completed").length}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><CheckCircle2 size={20} /></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Filter Status:</span>
        {["All", "Pending", "In Progress", "Completed"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setFilter(st)}
            className={cn(
              "rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === st ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            )}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Tasks Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Task ID</th>
                <th className="px-6 py-3.5 font-semibold">Task Title</th>
                <th className="px-6 py-3.5 font-semibold">Assignee</th>
                <th className="px-6 py-3.5 font-semibold">Priority</th>
                <th className="px-6 py-3.5 font-semibold">Due Date</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{t.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{t.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1 text-primary dark:bg-primary/20"><User size={14} /></div>
                      <span className="text-slate-700 dark:text-slate-300">{t.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      t.priority === "High" && "bg-rose-500/15 text-rose-700 dark:text-rose-400",
                      t.priority === "Medium" && "bg-amber-500/15 text-amber-700 dark:text-amber-400",
                      t.priority === "Low" && "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                    )}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{t.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      t.status === "Completed" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                      t.status === "In Progress" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                      t.status === "Pending" && "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    )}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {t.status !== "Completed" && (
                        <button
                          type="button"
                          onClick={() => updateStatus(t.id, t.status === "Pending" ? "In Progress" : "Completed")}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                          Mark {t.status === "Pending" ? "In Progress" : "Completed"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Create New Task</h3>
                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddTask} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Task Title</label>
                  <input type="text" required value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} placeholder="e.g. Review Q1 Attendance Logs" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Assignee</label>
                    <select value={taskForm.assignedTo} onChange={e => setTaskForm({...taskForm, assignedTo: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="Aditi Sharma">Aditi Sharma</option><option value="Vikram Patel">Vikram Patel</option><option value="Pooja Verma">Pooja Verma</option><option value="Neha Gupta">Neha Gupta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Priority</label>
                    <select value={taskForm.priority} onChange={e => setTaskForm({...taskForm, priority: e.target.value as Task["priority"]})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Due Date</label>
                  <input type="date" required value={taskForm.dueDate} onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsTaskModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Create Task</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
