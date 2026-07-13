import { useState } from "react";
import { LazyMotion, m as motion, domAnimation } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Send } from "lucide-react";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Contact info ─────────────────────────────────────────────────────────────
const contacts = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "incubation@andhrauniversity.edu.in",
    href: "mailto:incubation@andhrauniversity.edu.in",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Andhra University Innovation & Incubation Center, Visakhapatnam",
    href: "https://maps.google.com/?q=Andhra+University+Visakhapatnam",
  },
];

// ─── Contact Card ─────────────────────────────────────────────────────────────
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  index,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target={label === "Location" ? "_blank" : undefined}
      rel="noreferrer"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px -8px rgba(246,139,31,0.28)" }}
      className="flex items-center gap-4 rounded-[18px] border border-transparent bg-white p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#F68B1F]/30 no-underline"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF3E8]">
        <Icon size={18} className="text-[#F68B1F]" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F68B1F]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[13.5px] font-medium text-[#1a1a1a]">
          {value}
        </p>
      </div>
    </motion.a>
  );
}

// ─── Reusable input field ─────────────────────────────────────────────────────
function FormField({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
}: {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-text items-center gap-3 rounded-[18px] border border-[#e8e8e8] bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-[#F68B1F] focus-within:shadow-[0_0_0_3px_rgba(246,139,31,0.12)]"
    >
      <span className="shrink-0">{icon}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      />
    </label>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ContactUs() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setFormState({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <LazyMotion features={domAnimation}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');`}</style>

      <section
        id="contact"
        className="relative isolate overflow-hidden bg-[#FFF8F1] py-12 md:py-16"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="mx-auto w-full max-w-[900px] px-6">
          {/* ── OUTER CARD ───────────────────────────────────────────────── */}
          <div className="overflow-hidden rounded-[20px] border border-[#f0e6dc] bg-white shadow-[0_6px_24px_-6px_rgba(0,0,0,0.06),0_24px_64px_-16px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-[42%_58%]">

              {/* ══════════════════ LEFT PANEL ══════════════════ */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#FFF8F1] via-[#FFF3E8] to-[#FFE8D0] p-6 md:p-8"
              >
                {/* ── Decorative top-left semi-circle ── */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full"
                  style={{ background: "linear-gradient(135deg, #F68B1F 0%, #FBBF6A 100%)", opacity: 0.85 }}
                />
                {/* ── Decorative dotted grid ── */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-8 top-8"
                  style={{
                    width: 72,
                    height: 72,
                    backgroundImage: "radial-gradient(circle, #F68B1F 1.2px, transparent 1.2px)",
                    backgroundSize: "10px 10px",
                    opacity: 0.25,
                  }}
                />

                {/* ── Top Content ── */}
                <div className="relative">
                  {/* Small label */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#F68B1F]">
                      CONTACT US
                    </span>
                    <div className="h-px w-10 bg-[#F68B1F]" />
                  </div>

                  {/* Heading */}
                  <h2 className="mb-3 font-display text-2xl md:text-3xl lg:text-[2.25rem] font-bold leading-[1.1] text-[#1a1a1a]">
                    Let's Connect
                  </h2>

                  {/* Description */}
                  <p className="mb-6 max-w-[300px] text-[14px] leading-[1.7] text-[#666]">
                    Have an idea, startup, or innovation to discuss? Our incubation team
                    is ready to guide you through every step—from ideation to growth.
                  </p>

                  {/* Contact Cards */}
                  <div className="flex flex-col gap-3">
                    {contacts.map((c, i) => (
                      <ContactCard key={c.label} {...c} index={i + 2} />
                    ))}
                  </div>
                </div>

                {/* ── CTA Bottom Card ── */}
                <motion.div
                  variants={fadeUp}
                  custom={5}
                  className="relative mt-8 overflow-hidden rounded-[20px] p-5"
                  style={{ background: "linear-gradient(135deg, #F68B1F 0%, #FFA94D 100%)" }}
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/25 shadow-inner">
                      <Send size={18} className="text-white" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-white">
                        Start Your Startup Journey
                      </p>
                      <p className="mt-1 text-[12.5px] leading-[1.6] text-white/85">
                        Apply for incubation, connect with mentors, and transform
                        your ideas into successful ventures.
                      </p>
                    </div>
                    <ArrowRight size={18} className="mt-0.5 shrink-0 text-white/80" />
                  </div>
                </motion.div>
              </motion.div>

              {/* ══════════════════ RIGHT PANEL ══════════════════ */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={slideLeft}
                className="flex flex-col gap-5 bg-white p-6 md:p-8"
              >
                {/* ── FORM ── */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  aria-label="Contact form"
                >
                  {/* Row 1 – Name + Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={handleChange}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="#F68B1F" strokeWidth="1.8" className="h-4 w-4">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      }
                    />
                    <FormField
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={handleChange}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="#F68B1F" strokeWidth="1.8" className="h-4 w-4">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 7l10 7 10-7" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Row 2 – Phone */}
                  <FormField
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Your Phone"
                    value={formState.phone}
                    onChange={handleChange}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="#F68B1F" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.8 19.8 0 01.08 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    }
                  />

                  {/* Row 3 – Message */}
                  <label
                    htmlFor="contact-message"
                    className="group relative flex cursor-text items-start gap-3 rounded-[18px] border border-[#e8e8e8] bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-[#F68B1F] focus-within:shadow-[0_0_0_3px_rgba(246,139,31,0.12)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F68B1F" strokeWidth="1.8" className="mt-1 h-4 w-4 shrink-0">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Your Message"
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full resize-none bg-transparent text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#aaa]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </label>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={sending || sent}
                    whileHover={!sent ? { y: -2, scale: 1.01 } : {}}
                    whileTap={!sent ? { scale: 0.99 } : {}}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-[18px] text-[15px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(246,139,31,0.45)] transition-all duration-300 disabled:opacity-80"
                    style={{
                      background: sent
                        ? "#22c55e"
                        : "linear-gradient(135deg, #F68B1F 0%, #FFA94D 100%)",
                      fontFamily: "inherit",
                    }}
                  >
                    {sent ? (
                      "Message Sent ✓"
                    ) : sending ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* ── MAP ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[24px]"
                  style={{ height: 220 }}
                >
                  {/* Real Google Maps embed – Andhra University, Visakhapatnam */}
                  <iframe
                    title="Andhra University Innovation & Incubation Center Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.6553782049767!2d83.31786431436988!3d17.72757998788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395b2d4c49e071%3A0xb6067b7b9f48cd2!2sAndhra%20University%2C%20Visakhapatnam!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                  />

                  {/* Pulsing orange map pin overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-3 animate-ping rounded-full bg-[#F68B1F]/30" />
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F68B1F] shadow-[0_4px_16px_-4px_rgba(246,139,31,0.6)]">
                        <MapPin size={18} className="text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Floating location card – bottom-left */}
                  <div className="absolute bottom-3 left-3 flex max-w-[260px] items-start gap-3 rounded-[14px] bg-white p-3 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.18)]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF3E8]">
                      <MapPin size={14} className="text-[#F68B1F]" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold leading-tight text-[#1a1a1a]">
                        Andhra University Innovation &amp; Incubation Center
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#888]">
                        Visakhapatnam, Andhra Pradesh
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
