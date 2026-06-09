import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { Avatar } from "@/components/ui-ahub/Avatar";

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
          {portfolio.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={p.startup}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ flexGrow: isActive ? 4 : 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`maroon-gradient-border group relative basis-0 overflow-hidden rounded-[30px] border border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_94%,white)] text-left shadow-[0_20px_60px_-30px_rgba(90,30,44,0.28)] focus:outline-none`}
              >
                {/* background image */}
                {isActive && (
                  <div
                    className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary/20 to-transparent"
                  />
                )}

                {/* collapsed label */}
                  <div className={`absolute inset-0 flex items-end justify-start p-5 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                  <div className="rotate-0 md:[writing-mode:vertical-rl] md:rotate-180">
                    <div className="font-display text-base font-medium text-primary md:text-lg">{p.startup}</div>
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{p.industry}</div>
                  </div>
                </div>

                {/* expanded content */}
                  <div className={`relative z-10 flex h-full flex-col justify-between p-6 transition-opacity duration-500 md:p-8 ${isActive ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.founder} size={52} />
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.industry}</div>
                        <div className="font-display text-2xl font-medium text-foreground">{p.startup}</div>
                        <div className="text-sm text-muted-foreground">Founded by {p.founder}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="text-primary" size={20} />
                  </div>

                  <div className="max-w-md">
                    <p className="text-[0.95rem] leading-relaxed text-foreground/80">{p.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.achievements.map((a) => (
                          <li key={a} className="rounded-full border border-[color:color-mix(in_oklch,var(--primary)_14%,transparent)] bg-[color:color-mix(in_oklch,var(--background)_92%,white)] px-3 py-1 text-xs text-primary">
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
                      {p.funding}
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
