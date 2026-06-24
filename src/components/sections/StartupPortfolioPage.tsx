import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Globe, Rocket, Search } from "lucide-react";
import {
  categories,
  filterStartups,
  fundingBadgeStyle,
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

  const applyFilters = () => {
    setApplied({ search, category, fundingStage, industry });
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
    <section className="relative isolate overflow-hidden bg-[#FDF8F2] pb-24 pt-28 md:pb-32 md:pt-32 lg:pt-36">
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
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onFundingChange={setFundingStage}
          onIndustryChange={setIndustry}
          onApply={applyFilters}
          onReset={resetFilters}
        />
        <DirectoryGrid startups={paginated} total={filtered.length} sort={sort} onSortChange={setSort} />
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
      <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/30 bg-[#FFF8F3] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42]">
        <Rocket className="h-3.5 w-3.5" />
        Startup Portfolio
      </div>

      <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.05] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[72px]">
        Startup Portfolio
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6C5E5B] md:text-base">
        Discover successful startups and explore innovative companies.
      </p>

      <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
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
      className="relative mt-14 overflow-hidden rounded-[32px] border border-[#F59E42]/8 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.1)] md:p-10"
    >
      <div className="pointer-events-none absolute -bottom-4 -left-2 opacity-[0.07]">
        <Rocket className="h-24 w-24 text-[#F59E42]" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-[800] text-[#2D1B1B] md:text-2xl">Search & Filter Startups</h2>
        <p className="mt-2 text-sm text-[#6C5E5B]">Find startups by name, industry, or category.</p>
      </div>

      <div className="relative mt-8 grid gap-4 md:grid-cols-2">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B0A8A4]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onApply()}
            placeholder="Search startups, keywords, industries..."
            className="w-full rounded-2xl border border-[#E8E0D8] bg-[#FAFAFA] py-3.5 pl-11 pr-4 text-sm text-[#2D1B1B] outline-none transition-all focus:border-[#F59E42]/40 focus:ring-2 focus:ring-[#F59E42]/15"
          />
        </div>

        <FilterSelect label="Category" value={category} options={categories} onChange={onCategoryChange} />
        <FilterSelect label="Funding Stage" value={fundingStage} options={fundingStages} onChange={onFundingChange} />
        <FilterSelect label="Industry" value={industry} options={industries} onChange={onIndustryChange} className="md:col-span-2 md:max-w-sm md:justify-self-center" />
      </div>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border-2 border-[#F59E42] bg-white px-6 py-2.5 text-sm font-semibold text-[#F59E42] transition-all duration-300 hover:bg-[#FFF4E8]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onApply}
          className="rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-8 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(245,158,66,0.65)]"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6C5E5B]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-[#E8E0D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#2D1B1B] outline-none transition-all focus:border-[#F59E42]/40 focus:ring-2 focus:ring-[#F59E42]/15"
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

function DirectoryGrid({
  startups,
  total,
  sort,
  onSortChange,
}: {
  startups: StartupItem[];
  total: number;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}) {
  return (
    <motion.div {...fadeUp} className="mt-14">
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
}

function StartupGridCard({ startup, index }: { startup: StartupItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group flex flex-col rounded-[24px] bg-white p-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(245,158,66,0.18)]"
    >
      <div className="flex h-[88px] items-center justify-center">
        <img src={startup.logo} alt={startup.name} className="max-h-[80px] max-w-[140px] object-contain" />
      </div>

      <h3 className="mt-4 text-base font-[800] leading-tight text-[#2D1B1B]">{startup.name}</h3>
      <p className="mt-1 text-xs font-semibold text-[#F59E42]">{startup.industry}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", fundingBadgeStyle(startup.fundingStage))}>
          {startup.fundingStage}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-[#6C5E5B]">
          <Calendar className="h-3 w-3 text-[#F59E42]" />
          {startup.founded}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-[#6C5E5B]">{startup.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-[#F5F0EB] pt-4">
        {startup.website ? (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6C5E5B] transition-colors hover:bg-[#FFF4E8] hover:text-[#F59E42]"
            aria-label={`Visit ${startup.name} website`}
          >
            <Globe className="h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#D4CCC6]">
            <Globe className="h-4 w-4" />
          </span>
        )}

        <button
          type="button"
          className="rounded-full border-2 border-[#F59E42] bg-white px-4 py-1.5 text-xs font-semibold text-[#F59E42] transition-all duration-300 group-hover:bg-[#F59E42] group-hover:text-white"
        >
          View Details
        </button>
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
