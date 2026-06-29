"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, GraduationCap, LayoutDashboard, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ID = "portals-mega";

export type PortalsMegaMenuProps = {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
};

const portals = [
  {
    title: "Job Mela Portal",
    description:
      "Browse jobs, apply instantly, track applications, and manage profiles.",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Job Skills Portal",
    description:
      "Skill development, certification programs, interview preparation, and training modules.",
    href: "/skills",
    icon: GraduationCap,
  },
  {
    title: "HRMS Portal",
    description:
      "Complete employee management system including attendance, payroll, leave, onboarding, performance tracking, and HR analytics.",
    href: "/hrms",
    icon: LayoutDashboard,
  },
  {
    title: "CRM Portal",
    description:
      "Existing CRM system already developed. Navigation only — /crm redirects to your deployed CRM (set NEXT_PUBLIC_CRM_URL).",
    href: "/crm",
    icon: Share2,
  },
];

export function PortalsMegaMenu({ activeMenu, setActiveMenu }: PortalsMegaMenuProps) {
  const open = activeMenu === MENU_ID;
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) setActiveMenu(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setActiveMenu]);

  const toggle = () => setActiveMenu(open ? null : MENU_ID);

  return (
    <li ref={ref} className="relative z-[60] h-full flex items-center">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setActiveMenu(MENU_ID)}
        className={cn(
          "relative group h-full flex items-center gap-1 px-4 text-[15px] font-semibold transition-colors duration-300",
          open ? "text-primary" : "text-slate-700 hover:text-primary"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>Portals</span>
        <ChevronDown size={14} className={cn("transition-transform duration-300 text-slate-500 group-hover:text-primary", open && "rotate-180")} />
        <span className={cn(
          "absolute bottom-0 left-1/2 h-[4px] -translate-x-1/2 rounded-t-full bg-primary transition-all duration-300",
          open ? "w-8" : "w-0 group-hover:w-8"
        )} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-[90] mt-1 w-[min(calc(100vw-2rem),56rem)] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {portals.map((p) => {
                const Icon = p.icon;
                const cardClass = cn(
                  "group relative flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300",
                  "hover:border-primary/30 hover:bg-slate-50/80 hover:shadow-lg hover:shadow-slate-100"
                );
                return (
                  <Link
                    key={p.title}
                    href={p.href}
                    className={cardClass}
                    onClick={() => setActiveMenu(null)}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{p.description}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export const PORTALS_MENU_ID = MENU_ID;
