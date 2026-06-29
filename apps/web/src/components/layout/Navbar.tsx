"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Briefcase, GraduationCap, LayoutDashboard, Share2, ChevronDown, BookOpen, Award, Users, Layers, HardHat } from "lucide-react";
import { site } from "@/lib/content";
import { NavDropdown, MobileNavGroup, type NavDropdownItem } from "./NavDropdown";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const MENU_ABOUT = "about";
const MENU_SERVICES = "services";
const MENU_TRAINING = "training";
const MENU_PORTALS_MOBILE = "portals-mobile";

const iconMap: Record<string, any> = {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Layers,
  HardHat,
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const closeAllMenus = useCallback(() => {
    setActiveMenu(null);
    setMobileExpanded(null);
  }, []);

  useEffect(() => {
    closeAllMenus();
    setMobileOpen(false);
  }, [pathname, closeAllMenus]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllMenus();
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAllMenus]);

  useEffect(() => {
    if (!mobileOpen) {
      closeAllMenus();
    }
  }, [mobileOpen, closeAllMenus]);

  const setActiveMenuExclusive = useCallback((id: string | null) => {
    setActiveMenu(id);
  }, []);

  const serviceItems: NavDropdownItem[] = [
    { label: "Talent Acquisition", href: "/talent-acquisition" },
    { label: "Contractual Staffing", href: "/contractual-staffing" },
    { label: "NAPS/NATS", href: "/naps-nats" },
    { label: "BVoc./ DVoc.", href: "/bvoc-dvoc" },
    { label: "Learning Skills", href: "/learning-staffing" },
  ];

  const aboutItems: NavDropdownItem[] = site.navigation?.about ?? [];

  const trainingItems: NavDropdownItem[] = site.training.map((t) => ({
    label: t.title,
    href: "/#training",
    description: t.description.slice(0, 72) + (t.description.length > 72 ? "…" : ""),
  }));

  const closeMobile = () => {
    setMobileOpen(false);
    closeAllMenus();
  };

  const mobilePortalCards = [
    {
      title: "Job Mela Portal",
      desc: "Browse jobs, apply instantly, track applications, and manage profiles.",
      href: "/jobs",
      icon: Briefcase,
    },
    {
      title: "Job Skills Portal",
      desc: "Skill development, certification programs, interview preparation, and training modules.",
      href: "/skills",
      icon: GraduationCap,
    },
    {
      title: "HRMS Portal",
      desc: "Attendance, payroll, leave, onboarding, performance, and HR analytics.",
      href: "/hrms",
      icon: LayoutDashboard,
    },
    {
      title: "CRM Portal",
      desc: "Opens your existing CRM (configure NEXT_PUBLIC_CRM_URL).",
      href: "/crm",
      icon: Share2,
    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] w-full overflow-visible transition-all duration-300 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
      onMouseLeave={closeAllMenus}
    >
      <nav className={cn(
        "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-300",
        scrolled ? "h-[68px]" : "h-[84px]"
      )}>
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/legpro-logo.png"
              alt="LEGPRO Staffing | Learning"
              width={320}
              height={90}
              className="h-[48px] w-auto sm:h-[58px] object-contain transition-transform duration-300 hover:scale-[1.02]"
              priority
            />
          </Link>
        </div>

        <ul className="hidden h-full items-center gap-1 lg:flex lg:gap-0 xl:gap-1">
          <li className="h-full flex items-center">
            <Link
              href="/"
              className="relative group h-full flex items-center px-2 xl:px-4 text-sm xl:text-[15px] font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-1/2 h-[4px] w-0 -translate-x-1/2 rounded-t-full bg-blue-600 transition-all duration-300 group-hover:w-8" />
            </Link>
          </li>
          
          <li className="h-full flex items-center">
            <Link
              href="/about"
              className="relative group h-full flex items-center px-2 xl:px-4 text-sm xl:text-[15px] font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              <span>About Us</span>
              <span className="absolute bottom-0 left-1/2 h-[4px] w-0 -translate-x-1/2 rounded-t-full bg-blue-600 transition-all duration-300 group-hover:w-8" />
            </Link>
          </li>

          {serviceItems.length > 0 && (
            <NavDropdown
              menuId={MENU_SERVICES}
              label="Services"
              items={serviceItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenuExclusive}
            />
          )}

          <li className="h-full flex items-center">
            <a
              href="https://www.jobmela.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group h-full flex items-center px-2 xl:px-4 text-sm xl:text-[15px] font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              <span>Careers</span>
              <span className="absolute bottom-0 left-1/2 h-[4px] w-0 -translate-x-1/2 rounded-t-full bg-blue-600 transition-all duration-300 group-hover:w-8" />
            </a>
          </li>

          <li className="h-full flex items-center">
            <Link
              href="/contact"
              className="relative group h-full flex items-center px-2 xl:px-4 text-sm xl:text-[15px] font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              <span>Contact Us</span>
              <span className="absolute bottom-0 left-1/2 h-[4px] w-0 -translate-x-1/2 rounded-t-full bg-blue-600 transition-all duration-300 group-hover:w-8" />
            </Link>
          </li>
        </ul>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end" />

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:text-blue-600 transition-colors active:scale-95 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-6 lg:hidden shadow-2xl">
          <ul className="flex flex-col gap-1 text-slate-800">
            <li>
              <Link
                href="/"
                className="block rounded-lg py-3 text-lg font-semibold text-slate-800 hover:text-blue-600"
                onClick={closeMobile}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-lg py-3 text-lg font-semibold text-slate-800 hover:text-blue-600"
                onClick={closeMobile}
              >
                About Us
              </Link>
            </li>
            {serviceItems.length > 0 && (
              <MobileNavGroup
                menuId={MENU_SERVICES}
                label="Services"
                items={serviceItems}
                mobileExpanded={mobileExpanded}
                setMobileExpanded={setMobileExpanded}
                onNavigate={closeMobile}
              />
            )}
            <li>
              <a
                href="https://www.jobmela.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg py-3 text-lg font-semibold text-slate-800 hover:text-blue-600"
                onClick={closeMobile}
              >
                Careers
              </a>
            </li>
            <li>
              <Link href="/contact" className="block rounded-lg py-3 text-lg font-semibold text-slate-800 hover:text-blue-600" onClick={closeMobile}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
