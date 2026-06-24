import { ChevronLeft, ChevronRight } from "lucide-react";

// Import logos from assets
import interviewBuddy from "@/assets/startups/interview buddy.png";
import edumoon from "@/assets/startups/edumoon.png";
import greenjams from "@/assets/startups/greenjams_logo.jpg";
import pickABook from "@/assets/startups/pick a book.png";
import dataFoundary from "@/assets/startups/data foundary.png";
import sweya from "@/assets/startups/sweya.png";
import icompass from "@/assets/startups/icompass.png";
import sandlogic from "@/assets/startups/sandlogic.png";

const logos = [
  interviewBuddy,
  edumoon,
  greenjams,
  pickABook,
  dataFoundary,
  sweya,
  icompass,
  sandlogic,
];

// Duplicate for smooth infinite scroll
const marqueeLogos = [...logos, ...logos, ...logos];

export function StartupsTicker() {
  return (
    <section
      id="startups-in-ahub"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF8F3_0%,#FFFFFF_100%)] py-20 md:py-32"
    >
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 35s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header Content */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Top Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F59E42]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E42] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
            STARTUPS IN AHUB
          </div>

          {/* Main Heading */}
          <h2 className="font-display text-4xl font-[800] leading-[1.1] tracking-tight md:text-5xl lg:text-[52px]">
            <span className="text-[#F59E42]">Successful</span>{" "}
            <span className="text-[#2D1B1B]">
              startups moving<br />through the ecosystem
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-[800px] text-base leading-relaxed text-[#6C5E5B] md:text-lg">
            A neat marquee of portfolio companies showing the momentum, depth, and investor-grade quality inside AHUB.
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative mx-auto mt-16 flex max-w-[1200px] items-center justify-between gap-6">
          
          {/* Left Arrow */}
          <button className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF8F3] text-[#F59E42] shadow-sm transition-all hover:scale-105 hover:bg-orange-50 border border-[#F59E42]/10 z-10">
            <ChevronLeft size={24} />
          </button>

          {/* Marquee Container */}
          <div className="relative flex-1 overflow-hidden rounded-[40px] bg-[rgba(255,255,255,0.7)] p-6 backdrop-blur-md border border-white/60 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.04)] group">
            {/* Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white/95 to-transparent rounded-l-[40px]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white/95 to-transparent rounded-r-[40px]" />

            {/* Marquee Track */}
            <div className="flex w-max items-center gap-6 animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex h-[120px] w-[260px] shrink-0 items-center justify-center rounded-[24px] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_16px_30px_-10px_rgba(245,158,66,0.18)] border border-slate-50"
                >
                  <img
                    src={logo}
                    alt="Startup Logo"
                    className="max-h-[64px] max-w-[190px] object-contain mix-blend-multiply"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF8F3] text-[#F59E42] shadow-sm transition-all hover:scale-105 hover:bg-orange-50 border border-[#F59E42]/10 z-10">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}