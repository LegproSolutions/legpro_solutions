"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavDropdownItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  comingSoon?: boolean;
};

type NavDropdownProps = {
  menuId: string;
  label: string;
  items: NavDropdownItem[];
  align?: "left" | "right";
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
};

export function NavDropdown({
  menuId,
  label,
  items,
  align = "left",
  activeMenu,
  setActiveMenu,
}: NavDropdownProps) {
  const open = activeMenu === menuId;
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

  const toggle = () => {
    setActiveMenu(open ? null : menuId);
  };

  return (
    <li ref={ref} className="relative z-[60]">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setActiveMenu(menuId)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-1 py-1.5 text-sm font-medium transition-colors",
          open ? "text-white" : "text-slate-300 hover:text-white"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute top-full z-[70] mt-2 min-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <ul className="py-2">
              {items.map((item) => {
                const content = (
                  <>
                    <span className="flex items-center gap-2 font-medium text-white">
                      {item.label}
                      {item.external && <ExternalLink size={14} className="text-slate-400" />}
                      {item.comingSoon && (
                        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-400">
                          Soon
                        </span>
                      )}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs leading-snug text-slate-400">{item.description}</span>
                    )}
                  </>
                );
                const className =
                  "block px-4 py-3 text-left transition-colors hover:bg-white/[0.06] active:bg-white/[0.08]";

                if (item.external) {
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        onClick={() => setActiveMenu(null)}
                      >
                        {content}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link href={item.href} className={className} onClick={() => setActiveMenu(null)}>
                      {content}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

type MobileNavGroupProps = {
  menuId: string;
  label: string;
  items: NavDropdownItem[];
  mobileExpanded: string | null;
  setMobileExpanded: (id: string | null) => void;
  onNavigate: () => void;
};

export function MobileNavGroup({
  menuId,
  label,
  items,
  mobileExpanded,
  setMobileExpanded,
  onNavigate,
}: MobileNavGroupProps) {
  const expanded = mobileExpanded === menuId;
  return (
    <li>
      <button
        type="button"
        onClick={() => setMobileExpanded(expanded ? null : menuId)}
        className="flex w-full items-center justify-between rounded-lg py-2 text-lg font-medium text-slate-200"
      >
        {label}
        <ChevronDown size={20} className={cn("transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <ul className="mt-2 space-y-1 border-l border-white/10 pl-4">
          {items.map((item) =>
            item.external ? (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm text-slate-400 hover:text-white"
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm text-slate-400 hover:text-white"
                  onClick={onNavigate}
                >
                  {item.label}
                  {item.comingSoon && <span className="ml-2 text-xs text-amber-400">(Soon)</span>}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
}
