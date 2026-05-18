"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Briefcase, GraduationCap, LayoutDashboard, Share2, ChevronDown } from "lucide-react";
import { site } from "@/lib/content";
import { NavDropdown, MobileNavGroup, type NavDropdownItem } from "./NavDropdown";
import { PortalsMegaMenu } from "./PortalsMegaMenu";
import { cn } from "@/lib/utils";

const MENU_ABOUT = "about";
const MENU_SERVICES = "services";
const MENU_TRAINING = "training";
const MENU_PORTALS_MOBILE = "portals-mobile";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const closeAllMenus = useCallback(() => {
    setActiveMenu(null);
    setMobileExpanded(null);
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

  const serviceItems: NavDropdownItem[] = site.services.map((s) => ({
    label: s.title,
    href: "/#services",
    description: s.description.slice(0, 72) + (s.description.length > 72 ? "…" : ""),
  }));

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
      className={cn(
        "sticky top-0 z-[100] w-full overflow-visible border-b border-white/10",
        "bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95",
        "backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/20"
      )}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/legpro-logo.svg"
            alt={site.company.brandLine}
            width={200}
            height={48}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <span className="hidden font-display text-xs font-semibold leading-tight text-slate-400 xl:block">
            {site.company.brandLine}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex lg:gap-0 xl:gap-1">
          <li>
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              Home
            </Link>
          </li>
          {aboutItems.length > 0 && (
            <NavDropdown
              menuId={MENU_ABOUT}
              label="About Us"
              items={aboutItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenuExclusive}
            />
          )}
          {serviceItems.length > 0 && (
            <NavDropdown
              menuId={MENU_SERVICES}
              label="Services"
              items={serviceItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenuExclusive}
            />
          )}
          <PortalsMegaMenu activeMenu={activeMenu} setActiveMenu={setActiveMenuExclusive} />
          {trainingItems.length > 0 && (
            <NavDropdown
              menuId={MENU_TRAINING}
              label="Training"
              items={trainingItems}
              align="right"
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenuExclusive}
            />
          )}
          <li>
            <Link
              href="/#contact"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              onMouseEnter={() => setActiveMenuExclusive(null)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div
          className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3"
          onMouseEnter={() => setActiveMenuExclusive(null)}
        >
          <Link
            href="/jobs"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            Find Jobs
          </Link>
          <Link
            href="/#contact"
            className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:opacity-95"
          >
            Hire Talent
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/10 bg-slate-950/98 px-4 py-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className="block rounded-lg py-3 text-lg font-medium text-slate-200"
                onClick={closeMobile}
              >
                Home
              </Link>
            </li>
            {aboutItems.length > 0 && (
              <MobileNavGroup
                menuId={MENU_ABOUT}
                label="About Us"
                items={aboutItems}
                mobileExpanded={mobileExpanded}
                setMobileExpanded={setMobileExpanded}
                onNavigate={closeMobile}
              />
            )}
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
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === MENU_PORTALS_MOBILE ? null : MENU_PORTALS_MOBILE)}
                className="flex w-full items-center justify-between rounded-lg py-3 text-lg font-medium text-slate-200"
              >
                Portals
                <ChevronDown
                  size={20}
                  className={cn("transition-transform", mobileExpanded === MENU_PORTALS_MOBILE && "rotate-180")}
                />
              </button>
              {mobileExpanded === MENU_PORTALS_MOBILE && (
                <div className="mt-2 grid gap-3 pb-4">
                  {mobilePortalCards.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.title}
                        href={p.href}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition active:bg-white/10"
                        onClick={closeMobile}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{p.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
            {trainingItems.length > 0 && (
              <MobileNavGroup
                menuId={MENU_TRAINING}
                label="Training"
                items={trainingItems}
                mobileExpanded={mobileExpanded}
                setMobileExpanded={setMobileExpanded}
                onNavigate={closeMobile}
              />
            )}
            <li>
              <Link href="/#contact" className="block rounded-lg py-3 text-lg font-medium text-slate-200" onClick={closeMobile}>
                Contact
              </Link>
            </li>
            <li className="flex flex-col gap-3 border-t border-white/10 pt-4">
              <Link href="/jobs" className="btn-secondary w-full text-center" onClick={closeMobile}>
                Find Jobs
              </Link>
              <Link href="/#contact" className="btn-primary w-full text-center" onClick={closeMobile}>
                Hire Talent
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
