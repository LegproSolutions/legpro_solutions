"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";
import { motion } from "framer-motion";
import { FileText, Mail, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-slate-550 text-slate-700 pt-2 pb-16 sm:pt-4 sm:pb-24 selection:bg-[#0A66C2] selection:text-white">
      <Container className="max-w-7xl px-0 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A66C2] hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#FF7A00]" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Header Card */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-lg"
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#0A66C2]/10 to-[#FF7A00]/10 blur-2xl pointer-events-none" />
            <div className="grid gap-6 md:grid-cols-12 items-center">
              {/* Left Side: Animated Heading */}
              <motion.div 
                className="md:col-span-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20">
                    <FileText className="h-6 w-6 text-[#FF7A00]" />
                  </div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#0A66C2]">Agreement</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-wide border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                  Terms of Service
                </h1>
                <p className="mt-2 text-xs text-slate-400 font-bold">
                  Effective Date: {formattedDate}
                </p>
              </motion.div>

              {/* Right Side: Animated Content */}
              <motion.div 
                className="md:col-span-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-base sm:text-lg text-slate-655 leading-relaxed text-justify">
                  Welcome to <strong className="text-slate-900 font-bold">{site.company.name}</strong>. By accessing or using our website, services, learning platforms, job portal, apprenticeship programs, or any related services, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please refrain from using our website and services.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <motion.div variants={itemVariants} className="space-y-6 text-left">
            
            {/* Section 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    By accessing this website, submitting information, applying for jobs, enrolling in training programs, or engaging with our services, you acknowledge that you have read, understood, and agreed to these Terms of Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Services Offered
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services provides workforce and business solutions, including but not limited to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-655 text-justify">
                    <li>Staffing & Recruitment Services</li>
                    <li>Talent Acquisition Solutions</li>
                    <li>Contractual Staffing</li>
                    <li>Apprenticeship Programs (NAPS & NATS)</li>
                    <li>Learning & Skill Development Programs</li>
                    <li>B.Voc & D.Voc Learn & Earn Programs</li>
                    <li>Job Portal & Career Services</li>
                    <li>Workforce Management Solutions</li>
                  </ul>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify pt-2">
                    The availability of services may change without prior notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    User Responsibilities
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Users agree to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-655 text-justify">
                    <li>Provide accurate and complete information.</li>
                    <li>Maintain the confidentiality of their account credentials, where applicable.</li>
                    <li>Use the website and services only for lawful purposes.</li>
                    <li>Refrain from submitting false, misleading, or fraudulent information.</li>
                    <li>Not engage in activities that may disrupt, damage, or interfere with the website or services.</li>
                  </ul>
                  <p className="text-xs text-slate-555 leading-relaxed text-justify pt-2">
                    LEGPRO Services reserves the right to suspend or terminate access if any misuse or violation of these terms is identified.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Opportunities
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services facilitates recruitment, apprenticeship, and learning opportunities; however, we do not guarantee employment, job placement, interviews, training outcomes, certifications, or career advancement unless explicitly stated under a specific program.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Selection decisions remain subject to employer requirements, eligibility criteria, performance assessments, and applicable regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Intellectual Property
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    All content available on this website, including text, graphics, logos, designs, images, documents, software, and other materials, is the property of LEGPRO Services or its licensors and is protected by applicable intellectual property laws.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Users may not copy, reproduce, distribute, modify, or commercially exploit any content without prior written permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Privacy Policy
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    The collection, use, and processing of personal information are governed by our Privacy Policy. By using our services, you consent to the practices described in the Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Third-Party Links
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Our website may contain links to third-party websites, applications, or services. LEGPRO Services is not responsible for the content, privacy practices, or terms of use of such third-party platforms.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Users access third-party services at their own discretion and risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Limitation of Liability
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of or inability to use our website, services, learning platforms, job portal, or related offerings.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    While we strive to provide accurate and reliable information, we do not guarantee uninterrupted access, error-free operation, or the completeness of information available on our platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Modifications
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services reserves the right to modify, suspend, discontinue, or update any part of its services, website content, or these Terms of Service at any time without prior notice.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Continued use of the website following such updates constitutes acceptance of the revised terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 10 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Governing Law
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    These Terms of Service shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from the use of our services shall be subject to the jurisdiction of the competent courts.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 11 (Contact) */}
            <div className="bg-white border-l-4 border-[#0A66C2] border-y border-r border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    <Mail className="h-5 w-5 text-[#FF7A00]" />
                    <span>Contact Details</span>
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-600 leading-relaxed text-sm text-justify">
                    For any questions regarding these Terms of Service, please contact us through the contact details available on our website.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold pt-2">
                    <div className="flex gap-2">
                      <span className="text-slate-555">Email:</span>
                      <a href={`mailto:${site.company.email}`} className="text-[#0A66C2] hover:underline font-bold">
                        {site.company.email}
                      </a>
                    </div>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <div className="flex gap-2">
                      <span className="text-slate-555">Phone:</span>
                      <a href={`tel:${site.company.phone}`} className="text-slate-900 hover:text-[#0A66C2] transition-colors font-bold">
                        {site.company.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Footer Text */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-slate-200 text-xs text-slate-500 leading-relaxed"
          >
            <p className="max-w-none text-justify">
              By accessing our website, using our services, applying for employment opportunities, enrolling in learning programs, or submitting information to LEGPRO Services, you acknowledge and agree to the terms outlined in this Terms of Service.
            </p>
            <p className="mt-4 font-extrabold text-[#0A66C2]">
              LEGPRO Services
            </p>
            <p className="italic text-slate-500 mt-1">
              Empowering Businesses Through People, Processes & Purpose.
            </p>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  );
}
