import { motion, type Variants } from "framer-motion";
import {
  Rocket,
  Upload,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { usePublicPitchToUs } from "@/services/usePublicContent";

const GOLD = "#C9A84C";
const NAVY = "#0A1128";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const FALLBACK = {
  heroBadge: "Submit Your Pitch",
  heroTitle: 'Pitch Your Startup <em>With Confidence</em>',
  heroSubtitle: "Share your vision with AHUB AUIC. We evaluate every submission for potential, problem clarity, and founder readiness.",
  formTitle: "Startup Pitch Submission",
  formSubtitle: "Tell us about your venture",
  submitBtn: "Submit Pitch",
  formEmail: "pitch@ahub.in",
  evaluationCriteria: [
    "Clarity of problem and solution",
    "Founder passion and commitment",
    "Scalable business model",
    "Market size and opportunity",
    "Early validation or traction",
  ],
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
        className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-white px-4 py-3 text-sm text-[#0A1128] placeholder-[#706760]/60 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
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
      <select className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-white px-4 py-3 text-sm text-[#0A1128] outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 appearance-none cursor-pointer">
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
        className="resize-none rounded-xl border border-[rgba(201,168,76,0.2)] bg-white px-4 py-3 text-sm text-[#0A1128] placeholder-[#706760]/60 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
      />
    </div>
  );
}

const STAGES = [
  { icon: Lightbulb, title: "Idea Stage", desc: "Pre-revenue, building the concept" },
  { icon: TrendingUp, title: "Early Traction", desc: "Initial users / customers" },
  { icon: Users, title: "Growth Stage", desc: "Scaling product and team" },
  { icon: Rocket, title: "Revenue Positive", desc: "Sustainable business model" },
];

const SECTORS = [
  "Artificial Intelligence", "Climate Tech", "Consumer / D2C", "DeepTech",
  "EdTech", "FinTech", "HealthTech", "SaaS / B2B", "AgriTech", "Robotics",
  "Cybersecurity", "Other",
];

const PROCESS_STEPS = [
  { step: "01", title: "Submit Your Pitch", desc: "Fill this form with your startup's key details and upload your deck." },
  { step: "02", title: "Initial Screening", desc: "Our team reviews submissions within 5–7 business days." },
  { step: "03", title: "Evaluation Call", desc: "Shortlisted startups get a 30-min call with the AHUB panel." },
  { step: "04", title: "Decision & Next Steps", desc: "Selected teams receive incubation offer or feedback." },
];

export function PitchToUsPage() {
  const { data } = usePublicPitchToUs(FALLBACK);
  const c = data ?? FALLBACK;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#FAF7F2] pb-12 pt-28 md:pt-36">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 top-12 h-60 w-60 rounded-full bg-[#A8863A]/10 blur-[70px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.2)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#A8863A] shadow-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[8px]">✦</span>
            {c.heroBadge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0A1128] sm:text-5xl md:text-[3.25rem]"
            dangerouslySetInnerHTML={{ __html: c.heroTitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#706760]"
          >
            {c.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="mx-auto mt-6 h-0.5 w-12 rounded-full bg-[#C9A84C]"
          />
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────── */}
      <section className="bg-white px-6 pb-10 pt-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#FDFBF7] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="mb-3 text-3xl font-black text-[rgba(201,168,76,0.2)]">{s.step}</div>
                <div className="text-sm font-bold text-[#0A1128]">{s.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-[#706760]">{s.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#C9A84C]/40 md:block">
                    <ArrowRight size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Stage Cards ────────────────────────────── */}
      <section className="bg-white px-6 pb-20 pt-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-[1fr_340px]"
          >
            {/* ── LEFT: Pitch Form ── */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-white p-7 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] md:p-9"
            >
              {/* card header */}
              <div className="flex items-center gap-3 border-b border-[rgba(201,168,76,0.15)] pb-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10">
                  <Rocket size={20} style={{ color: GOLD }} />
                </div>
                <div>
                  <div className="text-base font-bold text-[#0A1128]">{c.formTitle}</div>
                  <div className="text-[0.75rem] text-[#706760]">{c.formSubtitle}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5">
                {/* Founder Details */}
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Founder Details</div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Founder Name" placeholder="Enter your full name" required />
                    <Field label="Email Address" placeholder="founder@startup.com" type="email" required />
                    <Field label="Phone Number" placeholder="+91 XXXXX XXXXX" type="tel" required />
                    <Field label="LinkedIn Profile" placeholder="linkedin.com/in/..." />
                  </div>
                </div>

                {/* Startup Details */}
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Startup Details</div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Startup Name" placeholder="Enter startup name" required />
                    <Field label="Website (if any)" placeholder="https://yourstartup.com" />
                    <SelectField label="Industry Category" options={SECTORS} required />
                    <Field label="Year Founded" placeholder="e.g. 2023" />
                    <Field label="Team Size" placeholder="e.g. 3 co-founders" />
                    <Field label="Current Revenue (optional)" placeholder="e.g. ₹5L ARR" />
                  </div>
                </div>

                {/* Pitch Details */}
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Pitch Details</div>
                  <div className="grid gap-4">
                    <TextAreaField label="Problem Statement" placeholder="What problem are you solving and for whom?" required rows={3} />
                    <TextAreaField label="Your Solution" placeholder="How does your product/service solve the problem uniquely?" required rows={3} />
                    <TextAreaField label="Traction & Milestones" placeholder="List any early customers, pilots, revenue, partnerships, or awards." rows={3} />
                    <TextAreaField label="Funding Ask (if any)" placeholder="How much are you raising and how will you use it?" rows={2} />
                  </div>
                </div>

                {/* Pitch Deck Upload */}
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">Attachments</div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.78rem] font-semibold text-slate-700">
                      Pitch Deck <span className="text-[#F97316]">*</span>
                      <span className="ml-2 text-[0.7rem] font-normal text-slate-400">(PDF / PPT, max 20MB)</span>
                    </label>
                    <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 transition hover:border-[#F97316]/50 hover:bg-[#FFF7F0]">
                      <Upload size={24} className="text-slate-400 transition group-hover:text-[#F97316]" />
                      <span className="text-sm font-medium text-slate-600">Drag & drop or click to upload</span>
                      <span className="text-xs text-slate-400">PDF or PowerPoint, max 20MB</span>
                      <input type="file" accept=".pdf,.ppt,.pptx" className="sr-only" />
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-[#0A1128] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(201,168,76,0.45)] active:scale-95 uppercase tracking-widest"
                style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #A8863A 100%)`, color: '#FFFFFF' }}
              >
                <FileText size={16} />
                {c.submitBtn}
              </button>
            </motion.div>

            {/* ── RIGHT: Stage + Info Cards ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">

              <div className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-[#0A1128]">What stage are you at?</div>
                <div className="grid grid-cols-1 gap-3">
                  {STAGES.map(({ icon: Icon, title, desc }) => (
                    <label
                      key={title}
                      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-[rgba(201,168,76,0.15)] p-3 transition hover:border-[#C9A84C]/50 hover:bg-[#FDFBF7]"
                    >
                      <input type="radio" name="stage" className="sr-only" />
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]/10 transition group-hover:bg-[#C9A84C]/20">
                        <Icon size={16} className="text-[#C9A84C]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0A1128]">{title}</div>
                        <div className="text-[0.7rem] text-[#706760]">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* What we look for */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-slate-800">What we look for</div>
                {c.evaluationCriteria.map((item: string) => (
                  <div key={item} className="flex items-start gap-2.5 py-2">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-[#F97316]" />
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="rounded-2xl bg-gradient-to-br from-[#FFF6F0] to-[#FFF0E4] border border-[rgba(249,115,22,0.15)] p-6">
                <div className="text-sm font-bold text-slate-800 mb-2">Have questions?</div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Reach out to our team before submitting if you have queries about the process.
                </p>
                <a
                  href={`mailto:${c.formEmail}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:opacity-80 transition-opacity"
                >
                  {c.formEmail} <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
