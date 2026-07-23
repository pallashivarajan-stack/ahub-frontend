import { useState, useCallback, useEffect } from "react";
import { LazyMotion, m as motion, domAnimation } from "framer-motion";
import { resolveLegacyAsset } from "@/lib/assets";
import useEmblaCarousel from "embla-carousel-react";
import { usePublicTestimonials } from "@/services/usePublicContent";

const defaultTestimonials = [
  {
    name: "N. R. Narayana Murthy",
    role: "Founder & Former CEO",
    company: "Infosys",
    text: "The infrastructure support and industry connections we gained through A-Hub accelerated our growth by at least two years.",
    rating: 5,
    image: resolveLegacyAsset("/src/assets/visitors/naryana murthy.png"),
  },
  {
    name: "Natarajan Chandrasekaran",
    role: "Executive Chairman",
    company: "Tata Sons",
    text: "What you have today is quite impressive considering that you achieved it in less than two years.",
    rating: 5,
    image: resolveLegacyAsset("/src/assets/testimonals/Natrajan_chnadra sekaran.png"),
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { data: testimonials = defaultTestimonials } = usePublicTestimonials(defaultTestimonials);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: false },
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <LazyMotion features={domAnimation}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      <section
        id="testimonials"
        className="w-full bg-[#FDF8F2] py-10 md:py-14 overflow-hidden"
        style={{ fontFamily: "'Manrope', 'Helvetica Neue', sans-serif" }}
      >
        <div className="mx-auto w-full max-w-5xl px-6">

          {/* ── SECTION HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex flex-col items-center text-center"
          >
            {/* Pill badge */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#F59E42]" />
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59E42]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
                TESTIMONIALS
              </div>
              <div className="h-px w-8 bg-[#F59E42]" />
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-bold leading-[1.15] tracking-tight text-[#1B1B1B]">
              Real Founders. <span className="text-[#F59E42]">Real Impact.</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 max-w-[480px] text-[14px] leading-[1.6] text-[#6B7280]">
              Stories of ambition, support, and success from the AUIC community.
            </p>
          </motion.div>

          {/* ── CAROUSEL WRAPPER ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Embla drag viewport */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="min-w-0 flex-[0_0_100%] px-2"
                  >
                    <div
                      className="w-full rounded-[22px] bg-white p-5 md:p-8"
                      style={{
                        minHeight: 280,
                        boxShadow: "0 20px 48px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="grid min-h-[240px] grid-cols-1 md:grid-cols-[210px_1fr] items-center gap-5">
                        {/* LEFT: Portrait Circle with Orange Arc */}
                        <div className="relative flex items-center justify-center py-4">
                          <div className="relative h-[170px] w-[170px] shrink-0">
                            <svg className="absolute -inset-3 h-[194px] w-[194px] -rotate-[140deg]" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="46" fill="transparent" stroke="#F59E42" strokeWidth="2" strokeDasharray="210 300" strokeLinecap="round" />
                              <circle cx="50" cy="4" r="2.5" fill="#F59E42" />
                              <circle cx="96" cy="50" r="2.5" fill="#F59E42" />
                            </svg>
                            <div className="h-full w-full overflow-hidden rounded-full border border-gray-100 bg-[#FDF8F2]">
                              <img src={t.image} alt={t.name} className="h-full w-full object-cover object-top" />
                            </div>
                            <div className="absolute -bottom-2 -left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F59E42] shadow-md">
                              <span className="text-[20px] font-black text-white" style={{ fontFamily: "Georgia, serif", marginTop: -2 }}>“</span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: Content */}
                        <div className="flex flex-col justify-center px-4 md:px-6">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="text-[48px] font-black leading-none text-[#F59E42]" style={{ fontFamily: "Georgia, serif" }}>“</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: t.rating }).map((_, si) => (
                                <svg key={si} className="h-4 w-4" viewBox="0 0 24 24" fill="#F59E42">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <blockquote className="mb-5 text-[15px] font-medium leading-[1.5] text-[#2D1B1B] md:text-[17px]">{t.text}</blockquote>
                          <div className="mb-4 h-px w-8 bg-[#F59E42]" />
                          <div>
                            <h4 className="text-[15px] font-bold text-[#1B1B1B]">{t.name}</h4>
                            <p className="text-[12.5px] text-[#6B7280]">{t.role}, <span className="font-semibold text-[#F59E42]">{t.company}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 8,
                  backgroundColor: i === current ? "#F59E42" : "#D1D5DB",
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </LazyMotion>
  );
}

