import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Rocket,
  TrendingUp,
  Users,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicIncubators } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

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
    image: resolveLegacyAsset("/src/assets/incubators/ahub.jpg"),
    card: resolveLegacyAsset("/src/assets/incubators/au element ahub.jpg"),
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
    image: resolveLegacyAsset("/src/assets/incubators/au element ahub.jpg"),
    card: resolveLegacyAsset("/src/assets/incubators/marine ahub.jpg"),
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
    image: resolveLegacyAsset("/src/assets/incubators/marine ahub.jpg"),
    card: resolveLegacyAsset("/src/assets/incubators/nasscom ahub.jpg"),
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
    image: resolveLegacyAsset("/src/assets/incubators/nasscom ahub.jpg"),
    card: resolveLegacyAsset("/src/assets/incubators/ahub.jpg"),
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
    <section className="py-10 md:py-14">
      <div className="site-container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's Next"
            title="Incubators"
            subtitle="Specialised incubation centres across Andhra University and industry partnerships—each built for a distinct founder journey."
          />
        </div>
      </div>

      <div className="mx-auto mt-6 px-4 md:px-8" style={{ maxWidth: "min(100% - 0.9rem, 1037px)", paddingInline: "clamp(0.9rem, 2.7vw, 1.8rem)" }}>
        <div className="mx-auto rounded-[2rem] bg-white p-5 shadow-2xl">
          <div
            className="grid gap-5 rounded-[1.5rem] p-5 md:grid-cols-2"
            style={{ background: "linear-gradient(135deg, #F59E42 0%, #F97316 50%, #EA580C 100%)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={c.image}
                src={c.image}
                alt={c.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-[4/3] w-full rounded-[1.25rem] object-cover sm:aspect-auto sm:h-64"
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white flex flex-col justify-center"
              >
                {/* Header with building icon on the left */}
                <div className="flex items-center gap-4.5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-white/10">
                    <Building2 className="h-9 w-9 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-white">{c.name}</h3>
                    <p className="mt-0.5 text-sm md:text-base font-semibold text-white/90">{c.tagline}</p>
                  </div>
                </div>
                {/* Orange accent line */}
                <div className="h-1.5 w-14 bg-orange-600 rounded-full mt-4 mb-2" />

                <p className="mt-4 text-[13.5px] md:text-sm leading-relaxed text-white/95">{c.short}</p>
                <p className="mt-2.5 text-[13px] md:text-[13.5px] leading-relaxed text-white/80">{c.long}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div
              className="rounded-[1.5rem] p-5 flex flex-col justify-between"
              style={{ background: "linear-gradient(135deg, #F59E42 0%, #F97316 50%, #EA580C 100%)", border: "2px solid #F59E42" }}
            >
              <p className="text-sm font-medium text-white">
                {c.blurb}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {c.stats.map(({ value, label, Icon }: StatItem) => (
                  <div
                    key={`${c.name}-${label}`}
                    className="rounded-2xl bg-white p-2.5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50">
                      <Icon className="h-4 w-4 text-[#F97316]" />
                    </div>
                    <div className="mt-2 text-base font-black text-neutral-900 leading-none">{value}</div>
                    <div className="text-[10px] font-semibold text-neutral-500 mt-1 leading-none">{label}</div>
                    <div className="h-0.5 w-5 bg-orange-500 rounded-full mt-2.5" />
                  </div>
                ))}
              </div>
              <div>
                <button className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-bold text-neutral-900 transition-all duration-200 hover:scale-105 active:scale-95">
                  Visit <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
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
                  className="cursor-grab overflow-hidden rounded-[1.25rem] shadow-2xl w-full max-w-[min(252px,80vw)] aspect-[3/2]"
                >
                  <img
                    src={c.card}
                    alt={c.name}
                    className="h-full w-full object-cover"
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
