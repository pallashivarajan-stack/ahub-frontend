import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Handshake } from "lucide-react";
import { marqueePartners, popularPartners } from "@/data/partnersPage";
import { usePublicPartnersPage } from "@/services/usePublicContent";
import { cn } from "@/lib/utils";

export function PartnersPage() {
  const { data: partnersData } = usePublicPartnersPage({ marqueePartners, popularPartners });
  const displayMarquee = partnersData?.marqueePartners ?? marqueePartners;
  const displayPopular = partnersData?.popularPartners ?? popularPartners;
  const marqueeLoop = [...displayMarquee, ...displayMarquee];

  return (
    <section className="relative isolate overflow-hidden bg-[#FDF8F2] pb-24 pt-28 md:pb-32 md:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_8%,rgba(245,158,66,0.12),transparent_55%),radial-gradient(50%_45%_at_10%_15%,rgba(245,158,66,0.08),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <PartnersHeader />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[48%_52%] lg:gap-8">
          <PartnerWithUsCard />
          <OurPartnersSection marqueeLoop={marqueeLoop} />
        </div>

        <PopularPartnersCarousel displayPopular={displayPopular} />
      </div>
    </section>
  );
}

function PartnersHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
        Partners
      </div>

      <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.05] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[64px]">
        Partners
      </h1>

      <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
    </motion.div>
  );
}

function PartnerWithUsCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] sm:flex-row sm:items-center"
    >
      <div className="flex shrink-0 items-center justify-center rounded-[24px] bg-[#FFF4E8] p-8 sm:h-[180px] sm:w-[180px]">
        <Handshake className="h-16 w-16 text-[#F59E42] sm:h-20 sm:w-20" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Partner With Us</h2>
        <div className="mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />
        <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B] md:text-[15px]">
          Collaborate with us to drive impact, foster innovation, and create opportunities for growth.
        </p>
        <Link
          to="/programs/join-us"
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(245,158,66,0.65)]"
        >
          Become a Partner
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function OurPartnersSection({ marqueeLoop }: { marqueeLoop: typeof marqueePartners }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Our Partners</h2>
      <p className="mt-2 text-sm text-[#6C5E5B] md:text-[15px]">Explore our network of trusted partners.</p>

      <div className="group/marquee relative mt-6 overflow-hidden rounded-[20px] border border-[#F59E42]/10 bg-white py-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee items-center px-4 group-hover/marquee:[animation-play-state:paused]">
          {marqueeLoop.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-16 shrink-0 items-center border-r border-[#E8E0D8] px-8 last:border-r-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-11 max-w-[130px] object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F59E42]/40" />
        <p className="shrink-0 text-xs font-medium tracking-wide text-[#6C5E5B] sm:text-sm">
          Trusted by 50+ partners and growing
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F59E42]/40" />
      </div>
    </motion.div>
  );
}

function PopularPartnersCarousel({ displayPopular }: { displayPopular: typeof popularPartners }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 lg:mt-24"
    >
      <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Popular Partners</h2>
      <div className="mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />

      <div className="relative mt-10 px-0 sm:px-12 md:px-14">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous partners"
          className="absolute -left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F59E42] bg-white text-[#F59E42] shadow-sm transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-[#FFF4E8] sm:flex md:-left-2"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y gap-5">
            {displayPopular.map((partner) => (
              <div
                key={partner.name}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
              >
                <PopularPartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next partners"
          className="absolute -right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F59E42] bg-white text-[#F59E42] shadow-sm transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-[#FFF4E8] sm:flex md:-right-2"
        >
          <ChevronRight size={20} />
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous partners"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F59E42] bg-white text-[#F59E42]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next partners"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F59E42] bg-white text-[#F59E42]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              selectedIndex === index ? "w-6 bg-[#F59E42]" : "w-2 bg-[#E5DDD6]",
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

function PopularPartnerCard({ partner }: { partner: (typeof popularPartners)[number] }) {
  const content = (
    <>
      <div className="flex h-28 items-center justify-center rounded-[16px] bg-[#FAFAFA] px-4">
        <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-[180px] object-contain" />
      </div>
      <h3 className="mt-5 text-lg font-[800] text-[#2D1B1B]">{partner.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6C5E5B]">{partner.description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#F59E42] transition-colors group-hover:text-[#E8872E]">
        Learn More
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(245,158,66,0.2)]";

  if (partner.href && partner.href !== "#") {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
