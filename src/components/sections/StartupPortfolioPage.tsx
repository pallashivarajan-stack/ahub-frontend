import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Globe, Rocket, Search } from "lucide-react";
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
    <section className="relative isolate overflow-hidden bg-[#FDF8F2] pb-24 pt-20 md:pb-32 md:pt-24">
      <BackgroundDecor />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      style={{ borderRadius: 28 }}
      className="group relative flex flex-col overflow-hidden border border-[#FDEAD4] bg-white shadow-[0_10px_30px_rgba(249,115,22,0.08),0_25px_80px_rgba(249,115,22,0.12)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.015] hover:border-[#FDBA74]/40 hover:shadow-[0_16px_40px_rgba(249,115,22,0.12),0_40px_100px_rgba(249,115,22,0.18)]"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{ backgroundImage: `url("${noiseSvg}")`, backgroundSize: "128px" }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#F97316]/8 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr from-[#FDBA74]/10 to-transparent blur-2xl" />

      {/* Gradient accent top */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F97316]/0 via-[#F97316] to-[#F97316]/0 opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100" />

      {/* ── Image Section ── */}
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[22px] bg-gradient-to-b from-[#FFF7ED] to-[#FFEDD5] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-center px-8 py-9">
          <img
            src={startup.logo}
            alt={startup.name}
            className="max-h-[72px] max-w-[160px] object-contain transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
        {/* Reflection overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/[0.02]" />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col px-5 pb-3 pt-4">
        {/* Top row: name + year */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-[700] leading-snug tracking-tight text-[#111827]">
              {startup.name}
            </h3>
            {/* Industry badge */}
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#FDEAD4] bg-white/80 px-3 py-0.5 text-[10px] font-semibold tracking-wide text-[#F97316] shadow-[0_1px_3px_rgba(249,115,22,0.06)] backdrop-blur-sm">
              {startup.industry}
            </span>
          </div>
          {/* Year glass pill */}
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#FDEAD4] bg-white/70 px-2.5 py-1 text-[11px] font-medium text-[#6B7280] shadow-[0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-[0_0_6px_rgba(249,115,22,0.3)]" />
            {startup.founded}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-3 flex-1 text-xs leading-[1.7] text-[#4B5563]">
          {startup.description}
        </p>

        {/* Gradient divider */}
        <div className="relative mb-2 mt-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/25 to-transparent" />
        </div>

        {/* ── Bottom row ── */}
        <div className="flex items-center justify-between">
          {/* Globe glass button */}
          {startup.website ? (
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FDEAD4] bg-white/70 text-[#F97316] shadow-[0_2px_6px_rgba(249,115,22,0.06)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#FFF7ED] hover:shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
              aria-label={`Visit ${startup.name} website`}
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F0EBE5] bg-gray-50 text-[#D4CCC6]">
              <Globe className="h-3.5 w-3.5" />
            </span>
          )}

          {/* CTA */}
          <button
            type="button"
            className="group/cta inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)]"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

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
