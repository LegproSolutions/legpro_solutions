"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Layers,
  ShieldCheck,
  TrendingUp,
  Zap,
  Coins,
  ChevronRight,
  UserCheck,
  Check,
  Briefcase
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

// Canvas-based interactive bubble/dot network component
function BubbleDotNetwork() {
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
      baseRadius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = [
      "10, 102, 194",  // #0A66C2
      "255, 122, 0",   // #FF7A00
      "59, 130, 246",  // Blue
      "249, 115, 22"   // Orange
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 85);
      for (let i = 0; i < particleCount; i++) {
        const baseRadius = Math.random() * 8 + 4; // Bubble sizes 4px to 12px
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: - (Math.random() * 0.6 + 0.2), // Float upwards
          radius: baseRadius,
          baseRadius: baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.25 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse
        if (mouseRef.current.active) {
          const dist = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
          if (dist < 150) {
            // Expand bubble size near mouse
            const targetRadius = p.baseRadius * (1 + (150 - dist) / 100);
            p.radius += (targetRadius - p.radius) * 0.1;
            // Push away slightly
            const angle = Math.atan2(p.y - mouseRef.current.y, p.x - mouseRef.current.x);
            p.x += Math.cos(angle) * 1.5;
            p.y += Math.sin(angle) * 1.5;
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.1;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.1;
        }

        // Draw bubble (circle with outer stroke and small inner reflection/light highlight)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${p.color}, ${p.alpha + 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight dot
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha + 0.3})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Reset if floats off top or sides
        if (p.y < -p.radius * 2) {
          p.y = canvas.height + p.radius * 2;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -p.radius * 2) {
          p.x = canvas.width + p.radius * 2;
        }
        if (p.x > canvas.width + p.radius * 2) {
          p.x = -p.radius * 2;
        }
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

const LEARN_EARN_ITEMS = [
  "Learn industry-relevant skills",
  "Gain practical workplace exposure",
  "Earn a stipend while studying",
  "Build professional experience",
  "Enhance employability and career prospects",
  "Develop confidence and workplace readiness"
];

const PROGRAM_BENEFITS = [
  {
    title: "Industry-Oriented Curriculum",
    desc: "Programs designed to align with current industry requirements and emerging workforce trends.",
    icon: BookOpen,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-500"
  },
  {
    title: "Practical Learning Approach",
    desc: "Hands-on training and workplace exposure that strengthen technical and professional skills.",
    icon: Layers,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-500"
  },
  {
    title: "Earn While You Learn",
    desc: "Opportunity to receive financial support through stipend-based training and apprenticeship opportunities.",
    icon: Coins,
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-500"
  },
  {
    title: "Enhanced Employability",
    desc: "Develop job-ready skills that improve career opportunities and professional growth.",
    icon: Award,
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-500"
  },
  {
    title: "Professional Development",
    desc: "Build communication, teamwork, problem-solving, and leadership capabilities required in modern workplaces.",
    icon: UserCheck,
    color: "from-cyan-500/10 to-sky-500/10",
    iconColor: "text-cyan-500"
  },
  {
    title: "Career-Focused Education",
    desc: "A structured pathway that combines education, skill development, and employment opportunities.",
    icon: TrendingUp,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-500"
  }
];

const APPLICANT_TYPES = [
  "Students seeking skill-based education",
  "Freshers looking for career-oriented learning opportunities",
  "Individuals who want practical industry exposure",
  "Candidates interested in earning while pursuing their studies",
  "Aspiring professionals seeking job-ready skills and career growth"
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function BvocDvocClient() {
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

        {/* Bubble Dot background animation */}
        <BubbleDotNetwork />

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
                <GraduationCap className="h-4 w-4 text-[#FF7A00]" />
                <span>B.Voc & D.Voc Programs</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                B.Voc & D.Voc <br />
                <TypewriterText
                  text="Programs"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Learn. Earn. Grow.
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
                  At <strong className="text-slate-900">LEGPRO Services</strong>, we are committed to creating career pathways that combine education with real-world industry experience. Our <strong className="text-[#0A66C2]">B.Voc (Bachelor of Vocation)</strong> and <strong className="text-[#FF7A00]">D.Voc (Diploma of Vocation)</strong> programs are designed to equip students with industry-relevant skills while providing valuable practical exposure through our unique <strong className="text-slate-900">Learn and Earn Model</strong>.
                </p>
                <p className="leading-relaxed">
                  These programs bridge the gap between academic learning and workplace requirements, enabling students to develop professional competencies, gain hands-on experience, and build successful careers from day one.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHAT ARE BVOC & DVOC PROGRAMS */}
      <section className="py-20 relative bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                What are <br className="hidden lg:inline" />
                <span className="text-[#0A66C2]">B.Voc & D.Voc</span> Programs?
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium text-justify">
                <p>
                  B.Voc and D.Voc are skill-based educational programs focused on developing industry-specific knowledge, technical expertise, and employability skills. Unlike traditional degree programs, these vocational courses emphasize practical learning, workplace exposure, and career-oriented training.
                </p>
                <p>
                  The programs are designed to meet the growing demand for skilled professionals across various industries while helping students become job-ready through a combination of classroom learning and on-the-job training.
                </p>
              </div>

              {/* Sub-cards */}
              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#0A66C2] mb-2">B.Voc (Bachelor of Vocation)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    A degree-level vocational program that integrates academic education with practical industry training, preparing students for specialized roles across multiple sectors.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#FF7A00] mb-2">D.Voc (Diploma of Vocation)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    A diploma-level vocational program that focuses on developing technical skills and industry competencies, enabling students to enter the workforce with confidence and practical expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. LEARN AND EARN PROGRAM */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Innovative Training Model</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Learn and Earn <br className="hidden lg:inline" />
                Program
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                Our Learn and Earn model allows students to gain valuable work experience while pursuing their education.
              </p>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                Through industry partnerships and structured training opportunities, students can:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mt-4">
                {LEARN_EARN_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 text-left"
                  >
                    <div className="h-7 w-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF7A00]">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-600 font-medium text-justify leading-relaxed mt-6">
                This approach ensures that students graduate with both academic qualifications and real-world experience, giving them a significant advantage in today's competitive job market.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. PROGRAM BENEFITS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto mb-16">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider block">Key Advantages</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Program Benefits
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" />
            </div>

            {/* Right Column: Intro */}
            <div className="lg:col-span-7 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                Our vocational programs are designed with a single goal: to prepare students for career success. We provide comprehensive benefits that make learning practical, affordable, and impactful.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {PROGRAM_BENEFITS.map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center ${benefit.iconColor} mb-6 border border-slate-100`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 text-left">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. WHO CAN APPLY SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Target Audience</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Who Can Apply?
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Applicant list */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                These programs are ideal for:
              </p>

              <div className="grid gap-3 sm:grid-cols-1 mt-2">
                {APPLICANT_TYPES.map((type, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3 text-left"
                  >
                    <div className="h-6 w-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2] mt-0.5">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-600 font-medium text-justify leading-relaxed text-sm">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. BUILD YOUR CAREER & CTA */}
      <section className="py-20 bg-[#0A66C2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-extrabold tracking-widest block text-left">
                Start Today
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-left">
                Build Your Career <br className="hidden lg:inline" />
                While You Learn
              </h2>
            </div>

            {/* Right Column: CTA Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4 text-blue-100 text-lg leading-relaxed text-justify">
                <p>
                  With LEGPRO Services' B.Voc and D.Voc Programs, education goes beyond the classroom. Gain industry exposure, earn valuable experience, develop in-demand skills, and take the first step toward a successful professional journey.
                </p>
                <p className="font-extrabold text-white text-xl tracking-wide uppercase mt-4">
                  Learn Today. Earn Along the Way. Succeed Tomorrow.
                </p>
                <p className="font-bold text-blue-200 mt-2 text-sm">
                  LEGPRO Services – Empowering Careers Through Education, Skills, and Opportunities.
                </p>
              </div>


            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
