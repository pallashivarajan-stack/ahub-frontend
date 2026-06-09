import { Award, Building2, TrendingUp, Users } from "lucide-react";
import { stats } from "@/data";
import { useCountUp } from "@/hooks/useCountUp";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

const icons = [Building2, TrendingUp, Users, Award];

export function Statistics() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(90,30,44,0.08),transparent_52%),linear-gradient(180deg,color-mix(in_oklch,var(--background)_94%,white),color-mix(in_oklch,var(--background)_88%,white))]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Numbers" title="An ecosystem measured by outcomes." align="center" />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = icons[i];
            return <StatCard key={s.label} {...s} Icon={Icon} />;
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label, value, suffix, prefix, Icon,
}: { label: string; value: number; suffix?: string; prefix?: string; Icon: React.ElementType }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="maroon-gradient-border group relative overflow-hidden rounded-[28px] border border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_92%,transparent)] p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8"
    >
      <Icon className="text-primary/80" size={22} />
      <div className="mt-6 flex items-baseline gap-1 font-display text-4xl font-medium text-foreground md:text-5xl">
        {prefix}
        <span className="tabular-nums">{v}</span>
        <span className="text-2xl text-primary md:text-3xl">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
