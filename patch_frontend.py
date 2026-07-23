import re
import sys

file_path = 'c:/project/ahub-nexus-main/src/components/sections/InternshipRegistrationPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add API_BASE_URL import and Loader2
if 'import { API_BASE_URL }' not in content:
    content = content.replace(
        'import {',
        'import { API_BASE_URL } from "@/services/api";\nimport {'
    )
if 'Loader2' not in content:
    content = content.replace('X,', 'X,\n  Loader2,')

# 2. Add DynamicField component before the main function
dynamic_field_code = '''
const FALLBACK_FIELDS = [
  { id: "fullName", type: "text", label: "Full Name", placeholder: "e.g., John Doe", required: true, order: 0 },
  { id: "email", type: "email", label: "Email Address", placeholder: "e.g., john@email.com", required: true, order: 1 },
  { id: "dob", type: "date", label: "Date of Birth", placeholder: "", required: true, order: 2 },
  { id: "skills", type: "text", label: "Skills", placeholder: "e.g., React, Python, SQL, Figma", required: true, order: 3 },
  { id: "resume", type: "file", label: "Resume Upload", placeholder: "Upload your resume (PDF/DOC)", required: true, accept: ".pdf,.doc,.docx", order: 4 },
  { id: "domain", type: "select", label: "Preferred Domain", placeholder: "Select your preferred domain", required: true, options: ["Frontend", "Backend", "AI/ML", "Data Science", "Product Design", "Marketing"], order: 5 },
  { id: "motivation", type: "textarea", label: "Motivation", placeholder: "Tell us why you want this internship...", required: true, order: 6 },
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
    "w-full rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 py-3.5 px-4 text-xs text-slate-950 outline-none transition focus:border-[#F59E42] focus:bg-white";

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F59E42]">*</span>}
        </label>
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={\\ resize-none\}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F59E42]">*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={\\ appearance-none cursor-pointer\}
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
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#F59E42]">*</span>}
        </label>
        <div className="relative flex h-[50px] w-full items-center justify-between rounded-2xl border border-slate-200 bg-[#FFFBF8]/30 px-4 outline-none transition hover:border-[#F59E42]">
          <Upload className="h-4 w-4 text-slate-400" />
          <span className="ml-2 truncate text-slate-600 font-normal text-xs flex-1">
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
          <span className="rounded-lg bg-[#FFF4E8] px-2.5 py-1.5 text-[10px] font-bold text-[#F59E42] uppercase shadow-sm pointer-events-none">
            Browse
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5 text-[#F59E42]">*</span>}
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
            : field.type === "date"
            ? "date"
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
'''
if 'function DynamicField' not in content:
    content = content.replace('export function InternshipRegistrationPage() {', dynamic_field_code + '\nexport function InternshipRegistrationPage() {')

# 3. Add states and useEffect
states_code = '''
  const [config, setConfig] = useState<any>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loadingConfig, setLoadingConfig] = useState(true);

  const fields = config?.fields || FALLBACK_FIELDS;
  const formTitle = config?.title || "Registration Form";
  const formSubtitle = config?.subtitle || "Fill in your details to apply for internship opportunities.";
  const submitBtnText = config?.submit_button_text || "Submit Application";
  const successMsg = config?.success_message || "Thank you for applying. The respective startup team will review your application details and respond via email.";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const base = API_BASE_URL || "http://localhost:8000";
        const resp = await fetch(\\/api/public/join-us/config?form_type=internship_registration\);
        if (resp.ok) {
          const data = await resp.json();
          setConfig(data);
        }
      } catch {
        // use fallback defaults
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const updateValue = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const missing = fields
      .filter((f: any) => f.required && !values[f.id]?.trim())
      .map((f: any) => f.label);
    if (missing.length > 0) {
      setError(\Please fill in: \\);
      return;
    }

    setSubmitting(true);
    try {
      const base = API_BASE_URL || "http://localhost:8000";
      const resp = await fetch(\\/api/public/join-us/submit\, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "internship_registration", data: values }),
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
'''

if 'const [loadingConfig' not in content:
    # replace existing form states
    content = re.sub(r'const \[formData, setFormData\] = useState\(\{.*?\}\);', '', content, flags=re.DOTALL)
    content = re.sub(r'const \[formSubmitted, setFormSubmitted\] = useState\(false\);', '', content)
    content = re.sub(r'const \[resumeName, setResumeName\] = useState\(""\);', '', content)
    
    # replace handleFormSubmit
    content = re.sub(r'const handleFormSubmit = \(e: React.FormEvent\) => \{.*?\};', states_code, content, flags=re.DOTALL)

# 4. Replace Form Section
new_form_section = '''
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
                {formTitle}
                <span className="absolute bottom-[-6px] left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-[#F59E42]" />
              </h2>
              <p className="mt-4 text-xs text-[#6C5E5B] sm:text-sm">
                {formSubtitle}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {loadingConfig ? (
                <div className="flex justify-center items-center py-20" key="loading">
                  <Loader2 className="animate-spin text-slate-400" size={32} />
                </div>
              ) : submitted ? (
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
                    {successMsg}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form-input"
                  onSubmit={handleFormSubmit}
                  className="mt-10 md:mt-12 space-y-6"
                >
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

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(245,158,66,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-4px_rgba(245,158,66,0.45)] hover:brightness-105 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          {submitBtnText}
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
'''

content = re.sub(r'\{\/\* REGISTRATION FORM SECTION \*\/\}.*?(?=\{\/\* BENEFITS STRIP \*\/\})', new_form_section, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Patched InternshipRegistrationPage.tsx successfully')
