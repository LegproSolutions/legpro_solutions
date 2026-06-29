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
  Clock,
  Coins,
  ChevronRight,
  UserCheck,
  Check
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { TypewriterText } from "@/components/ui/TypewriterText";

// ----------------------------------------------------------------------
// DATA SETS
// ----------------------------------------------------------------------

const BENEFITS = [
  {
    title: "Workforce Flexibility",
    desc: "Scale your workforce up or down based on project demands, seasonal requirements, or business expansion plans.",
    icon: Layers,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Faster Hiring & Deployment",
    desc: "Access pre-screened and qualified candidates for immediate deployment, reducing time-to-hire and operational delays.",
    icon: Zap,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Cost Optimization",
    desc: "Minimize recruitment, onboarding, and administrative expenses while maintaining workforce efficiency.",
    icon: Coins,
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "Access to Skilled Talent",
    desc: "Hire professionals with specialized skills and industry expertise for specific projects and assignments.",
    icon: Award,
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Reduced Administrative Burden",
    desc: "Outsource payroll processing, attendance management, statutory compliance, and employee administration.",
    icon: ShieldCheck,
    color: "from-cyan-500/10 to-sky-500/10",
    iconColor: "text-cyan-500",
  },
  {
    title: "Improved Business Focus",
    desc: "Allow your internal teams to focus on core business activities while workforce management is handled by experts.",
    icon: UserCheck,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-500",
  },
];

const STAFFING_SERVICES = [
  "Contract Staffing",
  "Temporary Staffing",
  "Project-Based Hiring",
  "Bulk Hiring Solutions",
  "Workforce Outsourcing",
  "Skilled & Semi-Skilled Manpower",
  "Blue-Collar Workforce Solutions",
  "White-Collar Staffing Solutions",
  "Industrial Staffing",
  "Administrative & Support Staffing"
];

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
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function ContractualStaffingClient() {
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
                <Briefcase className="h-4 w-4 text-[#FF7A00]" />
                <span>Contractual Staffing Services</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 uppercase tracking-tight">
                Contractual Staffing <br />
                <TypewriterText
                  text="Services"
                  className="bg-gradient-to-r from-[#0A66C2] to-[#FF7A00] bg-clip-text text-transparent"
                  cursorColor="#FF7A00"
                />
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A66C2] tracking-wide">
                Flexible Workforce Solutions for Modern Businesses
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
                  In today's fast-changing business environment, organizations need workforce solutions that are agile, scalable, and cost-effective. At LEGPRO Services, our Contractual Staffing Solutions help businesses meet their evolving manpower requirements while maintaining operational efficiency, compliance, and productivity.
                </p>
                <p className="leading-relaxed">
                  Whether you need skilled professionals for short-term projects, seasonal workforce requirements, business expansion, or specialized assignments, we provide qualified talent that seamlessly integrates with your operations and contributes to your business objectives.
                </p>
                <p className="leading-relaxed">
                  Our contractual staffing services enable organizations to focus on growth while we manage the complexities of talent acquisition, onboarding, payroll administration, statutory compliance, and workforce management.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHAT IS CONTRACTUAL STAFFING SECTION */}
      <section className="py-20 relative bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                What is <br className="hidden lg:inline" />
                <span className="text-[#0A66C2]">Contractual Staffing</span>?
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed font-medium text-justify">
              <p>
                Contractual Staffing is a flexible workforce management solution that allows organizations to hire employees for a specific duration, project, or business requirement without the long-term commitments associated with permanent employment.
              </p>
              <p>
                This staffing model enables businesses to quickly scale their workforce, access specialized talent, and respond effectively to changing market demands while optimizing recruitment and operational costs.
              </p>
              <p>
                At LEGPRO Services, we deliver end-to-end contractual staffing solutions tailored to the unique requirements of organizations across industries, ensuring the right talent is available at the right time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. KEY BENEFITS FOR ORGANIZATIONS */}
      <section id="why-choose" className="py-20 bg-slate-50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto mb-16">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#0A66C2] text-sm uppercase font-bold tracking-wider block">Strategic Benefits</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                Why Choose <br className="hidden lg:inline" />
                Contractual Staffing?
              </h2>
              <div className="mt-6 h-1.5 w-16 bg-[#FF7A00] rounded-full" />
            </div>

            {/* Right Column: Content Intro */}
            <div className="lg:col-span-7 text-left space-y-6">
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                As businesses continue to adapt to dynamic market conditions, contractual staffing has become a strategic workforce solution that offers flexibility, efficiency, and operational control.
              </p>
              <h3 className="text-xl font-extrabold text-slate-800 uppercase tracking-wide">
                Key Benefits for Organizations
              </h3>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {BENEFITS.map((b, i) => {
              const IconComponent = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center ${b.iconColor} mb-6 border border-slate-100`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 text-left">{b.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-left">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. SOLUTIONS SHOWCASE */}
      <section className="py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading & Intro */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-4">
                <span className="text-[#FF7A00] text-sm uppercase font-bold tracking-wider font-display">Services Directory</span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                  Our Contractual <br className="hidden lg:inline" />
                  Staffing Solutions
                </h2>
                <div className="mt-6 h-1.5 w-16 bg-[#0A66C2] rounded-full" />
              </div>
              <p className="text-slate-600 font-medium text-justify leading-relaxed">
                At LEGPRO Services, we offer comprehensive workforce solutions designed to meet diverse business requirements.
              </p>
              <h3 className="text-xl font-extrabold text-slate-800 uppercase tracking-wide">
                Staffing Services Include:
              </h3>
            </div>

            {/* Right Column: Services Grid */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {STAFFING_SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 text-left"
                >
                  <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#0A66C2]">
                    <Check className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{s}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-20 bg-[#0A66C2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center max-w-7xl mx-auto">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#FF7A00] text-sm uppercase font-extrabold tracking-widest block text-left">
                Hire. Deploy. Manage. Grow.
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-left">
                Partner with <br className="hidden lg:inline" />
                LEGPRO Services
              </h2>
            </div>

            {/* Right Column: CTA content and buttons */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4 text-blue-100 text-lg leading-relaxed text-justify">
                <p>
                  At LEGPRO Services, we help organizations build a productive and efficient workforce through customized contractual staffing solutions. From sourcing the right talent to managing workforce operations, we ensure a seamless staffing experience that supports your business growth.
                </p>
                <p className="font-bold text-white mt-4">
                  Partner with LEGPRO Services for reliable, compliant, and scalable Contractual Staffing Solutions that empower your business to succeed.
                </p>
              </div>


            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
