import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  X,
} from "lucide-react";
import { usePublicRewards } from "@/services/usePublicContent";
import { resolveLegacyAsset } from "@/lib/assets";

/* ─── carousel data ─────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    label: "IIC 5.0 Rating – 4 Star",
    desc: "Andhra University continues to maintain its top performance in Ministry of Education (MoE), Institution's Innovation Council (IIC) Ratings.",
    img: resolveLegacyAsset("/src/assets/rewards/IIc 5.0 rating-4star.png"),
    alt: "IIC 5.0 Certificate",
  },
  {
    id: 1,
    label: "IIC 4.0 Rating – 4 Star",
    desc: "Among the highest rated State Universities in India to achieve 4-star in Ministry of Education IIC Ratings in the very first attempt.",
    img: resolveLegacyAsset("/src/assets/rewards/IIc 4.0 rating -4 star.png"),
    alt: "IIC 4.0 Certificate",
  },
  {
    id: 2,
    label: "NIRF Innovation Ranking 2023",
    desc: "Andhra University (A hub) is rated in the Top 11-50 Band under NIRF Innovation Ranking 2023 in the very first year of its operations.",
    img: resolveLegacyAsset("/src/assets/rewards/nirf innovation ranking 2023- band 11-50.png"),
    alt: "NIRF Certificate",
  },
];

/* ─── star row ───────────────────────────────────────────────────────────── */
function Stars({ filled = 4, total = 5 }: { filled?: number; total?: number }) {
  return (
    <div className="rw-flex rw-gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < filled ? "rw-text-gold" : "rw-text-white/20"}
          fill={i < filled ? "#C9A84C" : "none"}
        />
      ))}
    </div>
  );
}


/* ─── center emblem ─────────────────────────────────────────────────────── */
function CenterEmblem() {
  return (
    <div className="rw-relative rw-w-[220px] rw-h-[220px] rw-flex rw-items-center rw-justify-center">
      {/* outer ring */}
      <div className="rw-absolute rw-inset-0 rw-rounded-full rw-border rw-border-[#C9A84C]/30" />
      {/* middle dashed ring */}
      <div
        className="rw-absolute rw-inset-[12px] rw-rounded-full rw-border rw-border-dashed rw-border-[#C9A84C]/50"
        style={{ borderSpacing: 6 }}
      />
      {/* inner circle */}
      <div className="rw-absolute rw-inset-[24px] rw-rounded-full rw-bg-white rw-shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
      {/* content */}
      <div className="rw-relative rw-z-10 rw-flex rw-flex-col rw-items-center rw-text-center rw-px-4">
        {/* sun-burst icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="rw-mb-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 16 + 10 * Math.cos(angle);
            const y1 = 16 + 10 * Math.sin(angle);
            const x2 = 16 + 14 * Math.cos(angle);
            const y2 = 16 + 14 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="1.5" />
            );
          })}
          <circle cx="16" cy="16" r="6" fill="#C9A84C" opacity="0.15" />
          <circle cx="16" cy="16" r="3" fill="#C9A84C" />
        </svg>
        <p className="rw-text-[11px] rw-font-bold rw-tracking-[0.16em] rw-uppercase rw-text-[#1A1810] rw-leading-snug">
          Andhra
          <br />
          University
        </p>
        <div className="rw-h-px rw-w-10 rw-bg-[#C9A84C]/50 rw-my-2" />
        <p className="rw-text-[8.5px] rw-text-[#706760] rw-uppercase rw-tracking-[0.12em] rw-leading-snug">
          Excellence in Education
          <br />
          Innovation in Action
        </p>
        <div className="rw-mt-2 rw-w-1.5 rw-h-1.5 rw-rounded-full rw-bg-[#C9A84C]" />
      </div>
    </div>
  );
}

/* ─── main component ────────────────────────────────────────────────────── */
export function RewardsPage() {
  const { data: slidesData } = usePublicRewards(SLIDES);
  const displaySlides = slidesData ?? SLIDES;
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const current = displaySlides[slide];

  const prev = () => setSlide((s) => (s - 1 + displaySlides.length) % displaySlides.length);
  const next = () => setSlide((s) => (s + 1) % displaySlides.length);

  return (
    <>
      {/* ── scoped CSS ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

        .rw-root { font-family: 'Urbanist', sans-serif; }
        .rw-font-playfair { font-family: 'Playfair Display', serif; }

        /* utility aliases */
        .rw-relative { position: relative; }
        .rw-absolute { position: absolute; }
        .rw-fixed    { position: fixed; }
        .rw-inset-0  { inset: 0; }
        .rw-inset-\[12px\] { inset: 12px; }
        .rw-inset-\[24px\] { inset: 24px; }
        .rw-z-0  { z-index: 0; }
        .rw-z-10 { z-index: 10; }
        .rw-z-20 { z-index: 20; }
        .rw-z-50 { z-index: 50; }
        .rw-flex { display: flex; }
        .rw-inline-flex { display: inline-flex; }
        .rw-grid { display: grid; }
        .rw-hidden { display: none; }
        .rw-block { display: block; }
        .rw-items-center  { align-items: center; }
        .rw-items-start   { align-items: flex-start; }
        .rw-justify-center { justify-content: center; }
        .rw-justify-between { justify-content: space-between; }
        .rw-flex-col { flex-direction: column; }
        .rw-flex-1 { flex: 1; }
        .rw-shrink-0 { flex-shrink: 0; }
        .rw-gap-1  { gap: 4px; }
        .rw-gap-2  { gap: 8px; }
        .rw-gap-3  { gap: 12px; }
        .rw-gap-4  { gap: 16px; }
        .rw-gap-6  { gap: 24px; }
        .rw-gap-8  { gap: 32px; }
        .rw-gap-10 { gap: 40px; }
        .rw-gap-12 { gap: 48px; }
        .rw-overflow-hidden { overflow: hidden; }
        .rw-overflow-visible { overflow: visible; }
        .rw-select-none { user-select: none; }
        .rw-cursor-pointer { cursor: pointer; }
        .rw-pointer-events-none { pointer-events: none; }
        .rw-w-full { width: 100%; }
        .rw-h-full { height: 100%; }
        .rw-h-auto { height: auto; }
        .rw-h-px   { height: 1px; }
        .rw-w-px   { width: 1px; }
        .rw-h-1\.5 { height: 6px; }
        .rw-w-1\.5 { width: 6px; }
        .rw-w-10   { width: 40px; }
        .rw-w-16   { width: 64px; }
        .rw-h-16   { height: 64px; }
        .rw-w-2    { width: 8px; }
        .rw-h-2    { height: 8px; }
        .rw-rounded-full   { border-radius: 9999px; }
        .rw-rounded-xl     { border-radius: 12px; }
        .rw-rounded-2xl    { border-radius: 16px; }
        .rw-rounded-3xl    { border-radius: 24px; }
        .rw-border         { border-width: 1px; }
        .rw-border-dashed  { border-style: dashed; }
        .rw-text-center    { text-align: center; }
        .rw-text-left      { text-align: left; }
        .rw-uppercase      { text-transform: uppercase; }
        .rw-leading-none   { line-height: 1; }
        .rw-leading-snug   { line-height: 1.375; }
        .rw-leading-relaxed { line-height: 1.625; }
        .rw-font-medium  { font-weight: 500; }
        .rw-font-bold    { font-weight: 700; }
        .rw-italic       { font-style: italic; }
        .rw-opacity-0    { opacity: 0; }
        .rw-backdrop-blur-sm { backdrop-filter: blur(4px); }
        .rw-transition { transition: all 0.2s; }
        .rw-transition-all { transition: all 0.3s ease; }
        .rw-transition-colors { transition: color 0.2s, background-color 0.2s; }
        .rw-mt-1  { margin-top:  4px; }
        .rw-mt-2  { margin-top:  8px; }
        .rw-mt-3  { margin-top: 12px; }
        .rw-mb-2  { margin-bottom:  8px; }
        .rw-mb-3  { margin-bottom: 12px; }
        .rw-mx-auto { margin-left: auto; margin-right: auto; }
        .rw-my-2   { margin-top: 8px; margin-bottom: 8px; }
        .rw-px-4  { padding-left: 16px; padding-right: 16px; }
        .rw-py-1  { padding-top:  4px; padding-bottom:  4px; }
        .rw-py-2  { padding-top:  8px; padding-bottom:  8px; }
        .rw-p-1   { padding:  4px; }
        .rw-p-2   { padding:  8px; }
        .rw-p-4   { padding: 16px; }
        .rw-min-h-screen { min-height: 100vh; }

        /* colours */
        .rw-text-gold        { color: #C9A84C; }
        .rw-text-white       { color: #fff; }
        .rw-text-white\/20   { color: rgba(255,255,255,0.20); }
        .rw-text-white\/60   { color: rgba(255,255,255,0.60); }
        .rw-text-white\/80   { color: rgba(255,255,255,0.80); }
        .rw-bg-white         { background-color: #fff; }

        /* ─── Page wrapper */
        .rw-page {
          background: #F9F5EE;
          min-height: 100vh;
          padding-bottom: 64px;
          position: relative;
          overflow: hidden;
        }

        /* ─── Background wave art */
        .rw-bg-waves {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.045;
        }

        /* ─── HERO */
        .rw-hero {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 40px 48px;
          display: grid;
          grid-template-columns: 38% 62%;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .rw-hero { grid-template-columns: 1fr; padding: 60px 24px 32px; }
        }

        /* left side */
        .rw-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 14px;
        }
        .rw-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #1A1810;
          margin: 0 0 20px;
        }
        .rw-h1 .rw-gold {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C86B 50%, #A8863A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rw-h1 .rw-orange {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rw-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .rw-divider-line { flex: 1; max-width: 48px; height: 1px; background: #D9CFC0; }
        .rw-divider-diamond {
          width: 7px; height: 7px;
          transform: rotate(45deg);
          border: 1.5px solid #C9A84C;
        }
        .rw-divider-diamond-sm {
          width: 4px; height: 4px;
          transform: rotate(45deg);
          border: 1px solid #C9A84C;
        }

        .rw-hero-desc {
          font-size: 14px;
          line-height: 1.7;
          color: #706760;
          max-width: 340px;
          margin-bottom: 36px;
        }

        /* ─── dark showcase card */
        .rw-showcase {
          background: #1C2028;
          border-radius: 28px;
          padding: 36px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 32px;
          box-shadow: 0 32px 64px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset;
          overflow: visible;
        }
        @media (max-width: 640px) {
          .rw-showcase { flex-direction: column; padding: 24px; }
        }

        .rw-showcase-text { flex: 1; }

        .rw-showcase-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #F5EFE0;
          line-height: 1.2;
          margin: 12px 0 10px;
        }
        .rw-showcase-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          margin-bottom: 14px;
          border-radius: 2px;
        }
        .rw-showcase-desc {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          margin-bottom: 24px;
        }

        .rw-cert-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C9A84C;
          border: 1.5px solid rgba(201,168,76,0.45);
          border-radius: 999px;
          padding: 9px 20px;
          cursor: pointer;
          background: transparent;
          transition: all 0.25s ease;
        }
        .rw-cert-btn:hover {
          background: rgba(201,168,76,0.1);
          border-color: #C9A84C;
          color: #E8C86B;
        }
        .rw-cert-btn-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .rw-cert-btn:hover .rw-cert-btn-icon { transform: translateX(3px); }

        /* certificate card inside showcase */
        .rw-cert-card {
          flex-shrink: 0;
          width: 300px;
          background: #fff;
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .rw-cert-card:hover { transform: scale(1.03) translateY(-3px); }
        .rw-cert-card img { width: 100%; height: auto; border-radius: 10px; display: block; }
        @media (max-width: 900px) { .rw-cert-card { width: 100%; max-width: 340px; } }

        /* carousel nav */
        .rw-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 20;
        }
        .rw-nav-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .rw-nav-btn-left  { left: -16px; }
        .rw-nav-btn-right { right: -16px; }

        /* dots */
        .rw-dots {
          display: flex; gap: 6px;
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
        }
        .rw-dot {
          height: 5px; border-radius: 999px;
          transition: all 0.3s;
          background: rgba(255,255,255,0.25);
        }
        .rw-dot.active { background: #C9A84C; width: 22px; }
        .rw-dot.inactive { width: 6px; }

        /* trophy float */
        .rw-trophy {
          position: absolute;
          top: -80px;
          right: 32px;
          width: 120px; height: 120px;
          pointer-events: none;
          z-index: 30;
          filter: drop-shadow(0 16px 32px rgba(0,0,0,0.25));
        }

        /* ─── MORE RECOGNITIONS label */
        .rw-section-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin: 0 0 48px;
          position: relative;
          z-index: 10;
        }
        .rw-section-label-line {
          height: 1px;
          width: 64px;
          background: linear-gradient(90deg, transparent, #C9A84C66);
        }
        .rw-section-label-line.rw-right {
          background: linear-gradient(270deg, transparent, #C9A84C66);
        }
        .rw-section-label span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A84C;
        }

        /* ─── three-column recognition grid */
        .rw-recognition {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 220px 1fr;
          gap: 0;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 900px) {
          .rw-recognition { grid-template-columns: 1fr; padding: 0 24px; }
          .rw-center-col  { display: none; }
        }

        /* horizontal connector lines */
        .rw-connector {
          position: absolute;
          top: 50%;
          left: 33.3%;
          right: 33.3%;
          transform: translateY(-50%);
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C44, transparent);
          z-index: 0;
          pointer-events: none;
        }
        .rw-connector-dot {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #C9A84C;
          z-index: 1;
        }
        .rw-connector-dot-left  { left: calc(33.3% - 4px); }
        .rw-connector-dot-right { right: calc(33.3% - 4px); }

        /* recognition card */
        .rw-rec-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.055);
          border: 1px solid rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        .rw-rec-img-wrap {
          width: 100%;
          background: #FAF5EB;
          border-radius: 14px;
          padding: 10px;
          margin-bottom: 22px;
          cursor: pointer;
          overflow: hidden;
        }
        .rw-rec-img-wrap img {
          width: 100%; height: auto;
          border-radius: 10px;
          display: block;
          transition: transform 0.4s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .rw-rec-img-wrap:hover img { transform: scale(1.03); }

        .rw-rec-badge {
          position: absolute;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #FAF5EB;
          border: 1px solid #EDE8DC;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .rw-rec-badge-left  { left: -22px; top: 50%; transform: translateY(-50%); }
        .rw-rec-badge-right { right: -22px; top: 50%; transform: translateY(-50%); }

        .rw-rec-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1A1810;
          line-height: 1.3;
          margin-bottom: 10px;
        }
        .rw-rec-desc {
          font-size: 13px;
          line-height: 1.7;
          color: #706760;
          margin-bottom: 18px;
          flex: 1;
        }
        .rw-rec-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A84C;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: opacity 0.2s;
        }
        .rw-rec-link:hover { opacity: 0.75; }

        /* center column */
        .rw-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          position: relative;
          z-index: 1;
        }

        /* ─── dark bottom banner */
        .rw-banner-wrap {
          max-width: 1280px;
          margin: 64px auto 0;
          padding: 0 40px;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 900px) {
          .rw-banner-wrap { padding: 0 24px; margin-top: 40px; }
        }

        .rw-banner {
          background: #111827;
          border-radius: 20px;
          padding: 40px 48px;
          display: grid;
          grid-template-columns: 1fr 1px auto;
          gap: 40px;
          align-items: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 900px) {
          .rw-banner { grid-template-columns: 1fr; padding: 32px 24px; }
          .rw-banner-divider { display: none; }
        }

        /* gold corner flourishes */
        .rw-corner-art {
          position: absolute;
          pointer-events: none;
          opacity: 0.18;
        }
        .rw-corner-art.rw-tl { top: 0; left: 0; }
        .rw-corner-art.rw-br { bottom: 0; right: 0; transform: rotate(180deg); }

        /* glow */
        .rw-banner-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 40% 60% at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .rw-banner-left {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        .rw-banner-icon { width: 60px; height: 60px; flex-shrink: 0; color: #C9A84C; }

        .rw-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5EFE0;
          line-height: 1.35;
          margin-bottom: 6px;
        }
        .rw-banner-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          max-width: 280px;
        }

        .rw-banner-divider-el {
          width: 1px;
          height: 70px;
          background: rgba(255,255,255,0.1);
          justify-self: center;
        }

        .rw-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 640px) {
          .rw-metrics { grid-template-columns: repeat(2, 1fr); }
        }

        .rw-metric { display: flex; flex-direction: column; align-items: flex-start; }
        .rw-metric-val {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #F5EFE0;
          line-height: 1;
          margin-bottom: 6px;
        }
        .rw-metric-lbl {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.40);
          line-height: 1.5;
        }

        /* lightbox */
        .rw-lightbox-bg {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(6px);
          padding: 20px;
          cursor: zoom-out;
        }
        .rw-lightbox-card {
          position: relative;
          max-width: 840px;
          width: 100%;
          background: #fff;
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          cursor: default;
        }
        .rw-lightbox-card img {
          width: 100%;
          height: auto;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 12px;
          display: block;
        }
        .rw-lightbox-close {
          position: absolute;
          top: -44px; right: 0;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rw-lightbox-close:hover { background: rgba(255,255,255,0.22); }
      `}</style>

      <div className="rw-root rw-page">

        {/* ── Background wave art ───────────────────────────────────── */}
        <svg
          className="rw-bg-waves"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 200 Q300 100 600 220 T1200 200" fill="none" stroke="#8B7355" strokeWidth="1.5" />
          <path d="M0 240 Q300 140 600 260 T1200 240" fill="none" stroke="#8B7355" strokeWidth="0.8" />
          <path d="M0 280 Q300 180 600 300 T1200 280" fill="none" stroke="#8B7355" strokeWidth="0.4" />
          <path d="M0 500 Q400 380 800 520 T1600 500" fill="none" stroke="#8B7355" strokeWidth="1" />
          <path d="M0 540 Q400 420 800 560 T1600 540" fill="none" stroke="#8B7355" strokeWidth="0.5" />
          <path d="M0 700 Q400 600 900 720 T1800 700" fill="none" stroke="#8B7355" strokeWidth="1.2" />
        </svg>

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="rw-hero">

          {/* ── LEFT ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="rw-eyebrow">Our Achievements</p>

            <h1 className="rw-h1">
              Rewards &amp;<br />
              <span className="rw-orange">Recognition</span>
            </h1>

            {/* decorative divider */}
            <div className="rw-divider">
              <div className="rw-divider-line" />
              <div className="rw-divider-diamond" />
              <div className="rw-divider-diamond-sm" />
              <div className="rw-divider-diamond" />
              <div className="rw-divider-line" />
            </div>

            <p className="rw-hero-desc">
              Celebrating our commitment to excellence, innovation, and impact.
              Recognitions that inspire us to aim higher every day.
            </p>
          </motion.div>

          {/* ── RIGHT (dark showcase card) ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ position: "relative" }}
          >
            {/* floating trophy */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3113/3113054.png"
              alt="trophy"
              className="rw-trophy"
              style={{
                filter:
                  "sepia(1) hue-rotate(5deg) saturate(2.5) brightness(1.05) drop-shadow(0 12px 28px rgba(0,0,0,0.22))",
              }}
            />

            <div className="rw-showcase">
              {/* left nav */}
              <button className="rw-nav-btn rw-nav-btn-left" onClick={prev} aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              {/* right nav */}
              <button className="rw-nav-btn rw-nav-btn-right" onClick={next} aria-label="Next">
                <ChevronRight size={16} />
              </button>

              {/* text side */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-text"}
                  className="rw-showcase-text"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stars filled={4} />
                  <h2 className="rw-showcase-title">{current.label}</h2>
                  <div className="rw-showcase-divider" />
                  <p className="rw-showcase-desc">{current.desc}</p>
                  <button
                    className="rw-cert-btn"
                    onClick={() => setLightbox(current.img)}
                  >
                    View Certificate
                    <span className="rw-cert-btn-icon">
                      <ArrowRight size={10} />
                    </span>
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* certificate image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-img"}
                  className="rw-cert-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightbox(current.img)}
                  title="Click to enlarge"
                >
                  <img src={current.img} alt={current.alt} />
                </motion.div>
              </AnimatePresence>

              {/* dots */}
              <div className="rw-dots">
                {displaySlides.map((s, i) => (
                  <button
                    key={s.id}
                    className={`rw-dot ${i === slide ? "active" : "inactive"}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{ border: "none", cursor: "pointer", padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════
            MORE RECOGNITIONS
        ════════════════════════════════════════════════ */}
        <motion.div
          className="rw-section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: 32 }}
        >
          <div className="rw-section-label-line" />
          <span>More Recognitions</span>
          <div className="rw-section-label-line rw-right" />
        </motion.div>

        {/* ════════════════════════════════════════════════
            THREE-COLUMN RECOGNITION LAYOUT
        ════════════════════════════════════════════════ */}
        <div style={{ position: "relative", paddingBottom: 48 }}>
          {/* horizontal connector line */}
          <div className="rw-connector" />
          {/* connector dots */}
          <div className="rw-connector-dot rw-connector-dot-left" />
          <div className="rw-connector-dot rw-connector-dot-right" />

          <div className="rw-recognition">

            {/* ── LEFT CARD: NIRF ───────────────────────── */}
            <motion.div
              className="rw-rec-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              {/* left badge */}
              <div className="rw-rec-badge rw-rec-badge-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M4 9h4v11H4zm12-4h4v15h-4zM10 14h4v6h-4z" />
                </svg>
              </div>

              <div
                className="rw-rec-img-wrap"
                onClick={() => setLightbox(resolveLegacyAsset("/src/assets/rewards/nirf innovation ranking 2023- band 11-50.png"))}
              >
                <img src={resolveLegacyAsset("/src/assets/rewards/nirf innovation ranking 2023- band 11-50.png")} alt="NIRF Certificate" />
              </div>

              <h3 className="rw-rec-title">
                NIRF Innovation Ranking
                <br />
                2023 – Band 11-50
              </h3>
              <p className="rw-rec-desc">
                Andhra University (A hub) is rated in the Top 11-50 Band under NIRF
                Innovation Ranking 2023 in the very first year of its operations.
              </p>
              <button
                className="rw-rec-link"
                onClick={() => setLightbox(resolveLegacyAsset("/src/assets/rewards/nirf innovation ranking 2023- band 11-50.png"))}
              >
                Explore Ranking <ArrowRight size={13} />
              </button>
            </motion.div>

            {/* ── CENTER EMBLEM ─────────────────────────── */}
            <motion.div
              className="rw-center-col"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <CenterEmblem />
            </motion.div>

            {/* ── RIGHT CARD: IIC 4.0 ───────────────────── */}
            <motion.div
              className="rw-rec-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {/* right badge */}
              <div className="rw-rec-badge rw-rec-badge-right">
                <Star size={16} fill="#C9A84C" color="#C9A84C" />
              </div>

              <div
                className="rw-rec-img-wrap"
                onClick={() => setLightbox(resolveLegacyAsset("/src/assets/rewards/IIc 4.0 rating -4 star.png"))}
              >
                <img src={resolveLegacyAsset("/src/assets/rewards/IIc 4.0 rating -4 star.png")} alt="IIC 4.0 Certificate" />
              </div>

              <h3 className="rw-rec-title">IIC 4.0 Rating – 4 Star</h3>
              <p className="rw-rec-desc">
                Among the highest rated State Universities in India to achieve 4-star
                in the Ministry of Education ratings of Academic Institutions in
                Institution's Innovation Ranking (IIC).
              </p>
              <button
                className="rw-rec-link"
                onClick={() => setLightbox(resolveLegacyAsset("/src/assets/rewards/IIc 4.0 rating -4 star.png"))}
              >
                View Certificate <ArrowRight size={13} />
              </button>
            </motion.div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════
            DARK BANNER — metrics
        ════════════════════════════════════════════════ */}
        <motion.div
          className="rw-banner-wrap"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="rw-banner">

            {/* glow overlay */}
            <div className="rw-banner-glow" />

            {/* top-left corner art */}
            <svg className="rw-corner-art rw-tl" width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path d="M0 0 L60 0 Q80 0 80 20 L80 60 Q80 80 60 80 L0 80Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <path d="M10 0 L70 0 Q90 0 90 20 L90 70 Q90 90 70 90 L10 90Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="4" fill="#C9A84C" />
            </svg>

            {/* bottom-right corner art */}
            <svg className="rw-corner-art rw-br" width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path d="M0 0 L60 0 Q80 0 80 20 L80 60 Q80 80 60 80 L0 80Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <path d="M10 0 L70 0 Q90 0 90 20 L90 70 Q90 90 70 90 L10 90Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="4" fill="#C9A84C" />
            </svg>

            {/* left block */}
            <div className="rw-banner-left">
              <svg className="rw-banner-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="36" width="52" height="24" rx="2" />
                <path d="M16 36V28M24 36V22M32 36V18M40 36V24M48 36V30" strokeLinecap="round" />
                <path d="M10 28h44M14 22h36M18 18h28" strokeLinecap="round" />
                <path d="M26 60v-8h12v8" />
              </svg>
              <div>
                <p className="rw-banner-title">
                  Driven by Excellence.
                  <br />
                  Recognized for Impact.
                </p>
                <p className="rw-banner-sub">
                  These recognitions reflect our dedication to building a better
                  future through education and innovation.
                </p>
              </div>
            </div>

            {/* divider */}
            <div className="rw-banner-divider-el" />

            {/* metrics */}
            <div className="rw-metrics">

              <div className="rw-metric">
                <div className="rw-metric-val">
                  4
                  <Star size={18} fill="#C9A84C" color="#C9A84C" />
                </div>
                <div className="rw-metric-lbl">IIC Rating<br />5.0</div>
              </div>

              <div className="rw-metric">
                <div className="rw-metric-val">11-50</div>
                <div className="rw-metric-lbl">NIRF Innovation<br />Ranking 2023</div>
              </div>



              <div className="rw-metric">
                <div className="rw-metric-val">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  52+
                </div>
                <div className="rw-metric-lbl">Years of<br />Legacy</div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════
            LIGHTBOX
        ════════════════════════════════════════════════ */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="rw-lightbox-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="rw-lightbox-card"
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="rw-lightbox-close"
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <img src={lightbox} alt="Certificate enlarged" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
