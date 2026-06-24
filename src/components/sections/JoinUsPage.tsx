import { motion, type Variants } from "framer-motion";
import { Rocket, Users, Send, ArrowRight } from "lucide-react";
import { usePublicJoinUs } from "@/services/usePublicContent";

const ORANGE = "#e75710";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};


/* ── Fallback content (API returns superset of this shape) ── */
const FALLBACK = {
  heroEyebrow: "Together, We Build Innovation",
  heroTitle: "Join Us in Building <span>the <em>Future</em></span>",
  heroSubtitle: "Whether you're a founder, mentor, investor, or changemaker, there's a place for you in our ecosystem.",
  ctaTitle: "Let's create impact together.",
  ctaSubtitle: "We welcome passionate individuals and organizations who want to make a difference.",
  ctaBtn: "Contact Us",
  incubationCard: { title: "Incubation Registration", subtitle: "For startups and ventures" },
  joinCard: { title: "Join Us", subtitle: "Partner, collaborate or contribute" },
  submitBtn: "Submit Registration",
  joinSubmitBtn: "Submit",
};

/* ── Shared input style ── */
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
      <label className="text-[0.78rem] font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#e75710]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#e75710]/50 focus:ring-2 focus:ring-[#e75710]/10"
      />
    </div>
  );
}

function TextAreaField({ label, placeholder, required = false }: { label: string; placeholder: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-[#e75710]">*</span>}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#e75710]/50 focus:ring-2 focus:ring-[#e75710]/10 resize-none"
      />
    </div>
  );
}

/* ── Hero ── */
function HeroSection({ content, hero }: { content: typeof FALLBACK; hero?: any }) {
  const c = hero ?? content;
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF6F0] to-white pb-10 pt-28 md:pt-36">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#e75710]/8 blur-[80px]" />
      <div className="pointer-events-none absolute -right-24 top-8 h-52 w-52 rounded-full bg-[#FF9A5C]/8 blur-[60px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.72rem] font-bold uppercase tracking-[0.28em]"
          style={{ color: ORANGE }}
        >
          {c.heroEyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-[3.4rem] leading-tight"
          dangerouslySetInnerHTML={{ __html: c.heroTitle }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500"
        >
          {c.heroSubtitle}
        </motion.p>

        {/* orange line divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mx-auto mt-6 h-0.5 w-12 rounded-full"
          style={{ backgroundColor: ORANGE }}
        />
      </div>
    </section>
  );
}

/* ── LEFT: Incubation Registration form ── */
function IncubationForm({ content }: { content: typeof FALLBACK }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(231,87,16,0.15)] md:p-8"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${ORANGE}18` }}
        >
          <Rocket size={20} style={{ color: ORANGE }} />
        </div>
        <div>
          <div className="text-base font-bold text-slate-900">{content.incubationCard.title}</div>
          <div className="text-[0.75rem] text-slate-500">{content.incubationCard.subtitle}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <Field label="Startup / Venture Name" placeholder="Enter startup or venture name" required />
        <Field label="Name of CEO / Founder" placeholder="Enter name" required />
        <Field label="Name of the Founders" placeholder="Enter all founders' names" required />
        <Field label="CEO Father" placeholder="Enter CEO father's name" />
        <Field label="Physical Postal Address" placeholder="Enter full address" required />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email" placeholder="Enter email" type="email" required />
          <Field label="Contact Number of Founder / CEO" placeholder="Enter contact number" required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name of the SPOC" placeholder="Enter name" required />
          <Field label="Contact Number of the SPOC" placeholder="Enter contact number" required />
        </div>

        <TextAreaField
          label="Please list all co-founders (and their Aadhar numbers) of the company if any."
          placeholder="Enter details"
          required
        />

        <Field label="Website of Startup (if any)" placeholder="Enter website URL" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Video URL (if any)" placeholder="Enter video URL" />
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.78rem] font-medium text-slate-700">
              Startup Photograph / Logo (Less than 10MB)<span className="ml-0.5 text-[#e75710]">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-[#FFF0E8] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#e75710] hover:file:bg-[#FFE0C8] focus:border-[#e75710]/50"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-7 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(231,87,16,0.4)] active:scale-95"
        style={{ backgroundColor: ORANGE }}
      >
        {content.submitBtn}
      </button>
    </motion.div>
  );
}

/* ── RIGHT: Join Us form ── */
const JOIN_PURPOSES = [
  "Incubate",
  "Mentor",
  "Volunteer",
  "Network",
  "Invest",
  "CSR Partner",
  "Donate",
  "Advisory Board",
];

function JoinUsForm({ content }: { content: typeof FALLBACK }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(231,87,16,0.15)] md:p-8"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${ORANGE}18` }}
        >
          <Users size={20} style={{ color: ORANGE }} />
        </div>
        <div>
          <div className="text-base font-bold text-slate-900">{content.joinCard.title}</div>
          <div className="text-[0.75rem] text-slate-500">{content.joinCard.subtitle}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <Field label="Email" placeholder="Enter email" type="email" required />
        <Field label="Full Name" placeholder="Enter full name" required />
        <Field label="Phone" placeholder="Enter phone number" type="tel" required />

        {/* Purpose radio group */}
        <div className="flex flex-col gap-2">
          <label className="text-[0.78rem] font-medium text-slate-700">
            Purpose<span className="ml-0.5 text-[#e75710]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
            {JOIN_PURPOSES.map((purpose) => (
              <label
                key={purpose}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 group"
              >
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-300 transition group-hover:border-[#e75710]">
                  <input type="radio" name="purpose" value={purpose} className="sr-only" />
                  <span className="h-2 w-2 rounded-full opacity-0 group-hover:opacity-30" style={{ backgroundColor: ORANGE }} />
                </span>
                {purpose}
              </label>
            ))}
          </div>
        </div>

        <TextAreaField
          label="About you"
          placeholder="Please tell us something about you"
          required
        />
      </div>

      <button
        type="button"
        className="mt-7 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(231,87,16,0.4)] active:scale-95"
        style={{ backgroundColor: ORANGE }}
      >
        {content.joinSubmitBtn}
      </button>
    </motion.div>
  );
}

/* ── CTA Footer ── */
function CTABanner({ content }: { content: typeof FALLBACK }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="mx-auto max-w-7xl px-4 pb-16"
    >
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#e75710]/15 bg-[#FFF6F0] px-8 py-8 sm:flex-row sm:gap-4">
        <div className="flex items-center gap-5">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full shadow-md"
            style={{ backgroundColor: ORANGE }}
          >
            <Send size={22} className="text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{content.ctaTitle}</div>
            <p className="mt-0.5 max-w-sm text-sm leading-relaxed text-slate-500">
              {content.ctaSubtitle}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="group inline-flex flex-shrink-0 items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          style={{ borderColor: ORANGE, color: ORANGE }}
        >
          {content.ctaBtn}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.section>
  );
}

/* ── Main Export ── */
export function JoinUsPage() {
  const { data } = usePublicJoinUs(FALLBACK);
  const content = data ?? FALLBACK;

  return (
    <>
      <HeroSection content={FALLBACK} hero={data as any} />

      {/* Two-column form area */}
      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 lg:grid-cols-2"
          >
            <IncubationForm content={content} />
            <JoinUsForm content={content} />
          </motion.div>
        </div>
      </section>

      <CTABanner content={content} />
    </>
  );
}
