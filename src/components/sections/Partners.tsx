import { partners } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

export function Partners() {
  const loop = [...partners, ...partners];
  return (
    <section id="associate" className="relative overflow-hidden border-y border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[linear-gradient(180deg,#FFF7F2_0%,#FFFFFF_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,191,128,0.18),transparent_58%),radial-gradient(36%_24%_at_10%_18%,rgba(255,233,214,0.38),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Associated With" title="Backed by builders, funds and institutions." align="center" />
      </div>

      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 px-6">
          {loop.map((p, i) => (
            <div
              key={i}
              className="grid h-14 min-w-[160px] place-items-center font-display text-lg font-medium tracking-tight text-muted-foreground grayscale transition-all duration-500 hover:text-primary hover:grayscale-0"
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow gap-14 px-6" style={{ animationDirection: "reverse" }}>
          {loop.map((p, i) => (
            <div
              key={i}
              className="grid h-14 min-w-[160px] place-items-center font-display text-lg font-medium tracking-tight text-muted-foreground grayscale transition-all duration-500 hover:text-primary hover:grayscale-0"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
