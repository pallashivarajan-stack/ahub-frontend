import {
  filterStartups,
  startupDirectory,
  type StartupItem,
} from "@/data/startupPortfolio";

export type FundingHighlight = {
  id: string;
  title: string;
  body: string;
  image: string;
  tag: string;
};

export type FundedStartup = StartupItem & {
  fundingAmount: string;
  fundingStatus: "Funded" | "Raising" | "Eligible";
};

const curatedIds = [
  "interview-buddy",
  "greenjams",
  "sandlogic",
  "sweya",
  "return-trucks",
  "joora",
  "digiotai",
  "icompass",
  "agri-dna",
  "antar-iot",
  "talentspotify",
  "vyomastra",
];

const fundingMeta: Record<string, { fundingAmount: string; fundingStatus: FundedStartup["fundingStatus"] }> = {
  "interview-buddy": { fundingAmount: "₹1.2 Cr", fundingStatus: "Funded" },
  greenjams: { fundingAmount: "₹50 L", fundingStatus: "Funded" },
  sandlogic: { fundingAmount: "₹8 Cr", fundingStatus: "Funded" },
  sweya: { fundingAmount: "₹75 L", fundingStatus: "Raising" },
  "return-trucks": { fundingAmount: "₹1 Cr", fundingStatus: "Funded" },
  joora: { fundingAmount: "₹60 L", fundingStatus: "Funded" },
  digiotai: { fundingAmount: "₹40 L", fundingStatus: "Raising" },
  icompass: { fundingAmount: "₹25 L", fundingStatus: "Eligible" },
  "agri-dna": { fundingAmount: "₹30 L", fundingStatus: "Raising" },
  "antar-iot": { fundingAmount: "₹55 L", fundingStatus: "Funded" },
  talentspotify: { fundingAmount: "₹90 L", fundingStatus: "Funded" },
  vyomastra: { fundingAmount: "₹1.5 Cr", fundingStatus: "Raising" },
};

function toFundedStartup(startup: StartupItem): FundedStartup {
  const meta = fundingMeta[startup.id] ?? { fundingAmount: "—", fundingStatus: "Eligible" as const };
  return { ...startup, ...meta };
}

export const fundingStartups: FundedStartup[] = startupDirectory
  .filter((s) => curatedIds.includes(s.id))
  .map(toFundedStartup);

export const featuredFundingStartups = fundingStartups.slice(0, 6);

export const fundingHighlights: FundingHighlight[] = [
  {
    id: "seed",
    title: "Seed Capital Access",
    body: "Early-stage capital for validated founders building product-market fit with institutional support.",
    image: "",
    tag: "Seed",
  },
  {
    id: "angel",
    title: "Angel Investor Network",
    body: "Warm introductions to AHUB's angel circle, syndicates, and operator-backed investors.",
    image: "",
    tag: "Angels",
  },
  {
    id: "grants",
    title: "Grant & Scheme Support",
    body: "Guidance on government grants, innovation schemes, and non-dilutive funding pathways.",
    image: "",
    tag: "Grants",
  },
  {
    id: "demo",
    title: "Demo Day Visibility",
    body: "Showcase traction to investors during cohort demo days and ecosystem pitch sessions.",
    image: "",
    tag: "Demo Day",
  },
  {
    id: "matching",
    title: "Investor Matching",
    body: "Curated matching with venture partners aligned to sector, stage, and founder ambition.",
    image: "",
    tag: "Matching",
  },
  {
    id: "followon",
    title: "Follow-on Pathways",
    body: "Support for Series A readiness, due diligence prep, and strategic capital conversations.",
    image: "",
    tag: "Growth",
  },
];

export const fundingStatuses = ["All", "Funded", "Raising", "Eligible"];

export function filterFundingStartups(
  startups: FundedStartup[],
  { search, status, category }: { search: string; status: string; category: string },
) {
  const base = filterStartups(startups, {
    search,
    category,
    fundingStage: "All",
    industry: "All",
    sort: "popular",
  }) as FundedStartup[];

  if (status === "All") return base;
  return base.filter((s) => s.fundingStatus === status);
}

export function fundingStatusStyle(status: FundedStartup["fundingStatus"]) {
  switch (status) {
    case "Funded":
      return "bg-[#DCFCE7] text-[#166534]";
    case "Raising":
      return "bg-[#FFF4E8] text-[#B45309]";
    case "Eligible":
      return "bg-[#DBEAFE] text-[#1E40AF]";
  }
}
