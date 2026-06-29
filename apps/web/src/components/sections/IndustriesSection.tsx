"use client";

import { motion } from "framer-motion";
import { Laptop, Factory, HeartPulse, ShoppingBag, Truck, Coins, Radio, ShoppingCart, type LucideIcon } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";

type Industry = {
  name: string;
  icon: LucideIcon;
  color: string;
  desc: string;
};

const industries: Industry[] = [
  {
    name: "IT & Technology",
    icon: Laptop,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    desc: "Software Developers, Cloud Architects, Cybersecurity Specialists, and Data Analysts.",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    color: "text-amber-600 bg-amber-50 border-amber-100",
    desc: "Plant Engineers, Quality Controllers, Operators, and Production Specialists.",
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50 border-rose-100",
    desc: "Medical Officers, Nurses, Lab Technicians, and Healthcare Administrative Staff.",
  },
  {
    name: "Retail",
    icon: ShoppingBag,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    desc: "Store Managers, Customer Representatives, and Merchandising Experts.",
  },
  {
    name: "Logistics",
    icon: Truck,
    color: "text-teal-600 bg-teal-50 border-teal-100",
    desc: "Supply Chain Managers, Inventory Experts, Fleet Operators, and Logistics Managers.",
  },
  {
    name: "BFSI",
    icon: Coins,
    color: "text-purple-600 bg-purple-50 border-purple-100",
    desc: "Financial Analysts, Wealth Managers, Risk Officers, and Banking Specialists.",
  },
  {
    name: "Telecom",
    icon: Radio,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    desc: "Network Architects, Telecom Engineers, Field Officers, and Support Executives.",
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    color: "text-pink-600 bg-pink-50 border-pink-100",
    desc: "Digital Marketers, Operations Experts, Delivery Coordinators, and Product Managers.",
  },
];

export function IndustriesSection() {
  return (
    <Section id="industries" className="!py-10 md:!py-12 bg-white border-y border-slate-100">
      <Container>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-black text-black uppercase tracking-wide">
            Industries We Serve
          </h2>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card glass-card-hover p-6 border-slate-200/60 relative overflow-hidden group flex flex-col items-start"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${ind.color}`}>
                  <Icon size={22} />
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-slate-900 tracking-tight">{ind.name}</h3>
                
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {ind.desc}
                </p>
                
                {/* Visual hover indicator */}
                <div className="absolute right-4 bottom-4 h-1.5 w-1.5 rounded-full bg-blue-600/40 scale-0 group-hover:scale-150 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
