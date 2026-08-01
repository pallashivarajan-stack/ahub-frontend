import ahubImg from "@/assets/infastructure/ahub.jpg";
import collaborativeImg from "@/assets/infastructure/collabrative environment.png";
import conferenceHallImg from "@/assets/infastructure/confenrce hall.jpg";
import iotLabsImg from "@/assets/infastructure/iot labs.jpeg";
import startupBlogHeroImg from "@/assets/startup blog.png";

import interviewBuddyLogo from "@/assets/portfolio_companies/interview_buddy_logo.png";
import eduemblemLogo from "@/assets/portfolio_companies/eduemblem.png";
import jooraDronesLogo from "@/assets/portfolio_companies/joora_drone_consultants_logo-removebg-preview.png";

import eduemblemFounder from "@/assets/portfolio_companies/eduemblem_founder_varma.jpg";
import interviewBuddyFounder from "@/assets/portfolio_companies/interview_buddy_founder.png";
import jooraDronesFounder from "@/assets/portfolio_companies/sagar_sahit_joora drones.png";


import pitchIcon from "@/assets/icons/pitch_to_us.png";
import teamIcon from "@/assets/icons/team.png";
import impactIcon from "@/assets/icons/impact.png";
import { HandCoins, Box, TrendingUp, Compass, Network, LucideIcon } from "lucide-react";

export type BlogTopic = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StartupJourney = {
  id: string;
  startupName: string;
  logo: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  coverImage: string;
  bgColor: string;
  founderImage: string;
  website: string;
  roadmap: { phase: string; title: string; description: string }[];
};

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  dialogContent?: {
    description: string;
    steps: {
      step: string;
      title: string;
      description: string;
    }[];
  };
};

export const blogTopics: BlogTopic[] = [
  {
    id: "funding",
    title: "Startup Funding",
    description: "Fundraising, investors, and financial strategies",
    icon: HandCoins,
  },
  {
    id: "product",
    title: "Product & Design",
    description: "Building products users love and trust",
    icon: Box, // Using Box instead of Layers3 as requested, or Layers
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    description: "User growth, traction, and go-to-market",
    icon: TrendingUp,
  },
  {
    id: "journey",
    title: "Founder Journey",
    description: "Lessons, mindset, and leadership",
    icon: Compass,
  },
  {
    id: "ecosystem",
    title: "Ecosystem",
    description: "Community, events, and opportunities",
    icon: Network,
  },
];

export const startupJourneys: StartupJourney[] = [
  {
    id: "interviewbuddy",
    startupName: "Interview Buddy",
    logo: interviewBuddyLogo,
    title: "Interview Buddy: Democratizing Interview Prep",
    description: "How Interview Buddy provides expert-led mock interviews to students globally.",
    date: "May 6, 2024",
    readTime: "6 min read",
    coverImage: ahubImg,
    bgColor: "bg-slate-900",
    founderImage: interviewBuddyFounder,
    website: "https://interviewbuddy.net",
    roadmap: [
      { phase: "Q1", title: "Idea Validation", description: "Identified the gap in practical interview prep for students." },
      { phase: "Q2", title: "Platform Launch", description: "Launched the initial version of the video interview platform." },
      { phase: "Q4", title: "Scaling Up", description: "Onboarded hundreds of industry experts as interviewers." }
    ]
  },
  {
    id: "eduemblem",
    startupName: "Eduemblem",
    logo: eduemblemLogo,
    title: "Eduemblem: Shaping the Future of Education",
    description: "Empowering educational institutions with innovative digital solutions.",
    date: "May 2, 2024",
    readTime: "5 min read",
    coverImage: iotLabsImg,
    bgColor: "bg-emerald-900",
    founderImage: eduemblemFounder,
    website: "https://eduemblem.com",
    roadmap: [
      { phase: "Phase 1", title: "Research", description: "Studied the digital transformation needs of local schools." },
      { phase: "Phase 2", title: "Product MVP", description: "Developed the core modules for student management." },
      { phase: "Phase 3", title: "Market Penetration", description: "Expanded to over 50 schools across the region." }
    ]
  },
  {
    id: "jooradrones",
    startupName: "Joora Drones",
    logo: jooraDronesLogo,
    title: "Joora Drones: Precision Aerial Solutions",
    description: "Leading the way in drone consulting and industrial applications.",
    date: "Apr 28, 2024",
    readTime: "5 min read",
    coverImage: collaborativeImg,
    bgColor: "bg-indigo-900",
    founderImage: jooraDronesFounder,
    website: "https://jooradrones.com",
    roadmap: [
      { phase: "Year 1", title: "Prototyping", description: "Built custom drones for agricultural surveying." },
      { phase: "Year 2", title: "Certification", description: "Obtained necessary regulatory approvals for commercial flights." },
      { phase: "Year 3", title: "Enterprise Contracts", description: "Secured major contracts with industrial partners." }
    ]
  },
];

export const latestInsights: Article[] = [
  {
    id: "1",
    title: "Mastering the AHUB Pitch Committee",
    description: "Prepare your startup to confidently present before the AHUB Pitch Committee with clarity, validation, and a compelling story.",
    date: "Aug 15, 2023",
    readTime: "8 min read",
    category: "Fundraising",
    image: pitchIcon,
    dialogContent: {
      description: "Prepare your startup to confidently present before the AHUB Pitch Committee with clarity, validation, and a compelling story.",
      steps: [
        {
          step: "01",
          title: "Build a Clear Story",
          description: "Explain the problem, your solution, and why it matters. Keep your pitch simple, focused, and easy to understand in under two minutes."
        },
        {
          step: "02",
          title: "Show Real Validation",
          description: "Present evidence from customer interviews, market research, early users, prototypes, or pilot programs to prove your startup solves a genuine problem."
        },
        {
          step: "03",
          title: "Pitch with Confidence",
          description: "Practice your presentation, demonstrate your product clearly, answer questions honestly, and communicate your long-term vision with confidence."
        }
      ]
    }
  },
  {
    id: "2",
    title: "Navigating the Incubation Phase",
    description: "Learn how to make the most of your incubation journey by setting goals, leveraging mentorship, and building consistently.",
    date: "Aug 10, 2023",
    readTime: "7 min read",
    category: "Incubation",
    image: teamIcon,
    dialogContent: {
      description: "Learn how to make the most of your incubation journey by setting goals, leveraging mentorship, and building consistently.",
      steps: [
        {
          step: "01",
          title: "Set Clear Milestones",
          description: "Define measurable goals for product development, customer validation, and business growth to stay focused throughout the incubation program."
        },
        {
          step: "02",
          title: "Leverage Mentorship",
          description: "Actively engage with mentors, attend review sessions, and apply feedback to improve your product, business model, and go-to-market strategy."
        },
        {
          step: "03",
          title: "Build, Measure & Improve",
          description: "Launch quickly, collect user feedback, track key metrics, and continuously refine your solution to achieve sustainable startup growth."
        }
      ]
    }
  },
  {
    id: "3",
    title: "Securing Seed Funding at AHUB",
    description: "Understand how to prepare your startup for seed funding by validating your idea, demonstrating traction, and presenting a compelling investment opportunity.",
    date: "Aug 02, 2023",
    readTime: "6 min read",
    category: "Fundraising",
    image: impactIcon,
    dialogContent: {
      description: "Understand how to prepare your startup for seed funding by validating your idea, demonstrating traction, and presenting a compelling investment opportunity.",
      steps: [
        {
          step: "01",
          title: "Validate Before You Raise",
          description: "Build an MVP, gather customer feedback, and demonstrate clear evidence that your solution addresses a real market need before seeking investment."
        },
        {
          step: "02",
          title: "Prepare Your Investment Story",
          description: "Create a concise pitch deck covering the problem, solution, market opportunity, business model, traction, financial projections, and your founding team."
        },
        {
          step: "03",
          title: "Engage with AHUB Investors",
          description: "Participate in mentor reviews, pitch events, and investor meetings at AHUB. Be open to feedback, answer questions confidently, and clearly explain how the funding will accelerate your startup's growth."
        }
      ]
    }
  },
];

export const blogImages = {
  hero: startupBlogHeroImg,
};
