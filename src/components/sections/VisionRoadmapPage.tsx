import { motion, Variants } from "framer-motion";
import { Rocket, Target, ChevronRight } from "lucide-react";
import { visionData, roadmapData, timelineYears } from "@/data/visionRoadmap";
import { usePublicVisionRoadmap } from "@/services/usePublicContent";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F2] pb-12 pt-20 md:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#FF6B00]/5 blur-[100px]" />
        <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#FFA64D]/5 blur-[100px]" />
      </div>

      <div className="relative site-container-wide text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
          About Us
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <span className="hidden h-px w-12 bg-[#FF6B00]/40 sm:block" />
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1736] sm:text-4xl md:text-5xl">
            Vision & <span className="text-[#FF6B00]">Roadmap</span>
          </h1>
          <span className="hidden h-px w-12 bg-[#FF6B00]/40 sm:block" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 max-w-xl text-base text-[#6B7280]"
        >
          Transforming Innovation Into Impact
        </motion.p>
      </div>
    </section>
  );
}

/* ── Vision / Mission Cards ── */
function VisionCards({ data }: { data: any }) {
  return (
    <section className="bg-[#FFF8F2] px-4 pb-16">
      <div className="site-container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2"
        >
          {data.map((item: any) => {
            const Icon = item.icon === "Rocket" ? Rocket : Target;
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-[#FF6B00]/10 bg-white shadow-lg transition-all hover:shadow-xl hover:shadow-[#FF6B00]/10"
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden md:h-full">
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B00]">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B00]">
                        {item.title}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-[#0B1736] md:text-2xl">
                      {item.heading}
                    </h3>
                    <div className="mt-2 h-px w-10 bg-[#FF6B00]" />
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Roadmap Image ── */
function RoadmapSection({ data }: { data: any }) {
  return (
    <section className="bg-[#FAF7F4] px-4 py-16">
      <div className="site-container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">
            Our Roadmap
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 text-3xl font-bold tracking-tight text-[#0B1736] md:text-4xl"
          >
            {data.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-3 h-px w-12 bg-[#FF6B00]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-[#FF6B00]/10">
            <img
              src={data.image}
              alt="Strategic Roadmap"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Timeline Years ── */
function TimelineSection({ data }: { data: any }) {
  return (
    <section className="bg-[#FAF7F4] px-4 pb-16">
      <div className="site-container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">
            Milestones
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 text-3xl font-bold tracking-tight text-[#0B1736] md:text-4xl"
          >
            Our Journey
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-3 h-px w-12 bg-[#FF6B00]" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {data.map((item: any) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              className="group overflow-hidden rounded-2xl border border-[#FF6B00]/10 bg-white shadow-lg transition-all hover:shadow-xl hover:shadow-[#FF6B00]/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.year}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-bold text-white">
                    {item.year}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-semibold text-[#0B1736]">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-[#FF6B00]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export function VisionRoadmapPage() {
  const { data } = usePublicVisionRoadmap({
    visionData,
    roadmapData,
    timelineYears,
  });

  return (
    <>
      <HeroSection />
      <VisionCards data={data.visionData} />
      <RoadmapSection data={data.roadmapData} />
      <TimelineSection data={data.timelineYears} />
    </>
  );
}
