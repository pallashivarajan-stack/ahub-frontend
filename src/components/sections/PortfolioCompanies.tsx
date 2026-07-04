import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink, MessageSquare, Users, Bot, TrendingUp } from "lucide-react";
import { portfolio } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

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
    <section id="achieve" className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8F0_0%,#FFE8D6_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,50,0.08),transparent_60%)]" />
      <div className="site-container-wide">
        <SectionHeading
          eyebrow="Portfolio"
          title="Our remarkable portfolio companies"
          subtitle="The passionate, goal-driven entrepreneurs writing the next chapter of Indian innovation."
        />

        {/* Desktop View — Accordion */}
        <div className="hidden md:flex mt-20 h-[420px] gap-3 md:h-[440px]">
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
                className="maroon-gradient-border group relative basis-0 overflow-hidden rounded-[30px] border border-orange-100/50 bg-[#FDFBF7] text-left shadow-[0_20px_60px_-30px_rgba(90,30,44,0.14)] focus:outline-none will-change-transform"
              >
                {isActive && (
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-orange-500/20 to-transparent" />
                )}

                {/* ── Collapsed state ── */}
                <div className={`absolute inset-0 flex items-end justify-center pb-12 transition-all duration-500 ${
                  isActive ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}>
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.startup}
                      className="w-[150px] h-[52px] max-w-none flex-shrink-0 object-contain -rotate-90 transition-all duration-500 group-hover:scale-108"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center w-[68px] h-[145px] rounded-2xl text-white text-2xl font-bold shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_8px_28px_rgba(249,115,22,0.12)]"
                      style={{ background: "linear-gradient(135deg, #F97316, #FB923C)" }}
                    >
                      <span className="-rotate-90 block tracking-wider select-none">{p.startup.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* ── Expanded state ── */}
                <div
                  className={`absolute inset-0 z-10 flex h-full flex-col md:flex-row items-stretch p-6 md:p-7 gap-10 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {/* Left content — primary focus, takes 65% of expanded width */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 md:max-w-[65%]">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] bg-orange-50/80 px-3 py-1 rounded-full border border-orange-100/30">
                          {p.category || p.industry}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {p.logo ? (
                          <div className="flex h-16 md:h-22 items-center justify-start flex-shrink-0">
                            <img
                              src={p.logo}
                              alt={`${p.startup} logo`}
                              className="h-10 md:h-14 w-auto max-w-[140px] object-contain text-left flex-shrink-0 mr-4"
                              draggable={false}
                            />
                          </div>
                        ) : (
                          <h3 className="font-display text-3xl font-black tracking-tight text-[#2B1B18] leading-[1.05] md:text-4xl">
                            {p.startup}
                          </h3>
                        )}
                        <div className="h-0.5 w-12 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full" />
                      </div>

                      <p className="text-[14.5px] md:text-[15px] leading-relaxed text-[#5A4D4A] max-w-md mt-8 md:mt-10 line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Micro Tagline/Achievement Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {p.achievements.slice(0, 2).map((achievement: string, idx: number) => {
                          const displayTxt = achievement === "Empowering Careers" ? "Career Growth" : achievement;
                          const theme = ACHIEVEMENT_THEMES[idx % ACHIEVEMENT_THEMES.length];
                          const subtitle = theme.subtitles[achievement] || "Accelerate Progress";
                          const Icon = theme.icon;

                          return (
                            <div
                              key={achievement}
                              className={`flex items-center gap-2 rounded-lg border pl-1.5 pr-2.5 py-1 shadow-[0_1px_4px_rgba(0,0,0,0.01)] transition-all duration-300 hover:scale-[1.01] ${theme.bgLight} ${theme.borderCol}`}
                              style={{ borderLeftWidth: "2.5px", borderLeftColor: theme.hexCol }}
                            >
                              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${theme.iconBg}`}>
                                <Icon size={11} className={theme.iconColor} />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-[9px] font-black text-[#1C1412] leading-tight whitespace-nowrap">
                                  {displayTxt}
                                </h4>
                                <p className="text-[7.5px] font-bold text-[#6C5E5B]/60 leading-none mt-0.5 whitespace-nowrap">
                                  {subtitle}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Visit button */}
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-5 py-2 text-[12px] font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <ExternalLink size={13} />
                        Visit
                      </a>
                    )}
                  </div>

                  {/* Right side — Founder portrait */}
                  <div className="hidden md:flex flex-col items-center justify-center" style={{ width: "28%", flexShrink: 0 }}>
                    <motion.div
                      className="relative"
                      style={{ width: "175px" }}
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.96, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.08 : 0 }}
                    >
                      <div
                        className="w-full overflow-hidden rounded-[28px] shadow-[0_16px_48px_-8px_rgba(90,30,44,0.18),0_0_0_1px_rgba(255,191,128,0.2)]"
                        style={{ aspectRatio: "4/5" }}
                      >
                        {p.founderImage ? (
                          <img
                            src={p.founderImage}
                            alt={p.founder}
                            className="h-full w-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-[1.04] will-change-transform"
                            draggable={false}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#FFF5EB] to-[#FFE4CC]">
                            <span className="text-4xl font-black text-[#F97316]/30 select-none font-display">
                              {p.founder.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/28 to-transparent pointer-events-none" />
                      </div>

                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 z-20"
                        style={{ bottom: "-48px", width: "88%" }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.16 : 0 }}
                      >
                        <div className="rounded-2xl bg-white/94 backdrop-blur-xl border border-white/80 px-3.5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-center">
                          <div className="mx-auto mb-1.5 h-[2px] w-5 rounded-full bg-gradient-to-r from-[#F97316] to-[#FBBF24]" />
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#F97316] leading-none">
                            Founded by
                          </p>
                          <h4 className="mt-1.5 text-[13.5px] font-extrabold text-[#1C1412] tracking-tight leading-tight font-display">
                            {p.founder}
                          </h4>
                          <p className="mt-1 text-[9.5px] font-semibold text-[#6C5E5B]/85 leading-none">
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
              className="maroon-gradient-border group relative overflow-hidden rounded-[24px] border border-orange-100/50 bg-[#FDFBF7] p-5 shadow-[0_16px_40px_-24px_rgba(90,30,44,0.14)] flex flex-col gap-4"
            >
              {/* Category and Visit Button */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F97316] bg-orange-50/80 px-2.5 py-1 rounded-full border border-orange-100/30">
                  {p.category || p.industry}
                </span>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F97316] hover:text-[#FB923C] transition-colors"
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
                      className="h-8 w-auto max-w-[120px] object-contain flex-shrink-0"
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
              <p className="text-[13px] leading-relaxed text-[#5A4D4A]">
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
                        <h4 className="text-[9px] font-black text-[#1C1412] leading-tight whitespace-nowrap">
                          {displayTxt}
                        </h4>
                        <p className="text-[7.5px] font-bold text-[#6C5E5B]/60 leading-none mt-0.5 whitespace-nowrap">
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
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#F97316] leading-none">Founded by</p>
                  <h4 className="text-[12.5px] font-bold text-[#1C1412] tracking-tight mt-0.5 leading-none font-display">{p.founder}</h4>
                  <p className="text-[9px] font-medium text-[#6C5E5B]/75 leading-none mt-1">{p.founderTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
