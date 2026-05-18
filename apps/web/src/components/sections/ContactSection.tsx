"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { site, getWhatsAppUrl } from "@/lib/content";
import { submitContact } from "@/lib/api";
import { Section, SectionHeader, Container } from "@/components/ui/Section";

export function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Section id="contact" light>
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Connect with Our Recruitment Experts"
          description="We're here to assist you with tailored recruitment solutions."
          dark={false}
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">First Name *</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Last Name *</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Company</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
              <Send size={18} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && <p className="text-sm text-accent">Thank you! We will get back to you soon.</p>}
            {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
          </form>

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-slate-900">Phone</p>
                <a href={`tel:${site.company.phone}`} className="text-slate-600 hover:text-primary">
                  {site.company.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-slate-900">Email</p>
                <a href={`mailto:${site.company.email}`} className="text-slate-600 hover:text-primary">
                  {site.company.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-slate-900">Location</p>
                <p className="text-slate-600">{site.company.address}</p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex w-full justify-center"
            >
              Chat on WhatsApp
            </a>
            <iframe
              title="Legpro location"
              src="https://maps.google.com/maps?q=Ghaziabad%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-48 w-full rounded-xl border border-slate-200"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
