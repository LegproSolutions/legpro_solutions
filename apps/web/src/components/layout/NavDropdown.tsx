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
  icon?: any;
};

type NavDropdownProps = {
  menuId: string;
  label: string;
  items: NavDropdownItem[];
  align?: "left" | "right";
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
  isMega?: boolean;
};

export function NavDropdown({
  menuId,
  label,
  items,
  align = "left",
  activeMenu,
  setActiveMenu,
  isMega = false,
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
    <li ref={ref} className="relative z-[60] h-full flex items-center">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setActiveMenu(menuId)}
        className={cn(
          "relative group h-full flex items-center gap-1 px-2 xl:px-4 text-sm xl:text-[15px] font-semibold transition-colors duration-300",
          open ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-300 text-slate-400 group-hover:text-blue-600", open && "rotate-180")} />
        <span className={cn(
          "absolute bottom-0 left-1/2 h-[4px] -translate-x-1/2 rounded-t-full bg-blue-600 transition-all duration-300",
          open ? "w-8" : "w-0 group-hover:w-8"
        )} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute top-full z-[70] mt-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl",
              isMega ? "w-[680px] p-6 -left-12 lg:-left-24" : "min-w-[280px] py-2",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <ul className={cn(isMega ? "grid grid-cols-2 gap-4" : "flex flex-col")}>
              {items.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3 text-left">
                    {isMega && Icon && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600 transition-colors duration-300">
                        <Icon size={16} />
                      </div>
                    )}
                    <div>
                      <span className="flex items-center gap-1.5 font-bold text-slate-800 transition-colors group-hover/item:text-blue-600 text-sm">
                        {item.label}
                        {item.external && <ExternalLink size={13} className="text-slate-400" />}
                        {item.comingSoon && (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
                            Soon
                          </span>
                        )}
                      </span>
                      {item.description && (
                        <span className="mt-1 block text-xs leading-normal text-slate-500 line-clamp-2">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>
                );
                const className =
                  "group/item block px-4 py-3 rounded-xl transition-colors hover:bg-slate-50 active:bg-slate-100";

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
        className="flex w-full items-center justify-between rounded-lg py-2 text-lg font-semibold text-slate-800 hover:text-blue-600"
      >
        {label}
        <ChevronDown size={20} className={cn("transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <ul className="mt-2 space-y-1 border-l border-slate-100 pl-4">
          {items.map((item) =>
            item.external ? (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm text-slate-500 hover:text-blue-600"
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm text-slate-500 hover:text-blue-600"
                  onClick={onNavigate}
                >
                  {item.label}
                  {item.comingSoon && <span className="ml-2 text-xs text-amber-600">(Soon)</span>}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
}
