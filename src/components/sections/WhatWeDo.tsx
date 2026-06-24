import { motion, Variants } from "framer-motion";
import ideationIcon from "@/assets/what-we-do/ideation.png";
import mentorshipIcon from "@/assets/what-we-do/mentorship.png";
import resourcesIcon from "@/assets/what-we-do/resources.png";
import fundingIcon from "@/assets/what-we-do/funding.png";
import whatWeDoBackground from "@/assets/What we do.png";

type WhatWeDoCard = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

const cards: WhatWeDoCard[] = [
  {
    number: "01",
    title: "IDEATION & VALIDATION",
    description:
      "Helping ideas take shape through market research, mentorship, and validation.",
    icon: ideationIcon,
  },
  {
    number: "02",
    title: "MENTORSHIP & GROWTH",
    description:
      "Connecting startups with industry experts and providing guidance to grow and scale.",
    icon: mentorshipIcon,
  },
  {
    number: "03",
    title: "RESOURCES & SUPPORT",
    description:
      "Providing access to essential resources, workspaces, and hands-on support at every stage.",
    icon: resourcesIcon,
  },
  {
    number: "04",
    title: "FUNDING & PARTNERSHIPS",
    description:
      "Facilitating funding opportunities and strategic partnerships to accelerate startup success.",
    icon: fundingIcon,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden"
      style={{ background: "#FFF9F2" }}
    >
      {/* Background image with enhanced blending */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat opacity-[0.25]"
        style={{ backgroundImage: `url("${whatWeDoBackground}")` }}
      />
      {/* Seamless gradient mask to sync with adjacent sections */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[#FFF9F2] via-transparent to-[#FFF9F2]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#FFF9F2_100%)] opacity-80" />

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,66,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,66,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Subtle circular line patterns */}
      <div className="pointer-events-none absolute right-[10%] top-[15%] -z-10 h-64 w-64 rounded-full border border-[#F59E42]/10 opacity-40" />
      <div className="pointer-events-none absolute right-[8%] top-[13%] -z-10 h-80 w-80 rounded-full border border-[#F59E42]/5 opacity-30" />
      <div className="pointer-events-none absolute bottom-[10%] left-[5%] -z-10 h-48 w-48 rounded-full border border-[#F59E42]/8 opacity-30" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto text-center"
          style={{ maxWidth: "900px" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="h-px flex-1"
              style={{
                maxWidth: "80px",
                background:
                  "linear-gradient(90deg, transparent, #F59E42)",
              }}
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#F59E42" }}
            >
              WHAT WE DO
            </span>
            <div
              className="h-px flex-1"
              style={{
                maxWidth: "80px",
                background:
                  "linear-gradient(90deg, #F59E42, transparent)",
              }}
            />
          </div>

          {/* Main Heading */}
          <h2
            className="font-display leading-[1.1]"
            style={{
              fontSize: "clamp(36px, 4.5vw, 54px)",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#0E2245" }}>We </span>
            <span
              style={{
                background: "linear-gradient(135deg, #F59E42, #FF7A00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Empower
            </span>
            <span style={{ color: "#0E2245" }}> Startups.</span>
            <br />
            <span style={{ color: "#0E2245" }}>We </span>
            <span
              style={{
                background: "linear-gradient(135deg, #F59E42, #FF7A00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Build
            </span>
            <span style={{ color: "#0E2245" }}> Futures.</span>
          </h2>

          {/* Orange accent line */}
          <div className="mx-auto mt-4" style={{ width: "50px", height: "3px", borderRadius: "3px", background: "linear-gradient(90deg, #F59E42, #FF7A00)" }} />

          {/* Description */}
          <p
            className="mx-auto mt-4 leading-relaxed"
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "#6B7280",
              maxWidth: "600px",
            }}
          >
            AHUB Incubation Council is dedicated to nurturing ideas,
            empowering founders, and building impactful ventures.
          </p>
        </motion.div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {cards.map((card) => (
            <motion.div key={card.number} variants={cardVariants}>
              <WhatWeDoCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhatWeDoCard({
  number,
  title,
  description,
  icon,
}: WhatWeDoCard) {
  return (
    <div
      className="group relative flex items-center gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: "28px",
        padding: "24px",
        minHeight: "220px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Icon Container */}
      <div
        className="shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{
          width: "clamp(90px, 11vw, 120px)",
          height: "clamp(90px, 11vw, 120px)",
          borderRadius: "22px",
          background: "linear-gradient(135deg, #FFA44F, #F97316)",
          boxShadow: "0 10px 20px rgba(249,115,22,0.25)",
        }}
      >
        <img
          src={icon}
          alt={title}
          className="h-3/4 w-3/4 object-contain"
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {/* Number */}
        <div
          className="font-display font-bold"
          style={{
            fontSize: "clamp(22px, 2.8vw, 28px)",
            color: "#F59E42",
          }}
        >
          {number}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold tracking-tight mt-0.5"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#0E2245",
          }}
        >
          {title}
        </h3>

        {/* Accent divider */}
        <div
          className="mt-2"
          style={{
            width: "40px",
            height: "2px",
            borderRadius: "2px",
            background: "#F59E42",
          }}
        />

        {/* Description */}
        <p
          className="mt-2 leading-relaxed"
          style={{
            fontSize: "clamp(13px, 1.3vw, 15px)",
            color: "#4B5563",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
