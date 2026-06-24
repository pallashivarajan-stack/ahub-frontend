import { motion, Variants } from "framer-motion";
import {
  Lightbulb,
  Leaf,
  Rocket,
  ArrowRight,
  ArrowLeftRight,
  ArrowUpDown,
  Brain,
  Handshake,
  CheckSquare,
  TrendingUp,
  Trophy,
  Building2,
  Banknote,
  Users,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { usePublicOperationalModel } from "@/services/usePublicContent";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const ORANGE = "#e75710";
const ORANGE_LIGHT = "#FFF0E8";

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF8F3] to-white pb-10 pt-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[360px] w-[360px] rounded-full bg-[#e75710]/6 blur-[100px]" />
        <div className="absolute -right-32 top-0 h-[300px] w-[300px] rounded-full bg-[#FF9A5C]/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#e75710]/25 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#e75710] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#e75710]" />
          Approach
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          Operation{" "}
          <span style={{ color: ORANGE }}>Model</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500"
        >
          From idea to impact — we build, validate and scale what matters.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Innovation Engine sidebar ── */
const ENGINE_STAGES = [
  { Icon: Lightbulb, label: "PRE-INCUBATION", sub: "Explore Ideas" },
  { Icon: Leaf, label: "INCUBATION", sub: "Build & Validate" },
  { Icon: Rocket, label: "ACCELERATOR", sub: "Scale & Launch" },
];

function InnovationEngine() {
  return (
    <div className="flex flex-col gap-0 rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_-12px_rgba(231,87,16,0.18)] overflow-hidden">
      <div
        className="px-5 py-4 font-bold tracking-[0.18em] text-[0.7rem] uppercase"
        style={{ backgroundColor: ORANGE, color: "white" }}
      >
        INNOVATION ENGINE
      </div>
      {ENGINE_STAGES.map(({ Icon, label, sub }, i) => (
        <div
          key={label}
          className={`flex items-center gap-4 px-5 py-4 ${i < ENGINE_STAGES.length - 1 ? "border-b border-slate-100" : ""}`}
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#e75710]/20 bg-[#FFF0E8]">
            <Icon size={16} style={{ color: ORANGE }} />
          </div>
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-800">{label}</div>
            <div className="text-[0.7rem] text-slate-500">{sub}</div>
          </div>
        </div>
      ))}
      {/* arrow connector */}
      <div className="flex items-center justify-center py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e75710]/30 bg-[#FFF0E8]">
          <ArrowLeftRight size={14} style={{ color: ORANGE }} />
        </div>
      </div>
    </div>
  );
}

/* ── Stage steps on the journey path ── */
const JOURNEY_STEPS = [
  { num: "-2", label: "Problem / Solution Fit" },
  { num: "-1", label: "Vision / Founders Fit" },
  { num: "0", label: "Product / Market Fit" },
  { num: "1", label: "Business Model / Market Fit" },
  { num: "2", label: "", isRocket: true },
];

const PHASE_COLUMNS = [
  {
    phase: "FORMATION",
    sub: "Build the Foundation",
    color: "#e75710",
    points: ["Co-founder team formation", "What, to whom, & why and how?"],
    steps: ["-2", "-1"],
  },
  {
    phase: "VALIDATION",
    sub: "Test & Learn",
    color: "#FF6B35",
    points: ["Minimum Viable Product", "Validate / Iterate (or pivot)"],
    steps: ["0", "1"],
  },
  {
    phase: "GROWTH",
    sub: "Scale with Impact",
    color: "#FF9A5C",
    points: ["Establish &", "Strengthen"],
    steps: ["2"],
  },
];

const PROCESS_STAGES = [
  { Icon: Lightbulb, label: "Ideating" },
  { Icon: Brain, label: "Concepting" },
  { Icon: Handshake, label: "Committing", highlight: true },
  { Icon: CheckSquare, label: "Validating" },
  { Icon: TrendingUp, label: "Scaling" },
  { Icon: Trophy, label: "Establishing" },
];

function JourneyMap() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_-12px_rgba(231,87,16,0.12)]">
      {/* Phase headers */}
      <div className="grid grid-cols-3 gap-3">
        {PHASE_COLUMNS.map((col) => (
          <div key={col.phase} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div
              className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em]"
              style={{ color: col.color }}
            >
              {col.phase}
            </div>
            <div className="mt-0.5 text-[0.68rem] text-slate-500">{col.sub}</div>
            <ul className="mt-3 space-y-1">
              {col.points.map((pt) => (
                <li key={pt} className="text-[0.7rem] leading-snug text-slate-600">
                  • {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Journey path / numbered steps */}
      <div className="relative">
        {/* SVG wave line */}
        <svg viewBox="0 0 900 80" className="h-16 w-full" preserveAspectRatio="none">
          <path
            d="M 0 60 Q 150 10 300 50 Q 450 90 540 40 Q 650 0 750 35 Q 830 60 900 25"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeDasharray="6 3"
          />
        </svg>

        {/* Step markers */}
        <div className="absolute inset-0 flex items-center justify-around px-4">
          {JOURNEY_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold text-sm shadow-md"
                style={{
                  borderColor: ORANGE,
                  backgroundColor: step.isRocket ? ORANGE : "white",
                  color: step.isRocket ? "white" : ORANGE,
                }}
              >
                {step.isRocket ? <Rocket size={16} /> : step.num}
              </div>
              {step.label && (
                <div className="text-center text-[0.6rem] leading-tight text-slate-500 max-w-[80px]">
                  {step.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process stage pills */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {PROCESS_STAGES.map(({ Icon, label, highlight }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center transition-all ${
              highlight
                ? "border-2 border-[#e75710]/40 bg-[#FFF0E8] font-semibold"
                : "border border-slate-100 bg-slate-50"
            }`}
          >
            <Icon
              size={16}
              style={{ color: highlight ? ORANGE : "#6B7280" }}
            />
            <span
              className="text-[0.65rem] font-medium"
              style={{ color: highlight ? ORANGE : "#64748b" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Future Value Add Services ── */
const FUTURE_SERVICES = [
  "Joint Technology Development Services",
  "Product / Service Development Support",
  "Marketing / Go-to-Market Strategy",
  "Preparations for Series A / B & Institutional Services",
  "Bank Lending Services",
  "Credit / Risk Assessment Services",
];

const SUPPORT_PILLARS = [
  { Icon: Building2, label: "Infrastructure & Technical Support" },
  { Icon: Banknote, label: "Financial Support" },
  { Icon: Users, label: "Mentoring & Coaching" },
  { Icon: Handshake, label: "Business Network" },
  { Icon: Megaphone, label: "Visibility / Media" },
  { Icon: ShieldCheck, label: "Retainer Services" },
];

function FutureValueSection() {
  return (
    <section className="bg-[#FAF7F4] px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-[320px_1fr]"
        >
          {/* Left: Future Value Add Services */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_-12px_rgba(231,87,16,0.15)] overflow-hidden"
          >
            <div
              className="px-5 py-4 font-bold tracking-[0.18em] text-[0.7rem] uppercase"
              style={{ backgroundColor: ORANGE, color: "white" }}
            >
              FUTURE VALUE ADD SERVICES
            </div>
            <ul className="divide-y divide-slate-100">
              {FUTURE_SERVICES.map((service) => (
                <li key={service} className="flex items-start gap-2.5 px-5 py-3.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: ORANGE }}
                  />
                  <span className="text-[0.75rem] leading-snug text-slate-700">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Support Pillars grid */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {/* connector */}
            <div className="flex justify-center">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white shadow-sm"
                style={{ borderColor: `${ORANGE}50` }}
              >
                <ArrowUpDown size={14} style={{ color: ORANGE }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {SUPPORT_PILLARS.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e75710]/30 hover:shadow-[0_12px_30px_-10px_rgba(231,87,16,0.2)]"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors group-hover:bg-[#FFF0E8]"
                    style={{ borderColor: `${ORANGE}30`, color: ORANGE }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-[0.72rem] font-semibold leading-snug text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Model Section ── */
function ModelSection() {
  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-[300px_1fr]"
        >
          <motion.div variants={fadeUp}>
            <InnovationEngine />
          </motion.div>
          <motion.div variants={fadeUp}>
            <JourneyMap />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export function OperationalModelPage() {
  const operationalFallback = { ENGINE_STAGES, JOURNEY_STEPS, PHASE_COLUMNS, PROCESS_STAGES, FUTURE_SERVICES, SUPPORT_PILLARS };
  const { data: opData } = usePublicOperationalModel(operationalFallback);
  return (
    <>
      <HeroSection />
      <ModelSection />
      <FutureValueSection />
    </>
  );
}
