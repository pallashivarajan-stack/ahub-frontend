import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import heroVideo from "@/assets/AUIC NIDHI iTBI - a-hub (1080p, h264).mp4";

export function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect mobile to prevent loading heavy video
  useEffect(() => {
    const checkMobile = () => {
      // Disable video on screens smaller than 768px (tablets/mobile)
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    const resizeTimer = window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setIsScrolling(false);
  };

  const handleExplore = () => {
    setIsScrolling(true);
    setTimeout(() => scrollToSection("what-we-do"), 100);
  };

  return (
    <section 
      id="home" 
      className="relative isolate min-h-[calc(100vh-1.5rem)] overflow-hidden text-foreground bg-black"
      aria-label="Hero section - Welcome to AHUB Premium Innovation Hub"
    >
      {/* VIDEO BACKGROUND LAYER - Desktop Only */}
      {!videoFailed && !isMobile ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          onError={() => {
            console.error("Video failed to load:", heroVideo);
            setVideoFailed(true);
          }}
          onLoadStart={() => console.log("Video loading:", heroVideo)}
          aria-hidden="true"
          crossOrigin="anonymous"
          controlsList="nodownload"
          disablePictureInPicture
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      ) : (
        /* FALLBACK BACKGROUND - Mobile or video error */
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black z-0" />
      )}

      {/* LAYER 1: Base Dark Overlay - Creates base contrast */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-black/15"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* LAYER 2: Vertical Gradient Overlay - Enhances text readability */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/35 via-black/25 to-black/40"
        aria-hidden="true"
      />

      {/* LAYER 3: Horizontal Gradient Panel - Left side text safety zone */}
      <div 
        className="pointer-events-none absolute left-0 top-0 h-full w-[70%] max-w-[1200px] z-20 bg-gradient-to-r from-black/50 via-black/35 to-transparent"
        aria-hidden="true"
      />

      {/* LAYER 4: Vignette Effect - Premium polish and focus */}
      <div 
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 100%)',
        }}
        aria-hidden="true"
      />

      {/* DECORATIVE ELEMENTS - Premium glow accents */}
      <div className="pointer-events-none absolute left-[6%] top-[14%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,182,109,0.25)_0%,rgba(255,182,109,0.08)_38%,transparent_72%)] blur-3xl z-5" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-8%] top-[18%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(255,240,225,0.2)_0%,rgba(255,240,225,0.05)_38%,transparent_72%)] blur-3xl z-5" aria-hidden="true" />
      {/* CONTENT LAYER - Above all overlays */}
      <div className="relative z-30 mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl items-center px-6 py-24 md:px-10 md:py-28 lg:py-32">
        <div className="max-w-xl text-white">
          {/* Badge */}
          <div 
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-white/95 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
            aria-label="Premium Innovation Hub certification"
          >
            <Sparkles size={12} aria-hidden="true" className="animate-pulse" /> Premium Innovation Hub
          </div>

          {/* Main Heading */}
          <h1 className="text-balance font-display text-3xl font-semibold leading-[1.2] sm:leading-[1.05] tracking-tight sm:text-4xl xl:text-[3.5rem] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
            A premium startup ecosystem for ambitious founders.
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/88 md:text-lg drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            Incubation, mentorship, and strategic support in a cinematic, high-trust setting.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleExplore}
              disabled={isScrolling}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#5B0E2D] to-[#7A163B] px-4 py-3 sm:px-7 min-h-[48px] text-xs sm:text-sm font-semibold text-white shadow-[0_20px_48px_-12px_rgba(91,14,45,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-8px_rgba(91,14,45,0.85)] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none backdrop-blur-sm border border-white/10"
              aria-label="Explore the AHUB ecosystem and incubation programs"
            >
              <span>{isScrolling ? "Loading..." : "Explore Ecosystem"}</span>
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
