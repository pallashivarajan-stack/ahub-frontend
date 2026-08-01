import api, { setTokens, clearTokens } from "@/services/api";
import { teamPageData, teamMembers, type TeamMember, type TeamPageMeta } from "@/data/teamPage";
import { boardMembers, type BoardMember } from "@/data/boardPage";
import { mentorsData, type Mentor } from "@/data/mentorsPage";
import { infrastructureImages } from "@/data/infrastructurePage";
import { ecosystemEvents } from "@/data/eventsCalendar";

// Default: 7 most recent calendar events
const defaultLatestEvents = [...ecosystemEvents]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 7);
import { resolveLegacyAsset } from "@/lib/assets";

export const STORAGE_KEY_TEAM = "ahub_admin_team_data";
export const STORAGE_KEY_BOARD = "ahub_admin_board_data";
export const STORAGE_KEY_MENTORS = "ahub_admin_mentors_data";
export const STORAGE_KEY_INFRASTRUCTURE = "ahub_admin_infrastructure_data";
export const STORAGE_KEY_INTERNSHIP_REGISTRATION = "ahub_admin_internship_registration_data";
export const STORAGE_KEY_LATEST_EVENTS = "ahub_admin_latest_events_data";
export const STORAGE_KEY_TESTIMONIALS = "ahub_admin_testimonials_data";
export const STORAGE_KEY_PARTNERS_LOGOS = "ahub_admin_partners_logos_data";
export const STORAGE_KEY_MESH_NETWORK = "ahub_admin_mesh_network_data";
export const STORAGE_KEY_ASSOCIATED_WITH = "ahub_admin_associated_with_data";
export const STORAGE_KEY_VISITORS = "ahub_admin_visitors_data";
export const STORAGE_KEY_SOCIAL_LINKS = "ahub_admin_social_links_data";

// Clear stale empty arrays stored by previous versions that would prevent
// default data from showing on first load
function clearEmptyStored(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 0) {
        localStorage.removeItem(key);
      }
    }
  } catch { /* ignore */ }
}
clearEmptyStored(STORAGE_KEY_TEAM);
clearEmptyStored(STORAGE_KEY_BOARD);
clearEmptyStored(STORAGE_KEY_MENTORS);
clearEmptyStored(STORAGE_KEY_LATEST_EVENTS);

export type AdminTeamData = {
  meta: TeamPageMeta;
  members: TeamMember[];
};

function getStoredTeam(): AdminTeamData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminTeamData;
      if (parsed.members?.length) return parsed;
    }
  } catch { /* ignore */ }
  return { meta: teamPageData, members: teamMembers };
}

function persistTeam(data: AdminTeamData) {
  try {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

function getStoredBoard(): BoardMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOARD);
    if (raw) {
      const parsed = JSON.parse(raw) as BoardMember[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...boardMembers];
}

function persistBoard(data: BoardMember[]) {
  try {
    localStorage.setItem(STORAGE_KEY_BOARD, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function login(username: string, password: string) {
  try {
    const formData = new URLSearchParams();
    formData.set("username", username);
    formData.set("password", password);
    const res = await api.post("/api/v1/auth/login", formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    setTokens(res.data.access_token, res.data.refresh_token);
    return { ok: true } as const;
  } catch {
    // Fallback: allow any credentials for local dev
    if (!import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL === "http://localhost:8000") {
      setTokens("dev-token", "dev-refresh");
      return { ok: true } as const;
    }
    return { ok: false, error: "Invalid credentials" } as const;
  }
}

export function isLoggedIn() {
  try {
    if (typeof localStorage === "undefined") return false;
    return !!localStorage.getItem("access_token");
  } catch {
    return false;
  }
}

export function logout() {
  clearTokens();
}

export async function saveTeamData(data: AdminTeamData) {
  persistTeam(data);
}

export function loadTeamData(): AdminTeamData {
  return getStoredTeam();
}

export async function saveBoardData(data: BoardMember[]) {
  persistBoard(data);
}

export function loadBoardData(): BoardMember[] {
  return getStoredBoard();
}

const allAssetModules = import.meta.glob<string>(
  "../assets/**/*.{jpg,jpeg,png,gif,webp}",
  { eager: true, query: "?url", import: "default" },
);

export async function getAssetOptions(category = "team") {
  const prefix = `../assets/${category}/`;
  return Object.entries(allAssetModules)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, val]) => ({
      path: key.replace(/^\.\.\/assets\//, "/src/assets/"),
      url: val,
      label: key.split("/").pop()?.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ") ?? key,
    }));
}

export async function getMultiCategoryAssetOptions(categories: string[]) {
  const results = await Promise.all(categories.map((cat) => getAssetOptions(cat)));
  const seen = new Set<string>();
  return results.flat().filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function getStoredMentors(): Mentor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MENTORS);
    if (raw) {
      const parsed = JSON.parse(raw) as Mentor[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...mentorsData];
}

function persistMentors(data: Mentor[]) {
  try {
    localStorage.setItem(STORAGE_KEY_MENTORS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveMentorsData(data: Mentor[]) {
  persistMentors(data);
}

export function loadMentorsData(): Mentor[] {
  return getStoredMentors();
}

export async function getBoardAssetOptions() {
  return getAssetOptions("board");
}

export type InfrastructureImages = {
  hero: string;
  collaborative: string;
  conference: string;
  labs: string;
  campus: string;
  galleryCoworking: string;
  galleryStartupBays: string;
  galleryEventHall: string;
  gallerySeminarRoom: string;
  galleryInnovationLabs: string;
  masonryCampus: string;
  masonryIoT: string;
  masonryCollaborative: string;
  masonryConference: string;
  masonryWorkspace: string;
  masonryResearch: string;
};

function getStoredInfrastructure(): InfrastructureImages {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INFRASTRUCTURE);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<InfrastructureImages>;
      const currentUrls = new Set(Object.values(allAssetModules) as string[]);
      if (parsed.galleryCoworking) {
        const merged = { ...infrastructureImages };
        for (const key of Object.keys(merged) as (keyof InfrastructureImages)[]) {
          const storedVal = parsed[key];
          if (storedVal && currentUrls.has(storedVal)) {
            merged[key] = storedVal;
          }
        }
        return merged;
      }
      localStorage.removeItem(STORAGE_KEY_INFRASTRUCTURE);
    }
  } catch { /* ignore */ }
  return { ...infrastructureImages };
}

function persistInfrastructure(data: InfrastructureImages) {
  try {
    localStorage.setItem(STORAGE_KEY_INFRASTRUCTURE, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveInfrastructureData(data: InfrastructureImages) {
  persistInfrastructure(data);
}

export function loadInfrastructureData(): InfrastructureImages {
  return getStoredInfrastructure();
}

export async function getInfrastructureAssetOptions() {
  return getAssetOptions("infastructure");
}

export type InternshipRegistration = {
  id: string;
  companyName: string;
  role: string;
  logo: string;
  duration: string;
  location: string;
  domain: string;
  status: "Open" | "Applied" | "New";
  detailedInfo?: {
    date: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    prerequisites: string[];
    process: string;
    benefits?: string[];
  };
};

const DEFAULT_INTERNSHIPS_DATA: InternshipRegistration[] = [
  {
    id: "ib-ai",
    companyName: "InterviewBuddy",
    role: "UI/UX Designer Intern",
    logo: "/src/assets/startups/interview buddy.png",
    duration: "12 Weeks",
    location: "Remote",
    domain: "Design",
    status: "Applied",
    detailedInfo: {
      date: "February 20, 2025",
      description: "Design is where a product's life-cycle begins and as such determines the success of the product to a measurable degree, making the role of a UI/UX Designer indispensable.",
      responsibilities: [
        "Understand the product requirements.",
        "Conduct user research & create detailed documentation.",
        "Adhere to style standards on fonts, colours and images.",
        "Gather and evaluate user requirements.",
        "Illustrate design ideas using storyboards, process flows and sitemaps.",
        "Design user interface elements & components.",
        "Develop UI mockups and prototypes."
      ],
      skills: [
        "Concept mapping & Story boarding",
        "Wireframing",
        "Visual design",
        "Prototyping",
        "Figma"
      ],
      prerequisites: [
        "Excellent Communication - Verbal and Written.",
        "Good knowledge about Google Sheets and Google Drive.",
        "Ability to understand the elements of a product.",
        "Ability to quickly learn new concepts & approaches."
      ],
      process: "Interested candidates should submit their resume to interviewbuddy.net or visit our website interviewbuddy.net"
    }
  },
  {
    id: "rhodium-ops",
    companyName: "Rhodium Tech",
    role: "Designated Operations Person",
    logo: "/src/assets/testimonals/rhodium tech.jpg",
    duration: "Full Time",
    location: "On-site",
    domain: "Operations",
    status: "Open",
    detailedInfo: {
      date: "February 20, 2025",
      description: "Rhodium Tech is recruiting a Designated Operations Person to oversee industrial spare query handling, port operations, and office functions.",
      responsibilities: [
        "Enquiries of Industrial Spares/Items.",
        "Port Operations – Berthing Schedule and Vessel Status",
        "Representing Negotiations on behalf of the company.",
        "Bank Related Works.",
        "Office Paper Work includes Orders and Invoices.",
        "Supervising the field works."
      ],
      skills: [
        "Should be punctual",
        "Office timings are 0830-1830 hours",
        "Should be able to manage port operations",
        "Good Communication Skills",
        "Should have personal computer and vehicle"
      ],
      prerequisites: [
        "Undergraduate (PASS/FAIL) with minimum English speaking skills."
      ],
      benefits: [
        "Hands-on experience in logistics and operational management.",
        "Exposure to port operations, procurement, and field supervision.",
        "Opportunity to develop negotiation and communication skills.",
        "Certification of experience upon completion.",
        "Potential for future growth based on performance."
      ],
      process: "Interested candidates should submit their resume to rhodium.tech6@gmail.com or contact Ph: +91-7731878897"
    }
  },
  {
    id: "g2v-eng",
    companyName: "G2V Solar",
    role: "Engineering CAD Intern",
    logo: "/src/assets/testimonals/g2v_solar_solutions_pvt_ltd_logo.jpg",
    duration: "Full Time",
    location: "On-site",
    domain: "Engineering",
    status: "Open",
    detailedInfo: {
      date: "February 20, 2025",
      description: "G2V Solar is seeking a motivated Engineering CAD Intern to assist our design and engineering team in creating detailed solar PV system layouts and technical drawings.",
      responsibilities: [
        "CAD Drawing & Drafting: Assist in preparing 2D and 3D CAD models.",
        "Design Support & Optimization: Collaborate with the design team.",
        "Documentation & Compliance: Maintain updated records of drawings.",
        "Software Utilization: Work with AutoCAD, SketchUp, SolidWorks, PVsyst.",
        "Interdepartmental Coordination: Communicate with procurement and project teams.",
        "Site Visits & Field Work (If required)."
      ],
      skills: [
        "Proficiency in AutoCAD (mandatory).",
        "Proficiency in MS Excel.",
        "Familiarity with SketchUp, SolidWorks, PVsyst.",
        "Basic understanding of solar PV systems.",
        "Analytical & Problem-Solving Skills.",
        "Communication: Strong verbal and written communication skills.",
        "Attention to Detail.",
        "Team Player."
      ],
      prerequisites: [
        "Pursuing or recently completed a Diploma/Degree in Mechanical, Civil, Electrical, or Renewable Energy Engineering."
      ],
      benefits: [
        "Hands-on experience in the growing renewable energy industry.",
        "Exposure to real-world solar projects and technical design processes.",
        "Mentorship from experienced engineers.",
        "Certificate of internship completion.",
        "Potential for future employment based on performance."
      ],
      process: "Interested candidates should submit their resume to inc@g2vsolar.com with subject line \"Application for Engineering CAD Intern.\""
    }
  },
  {
    id: "pb-da",
    companyName: "Pick A Book",
    role: "Data Analyst Intern",
    logo: "/src/assets/startups/pick a book.png",
    duration: "8 Weeks",
    location: "Remote",
    domain: "Data Science",
    status: "Open"
  },
  {
    id: "ta-ml",
    companyName: "Tierra Automations",
    role: "ML Ops Intern",
    logo: "/src/assets/startups/antar iot.png",
    duration: "12 Weeks",
    location: "Hybrid",
    domain: "AI/ML",
    status: "Open"
  },
  {
    id: "sw-pd",
    companyName: "Swaya",
    role: "Product Design Intern",
    logo: "/src/assets/startups/sweya.png",
    duration: "8 Weeks",
    location: "Remote",
    domain: "Product Design",
    status: "New"
  }
];

function getStoredInternshipRegistration(): InternshipRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INTERNSHIP_REGISTRATION);
    if (raw) {
      const parsed = JSON.parse(raw) as InternshipRegistration[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_INTERNSHIPS_DATA];
}

function persistInternshipRegistration(data: InternshipRegistration[]) {
  try {
    localStorage.setItem(STORAGE_KEY_INTERNSHIP_REGISTRATION, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveInternshipRegistrationData(data: InternshipRegistration[]) {
  persistInternshipRegistration(data);
}

export function loadInternshipRegistrationData(): InternshipRegistration[] {
  return getStoredInternshipRegistration();
}

/* ── Latest Events ─────────────────────────────────────────────────────── */

export type AdminEventData = {
  title: string;
  date: string;        // ISO format: YYYY-MM-DD
  tag: string;
  description: string;
  image: string;
  time?: string;
  venue?: string;
};

function getStoredLatestEvents(): AdminEventData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LATEST_EVENTS);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminEventData[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return defaultLatestEvents.map((e) => ({
    title: e.title,
    date: e.date,
    tag: e.tag,
    description: e.description,
    image: e.image,
    time: e.time,
    venue: e.venue,
  }));
}

function persistLatestEvents(data: AdminEventData[]) {
  try {
    localStorage.setItem(STORAGE_KEY_LATEST_EVENTS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveLatestEventsData(data: AdminEventData[]) {
  persistLatestEvents(data);
}

export function loadLatestEventsData(): AdminEventData[] {
  return getStoredLatestEvents();
}

/* ── Testimonials ──────────────────────────────────────────────────────── */

export type AdminTestimonialData = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
};

const DEFAULT_TESTIMONIALS: AdminTestimonialData[] = [
  {
    name: "N. R. Narayana Murthy",
    role: "Founder & Former CEO",
    company: "Infosys",
    text: "The infrastructure support and industry connections we gained through A-Hub accelerated our growth by at least two years.",
    rating: 5,
    image: resolveLegacyAsset("/src/assets/visitors/naryana murthy.png"),
  },
  {
    name: "Natarajan Chandrasekaran",
    role: "Executive Chairman",
    company: "Tata Sons",
    text: "What you have today is quite impressive considering that you achieved it in less than two years.",
    rating: 5,
    image: resolveLegacyAsset("/src/assets/testimonals/Natrajan_chnadra sekaran.png"),
  },
];

function getStoredTestimonials(): AdminTestimonialData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TESTIMONIALS);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminTestimonialData[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_TESTIMONIALS];
}

function persistTestimonials(data: AdminTestimonialData[]) {
  try {
    localStorage.setItem(STORAGE_KEY_TESTIMONIALS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveTestimonialsData(data: AdminTestimonialData[]) {
  persistTestimonials(data);
}

export function loadTestimonialsData(): AdminTestimonialData[] {
  return getStoredTestimonials();
}

/* ── Partners Logos (shared by Mesh Network & Associated With) ─────────── */

const LEGACY_PARTNER_PATHS = [
  "/src/assets/partners/alcove.jpg",
  "/src/assets/partners/atpi.jpg",
  "/src/assets/partners/avanti.png",
  "/src/assets/partners/icompass.png",
  "/src/assets/partners/ministry of sceince.png",
  "/src/assets/partners/msme-logo-p.png",
  "/src/assets/partners/nasscom.png",
  "/src/assets/partners/rosys.jpg",
  "/src/assets/partners/sandlogic.jpg",
  "/src/assets/partners/tie.jpg",
  "/src/assets/partners/meity.jpg",
  "/src/assets/partners/Ni-msme.png",
  "/src/assets/partners/ed.jpg",
  "/src/assets/partners/cii.png",
  "/src/assets/partners/tie_women.jpg",
  "/src/assets/partners/young indians.jpg",
  "/src/assets/partners/TiE-U.png",
  "/src/assets/partners/sandhya_aqua.jpg",
  "/src/assets/partners/purude.jpg",
  "/src/assets/partners/acir.jpg",
  "/src/assets/partners/wageningen.png",
  "/src/assets/partners/pbl_trnasport.png",
];

const DEFAULT_PARTNERS_LOGOS = LEGACY_PARTNER_PATHS.map(resolveLegacyAsset);

function getStoredPartnersLogos(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARTNERS_LOGOS);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_PARTNERS_LOGOS];
}

function persistPartnersLogos(data: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PARTNERS_LOGOS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function savePartnersLogosData(data: string[]) {
  persistPartnersLogos(data);
}

export function loadPartnersLogosData(): string[] {
  return getStoredPartnersLogos();
}

/* ── Mesh Network Logos ──────────────────────────────────────────────── */

const DEFAULT_MESH_NETWORK_LOGOS = LEGACY_PARTNER_PATHS.map(resolveLegacyAsset);

function getStoredMeshNetwork(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESH_NETWORK);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_MESH_NETWORK_LOGOS];
}

function persistMeshNetwork(data: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY_MESH_NETWORK, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveMeshNetworkData(data: string[]) {
  persistMeshNetwork(data);
}

export function loadMeshNetworkData(): string[] {
  return getStoredMeshNetwork();
}

/* ── Associated With Logos ────────────────────────────────────────────── */

const DEFAULT_ASSOCIATED_WITH_LOGOS = LEGACY_PARTNER_PATHS.map(resolveLegacyAsset);

function getStoredAssociatedWith(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ASSOCIATED_WITH);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_ASSOCIATED_WITH_LOGOS];
}

function persistAssociatedWith(data: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ASSOCIATED_WITH, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveAssociatedWithData(data: string[]) {
  persistAssociatedWith(data);
}

export function loadAssociatedWithData(): string[] {
  return getStoredAssociatedWith();
}

/* ── Distinguished Visitors ────────────────────────────────────────────── */

export type AdminVisitorData = {
  name: string;
  role: string;
  org: string;
  image: string;
};

const DEFAULT_VISITORS: AdminVisitorData[] = [
  { name: "Natarajan Chandrasekaran", role: "Executive Chairman", org: "Tata Sons", image: resolveLegacyAsset("/src/assets/testimonals/Natrajan_chnadra sekaran.png") },
  { name: "Mats Viberg", role: "Vice Chancellor", org: "Blekinge Institute of Technology", image: resolveLegacyAsset("/src/assets/visitors/mats viberg.jpeg") },
  { name: "Malcolm Byrne", role: "Senator", org: "Senate of Ireland", image: resolveLegacyAsset("/src/assets/visitors/malcolm Byrne.jpg") },
  { name: "Dr Lawrence Jones", role: "Programme Director", org: "Wageningen University", image: resolveLegacyAsset("/src/assets/visitors/dr lawrence jones.jpeg") },
  { name: "N. R. Narayana Murthy", role: "Founder & Former CEO", org: "Infosys", image: resolveLegacyAsset("/src/assets/visitors/naryana murthy.png") },
  { name: "G. Malikarjuna Rao", role: "Chairman", org: "GMR Group", image: resolveLegacyAsset("/src/assets/visitors/G malikarjuna rao.jpg") },
  { name: "Carmelo Rosa", role: "Director", org: "UD FDA", image: resolveLegacyAsset("/src/assets/visitors/carmelo rosa.jpg") },
];

function getStoredVisitors(): AdminVisitorData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminVisitorData[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_VISITORS];
}

function persistVisitors(data: AdminVisitorData[]) {
  try {
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveVisitorsData(data: AdminVisitorData[]) {
  persistVisitors(data);
}

export function loadVisitorsData(): AdminVisitorData[] {
  return getStoredVisitors();
}

/* ── Social Links (Find Us On) ────────────────────────────────────────── */

export type AdminSocialLinkData = {
  name: string;
  username: string;
  description: string;
  href: string;
  iconName: string;
  accent: string;
  glow: string;
  embed?: string;
  tweetUrl?: string;
  instagramEmbed?: string;
};

const DEFAULT_SOCIAL_LINKS: AdminSocialLinkData[] = [
  {
    name: "LinkedIn",
    username: "A-Hub LinkedIn",
    description: "Professional startup ecosystem updates and innovation insights.",
    href: "https://www.linkedin.com",
    iconName: "Linkedin",
    accent: "from-[#5b0e2d] via-[#8d1d46] to-[#f5d8e0]",
    glow: "bg-[#5b0e2d]/25",
    embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7478853567030640640",
  },
  {
    name: "Twitter / X",
    username: "A-Hub Twitter",
    description: "Latest announcements, startup news, and ecosystem highlights.",
    href: "https://x.com",
    iconName: "Twitter",
    accent: "from-slate-900 via-slate-700 to-[#e8edf3]",
    glow: "bg-slate-900/25",
    tweetUrl: "https://twitter.com/ahub1199375/status/2061400902213456017",
  },
  {
    name: "Instagram",
    username: "A-Hub Instagram",
    description: "Behind the scenes, events, founders, and campus innovation moments.",
    href: "https://www.instagram.com",
    iconName: "Instagram",
    accent: "from-[#5b0e2d] via-[#b53d67] to-[#fdf2f5]",
    glow: "bg-pink-500/20",
    instagramEmbed: "https://www.instagram.com/p/DawhjJgMvvV/",
  },
];

function getStoredSocialLinks(): AdminSocialLinkData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOCIAL_LINKS);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminSocialLinkData[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...DEFAULT_SOCIAL_LINKS];
}

function persistSocialLinks(data: AdminSocialLinkData[]) {
  try {
    localStorage.setItem(STORAGE_KEY_SOCIAL_LINKS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveSocialLinksData(data: AdminSocialLinkData[]) {
  persistSocialLinks(data);
}

export function loadSocialLinksData(): AdminSocialLinkData[] {
  return getStoredSocialLinks();
}


