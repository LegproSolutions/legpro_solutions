"use client";

import { useState } from "react";
import { 
  Building2, Sliders, ShieldCheck, Bell, Users2, Save, Check, RefreshCw 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SettingsModule() {
  const [activeTab, setActiveTab] = useState<"company" | "hr" | "security" | "notifications">("company");
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [companyForm, setCompanyForm] = useState({
    name: "LEGPRO Staffing | Learning",
    tagline: "Empowering Global Talent & Staffing Solutions",
    email: "contact@legpro.com",
    phone: "+91 80 4123 5678",
    address: "Tech Park, Outer Ring Road, Bangalore, Karnataka 560103",
    website: "https://legpro.com",
  });

  const [hrForm, setHrForm] = useState({
    workWeek: "5 Days (Mon - Fri)",
    officeTiming: "09:00 AM - 06:00 PM",
    gracePeriod: "15 Minutes",
    probationPeriod: "90 Days",
    annualLeaves: 20,
    maternityLeaves: 90,
  });

  const [notificationForm, setNotificationForm] = useState({
    emailAlerts: true,
    smsAlerts: false,
    leaveRequests: true,
    attendanceAnomalies: true,
    monthlyPayroll: true,
    systemUpdates: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure organizational profiles, HR policies, security rules, and system notifications.</p>
        </div>
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "Saving Changes..." : "Save All Settings"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Navigation Sidebar */}
        <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80 lg:col-span-1">
          {[
            { id: "company", label: "Company Profile", icon: Building2, desc: "Branding, address, contact" },
            { id: "hr", label: "HR & Leave Policies", icon: Sliders, desc: "Work hours, leave rules, probation" },
            { id: "security", label: "Security & Permissions", icon: ShieldCheck, desc: "2FA, session timeouts, roles" },
            { id: "notifications", label: "Notification Rules", icon: Bell, desc: "Email, SMS, workflow triggers" },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-start gap-3 rounded-xl p-3 text-left transition-all",
                  active ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                )}
              >
                <Icon size={20} className={cn("mt-0.5", active ? "text-white dark:text-slate-900" : "text-slate-400")} />
                <div>
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className={cn("text-xs mt-0.5", active ? "text-slate-300 dark:text-slate-600" : "text-slate-400")}>{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 lg:col-span-3">
          {/* TAB 1: Company Profile */}
          {activeTab === "company" && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-white/10">Organizational Information</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Company Name</label>
                  <input type="text" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Tagline</label>
                  <input type="text" value={companyForm.tagline} onChange={e => setCompanyForm({...companyForm, tagline: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Support Email</label>
                  <input type="email" value={companyForm.email} onChange={e => setCompanyForm({...companyForm, email: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                  <input type="text" value={companyForm.phone} onChange={e => setCompanyForm({...companyForm, phone: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Website URL</label>
                  <input type="text" value={companyForm.website} onChange={e => setCompanyForm({...companyForm, website: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Registered Address</label>
                <textarea rows={3} value={companyForm.address} onChange={e => setCompanyForm({...companyForm, address: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95">Save Profile</button>
              </div>
            </form>
          )}

          {/* TAB 2: HR & Leave Policies */}
          {activeTab === "hr" && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-white/10">Working Hours & Leave Config</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Standard Work Week</label>
                  <select value={hrForm.workWeek} onChange={e => setHrForm({...hrForm, workWeek: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                    <option value="5 Days (Mon - Fri)">5 Days (Mon - Fri)</option>
                    <option value="6 Days (Mon - Sat)">6 Days (Mon - Sat)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Office Timings</label>
                  <input type="text" value={hrForm.officeTiming} onChange={e => setHrForm({...hrForm, officeTiming: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Late Grace Period</label>
                  <input type="text" value={hrForm.gracePeriod} onChange={e => setHrForm({...hrForm, gracePeriod: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 border-t border-slate-100 pt-6 dark:border-white/10">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Probation Period</label>
                  <input type="text" value={hrForm.probationPeriod} onChange={e => setHrForm({...hrForm, probationPeriod: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Annual Leaves Quota</label>
                  <input type="number" value={hrForm.annualLeaves} onChange={e => setHrForm({...hrForm, annualLeaves: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Maternity Leave (Days)</label>
                  <input type="number" value={hrForm.maternityLeaves} onChange={e => setHrForm({...hrForm, maternityLeaves: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95">Save Policies</button>
              </div>
            </form>
          )}

          {/* TAB 3: Security & Permissions */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-white/10">Access Control & Authentication</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Require all HR managers and admins to authenticate via TOTP / Authenticator App.</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Enforced</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Session Timeout</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically log out inactive users after a specified duration of idle time.</p>
                  </div>
                  <select className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold dark:border-white/10 dark:bg-slate-800 dark:text-white">
                    <option>15 Minutes</option><option>30 Minutes</option><option>1 Hour</option>
                  </select>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">IP Whitelisting</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Restrict HRMS administrative portal access to designated corporate office IP addresses.</p>
                  </div>
                  <button type="button" className="rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">Configure IPs</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Notification Rules */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-white/10">System Alerts & Workflow Triggers</h3>
              
              <div className="space-y-4">
                {[
                  { id: "emailAlerts", label: "Email Notifications", desc: "Send summary emails for daily attendance and leave approvals.", field: "emailAlerts" },
                  { id: "smsAlerts", label: "SMS / WhatsApp Alerts", desc: "Send instant mobile notifications for urgent broadcasts and salary credits.", field: "smsAlerts" },
                  { id: "leaveRequests", label: "Leave Approval Workflow Triggers", desc: "Notify reporting managers instantly when an employee applies for leave.", field: "leaveRequests" },
                  { id: "attendanceAnomalies", label: "Attendance Anomaly Alerts", desc: "Flag and alert HR for missed punch-outs or consecutive late markings.", field: "attendanceAnomalies" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={(notificationForm as any)[item.field]}
                      onChange={e => setNotificationForm({...notificationForm, [item.field]: e.target.checked})}
                      className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95">Save Preferences</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
