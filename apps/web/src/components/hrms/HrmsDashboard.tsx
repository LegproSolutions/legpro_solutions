"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users, UserCheck, CalendarClock, Wallet, UserPlus, Award, Briefcase, Cake } from "lucide-react";

const attendanceData = [
  { name: "Mon", present: 92, absent: 8 },
  { name: "Tue", present: 88, absent: 12 },
  { name: "Wed", present: 95, absent: 5 },
  { name: "Thu", present: 90, absent: 10 },
  { name: "Fri", present: 93, absent: 7 },
];

const deptData = [
  { name: "Ops", value: 42 },
  { name: "HR", value: 18 },
  { name: "IT", value: 24 },
  { name: "Sales", value: 31 },
];

const hiringTrend = [
  { month: "Jan", hires: 4 },
  { month: "Feb", hires: 7 },
  { month: "Mar", hires: 5 },
  { month: "Apr", hires: 9 },
  { month: "May", hires: 6 },
  { month: "Jun", hires: 11 },
];

const payrollSummary = [
  { month: "Jan", gross: 42 },
  { month: "Feb", gross: 45 },
  { month: "Mar", gross: 44 },
  { month: "Apr", gross: 48 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

const stats = [
  { label: "Total Employees", value: "248", sub: "+12 this quarter", icon: Users },
  { label: "Present Today", value: "231", sub: "93% attendance", icon: UserCheck },
  { label: "Pending Leaves", value: "14", sub: "4 urgent", icon: CalendarClock },
  { label: "Payroll Status", value: "Ready", sub: "Feb cycle locked", icon: Wallet },
  { label: "New Hires", value: "11", sub: "6 in onboarding", icon: UserPlus },
  { label: "Performance Score", value: "4.2", sub: "Org avg / 5", icon: Award },
  { label: "Recruitment Pipeline", value: "38", sub: "Active candidates", icon: Briefcase },
  { label: "Upcoming Birthdays", value: "5", sub: "Next 7 days", icon: Cake },
];

export function HrmsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Real-time workforce snapshot — wire to your API when ready.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.sub}</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-2 text-primary dark:text-accent">
                  <Icon size={20} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Attendance Analytics</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="present" stroke="#2563eb" fill="url(#fillPresent)" name="Present %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Department-wise Employees</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={88}>
                  {deptData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Monthly Hiring Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Payroll Summary (₹ Lakhs)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payrollSummary}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="gross" fill="#2563eb" radius={[6, 6, 0, 0]} name="Gross" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Recent Activities</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>• Leave approved — Priya S. (Annual)</li>
            <li>• New offer accepted — Rahul K. (Engineering)</li>
            <li>• Payroll batch exported for Feb 2026</li>
            <li>• Performance review cycle opened — Q1</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Upcoming Interviews</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>• Today 3:00 PM — Senior Analyst (Panel: A. Mehta)</li>
            <li>• Tomorrow 11:00 AM — HR Executive</li>
            <li>• Fri 10:30 AM — DevOps Engineer (Remote)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
