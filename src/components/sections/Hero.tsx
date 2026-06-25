import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePublicHero } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const fallbackHeroData = {
  poster: resolveLegacyAsset("/src/assets/hero-poster.jpg"),
  video: resolveLegacyAsset("/src/assets/AUIC NIDHI iTBI - a-hub (1080p, h264).mp4"),
  heading: "A premium startup ecosystem for ambitious founders.",
  subheading: "Incubation, mentorship, and strategic support in a cinematic, high-trust setting.",
};

export function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { data: heroData } = usePublicHero(fallbackHeroData);

  const {
    heading = fallbackHeroData.heading,
    subheading = fallbackHeroData.subheading,
    poster = fallbackHeroData.poster,
    video = fallbackHeroData.video,
  } = heroData ?? fallbackHeroData;

  // Detect mobile to prevent loading heavy video
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const checkMobile = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    checkMobile(mq);
    mq.addEventListener("change", checkMobile);
    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setIsScrolling(false);
  };

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
      {!videoFailed && !isMobile && !prefersReduced ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => {
            console.error("Video failed to load:", video);
            setVideoFailed(true);
          }}
          onLoadStart={() => console.log("Video loading:", video)}
          aria-hidden="true"
          crossOrigin="anonymous"
          controlsList="nodownload"
          disablePictureInPicture
        >
          {video && <source src={video} type="video/mp4" />}
          Your browser does not support HTML5 video.
        </video>
      ) : (
        /* FALLBACK BACKGROUND - Mobile or video error */
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#1a0a0a] via-[#2d1215] to-[#1a0a0a] z-0" />
      )}

      {/* LAYER 1: Base Dark Overlay - Creates base contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black/15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      {/* LAYER 2: Vertical Gradient Overlay - Enhances text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        aria-hidden="true"
      />

      {/* LAYER 3: Horizontal Gradient Panel - Left side text safety zone */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[70%] max-w-[1200px] z-20 bg-gradient-to-r from-black/65 via-black/45 to-transparent"
        aria-hidden="true"
      />

      {/* LAYER 4: Vignette Effect - Premium polish and focus */}
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* DECORATIVE ELEMENTS - Premium glow accents */}
      <div
        className="pointer-events-none absolute left-[6%] top-[14%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,182,109,0.25)_0%,rgba(255,182,109,0.08)_38%,transparent_72%)] blur-3xl z-[5]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[18%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(255,240,225,0.2)_0%,rgba(255,240,225,0.05)_38%,transparent_72%)] blur-3xl z-[5]"
        aria-hidden="true"
      />
      {/* CONTENT LAYER - Above all overlays */}
      <div className="relative z-30 mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl items-center px-6 max-sm:py-16 py-24 md:px-10 md:py-28 lg:py-32">
        <div className="max-w-xl text-white">
          {/* Main Heading */}
          <h1 className="text-balance font-display max-xs:text-2xl text-3xl font-semibold leading-[1.15] sm:leading-[1.05] tracking-tight sm:text-4xl xl:text-[3.5rem] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
            <span className="animate-fadeIn">
              {heading}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white md:text-lg drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
            {subheading}
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#what-we-do"
              onClick={handleExplore}
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#5B0E2D] to-[#7A163B] px-4 py-3 sm:px-7 min-h-[48px] text-xs sm:text-sm font-semibold text-white shadow-[0_20px_48px_-12px_rgba(91,14,45,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-8px_rgba(91,14,45,0.85)] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black active:scale-95 backdrop-blur-sm border border-white/10",
                isScrolling && "pointer-events-none opacity-60",
              )}
              aria-label="Explore the AHUB ecosystem and incubation programs"
            >
              <span aria-live="polite">{isScrolling ? "Loading..." : "Explore Ecosystem"}</span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
