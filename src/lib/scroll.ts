import { gsap, ScrollTrigger } from "@/lib/gsap";

export function initScrollAnimations() {
  if (typeof window === "undefined") return;

  gsap.defaults({ ease: "power3.out" });
  ScrollTrigger.defaults({
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    invalidateOnRefresh: true,
  });

  const ctx = gsap.context(() => {
    const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

    revealElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 24, opacity: 0, willChange: "transform,opacity" },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: index * 0.03,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    const animateGroups = gsap.utils.toArray<HTMLElement>("[data-animate]");

    animateGroups.forEach((group) => {
      const children = group.querySelectorAll<HTMLElement>("[data-animate-child]");

      if (children.length) {
        gsap.fromTo(
          children,
          { y: 28, opacity: 0, willChange: "transform,opacity" },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else {
        gsap.fromTo(
          group,
          { y: 28, opacity: 0, willChange: "transform,opacity" },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    const parallaxLayers = gsap.utils.toArray<HTMLElement>("[data-parallax]");

    parallaxLayers.forEach((layer) => {
      gsap.to(layer, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });
  });

  ScrollTrigger.refresh();

  return () => {
    ctx.revert();
  };
}

export default initScrollAnimations;
