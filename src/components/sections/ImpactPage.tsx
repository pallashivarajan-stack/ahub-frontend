import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Rocket,
  GraduationCap,
  Globe,
  Briefcase,
  Users,
  Coins,
  Building2,
  Building,
  Calendar,
} from "lucide-react";
import { usePublicImpact } from "@/services/usePublicContent";

interface MetricItem {
  id: string;
  value: string;
  label: string;
  subLabel?: string;
  icon: any;
  colorClass: string;       // Text color
  bgClass: string;          // Icon wrapper background
  iconColorClass: string;   // Icon color
  lineColorClass: string;   // Accent line background color
}

const metrics: MetricItem[] = [
  {
    id: "active-startups",
    value: "237",
    label: "ACTIVE STARTUPS",
    icon: Rocket,
    colorClass: "text-[#008080]",
    bgClass: "bg-[#e0f2f1]",
    iconColorClass: "text-[#008080]",
    lineColorClass: "bg-[#008080]",
  },
  {
    id: "startups-graduated",
    value: "42",
    label: "STARTUPS GRADUATED",
    icon: GraduationCap,
    colorClass: "text-[#e06b20]",
    bgClass: "bg-[#fff3e0]",
    iconColorClass: "text-[#e06b20]",
    lineColorClass: "bg-[#e06b20]",
  },
  {
    id: "international-startups",
    value: "14",
    label: "INTERNATIONAL STARTUPS",
    icon: Globe,
    colorClass: "text-[#673ab7]",
    bgClass: "bg-[#f3e5f5]",
    iconColorClass: "text-[#673ab7]",
    lineColorClass: "bg-[#673ab7]",
  },
  {
    id: "employment-generated",
    value: "726",
    label: "EMPLOYMENT GENERATED",
    icon: Briefcase,
    colorClass: "text-[#2196f3]",
    bgClass: "bg-[#e3f2fd]",
    iconColorClass: "text-[#2196f3]",
    lineColorClass: "bg-[#2196f3]",
  },
  {
    id: "interns",
    value: "400",
    label: "INTERNS",
    icon: Users,
    colorClass: "text-[#e91e63]",
    bgClass: "bg-[#fce4ec]",
    iconColorClass: "text-[#e91e63]",
    lineColorClass: "bg-[#e91e63]",
  },
  {
    id: "funds-raised",
    value: "151 Cr",
    label: "FUNDS RAISED",
    icon: Coins,
    colorClass: "text-[#15803d]",
    bgClass: "bg-[#f0fdf4]",
    iconColorClass: "text-[#15803d]",
    lineColorClass: "bg-[#15803d]",
  },
  {
    id: "space-built-up",
    value: "124500 Sq.ft",
    label: "INCUBATION SPACE",
    subLabel: "(BUILT UP)",
    icon: Building2,
    colorClass: "text-[#0d9488]",
    bgClass: "bg-[#f0fdfa]",
    iconColorClass: "text-[#0d9488]",
    lineColorClass: "bg-[#0d9488]",
  },
  {
    id: "space-operational",
    value: "65500 Sq.ft",
    label: "INCUBATION SPACE",
    subLabel: "(OPERATIONAL)",
    icon: Building,
    colorClass: "text-[#ea580c]",
    bgClass: "bg-[#fff7ed]",
    iconColorClass: "text-[#ea580c]",
    lineColorClass: "bg-[#ea580c]",
  },
  {
    id: "events",
    value: "276",
    label: "EVENTS",
    icon: Calendar,
    colorClass: "text-[#6366f1]",
    bgClass: "bg-[#eef2ff]",
    iconColorClass: "text-[#6366f1]",
    lineColorClass: "bg-[#6366f1]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function ImpactPage() {
  const { data: impactData } = usePublicImpact(metrics);

  const displayMetrics = useMemo(() => {
    if (!impactData) return metrics;
    if ('icon' in impactData[0]) return impactData as MetricItem[];
    const apiMetrics = impactData as Array<{id: string; value: string; label: string; subLabel?: string}>;
    return metrics.map(fallback => {
      const api = apiMetrics.find(m => m.id === fallback.id);
      return api ? { ...fallback, value: api.value, label: api.label, subLabel: api.subLabel ?? fallback.subLabel } : fallback;
    });
  }, [impactData]);
  return (
    <div className="relative bg-slate-50 pb-20">
      {/* Dark Teal Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061e1b] via-[#031412] to-[#010908] py-24 md:py-28 lg:py-32">
        {/* Background Graphic Lines / Decorative Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#008080]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#e75710]/5 blur-[120px]" />

        <div className="relative site-container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.3em] text-[#00cca3]">
              Impact
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[44px]">
              GROWTH STORY:{" "}
              <span className="text-[#ea580c]">APR 2022 – FEB 2026</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Building a strong startup ecosystem through{" "}
              <span className="font-semibold text-[#00cca3]">innovation</span>,{" "}
              <span className="font-semibold text-[#00cca3]">opportunity</span>{" "}
              and{" "}
              <span className="font-semibold text-[#00cca3]">growth</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Container Block */}
      <div className="relative -mt-16 site-container-wide z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_24px_50px_rgba(0,0,0,0.06)] sm:p-10 md:p-12"
        >
          {/* Metrics Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-6 rounded-2xl p-3 transition-all duration-300 hover:bg-slate-50"
                >
                  {/* Icon wrapper */}
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${metric.bgClass}`}
                  >
                    <Icon className={`h-8 w-8 ${metric.iconColorClass}`} strokeWidth={1.75} />
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col">
                    <span
                      className={`text-[2rem] font-extrabold leading-none tracking-tight ${metric.colorClass}`}
                    >
                      {metric.value}
                    </span>
                    <div
                      className={`mt-1.5 h-[2px] w-8 rounded-full ${metric.lineColorClass}`}
                    />
                    <span className="mt-2 text-[0.74rem] font-bold tracking-wider text-slate-500">
                      {metric.label}
                    </span>
                    {metric.subLabel && (
                      <span className="text-[0.68rem] font-semibold text-slate-400">
                        {metric.subLabel}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
