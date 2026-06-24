import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  Video,
  FileText,
  User,
  PlusCircle,
  AlertCircle
} from "lucide-react";
import studentImg from "@/assets/ChatGPT Image May 29, 2026, 02_32_45 PM.png";

// Custom SVG Logos for Startups
const ZeptoLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 25C18.6274 25 24 19.6274 24 13C24 6.37258 18.6274 1 12 1C5.37258 1 0 6.37258 0 13C0 19.6274 5.37258 25 12 25Z" fill="#522C90" />
    <path d="M9 8H16L11 14H16L13 19H10L13 14H9V8Z" fill="#FFC72C" />
    <text x="30" y="20" fill="#522C90" className="font-extrabold text-[17px] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>zepto</text>
  </svg>
);

const RazorpayLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 25L14 3L26 25H16L12 18H5L2 25H0Z" fill="#0B72E7" />
    <path d="M14 11L10 17H5L10 11H14Z" fill="#00D2FF" />
    <text x="32" y="21" fill="#0B72E7" className="font-black text-[18px] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>Razorpay</text>
  </svg>
);

const CredLogo = () => (
  <svg viewBox="0 0 80 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="22" height="22" rx="4" fill="#111111" />
    <circle cx="11" cy="13" r="6" stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="28" y="19" fill="#111111" className="font-bold text-[17px] tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>CRED</text>
  </svg>
);

const GrowwLogo = () => (
  <svg viewBox="0 0 90 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="10" fill="#00D09C" />
    <path d="M7 16L11 12L13 14L17 9.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="28" y="20" fill="#092C3C" className="font-black text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>Groww</text>
  </svg>
);

const UrbanCompanyLogo = () => (
  <svg viewBox="0 0 140 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="18" height="18" fill="#000000" />
    <text x="5" y="18" fill="#FFFFFF" className="font-bold text-[12px]" style={{ fontFamily: "Inter, sans-serif" }}>UC</text>
    <text x="24" y="18" fill="#000000" className="font-bold text-[14px]" style={{ fontFamily: "Inter, sans-serif" }}>Urban Company</text>
  </svg>
);

const SwiggyLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.15 15.65C13.48 16.32 12.02 16.78 10.5 15.98C8.98 15.18 8.12 13.98 8.12 12.82C8.12 11.66 9.22 10.35 10.72 10.82C12.22 11.29 13.88 12.18 13.88 13.38C13.88 14.58 14.82 14.98 14.15 15.65Z" fill="#FC8019" />
    <text x="28" y="18" fill="#FC8019" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>SWIGGY</text>
  </svg>
);

const MeeshoLogo = () => (
  <svg viewBox="0 0 95 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 24L12 4L22 24H15L12 17L9 24H2Z" fill="#F43397" />
    <circle cx="12" cy="11" r="3" fill="#F43397" />
    <text x="28" y="20" fill="#F43397" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>meesho</text>
  </svg>
);

const CashfreeLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H2V18H18V2ZM16 16H4V4H16V16Z" fill="#0084FF" />
    <path d="M10 6H6V14H10V12H8V8H10V6Z" fill="#00D1FF" />
    <text x="26" y="18" fill="#0A2540" className="font-black text-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>cashfree</text>
  </svg>
);

const PorterLogo = () => (
  <svg viewBox="0 0 90 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="18" height="18" rx="3" fill="#004E9A" />
    <circle cx="9" cy="13" r="5" fill="#FFE600" />
    <text x="24" y="19" fill="#004E9A" className="font-extrabold text-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>PORTER</text>
  </svg>
);

const PwLogo = () => (
  <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="11" fill="#1C1E21" />
    <text x="6" y="18" fill="#FFFFFF" className="font-bold text-[12px] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>PW</text>
    <text x="30" y="19" fill="#1C1E21" className="font-extrabold text-[15px]" style={{ fontFamily: "Inter, sans-serif" }}>PhysicsWallah</text>
  </svg>
);

type StartupOpportunity = {
  id: string;
  name: string;
  role: string;
  duration: string;
  stipend: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  logoComponent: React.ComponentType;
};

const STARTUPS_DATA: StartupOpportunity[] = [
  { id: "zepto-pm", name: "Zepto", role: "Product Management Intern", duration: "3 - 6 Months", stipend: "₹40,000 / month", locationType: "Remote", logoComponent: ZeptoLogo },
  { id: "razorpay-eng", name: "Razorpay", role: "Engineering Intern", duration: "3 - 6 Months", stipend: "₹50,000 / month", locationType: "Hybrid", logoComponent: RazorpayLogo },
  { id: "cred-da", name: "CRED", role: "Data Analyst Intern", duration: "3 - 6 Months", stipend: "₹45,000 / month", locationType: "Hybrid", logoComponent: CredLogo },
  { id: "groww-swe", name: "Groww", role: "Software Engineer Intern", duration: "6 Months", stipend: "₹60,000 / month", locationType: "Hybrid", logoComponent: GrowwLogo },
  { id: "uc-design", name: "Urban Company", role: "Product Design Intern", duration: "3 Months", stipend: "₹35,000 / month", locationType: "Remote", logoComponent: UrbanCompanyLogo },
  { id: "swiggy-growth", name: "Swiggy", role: "Growth Marketing Intern", duration: "2 - 4 Months", stipend: "₹25,000 / month", locationType: "Remote", logoComponent: SwiggyLogo },
  { id: "meesho-ops", name: "Meesho", role: "Operations Management Associate", duration: "3 - 6 Months", stipend: "₹30,000 / month", locationType: "Hybrid", logoComponent: MeeshoLogo },
  { id: "cashfree-be", name: "Cashfree", role: "Backend Developer Intern", duration: "6 Months", stipend: "₹45,000 / month", locationType: "Remote", logoComponent: CashfreeLogo },
  { id: "porter-strategy", name: "Porter", role: "Founder's Office Strategy Intern", duration: "3 Months", stipend: "₹35,000 / month", locationType: "Hybrid", logoComponent: PorterLogo },
  { id: "pw-edu", name: "PhysicsWallah", role: "Educational Content Intern", duration: "3 Months", stipend: "₹20,000 / month", locationType: "Remote", logoComponent: PwLogo },
];

const ROADMAP_STEPS = [
  { id: "reg", title: "Internship Registration", date: "10 May 2026", desc: "Complete student profile and upload resume.", status: "completed" as const },
  { id: "screen", title: "Resume Screening", date: "15 May 2026", desc: "Shortlist matching candidates for interviews.", status: "completed" as const },
  { id: "test", title: "Assessment Test", date: "20 May 2026", desc: "Aptitude, problem solving, & coding skills.", status: "completed" as const },
  { id: "interview", title: "Interview Round", date: "28 May 2026", desc: "Technical panel interaction & product fit check.", status: "upcoming" as const },
  { id: "offer", title: "Offer Letter", date: "05 Jun 2026", desc: "Verify compensation, role outlines, and terms.", status: "upcoming" as const },
  { id: "start", title: "Internship Start", date: "15 Jun 2026", desc: "Kick off journey with portfolio startup onboarding.", status: "upcoming" as const },
];

export function StudentDashboardPage() {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Remote" | "Hybrid">("All");

  const toggleSave = (id: string) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs((prev) => [...prev, id]);
    }
  };

  const filteredOpportunities = STARTUPS_DATA.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "All" || job.locationType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen bg-[#FAF7F4] pb-24 pt-28 md:pt-32 font-['Inter',sans-serif]">
      {/* Decorative Blur Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-[10%] h-[500px] w-[500px] rounded-full bg-[#FF7A00]/5 blur-[120px]" />
        <div className="absolute top-[800px] right-[5%] h-[400px] w-[400px] rounded-full bg-orange-200/20 blur-[100px]" />
        <div className="absolute bottom-40 left-[20%] h-[350px] w-[350px] rounded-full bg-[#FFF1E0] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FF7A00] via-[#FF8D21] to-[#FF6B00] p-6 sm:p-10 lg:p-12 shadow-[0_24px_50px_-20px_rgba(255,122,0,0.3)]"
        >
          {/* Sparkles Decoration */}
          <div className="absolute top-6 left-6 text-white/20">
            <Sparkles className="h-10 w-10 animate-pulse" />
          </div>
          <div className="absolute bottom-8 right-12 text-white/10 hidden lg:block">
            <Sparkles className="h-16 w-16 animate-float" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[58%_42%] items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-tight">
                  Welcome Back, Student 👋
                </h1>
                <p className="mt-3 text-base sm:text-lg text-orange-50 font-medium">
                  Let&apos;s continue your journey towards your dream career at the country&apos;s top startup hubs.
                </p>
              </div>

              {/* Embedded Glassmorphism Stats card */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-orange-100 font-bold">Applied</span>
                  <div className="text-2xl font-extrabold">12</div>
                  <p className="text-[10px] text-emerald-300 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" /> +20%
                  </p>
                </div>
                <div className="space-y-1 border-l border-white/10 pl-4">
                  <span className="text-[10px] uppercase tracking-wider text-orange-100 font-bold">Interviews</span>
                  <div className="text-2xl font-extrabold">3</div>
                  <p className="text-[10px] text-amber-200 font-semibold">Tomorrow</p>
                </div>
                <div className="space-y-1 border-l border-white/10 pl-4">
                  <span className="text-[10px] uppercase tracking-wider text-orange-100 font-bold">Active Roles</span>
                  <div className="text-2xl font-extrabold">2</div>
                  <p className="text-[10px] text-emerald-300 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" /> +100%
                  </p>
                </div>
                <div className="space-y-1 border-l border-white/10 pl-4">
                  <span className="text-[10px] uppercase tracking-wider text-orange-100 font-bold">Completion</span>
                  <div className="text-2xl font-extrabold">85%</div>
                  <p className="text-[10px] text-emerald-300 font-semibold">On Track</p>
                </div>
              </div>
            </div>

            {/* Right Illustration Area */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Main Illustration Container */}
              <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-2xl bg-white/10 p-2 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden group shadow-2xl">
                <img
                  src={studentImg}
                  alt="Student illustration"
                  className="w-full h-full object-cover rounded-xl transition duration-500 group-hover:scale-102"
                />
                
                {/* Floating Widget: Next Milestone */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-3.5 shadow-xl backdrop-blur-md flex items-center gap-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white">
                    <Video className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#FF7A00] font-bold">Next Milestone</span>
                    <p className="truncate text-xs font-bold text-slate-900">Technical Interview Round</p>
                    <p className="text-[10px] text-slate-500">28 May 2026 · Razorpay</p>
                  </div>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase text-[#FF7A00]">
                    Live
                  </span>
                </motion.div>

                {/* Floating Widget: Progress Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4 rounded-xl border border-white/20 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur-sm flex items-center gap-2"
                >
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#FF7A00]" strokeDasharray="75, 100" strokeWidth="3.2" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-[8px] font-extrabold text-[#FF7A00]">75%</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-900 leading-none">Keep learning</p>
                    <p className="text-[8px] text-slate-400 mt-0.5">Journey Progress</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STATISTICS SECTION */}
        <section className="grid gap-5 grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Applications Submitted", val: "12", change: "+20%", label: "vs last month", icon: Briefcase, color: "text-[#FF7A00] bg-orange-50 border-orange-100/60" },
            { title: "Active Internships", val: "2", change: "+100%", label: "vs last month", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100/60" },
            { title: "Upcoming Interviews", val: "3", change: "Tomorrow", label: "Scheduled", icon: Video, color: "text-blue-600 bg-blue-50 border-blue-100/60" },
            { title: "Profile Completion", val: "85%", change: "+15%", label: "Profile status", icon: User, color: "text-purple-600 bg-purple-50 border-purple-100/60" }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.06)] backdrop-blur-sm hover:shadow-[0_16px_36px_-12px_rgba(255,122,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">{stat.title}</span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.color} border`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">{stat.val}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    stat.change.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </section>

        {/* WORKSPACE & OPPORTUNITIES GRID */}
        <section className="grid gap-8 lg:grid-cols-[68%_32%]">
          
          {/* STARTUP INTERNSHIP OPPORTUNITIES */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl flex items-center gap-2">
                  Startup Internship Opportunities
                  <span className="rounded-full bg-orange-100 text-[#FF7A00] text-xs font-black px-2.5 py-0.5">
                    {filteredOpportunities.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-500">Apply to live operational roles at active ecosystem startups</p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search role or startup..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-800 outline-none focus:border-[#FF7A00] min-w-[160px]"
                />
                <div className="rounded-xl border border-slate-200 bg-white p-0.5 flex gap-0.5">
                  {(["All", "Remote", "Hybrid"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFilterType(type)}
                      className={`rounded-lg px-3 py-1 text-[11px] font-bold transition-all ${
                        filterType === type
                          ? "bg-[#FF7A00] text-white"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredOpportunities.map((job, idx) => {
                  const Logo = job.logoComponent;
                  const isSaved = savedJobs.includes(job.id);
                  const isApplied = appliedJobs.includes(job.id);

                  return (
                    <motion.article
                      key={job.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-16px_rgba(255,122,0,0.12)] transition-all duration-300"
                    >
                      {/* Logo and Save button */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-16 w-32 items-center rounded-xl bg-slate-50/50 p-2.5 transition duration-300 group-hover:scale-[1.02]">
                          <Logo />
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSave(job.id)}
                          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                            isSaved
                              ? "bg-orange-50 text-[#FF7A00] border-orange-200"
                              : "bg-slate-50 text-slate-400 hover:text-slate-600 border-slate-100"
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                        </button>
                      </div>

                      {/* Internship Details */}
                      <div className="mt-4 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">{job.name}</span>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF7A00] transition-colors leading-tight">
                          {job.role}
                        </h3>
                      </div>

                      {/* Stipend and Metadata */}
                      <div className="mt-4 flex flex-wrap gap-2.5 items-center">
                        <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          {job.duration}
                        </span>
                        <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#FF7A00]">
                          {job.stipend}
                        </span>
                        <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                          job.locationType === "Remote"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {job.locationType}
                        </span>
                      </div>

                      {/* Apply button */}
                      <button
                        type="button"
                        onClick={() => handleApply(job.id)}
                        disabled={isApplied}
                        className={`mt-5 w-full rounded-2xl py-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isApplied
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100 cursor-default"
                            : "bg-[#FF7A00] hover:bg-[#E06C00] text-white shadow-sm hover:shadow-[0_12px_24px_-8px_rgba(255,122,0,0.4)]"
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Applied
                          </>
                        ) : (
                          <>
                            Apply Now <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ROADMAP TIMELINE */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">Your Roadmap</h2>
              <p className="text-xs text-slate-500">Track your internship process step-by-step</p>
            </div>

            <div className="relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.06)] backdrop-blur-sm overflow-hidden">
              {/* Timeline continuous vertical progress line */}
              <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-slate-100">
                <div className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-b from-[#FF7A00] to-orange-400 rounded-full" />
              </div>

              <div className="space-y-6 relative z-10">
                {ROADMAP_STEPS.map((step, idx) => {
                  const isCompleted = step.status === "completed";
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: idx * 0.05 }}
                      className="flex gap-4 items-start relative group"
                    >
                      {/* Node circle */}
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition duration-300 z-10 ${
                        isCompleted
                          ? "bg-orange-50 border-[#FF7A00] text-[#FF7A00] scale-105"
                          : "bg-white border-slate-200 text-slate-400 group-hover:border-[#FF7A00]/50"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-4.5 w-4.5 fill-current text-white text-[#FF7A00]" />
                        ) : (
                          <span className="text-[10px] font-extrabold">{idx + 1}</span>
                        )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-400">{step.date}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                            isCompleted ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-[#FF7A00]"
                          }`}>
                            {step.status}
                          </span>
                        </div>
                        <h4 className="mt-1 text-sm font-extrabold text-slate-800 group-hover:text-[#FF7A00] transition-colors">
                          {step.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM DASHBOARD WIDGETS */}
        <section className="grid gap-6 md:grid-cols-3">
          
          {/* Upcoming Deadlines */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-[#FF7A00]" /> Upcoming Deadlines
              </h3>
              <span className="text-[10px] font-bold text-slate-400">View all</span>
            </div>
            <div className="space-y-3.5">
              {[
                { name: "Zepto PM Intern", deadline: "3 days left", date: "30 May 2026", logoComponent: ZeptoLogo, priority: "high" },
                { name: "Razorpay Engineering Intern", deadline: "6 days left", date: "02 Jun 2026", logoComponent: RazorpayLogo, priority: "medium" },
                { name: "CRED Data Intern", deadline: "9 days left", date: "05 Jun 2026", logoComponent: CredLogo, priority: "low" }
              ].map((item, idx) => {
                const Logo = item.logoComponent;
                return (
                  <div key={item.name} className="flex items-center gap-3 rounded-2xl border border-slate-50 bg-slate-50/20 p-3 hover:border-orange-100 hover:bg-orange-50/10 transition duration-300">
                    <div className="flex h-10 w-16 items-center shrink-0 rounded-lg bg-white p-1.5 shadow-sm border border-slate-100/50">
                      <Logo />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-extrabold text-slate-800 leading-tight">{item.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                        item.priority === "high"
                          ? "bg-rose-50 text-rose-600"
                          : item.priority === "medium"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-[#FF7A00]" /> Recent Activity
              </h3>
              <span className="text-[10px] font-bold text-slate-400">View all</span>
            </div>
            <div className="space-y-4">
              {[
                { text: "Applied to Zepto PM Intern", time: "2 hours ago", details: "Application status updated to 'In Progress'" },
                { text: "Assessment test cleared", time: "1 day ago", details: "Razorpay Engineering: Shortlisted for Tech Panel" },
                { text: "Interview scheduled", time: "2 days ago", details: "Conducted via Google Meet with Razorpay Lead" }
              ].map((act) => (
                <div key={act.text} className="flex gap-3 relative">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF7A00]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-snug">{act.text}</p>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{act.details} · {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Startups */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-[#FF7A00]" /> Recommended Startups
              </h3>
              <span className="text-[10px] font-bold text-slate-400">Personalized</span>
            </div>
            <p className="text-[11px] text-slate-400">Based on your domain interests (Product & Software Development):</p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { id: "groww", logoComponent: GrowwLogo, label: "Groww" },
                { id: "swiggy", logoComponent: SwiggyLogo, label: "Swiggy" },
                { id: "cashfree", logoComponent: CashfreeLogo, label: "Cashfree" },
                { id: "meesho", logoComponent: MeeshoLogo, label: "Meesho" }
              ].map((item) => {
                const Logo = item.logoComponent;
                return (
                  <div key={item.id} className="flex items-center justify-center rounded-2xl border border-slate-50 bg-slate-50/20 p-3 h-14 hover:border-orange-100 hover:bg-orange-50/10 transition duration-300">
                    <Logo />
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
