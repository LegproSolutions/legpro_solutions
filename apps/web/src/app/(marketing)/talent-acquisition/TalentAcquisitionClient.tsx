"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Layers,
  ShieldCheck,
  TrendingUp,
  Zap,
  Award,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  Check,
  Search,
  ClipboardCheck,
  FileCheck
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
    }> = [];

    const colors = ["#0A66C2", "#FF7A00", "#3b82f6", "#f97316"];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 75);
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

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(10, 102, 194, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
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

        // Draw particle
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off walls
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
// DATA SETS
// ----------------------------------------------------------------------

const PROCESS_ITEMS = [
  "Workforce Planning & Requirement Analysis",
  "Job Role Definition & Talent Mapping",
  "Candidate Sourcing & Screening",
  "Skill Assessment & Evaluation",
  "Interview Coordination",
  "Reference & Background Verification",
  "Offer Management & Negotiation",
  "Onboarding Support"
];

const METHODOLOGY_ITEMS = [
  "Understanding business requirements",
  "Identifying the right talent pool",
  "Evaluating technical and behavioral competencies",
  "Ensuring cultural and organizational fit",
  "Delivering quality hires within defined timelines"
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function TalentAcquisitionClient() {
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

        {/* AI Mesh Interactive Animation */}
        <AiMeshNetwork />

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
                <Users className="h-4 w-4 text-[#FF7A00]" />
                <span>Talent Acquisition Services</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                Talent Acquisition <br />
                <TypewriterText
                  text="Services"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Finding the Right Talent. Building Stronger Organizations.
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
                  In today's fast-paced business environment, people are the driving force behind every successful organization. The ability to attract, assess, and hire the right talent is critical to achieving business goals, improving productivity, and maintaining a competitive advantage.
                </p>
                <p className="leading-relaxed">
                  At <strong className="text-slate-900">LEGPRO Services</strong>, we deliver strategic Talent Acquisition solutions that help organizations identify and secure high-quality talent across various functions and levels. Our approach combines industry expertise, market intelligence, and a deep understanding of workforce dynamics to ensure that every hiring decision contributes to long-term organizational success.
                </p>
                <p className="leading-relaxed">
                  We partner with businesses to streamline the recruitment process, reduce hiring challenges, and build a workforce that aligns with their vision, culture, and growth objectives.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. STRATEGIC RECRUITMENT SECTION */}
      <section className="py-20 relative bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Strategic Recruitment <br className="hidden lg:inline" />
                <span className="text-[#0A66C2]">For Sustainable Growth</span>
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed font-medium text-justify">
              <p>
                As organizations evolve, so do their talent requirements. Whether it is business expansion, new project execution, workforce transformation, or critical position hiring, finding the right candidate at the right time is essential.
              </p>
              <p>
                Our Talent Acquisition services are designed to support organizations in meeting their workforce demands through a structured, efficient, and result-oriented recruitment process. We focus on identifying professionals who possess not only the required skills and experience but also the potential to contribute meaningfully to organizational growth.
              </p>
              <p>
                By leveraging advanced sourcing strategies and a consultative approach, we help businesses build teams that drive performance, innovation, and success.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. YOUR RECRUITMENT PARTNER SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">End-to-End Lifecycle</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Your Recruitment Partner <br className="hidden lg:inline" />
                Throughout the Hiring Journey
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                At LEGPRO Services, we manage the complete recruitment lifecycle, ensuring a seamless experience for both employers and candidates.
              </p>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                Our talent acquisition process includes:
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2 mt-4">
                {PROCESS_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 text-left"
                  >
                    <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2]">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-600 font-medium text-justify leading-relaxed mt-6">
                Our goal is to simplify hiring while maintaining the highest standards of quality, efficiency, and professionalism.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. OUR APPROACH */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider block">Recruitment Methodology</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Our Approach
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                We understand that every organization has unique workforce requirements. Therefore, we adopt a customized recruitment strategy that aligns with your business objectives and hiring needs.
              </p>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                Through a combination of targeted sourcing, candidate engagement, and rigorous evaluation, we identify talent that is capable of delivering immediate impact while supporting long-term organizational goals.
              </p>
              <p className="text-slate-800 font-bold tracking-wide uppercase text-sm mt-4">
                Our recruitment methodology focuses on:
              </p>

              <div className="grid gap-3 sm:grid-cols-1 mt-2">
                {METHODOLOGY_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3 text-left"
                  >
                    <div className="h-6 w-6 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF7A00] mt-0.5">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-600 font-medium text-justify leading-relaxed text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. CREATING VALUE THROUGH TALENT & CTA */}
      <section className="py-20 bg-[#0A66C2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-extrabold tracking-widest block text-left">
                Strategic Partnerships
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-left">
                Creating Value <br className="hidden lg:inline" />
                Through Talent
              </h2>
            </div>

            {/* Right Column: CTA Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4 text-blue-100 text-lg leading-relaxed text-justify">
                <p>
                  Successful organizations are built on strong teams. At LEGPRO Services, we believe talent acquisition is more than a hiring function—it's a strategic investment in business growth.
                </p>
                <p>
                  Our commitment is to help organizations attract exceptional talent, strengthen workforce capabilities, and create a foundation for sustainable success. By connecting businesses with the right people, we enable them to achieve greater efficiency, innovation, and performance.
                </p>
                <p className="font-bold text-white mt-4">
                  Partner with LEGPRO Services to build a workforce that drives growth, strengthens operations, and creates lasting business value.
                </p>
              </div>


            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
