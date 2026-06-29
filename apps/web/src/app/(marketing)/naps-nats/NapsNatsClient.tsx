"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Check,
  UserCheck,
  Zap,
  BookOpen
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

// ----------------------------------------------------------------------
// DATA SETS
// ----------------------------------------------------------------------

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

// Static particle presets to avoid SSR/hydration mismatch with Math.random()
const PARTICLE_PRESETS = [
  { width: 22, height: 22, left: "15%", top: "25%", xAnim: 15, yAnim: -40, duration: 12 },
  { width: 14, height: 14, left: "75%", top: "15%", xAnim: -20, yAnim: -30, duration: 15 },
  { width: 28, height: 28, left: "45%", top: "60%", xAnim: 25, yAnim: -50, duration: 18 },
  { width: 12, height: 12, left: "10%", top: "80%", xAnim: 10, yAnim: -20, duration: 10 },
  { width: 24, height: 24, left: "80%", top: "70%", xAnim: -15, yAnim: -45, duration: 16 },
  { width: 18, height: 18, left: "60%", top: "40%", xAnim: 20, yAnim: -35, duration: 14 },
];

export default function NapsNatsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="relative bg-white text-slate-800 selection:bg-[#0A66C2] selection:text-white">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF7A00] origin-left z-[110]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 py-8 lg:py-12 border-b border-slate-100">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#0A66C2]/20 to-transparent blur-3xl animate-pulse duration-10000" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#FF7A00]/10 to-transparent blur-3xl animate-pulse duration-7000" />
        </div>

        {/* Floating Particles Simulation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {PARTICLE_PRESETS.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#0A66C2" : "#FF7A00",
                opacity: 0.12,
                width: p.width,
                height: p.height,
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, p.yAnim, 0],
                x: [0, p.xAnim, 0],
              }}
              transition={{
                duration: p.duration,
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
                <TypewriterText
                  text="(NAPS & NATS)"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <p className="text-xl leading-relaxed text-slate-600 max-w-xl font-medium">
                Empowering Organizations Through Skilled Workforce Development
              </p>
            </motion.div>

            {/* Right side logos display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Glow / Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A66C2]/10 to-[#FF7A00]/10 rounded-[32px] blur-2xl z-0" />
              
              <div className="relative z-10 flex flex-col gap-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-slate-200/60 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:border-[#0A66C2]/20">
                    <div className="relative w-full aspect-square max-h-[140px]">
                      <Image
                        src="/logo-naps.png"
                        alt="NAPS Logo"
                        fill
                        sizes="(max-width: 768px) 50vw, 150px"
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-600 tracking-wide uppercase">NAPS Scheme</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:border-[#FF7A00]/20">
                    <div className="relative w-full aspect-square max-h-[140px]">
                      <Image
                        src="/logo-nats.png"
                        alt="NATS Logo"
                        fill
                        sizes="(max-width: 768px) 50vw, 150px"
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-600 tracking-wide uppercase">NATS Scheme</span>
                  </div>
                </div>

                {/* Footer badge */}
                <div className="mt-2 flex items-center justify-between border-t border-slate-150/60 pt-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#FF7A00]" />
                    <span>Apprenticeship Act Compliant</span>
                  </div>
                  <span>Govt. of India Initiatives</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT APPRENTICESHIP SOLUTIONS */}
      <section className="relative py-8 lg:py-12 bg-white">
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
                sizes="(max-width: 1024px) 100vw, 40vw"
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
      <section className="relative py-8 lg:py-12 bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
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
      <section className="relative py-8 lg:py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0A66C2]">Technical Scheme</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              National Apprenticeship Training Scheme (NATS)
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The National Apprenticeship Training Scheme (NATS) is a Government of India initiative aimed at enhancing the employability of technically qualified youth by providing practical industry training.
            </p>

          </div>

          {/* Background and Eligibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
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


        </Container>
      </section>

      {/* 5. NAPS SECTION */}
      <section className="relative py-8 lg:py-12 bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Government Initiative</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2 uppercase tracking-tight">
              National Apprenticeship Promotion Scheme (NAPS)
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0A66C2] mx-auto" />
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The National Apprenticeship Promotion Scheme (NAPS) is a flagship skill development initiative of the Government of India that promotes apprenticeship training across industries.
            </p>

          </div>

          {/* Background and Eligibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
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
        </Container>
      </section>

      {/* 7. WHY CHOOSE LEGPRO SERVICES */}
      <section className="relative py-8 lg:py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
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

      {/* 10. FAQ SECTION */}
      <section className="relative py-8 lg:py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
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


    </div>
  );
}
