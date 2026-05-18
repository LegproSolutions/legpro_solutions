"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IndianRupee, Download, CheckCircle2, AlertCircle, FileText, 
  Plus, X, Lock, Play, RefreshCw, Calculator, DollarSign 
} from "lucide-react";
import { cn } from "@/lib/utils";

type SalarySlip = {
  id: string;
  employee: string;
  role: string;
  month: string;
  basic: number;
  hra: number;
  allowances: number;
  bonus: number;
  tax: number;
  pf: number;
  net: number;
  status: "Paid" | "Processing" | "Locked";
};

const initialSlips: SalarySlip[] = [
  { id: "PAY-2605-01", employee: "Aditi Sharma", role: "HR Executive", month: "May 2026", basic: 45000, hra: 18000, allowances: 12000, bonus: 5000, tax: 4200, pf: 3600, net: 72200, status: "Paid" },
  { id: "PAY-2605-02", employee: "Vikram Patel", role: "Operations Lead", month: "May 2026", basic: 55000, hra: 22000, allowances: 15000, bonus: 0, tax: 5800, pf: 4400, net: 81800, status: "Paid" },
  { id: "PAY-2605-03", employee: "Neha Gupta", role: "Senior Software Engineer", month: "May 2026", basic: 85000, hra: 34000, allowances: 25000, bonus: 10000, tax: 12400, pf: 6800, net: 134800, status: "Processing" },
  { id: "PAY-2605-04", employee: "Arjun Rao", role: "Sales Manager", month: "May 2026", basic: 75000, hra: 30000, allowances: 20000, bonus: 15000, tax: 10500, pf: 6000, net: 123500, status: "Paid" },
  { id: "PAY-2605-05", employee: "Kavya Nair", role: "Financial Analyst", month: "May 2026", basic: 60000, hra: 24000, allowances: 16000, bonus: 0, tax: 6500, pf: 4800, net: 88700, status: "Paid" },
];

export function PayrollModule() {
  const [activeTab, setActiveTab] = useState<"slips" | "processing" | "taxes" | "bonuses">("slips");
  const [slips, setSlips] = useState<SalarySlip[]>(initialSlips);
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);

  // Bonus Form
  const [bonusForm, setBonusForm] = useState({
    employee: "Neha Gupta",
    amount: 10000,
    reason: "Performance Bonus Q1",
  });

  const handleRunPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSlips(slips.map(s => ({ ...s, status: "Paid" })));
      setIsProcessing(false);
      alert("Payroll processed successfully for May 2026!");
    }, 2000);
  };

  const handleAddBonus = (e: React.FormEvent) => {
    e.preventDefault();
    setSlips(slips.map(s => {
      if (s.employee === bonusForm.employee) {
        const newBonus = s.bonus + Number(bonusForm.amount);
        const newNet = s.basic + s.hra + s.allowances + newBonus - s.tax - s.pf;
        return { ...s, bonus: newBonus, net: newNet };
      }
      return s;
    }));
    setIsBonusModalOpen(false);
  };

  const totalMonthlyPayout = slips.reduce((acc, s) => acc + s.net, 0);
  const totalTaxes = slips.reduce((acc, s) => acc + s.tax, 0);
  const totalBonuses = slips.reduce((acc, s) => acc + s.bonus, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Payroll Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage salary slips, tax deductions, bonuses, and batch processing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsBonusModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <Plus size={18} /> Add Bonus
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleRunPayroll}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:opacity-50"
          >
            {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
            {isProcessing ? "Processing Batch..." : "Run May Payroll"}
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Monthly Payout</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">₹{totalMonthlyPayout.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><IndianRupee size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Taxes Withheld</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">₹{totalTaxes.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"><Calculator size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Bonuses Disbursed</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">₹{totalBonuses.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><DollarSign size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Processing Status</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {slips.every(s => s.status === "Paid") ? "Locked" : "Active"}
              </p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"><Lock size={20} /></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10">
        {[
          { id: "slips", label: "Salary Slips", icon: FileText },
          { id: "processing", label: "Payroll Processing Batch", icon: RefreshCw },
          { id: "taxes", label: "Tax Deductions", icon: Calculator },
          { id: "bonuses", label: "Bonus Management", icon: DollarSign },
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

      {/* TAB 1: Salary Slips */}
      {activeTab === "slips" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">Salary Slips Directory — May 2026</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Slip ID</th>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Gross Salary</th>
                  <th className="px-6 py-3.5 font-semibold">Deductions</th>
                  <th className="px-6 py-3.5 font-semibold">Net Pay</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Payslip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {slips.map((slip) => {
                  const gross = slip.basic + slip.hra + slip.allowances + slip.bonus;
                  const deductions = slip.tax + slip.pf;
                  return (
                    <tr key={slip.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{slip.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{slip.employee}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{slip.role}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">₹{gross.toLocaleString()}</td>
                      <td className="px-6 py-4 text-rose-600 dark:text-rose-400 font-medium">₹{deductions.toLocaleString()}</td>
                      <td className="px-6 py-4 font-display font-bold text-slate-900 dark:text-white">₹{slip.net.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                          slip.status === "Paid" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        )}>
                          {slip.status === "Paid" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          {slip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSlip(slip)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                          <Download size={14} /> View PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Payroll Processing */}
      {activeTab === "processing" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">May 2026 Batch Processing</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated calculation of attendance, leave deductions, and taxes.</p>
            </div>
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
              Cycle Status: {slips.every(s => s.status === "Paid") ? "Complete" : "Ready for Review"}
            </span>
          </div>
          <div className="space-y-3">
            {[
              { step: "1. Attendance & Leave Reconciliation", status: "Verified", desc: "Leaves synced with attendance records." },
              { step: "2. Tax & PF Deductions Calculation", status: "Calculated", desc: "Provident fund and TDS applied as per new tax slabs." },
              { step: "3. Bonus & Reimbursements Addition", status: "Added", desc: "Quarterly bonuses included in gross payout." },
              { step: "4. Bank Transfer / NEFT Generation", status: slips.every(s => s.status === "Paid") ? "Disbursed" : "Pending", desc: "Batch file ready for banking portal upload." },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.step}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <span className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold",
                  item.status === "Pending" ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Tax Deductions */}
      {activeTab === "taxes" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">Tax & Provident Fund Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Tax Regime</th>
                  <th className="px-6 py-3.5 font-semibold">Monthly TDS</th>
                  <th className="px-6 py-3.5 font-semibold">Employee PF (12%)</th>
                  <th className="px-6 py-3.5 font-semibold">Employer PF (12%)</th>
                  <th className="px-6 py-3.5 font-semibold">Total Deduction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {slips.map((slip) => (
                  <tr key={slip.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{slip.employee}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">New Regime</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">₹{slip.tax.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">₹{slip.pf.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">₹{slip.pf.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-rose-600 dark:text-rose-400">₹{(slip.tax + slip.pf).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Bonus Management */}
      {activeTab === "bonuses" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Disbursed Bonuses & Incentives</h3>
            <button
              type="button"
              onClick={() => setIsBonusModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <Plus size={14} /> Add New Bonus
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Employee</th>
                  <th className="px-6 py-3.5 font-semibold">Bonus Category</th>
                  <th className="px-6 py-3.5 font-semibold">Amount</th>
                  <th className="px-6 py-3.5 font-semibold">Payout Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {slips.filter(s => s.bonus > 0).map((slip) => (
                  <tr key={slip.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{slip.employee}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Quarterly Performance Bonus</td>
                    <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">₹{slip.bonus.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{slip.month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bonus Modal */}
      <AnimatePresence>
        {isBonusModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Add Employee Bonus</h3>
                <button
                  type="button"
                  onClick={() => setIsBonusModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddBonus} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Select Employee</label>
                  <select
                    value={bonusForm.employee}
                    onChange={e => setBonusForm({...bonusForm, employee: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    {slips.map(s => <option key={s.id} value={s.employee}>{s.employee}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Bonus Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={bonusForm.amount}
                    onChange={e => setBonusForm({...bonusForm, amount: Number(e.target.value)})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Reason / Category</label>
                  <input
                    type="text"
                    required
                    value={bonusForm.reason}
                    onChange={e => setBonusForm({...bonusForm, reason: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsBonusModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95"
                  >
                    Apply Bonus
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Printable Payslip Modal / Drawer */}
      <AnimatePresence>
        {selectedSlip && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">LEGPRO Staffing | Learning</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Payslip for the month of {selectedSlip.month}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSlip(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-white/5 dark:border-white/5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Employee Name</p>
                    <p className="mt-0.5 font-bold text-slate-900 dark:text-white">{selectedSlip.employee}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Designation</p>
                    <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{selectedSlip.role}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Slip ID</p>
                    <p className="mt-0.5 font-mono text-xs text-slate-900 dark:text-white">{selectedSlip.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Payment Status</p>
                    <p className="mt-0.5 font-semibold text-emerald-600 dark:text-emerald-400">{selectedSlip.status}</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden dark:border-white/10">
                  <div className="p-4 bg-white dark:bg-slate-900/50">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 pb-2 mb-3 dark:border-white/10">Earnings</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Basic Salary</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.basic.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">HRA</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.hra.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Special Allowances</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.allowances.toLocaleString()}</span></div>
                      {selectedSlip.bonus > 0 && <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Bonus</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.bonus.toLocaleString()}</span></div>}
                      <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-sm text-slate-900 dark:border-white/10 dark:text-white">
                        <span>Total Earnings</span><span>₹{(selectedSlip.basic + selectedSlip.hra + selectedSlip.allowances + selectedSlip.bonus).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-white/5 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 pb-2 mb-3 dark:border-white/10">Deductions</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Income Tax (TDS)</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.tax.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Provident Fund (PF)</span><span className="font-medium text-slate-900 dark:text-white">₹{selectedSlip.pf.toLocaleString()}</span></div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-sm text-rose-600 dark:border-white/10 dark:text-rose-400">
                        <span>Total Deductions</span><span>₹{(selectedSlip.tax + selectedSlip.pf).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-primary/15 to-accent/15 p-4 flex items-center justify-between border border-primary/20 dark:border-accent/20">
                  <span className="font-display font-bold text-slate-900 dark:text-white">Net Take Home Pay</span>
                  <span className="font-display text-xl font-bold text-primary dark:text-accent">₹{selectedSlip.net.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-end gap-3 dark:border-white/10 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setSelectedSlip(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => { alert("PDF generated successfully!"); setSelectedSlip(null); }}
                  className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
