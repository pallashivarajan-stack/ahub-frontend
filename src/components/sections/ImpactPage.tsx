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
    <div className="relative bg-[#FDF8F2] pb-20 pt-24">
      {/* Header Section - Matched with Partners/Reports style */}
      <div className="site-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
            Impact
          </div>
          
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-3xl md:text-4xl">
            GROWTH STORY: <span className="text-[#F59E42]">APR 2022 – FEB 2026</span>
          </h1>
          
          <p className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]">
            Building a strong startup ecosystem through innovation, opportunity and growth.
          </p>
          
          <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
        </motion.div>
      </div>

      {/* Metrics Container Block */}
      <div className="relative site-container-wide z-10">
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
