"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Users,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Handshake,
  Scale,
  HardHat,
  Flame,
  UtensilsCrossed,
  Stethoscope,
  Truck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Briefcase,
  Award,
  Search,
  Building2,
  Clock,
  UserCheck,
  Compass,
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { getWhatsAppUrl } from "@/lib/content";

// ----------------------------------------------------------------------
// DATA SETS
// ----------------------------------------------------------------------

const SERVICES = [
  {
    id: "global-talent-sourcing",
    number: "01",
    title: "Global Talent Sourcing",
    tag: "Worldwide Reach",
    desc: "We identify and attract qualified professionals from diverse international talent pools based on your specific business requirements.",
    icon: Globe,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-400",
    bulletPoints: [
      "Access to multi-country candidate networks",
      "Specialized niche talent discovery",
      "Proactive pipeline development",
    ],
  },
  {
    id: "skilled-professional-hiring",
    number: "02",
    title: "Skilled & Professional Hiring",
    tag: "Multi-Level Expertise",
    desc: "From skilled workers and technicians to executives and specialized professionals, we support recruitment across multiple industries and job levels.",
    icon: Users,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-[#FF7A00]",
    borderHover: "hover:border-orange-400",
    bulletPoints: [
      "Technical trades and certified specialists",
      "Middle-management & senior leadership",
      "Custom role benchmarking",
    ],
  },
  {
    id: "end-to-end-support",
    number: "03",
    title: "End-to-End Recruitment Support",
    tag: "Seamless Coordination",
    desc: "Our team manages the recruitment journey from candidate sourcing and screening to interview coordination, selection, documentation, and onboarding support.",
    icon: FileText,
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-400",
    bulletPoints: [
      "Dedicated account managers",
      "Candidate journey tracking",
      "Cross-border communication ease",
    ],
  },
  {
    id: "screening-verification",
    number: "04",
    title: "Candidate Screening & Verification",
    tag: "High Authenticity",
    desc: "We conduct structured screening and verification processes to help employers hire reliable, qualified, and job-ready candidates.",
    icon: CheckCircle2,
    color: "from-purple-500/10 to-indigo-500/10",
    iconColor: "text-purple-600",
    borderHover: "hover:border-purple-400",
    bulletPoints: [
      "Comprehensive credential validation",
      "Skill & language competency checks",
      "Background & reference assessments",
    ],
  },
  {
    id: "employer-candidate-coordination",
    number: "05",
    title: "Employer–Candidate Coordination",
    tag: "Cultural Harmony",
    desc: "We facilitate clear communication between international employers and candidates, helping create a seamless hiring experience.",
    icon: Handshake,
    color: "from-sky-500/10 to-cyan-500/10",
    iconColor: "text-sky-600",
    borderHover: "hover:border-sky-400",
    bulletPoints: [
      "Multi-timezone interview arrangements",
      "Expectation & compensation alignment",
      "Cultural pre-briefing for hires",
    ],
  },
  {
    id: "compliance-focused",
    number: "06",
    title: "Compliance-Focused Recruitment",
    tag: "Legal Assurance",
    desc: "We follow applicable recruitment practices and documentation requirements to support transparent and responsible international hiring.",
    icon: Scale,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-600",
    borderHover: "hover:border-rose-400",
    bulletPoints: [
      "Statutory emigration guidelines",
      "Consulate attestation guidance",
      "Fair & transparent labour practices",
    ],
  },
];

const INDUSTRIES = [
  {
    name: "Construction & Infrastructure",
    icon: HardHat,
    desc: "Civil engineers, project managers, surveyors, and skilled heavy-equipment operators.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    name: "Oil & Gas",
    icon: Flame,
    desc: "Petroleum specialists, offshore technicians, piping inspectors, and safety supervisors.",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    name: "Hospitality & Tourism",
    icon: UtensilsCrossed,
    desc: "Executive chefs, hotel managers, F&B leads, and multilingual guest service professionals.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    desc: "Registered nurses, medical technologists, hospital support staff, and healthcare specialists.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    name: "Logistics & Supply Chain",
    icon: Truck,
    desc: "Warehouse controllers, fleet logistics coordinators, freight planners, and supply chain analysts.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    name: "Other Specialized Industries",
    icon: Sparkles,
    desc: "Renewable energy, aviation ground staff, telecommunications, and high-tech manufacturing.",
    color: "bg-sky-50 text-sky-600 border-sky-100",
  },
];

const RECRUITMENT_PROCESS = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "In-depth consultation to map position specifications, required credentials, cultural expectations, and relocation frameworks.",
    badge: "Discovery",
  },
  {
    step: "02",
    title: "Talent Sourcing",
    desc: "Active outreach across global candidate pools, targeted overseas campaigns, and our pre-qualified international talent networks.",
    badge: "Sourcing",
  },
  {
    step: "03",
    title: "Screening & Shortlisting",
    desc: "Multi-layered technical appraisals, credential verifications, language proficiency checks, and structured background checks.",
    badge: "Evaluation",
  },
  {
    step: "04",
    title: "Interviews",
    desc: "Coordinated cross-timezone video or face-to-face evaluation panels with structured feedback and client consultation.",
    badge: "Interviewing",
  },
  {
    step: "05",
    title: "Selection",
    desc: "Formal selection, transparent contract alignment, offer negotiation, and mutual agreement between client and candidate.",
    badge: "Offer & Sign",
  },
  {
    step: "06",
    title: "Documentation",
    desc: "Assisting with embassy attestation, work permits, visa documentation, medical tests, and compliance clearances.",
    badge: "Compliance",
  },
  {
    step: "07",
    title: "Deployment & Onboarding",
    desc: "Travel scheduling, pre-departure cultural orientation, arrival coordination, and post-placement check-ins.",
    badge: "Deployment",
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    title: "Access to Diverse Global Talent Pools",
    desc: "Extensive talent reach spanning continents, connecting you directly to pre-vetted skilled candidates across international markets.",
    icon: Globe,
  },
  {
    title: "Industry-Specific Recruitment Expertise",
    desc: "Vertical specialists with deep domain understanding of manufacturing, engineering, oil & gas, healthcare, and technology roles.",
    icon: Briefcase,
  },
  {
    title: "Thorough Candidate Screening",
    desc: "Multi-tiered evaluation validating verified work history, technical competence, and behavioral alignment before presentation.",
    icon: ShieldCheck,
  },
  {
    title: "Faster and Structured Hiring Process",
    desc: "Agile, well-defined workflows and rapid sourcing pipelines that significantly reduce overseas time-to-hire.",
    icon: Clock,
  },
  {
    title: "Dedicated Recruitment Support",
    desc: "A single point of contact (SPOC) managing employer liaison, candidate updates, and end-to-end milestone tracking.",
    icon: UserCheck,
  },
  {
    title: "Transparent Communication",
    desc: "Clear visibility into every candidate pipeline stage with weekly progress reports and straightforward expectations.",
    icon: Handshake,
  },
  {
    title: "Focus on Quality, Compliance, and Long-Term Placements",
    desc: "Strict adherence to statutory emigration laws, visa protocols, and candidates invested in long-term mutual organizational success.",
    icon: Award,
  },
];

// ----------------------------------------------------------------------
// CANVAS AI MESH NETWORK COMPONENT
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

    const colors = ["#0A66C2", "#FF7A00", "#0284c7", "#ea580c"];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 13000), 75);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.16;
            ctx.strokeStyle = `rgba(10, 102, 194, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse pointer
        if (mouseRef.current.active) {
          const mDist = Math.hypot(p1.x - mouseRef.current.x, p1.y - mouseRef.current.y);
          if (mDist < 160) {
            const alpha = (1 - mDist / 160) * 0.35;
            ctx.strokeStyle = `rgba(255, 122, 0, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions with border bouncing
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
// MAIN EXPORTED CLIENT COMPONENT
// ----------------------------------------------------------------------
export default function InternationalRecruitmentClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white">
      {/* Scroll Progress Indicator in Brand Orange */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A66C2] via-[#FF7A00] to-[#0A66C2] z-50 origin-left shadow-sm"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-10 lg:pt-16 lg:pb-14 border-b border-slate-100 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40">
        {/* Particle Canvas Mesh */}
        <AiMeshNetwork />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-400/10 via-[#FF7A00]/10 to-sky-400/10 blur-3xl pointer-events-none rounded-full" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading & Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0A66C2]/20 bg-blue-50/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0A66C2] shadow-sm backdrop-blur-sm">
                <Globe className="h-4 w-4 text-[#FF7A00] animate-spin" style={{ animationDuration: "14s" }} />
                <span>🌍 International Recruitment Solutions</span>
              </div>

              {/* Main Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                International <br />
                <TypewriterText
                  text="Recruitment"
                  className="bg-gradient-to-r from-[#0A66C2] via-blue-600 to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              {/* Subtitle */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Connecting Global Talent with Global Opportunities
              </h2>

              {/* Lead Introduction Content */}
              <div className="space-y-4 text-slate-600 font-medium text-base sm:text-lg leading-relaxed">
                <p>
                  At <strong className="text-slate-800 font-semibold">LegPro Consultants</strong>, we provide end-to-end international recruitment solutions that help organizations access skilled and qualified talent across global markets. We connect the right people with the right opportunities while ensuring a smooth, compliant, and efficient recruitment process.
                </p>
                <p className="text-slate-500 text-sm sm:text-base">
                  Whether scaling operations overseas, staffing cross-border infrastructure, or hiring niche executives, our global network delivers proven reliability from talent mapping to international deployment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] hover:bg-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#services-overview"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              </div>

              {/* Stat Highlights Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-2xl font-black text-slate-900">50+</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Global Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#FF7A00]">100%</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliant</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A66C2]">6+</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industries</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-square max-w-md mx-auto group">
                <Image
                  src="/service-international.png"
                  alt="LegPro Consultants International Recruitment"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] shrink-0">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Global Talent Network</h4>
                      <p className="text-xs text-slate-500 font-medium">Cross-border hiring with total compliance</p>
                    </div>
                  </div>
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 right-4 bg-[#FF7A00] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  <span>Active Placements</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 2. OUR INTERNATIONAL RECRUITMENT SERVICES */}
      {/* ================================================================= */}
      <section id="services-overview" className="py-10 lg:py-14 relative bg-white border-b border-slate-100">
        <Container>
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            <span className="text-[#FF7A00] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              Our Core Expertise
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Our International Recruitment Services
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] rounded-full mx-auto" />
            <p className="mt-6 text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              We engineer specialized cross-border recruitment solutions designed to meet stringent global hiring standards, timelines, and statutory regulations.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {SERVICES.map((s, idx) => {
              const IconComponent = s.icon;
              return (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`group relative flex flex-col justify-between bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${s.borderHover}`}
                >
                  <div>
                    {/* Top Row: Icon + Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} border border-slate-100 flex items-center justify-center ${s.iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="text-3xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                        {s.number}
                      </span>
                    </div>

                    {/* Tag Badge */}
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3">
                      {s.tag}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-left group-hover:text-[#0A66C2] transition-colors">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed text-left mb-6 font-medium">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <div className="pt-4 border-t border-slate-100 space-y-2 text-left">
                    {s.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Check className="h-3.5 w-3.5 text-[#0A66C2] shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 3. INDUSTRIES WE SERVE */}
      {/* ================================================================= */}
      <section id="industries" className="py-10 lg:py-14 relative bg-slate-50 border-b border-slate-100">
        <Container>
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            <span className="text-[#0A66C2] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              Domain Specialization
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Industries We Serve
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] rounded-full mx-auto" />
            <p className="mt-6 text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              We supply specialized talent across a comprehensive range of critical global industries with customized competency screening.
            </p>
          </div>

          {/* 6 Industries Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {INDUSTRIES.map((ind, i) => {
              const IconComp = ind.icon;
              const isActive = activeIndustry === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onMouseEnter={() => setActiveIndustry(i)}
                  onMouseLeave={() => setActiveIndustry(null)}
                  className={`group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer ${
                    isActive ? "border-[#0A66C2] ring-2 ring-[#0A66C2]/10" : ""
                  }`}
                >
                  <div>
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${ind.color}`}>
                      <IconComp className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-[#0A66C2] transition-colors leading-snug">
                      {ind.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0A66C2]">
                    <span>Inquire Roles</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 4. OUR RECRUITMENT PROCESS (ROADMAP) */}
      {/* ================================================================= */}
      <section id="process" className="py-10 lg:py-14 relative bg-white border-b border-slate-100">
        <Container>
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            <span className="text-[#FF7A00] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              Structured Roadmap
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Our Recruitment Process
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] rounded-full mx-auto" />
            <p className="mt-6 text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              From requirement analysis to deployment and onboarding, our 7-step process ensures transparency, speed, and regulatory compliance.
            </p>
          </div>

          {/* Process Flow Roadmap */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline center line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-[#0A66C2] via-[#FF7A00] to-[#0A66C2] -translate-x-1/2 rounded-full opacity-30" />

            <div className="space-y-8 relative">
              {RECRUITMENT_PROCESS.map((p, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={p.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className={`relative flex flex-col lg:flex-row items-center ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8`}
                  >
                    {/* Content Box */}
                    <div className="w-full lg:w-1/2">
                      <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left ${
                        isEven ? "lg:text-right" : "lg:text-left"
                      }`}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0A66C2] mb-3 ${
                          isEven ? "lg:ml-auto" : ""
                        }`}>
                          <span>Phase {p.step}</span>
                          <span>•</span>
                          <span>{p.badge}</span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-2">
                          {p.title}
                        </h3>

                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {p.desc}
                        </p>
                      </div>
                    </div>

                    {/* Step Icon / Dot in Center */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#FF7A00] text-white font-black text-base shadow-lg shadow-blue-500/20 shrink-0 border-4 border-white">
                      {p.step}
                    </div>

                    {/* Empty spacer on opposite side for desktop */}
                    <div className="hidden lg:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Flow Summary Chips */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center max-w-4xl mx-auto">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Recruitment Workflow Pipeline
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-700">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Requirement Analysis</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Talent Sourcing</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Screening & Shortlisting</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Interviews</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Selection</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800">Documentation</span>
              <span className="text-[#FF7A00]">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0A66C2] to-blue-600 text-white shadow-sm">
                Deployment & Onboarding
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 5. WHY CHOOSE LEGPRO FOR INTERNATIONAL RECRUITMENT? */}
      {/* ================================================================= */}
      <section id="why-choose" className="py-10 lg:py-14 relative bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start max-w-7xl mx-auto">
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-5 space-y-6 text-left lg:sticky lg:top-28">
              <span className="text-[#0A66C2] text-xs sm:text-sm font-extrabold uppercase tracking-widest block">
                The LegPro Advantage
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Why Choose LegPro for International Recruitment?
              </h2>
              <div className="mt-4 h-1.5 w-20 bg-[#FF7A00] rounded-full" />

              <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed pt-2">
                Cross-border recruitment requires more than resumes—it demands verified compliance, cultural compatibility, and rigorous vetting. LegPro delivers the infrastructure and accountability global employers depend on.
              </p>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-bold">
                  <ShieldCheck className="h-6 w-6 text-[#0A66C2]" />
                  <span>Legally Protected & Verified</span>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Every candidate profile undergoes extensive credential verification, reference checks, and alignment with country-specific employment acts.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] hover:bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:scale-105"
                >
                  <span>Request International Talent</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: 7 Value Pillars */}
            <div className="lg:col-span-7 space-y-4">
              {WHY_CHOOSE_ITEMS.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#0A66C2]/40 transition-all duration-300 text-left flex items-start gap-4"
                  >
                    <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A66C2] shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A66C2] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
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

      {/* ================================================================= */}
      {/* 6. CALL TO ACTION: BUILD YOUR GLOBAL WORKFORCE WITH US */}
      {/* ================================================================= */}
      <section id="contact-cta" className="py-10 lg:py-14 bg-[#0A66C2] text-white relative overflow-hidden">
        {/* Subtle Radial Highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FF7A00]/20 blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF7A00] border border-white/15">
                <Globe className="h-4 w-4" />
                <span>Global Partnership</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
                Build Your Global <br />
                Workforce With Us
              </h2>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed font-medium text-justify">
                Whether you are an international employer looking for skilled talent or a professional seeking global career opportunities, <strong className="text-white">LegPro Consultants</strong> helps make international recruitment simpler, faster, and more reliable.
              </p>

              <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-2">
                <h3 className="text-lg font-black text-white">
                  Looking to hire international talent?
                </h3>
                <p className="text-blue-100 text-sm">
                  Connect with our recruitment team today for immediate candidate availability, country-specific consultation, and deployment estimates.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Cards & Quick Direct Channels */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl space-y-6 text-left border border-white/20">
                <h3 className="text-2xl font-black text-slate-900">
                  Ready to start hiring globally?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Speak directly with our senior international staffing consultants or request a swift callback.
                </p>

                <div className="space-y-4">
                  {/* Connect Button */}
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] hover:bg-blue-700 text-white font-bold py-4 text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Request Callback / Inquire Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Direct Phone & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <a
                      href="tel:7303086551"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 text-xs transition-colors"
                    >
                      <Phone className="h-4 w-4 text-[#0A66C2]" />
                      <span>+91 73030 86551</span>
                    </a>

                    <a
                      href={getWhatsAppUrl("Hi LegPro team, I would like to inquire about International Recruitment services.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-3 px-4 text-xs transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 text-[#25d366]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Email address */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-4 w-4 text-[#0A66C2]" />
                  <span>Email: </span>
                  <a href="mailto:Himanshu@legpro.co.in" className="font-bold text-slate-800 hover:text-[#0A66C2] transition-colors">
                    Himanshu@legpro.co.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
