import { motion, Variants, useReducedMotion } from "framer-motion";
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
import { useCountUp } from "@/hooks/useCountUp";
import { usePublicAhubNetwork } from "@/services/usePublicContent";

type IconType = ComponentType<{ size?: number; className?: string }>;

type StatCardProps = {
  label: string;
  value: number;
  suffix: string;
  description: string;
  category: string;
  icons: IconType[];
  tone: string;
};

const cards: StatCardProps[] = [
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AhubNetwork() {
  const { data: networkCards } = usePublicAhubNetwork(cards);
  const shouldAnimate = !useReducedMotion();
  const displayCards = Array.isArray(networkCards) ? networkCards : cards;
  return (
    <section id="ahub-network" className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8F0_0%,#FFE8D6_100%)] py-16 md:py-24" aria-label="AHUB Network - Statistics">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,50,0.08),transparent_60%)]" aria-hidden="true" />
      
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center mb-10">
          <motion.div
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            } : {})}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 px-3.5 py-1 text-xs uppercase tracking-[0.18em] text-primary/80 bg-white/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Network
          </motion.div>
          
            <motion.h2
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-80px" },
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
              } : {})}
              className="text-balance font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mb-4"
            >
              <span style={{ color: '#F97316' }}>ā</span><span style={{ color: '#F97316' }}>Hub</span>{' '}
              <span style={{ color: '#000000' }}>Network</span>
            </motion.h2>
          
          <motion.p
            {...(shouldAnimate ? {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
            } : {})}
            className="text-balance text-base leading-relaxed md:text-lg max-w-2xl mx-auto"
            style={{color: "#000000"}}
          >
            From ideation to execution — connect with funding, mentors, and opportunities.
          </motion.p>
        </div>

        <motion.div
          {...(shouldAnimate ? {
            variants: containerVariants,
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: { once: true, margin: "-80px" as const },
          } : {})}
          className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {displayCards.map((card) => (
            <motion.div
              key={card.label}
              {...(shouldAnimate ? { variants: cardVariants } : {})}
            >
              <StatCard {...card} shouldAnimate={shouldAnimate} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, description, category, icons, tone, shouldAnimate }: StatCardProps & { shouldAnimate: boolean }) {
  const { ref, value: animatedValue } = useCountUp(value, 1800);
  const Icon = icons[0];
  const displayValue = shouldAnimate ? animatedValue : value;

  return (
    <Tilt
      tiltEnable={shouldAnimate}
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
        {...(shouldAnimate ? { whileHover: { y: -7 } } : {})}
        className="group relative h-full overflow-hidden rounded-[28px] border border-[#FF6B00]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,248,242,0.92))] p-6 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.24)] transition-all duration-500 md:p-7"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_16%_15%,rgba(255,107,0,0.14),transparent_48%),radial-gradient(circle_at_84%_84%,rgba(255,199,150,0.22),transparent_52%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative h-20 overflow-hidden rounded-2xl border border-[#FF6B00]/10 p-4">
          <div className={`absolute inset-0 bg-gradient-to-br ${tone}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.16),transparent_42%)]" />
          <div className="relative flex h-full items-center justify-between">
            {Icon && (
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm shadow-sm">
                <Icon className="h-5 w-5 text-[#FF6B00]" />
              </span>
            )}
            <span className="rounded-full border border-white/75 bg-white/80 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#B44A00]">
              {category}
            </span>
          </div>

          <span className="absolute inset-x-5 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#FF6B00]/70 transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        <div className="relative mt-6">
          <div className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-slate-500">{label}</div>
          <div className="mt-3 flex items-baseline gap-1 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            <span className="tabular-nums">{displayValue}</span>
            <span className="text-2xl text-[#FF6B00] md:text-3xl">{suffix}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">{description}</p>
        </div>
      </motion.article>
    </Tilt>
  );
}
