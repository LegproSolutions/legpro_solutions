"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatsCounter({
  value,
  suffix = "",
  label,
  className,
}: {
  value: number | string;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Parse numeric value and dynamic suffix
  let numericValue = 0;
  let finalSuffix = suffix;
  
  if (typeof value === "number") {
    numericValue = value;
  } else {
    const match = value.match(/^(\d+)(.*)$/);
    if (match) {
      numericValue = parseInt(match[1], 10);
      finalSuffix = match[2] + suffix;
    } else {
      numericValue = parseInt(value, 10) || 0;
    }
  }

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numericValue]);

  return (
    <div ref={ref} className={cn("glass-card p-6 text-center hover:shadow-lg transition-all duration-300", className)}>
      <p className="font-display text-4xl font-bold text-gradient">
        {display}
        {finalSuffix}
      </p>
      <p className="mt-2 text-sm text-slate-500 font-medium">{label}</p>
    </div>
  );
}
