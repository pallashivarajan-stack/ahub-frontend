import { resolveLegacyAsset } from "@/lib/assets";

const [interviewBuddyLogo, edumoonLogo, greenjamsLogo, sandlogicLogo, sweyaLogo, icompassLogo, digiotaiLogo, dataFoundryLogo] = [
  "/src/assets/startups/interview buddy.png",
  "/src/assets/startups/edumoon.png",
  "/src/assets/startups/greenjams_logo.jpg",
  "/src/assets/startups/sandlogic.png",
  "/src/assets/startups/sweya.png",
  "/src/assets/startups/icompass.png",
  "/src/assets/startups/digiotai.jpg",
  "/src/assets/startups/data foundary.png",
].map(resolveLegacyAsset);

export type EventType = "application" | "assessment" | "interview" | "offer" | "deadline";

export type InternshipCompany = {
  id: string;
  name: string;
  logo: string;
  role: string;
  duration: string;
};

export type CalendarEvent = {
  id: string;
  companyId: string;
  title: string;
  type: EventType;
  date: string;
  time?: string;
  status: "upcoming" | "completed" | "in-progress";
  description?: string;
};

export const companies: Record<string, InternshipCompany> = {
  "interview-buddy": {
    id: "interview-buddy",
    name: "Interview Buddy",
    logo: interviewBuddyLogo,
    role: "Product Design Intern",
    duration: "Jun – Aug 2025",
  },
  sandlogic: {
    id: "sandlogic",
    name: "SandLogic",
    logo: sandlogicLogo,
    role: "AI Engineering Intern",
    duration: "Jul – Sep 2025",
  },
  edumoon: {
    id: "edumoon",
    name: "Edumoon",
    logo: edumoonLogo,
    role: "Community Design Intern",
    duration: "Jun – Aug 2025",
  },
  greenjams: {
    id: "greenjams",
    name: "GreenJams",
    logo: greenjamsLogo,
    role: "Sustainability Intern",
    duration: "Jul – Oct 2025",
  },
  sweya: {
    id: "sweya",
    name: "Sweya",
    logo: sweyaLogo,
    role: "HealthTech Intern",
    duration: "Aug – Nov 2025",
  },
  icompass: {
    id: "icompass",
    name: "iCompass",
    logo: icompassLogo,
    role: "Education Research Intern",
    duration: "Jun – Sep 2025",
  },
  digiotai: {
    id: "digiotai",
    name: "DigiotAI",
    logo: digiotaiLogo,
    role: "ML Engineering Intern",
    duration: "Jul – Dec 2025",
  },
  "data-foundry": {
    id: "data-foundry",
    name: "Data Foundry",
    logo: dataFoundryLogo,
    role: "Data Analytics Intern",
    duration: "Aug – Oct 2025",
  },
};

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", companyId: "interview-buddy", title: "Interview Round", type: "interview", date: "2025-06-12", time: "2:00 PM", status: "upcoming", description: "Product design portfolio review with founder team." },
  { id: "e2", companyId: "edumoon", title: "Skills Assessment", type: "assessment", date: "2025-06-12", time: "5:00 PM", status: "upcoming", description: "Community strategy case study submission." },
  { id: "e3", companyId: "sandlogic", title: "Technical Interview", type: "interview", date: "2025-06-14", time: "11:00 AM", status: "upcoming" },
  { id: "e4", companyId: "greenjams", title: "Application Deadline", type: "deadline", date: "2025-06-10", status: "completed" },
  { id: "e5", companyId: "sweya", title: "Offer Received", type: "offer", date: "2025-06-08", status: "completed" },
  { id: "e6", companyId: "icompass", title: "Application Submitted", type: "application", date: "2025-06-05", status: "completed" },
  { id: "e7", companyId: "digiotai", title: "Assessment Submission", type: "assessment", date: "2025-06-16", time: "6:00 PM", status: "upcoming" },
  { id: "e8", companyId: "data-foundry", title: "Follow-up Call", type: "interview", date: "2025-06-18", time: "3:30 PM", status: "upcoming" },
  { id: "e9", companyId: "interview-buddy", title: "Portfolio Submission", type: "deadline", date: "2025-06-20", status: "upcoming" },
  { id: "e10", companyId: "sandlogic", title: "Assessment Round", type: "assessment", date: "2025-06-11", status: "in-progress" },
];

export const featuredInternships = ["interview-buddy", "sandlogic", "edumoon"].map((id) => companies[id]);

export const quickStats = [
  { label: "Active Applications", value: 12, icon: "applications" as const },
  { label: "Upcoming Deadlines", value: 8, icon: "deadlines" as const },
  { label: "Interviews Scheduled", value: 5, icon: "interviews" as const },
  { label: "Offers Received", value: 3, icon: "offers" as const },
];

export const heroBadges = [
  { label: "12 Active Applications" },
  { label: "5 Interviews" },
  { label: "3 Offers" },
  { label: "8 Upcoming Deadlines" },
];

export const deadlines = [
  { companyId: "sandlogic", title: "Technical Interview", type: "Interview Round", daysLeft: 2, priority: "high" as const, dateLabel: "JUN 14" },
  { companyId: "digiotai", title: "Assessment Submission", type: "Assessment", daysLeft: 4, priority: "medium" as const, dateLabel: "JUN 16" },
  { companyId: "interview-buddy", title: "Portfolio Submission", type: "Deadline", daysLeft: 8, priority: "medium" as const, dateLabel: "JUN 20" },
  { companyId: "greenjams", title: "Final Application", type: "Application", daysLeft: 1, priority: "high" as const, dateLabel: "JUN 11" },
];

export const recentActivity = [
  { id: "a1", text: "Interview scheduled with Interview Buddy", time: "June 10, 2025 • 10:30 AM", color: "bg-[#EDE9FE] text-[#7C3AED]" },
  { id: "a2", text: "Assessment submitted to Edumoon", time: "June 9, 2025 • 4:15 PM", color: "bg-[#DBEAFE] text-[#2563EB]" },
  { id: "a3", text: "Offer received from Sweya", time: "June 8, 2025 • 11:00 AM", color: "bg-[#DCFCE7] text-[#16A34A]" },
  { id: "a4", text: "Application opened at SandLogic", time: "June 7, 2025 • 9:45 AM", color: "bg-[#FFF4E8] text-[#F59E42]" },
  { id: "a5", text: "Reminder set for GreenJams deadline", time: "June 6, 2025 • 6:20 PM", color: "bg-[#FEE2E2] text-[#DC2626]" },
];

export const legendItems: { type: EventType; label: string; color: string }[] = [
  { type: "application", label: "Application", color: "bg-[#F59E42]" },
  { type: "assessment", label: "Assessment", color: "bg-[#3B82F6]" },
  { type: "interview", label: "Interview", color: "bg-[#8B5CF6]" },
  { type: "offer", label: "Offer", color: "bg-[#22C55E]" },
  { type: "deadline", label: "Deadline", color: "bg-[#94A3B8]" },
];

export function getEventsForDate(date: Date) {
  const key = date.toISOString().slice(0, 10);
  return calendarEvents.filter((e) => e.date === key);
}

export function getEventDates() {
  return calendarEvents.map((e) => new Date(e.date + "T12:00:00"));
}

export function eventBadgeStyle(type: EventType) {
  switch (type) {
    case "interview":
      return "bg-[#EDE9FE] text-[#7C3AED]";
    case "assessment":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "offer":
      return "bg-[#DCFCE7] text-[#16A34A]";
    case "deadline":
      return "bg-[#F1F5F9] text-[#64748B]";
    default:
      return "bg-[#FFF4E8] text-[#F59E42]";
  }
}
