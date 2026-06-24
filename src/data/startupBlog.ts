import { resolveLegacyAsset } from "@/lib/assets";

const [ahubImg, collaborativeImg, conferenceHallImg, iotLabsImg] = [
  "/src/assets/infastructure/ahub.jpg",
  "/src/assets/infastructure/collabrative environment.png",
  "/src/assets/infastructure/confenrce hall.jpg",
  "/src/assets/infastructure/iot labs.jpeg",
].map(resolveLegacyAsset);

export type BlogPost = {
  id: string;
  title: string;
  readTime: string;
  image: string;
  description?: string;
  imagePosition?: string;
};

export type TimelineStep = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imagePosition?: string;
};

export const blogImages = {
  hero: ahubImg,
  collaborative: collaborativeImg,
  conference: conferenceHallImg,
  labs: iotLabsImg,
  workspace: collaborativeImg,
  auditorium: conferenceHallImg,
};

export const featuredPosts: BlogPost[] = [
  {
    id: "funding-strategies",
    title: "Startup Funding Strategies",
    readTime: "5 min read",
    image: conferenceHallImg,
    imagePosition: "center",
  },
  {
    id: "building-mvp",
    title: "Building an MVP",
    readTime: "6 min read",
    image: iotLabsImg,
    imagePosition: "center",
  },
  {
    id: "product-market-fit",
    title: "Finding Product-Market Fit",
    readTime: "8 min read",
    image: collaborativeImg,
    imagePosition: "center top",
  },
  {
    id: "pitching-investors",
    title: "Pitching to Investors",
    readTime: "7 min read",
    image: ahubImg,
    imagePosition: "center",
  },
];

export const wideFeaturedPosts: BlogPost[] = [
  {
    id: "scaling-startups",
    title: "Scaling Startups Successfully",
    description: "Operational playbooks for founders moving from early traction to sustainable growth inside the ecosystem.",
    readTime: "10 min read",
    image: ahubImg,
    imagePosition: "center",
  },
  {
    id: "legal-compliance",
    title: "Legal & Compliance Guide for Founders",
    description: "Essential frameworks for incorporation, contracts, IP protection, and regulatory readiness at every stage.",
    readTime: "9 min read",
    image: conferenceHallImg,
    imagePosition: "center",
  },
];

export const journeyTimeline: TimelineStep[] = [
  {
    id: "idea",
    title: "Idea Validation",
    description: "Founders refine problems, test assumptions, and validate demand with mentors and early users.",
    date: "Jan 2024",
    image: collaborativeImg,
    imagePosition: "center",
  },
  {
    id: "research",
    title: "Market Research",
    description: "Teams analyze markets, competitors, and customer insights to shape a focused product direction.",
    date: "Mar 2024",
    image: iotLabsImg,
    imagePosition: "center",
  },
  {
    id: "product",
    title: "Product Development",
    description: "Startups build MVPs, iterate quickly, and leverage AHUB labs and workspace to ship faster.",
    date: "Jun 2024",
    image: ahubImg,
    imagePosition: "center",
  },
  {
    id: "growth",
    title: "Growth & Funding",
    description: "Founders scale traction, engage investors, and access demo days and capital pathways.",
    date: "Sep 2024",
    image: conferenceHallImg,
    imagePosition: "center",
  },
];
