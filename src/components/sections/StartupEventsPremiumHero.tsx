import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Rocket,
  ArrowRight,
  Users,
  Lightbulb,
  Network,
  Trophy,
  CalendarDays,
  Building2,
  UserRound,
  TrendingUp,
} from "lucide-react";
import { resolveLegacyAsset } from "@/lib/assets";
import { usePublicStartupEventsCollage } from "@/services/usePublicContent";

const stats = [
  { icon: CalendarDays, value: "100+", label: "Events Hosted" },
  { icon: Users, value: "5,000+", label: "Attendees" },
  { icon: Building2, value: "250+", label: "Startups" },
  { icon: TrendingUp, value: "₹10Cr+", label: "Fund Raised" },
];

const fallbackCollage = {
  main: resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 6 Sep 2025Seaweed are a diverse set of macrophytic plants growing in the mar.jpg"),
  card1: resolveLegacyAsset("/src/assets/startups_events/Greetings from AAA!Were thrilled to announce that our recent seminar on Agriculture Entreprene.webp"),
  card2: resolveLegacyAsset("/src/assets/startups_events/IMG_3899.jpg"),
  card3: resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 2 November 2024 We had an electrifying session focused on electricity distri (1).jpg"),
};

export function StartupEventsPremiumHero() {
  const { data: collageData } = usePublicStartupEventsCollage(fallbackCollage);
  const collageImages = {
    main: collageData?.main || fallbackCollage.main,
    card1: collageData?.card1 || fallbackCollage.card1,
    card2: collageData?.card2 || fallbackCollage.card2,
    card3: collageData?.card3 || fallbackCollage.card3,
  };

  return (
    <main className="relative overflow-hidden bg-cream pt-4 pb-24">
      {/* Background layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[320px] w-[320px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.12 55 / 0.35), transparent 70%)" }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 -z-10 h-28 w-28 opacity-40"
        viewBox="0 0 120 120"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="oklch(0.68 0.20 45)" />
          </pattern>
        </defs>
        <rect width="120" height="120" fill="url(#dots)" />
      </svg>

      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[55fr_45fr] lg:gap-8 lg:px-10">
        {/* LEFT */}
        <div className="flex flex-col gap-6 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-cream px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-primary shadow-[0_2px_10px_-2px_oklch(0.68_0.20_45/0.2)]">
            <Rocket className="h-3 w-3" strokeWidth={2.5} />
            STARTUP EVENTS
          </div>

          {/* Headline */}
          <h1 className="font-sans font-black leading-[0.95] tracking-[-0.03em] text-ink">
            <span className="block text-2xl md:text-3xl font-semibold text-ink/90">
              Your Next
            </span>
            <span className="mt-1 block text-[2.6rem] leading-[1] md:text-[3.6rem] lg:text-[4rem]">
              Big Opportunity
            </span>
            <span className="relative mt-1 inline-block">
              <span
                className="font-script text-[3.2rem] font-bold leading-none text-primary md:text-[4.4rem] lg:text-[5rem]"
                style={{ fontStyle: "italic" }}
              >
                Starts Here!
              </span>
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-1 right-4 block h-[4px] origin-left rounded-full bg-primary/80 animate-underline"
              />

            </span>
          </h1>



          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link
              to="/events/calendar"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-10px_oklch(0.68_0.20_45/0.55)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-10px_oklch(0.68_0.20_45/0.6)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Explore Events
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              to="/events/event-registration"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary-soft"
            >
              Host Your Event
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-4 rounded-2xl bg-white px-6 py-4 shadow-[0_20px_60px_-25px_oklch(0.55_0.16_45/0.25)] ring-1 ring-border/50 max-w-2xl">
            <div className="grid grid-cols-4 divide-x divide-border/70">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center gap-1.5 px-2 ${i === 0 ? "pl-0" : ""} ${i === stats.length - 1 ? "pr-0" : ""}`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary mb-1">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-black tracking-tight text-ink md:text-xl">
                    {value}
                  </span>
                  <span className="text-center text-[10px] font-medium leading-tight text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — asymmetric photo collage */}
        <div className="relative mx-auto h-[500px] w-full max-w-[520px] mt-10 lg:mt-0">
          {/* Large hero image — slanted with diagonal corner cut */}
          <div
            className="group absolute right-0 top-0 h-[300px] w-[92%] overflow-hidden shadow-[0_40px_80px_-30px_oklch(0_0_0/0.35)] transition-transform duration-500 ease-out hover:-rotate-1 z-10"
            style={{
              borderRadius: "28px",
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 26% 100%, 0 72%)",
            }}
          >
            <img
              src={collageImages.main}
              alt="Founder speaking on stage at a startup conference"
              width={1024}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-slate-100"
            />
          </div>

          {/* Bottom row — three images butted together with staggered heights */}
          <div className="absolute bottom-6 right-0 flex w-[92%] items-end gap-2 z-20">
            <div className="group h-[145px] w-1/3 overflow-hidden rounded-[22px] shadow-[0_25px_50px_-20px_oklch(0_0_0/0.3)] transition-transform duration-500 hover:-translate-y-2 bg-slate-100 border-4 border-white">
              <img
                src={collageImages.card1}
                alt="Founder speaking with a microphone"
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="group h-[165px] w-1/3 overflow-hidden rounded-[22px] shadow-[0_25px_50px_-20px_oklch(0_0_0/0.3)] transition-transform duration-500 hover:-translate-y-2 bg-slate-100 border-4 border-white flex items-center justify-center">
              <img
                src={collageImages.card2}
                alt="Two founders networking at an event"
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="group h-[145px] w-1/3 overflow-hidden rounded-[22px] shadow-[0_25px_50px_-20px_oklch(0_0_0/0.3)] transition-transform duration-500 hover:-translate-y-2 bg-slate-100 border-4 border-white">
              <img
                src={collageImages.card3}
                alt="Panel discussion on stage"
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Circular orange badge — sits in the diagonal cut */}
          <div
            className="absolute left-[10px] top-[210px] z-30 grid h-[130px] w-[130px] place-items-center rounded-full text-center text-primary-foreground shadow-[0_20px_40px_-10px_oklch(0.68_0.20_45/0.5)] ring-[5px] ring-cream animate-float-badge"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="px-2">
              <div className="font-script text-lg font-bold leading-tight italic opacity-95">
                Be Part of
              </div>
              <div className="font-sans text-[15px] font-black leading-tight tracking-tight uppercase mt-1">
                What's Next
              </div>
              <div className="mx-auto mt-2 h-[2px] w-8 rounded-full bg-primary-foreground/70" />
            </div>
          </div>


        </div>
      </section>
    </main>
  );
}
