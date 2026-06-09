import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Handshake,
  Layers3,
  Megaphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { type ComponentType } from "react";
import Tilt from "react-parallax-tilt";
import whatWeDoBackground from "@/assets/what wedo_background.png";
import { useCountUp } from "@/hooks/useCountUp";

type IconType = ComponentType<{ size?: number; className?: string }>;

type StatCard = {
  label: string;
  value: number;
  suffix: string;
  description: string;
  category: string;
  icons: IconType[];
  tone: string;
};

const cards: StatCard[] = [
  {
    label: "Funding Raised",
    value: 100,
    suffix: "Cr+",
    description: "Connecting startups with strategic investors and curated funding pathways.",
    category: "Funding",
    icons: [Banknote, TrendingUp, ShieldCheck],
    tone: "from-[#FFEBD9] via-[#FFF7F2] to-white",
  },
  {
    label: "Startups",
    value: 250,
    suffix: "+",
    description: "Supporting high-potential startups from validation through growth and scale.",
    category: "Startups",
    icons: [Rocket, Layers3, Sparkles],
    tone: "from-[#FFF2E8] via-[#FFF9F5] to-white",
  },
  {
    label: "Mentors",
    value: 400,
    suffix: "+",
    description: "Operator-led mentorship across technology, product, GTM, and fundraising.",
    category: "Mentors",
    icons: [Users, Handshake, ArrowUpRight],
    tone: "from-[#FFEDE2] via-[#FFF7F1] to-white",
  },
  {
    label: "Events",
    value: 300,
    suffix: "+",
    description: "Workshops, innovation sessions, demo events, and ecosystem networking moments.",
    category: "Events",
    icons: [CalendarDays, Megaphone, Sparkles],
    tone: "from-[#FFF1E6] via-[#FFF8F3] to-white",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${whatWeDoBackground})` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,248,242,0.96)_0%,rgba(255,244,236,0.76)_20%,rgba(255,247,242,0.9)_56%,rgba(255,255,255,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_58%_at_50%_0%,rgba(255,213,173,0.28),transparent_56%),radial-gradient(48%_34%_at_12%_10%,rgba(255,229,206,0.42),transparent_62%)]" />
      <div className="pointer-events-none absolute left-[9%] top-16 -z-10 h-40 w-40 rounded-full bg-[#FF6B00]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-20 -z-10 h-48 w-48 rounded-full bg-[#FFE5CC]/80 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,246,238,0.98),rgba(255,246,238,0.45),transparent)]" />
      <div className="pointer-events-none absolute -top-14 left-1/2 h-32 w-[66%] -translate-x-1/2 rounded-full bg-[rgba(255,214,180,0.32)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/20 bg-white/80 px-4 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[#B44A00] shadow-[0_10px_28px_-24px_rgba(255,107,0,0.55)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Network
          </div>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            AHub Network
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            From ideation to execution — connect with funding, mentors, and opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map((card) => (
            <motion.div key={card.label} variants={cardVariants}>
              <StatCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, description, category, icons, tone }: StatCard) {
  const { ref, value: animatedValue } = useCountUp(value, 1800);

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1200}
      scale={1.02}
      transitionSpeed={500}
      glareEnable={false}
      className="h-full"
    >
      <motion.article
        ref={ref as React.RefObject<HTMLElement>}
        whileHover={{ y: -7 }}
        className="group relative h-full overflow-hidden rounded-[28px] border border-[#FF6B00]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,248,242,0.92))] p-6 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.24)] transition-all duration-500 md:p-7"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_16%_15%,rgba(255,107,0,0.14),transparent_48%),radial-gradient(circle_at_84%_84%,rgba(255,199,150,0.22),transparent_52%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative h-20 overflow-hidden rounded-2xl border border-[#FF6B00]/10 bg-gradient-to-br p-4" style={{ backgroundImage: `linear-gradient(135deg,var(--tw-gradient-stops))` }}>
          <div className={`absolute inset-0 bg-gradient-to-br ${tone}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.16),transparent_42%)]" />
          <div className="relative flex h-full items-start justify-end">
            <span className="rounded-full border border-white/75 bg-white/80 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#B44A00]">
              {category}
            </span>
          </div>

          <span className="absolute inset-x-5 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#FF6B00]/70 transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        <div className="relative mt-6">
          <div className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-slate-500">{label}</div>
          <div className="mt-3 flex items-baseline gap-1 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            <span className="tabular-nums">{animatedValue}</span>
            <span className="text-2xl text-[#FF6B00] md:text-3xl">{suffix}</span>
          </div>
          
        </div>
      </motion.article>
    </Tilt>
  );
}
