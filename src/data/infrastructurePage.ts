import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Coffee,
  FlaskConical,
  Laptop,
  Presentation,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";

import ahubImg from "@/assets/infastructure/ahub.jpg";
import collaborativeImg from "@/assets/infastructure/collabrative environment.png";
import conferenceHallImg from "@/assets/infastructure/confenrce hall.jpg";
import iotLabsImg from "@/assets/infastructure/iot labs.jpeg";

export type FacilityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryImage = {
  src: string;
  label: string;
  tall?: boolean;
};

export const infrastructureImages = {
  hero: ahubImg,
  collaborative: collaborativeImg,
  conference: conferenceHallImg,
  labs: iotLabsImg,
  campus: ahubImg,
};

export const facilities: FacilityItem[] = [
  { title: "Startup Cubicles", description: "Dedicated bays for focused building.", icon: Building2 },
  { title: "High-Speed Internet", description: "Enterprise-grade connectivity.", icon: Wifi },
  { title: "Seminar Hall", description: "AV-ready learning spaces.", icon: Presentation },
  { title: "Collaboration Lounge", description: "Informal founder networking zones.", icon: Coffee },
  { title: "Prototype Lab", description: "Hands-on hardware experimentation.", icon: FlaskConical },
  { title: "Digital Resources", description: "Cloud tools and software access.", icon: Laptop },
  { title: "Meeting Rooms", description: "Private rooms for teams and mentors.", icon: Users },
  { title: "Secure Environment", description: "Controlled access and safety.", icon: ShieldCheck },
];

export const galleryStrip: GalleryImage[] = [
  { src: ahubImg, label: "Coworking Space" },
  { src: collaborativeImg, label: "Startup Bays" },
  { src: conferenceHallImg, label: "Event Hall" },
  { src: collaborativeImg, label: "Seminar Room" },
  { src: iotLabsImg, label: "Innovation Labs" },
];

export const masonryGallery: GalleryImage[] = [
  { src: ahubImg, label: "AHUB Campus", tall: true },
  { src: iotLabsImg, label: "IoT & Robotics Lab" },
  { src: collaborativeImg, label: "Collaborative Zones" },
  { src: conferenceHallImg, label: "Conference Hall", tall: true },
  { src: ahubImg, label: "Founder Workspace" },
  { src: iotLabsImg, label: "Research Lab", tall: true },
];

export const infrastructureStats = [
  { label: "Startups Supported", value: 120, suffix: "+" },
  { label: "Industry Mentors", value: 80, suffix: "+" },
  { label: "Funding Raised", value: 50, suffix: "Cr+", prefix: "₹" },
  { label: "Facility Access", value: 24, suffix: "/7" },
];

export const researchPills = ["AI & ML Lab", "IoT Lab", "Robotics Lab", "Cloud Infrastructure", "Hardware Prototyping"];

export const collaborativeFeatures = [
  "Open co-working spaces",
  "Dedicated startup cabins",
  "High-speed internet",
  "Community networking",
  "Mentor interaction zones",
];

export const eventFeatures = ["Demo Days", "Startup Meetups", "Investor Events", "Workshops", "Conferences"];
