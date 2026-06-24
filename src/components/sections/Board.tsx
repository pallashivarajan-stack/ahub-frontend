import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { boardMembers } from "@/data/boardPage";
import { usePublicBoard } from "@/services/usePublicContent";

/* ── Inline LinkedIn SVG (no extra dep) ── */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.09V21h-4v-5.34c0-1.27-.02-2.91-1.77-2.91-1.77 0-2.04 1.38-2.04 2.82V21h-4V9z" />
    </svg>
  );
}

/* ── Offset helper from template ── */
function getOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/* ── Card content (shared between desktop & mobile) ── */
function MemberCardContent({
  member,
  isActive,
}: {
  member: any;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Portrait with orange glow */}
      <div className="relative">
        {/* Ambient glow blob */}
        <div
          className="absolute -inset-3 rounded-full opacity-60 blur-2xl"
          style={{ background: "var(--board-gradient-orange)" }}
        />
        {/* Portrait ring */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`relative overflow-hidden rounded-full border-4 border-white ${
            isActive ? "h-56 w-56" : "h-44 w-44"
          }`}
          style={{ background: "var(--board-gradient-orange)" }}
        >
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            width={512}
            height={512}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </motion.div>
      </div>

      {/* Name */}
      <h3
        className="mt-7 text-2xl font-bold"
        style={{
          fontFamily: "var(--board-font-serif)",
          color: "var(--board-foreground)",
        }}
      >
        {member.name}
      </h3>

      {/* Role */}
      <p
        className="mt-2 text-sm font-semibold uppercase tracking-wider"
        style={{ color: "var(--board-primary)" }}
      >
        {member.title}
      </p>

      {/* Orange divider */}
      <div
        className="mt-3 h-[2px] w-10 rounded-full"
        style={{ background: "var(--board-primary)" }}
      />

      {/* Bio */}
      <p
        className="mt-5 text-sm leading-relaxed"
        style={{ color: "var(--board-muted-fg)" }}
      >
        {member.bio}
      </p>

      {/* LinkedIn */}
      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-7 flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
          style={{
            background: "var(--board-gradient-orange)",
            boxShadow: "var(--board-shadow-soft)",
          }}
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}

/* ── Main export ── */
export function Board() {
  const { data: boardData } = usePublicBoard(boardMembers);
  const [active, setActive] = useState(1);
  const total = boardData.length;

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--board-cream)" }}
    >
      {/* ══ Background decorations (exact from template) ══ */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Left cream blob */}
        <div
          className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
          style={{ background: "var(--board-cream-deep)" }}
        />
        {/* Right cream blob */}
        <div
          className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full opacity-70 blur-3xl"
          style={{ background: "var(--board-cream-deep)" }}
        />

        {/* Top-right dot grid */}
        <svg
          className="absolute right-10 top-16 opacity-60"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle
                key={`tr-${r}-${c}`}
                cx={c * 14 + 4}
                cy={r * 14 + 4}
                r="2"
                fill="#FF8C42"
                opacity="0.4"
              />
            )),
          )}
        </svg>

        {/* Bottom-left dot grid */}
        <svg
          className="absolute bottom-10 left-10 opacity-60"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle
                key={`bl-${r}-${c}`}
                cx={c * 14 + 4}
                cy={r * 14 + 4}
                r="2"
                fill="#FF8C42"
                opacity="0.4"
              />
            )),
          )}
        </svg>

        {/* Curved wave at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C360,200 720,40 1440,120 L1440,200 L0,200 Z"
            fill="#F5E6D3"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ══ Content ══ */}
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--board-primary)" }}
          >
            Our Governance
          </p>
          <h2
            className="mt-4 text-5xl font-bold tracking-tight md:text-6xl"
            style={{
              fontFamily: "var(--board-font-serif)",
              color: "var(--board-foreground)",
            }}
          >
            Board
          </h2>
          <div
            className="mx-auto mt-4 h-[3px] w-16 rounded-full"
            style={{ background: "var(--board-primary)" }}
          />
          <p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--board-muted-fg)" }}
          >
            Our board provides strategic direction, visionary leadership, and
            governance to empower innovation and create lasting impact.
          </p>
        </div>

        {/* ══ Carousel ══ */}
        <div className="relative mt-20 flex items-center justify-center">
          {/* ◀ Left arrow (desktop) */}
          <button
            aria-label="Previous board member"
            onClick={prev}
            className="group absolute left-0 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF6B00] transition-all hover:scale-110 md:flex lg:left-4"
            style={{ boxShadow: "var(--board-shadow-soft)" }}
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* ▶ Right arrow (desktop) */}
          <button
            aria-label="Next board member"
            onClick={next}
            className="group absolute right-0 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF6B00] transition-all hover:scale-110 md:flex lg:right-4"
            style={{ boxShadow: "var(--board-shadow-soft)" }}
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* ══ Desktop cards stage ══ */}
          <div className="relative hidden h-[620px] w-full max-w-5xl md:block">
            {boardData.map((member: any, i: number) => {
              const offset = getOffset(i, active, total);
              const isActive = offset === 0;

              return (
                <motion.article
                  key={member.name}
                  animate={{
                    x: offset * 320,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.55,
                    zIndex: isActive ? 20 : 10 - Math.abs(offset),
                    filter: isActive ? "blur(0px)" : "blur(1px)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 28 }}
                  whileHover={isActive ? { y: -8, scale: 1.02 } : { y: -4 }}
                  onClick={() => !isActive && setActive(i)}
                  className="absolute left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[32px] border border-white/60 bg-white/70 p-8 backdrop-blur-xl"
                  style={{
                    boxShadow: isActive
                      ? "var(--board-shadow-elegant)"
                      : "var(--board-shadow-soft)",
                  }}
                >
                  <MemberCardContent member={member} isActive={isActive} />
                </motion.article>
              );
            })}
          </div>

          {/* ══ Mobile single-card slider ══ */}
          <div className="relative w-full md:hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={boardData[active].name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="mx-auto w-full max-w-sm rounded-[32px] border border-white/60 bg-white/80 p-7 backdrop-blur-xl"
                style={{ boxShadow: "var(--board-shadow-elegant)" }}
              >
                <MemberCardContent member={boardData[active]} isActive />
              </motion.article>
            </AnimatePresence>

            {/* Mobile controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                aria-label="Previous"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF6B00]"
                style={{ boxShadow: "var(--board-shadow-soft)" }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {boardData.map((_: any, i: number) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === active ? "2rem" : "0.5rem",
                      background:
                        i === active
                          ? "var(--board-primary)"
                          : "rgba(255,107,0,0.25)",
                    }}
                  />
                ))}
              </div>

              <button
                aria-label="Next"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF6B00]"
                style={{ boxShadow: "var(--board-shadow-soft)" }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
