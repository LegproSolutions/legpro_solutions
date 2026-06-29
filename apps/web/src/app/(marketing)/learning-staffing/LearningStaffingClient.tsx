"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Briefcase,
  Compass,
  Mail
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

// Canvas-based interactive particle network component (AI Animations)
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
      label: string;
      alpha: number;
    }> = [];

    const colors = ["#0A66C2", "#FF7A00", "#10B981", "#3b82f6"];
    const labels = ["Upskill", "Career", "B.Voc", "NAPS", "NATS", "Growth", "Learning", "Skills", "HR", "Digital", "Sales", "Future"];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 22000), 40);
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          // Floating UPWARDS:
          vy: - (Math.random() * 0.5 + 0.2),
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          label: Math.random() > 0.4 ? labels[Math.floor(Math.random() * labels.length)] : "",
          alpha: Math.random() * 0.6 + 0.4,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.12 * p1.alpha * p2.alpha;
            ctx.strokeStyle = `rgba(10, 102, 194, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw label with faint background box
        if (p1.label) {
          ctx.font = "bold 9px sans-serif";
          ctx.fillStyle = "#64748b";
          ctx.fillText(p1.label, p1.x + p1.radius + 6, p1.y + 3);
          
          // Draw tiny connecting dash
          ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p1.x + p1.radius + 3, p1.y);
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1.0;

        // Update positions (float upwards)
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around borders
        if (p1.y < -20) {
          p1.y = canvas.height + 20;
          p1.x = Math.random() * canvas.width;
        }
        if (p1.x < -20) p1.x = canvas.width + 20;
        if (p1.x > canvas.width + 20) p1.x = -20;
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

const PORTAL_BENEFITS = [
  "Develop job-ready skills",
  "Strengthen technical knowledge",
  "Improve workplace competencies",
  "Enhance career opportunities",
  "Stay updated with industry requirements",
  "Build confidence for professional success"
];

const JOB_SEEKER_AREAS = [
  "Employability Skills",
  "Communication & Professional Skills",
  "Interview Preparation",
  "Workplace Readiness",
  "Digital Literacy",
  "Industry-Specific Technical Skills",
  "Personality Development",
  "Career Planning & Guidance"
];

const UP_PROFESSIONAL_BENEFITS = [
  "Improve job performance",
  "Stay updated with industry trends",
  "Strengthen technical expertise",
  "Enhance leadership and management capabilities",
  "Increase career growth opportunities",
  "Prepare for future responsibilities"
];

const LEARNING_APPROACH_ITEMS = [
  "Skill-Based Learning",
  "Practical Training",
  "Industry-Relevant Content",
  "Career-Oriented Development",
  "Professional Competency Building",
  "Continuous Learning & Improvement"
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function LearningStaffingClient() {
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
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[-10%] left-[-10%] h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-[#0A66C2]/20 to-transparent blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, -20, 0],
              y: [0, 20, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-gradient-to-bl from-[#FF7A00]/10 to-transparent blur-3xl" 
          />
        </div>

        {/* AI Mesh Interactive Animation */}
        <AiMeshNetwork />

        <Container className="relative z-10 w-full">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Headings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 space-y-4 pointer-events-none text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0A66C2]/20 bg-[#0A66C2]/5 px-4 py-1.5 text-sm font-semibold text-[#0A66C2]">
                <BookOpen className="h-4 w-4 text-[#FF7A00]" />
                <span>Learning & Skill Development</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                Learning & Skill <br />
                <TypewriterText
                  text="Development"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Empowering Careers Through Continuous Learning
              </h2>
            </motion.div>

            {/* Right Column: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="space-y-4 text-slate-600 font-medium text-justify">
                <p className="leading-relaxed">
                  At <strong className="text-slate-900">LEGPRO Services</strong>, we believe that learning is the foundation of professional growth and career success. In today's rapidly evolving job market, possessing the right skills is just as important as having the right qualifications. To bridge the gap between talent and industry requirements, we offer comprehensive <strong className="text-[#0A66C2]">Learning & Skill Development Solutions</strong> designed for job seekers, students, freshers, and working professionals.
                </p>
                <p className="leading-relaxed">
                  Our objective is to help individuals build industry-relevant competencies, enhance employability, and stay competitive in their respective fields through structured learning and practical skill development.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. BUILDING A FUTURE-READY WORKFORCE */}
      <section className="py-20 relative bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Building a Skilled <br className="hidden lg:inline" />
                And <span className="text-[#0A66C2]">Future-Ready</span> Workforce
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" 
              />
            </motion.div>

            {/* Right Column: Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed font-medium text-justify"
            >
              <p>
                As industries continue to evolve, organizations increasingly seek professionals who possess both technical expertise and workplace-ready skills. To address this need, LEGPRO Services has developed a dedicated learning ecosystem that focuses on career-oriented training, upskilling, and professional development.
              </p>
              <p>
                Whether an individual is starting their career journey, looking to enhance existing capabilities, or preparing for new opportunities, our learning programs are designed to support every stage of professional growth.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. JOB SKILLS LEARNING PORTAL */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Centralized Platform</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Job Skills <br className="hidden lg:inline" />
                Learning Portal
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" 
              />
            </motion.div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed"
              >
                Our dedicated <strong className="text-slate-900">Job Skills Learning Portal</strong> provides learners with access to structured training programs, industry-specific learning modules, and professional development resources.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4"
              >
                The platform is designed to help users:
              </motion.p>
              
              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {PORTAL_BENEFITS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotateX: -15, y: 20 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    whileHover={{ scale: 1.03, y: -4, borderColor: "#0A66C2", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2]">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed mt-6"
              >
                The learning portal serves as a centralized platform where individuals can continuously learn, upgrade their skills, and prepare themselves for current and future job opportunities.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. SKILL DEVELOPMENT FOR JOB SEEKERS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider block">Career Preparedness</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Skill Development <br className="hidden lg:inline" />
                For Job Seekers
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" 
              />
            </motion.div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed"
              >
                Starting a career can be challenging without the right guidance and practical skills. Our training programs are specifically designed to help job seekers become employment-ready by focusing on essential professional and industry-related competencies.
              </motion.p>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4"
              >
                Key Areas of Development:
              </motion.h3>

              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {JOB_SEEKER_AREAS.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotateY: 15, x: 30 }}
                    whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                    whileHover={{ scale: 1.03, y: -4, borderColor: "#FF7A00", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="h-7 w-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF7A00]">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{area}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed mt-6"
              >
                These programs help candidates gain the confidence and capabilities required to succeed in today's competitive employment landscape.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. UPSKILLING FOR WORKING PROFESSIONALS */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Career Advancement</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Upskilling For <br className="hidden lg:inline" />
                Working Professionals
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" 
              />
            </motion.div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed"
              >
                Continuous learning is essential for career advancement and professional growth. Our learning solutions support employees in enhancing their existing skills and developing new competencies aligned with their roles and career aspirations.
              </motion.p>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4"
              >
                Benefits for Working Professionals:
              </motion.h3>

              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {UP_PROFESSIONAL_BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.03, y: -4, borderColor: "#10B981", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed mt-6"
              >
                Through targeted learning initiatives, professionals can remain relevant, productive, and competitive in a rapidly changing work environment.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. INDUSTRY-FOCUSED LEARNING APPROACH */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider block">Application-Oriented</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Industry-Focused <br className="hidden lg:inline" />
                Learning Approach
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" 
              />
            </motion.div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed"
              >
                Our training programs are designed with a practical and application-oriented approach that focuses on real workplace requirements.
              </motion.p>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4"
              >
                We emphasize:
              </motion.h3>

              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {LEARNING_APPROACH_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15, x: -20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    whileHover={{ scale: 1.03, y: -4, borderColor: "#0A66C2", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2]">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-slate-600 font-medium text-justify leading-relaxed mt-6"
              >
                By aligning learning outcomes with industry expectations, we help individuals develop skills that create real career value.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. LEARN TODAY, LEAD TOMORROW & CTA */}
      <section className="py-20 bg-[#0A66C2] text-white relative overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: 360, 
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none" 
        />
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[#FF7A00] text-sm uppercase font-extrabold tracking-widest block text-left">
                Start Upskilling
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-left">
                Learn Today. <br className="hidden lg:inline" />
                Lead Tomorrow.
              </h2>
            </motion.div>

            {/* Right Column: CTA Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <div className="space-y-4 text-blue-100 text-lg leading-relaxed text-justify">
                <p>
                  Whether you are a student, job seeker, fresher, or working professional, LEGPRO Services provides the learning support, skill development opportunities, and career guidance needed to achieve your professional goals.
                </p>
                <p className="font-extrabold text-white text-xl tracking-wide uppercase mt-4">
                  Build Skills. Create Opportunities. Accelerate Your Career.
                </p>
                <p className="font-bold text-blue-200 mt-2 text-sm">
                  LEGPRO Services – Empowering People Through Learning, Skills, and Career Development.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
