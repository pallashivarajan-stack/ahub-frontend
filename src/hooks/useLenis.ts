import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Tell ScrollTrigger to use Lenis' scrolling position as the source
    const scrollEl = document.scrollingElement ?? document.documentElement;
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value: number) {
        if (arguments.length) {
          lenis.scrollTo(value);
          return;
        }
        // read
        // lenis keeps its own internal scroll value
        return (lenis as any).scroll?.instance?.scroll ?? window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    lenis.on("scroll", ScrollTrigger.update);
    lenis.resize();
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger has an accurate initial state
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
