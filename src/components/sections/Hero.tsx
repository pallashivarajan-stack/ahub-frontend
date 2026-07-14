import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePublicHero } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

const fallbackHeroData = {
  poster: resolveLegacyAsset("/src/assets/hero-poster.jpg"),
  video: resolveLegacyAsset("/src/assets/AUIC NIDHI iTBI - a-hub (1080p, h264).mp4"),
  heading: "A premium startup ecosystem for ambitious founders.",
  subheading: "Incubation, mentorship, and strategic support in a cinematic, high-trust setting.",
};

export function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const { isMobile } = useResponsive();
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { data: heroData } = usePublicHero(fallbackHeroData);

  const {
    heading = fallbackHeroData.heading,
    subheading = fallbackHeroData.subheading,
    poster = fallbackHeroData.poster,
    video = fallbackHeroData.video,
  } = heroData ?? fallbackHeroData;

  return (
    <section
      id="home"
      className="relative isolate h-[100svh] w-full overflow-hidden text-foreground bg-black"
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

      {/* Single dark overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black/40"
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
      <div className="relative z-30 flex h-full w-full items-center pl-4 sm:pl-6 md:pl-10 lg:pl-14 pr-6 sm:pr-10 md:pr-16 lg:pr-24 py-24 max-sm:py-16">
        <div className="max-w-xl text-white">
          {/* Main Heading */}
          <h1 className="text-balance font-display text-3xl font-semibold leading-[1.15] sm:leading-[1.05] tracking-tight sm:text-4xl xl:text-[3.5rem] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] max-xs:text-2xl">
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
            <Link
              to="/ecosystem/infrastructure"
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full bg-[#c94a0a] px-4 py-3 sm:px-7 min-h-[43px] text-xs sm:text-sm font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-[#b8420a] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black active:scale-95 border border-white/10",
              )}
              aria-label="Explore the AHUB ecosystem and incubation programs"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
