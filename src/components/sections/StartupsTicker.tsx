import { motion } from "framer-motion";
import { portfolio } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

type TickerItem = {
  startup: string;
  industry: string;
  initials: string;
};

const tickerItems: TickerItem[] = portfolio.map((item) => ({
  startup: item.startup,
  industry: item.industry,
  initials: item.startup
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join(""),
}));

function TickerRow({ items, reverse = false }: { items: TickerItem[]; reverse?: boolean }) {
  const rowItems = [...items, ...items];

  return (
    <div className="group relative overflow-hidden rounded-full border border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,247,242,0.96))] shadow-[0_18px_50px_-32px_rgba(15,23,42,0.16)]">
      <motion.div
        aria-hidden
        className="flex w-max items-center gap-2.5 py-3"
        animate={{ x: reverse ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {rowItems.map((item, index) => (
          <div
            key={`${item.startup}-${index}`}
            className="flex min-w-[190px] items-center gap-2.5 rounded-full border border-white/80 bg-white/92 px-3.5 py-2.5 transition-transform duration-300 group-hover:scale-[1.01]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5B0E2D,#8A1E43)] text-[0.68rem] font-semibold tracking-[0.16em] text-white shadow-[0_10px_24px_-16px_rgba(91,14,45,0.75)]">
              {item.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[0.84rem] font-semibold text-slate-900">{item.startup}</div>
              <div className="truncate text-[0.66rem] uppercase tracking-[0.16em] text-slate-500">{item.industry}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function StartupsTicker() {
  return (
    <section
      id="startups-in-ahub"
      className="relative overflow-hidden border-t border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[linear-gradient(180deg,#FFF7F1_0%,#FFFFFF_100%)] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,191,128,0.18),transparent_58%),radial-gradient(40%_30%_at_12%_20%,rgba(255,232,213,0.42),transparent_64%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Startups in AHUB"
            title="Successful startups moving through the ecosystem"
            subtitle="A neat marquee of portfolio companies showing the momentum, depth, and investor-grade quality inside AHUB."
            titleSize="small"
          />
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <TickerRow items={tickerItems} />
        </div>
      </div>
    </section>
  );
}