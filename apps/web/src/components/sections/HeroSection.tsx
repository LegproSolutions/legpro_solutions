"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TypewriterText } from "@/components/ui/TypewriterText";

const slides = [
  {
    title: "Staffing Solutions",
    description:
      "Providing reliable and scalable workforce solutions to meet your business requirements efficiently across industries.",
    image: "/service-contractual.png",
  },
  {
    title: "Talent Acquisition",
    description:
      "Connecting organizations with skilled professionals through streamlined and effective recruitment processes.",
    image: "/service-naps.png",
  },
  {
    title: "Apprenticeship Programmes",
    description:
      "NAPS, NATS, B.Voc and customized apprenticeship solutions for building future-ready talent.",
    image: "/service-aedp.png",
  },
  {
    title: "Learning & Development",
    description:
      "Corporate training and learning solutions designed to enhance workforce productivity and growth.",
    image: "/service-dvoc.png",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    startTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  };

  // Slide variant definitions
  const textContainerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0 },
  };

  const headingVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const descVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="home" className="relative w-full min-h-[85vh] lg:min-h-[90vh] overflow-hidden flex items-stretch">
      <div className="grid w-full grid-cols-1 lg:grid-cols-12 items-stretch">

        {/* Left Side (60%) - Solid Brand Background with Geometric Accents */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#04142B] via-[#0A1F44] to-[#1E40FF] flex flex-col justify-center px-6 py-16 md:px-16 md:py-24 relative overflow-hidden text-white min-h-[50vh] lg:min-h-0">

          {/* Subtle Geometric Background Shapes */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 border-4 border-white/50 rounded-3xl rotate-45" />
            <div className="absolute top-1/3 right-10 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-white" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <motion.h1
                  variants={headingVariants}
                  className="font-display text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl text-white Poppins"
                >
                  <TypewriterText text={slides[current].title} cursorColor="#2dd4bf" />
                </motion.h1>

                {/* Thin divider line below heading */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.5 }}
                  className="h-1 bg-teal-400 rounded-full"
                />

                <motion.p
                  variants={descVariants}
                  className="text-base sm:text-lg leading-relaxed text-slate-200"
                >
                  {slides[current].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-teal-500 hover:bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 hover:scale-[1.03] transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Slider controls (Arrows & Indicators) */}
          <div className="absolute bottom-6 left-6 right-6 md:left-16 md:right-16 flex items-center justify-between z-20">
            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                    startTimer();
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-teal-400" : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/25 active:scale-95 transition-all duration-300"
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/25 active:scale-95 transition-all duration-300"
                aria-label="Next slide"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Side (40%) - Image Section with Curved Arched Border Shape */}
        <div className="lg:col-span-5 relative bg-white overflow-hidden min-h-[40vh] lg:min-h-0">

          {/* Curved Arched SVG Mask */}
          <div className="absolute inset-y-0 left-0 w-20 bg-transparent z-20 pointer-events-none hidden lg:block">
            <svg
              className="h-full w-full text-white fill-current"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M100,0 C30,20 30,80 100,100 L0,100 L0,0 Z" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.div
                animate={{ scale: [1, 1.04] }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Soft Dark Bottom Gradient for Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
        </div>

      </div>
    </section>
  );
}
