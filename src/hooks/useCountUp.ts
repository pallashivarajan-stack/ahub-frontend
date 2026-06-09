import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;
    let frameId: number | null = null;

    const run = () => {
      if (started) return;
      started = true;

      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          frameId = null;
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const reset = () => {
      started = false;
      setValue(0);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
          } else {
            // Reset when leaving viewport so animation can replay on re-entry.
            reset();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return { ref, value };
}
