import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Rocket, Users, Send, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

import { API_BASE_URL } from "@/services/api";

const ORANGE = "#e75710";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[] | null;
  order: number;
  accept?: string | null;
}

interface FormConfig {
  title: string;
  subtitle: string | null;
  submit_button_text: string;
  success_message: string;
  fields: FormField[];
}

const DEFAULT_CONFIG: FormConfig = {
  title: "Incubation Registration",
  subtitle: "For startups and ventures",
  submit_button_text: "Submit",
  success_message: "Thank you for your submission!",
  fields: [],
};

/* ── Dynamic Field Renderer ───────────────────────────────── */

function DynamicField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  const baseInput =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#e75710]/50 focus:ring-2 focus:ring-[#e75710]/10";

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
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
        <label className="text-[0.78rem] font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInput} appearance-none cursor-pointer`}
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
        </label>
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
          {(field.options || []).map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 group"
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-300 transition group-hover:border-[#e75710]">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                <span
                  className={`h-2 w-2 rounded-full ${value === opt ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`}
                  style={{ backgroundColor: ORANGE }}
                />
              </span>
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.78rem] font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
        </label>
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
          {(field.options || []).map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 group"
            >
              <input
                type="checkbox"
                value={opt}
                checked={value.includes(opt)}
                onChange={(e) => {
                  const current = value ? value.split(",").filter(Boolean) : [];
                  if (e.target.checked) {
                    onChange([...current, opt].join(","));
                  } else {
                    onChange(current.filter((v) => v !== opt).join(","));
                  }
                }}
                className="h-4 w-4 rounded border-slate-300 text-[#e75710] focus:ring-[#e75710]"
              />
              {opt}
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
        <label className="text-[0.78rem] font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
        </label>
        <div className="flex flex-col gap-2">
          {isImage && (
            <img
              src={value as string}
              alt="Preview"
              className="h-28 w-28 rounded-lg border border-slate-200 object-cover"
            />
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 hover:border-[#e75710]/50 hover:bg-[#FFF6F0] transition-colors">
            <input
              type="file"
              accept={field.accept || "image/*"}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 10 * 1024 * 1024) {
                  alert("File exceeds 10 MB limit");
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
            <span className="text-xs">{field.placeholder || "Upload file"}</span>
          </label>
          {value && typeof value === "string" && value.length > 100 && (
            <span className="text-[10px] text-green-600">File attached ({Math.round((value.length * 0.75) / 1024)} KB)</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-medium text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5 text-[#e75710]">*</span>}
      </label>
      <input
        type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : field.type === "number" ? "number" : field.type === "url" ? "url" : field.type === "date" ? "date" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={baseInput}
      />
    </div>
  );
}

/* ── Reusable Form Card ────────────────────────────────────── */

function FormCard({
  config,
  icon: Icon,
  iconColor,
  onSubmit,
}: {
  config: FormConfig;
  icon: typeof Rocket;
  iconColor: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateValue = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const missing = config.fields
      .filter((f) => f.required && !values[f.id]?.trim())
      .map((f) => f.label);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_32px_-12px_rgba(231,87,16,0.15)]"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${ORANGE}18` }}
        >
          <CheckCircle2 size={32} style={{ color: ORANGE }} />
        </div>
        <p className="mt-4 text-center text-sm font-medium text-slate-800">
          {config.success_message}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(231,87,16,0.15)] md:p-8"
    >
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${ORANGE}18` }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <div>
          <div className="text-base font-bold text-slate-900">{config.title}</div>
          {config.subtitle && (
            <div className="text-[0.75rem] text-slate-500">{config.subtitle}</div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        {config.fields.map((field) => (
          <DynamicField
            key={field.id}
            field={field}
            value={values[field.id] || ""}
            onChange={(val) => updateValue(field.id, val)}
          />
        ))}

        {error && (
          <p className="text-xs font-medium text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(231,87,16,0.4)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: ORANGE }}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            config.submit_button_text
          )}
        </button>
      </form>
    </motion.div>
  );
}

/* ── Main Export ── */

export function JoinUsPage() {
  const [joinUsConfig, setJoinUsConfig] = useState<FormConfig>({
    ...DEFAULT_CONFIG,
    title: "Join Us",
    subtitle: "Partner, collaborate or contribute",
    fields: [
      { id: "name", type: "text", label: "Full Name", placeholder: "Enter full name", required: true, options: null, order: 0 },
      { id: "email", type: "email", label: "Email", placeholder: "Enter email", required: true, options: null, order: 1 },
      { id: "phone", type: "phone", label: "Phone", placeholder: "Enter phone number", required: true, options: null, order: 2 },
      { id: "purpose", type: "select", label: "Purpose", placeholder: "Select purpose", required: true, options: ["Incubate", "Mentor", "Volunteer", "Network", "Invest", "CSR Partner", "Donate", "Advisory Board", "Associate"], order: 3 },
      { id: "about", type: "textarea", label: "About you", placeholder: "Tell us something about you", required: true, options: null, order: 4 },
    ],
  });
  const [incubationConfig, setIncubationConfig] = useState<FormConfig>({
    ...DEFAULT_CONFIG,
    fields: [
      { id: "startup_name", type: "text", label: "Startup / Venture Name", placeholder: "Enter startup or venture name", required: true, options: null, order: 0, accept: null },
      { id: "founder_name", type: "text", label: "Name of CEO / Founder", placeholder: "Enter name", required: true, options: null, order: 1, accept: null },
      { id: "founders", type: "text", label: "Name of the Founders", placeholder: "Enter all founders' names", required: true, options: null, order: 2, accept: null },
      { id: "ceo_father", type: "text", label: "CEO Father", placeholder: "Enter CEO father's name", required: false, options: null, order: 3, accept: null },
      { id: "address", type: "textarea", label: "Physical Postal Address", placeholder: "Enter full address", required: true, options: null, order: 4, accept: null },
      { id: "email", type: "email", label: "Email", placeholder: "Enter email", required: true, options: null, order: 5, accept: null },
      { id: "contact", type: "phone", label: "Contact Number of Founder / CEO", placeholder: "Enter contact number", required: true, options: null, order: 6, accept: null },
      { id: "spoc_name", type: "text", label: "Name of the SPOC", placeholder: "Enter name", required: true, options: null, order: 7, accept: null },
      { id: "spoc_contact", type: "phone", label: "Contact Number of the SPOC", placeholder: "Enter contact number", required: true, options: null, order: 8, accept: null },
      { id: "cofounder_details", type: "textarea", label: "Co-founders details (with Aadhar numbers)", placeholder: "Enter details", required: true, options: null, order: 9, accept: null },
      { id: "website", type: "url", label: "Website of Startup (if any)", placeholder: "Enter website URL", required: false, options: null, order: 10, accept: null },
      { id: "video_url", type: "url", label: "Video URL (if any)", placeholder: "Enter video URL", required: false, options: null, order: 11, accept: null },
      { id: "startup_logo", type: "file", label: "Startup Photograph/Logo", placeholder: "Upload 1 supported file. Max 10 MB", required: true, options: null, order: 12, accept: "image/*" },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const base = API_BASE_URL || "http://localhost:8000";
        const [joinResp, incubateResp] = await Promise.all([
          fetch(`${base}/api/public/join-us/config?form_type=join_us`),
          fetch(`${base}/api/public/join-us/config?form_type=incubation`),
        ]);
        if (joinResp.ok) {
          const data = await joinResp.json();
          setJoinUsConfig(data);
        }
        if (incubateResp.ok) {
          const data = await incubateResp.json();
          setIncubationConfig(data);
        }
      } catch {
        // Use fallback defaults
      } finally {
        setLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  const submitForm = async (formType: string, data: Record<string, string>) => {
    const base = API_BASE_URL || "http://localhost:8000";
    const resp = await fetch(`${base}/api/public/join-us/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_type: formType, data }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ detail: "Submission failed" }));
      throw new Error(err.detail || "Submission failed");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF6F0] to-white pb-10 pt-14 md:pt-16 lg:pt-20">
        <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#e75710]/8 blur-[80px]" />
        <div className="pointer-events-none absolute -right-24 top-8 h-52 w-52 rounded-full bg-[#FF9A5C]/8 blur-[60px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.72rem] font-bold uppercase tracking-[0.28em]"
            style={{ color: ORANGE }}
          >
            Together, We Build Innovation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl [&_em]:text-[#e75710]"
            dangerouslySetInnerHTML={{
              __html: "Join Us in Building <span>the <em>Future</em></span>",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500"
          >
            Whether you're a founder, mentor, investor, or changemaker, there's a place for you in our ecosystem.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="mx-auto mt-6 h-0.5 w-12 rounded-full"
            style={{ backgroundColor: ORANGE }}
          />
        </div>
      </section>

      {/* Two-column form area */}
      <section className="bg-white px-4 py-10">
        <div className="site-container-wide">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin text-[#e75710]" />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-6 lg:grid-cols-2"
            >
              <FormCard
                config={incubationConfig}
                icon={Rocket}
                iconColor={ORANGE}
                onSubmit={(data) => submitForm("incubation", data)}
              />
              <FormCard
                config={joinUsConfig}
                icon={Users}
                iconColor={ORANGE}
                onSubmit={(data) => submitForm("join_us", data)}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Footer */}
      <CTABanner />
    </>
  );
}

/* ── CTA Banner ── */

function CTABanner() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="site-container-wide pb-16"
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
            <div className="text-lg font-bold text-slate-900">Let's create impact together.</div>
            <p className="mt-0.5 max-w-sm text-sm leading-relaxed text-slate-500">
              We welcome passionate individuals and organizations who want to make a difference.
            </p>
          </div>
        </div>
        <a
          href="mailto:techsupport@a-hub.co"
          className="group inline-flex flex-shrink-0 items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          style={{ borderColor: ORANGE, color: ORANGE }}
        >
          Contact Us
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.section>
  );
}
