import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Globe, Rocket, Search, Building, Calendar, MapPin, User, Info } from "lucide-react";
import {
  categories,
  filterStartups,
  fundingStages,
  industries,
  logoMarquee,
  sortOptions,
  startupDirectory,
  type SortOption,
  type StartupItem,
} from "@/data/startupPortfolio";
import { cn } from "@/lib/utils";
import { usePublicStartupPortfolio } from "@/services/usePublicContent";

const PAGE_SIZE = 41;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function StartupPortfolioPage() {
  const { data: portfolioData } = usePublicStartupPortfolio({
    categories,
    fundingStages,
    industries,
    logoMarquee,
    startupDirectory,
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [fundingStage, setFundingStage] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [applied, setApplied] = useState({
    search: "",
    category: "All",
    fundingStage: "All",
    industry: "All",
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterStartups(portfolioData.startupDirectory, { ...applied, sort }),
    [applied, sort, portfolioData.startupDirectory],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setPage(1);
  }, [applied, sort]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setApplied((prev) => ({ ...prev, search: value }));
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const applyFilters = () => {
    setApplied({ search, category, fundingStage, industry });
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setFundingStage("All");
    setIndustry("All");
    setApplied({ search: "", category: "All", fundingStage: "All", industry: "All" });
    setSort("newest");
    setPage(1);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF7ED] pb-24 pt-20 md:pb-32 md:pt-24">
      <style>{`
        .pc-scene {
          perspective: 1200px;
          width: 100%;
          max-width: 280px;
          height: 340px;
          margin: 0 auto;
        }
        .pc-inner {
          width: 100%; height: 100%;
          position: relative;
          transition: transform 650ms cubic-bezier(.22,1,.36,1), box-shadow 650ms ease;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .pc-scene:hover .pc-inner {
          transform: rotateY(180deg) translateY(-6px);
        }
        .pc-scene:hover { z-index: 10; }
        .pc-face {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 28px;
          background: #FFFDF8;
          border: 1px solid #F5E4D3;
          box-shadow: 0 8px 32px rgba(246,139,31,0.08), 0 2px 8px rgba(0,0,0,0.03);
          overflow: hidden;
          transition: box-shadow 650ms ease;
        }
        .pc-scene:hover .pc-face {
          box-shadow: 0 20px 60px rgba(255,138,61,0.15), 0 4px 16px rgba(0,0,0,0.04);
        }
        .pc-back { transform: rotateY(180deg); }
        .pc-scene:hover .pc-logo-img { transform: scale(1.03); }
        .pc-logo-img { transition: transform 650ms cubic-bezier(.22,1,.36,1); }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <BackgroundDecor />

      <div className="relative site-container-wide">
        <PortfolioHeader />
        <LogoMarqueeShowcase data={portfolioData.logoMarquee} />
        <FilterPanel
          categories={portfolioData.categories}
          fundingStages={portfolioData.fundingStages}
          industries={portfolioData.industries}
          search={search}
          category={category}
          fundingStage={fundingStage}
          industry={industry}
          onSearchChange={handleSearchChange}
          onCategoryChange={setCategory}
          onFundingChange={setFundingStage}
          onIndustryChange={setIndustry}
          onApply={applyFilters}
          onReset={resetFilters}
        />
        <DirectoryGrid ref={resultsRef} startups={paginated} total={filtered.length} sort={sort} onSortChange={setSort} />
        <Pagination page={page} totalPages={totalPages} pageNumbers={pageNumbers} onPageChange={setPage} />
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_8%,rgba(245,158,66,0.1),transparent_55%),radial-gradient(50%_45%_at_10%_15%,rgba(245,158,66,0.07),transparent_50%)]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F59E42]/8 blur-3xl" />
      <div className="absolute -right-20 top-48 h-56 w-56 rounded-full bg-[#FFE8D0]/70 blur-2xl" />
      <div className="absolute bottom-32 left-1/3 h-40 w-40 rounded-full bg-[#FFF4E8]/90 blur-xl" />
      <div className="absolute right-1/4 top-1/3 opacity-[0.04] [background-image:radial-gradient(#F59E42_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
    </div>
  );
}

function PortfolioHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#F59E42]/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42] shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E42]" />
        Startups Ecosystem
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="hidden h-px w-12 bg-[#F59E42]/40 sm:block" />
        <h1 className="text-3xl font-extrabold tracking-tight text-[#2D1B1B] sm:text-4xl md:text-5xl">
          Startup <span className="text-[#F59E42]">Portfolio</span>
        </h1>
        <span className="hidden h-px w-12 bg-[#F59E42]/40 sm:block" />
      </div>

      <p className="mx-auto mt-4 max-w-xl text-base text-[#6C5E5B]">
        Discover successful startups and explore innovative companies.
      </p>
    </motion.div>
  );
}

function LogoMarqueeShowcase({ data }: { data: any }) {
  const marqueeLoop = [...data, ...data];

  return (
    <motion.div {...fadeUp} className="relative mt-14 lg:mt-16">
      <div className="relative rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] backdrop-blur-sm md:p-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 rounded-l-[32px] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 rounded-r-[32px] bg-gradient-to-l from-white to-transparent" />

        <div className="group/marquee overflow-hidden">
          <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
            {marqueeLoop.map((item: any, index: number) => (
              <div
                key={`${item.name}-${index}`}
                className="flex h-[130px] w-[180px] shrink-0 items-center justify-center px-6"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-[110px] max-w-[150px] object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === 0 ? "w-6 bg-[#F59E42]" : "w-2 bg-[#E5DDD6]",
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FilterPanel({
  search,
  category,
  fundingStage,
  industry,
  categories,
  fundingStages,
  industries,
  onSearchChange,
  onCategoryChange,
  onFundingChange,
  onIndustryChange,
  onApply,
  onReset,
}: {
  search: string;
  category: string;
  fundingStage: string;
  industry: string;
  categories: string[];
  fundingStages: string[];
  industries: string[];
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onFundingChange: (v: string) => void;
  onIndustryChange: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="sticky top-20 z-30 mt-10 overflow-hidden rounded-2xl border border-[#F59E42]/8 bg-white/95 px-5 py-4 shadow-[0_8px_30px_-12px_rgba(45,27,27,0.08)] backdrop-blur-sm md:px-6"
    >
      {/* Search row */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B0A8A4]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onApply()}
          placeholder="Search startups, keywords, industries..."
          className="w-full rounded-xl border border-[#E8E0D8] bg-[#FAFAFA] py-2.5 pl-10 pr-3 text-sm text-[#2D1B1B] outline-none transition-all focus:border-[#F59E42]/40 focus:ring-2 focus:ring-[#F59E42]/15"
        />
      </div>

      {/* Filters row */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
        <div className="flex flex-1 flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-2.5">
          <FilterSelect label="Category" value={category} options={categories} onChange={onCategoryChange} />
          <FilterSelect label="Funding Stage" value={fundingStage} options={fundingStages} onChange={onFundingChange} />
          <FilterSelect label="Industry" value={industry} options={industries} onChange={onIndustryChange} />
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-[#E8E0D8] bg-white px-4 py-2.5 text-xs font-semibold text-[#6C5E5B] transition-all duration-300 hover:border-[#F59E42]/30 hover:bg-[#FFF4E8] hover:text-[#F59E42]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(245,158,66,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(245,158,66,0.55)]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-1 flex-col min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6C5E5B] min-[480px]:w-[85px] min-[480px]:shrink-0 min-[480px]:text-right">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-[#E8E0D8] bg-[#FAFAFA] px-3 py-2.5 pr-7 text-sm text-[#2D1B1B] outline-none transition-all focus:border-[#F59E42]/40 focus:ring-2 focus:ring-[#F59E42]/15"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

const DirectoryGrid = React.forwardRef<HTMLDivElement, {
  startups: StartupItem[];
  total: number;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}>(function DirectoryGrid({ startups, total, sort, onSortChange }, ref) {
  return (
    <motion.div ref={ref} {...fadeUp} className="mt-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-[800] text-[#2D1B1B]">All Startups</h2>
          <p className="mt-1 text-sm text-[#6C5E5B]">
            Showing {total} startup{total !== 1 ? "s" : ""}
          </p>
        </div>

        <label className="flex items-center gap-2">
          <span className="text-sm text-[#6C5E5B]">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-full border border-[#E8E0D8] bg-white px-4 py-2 text-sm font-medium text-[#2D1B1B] outline-none focus:border-[#F59E42]/40"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {startups.length === 0 ? (
        <div className="mt-8 rounded-[24px] bg-white p-12 text-center text-sm text-[#6C5E5B] shadow-sm">
          No startups match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {startups.map((startup, index) => (
            <StartupGridCard key={startup.id} startup={startup} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
});

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E`;

function StartupGridCard({ startup, index }: { startup: StartupItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="pc-scene"
    >
      <div className="pc-inner">

        {/* ═══════════ FRONT FACE ═══════════ */}
        <div className="pc-face relative flex flex-col">

          {/* ── Top-left: SINE Incubatee capsule ── */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block rounded-full bg-gradient-to-r from-[#FFECD2] to-[#FCE2C4] px-3 py-[4px] text-[9px] font-semibold tracking-wide text-[#E07B1A]">
              SINE Incubatee
            </span>
          </div>

          {/* ── Top-right: 3×3 dot grid ── */}
          <div className="absolute top-4 right-4 z-10 grid grid-cols-3 gap-[4px]">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="block h-[2.5px] w-[2.5px] rounded-full bg-[#F68B1F]/25" />
            ))}
          </div>

          {/* ── Center: logo + name + description ── */}
          <div className="flex flex-1 flex-col items-center justify-center px-5 pt-12 pb-10 z-10">
            {startup.logo ? (
              <img
                src={startup.logo}
                alt={startup.name}
                className="pc-logo-img max-w-[160px] max-h-[80px] object-contain"
              />
            ) : (
              <div className="pc-logo-img flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-gradient-to-br from-[#F68B1F] to-[#FFB45B] text-white text-2xl font-black shadow-md">
                {startup.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <h3 className="mt-3 text-center text-[14px] font-bold leading-snug text-[#222] max-w-[220px] line-clamp-2">
              {startup.name}
            </h3>

            <p className="mt-1.5 text-center text-[10px] font-medium text-[#999] leading-relaxed max-w-[200px] line-clamp-2">
              {startup.description}
            </p>
          </div>

          {/* ── Bottom-center: small orange indicator line ── */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
            <div className="h-[2.5px] w-6 rounded-full bg-[#F68B1F]" />
          </div>

          <CardWave />
        </div>

        {/* ═══ BACK FACE ═══ */}
        <div className="pc-face pc-back relative flex flex-col">

          {/* Right-side wave (Background) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[120px] overflow-hidden rounded-r-[28px] z-0">
            <svg viewBox="0 0 100 200" className="absolute right-0 top-0 h-full w-full" preserveAspectRatio="none">
              <path d="M100,0 L100,200 L65,200 C70,160 60,130 72,100 C84,70 65,40 72,0 Z" fill="#F68B1F" fillOpacity="0.04" />
              <path d="M100,50 L100,200 L74,200 C78,170 70,145 80,125 C90,105 75,80 82,50 Z" fill="#F68B1F" fillOpacity="0.08" />
              <path d="M100,110 L100,200 L82,200 C84,185 80,170 88,155 C96,140 86,125 90,110 Z" fill="#F68B1F" fillOpacity="0.2" />
            </svg>
          </div>

          {/* Content (Scrollable if needed) */}
          <div className="flex flex-col flex-1 p-5 z-10 overflow-y-auto scrollbar-hide">
            
            {/* Header */}
            <h4 className="text-[14px] font-bold text-[#222] text-center mb-1">STARTUP DETAILS</h4>
            <div className="mx-auto h-[2px] w-8 rounded-full bg-[#F68B1F] mb-4" />

            {/* Row: Founder(s) */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <User className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Founder(s)</p>
                <p className="text-[11px] text-[#222] font-bold leading-tight">{startup.name} Founders</p>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: Incubator */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <Building className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Incubator</p>
                <p className="text-[11px] text-[#222] font-bold leading-tight">SINE Incubatee</p>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: Sector */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <Rocket className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Sector</p>
                <p className="text-[11px] text-[#222] font-bold leading-tight">{startup.industry}</p>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: Year of Incubation */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <Calendar className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Year of Incubation</p>
                <p className="text-[11px] text-[#222] font-bold leading-tight">{startup.founded}</p>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: Location */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <MapPin className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Location</p>
                <p className="text-[11px] text-[#222] font-bold leading-tight">India</p>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: Website */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <Globe className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">Website</p>
                <a
                  href={startup.website || `https://www.google.com/search?q=${encodeURIComponent(startup.name + ' startup')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#F68B1F] font-bold leading-tight hover:underline"
                >
                  Visit Link
                </a>
              </div>
            </div>
            <div className="my-2.5 h-px w-full bg-[#F5E4D3]" />

            {/* Row: About */}
            <div className="flex items-start gap-2.5 pb-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFECD2]">
                <Info className="h-3 w-3 text-[#F68B1F]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#999] font-medium leading-none mb-1">About</p>
                <p className="text-[10.5px] text-[#444] font-medium leading-[1.5] pr-1">
                  {startup.description}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.article>
  );
}

/** Layered orange wave decoration for the front-face bottom-right corner */
const CardWave = () => (
  <div className="pointer-events-none absolute bottom-0 right-0 h-[130px] w-[130px] overflow-hidden rounded-br-[28px]">
    <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 h-full w-full" preserveAspectRatio="none">
      <path d="M100,10 C55,20 20,55 5,100 L100,100 Z" fill="#F68B1F" fillOpacity="0.1" />
      <path d="M100,38 C68,44 38,66 22,100 L100,100 Z" fill="#FFB45B" fillOpacity="0.25" />
      <path d="M100,62 C84,70 65,84 50,100 L100,100 Z" fill="#F68B1F" fillOpacity="0.7" />
    </svg>
  </div>
);

function Pagination({
  page,
  totalPages,
  pageNumbers,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const visiblePages = pageNumbers.length <= 5 ? pageNumbers : pageNumbers.slice(0, 5);

  return (
    <motion.div {...fadeUp} className="mt-12 flex items-center justify-center gap-2">
      <PaginationButton onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
      </PaginationButton>

      {visiblePages.map((p) => (
        <PaginationButton key={p} active={page === p} onClick={() => onPageChange(p)}>
          {p}
        </PaginationButton>
      ))}

      <PaginationButton onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        <ChevronRight className="h-4 w-4" />
      </PaginationButton>
    </motion.div>
  );
}

function PaginationButton({
  children,
  onClick,
  active,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-10 min-w-10 items-center justify-center rounded-xl text-sm font-semibold shadow-sm transition-all duration-300",
        active
          ? "bg-[#F59E42] text-white shadow-[0_8px_20px_-8px_rgba(245,158,66,0.5)]"
          : "bg-white text-[#2D1B1B] hover:bg-[#FFF4E8]",
        disabled && "cursor-not-allowed opacity-40 hover:bg-white",
      )}
    >
      {children}
    </button>
  );
}
