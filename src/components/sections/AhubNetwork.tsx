import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Lightbulb, Rocket, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

type FeatureCard = {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
};

const features: FeatureCard[] = [
  {
    title: "Get Funded",
    description: "Discover investment opportunities and track progress from pitch to partnership.",
    tags: ["Funding", "Pitching"],
    icon: Rocket,
  },
  {
    title: "Grow with Mentors",
    description: "Access guidance across product, growth, strategy, and fundraising.",
    tags: ["Mentorship", "Strategy"],
    icon: Users,
  },
  {
    title: "Events",
    description: "Join ecosystem events, startup showcases, and networking opportunities.",
    tags: ["Events", "Networking"],
    icon: Calendar,
  },
  {
    title: "Startups",
    description: "Explore innovative startups building the future through incubation support.",
    tags: ["Innovation", "Ecosystem"],
    icon: Lightbulb,
  },
];

export function AhubNetwork() {
  return (
    <section id="ahub-network" className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8F0_0%,#FFE8D6_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,50,0.08),transparent_60%)]" />
      
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 px-3.5 py-1 text-xs uppercase tracking-[0.18em] text-primary/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Network
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-balance font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mb-4"
            style={{color: "#000000"}}
          >
            What We Do
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="text-balance text-base leading-relaxed md:text-lg"
            style={{color: "#000000"}}
          >
            From ideation to execution — connect with funding, mentors, and opportunities.
          </motion.p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, tags, icon: Icon, index }: FeatureCard & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div
        className={`flex h-full flex-col rounded-2xl p-6 md:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-white/60`}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110`}
            style={{
              background: "linear-gradient(135deg, #ff8901 0%, #ffb366 100%)"
            }}
          >
            <Icon size={24} style={{color: "white"}} />
          </div>
          <ArrowUpRight
            size={18}
            style={{
              color: "#ff8901",
              opacity: 0.6
            }}
            className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>

        <h3 className="mb-2 text-lg font-semibold" style={{color: "#000000"}}>
          {title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed" style={{color: "#5a5a5a"}}>
          {description}
        </p>

        <div className="mb-3 h-0.5 w-8 rounded-full" style={{background: "linear-gradient(90deg, #ff8901 0%, #ffb366 100%)"}} />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide"
              style={{
                background: "#ff8901",
                color: "white"
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}