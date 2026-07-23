import { useState, useEffect } from "react";
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
  Loader2
} from "lucide-react";
import { usePublicStartupRegistration } from "@/services/usePublicContent";
import { API_BASE_URL } from "@/services/api";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const FALLBACK = {
  heroBadge: "Startup Onboarding",
  heroTitle: 'Register Your <em>Startup</em> with AHUB',
  heroSubtitle: "Join the Andhra University Incubation Council ecosystem. Complete your startup registration to access incubation, mentorship, and funding support.",
  formTitle: "Startup Registration Form",
  formSubtitle: "AUIC Incubation Programme",
  submitBtn: "Submit Registration",
  contactEmail: "incubation@ahub.in",
  contactPhone: "+91 891 234 5678",
  benefits: [
    { title: "Office Space", desc: "Access to co-working and private offices at AHUB" },
    { title: "Mentorship", desc: "1:1 sessions with industry experts and investors" },
    { title: "Network Access", desc: "Entry into AHUB's ecosystem of 150+ partners" },
    { title: "Funding Support", desc: "Pitch days, grant applications, and investor introductions" },
  ],
  postRegistration: [
    "Dedicated incubation space & resources",
    "Mentorship from industry experts",
    "Access to investor network & funding",
    "Legal & compliance guidance",
    "Marketing & PR support",
    "Participation in Demo Days",
  ],
  eligibility: [
    "Must be an Andhra University student, alumni, or faculty",
    "Startup should be less than 5 years old",
    "Innovation-driven product or service",
    "Commitment to the 12-month incubation cycle",
  ],
};

const FALLBACK_FIELDS = [
  { id: "startup_name", type: "text", label: "Startup Name", placeholder: "Enter startup name", required: true, order: 0 },
  { id: "founder_name", type: "text", label: "Founder Name", placeholder: "Enter full name", required: true, order: 1 },
  { id: "email", type: "email", label: "Email Address", placeholder: "founder@startup.com", required: true, order: 2 },
  { id: "phone", type: "tel", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", required: true, order: 3 },
  { id: "industry", type: "select", label: "Industry", placeholder: "Select industry", required: true, options: ["Artificial Intelligence / ML", "AgriTech", "Climate Tech", "Consumer / D2C", "DeepTech / Hardware", "EdTech", "FinTech", "HealthTech / MedTech", "SaaS / Enterprise", "Robotics / IoT", "Cybersecurity", "Logistics / Supply Chain", "Social Impact", "Other"], order: 4 },
  { id: "funding_stage", type: "select", label: "Funding Stage", placeholder: "Select funding stage", required: true, options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B+"], order: 5 },
  { id: "description", type: "textarea", label: "Brief Description", placeholder: "Describe your startup...", required: true, order: 6 },
  { id: "logo", type: "file", label: "Startup Logo", placeholder: "Upload image", required: true, accept: "image/*", order: 7 },
  { id: "pitch_deck", type: "file", label: "Pitch Deck", placeholder: "Upload PDF", required: false, accept: ".pdf,.ppt,.pptx", order: 8 }
];

function DynamicField({
  field,
  value,
  onChange,
}: {
  field: any;
  value: string;
  onChange: (val: string) => void;
}) {
  const baseInput =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#F97316]/60 focus:ring-2 focus:ring-[#F97316]/10";

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F97316]">*</span>}
        </label>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${baseInput} resize-none`}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F97316]">*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInput} appearance-none cursor-pointer`}
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {(field.options || []).map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-semibold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F97316]">*</span>}
        </label>
        <div className="group relative flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-[#F97316]/50 hover:bg-[#FFF7F0]">
          <Upload size={20} className="text-slate-400 transition group-hover:text-[#F97316]" />
          <span className="text-xs text-slate-500">
            {value && typeof value === "string" && value.length > 100
              ? "File selected"
              : field.placeholder || "Upload File"}
          </span>
          <label className="absolute inset-0 cursor-pointer">
            <input
              type="file"
              accept={field.accept || undefined}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  const b64 = evt.target?.result as string;
                  onChange(b64);
                };
                reader.readAsDataURL(file);
              }}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5 text-[#F97316]">*</span>}
      </label>
      <input
        type={
          field.type === "email"
            ? "email"
            : field.type === "phone"
            ? "tel"
            : field.type === "number"
            ? "number"
            : field.type === "url"
            ? "url"
            : "text"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={baseInput}
      />
    </div>
  );
}

export function StartupRegistrationPage() {
  const { data } = usePublicStartupRegistration(FALLBACK);
  const c = data ?? FALLBACK;

  const [config, setConfig] = useState<any>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fields = config?.fields || FALLBACK_FIELDS;
  const formTitle = config?.title || c.formTitle;
  const formSubtitle = config?.subtitle || c.formSubtitle;
  const submitBtnText = config?.submit_button_text || c.submitBtn;
  const successMsg = config?.success_message || "Thank you for your registration! Our team will review and respond within 7 working days.";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const base = API_BASE_URL || "http://localhost:8000";
        const resp = await fetch(`${base}/api/public/join-us/config?form_type=startup_registration`);
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
        body: JSON.stringify({ form_type: "startup_registration", data: values }),
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
      {/* -- Hero ------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF6F0] to-white pb-12 pt-28 md:pt-36">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#F97316]/8 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 top-12 h-60 w-60 rounded-full bg-[#FB923C]/8 blur-[70px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.2)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316] shadow-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316]/10 text-[8px]">?</span>
            {c.heroBadge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-[3.25rem]"
            dangerouslySetInnerHTML={{ __html: c.heroTitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500"
          >
            {c.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="mx-auto mt-6 h-0.5 w-12 rounded-full bg-[#F97316]"
          />
        </div>
      </section>

      {/* -- Benefits Strip --------------------------------- */}
      <section className="bg-white px-6 pb-8 pt-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {(c.benefits as typeof FALLBACK.benefits).map(({ title, desc }, i) => {
              const icons = [Building2, Briefcase, Globe, Rocket] as const;
              const Icon = icons[i] ?? Building2;
              return (
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
              );
            })}
          </div>
        </div>
      </section>

      {/* -- Form + Sidebar ---------------------------------- */}
      <section className="bg-white px-6 pb-20 pt-4">
        <div className="site-container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-[1fr_320px]"
          >
            {/* -- LEFT: Registration Form -- */}
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
                  <div className="text-base font-bold text-slate-900">{formTitle}</div>
                  <div className="text-[0.75rem] text-slate-500">{formSubtitle}</div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="animate-spin text-slate-400" size={32} />
                </div>
              ) : submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/12"
                  >
                    <CheckCircle2 size={32} style={{ color: ORANGE }} />
                  </div>
                  <p className="mt-4 text-center text-sm font-medium text-slate-800">
                    {successMsg}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {fields.map((field: any) => (
                      <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                        <DynamicField
                          field={field}
                          value={values[field.id] || ""}
                          onChange={(val) => updateValue(field.id, val)}
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-[0.8rem] text-red-600 border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="mt-2 flex flex-col">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(249,115,22,0.45)] active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <Rocket size={16} />
                          {submitBtnText}
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[0.72rem] text-slate-400">
                      By submitting, you agree to our terms. We'll review and respond within 7 working days.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* -- RIGHT: Sidebar -- */}
            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              {/* What you get */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-slate-800">What you get after registration</div>
                {(c.postRegistration as string[]).map((item: string) => (
                  <div key={item} className="flex items-start gap-2.5 py-2 border-b border-slate-50 last:border-0">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[#F97316]" />
                    <span className="text-xs text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 text-sm font-bold text-slate-800">Eligibility Criteria</div>
                {(c.eligibility as string[]).map((item: string) => (
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
                    href={`mailto:${c.contactEmail}`}
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#F97316] transition-colors"
                  >
                    <Mail size={13} className="text-[#F97316]" />
                    {c.contactEmail}
                  </a>
                  <a
                    href={`tel:${c.contactPhone}`}
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#F97316] transition-colors"
                  >
                    <Phone size={13} className="text-[#F97316]" />
                    {c.contactPhone}
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
