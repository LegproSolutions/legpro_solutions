"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          className="space-y-8"
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
                    <ShieldCheck className="h-6 w-6 text-[#FF7A00]" />
                  </div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#0A66C2]">Trust & Security</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-wide border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                  Privacy Policy
                </h1>
              </motion.div>

              {/* Right Side: Animated Content */}
              <motion.div 
                className="md:col-span-8 space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-base sm:text-lg text-slate-655 leading-relaxed text-justify">
                  At <strong className="text-slate-900 font-bold">{site.company.name}</strong>, we respect the privacy of our clients, candidates, employees, learners, business partners, and website visitors. We are committed to maintaining the confidentiality, integrity, and security of the information entrusted to us.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  This Privacy Policy explains how LEGPRO Services collects, uses, stores, processes, and protects personal and professional information obtained through our website, recruitment activities, learning platforms, apprenticeship programs, job portals, and business operations.
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
                    Information We Collect
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    As part of our workforce and learning solutions, we may collect information including but not limited to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-655 text-justify">
                    <li>Name, contact details, and communication information</li>
                    <li>Educational qualifications and certifications</li>
                    <li>Employment history and professional experience</li>
                    <li>Resume/CV and job application details</li>
                    <li>Skill profiles and assessment information</li>
                    <li>Identity and verification documents where required</li>
                    <li>Information submitted through forms, registrations, job applications, learning platforms, and apprenticeship programs</li>
                    <li>Website usage data, IP addresses, browser information, and cookies</li>
                  </ul>
                  <p className="text-xs text-slate-550 leading-relaxed text-justify pt-2">
                    The information collected may be provided directly by individuals, employers, educational institutions, recruitment partners, training partners, or through our digital platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Purpose of Collection
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    The information collected by LEGPRO Services is used to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-655 text-justify">
                    <li>Provide staffing, recruitment, and talent acquisition services</li>
                    <li>Facilitate apprenticeship programs including NAPS and NATS</li>
                    <li>Deliver learning, training, and skill development solutions</li>
                    <li>Match candidates with suitable employment opportunities</li>
                    <li>Conduct assessments, interviews, and candidate evaluations</li>
                    <li>Manage workforce deployment and employee records</li>
                    <li>Improve our services, systems, and user experience</li>
                    <li>Communicate relevant employment, training, and business opportunities</li>
                    <li>Comply with applicable legal, statutory, and regulatory requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Sharing & Disclosure
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify font-semibold">
                    LEGPRO Services does not sell, rent, or trade personal information to third parties.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Information may be shared with:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-655 text-justify">
                    <li>Client organizations for recruitment and staffing purposes</li>
                    <li>Educational institutions and training partners</li>
                    <li>Government departments and regulatory authorities</li>
                    <li>Service providers supporting our operations</li>
                    <li>Technology partners operating recruitment, learning, or assessment platforms</li>
                  </ul>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify pt-2">
                    Such sharing is carried out only for legitimate business purposes and under appropriate confidentiality and data protection measures.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Data Security
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services maintains reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, misuse, disclosure, alteration, or destruction.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Access to personal information is restricted to authorized personnel who require such information to perform their responsibilities. While we strive to protect all information entrusted to us, no digital platform can guarantee complete security, and users are encouraged to exercise caution when sharing information online.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Cookies & Analytics
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, improve functionality, and understand visitor preferences.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Cookies help us improve website performance and deliver a better user experience. Users may choose to disable cookies through their browser settings; however, certain website features may not function optimally as a result.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Data Retention
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Personal information is retained only for as long as necessary to fulfill business, legal, regulatory, contractual, or operational requirements. Information may also be retained for maintaining records, resolving disputes, enforcing agreements, and complying with applicable laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    User Rights
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Individuals may request access to their personal information, correction of inaccurate information, or withdrawal of consent where applicable, subject to legal and contractual obligations.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services will make reasonable efforts to address such requests in accordance with applicable laws and business requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Third-Party Links
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    Our website may contain links to external websites, job portals, social media platforms, or third-party applications. LEGPRO Services is not responsible for the privacy practices, content, or policies of such external websites, and users are encouraged to review their respective privacy policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#0A66C2]/30 transition-colors duration-300 shadow-sm">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-[#0A66C2] tracking-wide uppercase border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    Policy Updates
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-slate-655 leading-relaxed text-sm text-justify">
                    LEGPRO Services reserves the right to update, amend, or modify this Privacy Policy at any time to reflect changes in business practices, technology, legal requirements, or service offerings. Updated versions will be published on this website and shall become effective upon publication.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 10 (Contact) */}
            <div className="bg-white border-l-4 border-[#0A66C2] border-y border-r border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-lg font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
                    <Mail className="h-5 w-5 text-[#FF7A00]" />
                    <span>Contact Us</span>
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <p className="text-slate-600 leading-relaxed text-sm text-justify">
                    For any questions, concerns, or requests related to this Privacy Policy or the handling of personal information, please contact LEGPRO Services through the contact details provided on our website.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold pt-2">
                    <div className="flex gap-2">
                      <span className="text-slate-550">Email:</span>
                      <a href={`mailto:${site.company.email}`} className="text-[#0A66C2] hover:underline font-bold">
                        {site.company.email}
                      </a>
                    </div>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <div className="flex gap-2">
                      <span className="text-slate-550">Phone:</span>
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
              By accessing our website, using our services, applying for employment opportunities, enrolling in learning programs, or submitting information to LEGPRO Services, you acknowledge and agree to the terms outlined in this Privacy Policy.
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
