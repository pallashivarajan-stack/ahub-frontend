import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, Calendar, Search, TrendingUp } from "lucide-react";
import {
  featuredFundingStartups,
  filterFundingStartups,
  fundingHighlights,
  fundingStartups,
  fundingStatusStyle,
  fundingStatuses,
} from "@/data/startupFunding";
import { usePublicStartupFunding } from "@/services/usePublicContent";
import { categories, fundingBadgeStyle } from "@/data/startupPortfolio";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function StartupFundingPage() {
  const fundingFallback = { fundingHighlights, featuredFundingStartups, fundingStartups, fundingStatuses };
  const { data: fundingData } = usePublicStartupFunding(fundingFallback);
  const displayData = fundingData ?? fundingFallback;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [applied, setApplied] = useState({ search: "", status: "All", category: "All" });

  const filtered = useMemo(
    () => filterFundingStartups(displayData.fundingStartups, applied),
    [applied, displayData.fundingStartups],
  );

  const applyFilters = () => setApplied({ search, status, category });
  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCategory("All");
    setApplied({ search: "", status: "All", category: "All" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FDF8F2] pb-24 pt-28 md:pb-32 md:pt-32 lg:pt-36">
      <BackgroundDecor />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <FundingHeader highlights={displayData.fundingHighlights} />
        <FeaturedGrid highlights={displayData.fundingHighlights} featured={displayData.featuredFundingStartups} />
        <FilterSection
          statuses={displayData.fundingStatuses}
          search={search}
          status={status}
          category={category}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCategoryChange={setCategory}
          onApply={applyFilters}
          onReset={resetFilters}
        />
        <FundedStartupsList startups={filtered} />
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
    </div>
  );
}

function FundingHeader({ highlights }: { highlights: typeof fundingHighlights }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E42]/30 bg-[#FFF8F3] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E42]">
        <Banknote className="h-3.5 w-3.5" />
        Startup Funding
      </div>

      <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.05] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[64px]">
        Startup Funding
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6C5E5B] md:text-base">
        Explore funding pathways, investor access, and startups building momentum inside the AHUB ecosystem.
      </p>

      <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E42]" />
    </motion.div>
  );
}

function FeaturedGrid({ highlights, featured }: { highlights: typeof fundingHighlights; featured: typeof featuredFundingStartups }) {
  return (
    <motion.div {...fadeUp} className="mt-14 lg:mt-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-[800] text-[#2D1B1B] md:text-3xl">Funding Pathways</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6C5E5B] md:text-[15px]">
          Structured capital support designed to help founders move from validation to scale with confidence.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(245,158,66,0.18)]"
          >
            <div className="flex h-44 items-center justify-center bg-[#FFF4E8] p-6">
              <img src={item.image} alt="" className="max-h-24 max-w-[160px] object-contain opacity-90 transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="inline-flex w-fit rounded-full bg-[#FFF4E8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#F59E42]">
                {item.tag}
              </span>
              <h3 className="mt-3 text-lg font-[800] text-[#2D1B1B]">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6C5E5B]">{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-[#F59E42]/10 bg-white/80 p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#F59E42]" />
          <h3 className="text-lg font-[800] text-[#2D1B1B]">Recently Funded Startups</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFundingStartups.map((startup) => (
            <div
              key={startup.id}
              className="flex items-center gap-4 rounded-[20px] border border-[#F5F0EB] bg-[#FAFAFA] p-4 transition-colors hover:border-[#F59E42]/20 hover:bg-[#FFF8F3]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-white p-2 shadow-sm">
                <img src={startup.logo} alt={startup.name} className="max-h-10 max-w-10 object-contain" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-[800] text-[#2D1B1B]">{startup.name}</p>
                <p className="mt-0.5 text-xs text-[#F59E42]">{startup.fundingAmount} raised</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FilterSection({
  statuses,
  search,
  status,
  category,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onApply,
  onReset,
}: {
  statuses: string[];
  search: string;
  status: string;
  category: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="mt-16 rounded-[32px] border border-[#F59E42]/8 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.1)] md:p-10"
    >
      <div className="text-center">
        <h2 className="text-xl font-[800] text-[#2D1B1B] md:text-2xl">Search & Filter Startups</h2>
        <p className="mt-2 text-sm text-[#6C5E5B]">Search startups, founders, categories, and funding status.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6C5E5B]">Search</span>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B0A8A4]" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onApply()}
              placeholder="Search startups, founders, categories..."
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#FAFAFA] py-3.5 pl-11 pr-4 text-sm text-[#2D1B1B] outline-none transition-all focus:border-[#F59E42]/40 focus:ring-2 focus:ring-[#F59E42]/15"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6C5E5B]">Filter</span>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#2D1B1B] outline-none focus:border-[#F59E42]/40"
            >
              {statuses.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All" ? "All Status" : opt}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#2D1B1B] outline-none focus:border-[#F59E42]/40"
            >
              {categories.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border-2 border-[#F59E42] bg-white px-6 py-2.5 text-sm font-semibold text-[#F59E42] transition-all hover:bg-[#FFF4E8]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onApply}
          className="rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42] px-8 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(245,158,66,0.55)] transition-all hover:-translate-y-0.5"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
}

function FundedStartupsList({ startups }: { startups: typeof fundingStartups }) {
  return (
    <motion.div {...fadeUp} className="mt-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-[800] text-[#2D1B1B] md:text-3xl">Funded Startups</h2>
        <p className="mt-2 text-sm text-[#6C5E5B]">
          A curated selection of AHUB startups with active funding journeys — not the full portfolio directory.
        </p>
        <p className="mt-1 text-xs text-[#B0A8A4]">
          Showing {startups.length} startup{startups.length !== 1 ? "s" : ""}
        </p>
      </div>

      {startups.length === 0 ? (
        <div className="rounded-[24px] bg-white p-12 text-center text-sm text-[#6C5E5B] shadow-sm">
          No startups match your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {startups.map((startup, index) => (
            <FundingListCard key={startup.id} startup={startup} index={index} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          to="/startups/startup-portfolio"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-[#F59E42] bg-white px-6 py-3 text-sm font-semibold text-[#F59E42] transition-all hover:bg-[#F59E42] hover:text-white"
        >
          View Full Startup Portfolio
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function FundingListCard({
  startup,
  index,
}: {
  startup: (typeof fundingStartups)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col gap-5 rounded-[24px] bg-white p-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(245,158,66,0.15)] sm:flex-row sm:items-center sm:p-6"
    >
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[20px] bg-[#FFF4E8] p-3 sm:h-28 sm:w-28">
        <img src={startup.logo} alt={startup.name} className="max-h-16 max-w-16 object-contain" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-[800] text-[#2D1B1B]">{startup.name}</h3>
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", fundingStatusStyle(startup.fundingStatus))}>
            {startup.fundingStatus}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#6C5E5B]">
          <span className={cn("rounded-full px-2 py-0.5 font-bold uppercase", fundingBadgeStyle(startup.fundingStage))}>
            {startup.fundingStage}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#F59E42]" />
            {startup.founded}
          </span>
          <span className="font-semibold text-[#F59E42]">{startup.fundingAmount}</span>
          <span>{startup.industry}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#6C5E5B]">{startup.description}</p>

        <button
          type="button"
          className="mt-4 rounded-full border-2 border-[#F59E42] bg-white px-5 py-2 text-xs font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
}
