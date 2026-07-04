import { useState, useRef } from "react";
import { usePublicInternshipRegistration } from "@/services/usePublicContent";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  MapPin,
  Clock,
  Send,
  User,
  Mail,
  Calendar,
  Briefcase,
  Upload,
  FileCheck,
  Building,
  Award,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { resolveLegacyAsset } from "@/lib/assets";

type StartupInternship = {
  id: string;
  companyName: string;
  role: string;
  logo: string;
  duration: string;
  location: string;
  domain: string;
  status: "Open" | "Applied" | "New";
};

const DEFAULT_INTERNSHIPS: StartupInternship[] = [
  {
    id: "ib-ai",
    companyName: "InterviewBuddy",
    role: "AI Platform Intern",
    logo: resolveLegacyAsset("/src/assets/startups/interview buddy.png"),
    duration: "12 Weeks",
    location: "Remote",
    domain: "AI/ML",
    status: "Applied",
  },
  {
    id: "em-fe",
    companyName: "Edumoon",
    role: "Frontend Intern",
    logo: resolveLegacyAsset("/src/assets/startups/edumoon.png"),
    duration: "8 Weeks",
    location: "Hybrid",
    domain: "Frontend",
    status: "Open",
  },
  {
    id: "gd-be",
    companyName: "GreenDams",
    role: "Backend Intern",
    logo: resolveLegacyAsset("/src/assets/startups/greenjams_logo.jpg"),
    duration: "12 Weeks",
    location: "On-site",
    domain: "Backend",
    status: "Open",
  },
  {
    id: "pb-da",
    companyName: "Pick A Book",
      role: "Data Analyst Intern",
      logo: resolveLegacyAsset("/src/assets/startups/pick a book.png"),
      duration: "8 Weeks",
      location: "Remote",
      domain: "Data Science",
      status: "Open",
    },
    {
      id: "ta-ml",
      companyName: "Tierra Automations",
      role: "ML Ops Intern",
      logo: resolveLegacyAsset("/src/assets/startups/antar iot.png"),
      duration: "12 Weeks",
      location: "Hybrid",
      domain: "AI/ML",
      status: "Open",
    },
    {
      id: "sw-pd",
      companyName: "Swaya",
      role: "Product Design Intern",
      logo: resolveLegacyAsset("/src/assets/startups/sweya.png"),
      duration: "8 Weeks",
      location: "Remote",
      domain: "Product Design",
      status: "New",
    },
];

export function InternshipRegistrationPage() {
  const { data: internshipsData } = usePublicInternshipRegistration(DEFAULT_INTERNSHIPS);
  const [internships, setInternships] = useState<StartupInternship[]>(internshipsData ?? DEFAULT_INTERNSHIPS);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    skills: "",
    domain: "",
    motivation: "",
  });

  const [resumeName, setResumeName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleApplyClick = (internship: StartupInternship) => {
    setFormData((prev) => ({
      ...prev,
      domain: internship.domain,
    }));
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Update matching internship status to 'Applied'
    setInternships((prev) =>
      prev.map((item) => {
        if (item.domain === formData.domain && item.status !== "Applied") {
          return { ...item, status: "Applied" };
        }
        return item;
      })
    );

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        dob: "",
        skills: "",
        domain: "",
        motivation: "",
      });
      setResumeName("");
    }, 4500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-20 pt-28 md:pb-28 md:pt-32">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-36 top-20 h-96 w-96 rounded-full bg-[#F59E42]/8 blur-[100px]" />
        <div className="absolute -right-24 top-72 h-[480px] w-[480px] rounded-full bg-[#FFE8D0]/50 blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 h-[350px] w-[350px] rounded-full bg-[#FFF4E8]/60 blur-[100px]" />
      </div>

      <div className="relative site-container-wide">
        
        {/* PAGE HEADER */}
        <div className="relative flex flex-col items-center text-center">
          {/* Internships Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E42] bg-[#FFF8F2] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F59E42] shadow-sm"
          >
            <Calendar className="h-3.5 w-3.5" />
            INTERNSHIPS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-6 font-display text-4xl font-[800] tracking-tight text-[#2D1B1B] sm:text-5xl md:text-6xl lg:text-[72px] leading-tight"
          >
            Internship Opportunities
            <span className="absolute bottom-[-10px] left-1/2 h-[3.5px] w-36 -translate-x-1/2 rounded-full bg-[#F59E42]" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-xl text-sm leading-relaxed text-[#6C5E5B] sm:text-base md:text-lg"
          >
            Explore structured internship programs from top startups and build your career.
          </motion.p>

          {/* Dotted Minimal Patterns & Floating Rocket Illustrations */}
          <div className="absolute left-6 top-0 hidden lg:block opacity-45 pointer-events-none select-none">
            <svg width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="2" fill="#F59E42" />
              <circle cx="20" cy="5" r="2" fill="#F59E42" />
              <circle cx="35" cy="5" r="2" fill="#F59E42" />
              <circle cx="50" cy="5" r="2" fill="#F59E42" />
              <circle cx="5" cy="20" r="2" fill="#F59E42" />
              <circle cx="20" cy="20" r="2" fill="#F59E42" />
              <circle cx="35" cy="20" r="2" fill="#F59E42" />
              <circle cx="50" cy="20" r="2" fill="#F59E42" />
              <circle cx="5" cy="35" r="2" fill="#F59E42" />
              <circle cx="20" cy="35" r="2" fill="#F59E42" />
              <circle cx="35" cy="35" r="2" fill="#F59E42" />
              <circle cx="50" cy="35" r="2" fill="#F59E42" />
              <circle cx="5" cy="50" r="2" fill="#F59E42" />
              <circle cx="20" cy="50" r="2" fill="#F59E42" />
              <circle cx="35" cy="50" r="2" fill="#F59E42" />
              <circle cx="50" cy="50" r="2" fill="#F59E42" />
            </svg>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute right-8 top-[-20px] hidden lg:block text-[#F59E42] opacity-35"
          >
            <Rocket className="h-12 w-12 transform rotate-45" />
          </motion.div>
        </div>

        {/* INTERNSHIP OPPORTUNITIES GRID */}
        <section className="mt-16 sm:mt-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship, index) => (
              <motion.article
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/60 bg-white p-6 shadow-[0_12px_36px_-20px_rgba(45,27,27,0.06)] hover:border-[#F59E42]/20 hover:shadow-[0_20px_45px_-15px_rgba(245,158,66,0.16)] transition-all duration-300"
              >
                {/* Top Status Badge */}
                <span className={`absolute left-5 top-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  internship.status === "Applied"
                    ? "bg-[#DCFCE7] text-[#16A34A]"
                    : internship.status === "New"
                    ? "bg-[#FFF0E0] text-[#FF8800]"
                    : "bg-blue-50 text-blue-600"
                }`}>
                  {internship.status}
                </span>

                {/* Center: Large Centered Logo Container */}
                <div className="mt-6 flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-[20px] bg-[#FFF8F2] border border-[#F5E6D3]/30 p-4 shadow-sm group-hover:scale-103 transition duration-300">
                    <img
                      src={internship.logo}
                      alt={`${internship.companyName} logo`}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Company Name & Role */}
                <div className="mt-6 text-center">
                  <p className="text-xs font-semibold text-[#6C5E5B] tracking-wide">{internship.companyName}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#2D1B1B] leading-tight group-hover:text-[#F59E42] transition-colors">
                    {internship.role}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="mt-4 flex items-center justify-center gap-4 border-t border-slate-50 pt-4 text-xs font-medium text-[#6C5E5B]">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#F59E42]" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#F59E42]" />
                    <span>{internship.location}</span>
                  </div>
                </div>

                {/* Bottom CTA Arrow */}
                <button
                  type="button"
                  onClick={() => handleApplyClick(internship)}
                  className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-[#FDF8F2] text-slate-700 hover:text-white hover:bg-[#F59E42] group-hover:border-[#F59E42]/20 transition-all self-center shadow-sm"
                >
                  <ChevronRight className="h-5 w-5 transform transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        {/* REGISTRATION FORM SECTION */}
        <section ref={formRef} className="mt-16 sm:mt-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white p-6 sm:p-10 md:p-12 shadow-[0_24px_60px_-15px_rgba(45,27,27,0.08)]"
          >
            {/* Form Background Accent */}
            <div className="absolute top-[-30%] right-[-10%] h-[350px] w-[350px] rounded-full bg-[#FFF4E8]/20 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center text-center">
              <h2 className="relative inline-block text-2xl font-[900] text-[#2D1B1B] md:text-3xl">
                Registration Form
                <span className="absolute bottom-[-6px] left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-[#F59E42]" />
              </h2>
              <p className="mt-4 text-xs text-[#6C5E5B] sm:text-sm">
                Fill in your details to apply for internship opportunities.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-12 py-10 flex flex-col items-center text-center justify-center bg-[#FDF8F2]/60 rounded-[24px] border border-slate-100/50"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-200 animate-bounce">
                    <FileCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-[#2D1B1B]">
                    Application Submitted!
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#6C5E5B] sm:text-sm">
                    Thank you for applying. The respective startup team will review your application details, motiv-sheet, and resume and respond via email.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form-input"
                  onSubmit={handleFormSubmit}
                  className="mt-10 md:mt-12 space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Full Name</span>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g., John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Email */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Email Address</span>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g., john@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Date of Birth */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Date of Birth</span>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Skills */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Skills</span>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g., React, Python, SQL, Figma"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-11 pr-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        />
                      </div>
                    </label>

                    {/* Resume Upload */}
                    <div className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Resume Upload</span>
                      <div className="relative flex h-[50px] w-full items-center justify-between rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 pl-11 pr-4 outline-none transition hover:border-[#F59E42]">
                        <Upload className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <span className="truncate text-slate-600 font-normal">
                          {resumeName || "Upload your resume (PDF/DOC)"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required={!resumeName}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setResumeName(file.name);
                          }}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        <span className="rounded-lg bg-[#FFF4E8] px-2.5 py-1.5 text-[10px] font-bold text-[#F59E42] uppercase shadow-sm">
                          Browse
                        </span>
                      </div>
                    </div>

                    {/* Preferred Domain */}
                    <label className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                      <span>Preferred Domain</span>
                      <div className="relative">
                        <select
                          required
                          value={formData.domain}
                          onChange={(e) => {
                            setFormData({ ...formData, domain: e.target.value });
                          }}
                          className="w-full appearance-none rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 pl-4 pr-10 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                        >
                          <option value="">Select your preferred domain</option>
                          {["Frontend", "Backend", "AI/ML", "Data Science", "Product Design", "Marketing"].map((dom) => (
                            <option key={dom} value={dom}>
                              {dom}
                            </option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                      </div>
                    </label>
                  </div>

                  {/* Motivation */}
                  <label className="block flex flex-col gap-2 text-xs font-bold text-slate-700">
                    <span>Motivation</span>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us why you want this internship..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 p-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white"
                    />
                  </label>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(245,158,66,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-4px_rgba(245,158,66,0.45)] hover:brightness-105 active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Submit Application
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* BENEFITS STRIP */}
        <section className="mt-16 sm:mt-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Verified Opportunities",
                desc: "All internships are verified by our team.",
                icon: FileCheck,
                color: "bg-orange-50 text-[#F59E42]",
              },
              {
                title: "Top Startups",
                desc: "Work with innovative startups.",
                icon: Building,
                color: "bg-blue-50 text-blue-600",
              },
              {
                title: "Career Growth",
                desc: "Gain real-world experience and grow.",
                icon: TrendingUp,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "Certificate",
                desc: "Earn a completion certificate.",
                icon: Award,
                color: "bg-purple-50 text-[#8050FF]",
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col items-center text-center rounded-[20px] bg-white p-5 border border-white/80 shadow-[0_8px_20px_-8px_rgba(45,27,27,0.06)]"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${benefit.color} shadow-sm mb-4`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#2D1B1B]">{benefit.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#6C5E5B]">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
