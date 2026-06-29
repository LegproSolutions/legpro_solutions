"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Layers,
  Award,
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Zap,
  Activity,
  Briefcase,
  Compass,
  FileCheck
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

// Canvas-based interactive soft-glowing organic blobs/orbs background animation
function GlowingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let orbs: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initOrbs();
    };

    const initOrbs = () => {
      orbs = [];
      const orbCount = 5;
      const colors = [
        "rgba(10, 102, 194, 0.12)",   // #0A66C2 blue
        "rgba(255, 122, 0, 0.08)",    // #FF7A00 orange
        "rgba(59, 130, 246, 0.1)",    // soft blue
        "rgba(249, 115, 22, 0.07)",   // soft orange
        "rgba(20, 184, 166, 0.08)"    // teal
      ];

      for (let i = 0; i < orbCount; i++) {
        const radius = Math.min(canvas.width, canvas.height) * 0.3 + Math.random() * 150;
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: radius,
          color: colors[i % colors.length]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        // Attracted slightly to mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - o.x;
          const dy = mouseRef.current.y - o.y;
          o.x += dx * 0.003;
          o.y += dy * 0.003;
        }

        // Move orbs
        o.x += o.vx;
        o.y += o.vy;

        // Bounce off walls (with radius padding to keep centers mostly on screen)
        if (o.x < 0 || o.x > canvas.width) o.vx *= -1;
        if (o.y < 0 || o.y > canvas.height) o.vy *= -1;

        // Draw soft glowing radial gradient
        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
        gradient.addColorStop(0, o.color);
        gradient.addColorStop(0.5, o.color.replace("0.1", "0.03").replace("0.08", "0.02"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fill();
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
// DATA SETS
// ----------------------------------------------------------------------

const VERTICAL_PEOPLE = [
  "Contractual Staffing",
  "Temporary Staffing",
  "Permanent Recruitment",
  "Talent Acquisition",
  "Campus Hiring",
  "Apprenticeship Solutions (NAPS & NATS)",
  "Recruitment Process Outsourcing (RPO)",
  "Employee on Record (EOR)",
  "Payroll & Compliance Management",
  "Workforce Outsourcing Solutions"
];

const VERTICAL_LEARNING = [
  "Learning Management System (LMS)",
  "Job Skills Learning Portal",
  "Professional Development Programs",
  "Employability Skills Training",
  "Industry-Specific Skill Development",
  "B.Voc & D.Voc Learn & Earn Programs",
  "Apprenticeship-Based Learning Solutions",
  "Career Readiness Programs"
];

const DIFFERENTIATORS = [
  {
    title: "AI-Enabled Recruitment Process",
    desc: "We leverage modern recruitment technologies and AI-driven methodologies to streamline sourcing, screening, and candidate matching. This enables faster hiring decisions, improved candidate quality, and enhanced recruitment efficiency.",
    icon: Cpu,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-500"
  },
  {
    title: "AI-Based Hiring Solutions",
    desc: "Our intelligent hiring framework helps organizations identify the right talent quickly through data-driven recruitment strategies, automated workflows, and advanced talent-matching capabilities.",
    icon: Zap,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-500"
  },
  {
    title: "Fast Response Time",
    desc: "We understand that every hiring requirement is time-sensitive. Our dedicated recruitment teams ensure prompt communication, quick turnaround times, and rapid deployment of resources.",
    icon: Activity,
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-500"
  },
  {
    title: "Speedy Execution",
    desc: "From requirement gathering to candidate onboarding, our structured recruitment processes enable faster execution and efficient workforce deployment across multiple industries and locations.",
    icon: TrendingUp,
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-500"
  },
  {
    title: "Captive Job Portal",
    desc: "Our dedicated job portal serves as a centralized platform for job seekers and employers, enabling efficient talent sourcing, candidate engagement, application management, and career opportunities.",
    icon: Briefcase,
    color: "from-cyan-500/10 to-sky-500/10",
    iconColor: "text-cyan-500"
  },
  {
    title: "Service-Oriented Approach",
    desc: "We believe in building long-term partnerships. Our team works closely with clients to understand their unique business challenges and deliver customized solutions that create lasting value.",
    icon: Award,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-500"
  }
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative bg-white text-slate-800 selection:bg-[#0A66C2] selection:text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF7A00] origin-left z-[110]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24 border-b border-slate-100 min-h-[75vh] flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-[#0A66C2]/20 to-transparent blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-gradient-to-bl from-[#FF7A00]/10 to-transparent blur-3xl" />
        </div>

        {/* Soft Glowing Orbs Animation */}
        <GlowingOrbs />

        <Container className="relative z-10 w-full">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Headings */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-4 pointer-events-none text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0A66C2]/20 bg-[#0A66C2]/5 px-4 py-1.5 text-sm font-semibold text-[#0A66C2]">
                <Compass className="h-4 w-4 text-[#FF7A00]" />
                <span>About LEGPRO Services</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                About <br />
                <TypewriterText
                  text="LEGPRO Services"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Empowering Businesses Through People, Processes & Purpose
              </h2>
            </motion.div>

            {/* Right Column: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="space-y-4 text-slate-600 font-medium text-justify">
                <p className="leading-relaxed">
                  Since <strong className="text-slate-900">2016</strong>, LEGPRO Services has been helping organizations build stronger, more agile, and future-ready workforces through innovative staffing, talent acquisition, apprenticeship, and learning solutions.
                </p>
                <p className="leading-relaxed">
                  We are a dynamic workforce solutions company committed to delivering value-driven services that enable businesses to attract the right talent, develop workforce capabilities, improve operational efficiency, and achieve sustainable growth. By combining industry expertise, technology-enabled processes, and a client-centric approach, we help organizations navigate today's evolving workforce landscape with confidence.
                </p>
                <p className="leading-relaxed">
                  At LEGPRO Services, we believe that people are the foundation of every successful business. Our mission is to connect talent with opportunity, empower individuals through skill development, and support organizations with workforce solutions that drive measurable business outcomes.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHO WE ARE & CORE PRINCIPLES */}
      <section className="py-20 relative bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Who We Are
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 leading-relaxed font-medium text-justify">
                LEGPRO Services is a trusted partner for organizations seeking reliable workforce solutions and professional development services. Over the years, we have built strong relationships with clients across multiple industries by delivering quality, compliance, and operational excellence.
              </p>
              <p className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4">
                Our approach is driven by three core principles:
              </p>

              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#0A66C2] mb-2 uppercase">People</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Creating opportunities, building careers, and connecting organizations with the right talent.
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#FF7A00] mb-2 uppercase">Processes</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Delivering structured, efficient, and compliant solutions that improve business performance.
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 uppercase">Purpose</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Supporting organizations and individuals in achieving long-term growth and success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. BUSINESS VERTICALS */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Strategic Focus</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Our Core <br className="hidden lg:inline" />
                Business Verticals
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Verticals grid */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Vertical 1 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#0A66C2] uppercase">People Solutions</h3>
                <p className="text-slate-600 font-medium text-justify leading-relaxed">
                  We provide end-to-end workforce management solutions that help organizations attract, hire, deploy, and manage talent effectively. Our staffing solutions are designed to provide flexibility, scalability, compliance, and operational excellence.
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2 mt-2">
                  {VERTICAL_PEOPLE.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-left">
                      <div className="h-5 w-5 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical 2 */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-2xl font-black text-[#FF7A00] uppercase">Learning Solutions</h3>
                <p className="text-slate-600 font-medium text-justify leading-relaxed">
                  We are committed to developing future-ready talent through structured learning and skill development initiatives. By bridging the gap between education and employment, we empower individuals with the skills required to succeed.
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2 mt-2">
                  {VERTICAL_LEARNING.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-left">
                      <div className="h-5 w-5 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF7A00]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. KEY DIFFERENTIATORS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto mb-16">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider block">Why LEGPRO Services</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                What Sets <br className="hidden lg:inline" />
                LEGPRO Services Apart
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" />
            </div>

            {/* Right Column: Intro */}
            <div className="lg:col-span-7 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                By integrating AI-driven technologies, customized talent pipelines, and a consultative approach, we deliver workforce support that is both agile and highly aligned with your company's core objectives.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {DIFFERENTIATORS.map((diff, i) => {
              const IconComponent = diff.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${diff.color} flex items-center justify-center ${diff.iconColor} mb-6 border border-slate-100`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 text-left">{diff.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">{diff.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. APPROACH */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Operational Approach</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Our Approach
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                At LEGPRO Services, we follow a consultative and solution-oriented approach.
              </p>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                We begin by understanding our clients' workforce requirements, business objectives, and operational challenges. Our team then designs customized staffing, recruitment, apprenticeship, or learning solutions that align with organizational goals and deliver measurable results.
              </p>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                This combination of people, processes, technology, and industry expertise enables us to create sustainable workforce solutions that support business growth.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CREATING OPPORTUNITIES & CTA */}
      <section className="py-20 bg-[#0A66C2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-extrabold tracking-widest block text-left">
                Empowering Growth
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-left">
                Creating Opportunities. <br className="hidden lg:inline" />
                Delivering Excellence.
              </h2>
            </div>

            {/* Right Column: CTA Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4 text-blue-100 text-lg leading-relaxed text-justify">
                <p>
                  Our success is measured by the success of our clients and candidates. Every placement, every training program, and every workforce solution we deliver is focused on creating meaningful impact.
                </p>
                <p>
                  Whether it is helping organizations find the right talent, supporting workforce development through apprenticeship programs, or empowering individuals through skill enhancement and learning initiatives, we remain committed to excellence at every stage.
                </p>
                <p className="font-extrabold text-white text-xl tracking-wide uppercase mt-4">
                  Build Stronger Teams. Develop Future Talent. Drive Sustainable Growth.
                </p>
                <p className="font-bold text-blue-200 mt-2 text-sm">
                  LEGPRO Services – Empowering Growth Through People, Processes & Purpose.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
