"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, Download, TrendingUp, Users, DollarSign, Calendar, FileText, CheckCircle2 
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";

const headcountData = [
  { month: "Jan", headcount: 210, attrition: 4 },
  { month: "Feb", headcount: 215, attrition: 2 },
  { month: "Mar", headcount: 228, attrition: 5 },
  { month: "Apr", headcount: 240, attrition: 3 },
  { month: "May", headcount: 248, attrition: 1 },
];

const salaryExpenseData = [
  { dept: "Engineering", expense: 45 },
  { dept: "Sales", expense: 28 },
  { dept: "HR & Ops", expense: 15 },
  { dept: "Finance", expense: 12 },
];

const generatedReports = [
  { id: "REP-01", name: "Monthly Headcount & Attrition Report", category: "Workforce", date: "2026-05-15", format: "PDF / CSV", size: "1.2 MB" },
  { id: "REP-02", name: "Q1 Payroll & Tax Deduction Summary", category: "Finance", date: "2026-05-10", format: "Excel / CSV", size: "3.4 MB" },
  { id: "REP-03", name: "Employee Leave & Absenteeism Trends", category: "Attendance", date: "2026-05-02", format: "PDF", size: "850 KB" },
  { id: "REP-04", name: "Quarterly Performance & OKR Ratings", category: "Performance", date: "2026-04-20", format: "PDF / Excel", size: "2.1 MB" },
];

export function ReportsModule() {
  const [activeTab, setActiveTab] = useState<"analytics" | "archives">("analytics");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`${type} report exported successfully! Check your downloads.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">HR Analytics & Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Generate executive insights on workforce headcount, attrition, payroll expenses, and leave trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isExporting}
            onClick={() => handleExport("Master HR Analytics CSV")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-50"
          >
            <Download size={18} /> {isExporting ? "Exporting..." : "Export Master CSV"}
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={() => handleExport("Executive Summary PDF")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:opacity-50"
          >
            <FileText size={18} /> {isExporting ? "Generating PDF..." : "Executive PDF Report"}
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Current Headcount</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">248 <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+18% YTD</span></p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><Users size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">YTD Attrition Rate</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">3.2% <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Low</span></p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><TrendingUp size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Monthly Payroll Run</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">₹48.5L</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><DollarSign size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Avg Tenure</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">3.8 Yrs</p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"><Calendar size={20} /></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10">
        {[
          { id: "analytics", label: "Executive Analytics Dashboards", icon: BarChart3 },
          { id: "archives", label: "Generated Reports Archive", icon: FileText },
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
            </button>
          );
        })}
      </div>

      {/* TAB 1: Executive Analytics Dashboards */}
      {activeTab === "analytics" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Headcount Trend Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Headcount & Attrition Trend (2026)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={headcountData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="headcount" stroke="#2563eb" strokeWidth={3} name="Total Headcount" />
                  <Line type="monotone" dataKey="attrition" stroke="#ef4444" strokeWidth={2} name="Attrition Count" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Salary Expense Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Salary Expense Breakdown by Department (Lakhs ₹)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
                  <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="expense" fill="#10b981" radius={[6, 6, 0, 0]} name="Monthly Expense (₹ Lakhs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Generated Reports Archive */}
      {activeTab === "archives" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">Standard Compliance & Operations Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Report ID</th>
                  <th className="px-6 py-3.5 font-semibold">Report Name</th>
                  <th className="px-6 py-3.5 font-semibold">Category</th>
                  <th className="px-6 py-3.5 font-semibold">Generation Date</th>
                  <th className="px-6 py-3.5 font-semibold">Available Formats</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {generatedReports.map((rep) => (
                  <tr key={rep.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{rep.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{rep.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{rep.category}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{rep.date}</td>
                    <td className="px-6 py-4 font-mono text-xs font-medium text-slate-600 dark:text-slate-300">{rep.format}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleExport(rep.name)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                      >
                        <Download size={14} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
