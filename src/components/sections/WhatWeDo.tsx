import React, { useRef, useState, type MouseEvent } from "react";
import { resolveLegacyAsset } from "@/lib/assets";
import { usePublicWhatWeDo } from "@/services/usePublicContent";

type Item = {
  n: string;
  kicker: string;
  title: string;
  desc: string;
  icon: string;
};

const defaultItems: Item[] = [
  {
    n: "01",
    kicker: "Discovery",
    title: "Business Advisory",
    desc: "Advisory board and mentors, management team identification, access to newer technology & talent.",
    icon: resolveLegacyAsset("/src/assets/what we do/01.png"),
  },
  {
    n: "02",
    kicker: "Expertise",
    title: "Mentoring & Training",
    desc: "Mentorship through experts – in-person & virtual. Comprehensive business training programs - Basics of Business Management, Leadership, Business Etiquette, Presentation Skills, etc.",
    icon: resolveLegacyAsset("/src/assets/what we do/02.png"),
  },
  {
    n: "03",
    kicker: "Infrastructure",
    title: "Resources & Market Access",
    desc: "Networking opportunities, marketing assistance & strategic partnerships, access to corporates & government agencies. Well-equipped workspaces with modern labs, software, meeting rooms, and event facilities.",
    icon: resolveLegacyAsset("/src/assets/what we do/03.png"),
  },
  {
    n: "04",
    kicker: "Capital",
    title: "Funding & Legal Support",
    desc: "Access to bank loans, loan funds, and guarantee programs, angel investors and venture capital. Help with regulatory compliance & accounts, help in IP management and legal counsel.",
    icon: resolveLegacyAsset("/src/assets/what we do/04.png"),
  },
];

const EASE = "cubic-bezier(.22,1,.36,1)";

function Card({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [p, setP] = useState({ x: 50, y: 50 });

  const n = item.n;
  const title = item.title;
  const desc = item.desc;
  const icon = item.icon;
  const kicker = item.kicker;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const textItem = (i: number): React.CSSProperties => ({
    opacity: hovered ? 1 : 0.999,
    transform: "translateY(0)",
    transition: `color 600ms ${EASE} ${i * 50}ms`,
  });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className="group relative cursor-pointer overflow-hidden rounded-[22px] p-6 sm:p-8 flex h-full flex-col justify-between"
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${hovered ? "transparent" : "rgba(15,23,42,0.06)"}`,
        boxShadow: hovered
          ? "0 24px 60px rgba(255,122,0,0.25)"
          : "0 1px 2px rgba(15,23,42,0.03), 0 8px 24px rgba(15,23,42,0.04)",
        transform: hovered ? "translate3d(0,-6px,0)" : "translate3d(0,0,0)",
        transition: `transform 600ms ${EASE}, box-shadow 600ms ${EASE}, border-color 600ms ${EASE}`,
        willChange: "transform",
      }}
    >
      {/* Sweep layer: orange gradient wiping L->R + radial glow at cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(600px circle at ${p.x}% ${p.y}%, rgba(255,180,110,0.35), transparent 55%),
            linear-gradient(105deg, #FF6A00 0%, #FF7A00 45%, #FF8A1F 100%)
          `,
          opacity: hovered ? 1 : 0,
          clipPath: hovered
            ? "inset(0 0% 0 0 round 22px)"
            : "inset(0 100% 0 0 round 22px)",
          transition: `clip-path 700ms ${EASE}, opacity 400ms ease`,
          willChange: "clip-path, opacity",
        }}
      />

      {/* Light reflection sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 300ms ease" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "40%",
            transform: hovered
              ? "translateX(320%) skewX(-18deg)"
              : "translateX(-120%) skewX(-18deg)",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            transition: `transform 1100ms ${EASE} 120ms`,
          }}
        />
      </div>

      {/* Subtle noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] mix-blend-overlay"
        style={{
          opacity: hovered ? 0.18 : 0,
          transition: "opacity 500ms ease",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Background number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-4 select-none font-display text-[5rem] font-bold leading-none tracking-tight"
        style={{
          color: hovered ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.03)",
          transform: hovered ? "translate3d(0,-4px,0)" : "translate3d(0,0,0)",
          transition: `color 600ms ${EASE}, transform 600ms ${EASE}`,
        }}
      >
        {n}
      </div>

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:gap-8 w-full h-full">
        {/* Logo: larger size, orange by default, white on hover */}
        <div
          className="relative shrink-0"
          style={{
            width: 100,
            height: 100,
            transform: hovered
              ? "translate3d(0,-3px,0) scale(1.08)"
              : "translate3d(0,0,0) scale(1)",
            transition: `transform 600ms ${EASE}`,
            filter: hovered
              ? "brightness(0) invert(1) drop-shadow(0 6px 14px rgba(255,255,255,0.35))"
              : "none",
            willChange: "transform, filter",
          }}
        >
          <img
            src={icon}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.14em]">
            <span
              style={{
                color: hovered ? "#ffffff" : "#FF7A00",
                transition: `color 500ms ${EASE}`,
              }}
            >
              {n}
            </span>
            <span
              style={{
                color: hovered
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,122,0,0.5)",
                transition: `color 500ms ${EASE}`,
              }}
            >
              —
            </span>
            <span
              className="uppercase"
              style={{
                color: hovered ? "#ffffff" : "rgba(255,122,0,0.75)",
                transition: `color 500ms ${EASE} 50ms`,
              }}
            >
              {kicker}
            </span>
          </div>

          <h3
            className="font-display text-lg font-bold tracking-tight sm:text-[1.25rem]"
            style={{
              color: hovered ? "#ffffff" : "#0F172A",
              transition: `color 550ms ${EASE} 100ms`,
            }}
          >
            {title}
          </h3>

          <div
            className="mt-3 h-[2px] rounded-full"
            style={{
              width: hovered ? 72 : 40,
              backgroundColor: hovered ? "#ffffff" : "#FF7A00",
              transition: `width 500ms ${EASE}, background-color 500ms ${EASE} 100ms`,
            }}
          />

          <p
            className="mt-4 max-w-md text-[0.85rem] leading-relaxed"
            style={{
              color: hovered ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.6)",
              transition: `color 600ms ${EASE} 150ms`,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  const { data: rawCards } = usePublicWhatWeDo(defaultItems as any);

  const logoSymbols = [
    resolveLegacyAsset("/src/assets/what we do/01.png"),
    resolveLegacyAsset("/src/assets/what we do/02.png"),
    resolveLegacyAsset("/src/assets/what we do/03.png"),
    resolveLegacyAsset("/src/assets/what we do/04.png"),
  ];

  const displayItems: Item[] = (Array.isArray(rawCards) ? rawCards : defaultItems).map(
    (c: any, i: number) => ({
      n: c.n ?? c.number ?? String(i + 1).padStart(2, "0"),
      kicker: c.kicker ?? ["Discovery", "Expertise", "Infrastructure", "Capital"][i] ?? "",
      title: c.title ?? "",
      desc: c.desc ?? c.description ?? "",
      icon: logoSymbols[i] ?? c.icon ?? "",
    }),
  );

  return (
    <section
      id="what-we-do"
      className="relative w-full pt-8 pb-24 sm:pt-12 sm:pb-32"
      aria-label="What We Do - AHUB services overview"
      style={{
        background:
          "linear-gradient(180deg, #FFF7EE 0%, #FFF2E2 60%, #FFEBD3 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#FF7A00]">
            <span className="h-px w-8 bg-[#FF7A00]/40" />
            What We Do
            <span className="h-px w-8 bg-[#FF7A00]/40" />
          </div>
          {/* Main heading decreased in size slightly: text-3xl md:text-4xl lg:text-[3rem] */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-bold tracking-tight text-[#0F172A] leading-[1.05]">
            We <span className="text-[#FF7A00]">Empower</span> Startups.
            <br />
            We <span className="text-[#FF7A00]">Build</span> Futures.
          </h2>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-[#FF7A00]" />
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#0F172A]/60">
            AHUB Incubation Council is dedicated to nurturing ideas, empowering
            founders, and building impactful ventures.
          </p>
        </div>

        {/* Card grid - 2x2 layout, tighter gaps, perfectly aligned */}
        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-2">
          {displayItems.map((it) => (
            <Card key={it.n} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
