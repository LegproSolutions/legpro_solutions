"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Building2,
  BadgeCheck,
  IndianRupee,
  Calendar,
  Linkedin,
  UploadCloud,
  FileCheck,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";
import { submitCandidateDetails, type CandidateInput } from "@/lib/api";

export interface CandidateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  jobTitle?: string;
}

export const PROFILE_CATEGORIES = [
  "HR & Recruitment",
  "Payroll",
  "HR Operations",
  "Supervisor",
  "Administration",
  "Accounts & Finance",
  "Operations",
  "Business Development",
  "Sales",
  "IT / Tech Support",
];

const QUALIFICATIONS = [
  "Graduate (B.Tech / B.E / B.Sc / B.Com / B.A / BBA / B.Voc)",
  "Post Graduate (MBA / M.Tech / MCA / M.Sc / M.Com)",
  "Diploma (Polytechnic / D.Voc / 3-Year Diploma)",
  "ITI (Technical Certification)",
  "12th Pass (Higher Secondary)",
  "10th Pass (High School)",
  "Chartered Accountant (CA / ICWA / CS)",
  "Doctorate / Ph.D",
  "Other Professional Qualification",
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0 Years)",
  "Less than 1 Year",
  "1 - 2 Years",
  "2 - 4 Years",
  "4 - 7 Years",
  "7 - 10 Years",
  "10+ Years",
];

const NOTICE_PERIOD_OPTIONS = [
  "Immediate Joiner",
  "15 Days or less",
  "30 Days (1 Month)",
  "45 Days",
  "60 Days (2 Months)",
  "90 Days (3 Months)",
  "Serving Notice Period",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function CandidateDetailsModal({
  isOpen,
  onClose,
  initialCategory,
  jobTitle,
}: CandidateDetailsModalProps) {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [highestQualification, setHighestQualification] = useState("");

  const [totalExperience, setTotalExperience] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [skills, setSkills] = useState("");

  const [profileCategory, setProfileCategory] = useState(initialCategory || "HR & Recruitment");
  const [preferredRole, setPreferredRole] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notes, setNotes] = useState("");

  // Resume state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);

  // States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep initial category and jobTitle synced
  useEffect(() => {
    if (initialCategory) {
      setProfileCategory(initialCategory);
    }
    if (jobTitle) {
      setPreferredRole(jobTitle);
    }
  }, [initialCategory, jobTitle]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting && !isSuccess) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, isSuccess, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setTouched({});
      setServerError(null);
      setIsSuccess(false);
      if (initialCategory) setProfileCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "mobileNumber":
        if (!value.trim()) return "Mobile number is required";
        const cleanPhone = value.replace(/[\s-]/g, "");
        if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/.test(cleanPhone) || cleanPhone.length < 10) {
          return "Please enter a valid 10-digit mobile number";
        }
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";
      case "currentLocation":
        if (!value.trim()) return "Current location is required";
        return "";
      case "highestQualification":
        if (!value.trim()) return "Please select your highest qualification";
        return "";
      case "totalExperience":
        if (!value.trim()) return "Please select total experience";
        return "";
      case "currentCompany":
        if (!value.trim()) return "Current or previous company is required";
        return "";
      case "currentDesignation":
        return "";
      case "skills":
        if (!value.trim()) return "Key skills are required";
        return "";
      case "profileCategory":
        if (!value.trim()) return "Please select a profile category";
        return "";
      case "preferredLocation":
        if (!value.trim()) return "Preferred location is required";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Allowed formats are PDF, DOC, or DOCX only.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        resume: "Resume size must be less than 5 MB.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, resume: "" }));
    setResumeFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setResumeBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", fullName),
      mobileNumber: validateField("mobileNumber", mobileNumber),
      email: validateField("email", email),
      currentLocation: validateField("currentLocation", currentLocation),
      highestQualification: validateField("highestQualification", highestQualification),
      totalExperience: validateField("totalExperience", totalExperience),
      currentCompany: validateField("currentCompany", currentCompany),
      currentDesignation: "",
      skills: validateField("skills", skills),
      profileCategory: validateField("profileCategory", profileCategory),
      preferredLocation: validateField("preferredLocation", preferredLocation),
    };

    setTouched({
      fullName: true,
      mobileNumber: true,
      email: true,
      currentLocation: true,
      highestQualification: true,
      totalExperience: true,
      currentCompany: true,
      currentDesignation: true,
      skills: true,
      profileCategory: true,
      preferredLocation: true,
    });

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const payload: CandidateInput = {
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim().toLowerCase(),
      currentLocation: currentLocation.trim(),
      highestQualification: highestQualification.trim(),
      totalExperience: totalExperience.trim(),
      currentCompany: currentCompany.trim(),
      currentDesignation: currentDesignation.trim(),
      skills: skills.trim(),
      profileCategory: profileCategory.trim(),
      preferredRole: preferredRole.trim() || profileCategory.trim(),
      preferredLocation: preferredLocation.trim(),
      currentCtc: currentCtc.trim() || null,
      expectedCtc: expectedCtc.trim() || null,
      noticePeriod: noticePeriod.trim() || null,
      linkedinUrl: linkedinUrl.trim() || null,
      resumeFilename: resumeFile ? resumeFile.name : null,
      resumeData: resumeBase64 || null,
      resumeMimeType: resumeFile ? resumeFile.type : null,
      notes: notes.trim() || null,
    };

    try {
      await submitCandidateDetails(payload);
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not save your profile. Please check your connection and try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirectToJobMela = () => {
    window.open("https://jobmela.co.in", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!isSubmitting && !isSuccess) onClose();
            }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-3xl rounded-2xl md:rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#04142B] via-[#0A1F44] to-[#1E40FF] px-6 py-6 sm:px-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur-sm border border-white/10 mb-2">
                    <Sparkles size={13} className="text-teal-300" />
                    <span>Permanent Talent Pool Registration</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white Poppins">
                    Join Our Talent Pool
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-200">
                    Registering under: <span className="font-semibold text-teal-300">{profileCategory}</span>
                  </p>
                </div>

                {!isSubmitting && !isSuccess && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition active:scale-95 shrink-0"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-7 md:p-8 max-h-[calc(85vh-100px)] overflow-y-auto">
              {/* SUCCESS VIEW */}
              {isSuccess ? (
                <div className="py-6 sm:py-10 text-center flex flex-col items-center max-w-lg mx-auto">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-lg shadow-emerald-500/10 animate-bounce">
                    <CheckCircle2 size={40} className="sm:w-11 sm:h-11" />
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold text-slate-800 font-display">
                    Thank You for Joining Our Talent Pool!
                  </h4>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Your profile has been successfully submitted and added to our talent pool. Our HR team will contact you when a suitable opportunity becomes available.
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={handleRedirectToJobMela}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition"
                    >
                      <span>Click Here for More Jobs</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* FORM VIEW */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {serverError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-3 text-sm text-red-700">
                      <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* SECTION 1: ROLE CATEGORY & PREFERENCES */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <Layers size={14} /> Profile Category & Role
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Profile Category */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Profile Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={profileCategory}
                          onChange={(e) => setProfileCategory(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer"
                        >
                          {PROFILE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Job Role */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Preferred Job Role / Title <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={preferredRole}
                          onChange={(e) => setPreferredRole(e.target.value)}
                          placeholder="e.g. HR Executive / Accounts Manager"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: PERSONAL & CONTACT INFORMATION */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <User size={14} /> Personal & Contact Details
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (touched.fullName) {
                                setErrors((prev) => ({
                                  ...prev,
                                  fullName: validateField("fullName", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("fullName", fullName)}
                            placeholder="e.g. Rahul Sharma"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.fullName && errors.fullName
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.fullName && errors.fullName && (
                          <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => {
                              setMobileNumber(e.target.value);
                              if (touched.mobileNumber) {
                                setErrors((prev) => ({
                                  ...prev,
                                  mobileNumber: validateField("mobileNumber", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("mobileNumber", mobileNumber)}
                            placeholder="e.g. 9876543210"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.mobileNumber && errors.mobileNumber
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.mobileNumber && errors.mobileNumber && (
                          <p className="mt-1 text-xs text-red-600">{errors.mobileNumber}</p>
                        )}
                      </div>

                      {/* Email ID */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (touched.email) {
                                setErrors((prev) => ({
                                  ...prev,
                                  email: validateField("email", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("email", email)}
                            placeholder="e.g. rahul@example.com"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.email && errors.email
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.email && errors.email && (
                          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* Current Location */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Current Location (City/State) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={currentLocation}
                            onChange={(e) => {
                              setCurrentLocation(e.target.value);
                              if (touched.currentLocation) {
                                setErrors((prev) => ({
                                  ...prev,
                                  currentLocation: validateField("currentLocation", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("currentLocation", currentLocation)}
                            placeholder="e.g. Noida / Delhi NCR / Bangalore"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.currentLocation && errors.currentLocation
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.currentLocation && errors.currentLocation && (
                          <p className="mt-1 text-xs text-red-600">{errors.currentLocation}</p>
                        )}
                      </div>

                      {/* Highest Qualification */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Highest Qualification <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <GraduationCap size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <select
                            value={highestQualification}
                            onChange={(e) => {
                              setHighestQualification(e.target.value);
                              if (touched.highestQualification) {
                                setErrors((prev) => ({
                                  ...prev,
                                  highestQualification: validateField("highestQualification", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("highestQualification", highestQualification)}
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition cursor-pointer appearance-none ${
                              touched.highestQualification && errors.highestQualification
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          >
                            <option value="">Select Qualification</option>
                            {QUALIFICATIONS.map((q) => (
                              <option key={q} value={q}>
                                {q}
                              </option>
                            ))}
                          </select>
                        </div>
                        {touched.highestQualification && errors.highestQualification && (
                          <p className="mt-1 text-xs text-red-600">{errors.highestQualification}</p>
                        )}
                      </div>

                      {/* Preferred Location */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Preferred Work Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={preferredLocation}
                            onChange={(e) => {
                              setPreferredLocation(e.target.value);
                              if (touched.preferredLocation) {
                                setErrors((prev) => ({
                                  ...prev,
                                  preferredLocation: validateField("preferredLocation", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("preferredLocation", preferredLocation)}
                            placeholder="e.g. Delhi NCR / Pune / Anywhere in India"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.preferredLocation && errors.preferredLocation
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.preferredLocation && errors.preferredLocation && (
                          <p className="mt-1 text-xs text-red-600">{errors.preferredLocation}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: PROFESSIONAL EXPERIENCE & SKILLS */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <Briefcase size={14} /> Professional Experience & Skills
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Total Experience */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Total Experience <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={totalExperience}
                          onChange={(e) => {
                            setTotalExperience(e.target.value);
                            if (touched.totalExperience) {
                              setErrors((prev) => ({
                                ...prev,
                                totalExperience: validateField("totalExperience", e.target.value),
                              }));
                            }
                          }}
                          onBlur={() => handleBlur("totalExperience", totalExperience)}
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition cursor-pointer ${
                            touched.totalExperience && errors.totalExperience
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-blue-600"
                          }`}
                        >
                          <option value="">Select Experience</option>
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {touched.totalExperience && errors.totalExperience && (
                          <p className="mt-1 text-xs text-red-600">{errors.totalExperience}</p>
                        )}
                      </div>

                      {/* Current/Previous Company */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Current/Recent Company <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={currentCompany}
                            onChange={(e) => {
                              setCurrentCompany(e.target.value);
                              if (touched.currentCompany) {
                                setErrors((prev) => ({
                                  ...prev,
                                  currentCompany: validateField("currentCompany", e.target.value),
                                }));
                              }
                            }}
                            onBlur={() => handleBlur("currentCompany", currentCompany)}
                            placeholder="e.g. Tata / Freelance / None"
                            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                              touched.currentCompany && errors.currentCompany
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-blue-600"
                            }`}
                          />
                        </div>
                        {touched.currentCompany && errors.currentCompany && (
                          <p className="mt-1 text-xs text-red-600">{errors.currentCompany}</p>
                        )}
                      </div>

                      {/* Current/Previous Designation */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Current/Recent Designation <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <BadgeCheck size={16} className="absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={currentDesignation}
                            onChange={(e) => setCurrentDesignation(e.target.value)}
                            placeholder="e.g. HR Recruiter / Fresher"
                            className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Key Skills & Competencies <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => {
                          setSkills(e.target.value);
                          if (touched.skills) {
                            setErrors((prev) => ({
                              ...prev,
                              skills: validateField("skills", e.target.value),
                            }));
                          }
                        }}
                        onBlur={() => handleBlur("skills", skills)}
                        placeholder="e.g. Recruitment, Screening, MS Excel, Payroll, Communication (comma separated)"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition ${
                          touched.skills && errors.skills
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                      />
                      {touched.skills && errors.skills && (
                        <p className="mt-1 text-xs text-red-600">{errors.skills}</p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 4: COMPENSATION & NOTICE PERIOD */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <IndianRupee size={14} /> Compensation & Notice Period
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Current Salary / CTC */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Current CTC <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={currentCtc}
                          onChange={(e) => setCurrentCtc(e.target.value)}
                          placeholder="e.g. 3.5 LPA / Negotiable"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition placeholder:text-slate-400"
                        />
                      </div>

                      {/* Expected Salary / CTC */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Expected CTC <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={expectedCtc}
                          onChange={(e) => setExpectedCtc(e.target.value)}
                          placeholder="e.g. 5.0 LPA / As per norm"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition placeholder:text-slate-400"
                        />
                      </div>

                      {/* Notice Period */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                          Notice Period <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          value={noticePeriod}
                          onChange={(e) => setNoticePeriod(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer"
                        >
                          <option value="">Select Notice Period</option>
                          {NOTICE_PERIOD_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: RESUME & LINKEDIN */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <FileText size={14} /> Resume & Online Profile
                    </h5>

                    {/* LinkedIn Profile */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        LinkedIn Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Linkedin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="e.g. https://www.linkedin.com/in/rahulsharma"
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Upload Resume <span className="text-slate-400 font-normal">(PDF, DOC, DOCX up to 5MB)</span>
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {resumeFile ? (
                        <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-3 transition">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                              <FileCheck size={20} />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                                {resumeFile.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="rounded-lg p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition active:scale-95 shrink-0"
                            title="Remove resume"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 p-4 transition text-center group"
                        >
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 transition mb-2">
                            <UploadCloud size={20} />
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-blue-600 transition">
                            Click to browse & upload resume
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Supports PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                      )}

                      {errors.resume && (
                        <p className="mt-1 text-xs text-red-600">{errors.resume}</p>
                      )}
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    <span>
                      Your candidate profile is stored permanently in our Talent Pool. Our HR team will reach out directly as opportunities matching your profile emerge.
                    </span>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="order-2 sm:order-1 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition active:scale-98 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="order-1 sm:order-2 flex-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:opacity-95 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Adding to Talent Pool...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Profile to Talent Pool</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
