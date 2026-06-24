import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Rocket,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import ahubImg from "@/assets/incubators/ahub.jpg";
import auElementAhubImg from "@/assets/incubators/au element ahub.jpg";
import marineAhubImg from "@/assets/incubators/marine ahub.jpg";
import nasscomAhubImg from "@/assets/incubators/nasscom ahub.jpg";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicIncubators } from "@/hooks/usePublicContent";

type StatItem = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

type Incubator = {
  name: string;
  tagline: string;
  short: string;
  long: string;
  blurb: string;
  image: string;
  card: string;
  stats: [StatItem, StatItem, StatItem];
};

const incubators: Incubator[] = [
  {
    name: "āHub",
    tagline: "Andhra University's Flagship Innovation Centre",
    short:
      "A state-of-the-art NIDHI iTBI facility at the Andhra University Incubation Council, built to turn research-led ideas into investable, market-ready ventures.",
    long:
      "Modern infrastructure, dedicated incubation bays, and structured mentorship connect founders with capital, corporates, and academic expertise—supporting deep tech, health, and enterprise innovation from day one.",
    blurb:
      "Workshops, demo days, and investor connects help teams move from prototype to product–market fit inside a high-trust institutional environment.",
    image: ahubImg,
    card: auElementAhubImg,
    stats: [
      { value: "120+", label: "Startups", Icon: Rocket },
      { value: "80+", label: "Mentors", Icon: Users },
      { value: "₹50Cr+", label: "Funding", Icon: TrendingUp },
    ],
  },
  {
    name: "AU Element āHub",
    tagline: "Deep-Tech & Materials Innovation",
    short:
      "A specialised incubation hub for founders working across materials science, chemistry, and elemental technologies—bridging lab research with commercial outcomes.",
    long:
      "AU Element āHub provides domain labs, technical advisory, and industry linkages so teams can validate IP, run structured pilots, and build defensible products with academic rigour.",
    blurb:
      "Founders access expert mentors, shared R&D infrastructure, and partner networks tailored to science-led, high-impact ventures.",
    image: auElementAhubImg,
    card: marineAhubImg,
    stats: [
      { value: "40+", label: "Ventures", Icon: Rocket },
      { value: "25+", label: "Labs", Icon: Users },
      { value: "15+", label: "Partners", Icon: TrendingUp },
    ],
  },
  {
    name: "Marine āHub",
    tagline: "Advancing the Blue Economy",
    short:
      "Hosted at the Department of Marine Living Resources, Andhra University, Marine āHub nurtures innovation in aquaculture, marine biotechnology, and sustainable ocean industries.",
    long:
      "Entrepreneurs gain access to specialised research facilities, field expertise, and academic mentorship to develop solutions for fisheries, coastal livelihoods, and the growing blue-economy sector.",
    blurb:
      "From lab validation to market pilots, Marine āHub connects science-driven founders with the resources needed to scale responsible, impact-focused marine ventures.",
    image: marineAhubImg,
    card: nasscomAhubImg,
    stats: [
      { value: "30+", label: "Ventures", Icon: Rocket },
      { value: "12+", label: "Research Labs", Icon: Users },
      { value: "20+", label: "Industry Ties", Icon: TrendingUp },
    ],
  },
  {
    name: "NASSCOM āHub",
    tagline: "Digital & AI Startup Acceleration",
    short:
      "An industry-aligned incubator in partnership with NASSCOM, focused on scalable software, AI, and digital products built for India and global markets.",
    long:
      "Startups receive structured go-to-market support, enterprise connects, and technology mentorship—helping teams refine products, win pilots, and prepare for institutional funding.",
    blurb:
      "NASSCOM āHub links founders to ecosystem programs, corporate innovation tracks, and a national network of operators and investors.",
    image: nasscomAhubImg,
    card: ahubImg,
    stats: [
      { value: "50+", label: "Tech Startups", Icon: Rocket },
      { value: "100+", label: "Mentors", Icon: Users },
      { value: "35+", label: "Enterprise Pilots", Icon: TrendingUp },
    ],
  },
];

export function IncubatorsShowcase() {
  const { data: incubatorsData } = usePublicIncubators(incubators);
  const [i, setI] = useState(0);
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-8, 8]);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const c = incubatorsData[i];

  const next = () => setI((x) => (x + 1) % incubatorsData.length);
  const prev = () => setI((x) => (x - 1 + incubatorsData.length) % incubatorsData.length);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's Next"
            title="Incubators"
            subtitle="Specialised incubation centres across Andhra University and industry partnerships—each built for a distinct founder journey."
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl px-4 md:px-8">
        <div className="mx-auto rounded-[2rem] bg-white p-5 shadow-2xl">
          <div
            className="grid gap-5 rounded-[1.5rem] p-5 md:grid-cols-2"
            style={{ background: "var(--gradient-brand)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={c.image}
                src={c.image}
                alt={c.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-64 w-full rounded-[1.25rem] object-cover"
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white"
              >
                <h3 className="text-3xl font-bold">{c.name}</h3>
                <p className="mt-1 font-semibold">{c.tagline}</p>
                <p className="mt-3 text-sm">{c.short}</p>
                <p className="mt-2 text-sm text-white/90">{c.long}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-[1.5rem] p-5" style={{ background: "var(--gradient-brand)" }}>
              <p className="text-sm font-medium text-neutral-900">{c.blurb}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {c.stats.map(({ value, label, Icon }) => (
                  <div
                    key={`${c.name}-${label}`}
                    className="rounded-2xl bg-white p-3"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "#FF9800" }} />
                    <div className="mt-2 font-bold">{value}</div>
                    <div className="text-xs text-neutral-500">{label}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold">
                Visit <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div ref={constraintsRef} className="relative flex items-center justify-center px-8">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous incubator"
                className="absolute left-0 text-neutral-400 hover:text-neutral-700"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={c.card}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      prev();
                      return;
                    }
                    if (info.offset.x < -100) {
                      next();
                    }
                  }}
                  style={{ x: dragX, rotate }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ cursor: "grabbing" }}
                  className="cursor-grab overflow-hidden rounded-[1.25rem] shadow-2xl"
                >
                  <img
                    src={c.card}
                    alt={c.name}
                    className="h-48 w-72 object-cover"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={next}
                aria-label="Next incubator"
                className="absolute right-0 text-neutral-400 hover:text-neutral-700"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
