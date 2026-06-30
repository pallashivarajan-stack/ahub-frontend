import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, MessageSquare, Users } from "lucide-react";
import { portfolio } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

export function PortfolioCompanies() {
  const [active, setActive] = useState(0);

  return (
    <section id="achieve" className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF8F3_0%,#FFFFFF_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,191,128,0.2),transparent_52%),radial-gradient(40%_28%_at_10%_8%,rgba(255,233,210,0.42),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Portfolio"
          title="Meet some of our remarkable portfolio companies"
          subtitle="The passionate, goal-driven entrepreneurs writing the next chapter of Indian innovation."
        />

        <div className="mt-12 flex h-[420px] gap-3 md:h-[440px]">
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

                <div className={`absolute inset-0 flex items-end justify-start p-5 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                  <div className="rotate-0 md:[writing-mode:vertical-rl] md:rotate-180">
                    <div className="font-display text-base font-semibold text-[#8C2D19] md:text-lg">{p.startup}</div>
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[#9E8B87]">{p.industry}</div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 z-10 grid h-full grid-cols-1 md:grid-cols-[70%_30%] items-center p-6 md:p-8 gap-6 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex flex-col justify-center max-w-[500px]">
                    <div className="space-y-4 md:space-y-5">
                      <div className="flex items-center gap-3">
                        {p.logo ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-orange-100/30 overflow-hidden">
                            <img
                              src={p.logo}
                              alt={`${p.startup} logo`}
                              className="h-6 w-6 object-contain"
                              draggable={false}
                            />
                          </div>
                        ) : (
                          <div
                            className="grid h-10 w-10 place-items-center rounded-xl text-white text-sm font-bold shadow-sm animate-pulse"
                            style={{ backgroundColor: "#F97316" }}
                          >
                            {p.startup.charAt(0)}
                          </div>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] bg-orange-50/80 px-3 py-1 rounded-full border border-orange-100/30">
                          {p.category || p.industry}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-3xl font-black tracking-tight text-[#2B1B18] leading-[1.05] md:text-4xl">
                          {p.startup}
                        </h3>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full" />
                      </div>

                      <p className="text-[13px] leading-relaxed text-[#6C5E5B] max-w-sm line-clamp-3">
                        {p.desc}
                      </p>

                      <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap pb-1">
                        {p.achievements.map((achievement: string, idx: number) => {
                          const displayTxt = achievement === "Empowering Careers" ? "Career Growth" : achievement;
                          const icons = [MessageSquare, Briefcase, Users];
                          const Icon = icons[idx] || MessageSquare;
                          return (
                            <div
                              key={achievement}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-orange-100/30 px-3 py-1.5 text-[10px] font-semibold text-[#4A3C39] shadow-sm transition-all duration-300 hover:shadow-[0_4px_12px_rgba(249,115,22,0.15)] hover:border-orange-200/50"
                            >
                              <Icon size={11} className="text-[#F97316]" />
                              {displayTxt}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex relative h-full flex-col items-center justify-center">
                    <div className="relative w-full max-w-[180px]">
                      <div className="h-[220px] rounded-[20px] overflow-hidden bg-gradient-to-b from-[#FFF0E2] via-[#FFE3CC] to-[#FFF0E2] border border-[#FFE0C9]/30 shadow-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />
                        {p.founderImage ? (
                          <img
                            src={p.founderImage}
                            alt={p.founder}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] will-change-transform"
                            draggable={false}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl font-bold opacity-30 text-[#F97316]">
                            {p.founder.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-orange-100/30 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)] z-20 text-center">
                        <p className="text-[13px] font-semibold text-[#F97316] tracking-wide leading-none">
                          Founded by
                        </p>
                        <h4 className="text-[18px] font-extrabold text-[#2B1B18] tracking-tight leading-snug mt-1.5 truncate">
                          {p.founder}
                        </h4>
                        <p className="text-[12px] font-medium text-[#6C5E5B]/80 leading-none mt-1 truncate">
                          {p.founderTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
