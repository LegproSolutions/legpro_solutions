const fs = require('fs');
const path = require('path');

const fileContent = `"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Award,
  ShieldCheck,
  TrendingUp,
  Users,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  Clock,
  ClipboardCheck,
  Search,
  FileText,
  BarChart3,
  CheckCircle2,
  Check,
  PhoneCall,
  UserCheck,
  Settings,
  HelpCircle,
  FileSpreadsheet,
  Headphones,
  RotateCw,
  Zap,
  BookOpen
} from "lucide-react";
import { Container } from "@/components/ui/Section";

// Custom hook for animating counter numbers on viewport entry
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();

          const updateCount = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={elementRef} className="font-display font-bold">
      {count}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------------------------
// DATA SETS
// ----------------------------------------------------------------------

const HERO_STATS = [
  { value: 5000, suffix: "+", label: "Apprentices Deployed" },
  { value: 100, suffix: "+", label: "Clients Served" },
  { value: 28, suffix: "+", label: "States covered (PAN India)" },
  { value: 95, suffix: "%", label: "Client Retention" },
];

const APPRENTICESHIP_BENEFITS_EMPLOYER = [
  { title: "Skilled Talent", desc: "Access to skilled and trainable talent", icon: Users },
  { title: "Cost Efficiency", desc: "Reduced recruitment and training costs", icon: TrendingUp },
  { title: "Productivity", desc: "Improved workforce productivity", icon: Zap },
  { title: "Talent Pipeline", desc: "Development of a future talent pipeline", icon: Layers },
  { title: "Structured Learning", desc: "Structured learning and development framework", icon: BookOpen },
  { title: "Retention", desc: "Enhanced employee retention and engagement", icon: UserCheck },
  { title: "Compliance", desc: "Compliance-driven workforce management", icon: ShieldCheck },
  { title: "National Mission", desc: "Contribution to India's Skill Development Mission", icon: Award },
];

const APPRENTICESHIP_BENEFITS_APPRENTICE = [
  { title: "Hands-on Experience", desc: "Hands-on industry experience", icon: Briefcase },
  { title: "Practical Skills", desc: "Practical skill development", icon: Zap },
  { title: "Work Environment", desc: "Exposure to real work environments", icon: MapPin },
  { title: "Career Readiness", desc: "Improved employability and career readiness", icon: TrendingUp },
  { title: "Professional Growth", desc: "Professional growth opportunities", icon: Award },
];

const NATS_BENEFITS = [
  { title: "Technically Qualified Talent", desc: "Access to technically qualified talent", icon: UserCheck },
  { title: "Job-Ready Professionals", desc: "Development of job-ready professionals", icon: Settings },
  { title: "Reduced Costs", desc: "Reduced hiring and training costs", icon: BarChart3 },
  { title: "Workforce Capability", desc: "Improved workforce capability", icon: Award },
  { title: "Talent Strategy", desc: "Strengthened talent acquisition strategy", icon: ClipboardCheck },
  { title: "Long-term Planning", desc: "Long-term workforce planning support", icon: TrendingUp },
];

const NAPS_BENEFITS = [
  { title: "Entry-level Manpower", desc: "Access to entry-level skilled manpower", icon: Users },
  { title: "Tailored Workforce", desc: "Development of workforce according to business needs", icon: TrendingUp },
  { title: "Reduced Training Costs", desc: "Reduced operational training costs", icon: Zap },
  { title: "Enhanced Productivity", desc: "Enhanced productivity and efficiency", icon: ShieldCheck },
  { title: "Sustainable Pipeline", desc: "Sustainable talent pipeline creation", icon: GraduationCap },
  { title: "Business Growth Support", desc: "Support for long-term business growth", icon: Layers },
];

const END_TO_END_SERVICES = [
  { title: "Apprentice Sourcing & Mobilization", desc: "Talent Acquisition", icon: Search },
  { title: "Candidate Screening & Assessment", desc: "Talent Acquisition", icon: ClipboardCheck },
  { title: "Recruitment Support", desc: "Talent Acquisition", icon: UserCheck },
  { title: "NAPS & NATS Registration Assistance", desc: "Program Administration", icon: FileText },
  { title: "Apprentice Onboarding", desc: "Program Administration", icon: MapPin },
  { title: "Deployment Management", desc: "Program Administration", icon: Briefcase },
  { title: "Documentation Management", desc: "Compliance & Operations", icon: FileText },
  { title: "Attendance Monitoring", desc: "Compliance & Operations", icon: Clock },
  { title: "Payroll & Stipend Administration", desc: "Compliance & Operations", icon: FileSpreadsheet },
  { title: "Compliance Management", desc: "Compliance & Operations", icon: ShieldCheck },
  { title: "Performance Tracking", desc: "Reporting & Support", icon: BarChart3 },
  { title: "MIS Reporting", desc: "Reporting & Support", icon: FileText },
  { title: "Client Coordination", desc: "Reporting & Support", icon: Headphones },
  { title: "Dedicated Account Management", desc: "Reporting & Support", icon: Settings },
];

const OUR_STRENGTHS = [
  { id: "01", title: "End-to-End Management", desc: "End-to-End Apprenticeship Management" },
  { id: "02", title: "NAPS & NATS Expertise", desc: "Expertise in NAPS & NATS Programs" },
  { id: "03", title: "PAN India Talent", desc: "PAN India Talent Network" },
  { id: "04", title: "Compliance Support", desc: "Compliance & Documentation Support" },
  { id: "05", title: "Faster Hiring", desc: "Faster Hiring and Deployment" },
  { id: "06", title: "Dedicated Management", desc: "Dedicated Relationship Management" },
  { id: "07", title: "Scalable Solutions", desc: "Scalable Workforce Solutions" },
  { id: "08", title: "Tech-Driven Processes", desc: "Technology-Driven Processes" },
];

const PROCESS_STEPS = [
  { title: "Requirement Analysis", desc: "Understand organization size, operations, and compliance targets." },
  { title: "Candidate Sourcing", desc: "Advertise, recruit, and pool target apprentices from ITIs/colleges." },
  { title: "Screening & Selection", desc: "Rigorous testing and interviews mapped to job roles." },
  { title: "Registration & Doc", desc: "Generate contracts on government portals (NAPS/NATS)." },
  { title: "Onboarding", desc: "Initial orientation, policy handbook alignment, and local registration." },
  { title: "Deployment", desc: "Structured on-the-job training begins in client facilities." },
  { title: "Compliance Mgmt", desc: "Real-time updates, stipend processing, and periodic claims filing." },
  { title: "Reporting & Support", desc: "Monthly MIS dashboard, performance sheets, and dedicated audits." },
];

const STATS_SECTION = [
  { value: 5000, suffix: "+", label: "Apprentices Managed" },
  { value: 100, suffix: "+", label: "Corporate Clients" },
  { value: 25, suffix: "+", label: "Industry Verticals" },
  { value: 28, suffix: "", label: "States Active (PAN India)" },
];

const FAQS = [
  {
    q: "What is NAPS?",
    a: "The National Apprenticeship Promotion Scheme (NAPS) is a Government of India initiative launched in 2016 to promote apprenticeship training. It offers financial incentives to employers by sharing the cost of basic training and stipend (up to ₹1,500 per month per apprentice) to foster skill development.",
  },
  {
    q: "What is NATS?",
    a: "The National Apprenticeship Training Scheme (NATS) is a one-year program equipping technically qualified youth (graduates, diploma holders, and general streams) with practical industry knowledge. Administered by the Ministry of Education's Board of Apprenticeship Training (BOAT), NATS helps bridge the skill gap in technical domains.",
  },
  {
    q: "Who can participate?",
    a: "Organizations with 30 or more employees (including contract workers) are legally mandated to engage apprentices (between 2.5% to 15% of their total workforce). Candidates between 14-35 years of age possessing educational qualifications ranging from Class 5th to engineering degrees are eligible to join as apprentices.",
  },
  {
    q: "What are the primary benefits for employers?",
    a: "Employers get access to subsidized, energetic talent trained on their specific operational workflows. Apprenticeship schemes are exempt from EPF, ESI, and other labour law liabilities, drastically reducing overhead recruitment costs. Additionally, it creates a reliable internal pipeline for permanent hiring.",
  },
  {
    q: "How does LEGPRO Services support implementation?",
    a: "LEGPRO Services acts as your end-to-end Third-Party Aggregator (TPA). We manage candidate sourcing, screening, government portal registrations, contracts, monthly stipend payroll, compliance documentation, monthly MIS reports, and the recovery of government claim subsidies.",
  },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function NapsNatsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // For Process Timeline
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far down the timeline section we are
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const totalHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (totalHeight + viewportHeight * 0.5)));
        const step = Math.floor(progress * PROCESS_STEPS.length);
        setActiveTimelineStep(Math.min(PROCESS_STEPS.length - 1, Math.max(0, step)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white text-slate-800 selection:bg-[#0A66C2] selection:text-white">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF7A00] origin-left z-[110]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32 border-b border-slate-100">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#0A66C2]/20 to-transparent blur-3xl animate-pulse duration-10000" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#FF7A00]/10 to-transparent blur-3xl animate-pulse duration-7000" />
        </div>

        {/* Floating Particles Simulation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#0A66C2" : "#FF7A00",
                opacity: 0.12,
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                left: \`\${Math.random() * 90}%\`,
                top: \`\${Math.random() * 90}%\`,
              }}
              animate={{
                y: [0, Math.random() * -50 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side texts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0A66C2]/20 bg-[#0A66C2]/5 px-4 py-1.5 text-sm font-semibold text-[#0A66C2]">
                <GraduationCap className="h-4 w-4 text-[#FF7A00]" />
                <span>NAPS & NATS Solutions</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                Apprenticeship Solutions <br className="hidden lg:inline" />
                <span className="text-[#0A66C2]">(NAPS</span> & <span className="text-[#FF7A00]">NATS)</span>
              </h1>

              <p className="text-xl leading-relaxed text-slate-600 max-w-xl font-medium">
                Empowering Organizations Through Skilled Workforce Development
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#0A66C2]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-[#0A66C2]/35 active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition-all duration-300 hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/5 hover:scale-[1.03] active:scale-95"
                >
                  <span>Schedule a Consultation</span>
                </Link>
              </div>
            </motion.div>

            {/* Right side interactive graphic & floating stats grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Glow / Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A66C2]/10 to-[#FF7A00]/10 rounded-[32px] blur-2xl z-0" />
              
              <div className="relative z-10 grid grid-cols-2 gap-4 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-slate-200/60 shadow-xl">
                {HERO_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    className="flex flex-col justify-center items-center text-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:border-[#0A66C2]/25"
                  >
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A66C2] group-hover:text-[#FF7A00] transition-colors">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider leading-snug">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}

                {/* Floating graphic overlay: government logo badges / workforce concept */}
                <div className="col-span-2 mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#FF7A00]" />
                    <span>Apprenticeship Act Compliant</span>
                  </div>
                  <span>Ministry of Skill & Education</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT APPRENTICESHIP SOLUTIONS */}
      <section className="relative py-20 lg:py-32 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Image slide-in */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            >
              <Image
                src="/service-naps.png"
                alt="Apprenticeship Solutions Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-[#FF7A00] tracking-widest">Empowering Youth</span>
                <h4 className="text-xl font-bold mt-1">Structured Skill Training under NAPS & NATS</h4>
              </div>
            </motion.div>

            {/* Right Content fade-in */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-[#0A66C2]">Who We Are</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                Empowering Organizations Through <br className="hidden sm:inline" />
                <span className="text-[#FF7A00]">Skilled</span> <span className="text-[#0A66C2]">Workforce Development</span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                At LEGPRO Services, we believe that a skilled workforce is the foundation of sustainable business growth. Our Apprenticeship Solutions are designed to help organizations build, train, and retain industry-ready talent through structured learning and practical workplace exposure.
              </p>

              <p className="text-slate-500 leading-relaxed">
                Through the National Apprenticeship Promotion Scheme (NAPS) and the National Apprenticeship Training Scheme (NATS), we enable organizations to bridge skill gaps, enhance workforce productivity, and create a reliable talent pipeline tailored to their business requirements.
              </p>

              <p className="text-slate-500 leading-relaxed">
                Our end-to-end apprenticeship management services cover talent sourcing, onboarding, documentation, compliance management, payroll administration, and program execution, ensuring a seamless experience for both employers and apprentices.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. WHY APPRENTICESHIP PROGRAMS? */}
      <section className="relative py-20 lg:py-32 bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Workforce Development</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              Why Apprenticeship Programs?
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Apprenticeship programs provide organizations with an effective workforce development model that combines practical training with real-world industry experience. These programs allow businesses to develop talent according to operational needs while providing aspiring professionals with valuable career-building opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="text-[#0A66C2]" /> Key Benefits for Employers
              </h3>
              <ul className="space-y-4">
                {APPRENTICESHIP_BENEFITS_EMPLOYER.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#0A66C2] shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-[#FF7A00]" /> Benefits for Apprentices
              </h3>
              <ul className="space-y-4">
                {APPRENTICESHIP_BENEFITS_APPRENTICE.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#FF7A00] shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. NATS SECTION */}
      <section className="relative py-20 lg:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0A66C2]">Technical Scheme</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              National Apprenticeship Training Scheme (NATS)
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The National Apprenticeship Training Scheme (NATS) is a Government of India initiative aimed at enhancing the employability of technically qualified youth by providing practical industry training.
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed">
              The scheme enables organizations to engage and train Graduate, Diploma, and Degree holders through structured on-the-job learning, helping them acquire industry-relevant skills and professional experience.
            </p>
          </div>

          {/* Background and Eligibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Background</h4>
              <p className="text-slate-600 leading-relaxed">Implemented under the provisions of the Apprentices Act, 1961, NATS promotes workplace-based learning as one of the most effective methods for developing skilled manpower. The scheme helps organizations train future professionals without investing heavily in additional training infrastructure.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Eligibility</h4>
              <p className="text-slate-600 mb-3">NATS is applicable for:</p>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#FF7A00]" /> Graduate Candidates</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#FF7A00]" /> Diploma Holders</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#FF7A00]" /> Engineering Graduates</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#FF7A00]" /> Technical Degree Holders</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#FF7A00]" /> Professional Degree Holders</li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Benefits for Organizations</h3>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {NATS_BENEFITS.map((benefit, index) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 hover:border-[#FF7A00]/30"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. NAPS SECTION */}
      <section className="relative py-20 lg:py-32 bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Government Initiative</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              National Apprenticeship Promotion Scheme (NAPS)
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The National Apprenticeship Promotion Scheme (NAPS) is a flagship skill development initiative of the Government of India that promotes apprenticeship training across industries.
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed">
              The scheme encourages organizations to engage apprentices and provide practical workplace training, enabling candidates to acquire industry-specific skills while contributing to organizational productivity and growth.
            </p>
          </div>

          {/* Background and Eligibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Background</h4>
              <p className="text-slate-600 leading-relaxed">Established under the Apprentices Act, 1961, NAPS aims to create a skilled workforce through structured training and hands-on learning. The program offers organizations an efficient and cost-effective approach to workforce development while supporting national skill enhancement objectives.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Eligibility</h4>
              <p className="text-slate-600 mb-3">NAPS is applicable for candidates with qualifications ranging from:</p>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> 5th Pass and Above</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> 8th Pass</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> 10th Pass</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> 12th Pass</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> ITI Qualified Candidates</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-[#0A66C2]" /> Vocational Training Candidates</li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Benefits for Organizations</h3>
          </div>

          {/* Staggered Benefits Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {NAPS_BENEFITS.map((benefit, index) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#0A66C2]/20"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A66C2]/5 text-[#0A66C2] transition-colors group-hover:bg-[#0A66C2] group-hover:text-white">
                    <IconComp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A66C2] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. OUR APPRENTICESHIP MANAGEMENT SERVICES SECTION */}
      <section className="relative py-20 lg:py-32 bg-slate-900 text-white overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#0A66C2]/15 blur-[120px] pointer-events-none" />

        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF7A00]">What We Do</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 uppercase tracking-tight">
              Our Apprenticeship Management Services
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] mx-auto" />
            <p className="mt-6 text-lg text-slate-400">
              LEGPRO Services provides comprehensive support throughout the apprenticeship lifecycle:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
            {END_TO_END_SERVICES.map((srv, index) => {
              const IconComp = srv.icon;
              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-850 hover:border-[#0A66C2] hover:shadow-2xl hover:shadow-[#0A66C2]/10 transition-all duration-300"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/60 text-[#FF7A00] group-hover:text-[#0A66C2] transition-colors">
                    <IconComp className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[360deg]" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#0A66C2] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-slate-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                    {srv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 7. WHY CHOOSE LEGPRO SERVICES */}
      <section className="relative py-20 lg:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0A66C2]">Our Edge</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              Why Choose LEGPRO Services?
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              LEGPRO Services combines industry expertise, workforce management capabilities, and compliance-driven processes to deliver effective apprenticeship solutions for organizations across sectors.
            </p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Our Strengths</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {OUR_STRENGTHS.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group flex flex-col bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-[#FF7A00]/25 transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A00]/10 text-[#FF7A00]">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0A66C2] transition-colors leading-snug">
                    {feat.desc}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. PROCESS TIMELINE */}
      <section ref={timelineRef} className="relative py-20 lg:py-32 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">How We Work</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              Apprenticeship Process Timeline
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] mx-auto" />
            <p className="mt-6 text-slate-500">
              A structured 8-step journey ensuring swift deployments and continuous compliance support. Scroll down to see progress.
            </p>
          </div>

          {/* Interactive Desktop Timeline Grid */}
          <div className="relative mt-12 hidden lg:block">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-slate-200" />
            {/* Animated Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 bg-[#0A66C2]"
              style={{
                width: \`\${((activeTimelineStep + 1) / PROCESS_STEPS.length) * 100}%\`,
                transition: "width 0.4s ease-out",
              }}
            />

            <div className="grid grid-cols-8 gap-2 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx <= activeTimelineStep;
                const isCurrent = idx === activeTimelineStep;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center px-2">
                    <button
                      onClick={() => setActiveTimelineStep(idx)}
                      className={\`flex h-12 w-12 items-center justify-center rounded-full font-bold text-sm border-4 transition-all duration-300 \${
                        isCurrent
                          ? "bg-white border-[#FF7A00] text-[#FF7A00] scale-110 shadow-md"
                          : isActive
                          ? "bg-[#0A66C2] border-[#0A66C2] text-white"
                          : "bg-white border-slate-350 text-slate-400"
                      }\`}
                    >
                      {idx + 1}
                    </button>
                    <h4 className={\`mt-4 font-bold text-xs \${isActive ? "text-slate-950 font-black" : "text-slate-500"}\`}>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-400 line-clamp-3">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Mobile Timeline Layout */}
          <div className="relative mt-8 space-y-8 lg:hidden pl-8">
            <div className="absolute top-0 bottom-0 left-[15px] w-1 bg-slate-200" />
            <div
              className="absolute top-0 left-[15px] w-1 bg-[#0A66C2] transition-all duration-500"
              style={{
                height: \`\${((activeTimelineStep + 1) / PROCESS_STEPS.length) * 100}%\`,
              }}
            />

            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx <= activeTimelineStep;
              const isCurrent = idx === activeTimelineStep;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveTimelineStep(idx)}
                  className="relative flex flex-col cursor-pointer"
                >
                  <div
                    className={\`absolute left-[-29px] top-0 flex h-7 w-7 items-center justify-center rounded-full font-bold text-xs border-2 transition-all \${
                      isCurrent
                        ? "bg-white border-[#FF7A00] text-[#FF7A00] scale-105"
                        : isActive
                        ? "bg-[#0A66C2] border-[#0A66C2] text-white"
                        : "bg-white border-slate-300 text-slate-400"
                    }\`}
                  >
                    {idx + 1}
                  </div>
                  <h4 className={\`font-bold \${isActive ? "text-slate-950" : "text-slate-500"}\`}>{step.title}</h4>
                  <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 9. STATISTICS SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-[#0A66C2] to-blue-800 text-white overflow-hidden">
        {/* Animated Background pulse effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-900 opacity-80" />
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS_SECTION.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 border-r last:border-0 border-white/10"
              >
                <p className="font-display text-5xl font-black tracking-tight text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="relative py-20 lg:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0A66C2]">Have Questions?</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between bg-slate-50 p-6 text-left hover:bg-slate-100/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#FF7A00]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-6 border-t border-slate-150 text-slate-600 text-sm leading-relaxed bg-white">
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

      {/* 11. FINAL CTA SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-900 text-white">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-[#0A66C2]/40 opacity-90 z-0" />

        <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF7A00]">Get Started Today</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Build a Future-Ready Workforce with LEGPRO Services
            </h2>
            <p className="text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
              Whether you are looking to develop entry-level talent through NAPS or engage technically qualified professionals through NATS, LEGPRO Services provides the expertise, resources, and support needed to implement successful apprenticeship programs.
            </p>
            <p className="text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed mt-2">
              Partner with LEGPRO Services to create a skilled, productive, and future-ready workforce through structured apprenticeship solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Primary button with custom pulse ring animation */}
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-8 py-4 font-bold text-white transition-transform hover:scale-[1.03] active:scale-95 group overflow-hidden shadow-lg shadow-[#0A66C2]/20"
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Contact Us</span>
              <PhoneCall className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/40 backdrop-blur-sm px-8 py-4 font-bold text-slate-200 transition-all hover:bg-slate-800 hover:border-slate-650 hover:scale-[1.03] active:scale-95"
            >
              <span>Request a Callback</span>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'apps/web/src/app/(marketing)/naps-nats/NapsNatsClient.tsx'), fileContent);
console.log('Successfully updated NapsNatsClient.tsx');
