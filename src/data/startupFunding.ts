import { resolveLegacyAsset } from "@/lib/assets";
import { filterStartups, type StartupItem } from "@/data/startupPortfolio";

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

export const fundingStartups: FundedStartup[] = [
  {
    id: "interview-buddy",
    name: "Interview Buddy",
    logo: resolveLegacyAsset("/src/assets/startups/interview buddy.png"),
    category: "EdTech",
    industry: "Education",
    founded: 2021,
    fundingStage: "Seed",
    description: "AI-powered mock interview and placement readiness platform helping students improve career outcomes.",
    website: "https://interviewbuddy.in",
    popularity: 95,
    fundingAmount: "₹1.2 Cr",
    fundingStatus: "Funded",
    addedOrder: 1
  },
  {
    id: "agri-dna",
    name: "Agri DNA",
    logo: resolveLegacyAsset("/src/assets/startups/agri dna.jpg"),
    category: "AgriTech",
    industry: "Agriculture",
    founded: 2021,
    fundingStage: "Pre-Seed",
    description: "Precision agriculture tools using genomics and data to improve crop yield and farmer income.",
    popularity: 68,
    fundingAmount: "₹30 L",
    fundingStatus: "Raising",
    addedOrder: 2
  },
  {
    id: "bizpro",
    name: "BizPro",
    logo: resolveLegacyAsset("/src/assets/startups/bizpro.png"),
    category: "SaaS",
    industry: "Enterprise",
    founded: 2023,
    fundingStage: "Pre-Seed",
    description: "Business operations suite helping SMBs manage workflows, billing, and customer relationships.",
    website: "https://bizproindia.com/",
    popularity: 65,
    fundingAmount: "₹15 L",
    fundingStatus: "Eligible",
    addedOrder: 3
  },
  {
    id: "sweya",
    name: "Sweya",
    logo: resolveLegacyAsset("/src/assets/startups/sweya.png"),
    category: "HealthTech",
    industry: "Healthcare",
    founded: 2021,
    fundingStage: "Seed",
    description: "Digital health platform improving patient outcomes through smart monitoring and care coordination.",
    popularity: 82,
    fundingAmount: "₹75 L",
    fundingStatus: "Raising",
    addedOrder: 4
  },
  {
    id: "eduemblem",
    name: "EduEmblem",
    logo: resolveLegacyAsset("/src/assets/portfolio_companies/eduemblem.png"),
    category: "EdTech",
    industry: "Education",
    founded: 2022,
    fundingStage: "Seed",
    description: "E-learning platform with gamified emblem rewards and skill micro-credentials for K-12 students.",
    popularity: 78,
    fundingAmount: "₹45 L",
    fundingStatus: "Funded",
    addedOrder: 5
  }
];

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
