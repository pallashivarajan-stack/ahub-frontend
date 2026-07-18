import ahubImg from "@/assets/infastructure/ahub.jpg";
import collaborativeImg from "@/assets/infastructure/collabrative environment.png";
import conferenceHallImg from "@/assets/infastructure/confenrce hall.jpg";
import iotLabsImg from "@/assets/infastructure/iot labs.jpeg";
import { Banknote, Cpu, Target, Presentation, TrendingUp, Scale, Lightbulb, BarChart2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BlogPost = {
  id: string;
  title: string;
  readTime: string;
  image: string;
  description?: string;
  imagePosition?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
};

export type TimelineStep = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imagePosition?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
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
    icon: Banknote,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: "building-mvp",
    title: "Building an MVP",
    readTime: "6 min read",
    image: iotLabsImg,
    imagePosition: "center",
    icon: Cpu,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "product-market-fit",
    title: "Finding Product-Market Fit",
    readTime: "8 min read",
    image: collaborativeImg,
    imagePosition: "center top",
    icon: Target,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: "pitching-investors",
    title: "Pitching to Investors",
    readTime: "7 min read",
    image: ahubImg,
    imagePosition: "center",
    icon: Presentation,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
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
    icon: TrendingUp,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  {
    id: "legal-compliance",
    title: "Legal & Compliance Guide for Founders",
    description: "Essential frameworks for incorporation, contracts, IP protection, and regulatory readiness at every stage.",
    readTime: "9 min read",
    image: conferenceHallImg,
    imagePosition: "center",
    icon: Scale,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
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
    icon: Lightbulb,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    id: "research",
    title: "Market Research",
    description: "Teams analyze markets, competitors, and customer insights to shape a focused product direction.",
    date: "Mar 2024",
    image: iotLabsImg,
    imagePosition: "center",
    icon: BarChart2,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    id: "product",
    title: "Product Development",
    description: "Startups build MVPs, iterate quickly, and leverage AHUB labs and workspace to ship faster.",
    date: "Jun 2024",
    image: ahubImg,
    imagePosition: "center",
    icon: Cpu,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    id: "growth",
    title: "Growth & Funding",
    description: "Founders scale traction, engage investors, and access demo days and capital pathways.",
    date: "Sep 2024",
    image: conferenceHallImg,
    imagePosition: "center",
    icon: Rocket,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
];
