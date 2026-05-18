"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, Calendar as CalendarIcon, CheckCircle2, AlertTriangle, 
  XCircle, ArrowUpRight, ArrowDownLeft, Filter, Sun, Moon, Sunset 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const weeklyHoursData = [
  { day: "Mon", hours: 8.5 },
  { day: "Tue", hours: 9.2 },
  { day: "Wed", hours: 7.8 },
  { day: "Thu", hours: 8.9 },
  { day: "Fri", hours: 8.1 },
];

const initialLogs = [
  { id: 1, date: "2026-05-18", punchIn: "09:05 AM", punchOut: "--:-- PM", status: "On Time", shift: "General Shift (09:00 - 18:00)", hours: "4.5 hrs (Ongoing)" },
  { id: 2, date: "2026-05-17", punchIn: "09:45 AM", punchOut: "06:30 PM", status: "Late", shift: "General Shift (09:00 - 18:00)", hours: "8.75 hrs" },
  { id: 3, date: "2026-05-16", punchIn: "08:55 AM", punchOut: "06:15 PM", status: "On Time", shift: "General Shift (09:00 - 18:00)", hours: "9.3 hrs" },
  { id: 4, date: "2026-05-15", punchIn: "10:15 AM", punchOut: "07:00 PM", status: "Late", shift: "General Shift (09:00 - 18:00)", hours: "8.75 hrs" },
  { id: 5, date: "2026-05-14", punchIn: "09:00 AM", punchOut: "06:00 PM", status: "On Time", shift: "General Shift (09:00 - 18:00)", hours: "9.0 hrs" },
];

const shifts = [
  { name: "Morning Shift", time: "06:00 AM - 02:00 PM", icon: Sun, staff: 42, color: "text-amber-500 bg-amber-500/10" },
  { name: "General Shift", time: "09:00 AM - 06:00 PM", icon: Sunset, staff: 156, color: "text-blue-500 bg-blue-500/10" },
  { name: "Night Shift", time: "08:00 PM - 05:00 AM", icon: Moon, staff: 34, color: "text-purple-500 bg-purple-500/10" },
];

export function AttendanceModule() {
  const [activeTab, setActiveTab] = useState<"daily" | "calendar" | "shifts">("daily");
  const [isPunchedIn, setIsPunchedIn] = useState(true);
  const [punchTime, setPunchTime] = useState("09:05 AM");
  const [logs, setLogs] = useState(initialLogs);

  const handlePunchToggle = () => {
    if (isPunchedIn) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLogs(logs.map(l => l.id === 1 ? { ...l, punchOut: currentTime, hours: "8.5 hrs" } : l));
      setIsPunchedIn(false);
    } else {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setPunchTime(currentTime);
      const newLog = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        punchIn: currentTime,
        punchOut: "--:-- PM",
        status: "On Time",
        shift: "General Shift (09:00 - 18:00)",
        hours: "0 hrs (Ongoing)",
      };
      setLogs([newLog, ...logs]);
      setIsPunchedIn(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Punch In/Out Widget */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Attendance System</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time attendance tracking, shift rosteing, and working hours analytics.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 dark:border-white/10 lg:border-t-0 lg:pt-0">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 dark:bg-white/5">
            <Clock className="text-primary dark:text-accent" size={24} />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current Status</p>
              <p className="font-semibold text-slate-900 dark:text-white">
                {isPunchedIn ? `Punched In at ${punchTime}` : "Punched Out"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePunchToggle}
            className={cn(
              "flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95",
              isPunchedIn 
                ? "bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/25" 
                : "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/25"
            )}
          >
            {isPunchedIn ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
            {isPunchedIn ? "Punch Out" : "Punch In"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10">
        {[
          { id: "daily", label: "Daily Attendance & Logs", icon: Clock },
          { id: "calendar", label: "Attendance Calendar", icon: CalendarIcon },
          { id: "shifts", label: "Shift Management", icon: Sun },
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
                active 
                  ? "border-primary text-primary dark:border-accent dark:text-accent" 
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Daily Attendance & Logs */}
      {activeTab === "daily" && (
        <div className="space-y-6">
          {/* Stats Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Present Today", value: "231", total: "248", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10" },
              { label: "Late Markings", value: "14", total: "Grace 15m", icon: AlertTriangle, color: "text-amber-500 bg-amber-500/10" },
              { label: "Absent / Leave", value: "17", total: "Approved", icon: XCircle, color: "text-rose-500 bg-rose-500/10" },
              { label: "Avg Working Hours", value: "8.6 hrs", total: "Weekly avg", icon: Clock, color: "text-blue-500 bg-blue-500/10" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</p>
                      <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{s.total}</p>
                    </div>
                    <div className={cn("rounded-xl p-2.5", s.color)}><Icon size={20} /></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Logs Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/10">
                <h3 className="font-semibold text-slate-900 dark:text-white">Recent Attendance Logs</h3>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-white/10 dark:text-white">
                  <Filter size={14} /> Filter Logs
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold">Date</th>
                      <th className="px-6 py-3.5 font-semibold">Punch In</th>
                      <th className="px-6 py-3.5 font-semibold">Punch Out</th>
                      <th className="px-6 py-3.5 font-semibold">Status</th>
                      <th className="px-6 py-3.5 font-semibold">Effective Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {logs.map((log) => (
                      <tr key={log.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.date}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{log.punchIn}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{log.punchOut}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            log.status === "On Time" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          )}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">{log.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Working Hours Chart */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
              <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Weekly Working Hours</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyHoursData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 12]} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#2563eb" radius={[6, 6, 0, 0]} name="Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Attendance Calendar */}
      {activeTab === "calendar" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 dark:text-white">May 2026</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-emerald-500" /> Present</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-amber-500" /> Late</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-rose-500" /> Absent/Leave</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
              <div key={d} className="py-2 text-xs font-bold uppercase text-slate-500">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isWeekend = (day + 4) % 7 === 5 || (day + 4) % 7 === 6;
              const isLate = day === 15 || day === 17;
              const isAbsent = day === 10 || day === 11;
              const statusColor = isWeekend 
                ? "bg-slate-100 text-slate-400 dark:bg-white/5" 
                : isAbsent 
                ? "bg-rose-500/15 text-rose-700 border border-rose-500/30 dark:text-rose-400" 
                : isLate 
                ? "bg-amber-500/15 text-amber-700 border border-amber-500/30 dark:text-amber-400" 
                : "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 dark:text-emerald-400";

              return (
                <div key={day} className={cn("flex flex-col items-center justify-center rounded-2xl p-4 transition-transform hover:scale-105", statusColor)}>
                  <p className="font-display font-bold text-lg">{day}</p>
                  <p className="text-[10px] uppercase font-semibold mt-1">
                    {isWeekend ? "Wknd" : isAbsent ? "Leave" : isLate ? "Late" : "Present"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Shift Management */}
      {activeTab === "shifts" && (
        <div className="grid gap-6 md:grid-cols-3">
          {shifts.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div className={cn("rounded-2xl p-3.5", s.color)}><Icon size={24} /></div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">
                    {s.staff} Employees assigned
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-slate-900 dark:text-white">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.time}</p>
                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10">
                  <button type="button" className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                    Manage Roster
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
