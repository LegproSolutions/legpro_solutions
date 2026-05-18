"use client";

import { useMemo, useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { HRMS_NAV } from "./hrms-nav";
import { cn } from "@/lib/utils";

const demoRows = [
  { id: "EMP-2401", name: "Aditi Sharma", dept: "HR", role: "Executive", status: "Active" },
  { id: "EMP-2402", name: "Vikram Patel", dept: "Operations", role: "Supervisor", status: "Active" },
  { id: "EMP-2403", name: "Neha Gupta", dept: "IT", role: "Engineer", status: "Probation" },
  { id: "EMP-2404", name: "Arjun Rao", dept: "Sales", role: "Manager", status: "Active" },
  { id: "EMP-2405", name: "Kavya Nair", dept: "Finance", role: "Analyst", status: "Active" },
];

type HrmsModulePageProps = {
  moduleSlug: string;
};

export function HrmsModulePage({ moduleSlug }: HrmsModulePageProps) {
  const meta = useMemo(() => HRMS_NAV.find((n) => n.slug === moduleSlug), [moduleSlug]);
  const title = meta?.label ?? moduleSlug;
  const [page, setPage] = useState(1);

  const showEmployeeTable = moduleSlug === "employees";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Module scaffold — connect APIs, forms, and workflows here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold dark:border-white/10 dark:bg-white/5"
          >
            <Search size={16} /> Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20"
          >
            <Plus size={16} /> Quick add
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["Primary KPI", "Secondary KPI", "Alerts"].map((k, i) => (
          <div
            key={k}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80"
          >
            <p className="text-xs font-medium uppercase text-slate-500">{k}</p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
              {i === 0 ? "98.2%" : i === 1 ? "142" : "3"}
            </p>
            <p className="mt-1 text-xs text-slate-500">Demo metric</p>
          </div>
        ))}
      </div>

      {showEmployeeTable && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">Employee directory</p>
            <span className="text-xs text-slate-500">Page {page}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoRows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 dark:border-white/5">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.dept}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          row.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 dark:border-white/10">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs disabled:opacity-40 dark:border-white/10"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs dark:border-white/10"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {!showEmployeeTable && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-12 text-center dark:border-white/20 dark:bg-white/5">
          <p className="text-slate-600 dark:text-slate-400">
            Feature blocks for <strong>{title}</strong> (forms, calendars, approvals, PDFs) plug in here.
          </p>
        </div>
      )}
    </div>
  );
}
