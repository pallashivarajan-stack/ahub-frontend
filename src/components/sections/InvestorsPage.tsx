import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { featuredInvestors, marqueeInvestors } from "@/data/investorsPage";
import { cn } from "@/lib/utils";

const marqueeLoop = [...marqueeInvestors, ...marqueeInvestors];

export function InvestorsPage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FDF8F2] pb-24 pt-28 md:pb-32 md:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_8%,rgba(245,158,66,0.12),transparent_55%),radial-gradient(50%_45%_at_10%_15%,rgba(245,158,66,0.08),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <InvestorsHeader />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[48%_52%] lg:gap-8">
          <InvestWithUsCard />
          <OurInvestorsSection />
        </div>

        <FeaturedInvestorsCarousel />
      </div>
    </section>
  );
}

function InvestorsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
        Investors
      </div>

      <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.05] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[64px]">
        Investors
      </h1>

      <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
    </motion.div>
  );
}

function InvestWithUsCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] sm:flex-row sm:items-center"
    >
      <div className="flex shrink-0 items-center justify-center rounded-[24px] bg-[#FFF4E8] p-8 sm:h-[180px] sm:w-[180px]">
        <TrendingUp className="h-16 w-16 text-[#F59E42] sm:h-20 sm:w-20" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Invest With Us</h2>
        <div className="mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />
        <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B] md:text-[15px]">
          Back high-conviction founders, access curated deal flow, and join a network built around long-term startup outcomes.
        </p>
        <Link
          to="/$section/$slug"
          params={{ section: "programs", slug: "pitch-to-us" }}
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(245,158,66,0.65)]"
        >
          Become an Investor
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function OurInvestorsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Our Investors</h2>
      <p className="mt-2 text-sm text-[#6C5E5B] md:text-[15px]">Explore our network of venture and angel capital partners.</p>

      <div className="group/marquee relative mt-6 overflow-hidden rounded-[20px] border border-[#F59E42]/10 bg-white py-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee items-center px-4 group-hover/marquee:[animation-play-state:paused]">
          {marqueeLoop.map((investor, index) => (
            <div
              key={`${investor.name}-${index}`}
              className="flex h-16 shrink-0 items-center gap-3 border-r border-[#E8E0D8] px-8 last:border-r-0"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF4E8] text-xs font-bold text-[#F59E42]">
                {investor.initials}
              </span>
              <span className="whitespace-nowrap text-sm font-semibold text-[#2D1B1B]">{investor.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F59E42]/40" />
        <p className="shrink-0 text-xs font-medium tracking-wide text-[#6C5E5B] sm:text-sm">
          Trusted by 40+ investors and growing
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F59E42]/40" />
      </div>
    </motion.div>
  );
}

function FeaturedInvestorsCarousel() {
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
      <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-[28px]">Featured Investors</h2>
      <div className="mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />

      <div className="relative mt-10 px-0 sm:px-12 md:px-14">
        <CarouselArrow direction="prev" onClick={scrollPrev} className="hidden sm:flex md:-left-2" />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y gap-5">
            {featuredInvestors.map((investor) => (
              <div
                key={investor.name}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
              >
                <InvestorCard investor={investor} />
              </div>
            ))}
          </div>
        </div>

        <CarouselArrow direction="next" onClick={scrollNext} className="hidden sm:flex md:-right-2" />

        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          <CarouselArrow direction="prev" onClick={scrollPrev} mobile />
          <CarouselArrow direction="next" onClick={scrollNext} mobile />
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

function CarouselArrow({
  direction,
  onClick,
  className,
  mobile,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  mobile?: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "absolute top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F59E42] bg-white text-[#F59E42] shadow-sm transition-all duration-300 hover:bg-[#FFF4E8]",
        mobile ? "relative flex h-10 w-10 translate-y-0" : "absolute flex h-11 w-11 hover:-translate-y-[calc(50%+2px)]",
        !mobile && direction === "prev" && "-left-1 md:-left-2",
        !mobile && direction === "next" && "-right-1 md:-right-2",
        className,
      )}
    >
      <Icon size={mobile ? 18 : 20} />
    </button>
  );
}

function InvestorCard({ investor }: { investor: (typeof featuredInvestors)[number] }) {
  const content = (
    <>
      <div className="flex h-28 items-center justify-center rounded-[16px] bg-[#FAFAFA] px-4">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF4E8] to-[#FFE8D0] text-xl font-[800] text-[#F59E42]">
          {investor.initials}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-[800] text-[#2D1B1B]">{investor.name}</h3>
      <p className="mt-1 text-sm font-medium text-[#F59E42]">{investor.role}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6C5E5B]">{investor.description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#F59E42] transition-colors group-hover:text-[#E8872E]">
        Learn More
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(245,158,66,0.2)]";

  if (investor.href && !investor.href.startsWith("/")) {
    return (
      <a href={investor.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  if (investor.href) {
    return (
      <Link to={investor.href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
