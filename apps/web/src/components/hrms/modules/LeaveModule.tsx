"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, Plus, Check, X, Clock, AlertCircle, FileText, 
  Calendar as CalendarIcon, CheckCircle2, XCircle, User 
} from "lucide-react";
import { cn } from "@/lib/utils";

type LeaveRequest = {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
};

const initialRequests: LeaveRequest[] = [
  { id: "LR-101", employee: "Neha Gupta", type: "Annual Leave", startDate: "2026-06-01", endDate: "2026-06-05", days: 5, reason: "Family vacation", status: "Pending", appliedOn: "2026-05-18" },
  { id: "LR-102", employee: "Rohan Desai", type: "Sick Leave", startDate: "2026-05-19", endDate: "2026-05-20", days: 2, reason: "Dental surgery", status: "Pending", appliedOn: "2026-05-17" },
  { id: "LR-103", employee: "Aditi Sharma", type: "Casual Leave", startDate: "2026-05-12", endDate: "2026-05-13", days: 2, reason: "Personal work", status: "Approved", appliedOn: "2026-05-10" },
  { id: "LR-104", employee: "Vikram Patel", type: "Annual Leave", startDate: "2026-05-01", endDate: "2026-05-03", days: 3, reason: "Attending wedding", status: "Approved", appliedOn: "2026-04-25" },
  { id: "LR-105", employee: "Arjun Rao", type: "Sick Leave", startDate: "2026-04-15", endDate: "2026-04-15", days: 1, reason: "Fever", status: "Rejected", appliedOn: "2026-04-14" },
];

const leaveBalances = [
  { type: "Annual Leave", total: 20, used: 8, pending: 5, color: "text-blue-500 bg-blue-500/10" },
  { type: "Sick Leave", total: 12, used: 3, pending: 2, color: "text-emerald-500 bg-emerald-500/10" },
  { type: "Casual Leave", total: 8, used: 4, pending: 0, color: "text-purple-500 bg-purple-500/10" },
  { type: "Maternity / Paternity", total: 90, used: 0, pending: 0, color: "text-amber-500 bg-amber-500/10" },
];

export function LeaveModule() {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "calendar">("overview");
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d1 = new Date(formData.startDate);
    const d2 = new Date(formData.endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newReq: LeaveRequest = {
      id: `LR-${Math.floor(100 + Math.random() * 900)}`,
      employee: "Current User (Aditi)",
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: isNaN(days) ? 1 : days,
      reason: formData.reason || "Personal",
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };
    setRequests([newReq, ...requests]);
    setIsApplyOpen(false);
    setFormData({ type: "Annual Leave", startDate: "", endDate: "", reason: "" });
  };

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const pendingRequests = requests.filter(r => r.status === "Pending");
  const historyRequests = requests.filter(r => r.status !== "Pending");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Leave Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Apply for leaves, track balances, and manage team approvals.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsApplyOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> Apply Leave
        </button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leaveBalances.map((b) => (
          <div key={b.type} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
              <span className={cn("rounded-xl p-2.5", b.color)}><CalendarDays size={20} /></span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total: {b.total}d</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">{b.type}</h3>
            <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-100 pt-3 dark:border-white/10">
              <span className="text-slate-600 dark:text-slate-400">Used: <strong className="text-slate-900 dark:text-white">{b.used}d</strong></span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">Pending: {b.pending}d</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Balance: {b.total - b.used}d</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10">
        {[
          { id: "overview", label: "Pending Approvals", icon: Clock },
          { id: "history", label: "Leave History", icon: FileText },
          { id: "calendar", label: "Leave Calendar", icon: CalendarIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors",
                active ? "border-primary text-primary dark:border-accent dark:text-accent" : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Icon size={16} />
              {tab.label}
              {tab.id === "overview" && pendingRequests.length > 0 && (
                <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  {pendingRequests.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Pending Approvals */}
      {activeTab === "overview" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">Pending Approvals ({pendingRequests.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Leave Type</th>
                  <th className="px-6 py-3.5 font-semibold">Duration</th>
                  <th className="px-6 py-3.5 font-semibold">Reason</th>
                  <th className="px-6 py-3.5 font-semibold">Applied On</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {pendingRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">No pending leave requests to review.</td>
                  </tr>
                ) : (
                  pendingRequests.map((req) => (
                    <tr key={req.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{req.employee}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{req.type}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {req.startDate} to {req.endDate} <span className="text-xs text-slate-500 dark:text-slate-400">({req.days} days)</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{req.reason}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{req.appliedOn}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updateStatus(req.id, "Approved")}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-500/25 dark:text-emerald-400"
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(req.id, "Rejected")}
                            className="inline-flex items-center gap-1 rounded-xl bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/25 dark:text-rose-400"
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Leave History */}
      {activeTab === "history" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">Leave History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Leave Type</th>
                  <th className="px-6 py-3.5 font-semibold">Duration</th>
                  <th className="px-6 py-3.5 font-semibold">Reason</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold">Applied On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {historyRequests.map((req) => (
                  <tr key={req.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{req.employee}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{req.type}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {req.startDate} to {req.endDate} <span className="text-xs text-slate-500 dark:text-slate-400">({req.days} days)</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{req.reason}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        req.status === "Approved" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                      )}>
                        {req.status === "Approved" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{req.appliedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Leave Calendar */}
      {activeTab === "calendar" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Upcoming Leaves Calendar View</h3>
          <div className="space-y-3">
            {[
              { emp: "Neha Gupta", type: "Annual Leave", dates: "June 01 - June 05", days: "5 Days" },
              { emp: "Vikram Patel", type: "Annual Leave", dates: "May 01 - May 03", days: "3 Days" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><User size={20} /></div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.emp}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.type} • {item.dates}</p>
                  </div>
                </div>
                <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  {item.days}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      <AnimatePresence>
        {isApplyOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Apply for Leave</h3>
                <button
                  type="button"
                  onClick={() => setIsApplyOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Leave Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    {leaveBalances.map(b => <option key={b.type} value={b.type}>{b.type}</option>)}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Reason for Leave</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.reason}
                    onChange={e => setFormData({...formData, reason: e.target.value})}
                    placeholder="Provide details about your leave request..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsApplyOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
