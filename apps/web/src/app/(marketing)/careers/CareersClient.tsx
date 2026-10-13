"use client";

import { useState, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calculator,
  UserCheck,
  Factory,
  FolderOpen,
  PieChart,
  Cpu,
  TrendingUp,
  CheckCircle2,
  FileCheck,
  Clock,
  ExternalLink,
  Award,
  HeartHandshake,
  Handshake,
  Monitor,
  Plus,
  Minus,
  Compass,
  Zap,
  HelpCircle,
  Mail,
  Phone,
  GraduationCap,
  Target,
  Smile,
  Search,
  LayoutGrid,
  Table as TableIcon,
  MapPin,
  Filter,
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { CandidateDetailsModal } from "@/components/modals/CandidateDetailsModal";
import { site } from "@/lib/content";

export type ProfileCategory = {
  id: string;
  refNo: string;
  name: string;
  functionGroup: "hr" | "operations" | "finance-admin" | "sales-bd" | "tech";
  functionName: string;
  icon: typeof Users;
  accent: string;
  tagline: string;
  description: string;
  commonRoles: string[];
  keySkills: string[];
  locations: string;
};

export const FIXED_PROFILE_CATEGORIES: ProfileCategory[] = [
  {
    id: "hr-recruitment",
    refNo: "LEG-1001",
    name: "HR & Recruitment",
    functionGroup: "hr",
    functionName: "Talent Acquisition & Sourcing",
    icon: Users,
    accent: "from-blue-600 to-indigo-600",
    tagline: "Talent Acquisition & Sourcing",
    description:
      "Focuses on sourcing skilled talent, conducting preliminary screenings, technical hiring, bulk staffing drives, and campus recruitment coordination.",
    commonRoles: ["Recruiter", "Talent Acquisition Specialist", "HR Executive", "Staffing Consultant"],
    keySkills: ["Sourcing", "Screening", "Interview Coordination", "Portal Management", "Candidate Engagement"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "payroll",
    refNo: "LEG-1002",
    name: "Payroll",
    functionGroup: "hr",
    functionName: "Compensation & Statutory Compliance",
    icon: Calculator,
    accent: "from-emerald-600 to-teal-600",
    tagline: "Salary & Statutory Compliances",
    description:
      "Specializes in monthly compensation processing, attendance reconciliation, tax deductions, PF/ESI compliances, and full & final settlements.",
    commonRoles: ["Payroll Executive", "Compensation Specialist", "Compliance Officer", "Payroll Analyst"],
    keySkills: ["Salary Processing", "PF & ESI Compliance", "TDS Computation", "MS Excel", "Payroll Software"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "hr-operations",
    refNo: "LEG-1003",
    name: "HR Operations",
    functionGroup: "hr",
    functionName: "People Operations & HR Policies",
    icon: UserCheck,
    accent: "from-violet-600 to-purple-600",
    tagline: "People Management & HR Policies",
    description:
      "Handles end-to-end employee onboarding, induction, HR records management, attendance systems, employee grievances, and workplace culture.",
    commonRoles: ["HR Operations Executive", "HR Generalist", "People Operations Associate", "Employee Relations Lead"],
    keySkills: ["Employee Onboarding", "HR Policies", "Documentation", "HRIS", "Exit Management"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "supervisor",
    refNo: "LEG-1004",
    name: "Supervisor",
    functionGroup: "operations",
    functionName: "Manufacturing & Shopfloor Ops",
    icon: Factory,
    accent: "from-amber-600 to-orange-600",
    tagline: "Manufacturing & Industrial Operations",
    description:
      "Oversees manufacturing facilities, shop floor operations, machine maintenance, production planning, workforce allocation, and industrial safety.",
    commonRoles: [
      "Sourcing Supervisor",
      "In Plant Management",
      "Lead Supervisor",
      "Manpower Sourcing",
      "Executive",
    ],
    keySkills: ["Shop Floor Management", "5S & Lean", "Safety Protocols", "Production Scheduling", "Equipment Maintenance"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "administration",
    refNo: "LEG-1005",
    name: "Administration",
    functionGroup: "finance-admin",
    functionName: "Corporate Facilities & Workplace Admin",
    icon: FolderOpen,
    accent: "from-slate-700 to-slate-900",
    tagline: "Facility & Workplace Management",
    description:
      "Manages office infrastructure, corporate facilities, housekeeping, travel arrangements, procurement, and daily office operational logistics.",
    commonRoles: ["Admin Executive", "Facility Coordinator", "Office Manager", "Front Desk Officer"],
    keySkills: ["Office Coordination", "Vendor Management", "Procurement", "Asset Tracking", "Logistics"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "accounts-finance",
    refNo: "LEG-1006",
    name: "Accounts & Finance",
    functionGroup: "finance-admin",
    functionName: "Bookkeeping, Audit & Taxation",
    icon: PieChart,
    accent: "from-cyan-600 to-blue-700",
    tagline: "Bookkeeping, Audit & Taxation",
    description:
      "Handles general ledger accounts, billing, bank reconciliations, accounts payable/receivable, GST returns, and corporate financial documentation.",
    commonRoles: ["Accountant", "Billing Executive", "Finance Associate", "Audit Assistant"],
    keySkills: ["Tally / ERP", "GST & TDS", "Account Reconciliation", "Invoicing", "Balance Sheet"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "operations",
    refNo: "LEG-1007",
    name: "Operations",
    functionGroup: "operations",
    functionName: "Process Management & Logistics",
    icon: Layers,
    accent: "from-teal-600 to-emerald-700",
    tagline: "Process & Logistics Management",
    description:
      "Manages day-to-day workflow execution, service delivery, operational reporting, supply chain oversight, and process quality improvement.",
    commonRoles: ["Operations Executive", "Process Associate", "Logistics Coordinator", "MIS Executive"],
    keySkills: ["Process Workflow", "MIS Reporting", "Coordination", "Quality Assurance", "Problem Solving"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "business-development",
    refNo: "LEG-1008",
    name: "Business Development",
    functionGroup: "sales-bd",
    functionName: "Corporate Alliances & Partnerships",
    icon: TrendingUp,
    accent: "from-blue-700 to-indigo-800",
    tagline: "Client Partnerships & Alliances",
    description:
      "Identifies new business opportunities, establishes partnerships with prospective corporate clients, pitches staffing solutions, and negotiates contracts.",
    commonRoles: ["BD Executive", "Corporate Alliance Manager", "Partnership Lead", "Client Acquisition Specialist"],
    keySkills: ["Lead Generation", "Client Pitching", "Corporate Alliances", "Contract Negotiation", "Market Research"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "sales",
    refNo: "LEG-1009",
    name: "Sales",
    functionGroup: "sales-bd",
    functionName: "Enterprise & Field Sales",
    icon: Briefcase,
    accent: "from-rose-600 to-pink-600",
    tagline: "Field & Corporate B2B Sales",
    description:
      "Drives revenue growth through active client outreach, enterprise sales cycles, proposal presentations, account management, and customer retention.",
    commonRoles: ["Sales Executive", "Account Executive", "Relationship Manager", "B2B Sales Representative"],
    keySkills: ["Direct Sales", "Client Relationship", "Objection Handling", "Revenue Targets", "CRM Usage"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
  {
    id: "it-tech-support",
    refNo: "LEG-1010",
    name: "IT / Tech Support",
    functionGroup: "tech",
    functionName: "IT Hardware, Networking & Systems",
    icon: Cpu,
    accent: "from-indigo-600 to-cyan-600",
    tagline: "Infrastructure & Systems Support",
    description:
      "Maintains computer hardware, network configurations, software installations, troubleshooting user issues, cybersecurity protocols, and asset tracking.",
    commonRoles: [
      "Front End Developer",
      "Full Stack Developer",
      "Software Engineer",
      "Web Developer",
      "DevOps",
    ],
    keySkills: ["Frontend & Backend", "Full Stack Development", "Web Technologies", "Cloud & DevOps", "Software Engineering"],
    locations: "Noida, Gautam Buddh Nagar, UP, 201301",
  },
];

const RECRUITMENT_PROCESS_STAGES = [
  {
    step: "Step 1",
    label: "Application submission",
    icon: CheckCircle2,
  },
  {
    step: "Step 2",
    label: "Application review",
    icon: UserCheck,
  },
  {
    step: "Step 3",
    label: "Interviews and assessments",
    icon: Monitor,
  },
  {
    step: "Step 4",
    label: "The offer",
    icon: Award,
  },
  {
    step: "Step 5",
    label: "Background checks",
    icon: ShieldCheck,
  },
  {
    step: "Step 6",
    label: "Onboarding",
    icon: Handshake,
  },
];

const RECRUITMENT_FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What should I include in my resume?",
    a: "Your resume should clearly highlight your relevant work history, educational qualifications, core technical or functional skills, certifications, key achievements, and accurate contact details (email and mobile number). Please ensure it is concise, well-structured, and preferably in PDF format.",
  },
  {
    q: "Can I apply for multiple positions at the same time?",
    a: "Yes. You can submit your candidate profile for any categories and roles that align with your background and experience. Our recruitment team evaluates your application across all relevant corporate openings.",
  },
  {
    q: "Where can I check the status of my job application?",
    a: "Once you submit your application through our portal, you will receive an immediate confirmation. Our HR team reviews profiles on an ongoing basis. As soon as a position matching your qualifications is open, an HR specialist will contact you directly via phone or email.",
  },
  {
    q: "What is the interview process at LEGPRO Services?",
    a: "Our recruitment process generally involves an initial phone screening with an HR recruiter, followed by technical or functional assessment rounds, and a final discussion with the hiring manager or client team. The exact rounds depend on the role and domain.",
  },
  {
    q: "How can I prepare for my interview?",
    a: "Review the role overview and key required skills, prepare real-world examples demonstrating your past accomplishments and problem-solving skills, familiarize yourself with LEGPRO Services' offerings, and test your audio/video setup if your interview is virtual.",
  },
  {
    q: "How can I stay connected and keep up with new job opportunities, company updates and news?",
    a: (
      <span>
        You can follow LEGPRO Services on our professional channels like LinkedIn, explore active requirements and drives on our verified{" "}
        <a
          href="https://jobmela.co.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-white hover:text-teal-200 transition"
        >
          Jobmela portal (jobmela.co.in)
        </a>
        , visit our website regularly, and keep your candidate profile updated with any new skills, certifications, or experience.
      </span>
    ),
  },
];

const PERKS_AND_BENEFITS = [
  { title: "Direct Corporate Placements", desc: "Access to verified enterprise opportunities across India" },
  { title: "Industry-Aligned Compensation", desc: "Fair, market-benchmarked salary packages & timely payouts" },
  { title: "Skill & Degree Pathways", desc: "Integrated B.Voc, D.Voc, NAPS, and NATS learning programs" },
  { title: "Statutory Security", desc: "Strict adherence to PF, ESIC, insurance, and labor compliance" },
  { title: "Dedicated HR Guidance", desc: "Personalized interview preparation and career advisory" },
  { title: "Zero Registration Charges", desc: "100% free talent intake for all candidates" },
];

export function CareersClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("HR & Recruitment");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Radiant.in inspired features: View mode toggle & search/filters
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const handleOpenModal = (categoryName?: string, roleName?: string) => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
    if (roleName) {
      setSelectedRole(roleName);
    } else {
      setSelectedRole("");
    }
    setModalOpen(true);
  };

  // Filtered categories based on search & domain
  const filteredCategories = useMemo(() => {
    return FIXED_PROFILE_CATEGORIES.filter((cat) => {
      const matchesGroup =
        activeGroup === "all" || cat.functionGroup === activeGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.refNo.toLowerCase().includes(q) ||
        cat.functionName.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.locations.toLowerCase().includes(q) ||
        cat.commonRoles.some((r) => r.toLowerCase().includes(q)) ||
        cat.keySkills.some((s) => s.toLowerCase().includes(q));

      return matchesGroup && matchesSearch;
    });
  }, [activeGroup, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO SECTION (LEGPRO Brand Theme) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04142B] via-[#0A1F44] to-[#1E40FF] pt-8 pb-10 lg:pt-10 lg:pb-12 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-white/20 blur-sm" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-2 border-teal-400/30" />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Hero Text & Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 backdrop-blur-md border border-white/15">
                <Sparkles size={14} className="text-teal-300" />
                <span>Career Opportunities • LEGPRO Services</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white Poppins">
                <TypewriterText text="Career Opportunities" cursorColor="#2dd4bf" />
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl">
                Explore our career opportunities and submit your profile for the role that best matches your skills and experience. Even if there is no immediate opening, you can submit your profile. Our HR team will contact you when a suitable opportunity becomes available.
              </p>

              <div className="pt-1">
                <a
                  href="#talent-categories"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-teal-500/25 hover:scale-[1.02] transition active:scale-98"
                >
                  <span>Browse Profile Directory</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Career Pictures Showcase with Dynamic Motion */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Soft living ambient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.25, 0.45, 0.25],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 bg-gradient-to-tr from-teal-500/25 via-blue-500/25 to-indigo-500/20 rounded-3xl blur-2xl -z-10"
              />

              <div className="relative">
                {/* Main Career Image Card with Continuous Gentle Float */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl shadow-black/50 group"
                >
                  <motion.img
                    animate={{
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    src="/career-tech-concept.jpg"
                    alt="Career digital network interface with Skills, Education, Passion and Values"
                    className="w-full h-72 sm:h-80 md:h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04142B]/50 via-transparent to-transparent pointer-events-none" />

                  {/* Light sweep shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -skew-x-12"
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                      repeatDelay: 3,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FIXED PROFILE CATEGORIES & DIRECTORY SECTION (Referenced from radiant.in Table + Cards) */}
      <section id="talent-categories" className="py-8 md:py-10 bg-slate-50">
        <Container>
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-display">
              Select Your Category to submit the application
            </h2>
          </div>

          {/* Interactive Controls Bar: Search, Function Filters & View Mode (Cards vs Radiant Directory Table) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm mb-5 space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by profile title, role, skills, ref ID, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>

              {/* View Toggle: Directory Table vs Cards */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">View Format:</span>
                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                      viewMode === "table"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <TableIcon size={14} />
                    <span>Directory Table</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                      viewMode === "cards"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LayoutGrid size={14} />
                    <span>Visual Cards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Department / Function Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 font-semibold shrink-0 pr-1 flex items-center gap-1">
                <Filter size={13} />
                Function:
              </span>
              {[
                { id: "all", label: "All Profiles (10)" },
                { id: "hr", label: "HR & People (3)" },
                { id: "operations", label: "Operations & Plant (2)" },
                { id: "finance-admin", label: "Finance & Admin (2)" },
                { id: "sales-bd", label: "Sales & BD (2)" },
                { id: "tech", label: "IT & Tech (1)" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveGroup(pill.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition ${
                    activeGroup === pill.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Content: Render Table View (Inspired by radiant.in/careers) or Card View */}
          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-600 font-medium">No talent profile categories found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveGroup("all");
                }}
                className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
              >
                Clear search and filters
              </button>
            </div>
          ) : viewMode === "table" ? (
            /* Radiant.in-Style Structured Directory Table (Styled with LEGPRO Navy & Blue Theme) */
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#04142B] text-white text-xs uppercase tracking-wider font-semibold border-b border-[#0A1F44]">
                      <th className="py-4 px-4 sm:px-6 w-24">Ref. No</th>
                      <th className="py-4 px-4 sm:px-6">Profile Category</th>
                      <th className="py-4 px-4 sm:px-6">Function / Domain</th>
                      <th className="py-4 px-4 sm:px-6 hidden md:table-cell">Evaluated Roles</th>
                      <th className="py-4 px-4 sm:px-6 hidden lg:table-cell">Locations</th>
                      <th className="py-4 px-4 sm:px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      const isEven = idx % 2 === 1;
                      return (
                        <tr
                          key={cat.id}
                          className={`hover:bg-blue-50/60 transition group ${
                            isEven ? "bg-slate-50/50" : "bg-white"
                          }`}
                        >
                          {/* Ref. No */}
                          <td className="py-4 px-4 sm:px-6 font-mono text-xs font-bold text-slate-500">
                            <span className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
                              {cat.refNo}
                            </span>
                          </td>

                          {/* Profile Name */}
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-9 w-9 rounded-lg bg-gradient-to-br ${cat.accent} text-white flex items-center justify-center shrink-0 shadow-sm`}
                              >
                                <Icon size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                                  {cat.name}
                                </h4>
                                <p className="text-xs text-slate-500 line-clamp-1">
                                  {cat.tagline}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Function / Domain */}
                          <td className="py-4 px-4 sm:px-6 text-xs text-slate-600 font-medium">
                            {cat.functionName}
                          </td>

                          {/* Evaluated Roles */}
                          <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {cat.commonRoles.slice(0, 3).map((r) => (
                                <span
                                  key={r}
                                  className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700 font-medium"
                                >
                                  {r}
                                </span>
                              ))}
                              {cat.commonRoles.length > 3 && (
                                <span className="inline-block text-[11px] text-slate-400 font-medium">
                                  +{cat.commonRoles.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Locations */}
                          <td className="py-4 px-4 sm:px-6 hidden lg:table-cell text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <MapPin size={13} className="text-slate-400 shrink-0" />
                              <span className="line-clamp-1" title={cat.locations}>{cat.locations}</span>
                            </div>
                          </td>

                          {/* Apply Action Button */}
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(cat.name)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition active:scale-95 group-hover:shadow"
                            >
                              <span>Apply</span>
                              <ArrowRight size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer info */}
              <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <span>Showing {filteredCategories.length} permanent profile categories</span>
                <span className="text-slate-400">Profiles stored indefinitely • Direct HR outreach upon requirement</span>
              </div>
            </div>
          ) : (
            /* Visual Grid of Permanent Profile Categories */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.article
                    key={cat.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.accent} text-white flex items-center justify-center shadow-md`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[11px] font-bold text-slate-400 block">
                            {cat.refNo}
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            Permanent Pool
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {cat.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {cat.tagline}
                      </p>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Common Roles */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Common Roles Included
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.commonRoles.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleOpenModal(cat.name, role)}
                              className="inline-block rounded-md bg-slate-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-0.5 text-[11px] text-slate-700 font-medium transition"
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Locations & Skills */}
                      <div className="mt-3 pt-2 text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="line-clamp-1" title={cat.locations}>{cat.locations}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          Skills: {cat.keySkills.join(" • ")}
                        </p>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(cat.name)}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition active:scale-98 flex items-center justify-center gap-2"
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* 3. RECRUITMENT PROCESS */}
      <section className="py-8 md:py-10 bg-white border-b border-slate-200/80">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-sky-600 font-display mb-2 tracking-tight">
              Recruitment process
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">
              At LEGPRO Services, we are committed to providing a transparent and positive experience for every individual who expresses interest in joining our organization. As you start your journey with us, we want to ensure you have a clear understanding of the six stages of our recruitment process, from application to onboarding.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting horizontal line on desktop */}
            <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-slate-200 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 relative z-10 text-center">
              {RECRUITMENT_PROCESS_STAGES.map((stage) => {
                const IconComponent = stage.icon;
                return (
                  <div key={stage.step} className="flex flex-col items-center group">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-sky-500/80 text-sky-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-sky-600 group-hover:text-sky-700 group-hover:shadow-md transition-all duration-300">
                      <IconComponent size={26} strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-sky-700 font-display">
                      {stage.step}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-snug max-w-[130px]">
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. PERKS & CANDIDATE ADVANTAGES */}
      <section className="py-8 md:py-10 bg-slate-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
              Why Choose LEGPRO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
              Benefits of Joining Our Candidate Network
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {PERKS_AND_BENEFITS.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex items-start gap-3.5 hover:shadow-md transition"
              >
                <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FAQS ABOUT OUR RECRUITMENT PROCESS */}
      <section className="py-8 md:py-10 bg-[#006BB6] text-white">
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white text-center font-display mb-6 sm:mb-8">
            FAQs about our recruitment process
          </h2>

          <div className="border-t border-white/30">
            {RECRUITMENT_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-white/30">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-3.5 sm:py-4 flex items-center justify-between gap-4 text-left group transition"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-white group-hover:text-white/90">
                      {faq.q}
                    </span>
                    <span className="text-white shrink-0 ml-3 flex items-center justify-center">
                      {isOpen ? (
                        <Minus size={22} strokeWidth={2.5} />
                      ) : (
                        <Plus size={22} strokeWidth={2.5} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 sm:pb-6 text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-[#04142B] via-[#0A1F44] to-[#1E40FF] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
              Ready to be discovered by top employers?
            </h2>
            <p className="text-sm sm:text-base text-slate-200">
              Submit your candidate profile today. It takes less than 2 minutes to register with our network.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 px-7 py-3 text-sm sm:text-base font-bold text-white shadow-xl shadow-teal-500/25 transition active:scale-98"
              >
                <span>Apply Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Candidate Profile Modal */}
      <CandidateDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={selectedCategory}
        jobTitle={selectedRole}
      />
    </div>
  );
}
