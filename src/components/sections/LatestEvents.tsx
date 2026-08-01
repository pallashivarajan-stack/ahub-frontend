import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { loadLatestEventsData } from "@/services/adminService";
import { ecosystemEvents } from "@/data/eventsCalendar";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const AUTOPLAY_DELAY = 4000;

// Sorted calendar events as base fallback
const defaultEvents = [...ecosystemEvents]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 7);

export function LatestEvents() {
  // Load from admin localStorage; fall back to sorted ecosystemEvents
  const stored = loadLatestEventsData();
  const rawEvents = stored.length > 0
    ? stored
    : defaultEvents.map((e) => ({
        title: e.title,
        date: e.date,
        tag: e.tag,
        description: e.description,
        image: e.image,
        time: e.time,
        venue: e.venue,
      }));
  const events = rawEvents.slice(0, 7);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startAutoplay = useCallback(() => {
    clearTimers();
    setProgress(0);
    startTimeRef.current = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(pct);
    }, 30);

    timerRef.current = setTimeout(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, AUTOPLAY_DELAY) as unknown as ReturnType<typeof setInterval>;
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) { emblaApi.scrollPrev(); startAutoplay(); }
  }, [emblaApi, startAutoplay]);

  const scrollNext = useCallback(() => {
    if (emblaApi) { emblaApi.scrollNext(); startAutoplay(); }
  }, [emblaApi, startAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    startAutoplay();
  }, [emblaApi, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    startAutoplay();
    return () => { clearTimers(); emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect, startAutoplay]);

  return (
    <section id="announcement" className="relative overflow-hidden py-16 md:py-24 bg-[#FFF8F2]">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.06)_0%,transparent_70%)]" />

      <div className="site-container-wide relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FF7A00] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
              WHAT&apos;S NEXT
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Latest Events
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Stay connected with the ecosystem. Discover upcoming gatherings, institutional events, and founder moments.
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={scrollPrev} aria-label="Previous"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm transition-all hover:border-[#FF7A00]/40 hover:bg-white hover:scale-105 active:scale-95">
              <ChevronLeft size={18} className="text-slate-600 group-hover:text-[#FF7A00]" />
            </button>
            <button onClick={scrollNext} aria-label="Next"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm transition-all hover:border-[#FF7A00]/40 hover:bg-white hover:scale-105 active:scale-95">
              <ChevronRight size={18} className="text-slate-600 group-hover:text-[#FF7A00]" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-5">
            {events.map((e, i) => {
              // Parse ISO date "YYYY-MM-DD"
              const dateParts = e.date ? e.date.split("-") : ["2026", "01", "01"];
              const dateObj = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
              const dayNum = dateObj.getDate();
              const monthName = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const yearNum = dateObj.getFullYear();

              return (
                <div
                  key={i}
                  className="pl-4 md:pl-5 min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                    className="group flex flex-col h-full relative overflow-hidden rounded-[24px] border border-white/60 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(255,122,0,0.10)] transition-all duration-500 hover:-translate-y-1.5"
                  >
                    {/* Poster Image — no tag badge */}
                    <div className="relative h-[220px] overflow-hidden rounded-t-[24px] bg-[#FFF4E8]">
                      <img
                        src={e.image}
                        alt={e.title}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-[1.05rem] font-bold text-slate-900 leading-tight mb-1.5 line-clamp-2">
                        {e.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                        {e.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-100">
                        {e.time && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock size={13} className="text-[#FF7A00]" />
                            <span>{e.time}</span>
                          </div>
                        )}
                        {e.venue && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin size={13} className="text-[#FF7A00]" />
                            <span className="truncate">{e.venue}</span>
                          </div>
                        )}
                        {/* Date + Year + View */}
                        <div className="flex items-center justify-between mt-1.5 pt-2.5 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00]">{monthName}</span>
                            <span className="text-lg font-black font-display text-slate-800 leading-none">{dayNum}</span>
                            <span className="text-[11px] font-semibold text-slate-400 leading-none self-end mb-0.5">{yearNum}</span>
                          </div>
                          <Link
                            to="/events/calendar"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF7A00] hover:text-[#e06900] transition-colors"
                          >
                            View <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (emblaApi) { emblaApi.scrollTo(i); startAutoplay(); } }}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? 24 : 8,
                backgroundColor: i === selectedIndex ? "#FF7A00" : "rgba(15,23,42,0.12)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
