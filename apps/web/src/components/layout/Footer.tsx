"use client";

import Link from "next/link";
import Image from "next/image";
import { site, getWhatsAppUrl } from "@/lib/content";
import { Facebook, Instagram, Linkedin, Send, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gray-50 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Logo & Description */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <Link href="/" className="flex justify-center -my-6">
              <Image
                src="/legpro-logo.png"
                alt={site.company.brandLine}
                width={360}
                height={100}
                className="h-28 w-auto brightness-110 filter invert-[0.1] object-contain"
              />
            </Link>
            {site.footer.description && (
              <p className="text-sm leading-relaxed text-slate-400">
                {site.footer.description}
              </p>
            )}
            {/* Socials */}
            <div className="flex justify-center gap-4 pt-2">
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition duration-300 shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1877f2] hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition duration-300 shadow-sm">
                <Facebook size={18} />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-[#e1306c] hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c] transition duration-300 shadow-sm">
                <Instagram size={18} />
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#25d366] hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition duration-300 shadow-sm" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-800">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-accent transition">Services</Link></li>
              <li><a href="https://www.jobmela.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">Careers</a></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-800">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/talent-acquisition" className="hover:text-accent transition">Talent Acquisition</Link></li>
              <li><Link href="/contractual-staffing" className="hover:text-accent transition">Contractual Staffing</Link></li>
              <li><Link href="/naps-nats" className="hover:text-accent transition">NAPS/NATS</Link></li>
              <li><Link href="/bvoc-dvoc" className="hover:text-accent transition">BVoc./ DVoc.</Link></li>
              <li><Link href="/learning-staffing" className="hover:text-accent transition">Learning Skills</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-800">
                Contact Details
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-accent" />
                  <span>{site.company.phoneDisplay}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-accent" />
                  <a href={`mailto:${site.company.email}`} className="hover:text-accent transition">
                    {site.company.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>{site.company.address}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {site.company.legalName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
