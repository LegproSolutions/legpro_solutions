"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  IndianRupee,
  Clock,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Building2,
  BadgeCheck,
  Linkedin,
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";
import { fetchCandidates, updateCandidateStatus, deleteCandidate, type CandidateRecord } from "@/lib/api";

const STATUS_OPTIONS = [
  "New",
  "Shortlisted",
  "Contacted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
  "On Hold",
  "Future Requirement",
  "Hired",
] as const;

const CATEGORY_OPTIONS = [
  "All Categories",
  "Talent Acquisition & Sourcing",
  "Payroll",
  "Staffing Operations",
  "Supervisor / Plant Managers",
  "Administration",
  "Accounts & Finance",
  "Apprenticeship Operations",
  "Business Development / Sales",
  "IT / Tech Support",
];

const EXPERIENCE_OPTIONS = [
  "All Experience",
  "Fresher",
  "1 - 2 Years",
  "2 - 4 Years",
  "4 - 7 Years",
  "7 - 10 Years",
  "10+ Years",
];

// Fallback demo candidates if database has zero records yet
const DEMO_CANDIDATES: CandidateRecord[] = [
  {
    _id: "demo-1",
    id: "demo-1",
    fullName: "Aarav Sharma",
    mobileNumber: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    currentLocation: "Noida, UP",
    highestQualification: "MBA (HR)",
    totalExperience: "3 - 5 Years",
    currentCompany: "TalentHub Solutions",
    currentDesignation: "Senior HR Recruiter",
    skills: "End-to-end Recruitment, IT Hiring, Portal Sourcing, Screening",
    profileCategory: "Talent Acquisition & Sourcing",
    preferredRole: "Talent Acquisition Lead",
    preferredLocation: "Delhi NCR",
    currentCtc: "5.5 LPA",
    expectedCtc: "7.5 LPA",
    noticePeriod: "30 Days (1 Month)",
    linkedinUrl: "https://linkedin.com/in/aaravsharma",
    resumeFilename: "Aarav_Sharma_Resume.pdf",
    status: "Shortlisted",
    notes: "Strong technical sourcing background; scheduled initial call.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "demo-2",
    id: "demo-2",
    fullName: "Ritu Verma",
    mobileNumber: "+91 98112 23344",
    email: "ritu.verma@example.com",
    currentLocation: "Gurugram, Haryana",
    highestQualification: "B.Com, M.Com",
    totalExperience: "4 - 7 Years",
    currentCompany: "Global Finserve Ltd",
    currentDesignation: "Payroll Specialist",
    skills: "Payroll Processing, PF, ESI, TDS, Statutory Returns, Tally",
    profileCategory: "Payroll",
    preferredRole: "Payroll Manager",
    preferredLocation: "Delhi NCR / Remote",
    currentCtc: "6.0 LPA",
    expectedCtc: "8.0 LPA",
    noticePeriod: "Immediate Joiner",
    linkedinUrl: "https://linkedin.com/in/rituverma",
    resumeFilename: "Ritu_Verma_Payroll.pdf",
    status: "New",
    notes: "Immediate joiner with 5+ years statutory compliance expertise.",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "demo-3",
    id: "demo-3",
    fullName: "Vikram Chauhan",
    mobileNumber: "+91 97234 56789",
    email: "vikram.chauhan@example.com",
    currentLocation: "Pune, Maharashtra",
    highestQualification: "B.Tech (Mechanical)",
    totalExperience: "7 - 10 Years",
    currentCompany: "AutoComponents Corp",
    currentDesignation: "Plant Operations Supervisor",
    skills: "Shop Floor Management, 5S, Industrial Safety, CNC Operations",
    profileCategory: "Supervisor / Plant Managers",
    preferredRole: "Assistant Plant Manager",
    preferredLocation: "Pune / Manesar",
    currentCtc: "8.5 LPA",
    expectedCtc: "11.0 LPA",
    noticePeriod: "60 Days (2 Months)",
    linkedinUrl: "https://linkedin.com/in/vikramchauhan",
    resumeFilename: "Vikram_Chauhan_Resume.docx",
    status: "Future Requirement",
    notes: "High potential for heavy engineering plant openings next quarter.",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "demo-4",
    id: "demo-4",
    fullName: "Neha Kapoor",
    mobileNumber: "+91 96543 21098",
    email: "neha.kapoor@example.com",
    currentLocation: "Delhi NCR",
    highestQualification: "BCA / MCA",
    totalExperience: "2 - 4 Years",
    currentCompany: "CloudSys Tech",
    currentDesignation: "IT Support Engineer",
    skills: "Hardware & Networking, Windows Server, Desktop Support, Troubleshooting",
    profileCategory: "IT / Tech Support",
    preferredRole: "Senior IT Support Specialist",
    preferredLocation: "Noida / Delhi",
    currentCtc: "4.2 LPA",
    expectedCtc: "5.5 LPA",
    noticePeriod: "15 Days or less",
    linkedinUrl: "https://linkedin.com/in/nehakapoor",
    resumeFilename: "Neha_Kapoor_IT.pdf",
    status: "Contacted",
    notes: "Contacted via phone; interested in Level 2 support roles.",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function CandidatePoolModule() {
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("All Experience");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Detail Modal
  const [activeCandidate, setActiveCandidate] = useState<CandidateRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCandidates();
      if (data && data.length > 0) {
        setCandidates(data);
      } else {
        setCandidates(DEMO_CANDIDATES);
      }
    } catch {
      // Use demo candidates gracefully if backend is offline
      setCandidates(DEMO_CANDIDATES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // Filtered List
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Category
      if (selectedCategory !== "All Categories" && c.profileCategory.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Status
      if (selectedStatus !== "all" && c.status !== selectedStatus) {
        return false;
      }
      // Experience
      if (selectedExperience !== "All Experience" && !c.totalExperience.toLowerCase().includes(selectedExperience.toLowerCase().replace("all experience", ""))) {
        return false;
      }
      // Location
      if (selectedLocation.trim()) {
        const qLoc = selectedLocation.toLowerCase().trim();
        const matchesLoc =
          c.currentLocation.toLowerCase().includes(qLoc) ||
          c.preferredLocation.toLowerCase().includes(qLoc);
        if (!matchesLoc) return false;
      }
      // Search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matches =
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.mobileNumber.includes(q) ||
          c.skills.toLowerCase().includes(q) ||
          (c.currentCompany && c.currentCompany.toLowerCase().includes(q)) ||
          (c.currentDesignation && c.currentDesignation.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [candidates, search, selectedCategory, selectedStatus, selectedExperience, selectedLocation]);

  // Statistics
  const stats = useMemo(() => {
    const total = candidates.length;
    const newCount = candidates.filter((c) => c.status === "New").length;
    const shortlisted = candidates.filter((c) => c.status === "Shortlisted").length;
    const scheduled = candidates.filter((c) => c.status === "Interview Scheduled").length;
    const future = candidates.filter((c) => c.status === "Future Requirement").length;
    const hired = candidates.filter((c) => c.status === "Hired" || c.status === "Selected").length;

    return { total, newCount, shortlisted, scheduled, future, hired };
  }, [candidates]);

  // Handle status update
  const handleStatusChange = async (id: string | number, newStatus: string, notes?: string) => {
    setIsUpdatingStatus(true);
    try {
      await updateCandidateStatus(id, newStatus, notes);
      setCandidates((prev) =>
        prev.map((c) => (String(c.id) === String(id) || String(c._id) === String(id) ? { ...c, status: newStatus as any, notes: notes !== undefined ? notes : c.notes } : c))
      );
      if (activeCandidate && (String(activeCandidate.id) === String(id) || String(activeCandidate._id) === String(id))) {
        setActiveCandidate((prev) => prev ? { ...prev, status: newStatus as any, notes: notes !== undefined ? notes : prev.notes } : null);
      }
      showToast(`Status updated to "${newStatus}"`);
    } catch {
      // Local optimistic update
      setCandidates((prev) =>
        prev.map((c) => (String(c.id) === String(id) || String(c._id) === String(id) ? { ...c, status: newStatus as any } : c))
      );
      showToast(`Status updated to "${newStatus}" (saved locally)`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeCandidate) return;
    await handleStatusChange(activeCandidate.id || activeCandidate._id, activeCandidate.status, editingNotes);
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to remove this candidate from the Talent Pool?")) return;
    try {
      await deleteCandidate(id);
    } catch {
      // ignore
    }
    setCandidates((prev) => prev.filter((c) => String(c.id) !== String(id) && String(c._id) !== String(id)));
    if (activeCandidate && (String(activeCandidate.id) === String(id) || String(activeCandidate._id) === String(id))) {
      setActiveCandidate(null);
    }
    showToast("Candidate removed from pool");
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const openCandidateDetail = (candidate: CandidateRecord) => {
    setActiveCandidate(candidate);
    setEditingNotes(candidate.notes || "");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shortlisted":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Contacted":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Interview Scheduled":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Selected":
      case "Hired":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "On Hold":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Future Requirement":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-[10000] rounded-xl bg-slate-900 text-white px-5 py-3 shadow-xl text-sm font-semibold flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header & Quick Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users size={26} className="text-blue-600" />
            <span>Candidate Talent Pool</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Permanent candidate repository. Filter by category, experience, and skills to contact suitable candidates for current & future requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={loadCandidates}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition active:scale-95 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          { label: "Total Talent Pool", val: stats.total, color: "text-blue-600", bg: "bg-blue-50/60" },
          { label: "New Profiles", val: stats.newCount, color: "text-cyan-600", bg: "bg-cyan-50/60" },
          { label: "Shortlisted", val: stats.shortlisted, color: "text-purple-600", bg: "bg-purple-50/60" },
          { label: "Interview Sched.", val: stats.scheduled, color: "text-amber-600", bg: "bg-amber-50/60" },
          { label: "Future Pipeline", val: stats.future, color: "text-indigo-600", bg: "bg-indigo-50/60" },
          { label: "Hired / Selected", val: stats.hired, color: "text-emerald-600", bg: "bg-emerald-50/60" },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border border-slate-200/80 p-4 shadow-sm bg-white dark:bg-slate-900/80 dark:border-white/10`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${item.color}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {/* 3. Filter & Search Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3 dark:border-white/10 dark:bg-slate-900/80">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Live Search */}
          <div className="relative lg:col-span-2">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, skills, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2 text-sm text-slate-800 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition dark:bg-white/5 dark:border-white/10 dark:text-white"
            />
          </div>

          {/* Profile Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer dark:bg-white/5 dark:border-white/10 dark:text-white"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer dark:bg-white/5 dark:border-white/10 dark:text-white"
            >
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer dark:bg-white/5 dark:border-white/10 dark:text-white"
            >
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location filter & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MapPin size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Filter by location (e.g. Noida, Delhi)..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none w-full sm:w-60 dark:bg-white/5 dark:border-white/10 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Showing <strong>{filteredCandidates.length}</strong> of {candidates.length} profiles
            </span>
            {(search || selectedCategory !== "All Categories" || selectedStatus !== "all" || selectedExperience !== "All Experience" || selectedLocation) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All Categories");
                  setSelectedStatus("all");
                  setSelectedExperience("All Experience");
                  setSelectedLocation("");
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Candidate Pool Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Candidate Details</th>
                <th className="px-4 py-3.5">Profile Category</th>
                <th className="px-4 py-3.5">Experience & Role</th>
                <th className="px-4 py-3.5">Location & CTC</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <Users size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No candidates match your filters</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing your search terms or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id || candidate._id}
                    className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition"
                  >
                    {/* Candidate Details */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-[15px]">
                          {candidate.fullName}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                          <a
                            href={`tel:${candidate.mobileNumber}`}
                            className="inline-flex items-center gap-1 hover:text-blue-600 transition"
                            title="Call Candidate"
                          >
                            <Phone size={12} className="text-blue-600" />
                            <span>{candidate.mobileNumber}</span>
                          </a>
                          <a
                            href={`mailto:${candidate.email}`}
                            className="inline-flex items-center gap-1 hover:text-blue-600 transition"
                            title="Email Candidate"
                          >
                            <Mail size={12} className="text-teal-600" />
                            <span>{candidate.email}</span>
                          </a>
                        </div>
                        {candidate.highestQualification && (
                          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                            <GraduationCap size={12} />
                            <span>{candidate.highestQualification}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Profile Category */}
                    <td className="px-4 py-4">
                      <span className="inline-block rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {candidate.profileCategory}
                      </span>
                      {candidate.preferredRole && candidate.preferredRole !== candidate.profileCategory && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          Role: {candidate.preferredRole}
                        </p>
                      )}
                    </td>

                    {/* Experience & Current Role */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-xs">
                        {candidate.totalExperience || "Fresher"}
                      </p>
                      {candidate.currentDesignation && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {candidate.currentDesignation}
                          {candidate.currentCompany ? ` @ ${candidate.currentCompany}` : ""}
                        </p>
                      )}
                      {candidate.noticePeriod && (
                        <span className="inline-block mt-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                          NP: {candidate.noticePeriod}
                        </span>
                      )}
                    </td>

                    {/* Location & CTC */}
                    <td className="px-4 py-4 text-xs">
                      <p className="text-slate-700 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        <span>{candidate.currentLocation}</span>
                      </p>
                      {(candidate.currentCtc || candidate.expectedCtc) && (
                        <p className="text-slate-500 mt-1">
                          Exp CTC: <strong className="text-slate-800">{candidate.expectedCtc || "N/A"}</strong>
                        </p>
                      )}
                    </td>

                    {/* Status with Quick Dropdown */}
                    <td className="px-4 py-4">
                      <select
                        value={candidate.status}
                        onChange={(e) => handleStatusChange(candidate.id || candidate._id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer transition ${getStatusBadgeClass(
                          candidate.status
                        )}`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Call */}
                        <a
                          href={`tel:${candidate.mobileNumber}`}
                          className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
                          title="Call Candidate"
                        >
                          <Phone size={15} />
                        </a>

                        {/* Email */}
                        <a
                          href={`mailto:${candidate.email}`}
                          className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Email Candidate"
                        >
                          <Mail size={15} />
                        </a>

                        {/* View Full Profile */}
                        <button
                          type="button"
                          onClick={() => openCandidateDetail(candidate)}
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(candidate.id || candidate._id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete from pool"
                        >
                          <Trash2 size={15} />
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

      {/* 5. Detailed Candidate Dossier Modal */}
      <AnimatePresence>
        {activeCandidate && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCandidate(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl md:rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#04142B] via-[#0A1F44] to-[#1E40FF] px-6 py-5 text-white flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-teal-300">
                    Candidate Profile Dossier
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
                    {activeCandidate.fullName}
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5">
                    Talent Pool Category: <strong>{activeCandidate.profileCategory}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCandidate(null)}
                  className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Dossier Body */}
              <div className="p-6 max-h-[calc(85vh-130px)] overflow-y-auto space-y-5 text-sm">
                {/* Contact Bar */}
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">Contact Information</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} className="text-blue-600" />
                        {activeCandidate.mobileNumber}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} className="text-teal-600" />
                        {activeCandidate.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${activeCandidate.mobileNumber}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-bold shadow-sm transition"
                    >
                      <Phone size={13} /> Call
                    </a>
                    <a
                      href={`mailto:${activeCandidate.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-bold shadow-sm transition"
                    >
                      <Mail size={13} /> Email
                    </a>
                  </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Current Location</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.currentLocation}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Preferred Location</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.preferredLocation}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Highest Qualification</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.highestQualification}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Total Experience</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.totalExperience}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Current Company</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.currentCompany || "Not specified"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Current Designation</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.currentDesignation || "Not specified"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Current CTC</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.currentCtc || "Negotiable"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <p className="text-slate-400 font-medium">Expected CTC</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{activeCandidate.expectedCtc || "As per norm"}</p>
                  </div>
                </div>

                {/* Key Skills */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {activeCandidate.skills.split(",").map((sk, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-blue-50 border border-blue-100 text-blue-800 px-2.5 py-1 text-xs font-medium"
                      >
                        {sk.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume & LinkedIn */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {activeCandidate.linkedinUrl && (
                    <a
                      href={activeCandidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Linkedin size={14} className="text-[#0A66C2]" />
                      <span>View LinkedIn Profile</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {activeCandidate.resumeFilename && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs font-semibold text-blue-800">
                      <FileText size={14} />
                      <span>{activeCandidate.resumeFilename}</span>
                      {activeCandidate.resumeData && (
                        <a
                          href={activeCandidate.resumeData}
                          download={activeCandidate.resumeFilename}
                          className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Download size={12} /> Download
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Update Dropdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Update Candidate Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(activeCandidate.id || activeCandidate._id, st, editingNotes)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                          activeCandidate.status === st
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* HR Internal Notes */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">HR Notes & Follow-up</p>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Enter HR screening notes, interview feedback, or future hiring notes..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
