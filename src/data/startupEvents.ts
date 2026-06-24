import { resolveLegacyAsset } from "@/lib/assets";

export type RedesignedEventSpeaker = {
  name: string;
  role: string;
  avatar: string;
};

export type RedesignedEvent = {
  id: string;
  title: string;
  image: string;
  logo?: string;
  date: {
    month: string;
    day: string;
    year: string;
  };
  type: string;
  category: "workshops" | "webinars" | "hackathons" | "networking" | "pitch sessions" | "demo days" | "all";
  location: string;
  time: string;
  description: string;
  status: "Upcoming" | "Live" | "Completed";
  speakers?: RedesignedEventSpeaker[];
  detailedDescription?: string;
};

export const EVENTS_DATA: RedesignedEvent[] = [
  {
    id: "google-ux-2025",
    title: "Google UX Design Internship Info Session",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600",
    logo: "google",
    date: { month: "JUN", day: "12", year: "2025" },
    type: "Info Session",
    category: "workshops",
    location: "Online",
    time: "2:00 PM - 3:30 PM",
    description: "Join Google's design team to learn about the UX Design internship program, projects, and application process.",
    status: "Upcoming",
    speakers: [
      { name: "Sarah Chen", role: "Principal UX Designer, Google", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
      { name: "Marcus Reed", role: "Design Recruiter, Google", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" }
    ],
    detailedDescription: "Interested in UX design careers at Google? Learn directly from active designers about the day-to-day internship experience, portfolio expectations, assessment criteria, and application timelines. Bring your design portfolio questions for the Q&A session!"
  },
  {
    id: "microsoft-engage-2025",
    title: "Microsoft Engage Internship Webinar",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    logo: "microsoft",
    date: { month: "JUN", day: "15", year: "2025" },
    type: "Webinar",
    category: "webinars",
    location: "Online",
    time: "4:00 PM - 5:30 PM",
    description: "Explore Microsoft's internship opportunities and how you can make an impact through technology.",
    status: "Upcoming",
    speakers: [
      { name: "Ananya Rao", role: "Senior Software Engineer, Microsoft", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150" }
    ],
    detailedDescription: "Discover engineering paths at Microsoft. This session covers the structure of the Microsoft Engage mentorship program, project development standards, tech stack expectations, and keys to transition from intern to full-time engineer."
  },
  {
    id: "adobe-design-2025",
    title: "Adobe Design Internship Workshop",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    logo: "adobe",
    date: { month: "JUN", day: "18", year: "2025" },
    type: "Workshop",
    category: "workshops",
    location: "Bangalore, India",
    time: "11:00 AM - 1:00 PM",
    description: "Hands-on workshop on product design, portfolios, and preparing for Adobe internship interviews.",
    status: "Upcoming",
    speakers: [
      { name: "Vikram Malhotra", role: "Creative Director, Adobe", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" }
    ],
    detailedDescription: "Get hand-on insights on what makes a product design portfolio stand out at Adobe. Participants will work through mock product briefs, receive feedback on layout systems, and understand the core behavioral aspects Adobe evaluates."
  },
  {
    id: "startup-pitch-2025",
    title: "Startup Pitch & Networking Night",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600",
    logo: "rocket",
    date: { month: "JUN", day: "20", year: "2025" },
    type: "Networking",
    category: "networking",
    location: "Hyderabad, India",
    time: "6:00 PM - 9:00 PM",
    description: "Meet founders, investors, and innovators. Pitch your ideas and build meaningful connections.",
    status: "Upcoming",
    speakers: [
      { name: "Suresh Reddy", role: "Partner, AUIC Seed Fund", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" }
    ],
    detailedDescription: "A fast-paced, high-energy networking night for early-stage builders. Share what you're working on in our 60-second open mic segment, connect with developers, and meet early-stage angel syndicates looking for technical co-founders."
  },
  {
    id: "ai-ml-journey-2025",
    title: "AI/ML Career Journey for Founders",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600",
    logo: "lightbulb",
    date: { month: "JUN", day: "22", year: "2025" },
    type: "Panel Discussion",
    category: "demo days",
    location: "Online",
    time: "5:00 PM - 6:30 PM",
    description: "Panel discussion with AI founders on building, scaling, and leveraging AI in startups.",
    status: "Upcoming",
    speakers: [
      { name: "Dr. Elena Rostov", role: "Founder, Neurons AI", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150" },
      { name: "Rahul Sharma", role: "CTO, AgroMind", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150" }
    ],
    detailedDescription: "Navigating the current AI/ML paradigm is crucial for early founders. Join this panel discussion to learn about choosing LLM providers, structuring model finetuning pipelines, cost optimization in production, and pitching AI startups to savvy VCs."
  },
  {
    id: "hackap-agritech-2025",
    title: "Agritech Hackathon Vizag",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600",
    logo: "trophy",
    date: { month: "JUL", day: "05", year: "2025" },
    type: "Hackathon",
    category: "hackathons",
    location: "AHub Incubation Center, Vizag",
    time: "All Day Event",
    description: "Build innovative software and hardware solutions to tackle agricultural problems in India.",
    status: "Upcoming",
    speakers: [
      { name: "Nitin Gadkari", role: "Ecosystem Lead, AHub", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" }
    ],
    detailedDescription: "A 48-hour prototype marathon solving core supply chain, crop health, irrigation, and pricing issues for farmers. Team sizes up to 4. Winners receive cash prizes, technical cloud credits, and direct fast-track evaluation into AHub pre-incubation."
  },
  {
    id: "vc-speed-dating-2025",
    title: "Venture Capital Seed Pitches",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600",
    logo: "handshake",
    date: { month: "JUN", day: "25", year: "2025" },
    type: "Pitch Sessions",
    category: "pitch sessions",
    location: "AHub Boardroom",
    time: "2:00 PM - 6:00 PM",
    description: "Selected pre-seed and seed startups pitch directly to leading Indian venture capitalists.",
    status: "Live",
    speakers: [
      { name: "Priya Nair", role: "Managing Director, Peak Capital", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" }
    ],
    detailedDescription: "A private seed funding intake session. Pre-screened startups get 10 minutes of uninterrupted pitch time and 10 minutes of direct, constructive feedback from participating early-stage fund representatives. RSVP essential."
  },
  {
    id: "founder-pmf-2025",
    title: "Founder Roundtable: Reaching PMF",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
    logo: "users",
    date: { month: "MAY", day: "10", year: "2025" },
    type: "Roundtable",
    category: "workshops",
    location: "Online",
    time: "3:00 PM - 4:30 PM",
    description: "Candid case studies on customer discovery and moving from pivot to scale.",
    status: "Completed",
    speakers: [
      { name: "Arjun Verma", role: "Founder, TrackFast (YC S23)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" }
    ],
    detailedDescription: "Review the honest journeys of founders who pivoted multiple times before hitting product-market fit. Understand metrics tracking, customer interview templates, and the signal thresholds that define true startup traction."
  }
];
