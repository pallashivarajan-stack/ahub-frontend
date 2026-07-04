import { Calendar, ArrowRight } from "lucide-react";
import { usePublicEvents } from "@/services/usePublicContent";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

export function LatestEvents() {
  const { data: events = [] } = usePublicEvents();
  
  // Duplicate for a seamless infinite loop matching the startup portfolio page (2x copies)
  const marqueeEvents = [...events, ...events];

  return (
    <section data-animate id="announcement" className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF6EF_0%,#FFFFFF_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,192,130,0.18),transparent_54%),radial-gradient(42%_30%_at_12%_12%,rgba(255,231,209,0.42),transparent_62%)]" />

      <div className="site-container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's Next"
            title="Latest Events"
            subtitle="A seamless, auto-looping view of the most recent founder moments and institutional gatherings."
          />
        </div>
      </div>

      {/* Viewport container without edge fade masks as requested */}
      <div 
        className="marquee-container relative mt-10 overflow-hidden group/marquee" 
      >
        {/* Marquee Track using standard animate-marquee class */}
        <div 
          className="flex w-max gap-6 px-6 md:px-10 animate-marquee items-center group-hover/marquee:[animation-play-state:paused]" 
          style={{ willChange: "transform" }}
        >
          {marqueeEvents.map((e, i) => (
            <article
              key={i}
              className="group/card w-[clamp(200px,35vw,280px)] shrink-0 overflow-hidden rounded-[24px] border border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_96%,white)] shadow-[0_18px_48px_-30px_rgba(90,30,44,0.28)] transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_28px_60px_-24px_rgba(90,30,44,0.36)] flex-shrink-0"
              style={{ willChange: "transform" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="eager"
                  draggable={false}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.65rem] font-medium text-white backdrop-blur-md">
                  <Calendar size={12} /> {e.date}
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-[color:color-mix(in_oklch,var(--primary)_92%,black)] px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-primary-foreground">
                  {e.tag}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-medium text-foreground">{e.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted-foreground">{e.desc}</p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-primary transition-transform hover:translate-x-0.5">
                  Register <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
