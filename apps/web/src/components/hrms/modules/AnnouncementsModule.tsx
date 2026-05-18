"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Megaphone, Plus, Bell, Calendar as CalendarIcon, Users, X, AlertCircle, Sparkles, Pin 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Announcement = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: "Urgent" | "Info" | "Event";
  targetDept: string;
  isPinned?: boolean;
};

const initialAnnouncements: Announcement[] = [
  { id: "ANN-1", title: "Quarterly Town Hall Meeting — Q1 2026", content: "Join us this Friday at 4 PM IST for our quarterly town hall. We will be discussing Q1 achievements, upcoming product roadmaps, and announcing the star performers of the quarter.", author: "Aditi Sharma (HR Lead)", date: "2026-05-18", type: "Event", targetDept: "All Departments", isPinned: true },
  { id: "ANN-2", title: "Mandatory IT Security Policy Update", content: "All employees are requested to update their VPN client and complete the 15-minute cybersecurity compliance module before May 25th to maintain network access.", author: "Vikram Patel (IT Head)", date: "2026-05-16", type: "Urgent", targetDept: "All Departments", isPinned: true },
  { id: "ANN-3", title: "New Leave Encashment Policy Introduced", content: "We are pleased to announce a new leave encashment policy allowing employees to encash up to 10 days of unused annual leave at the end of the financial year.", author: "Kavya Nair (Finance)", date: "2026-05-10", type: "Info", targetDept: "All Departments" },
  { id: "ANN-4", title: "Engineering Team Hackathon 2026", content: "Get ready for the annual internal hackathon! Form teams of up to 4 members and build AI-powered solutions for our HR tech platform. Exciting prizes to be won.", author: "Neha Gupta (Engineering)", date: "2026-05-05", type: "Event", targetDept: "IT & Engineering" },
];

export function AnnouncementsModule() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Info" as Announcement["type"],
    targetDept: "All Departments",
    isPinned: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: Announcement = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title || "New Announcement",
      content: formData.content || "No details provided.",
      author: "Aditi Sharma (HR Lead)",
      date: new Date().toISOString().split("T")[0],
      type: formData.type,
      targetDept: formData.targetDept,
      isPinned: formData.isPinned,
    };
    setAnnouncements([newAnn, ...announcements]);
    setIsModalOpen(false);
    setFormData({ title: "", content: "", type: "Info", targetDept: "All Departments", isPinned: false });
  };

  const filteredAnnouncements = announcements.filter(a => filter === "All" || a.type === filter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Announcements & Notices</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Broadcast company-wide news, policy updates, and upcoming events.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> New Announcement
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Broadcasts</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{announcements.length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><Megaphone size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pinned Notices</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{announcements.filter(a => a.isPinned).length}</p>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"><Pin size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Urgent Alerts</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{announcements.filter(a => a.type === "Urgent").length}</p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"><AlertCircle size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Upcoming Events</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{announcements.filter(a => a.type === "Event").length}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><Sparkles size={20} /></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Filter Category:</span>
        {["All", "Urgent", "Info", "Event"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === cat ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => (
          <div key={ann.id} className={cn(
            "relative rounded-2xl border p-6 transition-all",
            ann.isPinned ? "border-primary/40 bg-primary/[0.03] dark:border-accent/40 dark:bg-accent/[0.03]" : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/80"
          )}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
              <div className="flex items-center gap-3">
                {ann.isPinned && <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary dark:bg-accent/10 dark:text-accent"><Pin size={12} /> Pinned</span>}
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  ann.type === "Urgent" && "bg-rose-500/15 text-rose-700 dark:text-rose-400",
                  ann.type === "Info" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                  ann.type === "Event" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                )}>
                  {ann.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target: {ann.targetDept}</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{ann.date}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">{ann.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4">{ann.content}</p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
              <span>Posted by <strong>{ann.author}</strong></span>
              <button type="button" onClick={() => setAnnouncements(announcements.filter(a => a.id !== ann.id))} className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Broadcast Announcement</h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Announcement Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Quarterly Town Hall Meeting" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Notice Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as Announcement["type"]})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="Info">Info</option><option value="Urgent">Urgent</option><option value="Event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Target Audience</label>
                    <select value={formData.targetDept} onChange={e => setFormData({...formData, targetDept: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="All Departments">All Departments</option><option value="IT & Engineering">IT & Engineering</option><option value="HR & Operations">HR & Operations</option><option value="Sales & Marketing">Sales & Marketing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Announcement Content</label>
                  <textarea rows={4} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Write the full broadcast message here..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pin" checked={formData.isPinned} onChange={e => setFormData({...formData, isPinned: e.target.checked})} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  <label htmlFor="pin" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pin to top of announcements feed</label>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Publish Broadcast</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
