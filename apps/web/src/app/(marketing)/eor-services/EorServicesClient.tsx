"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Users,
  ShieldCheck,
  TrendingUp,
  Zap,
  Award,
  CheckCircle2,
  ChevronRight,
  Check,
  Globe,
  FileText,
  CreditCard,
  HeartHandshake,
  UserMinus,
  Sparkles,
  ArrowRight,
  Layers,
  MessageCircle,
  X,
  Phone,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { site, getWhatsAppUrl } from "@/lib/content";

// ----------------------------------------------------------------------
// DATA SETS
// ----------------------------------------------------------------------

const EOR_OFFERINGS = [
  {
    id: "employment-onboarding",
    number: "01",
    title: "Employment & Onboarding",
    tag: "Entity-Free Hiring",
    desc: "Employment contracts, documentation, and smooth employee onboarding without requiring a local legal entity.",
    icon: FileText,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-500/40",
    quickBullets: ["Compliant Local Contracts", "Digital KYC & Onboarding"],
    points: [
      "Locally compliant employment agreements tailored to Indian regulations",
      "Digital KYC, documentation, background checks, and credential verification",
      "Seamless welcome orientation, equipment & asset provisioning guidance",
      "Immediate talent deployment into your workflow without setup friction",
    ],
  },
  {
    id: "payroll-management",
    number: "02",
    title: "Payroll Management",
    tag: "100% On-Time Processing",
    desc: "Timely salary processing, payslips, and end-to-end payroll administration with complete transparency.",
    icon: CreditCard,
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
    borderColor: "hover:border-emerald-500/40",
    quickBullets: ["Disbursals & Digital Payslips", "TDS & Tax Withholding"],
    points: [
      "Automated salary disbursals and confidential digital payslip delivery",
      "Tax withholding, TDS computation, and statutory deduction filings",
      "Multi-tier expense reimbursements, bonuses, and allowances",
      "Comprehensive monthly payroll audit reports and reconciliation",
    ],
  },
  {
    id: "statutory-compliance",
    number: "03",
    title: "Statutory Compliance",
    tag: "Zero Legal Exposure",
    desc: "Support with applicable labour laws, social security, and employment-related statutory requirements.",
    icon: ShieldCheck,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-[#FF7A00]",
    borderColor: "hover:border-[#FF7A00]/40",
    quickBullets: ["EPF, ESIC & Labour Codes", "Zero Penalty Guarantee"],
    points: [
      "EPF, ESIC, Professional Tax, Labour Welfare Fund, and Gratuity adherence",
      "Full alignment with state & national Labour Codes and occupational safety standards",
      "Periodic statutory audits, filings, challans, and register maintenance",
      "Proactive legal updates and continuous regulatory compliance shielding",
    ],
  },
  {
    id: "benefits-administration",
    number: "04",
    title: "Employee Benefits Administration",
    tag: "Talent Retention",
    desc: "Coordination and administration of applicable employee benefits to keep your team motivated and secure.",
    icon: HeartHandshake,
    color: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-600",
    borderColor: "hover:border-rose-500/40",
    quickBullets: ["Health & Accidental Insurance", "Claims & Wellness Support"],
    points: [
      "Group medical, accidental, and term health insurance coverage setup",
      "Wellness programs and employee assistance initiatives",
      "Custom perk packages, flexi-benefits, and lifestyle incentives",
      "Dedicated claims assistance, policy renewals, and employee query resolution",
    ],
  },
  {
    id: "hr-administration",
    number: "05",
    title: "HR Administration",
    tag: "Ongoing Support",
    desc: "Employee records, leave management, performance tracking coordination, and responsive HR support.",
    icon: Users,
    color: "from-cyan-500/10 to-sky-500/10",
    iconColor: "text-cyan-600",
    borderColor: "hover:border-cyan-500/40",
    quickBullets: ["Leave & Records Management", "Dedicated HR Helpdesk"],
    points: [
      "Centralized digital employee records & self-service employee portal access",
      "Leave tracking, holiday calendar management, and attendance logging",
      "Employee query helpdesk, grievance management, and mediation support",
      "Company policy implementation, performance tracking, and culture enablement",
    ],
  },
  {
    id: "exit-settlement",
    number: "06",
    title: "Exit & Full and Final Settlement",
    tag: "Clean Transitions",
    desc: "Employee separation documentation, final settlements, and exit formalities completed strictly per compliance.",
    icon: UserMinus,
    color: "from-purple-500/10 to-indigo-500/10",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-500/40",
    quickBullets: ["FnF Salary & Bonus Calculation", "Relieving & PF Transfer"],
    points: [
      "Notice period coordination, clearance tracking, and legal release agreements",
      "Full & Final (FnF) salary calculation, bonus payouts, and leave encashment",
      "Relieving letters, experience certificates, and PF transfer assistance",
      "Structured exit interviews, NDA reaffirmations, and asset handover sign-offs",
    ],
  },
];

const WHY_CHOOSE_POINTS = [
  {
    title: "Simplified Workforce Expansion",
    desc: "Hire anywhere immediately without the capital outlay, delays, or legal complexities of setting up separate corporate entities.",
    icon: Globe,
    metric: "0",
    unit: "Entities Needed",
  },
  {
    title: "Reduced Administrative Workload",
    desc: "Free your leadership from time-consuming payroll processing, compliance documentation, tax filings, and local government paperwork.",
    icon: Zap,
    metric: "80%",
    unit: "Less Admin Burden",
  },
  {
    title: "Centralized HR and Payroll Support",
    desc: "One trusted partner managing all payroll, employee benefits, contracts, and day-to-day HR requests with transparent accountability.",
    icon: Layers,
    metric: "Single",
    unit: "Window Contact",
  },
  {
    title: "Flexible Workforce Management",
    desc: "Easily scale headcount up or down to align with project milestones, new markets, and shifting business priorities.",
    icon: TrendingUp,
    metric: "100%",
    unit: "Agile Scaling",
  },
  {
    title: "Dedicated Employee Lifecycle Support",
    desc: "Attentive, professional care for your employees from their first offer letter through onboarding, growth, and smooth exit.",
    icon: Award,
    metric: "360°",
    unit: "Lifecycle Care",
  },
];

// ----------------------------------------------------------------------
// AI MESH NETWORK BACKGROUND ANIMATION
// ----------------------------------------------------------------------
function AiMeshNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ["#0A66C2", "#FF7A00", "#3b82f6", "#f97316"];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 16000),
        55
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(10, 102, 194, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouseRef.current.active) {
          const mDist = Math.hypot(
            p1.x - mouseRef.current.x,
            p1.y - mouseRef.current.y
          );
          if (mDist < 140) {
            const alpha = (1 - mDist / 140) * 0.3;
            ctx.strokeStyle = `rgba(255, 122, 0, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function EorServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof EOR_OFFERINGS[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative bg-white text-slate-800 selection:bg-[#0A66C2] selection:text-white overflow-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF7A00] origin-left z-[110]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ================================================================ */}
      {/* 1. HERO SECTION (Compact) */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-slate-50 pt-7 pb-8 lg:pt-9 lg:pb-10 border-b border-slate-100 flex items-center">
        {/* Animated Gradient Glows */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#0A66C2]/20 to-transparent blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#FF7A00]/15 to-transparent blur-3xl" />
        </div>

        {/* AI Mesh Interactive Animation */}
        <AiMeshNetwork />

        <Container className="relative z-10 w-full">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Headings & Value Prop */}
            <div className="lg:col-span-7 space-y-3.5">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 shadow-xs"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#0A66C2] animate-pulse" />
                <span className="text-[11px] font-bold text-[#0A66C2] tracking-wider uppercase">
                  Global Workforce Solutions • Compliant & Entity-Free
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
              >
                Employer of Record{" "}
                <span className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent">
                  (EOR) Services
                </span>
              </motion.h1>

              {/* Typewriter Subheadline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-[#FF7A00] shrink-0" />
                <TypewriterText
                  text="Simplifying Global Employment. Empowering Business Growth."
                  speed={0.03}
                  delay={0.15}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal"
              >
                Expand your workforce without the complexities of setting up a local
                legal entity. LEGPRO Services provides Employer of Record (EOR)
                solutions that enable businesses to hire and manage employees
                efficiently while we handle key employment and HR administration
                responsibilities.
              </motion.p>

              {/* Key Bullet Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-700 font-medium"
              >
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Zero Local Legal Entity Needed</span>
                </div>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>100% Labour Law Compliance</span>
                </div>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Automated Payroll & Withholding</span>
                </div>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Full Employee Lifecycle Support</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-3 pt-1.5"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0A66C2] to-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Talk to an EOR Specialist</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <a
                  href={getWhatsAppUrl("Hi LEGPRO team, I'd like to learn more about your Employer of Record (EOR) services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-800 font-bold text-xs border border-slate-200 hover:border-[#FF7A00] hover:text-[#FF7A00] shadow-xs hover:shadow-sm transition-all duration-300"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                  <span>WhatsApp Query</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white group">
                <div className="relative h-[220px] sm:h-[250px] w-full overflow-hidden">
                  <Image
                    src="/service-eor.png"
                    alt="Employer of Record EOR Services - LEGPRO Services"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
                      <Globe className="h-3 w-3 text-[#FF7A00]" />
                      Global Employment
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-white">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#FF7A00]">
                      Direct Employment Partner
                    </p>
                    <h3 className="text-xs sm:text-sm font-bold leading-snug">
                      Hire Top Talent in India Without Setting Up Legal Entities
                    </h3>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between gap-2 text-center">
                  <div>
                    <div className="text-lg font-black text-slate-900">100%</div>
                    <div className="text-[10px] text-slate-500 font-medium">Compliance</div>
                  </div>
                  <div className="h-5 w-px bg-slate-200" />
                  <div>
                    <div className="text-lg font-black text-[#0A66C2]">48 Hrs</div>
                    <div className="text-[10px] text-slate-500 font-medium">Onboarding</div>
                  </div>
                  <div className="h-5 w-px bg-slate-200" />
                  <div>
                    <div className="text-lg font-black text-[#FF7A00]">0%</div>
                    <div className="text-[10px] text-slate-500 font-medium">Entity Setup</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* 2. OVERVIEW / STRATEGIC COMPARISON */}
      {/* ================================================================ */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-1.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-bold text-[#FF7A00] uppercase tracking-wider">
              Strategic Advantage
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">
              Transform How Your Business Hires & Manages Global Talent
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our EOR services help organizations streamline workforce management,
              maintain employment documentation, and manage payroll and statutory compliance.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="rounded-xl p-4 bg-slate-50 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-7 w-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                  ✕
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Traditional Entity Setup</h3>
                  <p className="text-[10px] text-slate-500">Complex, costly, and resource-heavy</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Months of registration delays, legal approvals, and licensing.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>High upfront capital investment, statutory bank deposits, and entity accounting fees.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Direct exposure to unfamiliar local labour regulations and penalty risks.</span>
                </li>
              </ul>
            </div>

            {/* LEGPRO EOR */}
            <div className="rounded-xl p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border-2 border-blue-200 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0A66C2] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-wider">
                Recommended
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-7 w-7 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">LEGPRO EOR Solution</h3>
                  <p className="text-[10px] text-[#0A66C2] font-semibold">Immediate, compliant, and entity-free</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Market Entry:</strong> Start onboarding team members in days, not months.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Entity Overhead:</strong> Hire compliantly without incorporating local subsidiaries.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Complete Shield:</strong> Full adherence to local labour laws, PF, ESIC, and payroll taxes.</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* 3. OUR EOR SERVICES INCLUDE — 6 BUTTONS IN ONE PAGE (No Cutoff) */}
      {/* ================================================================ */}
      <section id="services-breakdown" className="py-5 sm:py-7 bg-slate-50/80 border-b border-slate-100">
        <Container>
          {/* Section Header with Quick 6-Button Pills */}
          <div className="text-center max-w-3xl mx-auto mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-bold text-[#0A66C2] uppercase tracking-wider">
              6 Core Offerings • All in One View
            </span>
            <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Our EOR Services Include
            </h2>
            <div className="mt-1.5 h-1 w-12 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] mx-auto" />
          </div>

          {/* 6 Quick Action Pill Buttons on Top */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3.5">
            {EOR_OFFERINGS.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc)}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#0A66C2] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0A66C2] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <span className="text-[#0A66C2] group-hover:text-white font-mono font-bold text-[10px]">
                  {svc.number}
                </span>
                <span>{svc.title}</span>
                <ChevronRight className="h-3 w-3 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>

          {/* 6 Compact Cards / Buttons Grid (Fits 100% in single screen) */}
          <div className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {EOR_OFFERINGS.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  onClick={() => setSelectedService(service)}
                  className={`group relative flex flex-col justify-between rounded-xl bg-white p-3.5 sm:p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#0A66C2] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${service.borderColor}`}
                >
                  <div>
                    {/* Top row: Number, Tag, and Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-400 group-hover:text-[#0A66C2] transition-colors">
                          {service.number}
                        </span>
                        <div
                          className={`h-7 w-7 rounded-lg bg-gradient-to-br ${service.color} ${service.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-[#0A66C2] group-hover:border-blue-200 transition-colors">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-[#0A66C2] transition-colors leading-snug mb-1">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mb-2">
                      {service.desc}
                    </p>

                    {/* Two Quick Bullets */}
                    <div className="space-y-1 mb-2.5">
                      {service.quickBullets.map((qb, qIdx) => (
                        <div key={qIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{qb}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Button */}
                  <button
                    type="button"
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-50 group-hover:bg-[#0A66C2] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-[#0A66C2] text-[11px] font-bold flex items-center justify-between transition-all"
                  >
                    <span>View Details & Inquire</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* 4. WHY CHOOSE LEGPRO SERVICES? (Compact) */}
      {/* ================================================================ */}
      <section className="py-6 sm:py-8 bg-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-bold text-[#FF7A00] uppercase tracking-wider">
                Unrivalled Advantages
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                Why Choose <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent">
                  LEGPRO Services?
                </span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                With deep domain expertise in Indian labour regulations, cutting-edge payroll
                technology, and an unwavering commitment to operational excellence, we serve as
                your dependable employer of record partner.
              </p>

              <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3.5 shadow-md space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-[#FF7A00] flex items-center justify-center font-bold text-white">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Entity-Free Peace of Mind</h4>
                    <p className="text-[10px] text-slate-300">Dedicated local governance</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Focus 100% of your energy on business growth while we ensure your distributed workforce receives exceptional care and flawless execution.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#FF7A00]">
                  <Link href="/contact" className="hover:underline flex items-center gap-1">
                    <span>Consult with our workforce team</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right List of 5 Pillars */}
            <div className="lg:col-span-7 space-y-2">
              {WHY_CHOOSE_POINTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xs transition-all duration-200 flex items-start gap-3 group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-[#0A66C2] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#0A66C2] group-hover:text-white transition-all">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-0.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#0A66C2] transition-colors">
                          {item.title}
                        </h3>
                        <div className="inline-flex items-center gap-1 self-start sm:self-auto text-[10px] font-bold text-[#FF7A00] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          <span>{item.metric}</span>
                          <span className="text-slate-500 font-normal">{item.unit}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* 5. INTERACTIVE SERVICE DETAILS MODAL (When clicking any of 6 buttons) */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4 pr-8">
                <div
                  className={`h-11 w-11 rounded-xl bg-gradient-to-br ${selectedService.color} ${selectedService.iconColor} flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <selectedService.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#0A66C2]">
                      SERVICE {selectedService.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedService.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {selectedService.desc}
              </p>

              {/* Detailed Points */}
              <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Key Scope & Deliverables
                </h4>
                {selectedService.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/contact"
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Request EOR Proposal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <a
                  href={getWhatsAppUrl(`Hi LEGPRO team, I want to inquire specifically about ${selectedService.title} under EOR Services.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
