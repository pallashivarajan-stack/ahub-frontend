import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  collaborativeFeatures,
  eventFeatures,
  facilities,
  galleryStrip,
  infrastructureImages,
  infrastructureStats,
  masonryGallery,
  researchPills,
} from "@/data/infrastructurePage";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { usePublicInfrastructure } from "@/services/usePublicContent";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function InfrastructurePage() {
  const { data: infraData } = usePublicInfrastructure({
    facilities,
    galleryStrip,
    infrastructureImages,
    infrastructureStats,
    masonryGallery,
    researchPills,
    collaborativeFeatures,
    eventFeatures,
  });

  return (
    <div className="relative isolate overflow-hidden bg-[#FDF8F2]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_90%_5%,rgba(245,158,66,0.1),transparent_55%),radial-gradient(50%_45%_at_5%_20%,rgba(245,158,66,0.07),transparent_50%)]" />
      </div>

      <HeroSection images={infraData.infrastructureImages} />
      <FacilitiesSection data={infraData.facilities} />
      <GalleryStrip data={infraData.galleryStrip} />
      <CollaborativeSection images={infraData.infrastructureImages} features={infraData.collaborativeFeatures} />
      <ResearchLabsSection images={infraData.infrastructureImages} pills={infraData.researchPills} />
      <EventsSection images={infraData.infrastructureImages} features={infraData.eventFeatures} />
      <MetricsSection data={infraData.infrastructureStats} />
      <MasonryGallery data={infraData.masonryGallery} />
    </div>
  );
}

function HeroSection({ images }: { images: any }) {
  const heroStats = [
    { value: "120+", label: "Startups" },
    { value: "80+", label: "Mentors" },
    { value: "₹50Cr+", label: "Funding" },
    { value: "24/7", label: "Access" },
  ];

  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
            Infrastructure
          </div>

          <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.08] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[56px]">
            World-Class{" "}
            <span className="text-[#F59E42]">Innovation</span>
            <br />
            Infrastructure
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#6C5E5B] md:text-base">
            Modern facilities, startup workspaces, research labs, event venues, and collaborative environments designed to
            help founders build faster.
          </p>

          <a
            href="#facilities"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(245,158,66,0.65)]"
          >
            Explore Facilities
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[32px] shadow-[0_24px_60px_-30px_rgba(45,27,27,0.2)]">
            <img
              src={images.hero}
              alt="AHUB innovation campus"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>

          <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-2 gap-3 rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[0_16px_40px_-20px_rgba(45,27,27,0.15)] backdrop-blur-md sm:left-8 sm:right-8 sm:grid-cols-4 sm:p-5">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-[800] text-[#2D1B1B] sm:text-xl">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6C5E5B] sm:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FacilitiesSection({ data }: { data: any }) {
  return (
    <section id="facilities" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-2xl font-[800] tracking-tight text-[#2D1B1B] md:text-3xl">Infrastructure Facilities</h2>
          <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((facility: any, index: number) => (
            <motion.article
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-[24px] bg-white p-5 text-center shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(245,158,66,0.18)]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4E8] transition-colors duration-300 group-hover:bg-[#F59E42]">
                <facility.icon className="h-5 w-5 text-[#F59E42] transition-colors duration-300 group-hover:text-white" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-sm font-[800] text-[#2D1B1B]">{facility.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6C5E5B]">{facility.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip({ data }: { data: any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div {...fadeUp} className="mb-8">
          <h2 className="text-xl font-[800] text-[#2D1B1B] md:text-2xl">Inside AHUB</h2>
          <p className="mt-2 text-sm text-[#6C5E5B]">Spaces where founders build, collaborate, and showcase.</p>
        </motion.div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {data.map((item: any) => (
              <div
                key={item.label}
                className="group relative min-w-0 shrink-0 grow-0 basis-[85%] overflow-hidden rounded-[28px] sm:basis-[45%] lg:basis-[32%]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B1B]/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {data.map((item: any, index: number) => (
            <button
              key={item.label}
              type="button"
              aria-label={`View ${item.label}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selectedIndex === index ? "w-6 bg-[#F59E42]" : "w-1.5 bg-[#E5DDD6]",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollaborativeSection({ images, features }: { images: any; features: any }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[32px] shadow-[0_20px_60px_-30px_rgba(45,27,27,0.15)]">
            <img
              src={images.collaborative}
              alt="Collaborative workspace"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <div className="rounded-[28px] border border-white/80 bg-white/70 p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] backdrop-blur-md md:p-10">
            <h2 className="text-2xl font-[800] text-[#F59E42] md:text-3xl">Collaborative Environment</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B] md:text-[15px]">
              Vibrant co-working spaces designed for founders, mentors, and ecosystem partners to connect and build
              together.
            </p>
            <ul className="mt-6 space-y-3">
              {features.map((feature: any) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#2D1B1B]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF4E8]">
                    <Check className="h-3.5 w-3.5 text-[#F59E42]" strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResearchLabsSection({ images, pills }: { images: any; pills: any }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp}>
          <div className="rounded-[28px] border border-white/80 bg-white/70 p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] backdrop-blur-md md:p-10">
            <h2 className="text-2xl font-[800] text-[#F59E42] md:text-3xl">Advanced Research Facilities</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B] md:text-[15px]">
              Cutting-edge laboratories equipped for deep-tech prototyping, experimentation, and product validation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {pills.map((pill: any) => (
                <span
                  key={pill}
                  className="rounded-full border border-[#F59E42]/20 bg-[#FFF4E8] px-4 py-1.5 text-xs font-semibold text-[#2D1B1B]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[32px] shadow-[0_20px_60px_-30px_rgba(45,27,27,0.15)]">
            <img
              src={images.labs}
              alt="IoT and robotics research lab"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EventsSection({ images, features }: { images: any; features: any }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_-30px_rgba(45,27,27,0.12)]">
          <div className="grid lg:grid-cols-[60%_40%]">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[280px] lg:min-h-[420px]"
            >
              <img
                src={images.conference}
                alt="Events and community auditorium"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-5 top-5 rounded-full bg-[#F59E42] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                500+ Capacity
              </span>
            </motion.div>

            <motion.div {...fadeUp} className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
              <h2 className="text-2xl font-[800] text-[#F59E42] md:text-3xl">Events & Community Spaces</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B]">
                Host impactful demo days, workshops, and investor gatherings in a premium auditorium built for the
                startup ecosystem.
              </p>
              <ul className="mt-6 space-y-3">
                {features.map((feature: any) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-[#2D1B1B]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF4E8]">
                      <Check className="h-3.5 w-3.5 text-[#F59E42]" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection({ data }: { data: any }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <h2 className="text-2xl font-[800] text-[#2D1B1B] md:text-3xl">Infrastructure at Scale</h2>
          <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((stat: any, index: number) => (
            <MetricCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  stat,
  index,
}: {
  stat: (typeof infrastructureStats)[number];
  index: number;
}) {
  const { ref, value } = useCountUp(stat.value, 1800);
  const isAccess = stat.suffix === "/7";

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-[28px] bg-white p-6 text-center shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(245,158,66,0.15)] md:p-8"
    >
      <div className="font-display text-4xl font-[800] tabular-nums text-[#2D1B1B] md:text-5xl">
        {stat.prefix}
        {isAccess ? `${value}/7` : `${value}${stat.suffix}`}
      </div>
      <p className="mt-2 text-sm font-medium text-[#6C5E5B]">{stat.label}</p>
    </motion.article>
  );
}

function MasonryGallery({ data }: { data: any }) {
  return (
    <section className="pb-24 pt-8 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div {...fadeUp} className="mb-10">
          <h2 className="text-2xl font-[800] text-[#2D1B1B] md:text-3xl">Facility Gallery</h2>
          <div className="mt-3 h-0.5 w-10 rounded-full bg-[#F59E42]" />
        </motion.div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {data.map((item: any, index: number) => (
            <motion.div
              key={`${item.label}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px]"
            >
              <img
                src={item.src}
                alt={item.label}
                className={cn(
                  "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F59E42]/80 via-[#F59E42]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
