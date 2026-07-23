import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2, User, Mail, Phone, Building2, Briefcase, FileText } from "lucide-react";
import { API_BASE_URL } from "@/services/api";

const ORANGE = "#F59E42";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

const eventFormFields: FormField[] = [
  { id: "full_name", type: "text", label: "Full Name", placeholder: "Enter your full name", required: true },
  { id: "email", type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
  { id: "phone", type: "tel", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", required: true },
  { id: "organization", type: "text", label: "Organization / Startup", placeholder: "Your company or institution", required: false },
  { id: "role", type: "text", label: "Role / Designation", placeholder: "e.g. Founder, Student, Mentor", required: false },
  { id: "event_name", type: "select", label: "Select Event", placeholder: "Choose an event", required: true, options: [
    "Startup Saturday",
    "Been There Done That",
    "Ideathon",
    "Hackathon",
    "Demo Day",
    "Investor Meet",
    "Workshop",
    "Other"
  ]},
  { id: "expectations", type: "textarea", label: "What do you expect from this event?", placeholder: "Tell us what you hope to gain...", required: false },
];

function DynamicField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  const baseClass = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#F59E42] focus:bg-white focus:ring-2 focus:ring-[#F59E42]/20";

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">{field.label}</label>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${baseClass} resize-none`}
        />
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">{field.label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">{field.placeholder}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{field.label}</label>
      <input
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={baseClass}
      />
    </div>
  );
}

export function EventRegistrationPage() {
  const [config, setConfig] = useState<any>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fields = config?.fields || eventFormFields;
  const formTitle = config?.title || "Event Registration";
  const formSubtitle = config?.subtitle || "Fill in the details to reserve your spot";
  const submitBtnText = config?.submit_button_text || "Register Now";
  const successMsg = config?.success_message || "Registration submitted successfully! We'll send you a confirmation email shortly.";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const base = API_BASE_URL || "http://localhost:8000";
        const resp = await fetch(`${base}/api/public/join-us/config?form_type=event_registration`);
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
        body: JSON.stringify({ form_type: "event_registration", data: values }),
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
    <div className="min-h-screen bg-[#FDF8F2]">
      <div className="pt-24 pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          
          {/* Header - Partners/Reports style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
              Events
            </div>
            
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl">
              Register for <span className="text-[#F59E42]">Events</span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]">
              Join our workshops, demo days, investor meets, and startup showcases. Reserve your spot today.
            </p>
            
            <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
          </motion.div>

          {/* Form + Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            
            {/* Form Card - Left (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(231,87,16,0.15)] md:p-8"
            >
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${ORANGE}18` }}
                >
                  <Calendar size={20} style={{ color: ORANGE }} />
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
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${ORANGE}18` }}
                  >
                    <CheckCircle2 size={32} style={{ color: ORANGE }} />
                  </div>
                  <p className="mt-4 text-center text-sm font-medium text-slate-800">
                    {successMsg}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                  {fields.map((field: any) => (
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
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(245,158,66,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(245,158,66,0.6)] disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      submitBtnText
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Cards - Right (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <Calendar size={16} className="text-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Upcoming Events</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Multiple events throughout the month including workshops, demo days, and networking meets.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#F59E42]">Various dates</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                    <CheckCircle2 size={16} className="text-green-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Instant Confirmation</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Receive immediate confirmation via email upon successful registration.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#F59E42]">Instant</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                    <FileText size={16} className="text-amber-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Note</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Spots are limited. Register early to secure your place at our exclusive events.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#F59E42]">Limited spots</div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}