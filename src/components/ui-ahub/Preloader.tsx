import { useEffect, useRef, useState } from "react";
import ahubLogo from "@/assets/AHub-Logo-1.png";

const SESSION_KEY = "ahub_preloader_seen";
const STRIPS = 5;

export function Preloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"idle" | "active" | "exit" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);

  /* ── Decide whether to show on client ── */
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (!seen) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setPhase("active");
      } else {
        setPhase("done");
      }
    } catch {
      setPhase("active");
    }
  }, []);

  /* ── Animate progress counter while active ── */
  useEffect(() => {
    if (phase !== "active") return;

    const startTime = performance.now();
    // Progress runs from 0 → 100 over the video duration (capped at 7 s)
    const duration = 7000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 99);
      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* ── Video events ── */
  useEffect(() => {
    if (phase !== "active") return;
    const video = videoRef.current;
    if (!video) return;

    const doExit = () => {
      clearTimeout(fallback);
      cancelAnimationFrame(rafRef.current);
      setProgress(100);
      // Small pause at 100% so user can see it
      setTimeout(() => {
        setPhase("exit");
        setTimeout(() => setPhase("done"), 1200);
      }, 320);
    };

    const fallback = setTimeout(doExit, 8000);
    video.addEventListener("ended", doExit);
    video.addEventListener("error", doExit);
    video.play().catch(doExit);

    return () => {
      clearTimeout(fallback);
      video.removeEventListener("ended", doExit);
      video.removeEventListener("error", doExit);
    };
  }, [phase]);

  if (phase === "idle" || phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      className="preloader-root"
      data-exiting={isExiting}
    >
      {/* ── Fullscreen background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="preloader-bg-video"
      >
        <source src="/assets/download.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay for readability ── */}
      <div className="preloader-overlay" />

      {/* ── 5 vertical exit strips (staggered) ── */}
      {Array.from({ length: STRIPS }).map((_, i) => (
        <div
          key={i}
          className="preloader-strip"
          style={{ "--strip-i": i } as React.CSSProperties}
          data-exiting={isExiting}
        />
      ))}

      {/* ── Center content ── */}
      <div className="preloader-content" data-exiting={isExiting}>
        {/* Logo */}
        <div className="preloader-logo-wrap">
          <img src={ahubLogo} alt="AHUB" className="preloader-logo" />
        </div>

        {/* Tagline */}
        <p className="preloader-tagline">aspire · associate · achieve</p>
      </div>

      {/* ── Bottom HUD ── */}
      <div className="preloader-hud" data-exiting={isExiting}>
        {/* Progress bar */}
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Counter */}
        <div className="preloader-counter">
          <span className="preloader-counter-num">
            {String(progress).padStart(2, "0")}
          </span>
          <span className="preloader-counter-pct">%</span>
        </div>
      </div>
    </div>
  );
}
