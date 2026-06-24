import andhraTechLeagueImg from "@/assets/events/andhra texh league.jpg";
import beenThereDoneThatImg from "@/assets/events/been there done that.jpeg";
import beenThereDoneThat2Img from "@/assets/events/been there donw that 2.jpeg";
import edsCompetitionImg from "@/assets/events/eds stduet design competittion.jpeg";
import eyesWideShutImg from "@/assets/events/eyes wide shut.jpg";
import googleStartupImg from "@/assets/events/google starup success days.jpg";
import hackapImg from "@/assets/events/Hackap agritech hackathon.jpg";
import ideathonImg from "@/assets/events/ideathon.jpg";
import runninWildImg from "@/assets/events/runnin wild.jpeg";
import startupSaturdayImg from "@/assets/events/Start Up saturday.jpeg";
import startupSaturday2Img from "@/assets/events/startup saturday.jpeg";
import startupSaturday3Img from "@/assets/events/starups staruday.jpg";

export type EcosystemEventType = "workshop" | "hackathon" | "seminar" | "competition" | "networking";

export type EcosystemEvent = {
  id: string;
  title: string;
  image: string;
  date: string;
  dayLabel: string;
  time: string;
  venue: string;
  description: string;
  tag: string;
  type: EcosystemEventType;
  price: string;
};

export const ecosystemEvents: EcosystemEvent[] = [
  {
    id: "oct-21-saturday",
    title: "StartUp Saturday",
    image: startupSaturday2Img,
    date: "2023-10-21",
    dayLabel: "SUN 21",
    time: "4:00 PM – 5:30 PM",
    venue: "GMR Seminar Hall, AU Science & Technology Bhavan, South Campus",
    description: "Dream Big — Envisioning Startup Success with founders and ecosystem mentors.",
    tag: "Workshop",
    type: "workshop",
    price: "Free",
  },
  {
    id: "oct-21-btdt",
    title: "BEEN THERE DONE THAT",
    image: beenThereDoneThatImg,
    date: "2023-10-21",
    dayLabel: "SUN 21",
    time: "4:00 PM – 5:30 PM",
    venue: "GMR Seminar Hall, AU Science & Technology Bhavan, South Campus",
    description: "Classroom session with experienced entrepreneurs sharing real startup lessons.",
    tag: "Seminar",
    type: "seminar",
    price: "Free",
  },
  {
    id: "oct-15-google",
    title: "Google StartUP Success Days",
    image: googleStartupImg,
    date: "2023-10-15",
    dayLabel: "SUN 15",
    time: "9:30 AM – 5:00 PM",
    venue: "Auditorium, College of Pharmacy, Andhra University South Campus",
    description: "Helping entrepreneurs learn, create, and grow through a strong startup ecosystem platform.",
    tag: "Flagship",
    type: "workshop",
    price: "Free",
  },
  {
    id: "oct-12-ideathon",
    title: "Ideathon",
    image: ideathonImg,
    date: "2023-10-12",
    dayLabel: "THU 12",
    time: "4:30 PM – 6:30 PM",
    venue: "Incubation Center, North Campus – Andhra University",
    description: "Talent showcase for student innovators presenting bold ideas and early prototypes.",
    tag: "Talent Show",
    type: "competition",
    price: "Free",
  },
  {
    id: "oct-7-saturday",
    title: "Start Up Saturday",
    image: startupSaturday3Img,
    date: "2023-10-07",
    dayLabel: "SAT 7",
    time: "4:00 PM – 5:30 PM",
    venue: "GMR Seminar Hall, AU Science & Technology Bhavan, South Campus",
    description: "Introduction to Intellectual Property for early-stage founders and student teams.",
    tag: "Workshop",
    type: "workshop",
    price: "Free",
  },
  {
    id: "oct-7-btdt",
    title: "BEEN THERE DONE THAT",
    image: beenThereDoneThat2Img,
    date: "2023-10-07",
    dayLabel: "SAT 7",
    time: "6:00 PM – 8:30 PM",
    venue: "GMR Seminar Hall, AU Science & Technology Bhavan, South Campus",
    description: "Learning from Donkeys — unconventional lessons in resilience and entrepreneurial thinking.",
    tag: "Talk",
    type: "seminar",
    price: "Free",
  },
  {
    id: "oct-1-league",
    title: "Andhra Tech League",
    image: andhraTechLeagueImg,
    date: "2023-10-01",
    dayLabel: "SUN 1",
    time: "All Day",
    venue: "YVS Murthy Auditorium, North Campus – Andhra University",
    description: "Regional technology showcase bringing together innovators, teams, and ecosystem partners.",
    tag: "League",
    type: "networking",
    price: "Free",
  },
  {
    id: "sep-24-hackap",
    title: "HackAP Agritech Hackathon",
    image: hackapImg,
    date: "2023-09-23",
    dayLabel: "SAT 23",
    time: "Sep 23–24, 2023",
    venue: "Incubation Council, North Campus – Andhra University",
    description: "Two-day agritech hackathon challenging teams to build solutions for rural innovation.",
    tag: "Hackathon",
    type: "hackathon",
    price: "Free",
  },
  {
    id: "sep-16-saturday",
    title: "Start Up Saturdays",
    image: startupSaturdayImg,
    date: "2023-09-16",
    dayLabel: "SAT 16",
    time: "4:00 PM – 5:30 PM",
    venue: "GMR Seminar Hall, Science & Technology Bhavan, South Campus",
    description: "How grameena incubation is helping rural entrepreneurs build sustainable ventures.",
    tag: "Workshop",
    type: "workshop",
    price: "Free",
  },
  {
    id: "sep-16-runnin",
    title: "Runnin' Wild",
    image: runninWildImg,
    date: "2023-09-16",
    dayLabel: "SAT 16",
    time: "6:00 PM – 8:30 PM",
    venue: "GMR Seminar Hall, Science & Technology Bhavan, South Campus",
    description: "Been there, done that — candid founder stories from the AHUB community.",
    tag: "Talk",
    type: "seminar",
    price: "Free",
  },
  {
    id: "sep-15-eds",
    title: "EDS Student Design Competition 2023",
    image: edsCompetitionImg,
    date: "2023-09-15",
    dayLabel: "FRI 15",
    time: "All Day",
    venue: "Incubation Council, North Campus – Andhra University",
    description: "Innovate, design, inspire — student teams compete with product and design prototypes.",
    tag: "Competition",
    type: "competition",
    price: "Free",
  },
  {
    id: "sep-2-eyes",
    title: "Eyes Wide Shut",
    image: eyesWideShutImg,
    date: "2023-09-02",
    dayLabel: "SAT 2",
    time: "6:00 PM – 8:30 PM",
    venue: "GMR Seminar Hall, Science & Technology Bhavan, South Campus",
    description: "Been there, done that — honest conversations on startup failures and comebacks.",
    tag: "Talk",
    type: "seminar",
    price: "Free",
  },
  {
    id: "sep-2-saturday",
    title: "Start Up Saturdays",
    image: startupSaturday2Img,
    date: "2023-09-02",
    dayLabel: "SAT 2",
    time: "4:00 PM – 5:30 PM",
    venue: "GMR Seminar Hall, Science & Technology Bhavan, South Campus",
    description: "Identifying a startup idea — frameworks for finding problems worth solving.",
    tag: "Workshop",
    type: "workshop",
    price: "Free",
  },
];

export const featuredEvents = ecosystemEvents.slice(0, 3);

export const eventStats = [
  { label: "Total Events", value: ecosystemEvents.length, icon: "events" as const },
  { label: "October 2023", value: 7, icon: "month" as const },
  { label: "Workshops", value: 5, icon: "workshops" as const },
  { label: "Free Entry", value: ecosystemEvents.length, icon: "free" as const },
];

export const heroBadges = [
  { label: "13 Ecosystem Events" },
  { label: "Oct – Sep 2023" },
  { label: "All Free" },
  { label: "Andhra University" },
];

export const legendItems: { type: EcosystemEventType; label: string; color: string }[] = [
  { type: "workshop", label: "Workshop", color: "bg-[#F59E42]" },
  { type: "hackathon", label: "Hackathon", color: "bg-[#3B82F6]" },
  { type: "seminar", label: "Seminar", color: "bg-[#8B5CF6]" },
  { type: "competition", label: "Competition", color: "bg-[#22C55E]" },
  { type: "networking", label: "Networking", color: "bg-[#94A3B8]" },
];

export function getEventsForDate(date: Date) {
  const key = date.toISOString().slice(0, 10);
  return ecosystemEvents.filter((e) => e.date === key);
}

export function getEventDates() {
  return ecosystemEvents.map((e) => new Date(e.date + "T12:00:00"));
}

export function eventTypeBadge(type: EcosystemEventType) {
  switch (type) {
    case "hackathon":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "seminar":
      return "bg-[#EDE9FE] text-[#7C3AED]";
    case "competition":
      return "bg-[#DCFCE7] text-[#16A34A]";
    case "networking":
      return "bg-[#F1F5F9] text-[#64748B]";
    default:
      return "bg-[#FFF4E8] text-[#F59E42]";
  }
}
