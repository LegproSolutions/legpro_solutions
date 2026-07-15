"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, ChevronDown } from "lucide-react";
import { submitContact } from "@/lib/api";
import { Section, Container } from "@/components/ui/Section";
import { motion } from "framer-motion";

export function ContactSection() {
  const [form, setForm] = useState({
    company: "",
    mobile: "",
    email: "",
    service: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Custom Validation
    if (!form.company.trim()) {
      setStatus("error");
      setErrorMsg("Name is required.");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!form.mobile.trim() || !/^\+?[0-9\s\-]{10,15}$/.test(form.mobile.replace(/\s+/g, ""))) {
      setStatus("error");
      setErrorMsg("Please enter a valid mobile number (at least 10 digits).");
      return;
    }
    if (!form.service) {
      setStatus("error");
      setErrorMsg("Please select a service.");
      return;
    }
    if (!form.description.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your message description.");
      return;
    }

    try {
      // Save locally in PostgreSQL database (reusable email service is triggered on backend)
      await submitContact({
        firstName: form.company.trim(),
        lastName: "Callback",
        email: form.email.trim(),
        company: form.company.trim(),
        message: `Mobile: ${form.mobile.trim()} | Service: ${form.service} | Description: ${form.description.trim()}`,
      });

      setStatus("success");
      setForm({ company: "", mobile: "", email: "", service: "", description: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  const servicesList = [
    "Talent Acquisition",
    "Contractual Staffing",
    "NAPS/NATS Solutions",
    "BVoc./ DVoc.",
    "Learning Skills",
  ];

  return (
    <Section id="contact" className="!py-16 bg-white border-t border-slate-100">
      <Container>
        {/* Main Title Header (Brand Blue color: #0A66C2) */}
        <div className="mb-12 text-left max-w-7xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0A66C2] tracking-wide uppercase">
            Connect with us, simply request a callback
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#0A66C2] rounded-full" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto items-start">
          {/* Left Column: Corporate Office Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white p-6 sm:p-8 rounded-2xl border-l-4 border-[#0A66C2] border-y border-r border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-wide">
                    Corporate Office :
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="h-5 w-5 text-[#0A66C2] shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-slate-600 leading-relaxed text-left">
                      G-05, H-36, Sector-63, Noida, Uttar Pradesh, 201301, India
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3.5">
                    <Phone className="h-5 w-5 text-[#0A66C2] shrink-0" />
                    <p className="text-sm font-semibold text-slate-600">
                      Call Us At :{" "}
                      <a href="tel:7303086551" className="hover:text-[#0A66C2] font-bold text-slate-800 transition-colors">
                        +91 73030 86551
                      </a>
                    </p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3.5">
                    <Mail className="h-5 w-5 text-[#0A66C2] shrink-0" />
                    <p className="text-sm font-semibold text-slate-600">
                      Mail Us At :{" "}
                      <a href="mailto:Prashant@legpro.co.in" className="hover:text-[#0A66C2] font-bold text-slate-800 transition-colors">
                        Reachus@legpro.co.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="mt-6 relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <iframe
                title="LEGPRO SERVICES Noida Office Map"
                src="https://maps.google.com/maps?q=LEGPRO+SERVICES,+H-36,+H+Block,+Sector+63,+Noida,+Uttar+Pradesh+201301&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-[250px] w-full rounded-xl border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Right Column: Callback Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Company Name */}
                <div className="text-left">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
                  <input
                    required
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-800 px-4 py-3 text-sm focus:border-[#0A66C2] focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/10 transition-all duration-200"
                    placeholder="Name"
                  />
                </div>

                {/* Mobile No */}
                <div className="text-left">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile No</label>
                  <input
                    required
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-800 px-4 py-3 text-sm focus:border-[#0A66C2] focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/10 transition-all duration-200"
                    placeholder="Mobile No"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Email ID */}
                <div className="text-left">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email ID</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-800 px-4 py-3 text-sm focus:border-[#0A66C2] focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/10 transition-all duration-200"
                    placeholder="Email ID"
                  />
                </div>

                {/* Services Dropdown */}
                <div className="text-left relative">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Services</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-800 px-4 py-3 text-sm focus:border-[#0A66C2] focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/10 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Services</option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 bottom-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="text-left">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white text-slate-800 px-4 py-3 text-sm focus:border-[#0A66C2] focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/10 transition-all duration-200 resize-none"
                  placeholder="Description"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-[#0A66C2] text-white font-bold py-3.5 hover:bg-blue-700 transition duration-200 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>{status === "loading" ? "Submitting..." : "Submit"}</span>
              </button>

              {status === "success" && (
                <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                  Thank you! We will get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
