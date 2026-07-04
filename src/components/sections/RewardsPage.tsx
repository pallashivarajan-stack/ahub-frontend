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
          className={i < filled ? "rw-text-gold" : "rw-text-dark/20"}
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .rw-root { font-family: 'Poppins', sans-serif; }

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
        .rw-gap-1\.5  { gap: 6px; }
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
        .rw-text-dark\/20    { color: rgba(0,0,0,0.20); }
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
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 14px;
        }
        .rw-h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 700;
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

        /* ─── showcase card ────────────────────────────── */
        .rw-showcase {
          max-width: 1200px;
          margin: 0 auto;
          min-height: 400px;
          padding: 40px;
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 40px;
          align-items: center;
          background: linear-gradient(145deg, #FFFDF8 0%, #FFF7ED 50%, #FFF2E6 100%);
          border: 1px solid #F3D6A4;
          border-radius: 24px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.12);
          position: relative;
          overflow: visible;
        }
        @media (max-width: 1024px) {
          .rw-showcase { grid-template-columns: 1fr; min-height: auto; padding: 32px; gap: 32px; }
        }
        @media (max-width: 640px) {
          .rw-showcase { padding: 20px; gap: 24px; }
        }

        .rw-showcase-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .rw-showcase-title {
          font-family: 'Poppins', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #2A1F1B;
          line-height: 1.2;
          margin-top: 16px;
          margin-bottom: 0;
        }
        @media (max-width: 1024px) {
          .rw-showcase-title { font-size: 28px; }
        }
        @media (max-width: 640px) {
          .rw-showcase-title { font-size: 24px; }
        }

        .rw-showcase-divider {
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #E8C86B);
          margin-top: 16px;
          border-radius: 2px;
        }

        .rw-showcase-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #6C5E5B;
          max-width: 480px;
          margin-top: 16px;
          margin-bottom: 0;
        }
        @media (max-width: 1024px) {
          .rw-showcase-desc { font-size: 14px; }
        }
        @media (max-width: 640px) {
          .rw-showcase-desc { font-size: 13px; }
        }

        .rw-cert-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 48px;
          width: 200px;
          border-radius: 999px;
          border: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          background: linear-gradient(135deg, #C9A84C 0%, #E8C86B 50%, #D4B254 100%);
          color: #fff;
          box-shadow: 0 6px 20px rgba(201,168,76,0.35);
          transition: all 0.3s ease;
          margin-top: 28px;
        }
        .rw-cert-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.5);
        }
        .rw-cert-btn-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .rw-cert-btn:hover .rw-cert-btn-icon { transform: translateX(3px); }

        /* ─── Right column: certificate frame ──────────── */
        .rw-showcase-right {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .rw-showcase-frame {
          background: #fff;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
          transform: rotate(1deg);
          animation: rw-float 6s ease-in-out infinite;
          width: 100%;
          max-width: 400px;
          transition: box-shadow 0.3s ease;
        }
        .rw-showcase-frame:hover {
          box-shadow: 0 24px 64px rgba(0,0,0,0.12);
        }

        @keyframes rw-float {
          0%, 100% { transform: rotate(1deg) translateY(0); }
          50% { transform: rotate(1deg) translateY(-6px); }
        }

        .rw-cert-card {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .rw-cert-card:hover { transform: scale(1.02); }
        .rw-cert-card img { width: 100%; height: auto; display: block; }

        /* carousel nav — positioned outside card */
        .rw-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #fff;
          border: none;
          color: #C9A84C;
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          transition: all 0.25s ease;
          z-index: 30;
        }
        .rw-nav-btn:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.16);
          color: #B8922E;
          transform: translateY(-50%) scale(1.05);
        }
        .rw-nav-btn-left  { left: -24px; }
        .rw-nav-btn-right { right: -24px; }
        @media (max-width: 1024px) {
          .rw-nav-btn { width: 40px; height: 40px; }
          .rw-nav-btn-left  { left: -20px; }
          .rw-nav-btn-right { right: -20px; }
        }
        @media (max-width: 640px) {
          .rw-nav-btn { width: 36px; height: 36px; }
          .rw-nav-btn-left  { left: -18px; }
          .rw-nav-btn-right { right: -18px; }
        }

        /* dots — below card */
        .rw-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          position: relative;
        }
        .rw-dot {
          height: 6px;
          border-radius: 999px;
          border: none;
          transition: all 0.3s;
          background: rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .rw-dot.active { background: #C9A84C; width: 24px; }
        .rw-dot.inactive { width: 6px; }
        .rw-dot:hover { background: rgba(201,168,76,0.5); }

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
          background: linear-gradient(145deg, #FFF8F2 0%, #FFF0E6 50%, #FFE8D6 100%);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 8px 40px rgba(245,158,66,0.1);
          border: 1px solid rgba(245,158,66,0.15);
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
          font-family: 'Poppins', sans-serif;
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

        /* smaller variant for IIC 4.0 card */
        .rw-rec-card-sm {
          padding: 14px;
          border-radius: 14px;
        }
        .rw-rec-card-sm .rw-rec-img-wrap {
          padding: 6px;
          margin-bottom: 12px;
          border-radius: 10px;
        }
        .rw-rec-card-sm .rw-rec-img-wrap img {
          border-radius: 6px;
        }
        .rw-rec-card-sm .rw-rec-title {
          font-size: 14px;
          margin-bottom: 4px;
        }
        .rw-rec-card-sm .rw-rec-desc {
          font-size: 11px;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .rw-rec-card-sm .rw-rec-link {
          font-size: 9px;
          gap: 4px;
        }
        .rw-rec-card-sm .rw-rec-badge {
          width: 28px;
          height: 28px;
        }
        .rw-rec-card-sm .rw-rec-badge-right {
          right: -14px;
        }
        .rw-rec-card-sm .rw-rec-badge svg {
          transform: scale(0.6);
        }

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
          background: linear-gradient(145deg, #FFF8F2 0%, #FFF0E6 50%, #FFE8D6 100%);
          border-radius: 20px;
          padding: 40px 48px;
          display: grid;
          grid-template-columns: 1fr 1px auto;
          gap: 40px;
          align-items: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(245,158,66,0.15);
        }
        @media (max-width: 900px) {
          .rw-banner { grid-template-columns: 1fr; padding: 32px 24px; }
          .rw-banner-divider { display: none; }
        }

        /* gold corner flourishes */
        .rw-corner-art {
          position: absolute;
          pointer-events: none;
          opacity: 0.3;
        }
        .rw-corner-art.rw-tl { top: 0; left: 0; }
        .rw-corner-art.rw-br { bottom: 0; right: 0; transform: rotate(180deg); }

        /* glow */
        .rw-banner-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 40% 60% at 80% 50%, rgba(245,158,66,0.1) 0%, transparent 70%);
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
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #2D1B1B;
          line-height: 1.35;
          margin-bottom: 6px;
        }
        .rw-banner-sub {
          font-size: 12px;
          font-weight: 600;
          color: #706760;
          line-height: 1.65;
          max-width: 280px;
        }

        .rw-banner-divider-el {
          width: 1px;
          height: 70px;
          background: rgba(245,158,66,0.2);
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
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #2D1B1B;
          line-height: 1;
          margin-bottom: 6px;
        }
        .rw-metric-lbl {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8B7D77;
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
        <section className="relative isolate overflow-visible bg-[#FDF8F2] pb-24 pt-14 md:pb-32 md:pt-16 lg:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_8%,rgba(245,158,66,0.12),transparent_55%),radial-gradient(50%_45%_at_10%_15%,rgba(245,158,66,0.08),transparent_50%)]" />
          </div>

          <div className="site-container-wide">

            {/* ── Centered heading ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
                Our Achievements
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl">
                Rewards &amp; <span className="text-[#F59E42]">Recognition</span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]">
                Celebrating our commitment to excellence, innovation, and impact. Recognitions that inspire us to aim higher every day.
              </p>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
            </motion.div>

          </div>

          {/* ── Showcase card below (full-bleed) ────────── */}
          <div className="mx-auto max-w-[1480px] px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative mt-14 lg:mt-16"
            >
              {/* nav buttons — outside card */}
              <button className="rw-nav-btn rw-nav-btn-left" onClick={prev} aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button className="rw-nav-btn rw-nav-btn-right" onClick={next} aria-label="Next">
                <ChevronRight size={18} />
              </button>

              <div className="rw-showcase">

                {/* ── LEFT COLUMN: text ──────────────────── */}
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
                        <ArrowRight size={11} />
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>

                {/* ── RIGHT COLUMN: certificate frame ────── */}
                <div className="rw-showcase-right">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id + "-frame"}
                      className="rw-showcase-frame"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="rw-cert-card"
                        onClick={() => setLightbox(current.img)}
                        title="Click to enlarge"
                      >
                        <img src={current.img} alt={current.alt} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* dots — below card */}
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
            </motion.div>

          </div>
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
              className="rw-rec-card rw-rec-card-sm"
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
