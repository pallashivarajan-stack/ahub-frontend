import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { events } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

/* ── Event image imports ── */
import startupSaturday1 from "@/assets/events/startup saturday.jpeg";
import beenThereDoneThat1 from "@/assets/events/been there done that.jpeg";
import googleStartupDays from "@/assets/events/google starup success days.jpg";
import ideathon from "@/assets/events/ideathon.jpg";
import startUpSaturday2 from "@/assets/events/Start Up saturday.jpeg";
import beenThereDoneThat2 from "@/assets/events/been there donw that 2.jpeg";
import andhraTechLeague from "@/assets/events/andhra texh league.jpg";
import hackapHackathon from "@/assets/events/Hackap agritech hackathon.jpg";
import startupsSaturday3 from "@/assets/events/starups staruday.jpg";
import runninWild from "@/assets/events/runnin wild.jpeg";
import edsCompetition from "@/assets/events/eds stduet design competittion.jpeg";
import eyesWideShut from "@/assets/events/eyes wide shut.jpg";

const imgMap: Record<string, string> = {
  "/src/assets/events/startup saturday.jpeg": startupSaturday1,
  "/src/assets/events/been there done that.jpeg": beenThereDoneThat1,
  "/src/assets/events/google starup success days.jpg": googleStartupDays,
  "/src/assets/events/ideathon.jpg": ideathon,
  "/src/assets/events/Start Up saturday.jpeg": startUpSaturday2,
  "/src/assets/events/been there donw that 2.jpeg": beenThereDoneThat2,
  "/src/assets/events/andhra texh league.jpg": andhraTechLeague,
  "/src/assets/events/Hackap agritech hackathon.jpg": hackapHackathon,
  "/src/assets/events/starups staruday.jpg": startupsSaturday3,
  "/src/assets/events/runnin wild.jpeg": runninWild,
  "/src/assets/events/eds stduet design competittion.jpeg": edsCompetition,
  "/src/assets/events/eyes wide shut.jpg": eyesWideShut,
};

export function LatestEvents() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    animationRef.current = gsap.fromTo(
      track,
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 44,
        ease: "none",
        repeat: -1,
        force3D: true,
      },
    );

    return () => {
      animationRef.current?.kill();
      animationRef.current = null;
    };
  }, []);

  const nudge = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const current = gsap.getProperty(track, "xPercent") as number;
    const next = current + dir * 6;
    animationRef.current?.pause();
    gsap.to(track, {
      xPercent: next,
      duration: 0.8,
      ease: "power3.out",
      force3D: true,
      onComplete: () => animationRef.current?.play(),
    });
  };

  return (
    <section data-animate id="announcement" className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF6EF_0%,#FFFFFF_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,192,130,0.18),transparent_54%),radial-gradient(42%_30%_at_12%_12%,rgba(255,231,209,0.42),transparent_62%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's Next"
            title="Latest Events"
            subtitle="A seamless, auto-looping view of the most recent founder moments and institutional gatherings."
          />
          <div className="flex gap-2">
            <button onClick={() => nudge(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-[color:color-mix(in_oklch,var(--primary)_14%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_94%,white)] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => nudge(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-[color:color-mix(in_oklch,var(--primary)_14%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_94%,white)] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden" onPointerEnter={() => animationRef.current?.pause()} onPointerLeave={() => animationRef.current?.play()}>
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:px-10" style={{ willChange: "transform" }}>
          {[...events, ...events].map((e, i) => (
            <article
              key={i}
              className="group w-[300px] shrink-0 overflow-hidden rounded-[28px] border border-[color:color-mix(in_oklch,var(--primary)_8%,transparent)] bg-[color:color-mix(in_oklch,var(--card)_96%,white)] shadow-[0_18px_48px_-30px_rgba(90,30,44,0.28)] transition-transform duration-500 hover:-translate-y-1 md:w-[340px]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={imgMap[e.img]}
                  alt={e.title}
                  loading="eager"
                  draggable={false}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] font-medium text-white backdrop-blur-md">
                  <Calendar size={12} /> {e.date}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-[color:color-mix(in_oklch,var(--primary)_92%,black)] px-3 py-1 text-[0.65rem] uppercase tracking-wider text-primary-foreground">
                  {e.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform hover:translate-x-0.5">
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
