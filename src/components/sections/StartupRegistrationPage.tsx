import { motion, type Variants } from "framer-motion";
import {
  Building2,
  User,
  ArrowRight,
  CheckCircle2,
  Upload,
  Rocket,
  Briefcase,
  Globe,
  Phone,
  Mail,
} from "lucide-react";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[0.78rem] font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#F97316]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#F97316]/60 focus:ring-2 focus:ring-[#F97316]/10"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#F97316]">*</span>}
      </label>
      <select className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#F97316]/60 focus:ring-2 focus:ring-[#F97316]/10">
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  required = false,
  rows = 4,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#F97316]">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#F97316]/60 focus:ring-2 focus:ring-[#F97316]/10"
      />
    </div>
  );
}

const INDUSTRIES = [
  "Artificial Intelligence / ML", "AgriTech", "Climate Tech", "Consumer / D2C",
  "DeepTech / Hardware", "EdTech", "FinTech", "HealthTech / MedTech",
  "SaaS / Enterprise", "Robotics / IoT", "Cybersecurity", "Logistics / Supply Chain",
  "Social Impact", "Other",
];

const FUNDING_STAGES = [
  "Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B+",
];

const LEGAL_ENTITIES = [
  "Private Limited Company", "LLP", "One Person Company", "Partnership Firm",
  "Sole Proprietorship", "Not yet incorporated",
];

const TEAM_SIZES = ["Solo founder", "2 members", "3–5 members", "6–10 members", "10+ members"];

const BENEFITS = [
  { icon: Building2, title: "Office Space", desc: "Access to co-working and private offices at AHUB" },
  { icon: Briefcase, title: "Mentorship", desc: "1:1 sessions with industry experts and investors" },
  { icon: Globe, title: "Network Access", desc: "Entry into AHUB's ecosystem of 150+ partners" },
  { icon: Rocket, title: "Funding Support", desc: "Pitch days, grant applications, and investor introductions" },
];

export function StartupRegistrationPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF6F0] to-white pb-12 pt-28 md:pt-36">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#F97316]/8 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 top-12 h-60 w-60 rounded-full bg-[#FB923C]/8 blur-[70px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.2)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316] shadow-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316]/10 text-[8px]">✦</span>
            Startup Onboarding
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-[3.25rem]"
          >
            Register Your{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
              Startup
            </span>{" "}
            with AHUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500"
          >
            Join the Andhra University Incubation Council ecosystem. Complete your startup registration to access incubation, mentorship, and funding support.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="mx-auto mt-6 h-0.5 w-12 rounded-full bg-[#F97316]"
          />
        </div>
      </section>

      {/* ── Benefits Strip ───────────────────────────────── */}
      <section className="bg-white px-6 pb-8 pt-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-[#FAFAFA] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
                  <Icon size={18} className="text-[#F97316]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{title}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────────── */}
      <section className="bg-white px-6 pb-20 pt-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-[1fr_320px]"
          >

            {/* ── LEFT: Registration Form ── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_40px_-12px_rgba(249,115,22,0.12)] md:p-9"
            >
              {/* header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F97316]/12">
                  <Rocket size={20} style={{ color: ORANGE }} />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">Startup Registration Form</div>
                  <div className="text-[0.75rem] text-slate-500">AUIC Incubation Programme</div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-7">

                {/* Section 1: Founder Information */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">1</div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Founder Information</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="CEO / Founder Name" placeholder="Enter full name" required />
                    <Field label="Father's Name" placeholder="Enter father's name" />
                    <Field label="Email Address" placeholder="ceo@startup.com" type="email" required />
                    <Field label="Phone Number" placeholder="+91 XXXXX XXXXX" type="tel" required />
                    <Field label="Date of Birth" placeholder="DD/MM/YYYY" type="date" />
                    <Field label="Aadhaar Number" placeholder="XXXX XXXX XXXX" />
                    <Field label="LinkedIn Profile" placeholder="linkedin.com/in/..." className="sm:col-span-2" />
                    <TextAreaField
                      label="Physical / Postal Address"
                      placeholder="Enter full address including city, state, and pin code"
                      required
                      rows={2}
                    />
                  </div>
                </div>

                {/* Section 2: Co-founders */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">2</div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Co-Founders (if any)</span>
                  </div>
                  <TextAreaField
                    label="Co-founder Names & Aadhaar Numbers"
                    placeholder="List each co-founder's full name and Aadhaar number (one per line)"
                    rows={3}
                  />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <SelectField label="Team Size" options={TEAM_SIZES} />
                    <Field label="SPOC Name" placeholder="Single Point of Contact name" required />
                    <Field label="SPOC Contact Number" placeholder="+91 XXXXX XXXXX" type="tel" required />
                    <Field label="SPOC Email" placeholder="spoc@startup.com" type="email" />
                  </div>
                </div>

                {/* Section 3: Startup Information */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">3</div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Startup Information</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Startup / Venture Name" placeholder="Enter startup name" required />
                    <Field label="Year of Incorporation" placeholder="e.g. 2023" />
                    <SelectField label="Legal Entity Type" options={LEGAL_ENTITIES} required />
                    <Field label="CIN / Registration No." placeholder="Enter CIN or registration number" />
                    <SelectField label="Industry Category" options={INDUSTRIES} required />
                    <SelectField label="Current Funding Stage" options={FUNDING_STAGES} required />
                    <Field label="Website" placeholder="https://yourstartup.com" />
                    <Field label="Video URL (if any)" placeholder="YouTube / Drive link" />
                  </div>
                  <div className="mt-4 grid gap-4">
                    <TextAreaField
                      label="Brief Description of Startup"
                      placeholder="Describe your startup — what you build, who it's for, and the problem you solve."
                      required
                      rows={3}
                    />
                    <TextAreaField
                      label="Unique Value Proposition"
                      placeholder="What makes your solution different from existing alternatives?"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Section 4: Documents */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-bold text-white">4</div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Documents & Uploads</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Logo Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-slate-700">
                        Startup Logo <span className="text-[#F97316]">*</span>
                        <span className="ml-1 text-[0.7rem] font-normal text-slate-400">(max 10MB)</span>
                      </label>
                      <label className="group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-[#F97316]/50 hover:bg-[#FFF7F0]">
                        <Upload size={20} className="text-slate-400 group-hover:text-[#F97316] transition" />
                        <span className="text-xs text-slate-500">Upload Logo</span>
                        <input type="file" accept="image/*" className="sr-only" />
                      </label>
                    </div>

                    {/* Pitch Deck Upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-slate-700">
                        Pitch Deck
                        <span className="ml-1 text-[0.7rem] font-normal text-slate-400">(PDF / PPT)</span>
                      </label>
                      <label className="group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-[#F97316]/50 hover:bg-[#FFF7F0]">
                        <Upload size={20} className="text-slate-400 group-hover:text-[#F97316] transition" />
                        <span className="text-xs text-slate-500">Upload Deck</span>
                        <input type="file" accept=".pdf,.ppt,.pptx" className="sr-only" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(249,115,22,0.45)] active:scale-95"
                style={{ backgroundColor: ORANGE }}
              >
                <Rocket size={16} />
                Submit Registration
              </button>
              <p className="mt-3 text-center text-[0.72rem] text-slate-400">
                By submitting, you agree to our terms. We'll review and respond within 7 working days.
              </p>
            </motion.div>

            {/* ── RIGHT: Sidebar ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-5">

              {/* What you get */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-slate-800">What you get after registration</div>
                {[
                  "Dedicated incubation space & resources",
                  "Mentorship from industry experts",
                  "Access to investor network & funding",
                  "Legal & compliance guidance",
                  "Marketing & PR support",
                  "Participation in Demo Days",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 py-2 border-b border-slate-50 last:border-0">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[#F97316]" />
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-slate-800">Eligibility Criteria</div>
                {[
                  "Must be an Andhra University student, alumni, or faculty",
                  "Startup should be less than 5 years old",
                  "Innovation-driven product or service",
                  "Commitment to the 12-month incubation cycle",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 py-2 border-b border-slate-50 last:border-0">
                    <User size={13} className="mt-0.5 flex-shrink-0 text-[#F97316]" />
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="rounded-2xl bg-gradient-to-br from-[#FFF6F0] to-[#FFF0E4] border border-[rgba(249,115,22,0.15)] p-6">
                <div className="text-sm font-bold text-slate-800 mb-3">Need help?</div>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:incubation@ahub.in"
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#F97316] transition-colors"
                  >
                    <Mail size={13} className="text-[#F97316]" />
                    incubation@ahub.in
                  </a>
                  <a
                    href="tel:+918912345678"
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#F97316] transition-colors"
                  >
                    <Phone size={13} className="text-[#F97316]" />
                    +91 891 234 5678
                  </a>
                  <a
                    href="https://ahub.in"
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#F97316] transition-colors"
                  >
                    <Globe size={13} className="text-[#F97316]" />
                    ahub.in
                  </a>
                </div>
                <div className="mt-4 border-t border-[rgba(249,115,22,0.15)] pt-4">
                  <a
                    href="/programs/join-us"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:opacity-80 transition-opacity"
                  >
                    Also explore Join Us <ArrowRight size={12} />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
