import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Rocket, Upload, ArrowRight, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/services/api";

const GOLD = "#C9A84C";
const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const PROCESS_STEPS = [
  { step: "01", title: "Submit Your Pitch", desc: "Fill this form with your startup's key details and upload your deck." },
  { step: "02", title: "Initial Screening", desc: "Our team reviews submissions within 5–7 business days." },
  { step: "03", title: "Evaluation Call", desc: "Shortlisted startups get a 30-min call with the AHUB panel." },
  { step: "04", title: "Decision & Next Steps", desc: "Selected teams receive incubation offer or feedback." },
];

const EVALUATION_CRITERIA = [
  "Clarity of problem and solution",
  "Founder passion and commitment",
  "Scalable business model",
  "Market size and opportunity",
  "Early validation or traction",
];

const FALLBACK_FIELDS = [
  { id: "founder_name", type: "text", label: "Founder Name", placeholder: "Enter your full name", required: true, order: 0, accept: null },
  { id: "email", type: "email", label: "Email Address", placeholder: "founder@startup.com", required: true, order: 1, accept: null },
  { id: "phone", type: "phone", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", required: true, order: 2, accept: null },
  { id: "linkedin", type: "url", label: "LinkedIn Profile", placeholder: "linkedin.com/in/...", required: false, order: 3, accept: null },
  { id: "startup_name", type: "text", label: "Startup Name", placeholder: "Enter startup name", required: true, order: 4, accept: null },
  { id: "website", type: "url", label: "Website (if any)", placeholder: "https://yourstartup.com", required: false, order: 5, accept: null },
  { id: "industry", type: "select", label: "Industry Category", placeholder: "Select your industry", required: true, order: 6, accept: null, options: ["Artificial Intelligence", "Climate Tech", "Consumer / D2C", "DeepTech", "EdTech", "FinTech", "HealthTech", "SaaS / B2B", "AgriTech", "Robotics", "Cybersecurity", "Other"] },
  { id: "year_founded", type: "text", label: "Year Founded", placeholder: "e.g. 2023", required: false, order: 7, accept: null },
  { id: "team_size", type: "text", label: "Team Size", placeholder: "e.g. 3 co-founders", required: false, order: 8, accept: null },
  { id: "revenue", type: "text", label: "Current Revenue (optional)", placeholder: "e.g. ₹5L ARR", required: false, order: 9, accept: null },
  { id: "stage", type: "radio", label: "What stage are you at?", placeholder: "Select your stage", required: true, order: 10, accept: null, options: ["Idea Stage", "Early Traction", "Growth Stage", "Revenue Positive"] },
  { id: "problem_statement", type: "textarea", label: "Problem Statement", placeholder: "What problem are you solving and for whom?", required: true, order: 11, accept: null },
  { id: "solution", type: "textarea", label: "Your Solution", placeholder: "How does your product/service solve the problem uniquely?", required: true, order: 12, accept: null },
  { id: "traction", type: "textarea", label: "Traction & Milestones", placeholder: "List any early customers, pilots, revenue, partnerships, or awards.", required: false, order: 13, accept: null },
  { id: "funding_ask", type: "textarea", label: "Funding Ask (if any)", placeholder: "How much are you raising and how will you use it?", required: false, order: 14, accept: null },
  { id: "pitch_deck", type: "file", label: "Pitch Deck", placeholder: "Upload PDF / PPT, max 20MB", required: true, order: 15, accept: ".pdf,.ppt,.pptx" },
];

/* ── Dynamic Field Renderer ───────────────────────────────── */

function DynamicField({
  field, value, onChange, theme,
}: {
  field: any;
  value: string;
  onChange: (val: string) => void;
  theme: "gold" | "orange";
}) {
  const accent = theme === "gold" ? GOLD : ORANGE;
  const baseInput =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 placeholder:text-[#706760]/60";
  const borderFocus = theme === "gold"
    ? "border-[rgba(201,168,76,0.2)] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 text-[#0A1128]"
    : "border-slate-200 focus:border-[#e75710]/50 focus:ring-[#e75710]/10 text-slate-800";

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5" style={{ color: accent }}>*</span>}
        </label>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${baseInput} ${borderFocus} resize-none`}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5" style={{ color: accent }}>*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInput} ${borderFocus} appearance-none cursor-pointer`}
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {(field.options || []).map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5" style={{ color: accent }}>*</span>}
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {(field.options || []).map((opt: string) => (
            <label
              key={opt}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                value === opt ? "border-[#C9A84C]/50 bg-[#FDFBF7]" : "border-[rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50 hover:bg-[#FDFBF7]"
              }`}
            >
              <input
                type="radio"
                name={field.id}
                value={opt}
                checked={value === opt}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]/10">
                <span className={`text-[10px] font-bold ${value === opt ? "text-[#C9A84C]" : "text-[#C9A84C]/60"}`}>
                  {opt === "Idea Stage" ? "💡" : opt === "Early Traction" ? "📈" : opt === "Growth Stage" ? "🚀" : "💰"}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0A1128]">{opt}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "file") {
    const isImage = value && typeof value === "string" && value.startsWith("data:image");
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5" style={{ color: accent }}>*</span>}
          <span className="ml-2 text-[0.7rem] font-normal text-slate-400">({field.placeholder})</span>
        </label>
        <div className="flex flex-col gap-2">
          {isImage && (
            <img src={value} alt="Preview" className="h-28 w-28 rounded-lg border border-slate-200 object-cover" />
          )}
          <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 transition hover:border-[#F97316]/50 hover:bg-[#FFF7F0]">
            <Upload size={24} className="text-slate-400 transition group-hover:text-[#F97316]" />
            <span className="text-sm font-medium text-slate-600">Drag & drop or click to upload</span>
            <span className="text-xs text-slate-400">{field.placeholder}</span>
            <input
              type="file"
              accept={field.accept || "*/*"}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 20 * 1024 * 1024) {
                  alert("File exceeds 20 MB limit");
                  e.target.value = "";
                  return;
                }
                const b64 = await new Promise<string>((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.readAsDataURL(file);
                });
                onChange(b64);
              }}
              className="sr-only"
            />
          </label>
          {value && typeof value === "string" && value.length > 100 && (
            <span className="text-[10px] text-green-600">File attached ({(value.length * 0.75 / 1024).toFixed(0)} KB)</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5" style={{ color: accent }}>*</span>}
      </label>
      <input
        type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`${baseInput} ${borderFocus}`}
      />
    </div>
  );
}

/* ── Main Export ── */

export function PitchToUsPage() {
  const [config, setConfig] = useState<any>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fields = config?.fields || FALLBACK_FIELDS;
  const formTitle = config?.title || "Startup Pitch Submission";
  const formSubtitle = config?.subtitle || "Tell us about your venture";
  const submitBtnText = config?.submit_button_text || "Submit Pitch";
  const successMsg = config?.success_message || "Thank you for your pitch! Our team will review it and get back to you within 5-7 business days.";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const base = API_BASE_URL || "http://localhost:8000";
        const resp = await fetch(`${base}/api/public/join-us/config?form_type=pitch_to_us`);
        if (resp.ok) {
          const data = await resp.json();
          setConfig(data);
        }
      } catch {
        // use fallback defaults
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const updateValue = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const missing = fields
      .filter((f: any) => f.required && !values[f.id]?.trim())
      .map((f: any) => f.label);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    setSubmitting(true);
    try {
      const base = API_BASE_URL || "http://localhost:8000";
      const resp = await fetch(`${base}/api/public/join-us/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "pitch_to_us", data: values }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: "Submission failed" }));
        throw new Error(err.detail || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#FAF7F2] pb-12 pt-14 md:pt-16 lg:pt-20">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 top-12 h-60 w-60 rounded-full bg-[#A8863A]/10 blur-[70px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.2)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#A8863A] shadow-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[8px]">✦</span>
            Submit Your Pitch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 text-3xl font-extrabold tracking-tight text-[#0A1128] sm:text-4xl md:text-5xl [&_em]:text-[#F97316]"
            dangerouslySetInnerHTML={{ __html: 'Pitch Your Startup <em>With Confidence</em>' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#706760]"
          >
            Share your vision with AHUB AUIC. We evaluate every submission for potential, problem clarity, and founder readiness.
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

      {/* ── Form + Sidebar ──────────────────────────────── */}
      <section className="bg-white px-6 pb-20 pt-4">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin" style={{ color: GOLD }} />
            </div>
          ) : submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md flex flex-col items-center justify-center rounded-3xl border border-[rgba(201,168,76,0.2)] bg-white p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C]/10">
                <CheckCircle2 size={32} style={{ color: GOLD }} />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-[#0A1128]">{successMsg}</p>
            </motion.div>
          ) : (
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
                <div className="flex items-center gap-3 border-b border-[rgba(201,168,76,0.15)] pb-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10">
                    <Rocket size={20} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0A1128]">{formTitle}</div>
                    <div className="text-[0.75rem] text-[#706760]">{formSubtitle}</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                  {fields.map((field: any) => (
                    <DynamicField
                      key={field.id}
                      field={field}
                      value={values[field.id] || ""}
                      onChange={(val) => updateValue(field.id, val)}
                      theme="gold"
                    />
                  ))}

                  {error && (
                    <p className="text-xs font-medium text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(249,115,22,0.45)] active:scale-95 uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: `linear-gradient(135deg, #F97316 0%, #EA580C 100%)` }}
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                    ) : (
                      <><FileText size={16} /> {submitBtnText}</>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* ── RIGHT: Sidebar ── */}
              <motion.div variants={fadeUp} className="flex flex-col gap-6">
                {/* What we look for */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="mb-4 text-sm font-bold text-slate-800">What we look for</div>
                  {EVALUATION_CRITERIA.map((item) => (
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
                    href="mailto:techsupport@a-hub.co"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:opacity-80 transition-opacity"
                  >
                    techsupport@a-hub.co <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}