import { useState, Fragment } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Users,
  Bot,
  TrendingUp,
  GraduationCap,
  Video,
  BookOpen,
  Leaf,
  Building,
  Compass,
  Sparkles,
  Cpu,
  MapPin,
  ShoppingBag
} from "lucide-react";
import { portfolio } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

const ICON_MAP: Record<string, any> = {
  Video,
  GraduationCap,
  Bot,
  BookOpen,
  Users,
  Cpu,
  Leaf,
  Building,
  Compass,
  Sparkles,
  TrendingUp,
  MapPin,
  ShoppingBag,
};

const startupStats: Record<
  string,
  {
    icon: string;
    label: string;
    value: string;
  }[]
> = {
  "Interview Buddy": [
    { icon: "Video", label: "Mock Interviews", value: "100+" },
    { icon: "GraduationCap", label: "Students Placed", value: "250+" },
    { icon: "Bot", label: "AI Sessions", value: "500+" },
  ],
  EduEmblem: [
    { icon: "ShoppingBag", label: "Curated Products", value: "100+" },
    { icon: "Users", label: "University Communities", value: "10K+" },
    { icon: "TrendingUp", label: "Discounts Up To", value: "44%" },
  ],
  DreamBot: [
    { icon: "Bot", label: "Support Available", value: "24/7" },
    { icon: "Cpu", label: "Tasks Automated", value: "Multi" },
    { icon: "TrendingUp", label: "Control Modes", value: "3" },
  ],
  "Joora Drones": [
    { icon: "MapPin", label: "Projects Completed", value: "170+" },
    { icon: "Users", label: "Clients Served", value: "50+" },
    { icon: "TrendingUp", label: "Faster Than Traditional", value: "10x" },
  ],
  KodeFast: [
    { icon: "Sparkles", label: "Applications Built", value: "500+" },
    { icon: "Cpu", label: "Automation Rate", value: "98%" },
    { icon: "TrendingUp", label: "Integrations", value: "50+" },
  ],
};

const getStatsForStartup = (startup: string, achievements: string[]) => {
  if (startupStats[startup]) {
    return startupStats[startup];
  }
  return [
    { icon: "Sparkles", label: achievements[0] || "Projects Supported", value: "100+" },
    { icon: "TrendingUp", label: achievements[1] || "Growth Achieved", value: "250+" },
    { icon: "Users", label: achievements[2] || "Active Members", value: "500+" },
  ];
};

// Custom styling details for mock/placement/growth themed items
const ACHIEVEMENT_THEMES = [
  {
    bgLight: "bg-[#FAF7FF]/90",
    borderCol: "border-[#EFE5FF]/80",
    iconBg: "bg-[#F3EBFF]",
    iconColor: "text-[#8B5CF6]",
    hexCol: "#8B5CF6",
    subtitles: {
      "AI Mock Interviews": "Practice Smarter",
      "Skill Building": "Learn & Grow",
      "Eco-Friendly": "Save Planet",
      "Habit Building": "Read Daily",
      "Deep Tech": "Next-Gen Tech"
    } as Record<string, string>,
    icon: Bot
  },
  {
    bgLight: "bg-[#FFF9F5]/90",
    borderCol: "border-[#FFE5D3]/80",
    iconBg: "bg-[#FFEFE5]",
    iconColor: "text-[#F97316]",
    hexCol: "#F97316",
    subtitles: {
      "Placement Ready": "Get Job Ready",
      "Community Led": "Connect Together",
      "Carbon Negative": "Zero Emission",
      "Global Community": "Connect Worldwide",
      "Defense Innovation": "Secure Nations"
    } as Record<string, string>,
    icon: Briefcase
  },
  {
    bgLight: "bg-[#F7FCF9]/90",
    borderCol: "border-[#E2F5EA]/80",
    iconBg: "bg-[#EBFDF3]",
    iconColor: "text-[#10B981]",
    hexCol: "#10B981",
    subtitles: {
      "Career Growth": "Grow Continuously",
      "Empowering Careers": "Grow Continuously",
      "Student Focus": "Excel Academically",
      "Green Building": "Build Future",
      "Self Growth": "Transform Life",
      "Strategic Systems": "Tactical Edge"
    } as Record<string, string>,
    icon: TrendingUp
  }
];

export function PortfolioCompanies() {
  const [active, setActive] = useState(0);

  return (
    <section id="achieve" className="relative overflow-hidden py-10 md:py-14">
      <div className="site-container-wide">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Our remarkable <span className="text-[#FF7A00]">portfolio</span> <span className="text-[#2D1B1B]/40 font-normal">companies</span>
            </>
          }
          subtitle="The passionate, goal-driven entrepreneurs writing the next chapter of Indian innovation."
        />

        {/* Desktop View — Accordion */}
        <div className="hidden md:flex mt-20 h-[450px] gap-3 md:h-[480px]">
          {portfolio.map((p: any, i: number) => {
            const isActive = i === active;
            return (
              <motion.button
                key={p.startup}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                layout
                animate={{
                  flexGrow: isActive ? 4 : 1,
                  scale: isActive ? 1 : 0.95,
                  opacity: isActive ? 1 : 0.75,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className={`group relative basis-0 overflow-hidden rounded-[27px] border-2 bg-[#FDFBF7] text-left focus:outline-none will-change-transform transition-colors duration-300 ${isActive ? "border-[#F59E42] shadow-[0_20px_60px_-15px_rgba(245,158,66,0.3)]" : "border-[#F59E42]/20 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:border-[#F59E42]/50"}`}
              >
                {isActive && (
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-orange-500/20 to-transparent" />
                )}

                {/* ── Collapsed state ── */}
                <div className={`absolute inset-0 flex items-end justify-center pb-12 transition-all duration-500 ${isActive ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}>
                      {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.startup}
                      className={`max-w-none flex-shrink-0 object-contain -rotate-90 transition-all duration-500 group-hover:scale-108 ${p.startup === "DreamBot" ? "w-[100px] h-[35px]" : "w-[135px] h-[47px]"}`}
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center w-[61px] h-[131px] rounded-2xl text-white text-2xl font-bold shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_8px_28px_rgba(249,115,22,0.12)]"
                      style={{ background: "linear-gradient(135deg, #F97316, #FB923C)" }}
                    >
                      <span className="-rotate-90 block tracking-wider select-none">{p.startup.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* ── Expanded state ── */}
                <div
                  className={`absolute inset-0 z-10 flex h-full flex-col md:flex-row items-stretch p-8 md:p-10 gap-8 md:gap-12 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
                    }`}
                >
                  {/* Left Column (approx 55%) */}
                  <div className="flex flex-col justify-start gap-4 flex-1 min-w-0 md:max-w-[55%] h-full relative">
                    <div className="space-y-4">
                      {/* Startup Category Badge */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7A00] bg-[#FFF8F1] px-3.5 py-1.5 rounded-full border border-[#FF7A00]/20">
                          • {p.category || p.industry}
                        </span>
                      </div>

                      {/* Clean Logo Ribbon Section — adapts to logo size dynamically */}
                      <div className="absolute left-[-32px] md:left-[-40px] top-[48px] bg-[#FF7A00] p-[3px] pr-[4px] shadow-[0_4px_12px_rgba(255,122,0,0.12)] z-20"
                           style={{
                             clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)",
                           }}>
                        <div className="bg-white h-[60px] flex items-center pl-9 md:pl-11 pr-9"
                             style={{
                               clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)",
                             }}>
                          {p.logo ? (
                            <img
                              src={p.logo}
                              alt={`${p.startup} logo`}
                              className={`${p.startup === "DreamBot" ? "h-[36px]" : "h-[46px]"} w-auto max-w-[200px] object-contain flex-shrink-0`}
                              draggable={false}
                            />
                          ) : (
                            <span className="font-display font-black text-lg text-[#0F172A] whitespace-nowrap pr-2">{p.startup}</span>
                          )}
                        </div>
                      </div>

                      {/* Heading */}
                      <div className="pt-[86px] space-y-2">
                        <h3 className="font-display text-[1.2rem] font-bold tracking-tight text-[#0F172A] leading-[1.2] sm:text-[1.32rem]">
                          Your Partner in <br />
                          <span className="text-[#0F172A]">{p.startup}</span> <span className="text-[#FF7A00]">Success</span>
                        </h3>
                        <div className="h-0.5 w-16 bg-[#FF7A00]" />
                      </div>

                      {/* Description */}
                      <p className="text-slate-500 max-w-md text-[12px] leading-relaxed mt-2 line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Dynamic 3-Column Statistics Section */}
                      <div className="flex items-center gap-6 mt-4 border-t border-slate-100 pt-4">
                        {getStatsForStartup(p.startup, p.achievements).map((stat, index, arr) => {
                          const IconComponent = ICON_MAP[stat.icon] || Sparkles;
                          return (
                            <Fragment key={stat.label}>
                              <div className="flex flex-col items-center text-center flex-1 min-w-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#FF7A00] mb-1.5">
                                  <IconComponent size={14} />
                                </div>
                                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider leading-tight w-full">
                                  {stat.label}
                                </p>
                                <p className="text-base font-bold text-slate-800 mt-0.5">
                                  {stat.value}
                                </p>
                              </div>
                              {index < arr.length - 1 && (
                                <div className="h-8 w-px bg-slate-200/60" />
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                      {/* Visit Button (moved up to sit right below the statistics grid) */}
                      {p.website && (
                        <div className="pt-2">
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(249,115,22,0.15)] transition-all duration-300 hover:shadow-[0_6px_16px_rgba(249,115,22,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                          >
                            Visit <ArrowUpRight size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>


                  {/* Right Column — Light orange semicircle attached to right edge + 3:4 passport portrait (no border) */}
                  <div className="hidden md:flex flex-col items-center justify-center relative flex-1 min-w-0 md:max-w-[45%] h-full">

                    {/* 180° semicircle light orange/peach color attached to the right border, spanning full height */}
                    <div
                      className="absolute right-[-40px] top-0 bottom-0 w-[280px] pointer-events-none -z-10"
                      style={{
                        background: "linear-gradient(135deg, #FFEBD6 0%, #FFF3E6 100%)",
                        borderTopLeftRadius: "240px",
                        borderBottomLeftRadius: "240px",
                        opacity: 0.95,
                      }}
                    />

                    {/* Soft radial glow extending beyond the semicircle, spanning full height */}
                    <div
                      className="absolute right-[-40px] top-0 bottom-0 w-[360px] pointer-events-none -z-20 opacity-30"
                      style={{
                        background: "radial-gradient(ellipse at 100% 50%, #FFE5C9 0%, rgba(255,229,201,0.1) 70%, transparent 100%)",
                      }}
                    />

                    {/* Decorative dot grids */}
                    {/* Top-right dot grid */}
                    <div
                      className="absolute top-10 right-10 w-[70px] h-[60px] opacity-25 pointer-events-none z-10"
                      style={{
                        backgroundImage: "radial-gradient(circle, #FF7A00 1.5px, transparent 1.5px)",
                        backgroundSize: "9px 9px",
                      }}
                    />
                    {/* Bottom-left dot grid near portrait */}
                    <div
                      className="absolute left-10 bottom-12 w-[50px] h-[50px] opacity-20 pointer-events-none z-10"
                      style={{
                        backgroundImage: "radial-gradient(circle, #FF7A00 1.5px, transparent 1.5px)",
                        backgroundSize: "8px 8px",
                      }}
                    />

                    {/* Passport Portrait Container with overlapping floating card */}
                    <motion.div
                      className="relative z-10"
                      style={{ width: "180px", height: "225px" }}
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.08 : 0 }}
                    >
                      {/* Portrait frame — 3:4 passport size with rounded corners, no white border */}
                      <div
                        className="w-full h-full overflow-hidden rounded-[32px] shadow-[0_12px_32px_rgba(0,0,0,0.1)] bg-gradient-to-b from-[#FFF5EB] to-[#FFE4CC]"
                      >
                        {p.founderImage ? (
                          <img
                            src={p.founderImage}
                            alt={p.founder}
                            className={`h-full w-full object-[center_top] transition-transform duration-500 group-hover:scale-[1.03] will-change-transform ${p.startup === "DreamBot" ? "object-contain" : "object-cover"}`}
                            draggable={false}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-4xl font-black text-[#F97316]/30 select-none font-display">
                              {p.founder.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Floating Founder Card overlapping the bottom of the portrait by ~25-30% */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 z-20"
                        style={{ bottom: "-24px", width: "94%" }}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: isActive ? 0 : 8, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.16 : 0 }}
                      >
                        <div className="rounded-2xl bg-white border border-slate-100/80 px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
                          <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#FF7A00] leading-none mb-1">
                            Founded by
                          </p>
                          <h4 className="text-[12px] font-bold text-[#0F172A] tracking-tight leading-tight font-display uppercase truncate">
                            {p.founder}
                          </h4>
                          <p className="mt-1 text-[8.5px] font-semibold text-slate-400 leading-none uppercase tracking-wide truncate">
                            {p.founderTitle}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

              </motion.button>
            );
          })}
        </div>

        {/* Mobile View — Stacks vertically on mobile/tablet screens */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:hidden">
          {portfolio.map((p: any, idx: number) => (
            <div
              key={p.startup}
              className="maroon-gradient-border group relative overflow-hidden rounded-[22px] border border-orange-100/50 bg-[#FDFBF7] p-5 shadow-[0_16px_40px_-24px_rgba(90,30,44,0.14)] flex flex-col gap-4"
            >
              {/* Category and Visit Button */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F97316] bg-orange-50/80 px-2.5 py-1 rounded-full border border-orange-100/30">
                  {p.category || p.industry}
                </span>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F97316] hover:text-[#FB923C] transition-colors"
                  >
                    Visit <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Startup Logo/Heading */}
              <div className="space-y-1">
                {p.logo ? (
                  <div className="flex h-10 items-center justify-start">
                    <img
                      src={p.logo}
                      alt={p.startup}
                      className={`${p.startup === "DreamBot" ? "h-6" : "h-8"} w-auto max-w-[120px] object-contain flex-shrink-0`}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#2B1B18] leading-tight">
                    {p.startup}
                  </h3>
                )}
                <div className="h-[2px] w-8 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full" />
              </div>

              {/* Description */}
              <p className="text-[12px] leading-relaxed text-[#5A4D4A]">
                {p.desc}
              </p>

              {/* Achievements Micro Cards */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {p.achievements.slice(0, 2).map((achievement: string, aIdx: number) => {
                  const displayTxt = achievement === "Empowering Careers" ? "Career Growth" : achievement;
                  const theme = ACHIEVEMENT_THEMES[aIdx % ACHIEVEMENT_THEMES.length];
                  const subtitle = theme.subtitles[achievement] || "Accelerate Progress";
                  const Icon = theme.icon;

                  return (
                    <div
                      key={achievement}
                      className={`flex items-center gap-2 rounded-lg border pl-1.5 pr-2.5 py-1 shadow-[0_1px_4px_rgba(0,0,0,0.01)] ${theme.bgLight} ${theme.borderCol}`}
                      style={{ borderLeftWidth: "2.5px", borderLeftColor: theme.hexCol }}
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${theme.iconBg}`}>
                        <Icon size={11} className={theme.iconColor} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[8px] font-black text-[#1C1412] leading-tight whitespace-nowrap">
                          {displayTxt}
                        </h4>
                        <p className="text-[7px] font-bold text-[#6C5E5B]/60 leading-none mt-0.5 whitespace-nowrap">
                          {subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Founder Information Row */}
              <div className="flex items-center gap-3 border-t border-orange-100/30 pt-3.5 mt-1">
                {p.founderImage ? (
                  <img
                    src={p.founderImage}
                    alt={p.founder}
                    className="h-10 w-10 rounded-full object-cover border border-orange-200/50 shadow-sm"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FFF5EB] to-[#FFE4CC] border border-orange-200/50">
                    <span className="text-sm font-black text-[#F97316]/40 font-display">
                      {p.founder.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.15em] text-[#F97316] leading-none">Founded by</p>
                  <h4 className="text-[11px] font-bold text-[#1C1412] tracking-tight mt-0.5 leading-none font-display">{p.founder}</h4>
                  <p className="text-[8px] font-medium text-[#6C5E5B]/75 leading-none mt-1">{p.founderTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
