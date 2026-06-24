import agriDnaLogo from "@/assets/startups/agri dna.jpg";
import antarIotLogo from "@/assets/startups/antar iot.png";
import austhraaMotorsLogo from "@/assets/startups/austhraa_motors_logo.jpg";
import billboLogo from "@/assets/startups/billbo.jpg";
import bizproLogo from "@/assets/startups/bizpro.png";
import cirusLogo from "@/assets/startups/cirus.jpg";
import dataFoundryLogo from "@/assets/startups/data foundary.png";
import derAutoBotLogo from "@/assets/startups/der auto bot.jpg";
import digiotaiLogo from "@/assets/startups/digiotai.jpg";
import edumoonLogo from "@/assets/startups/edumoon.png";
import furpsqLogo from "@/assets/startups/furpsq.jpg";
import greenjamsLogo from "@/assets/startups/greenjams_logo.jpg";
import happyDriversLogo from "@/assets/startups/happy drivers.jpg";
import houseInstaLogo from "@/assets/startups/house insta.png";
import icompassLogo from "@/assets/startups/icompass.png";
import innoccitoLogo from "@/assets/startups/innoccito.jpg";
import interviewBuddyLogo from "@/assets/startups/interview buddy.png";
import ipmgLogo from "@/assets/startups/ipmg.jpg";
import jaitraLogo from "@/assets/startups/jaitra.jpg";
import jnanaLogo from "@/assets/startups/jnana.jpg";
import jooraLogo from "@/assets/startups/joora_drone_consultants_logo.jpg";
import matricServicesLogo from "@/assets/startups/matric services.png";
import nestWebhostLogo from "@/assets/startups/nest webhost.png";
import nrTechcreatzLogo from "@/assets/startups/nr techcreatz.png";
import pickABookLogo from "@/assets/startups/pick a book.png";
import returnTrucksLogo from "@/assets/startups/retruntrucks_logo.jpg";
import rollsMamaLogo from "@/assets/startups/rolls mama.jpg";
import sandlogicLogo from "@/assets/startups/sandlogic.png";
import schemaxLogo from "@/assets/startups/schemax.png";
import sconexLogo from "@/assets/startups/sconex.jpg";
import spiceRouteLogo from "@/assets/startups/spice route.jpg";
import spotTimesLogo from "@/assets/startups/spot times.png";
import starbeatLogo from "@/assets/startups/starbeat.jpg";
import starryStoriesLogo from "@/assets/startups/starry stories.png";
import sweyaLogo from "@/assets/startups/sweya.png";
import talentSpotifyLogo from "@/assets/startups/talentspotify_logo.jpg";
import taramandalLogo from "@/assets/startups/taramandal.jpg";
import tessracLogo from "@/assets/startups/tessrac_logo.jpg";
import trainDhabaLogo from "@/assets/startups/train dhaba.avif";
import vihaanLogo from "@/assets/startups/vihaan.jpg";
import vyomastraLogo from "@/assets/startups/vyomastra.jpg";

export type StartupItem = {
  id: string;
  name: string;
  logo: string;
  category: string;
  industry: string;
  founded: number;
  fundingStage: string;
  description: string;
  website?: string;
  popularity: number;
  addedOrder: number;
};

export const startupDirectory: StartupItem[] = [
  { id: "interview-buddy", name: "Interview Buddy", logo: interviewBuddyLogo, category: "EdTech", industry: "Education", founded: 2021, fundingStage: "Seed", description: "AI-powered mock interview and placement readiness platform helping students improve career outcomes.", website: "https://interviewbuddy.in", popularity: 95, addedOrder: 1 },
  { id: "edumoon", name: "Edumoon", logo: edumoonLogo, category: "EdTech", industry: "Education", founded: 2020, fundingStage: "Pre-Seed", description: "Community-led skill-building platform empowering students through mentorship and career readiness.", popularity: 88, addedOrder: 2 },
  { id: "greenjams", name: "GreenJams", logo: greenjamsLogo, category: "CleanTech", industry: "Sustainability", founded: 2019, fundingStage: "Seed", description: "Carbon-negative building materials startup creating sustainable alternatives for construction.", website: "https://greenjams.com", popularity: 92, addedOrder: 3 },
  { id: "pick-a-book", name: "Pick A Book", logo: pickABookLogo, category: "EdTech", industry: "Education", founded: 2022, fundingStage: "Pre-Seed", description: "Reading habit platform fostering continuous learning and youth engagement through curated book clubs.", popularity: 76, addedOrder: 4 },
  { id: "sweya", name: "Sweya", logo: sweyaLogo, category: "HealthTech", industry: "Healthcare", founded: 2021, fundingStage: "Seed", description: "Digital health platform improving patient outcomes through smart monitoring and care coordination.", popularity: 82, addedOrder: 5 },
  { id: "sandlogic", name: "SandLogic", logo: sandlogicLogo, category: "AI", industry: "Deep Tech", founded: 2019, fundingStage: "Series A", description: "AI and voice technology products powering enterprise automation and intelligent interfaces.", website: "https://sandlogic.com", popularity: 91, addedOrder: 6 },
  { id: "icompass", name: "iCompass", logo: icompassLogo, category: "EdTech", industry: "Education", founded: 2020, fundingStage: "Pre-Seed", description: "Career guidance platform helping students navigate higher education and professional pathways.", popularity: 74, addedOrder: 7 },
  { id: "data-foundry", name: "Data Foundry", logo: dataFoundryLogo, category: "SaaS", industry: "Analytics", founded: 2022, fundingStage: "Seed", description: "Data infrastructure platform helping startups build analytics pipelines without heavy engineering.", popularity: 70, addedOrder: 8 },
  { id: "agri-dna", name: "Agri DNA", logo: agriDnaLogo, category: "AgriTech", industry: "Agriculture", founded: 2021, fundingStage: "Pre-Seed", description: "Precision agriculture tools using genomics and data to improve crop yield and farmer income.", popularity: 68, addedOrder: 9 },
  { id: "antar-iot", name: "Antar IoT", logo: antarIotLogo, category: "IoT", industry: "Hardware", founded: 2020, fundingStage: "Seed", description: "Connected device solutions for smart infrastructure, monitoring, and industrial IoT deployments.", popularity: 72, addedOrder: 10 },
  { id: "bizpro", name: "BizPro", logo: bizproLogo, category: "SaaS", industry: "Enterprise", founded: 2023, fundingStage: "Pre-Seed", description: "Business operations suite helping SMBs manage workflows, billing, and customer relationships.", popularity: 65, addedOrder: 11 },
  { id: "austhraa-motors", name: "Austhraa Motors", logo: austhraaMotorsLogo, category: "Mobility", industry: "Automotive", founded: 2021, fundingStage: "Seed", description: "Electric mobility solutions focused on sustainable transportation and smart vehicle systems.", popularity: 67, addedOrder: 12 },
  { id: "billbo", name: "Billbo", logo: billboLogo, category: "FinTech", industry: "Finance", founded: 2022, fundingStage: "Pre-Seed", description: "Simplified billing and invoicing tools for small businesses and freelance operators.", popularity: 60, addedOrder: 13 },
  { id: "cirus", name: "Cirus", logo: cirusLogo, category: "Deep Tech", industry: "Technology", founded: 2020, fundingStage: "Seed", description: "Innovation-driven technology startup building scalable products for modern enterprise needs.", popularity: 63, addedOrder: 14 },
  { id: "der-auto-bot", name: "Der Auto Bot", logo: derAutoBotLogo, category: "Robotics", industry: "Automation", founded: 2021, fundingStage: "Pre-Seed", description: "Robotic automation solutions streamlining industrial processes and manufacturing workflows.", popularity: 61, addedOrder: 15 },
  { id: "digiotai", name: "DigiotAI", logo: digiotaiLogo, category: "AI", industry: "Deep Tech", founded: 2022, fundingStage: "Seed", description: "AI-powered digital solutions transforming business operations through intelligent automation.", popularity: 69, addedOrder: 16 },
  { id: "furpsq", name: "Furpsq", logo: furpsqLogo, category: "Consumer", industry: "Lifestyle", founded: 2023, fundingStage: "Pre-Seed", description: "Consumer-focused brand building innovative lifestyle products for modern urban audiences.", popularity: 55, addedOrder: 17 },
  { id: "happy-drivers", name: "Happy Drivers", logo: happyDriversLogo, category: "Mobility", industry: "Transport", founded: 2020, fundingStage: "Seed", description: "Driver experience platform improving fleet management, safety, and on-road efficiency.", popularity: 64, addedOrder: 18 },
  { id: "house-insta", name: "House Insta", logo: houseInstaLogo, category: "PropTech", industry: "Real Estate", founded: 2022, fundingStage: "Pre-Seed", description: "Property discovery and rental platform simplifying home search for students and young professionals.", popularity: 58, addedOrder: 19 },
  { id: "innoccito", name: "Innoccito", logo: innoccitoLogo, category: "HealthTech", industry: "Healthcare", founded: 2021, fundingStage: "Seed", description: "Healthcare innovation startup delivering accessible wellness and diagnostic solutions.", popularity: 66, addedOrder: 20 },
  { id: "ipmg", name: "IPMG", logo: ipmgLogo, category: "Enterprise", industry: "Consulting", founded: 2019, fundingStage: "Seed", description: "Intellectual property and management consultancy supporting startups through growth phases.", popularity: 62, addedOrder: 21 },
  { id: "jaitra", name: "Jaitra", logo: jaitraLogo, category: "Deep Tech", industry: "Technology", founded: 2022, fundingStage: "Pre-Seed", description: "Technology venture building products that bridge research innovation and market-ready solutions.", popularity: 57, addedOrder: 22 },
  { id: "jnana", name: "Jnana", logo: jnanaLogo, category: "EdTech", industry: "Education", founded: 2021, fundingStage: "Pre-Seed", description: "Knowledge platform delivering structured learning experiences for students and professionals.", popularity: 59, addedOrder: 23 },
  { id: "joora", name: "Joora Drone Consultants", logo: jooraLogo, category: "Aerospace", industry: "Drones", founded: 2020, fundingStage: "Seed", description: "Drone consulting and solutions for surveying, agriculture, and industrial inspection applications.", popularity: 71, addedOrder: 24 },
  { id: "matric-services", name: "Matric Services", logo: matricServicesLogo, category: "SaaS", industry: "Enterprise", founded: 2022, fundingStage: "Pre-Seed", description: "Operational services platform helping teams manage metrics, reporting, and business workflows.", popularity: 54, addedOrder: 25 },
  { id: "nest-webhost", name: "Nest Webhost", logo: nestWebhostLogo, category: "SaaS", industry: "Infrastructure", founded: 2021, fundingStage: "Bootstrapped", description: "Web hosting and digital infrastructure services tailored for early-stage startup teams.", popularity: 52, addedOrder: 26 },
  { id: "nr-techcreatz", name: "NR Techcreatz", logo: nrTechcreatzLogo, category: "Deep Tech", industry: "Technology", founded: 2023, fundingStage: "Pre-Seed", description: "Creative technology studio building digital products at the intersection of design and engineering.", popularity: 56, addedOrder: 27 },
  { id: "return-trucks", name: "Return Trucks", logo: returnTrucksLogo, category: "Logistics", industry: "Supply Chain", founded: 2020, fundingStage: "Seed", description: "Logistics platform optimizing return freight and reducing empty-mile costs for transporters.", popularity: 73, addedOrder: 28 },
  { id: "rolls-mama", name: "Rolls Mama", logo: rollsMamaLogo, category: "FoodTech", industry: "Food & Beverage", founded: 2022, fundingStage: "Pre-Seed", description: "Food brand delivering quality quick-service offerings with a focus on consistency and scale.", popularity: 53, addedOrder: 29 },
  { id: "schemax", name: "Schemax", logo: schemaxLogo, category: "SaaS", industry: "Enterprise", founded: 2021, fundingStage: "Seed", description: "Schema and data management tools helping teams organize complex business information.", popularity: 60, addedOrder: 30 },
  { id: "sconex", name: "Sconex", logo: sconexLogo, category: "IoT", industry: "Hardware", founded: 2022, fundingStage: "Pre-Seed", description: "Connected hardware solutions enabling smarter environments and device-level automation.", popularity: 58, addedOrder: 31 },
  { id: "spice-route", name: "Spice Route", logo: spiceRouteLogo, category: "FoodTech", industry: "Food & Beverage", founded: 2019, fundingStage: "Seed", description: "Food supply and distribution startup connecting regional producers with modern retail channels.", popularity: 70, addedOrder: 32 },
  { id: "spot-times", name: "Spot Times", logo: spotTimesLogo, category: "Media", industry: "Publishing", founded: 2023, fundingStage: "Pre-Seed", description: "Local news and events platform surfacing community stories and hyperlocal engagement.", popularity: 51, addedOrder: 33 },
  { id: "starbeat", name: "Starbeat", logo: starbeatLogo, category: "HealthTech", industry: "Wellness", founded: 2021, fundingStage: "Pre-Seed", description: "Wellness technology helping users track health rhythms and build sustainable daily habits.", popularity: 55, addedOrder: 34 },
  { id: "starry-stories", name: "Starry Stories", logo: starryStoriesLogo, category: "Media", industry: "Content", founded: 2022, fundingStage: "Bootstrapped", description: "Storytelling platform creating engaging educational content for children and young learners.", popularity: 50, addedOrder: 35 },
  { id: "talentspotify", name: "Talent Spotify", logo: talentSpotifyLogo, category: "HR Tech", industry: "Recruitment", founded: 2020, fundingStage: "Seed", description: "Talent discovery platform matching skilled professionals with high-growth startup opportunities.", popularity: 68, addedOrder: 36 },
  { id: "taramandal", name: "Taramandal", logo: taramandalLogo, category: "EdTech", industry: "Education", founded: 2021, fundingStage: "Pre-Seed", description: "Learning ecosystem inspiring curiosity and structured exploration across science and creativity.", popularity: 57, addedOrder: 37 },
  { id: "tessrac", name: "Tessrac", logo: tessracLogo, category: "Deep Tech", industry: "Technology", founded: 2022, fundingStage: "Seed", description: "Advanced technology venture developing scalable software for data-intensive applications.", popularity: 62, addedOrder: 38 },
  { id: "train-dhaba", name: "Train Dhaba", logo: trainDhabaLogo, category: "FoodTech", industry: "Hospitality", founded: 2023, fundingStage: "Pre-Seed", description: "Railway food service concept bringing quality dining experiences to travelers on the move.", popularity: 49, addedOrder: 39 },
  { id: "vihaan", name: "Vihaan", logo: vihaanLogo, category: "Deep Tech", industry: "Technology", founded: 2021, fundingStage: "Pre-Seed", description: "Innovation-led startup building technology products with a focus on accessibility and impact.", popularity: 54, addedOrder: 40 },
  { id: "vyomastra", name: "Vyomastra", logo: vyomastraLogo, category: "Aerospace", industry: "Space Tech", founded: 2022, fundingStage: "Seed", description: "Space technology venture exploring aerospace applications and advanced engineering solutions.", popularity: 67, addedOrder: 41 },
];

export const logoMarquee = startupDirectory.map((s) => ({ name: s.name, logo: s.logo }));

export const categories = ["All", ...Array.from(new Set(startupDirectory.map((s) => s.category)))];
export const fundingStages = ["All", ...Array.from(new Set(startupDirectory.map((s) => s.fundingStage)))];
export const industries = ["All", ...Array.from(new Set(startupDirectory.map((s) => s.industry)))];

export type SortOption = "newest" | "oldest" | "popular" | "recent";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Added" },
];

export function filterStartups(
  startups: StartupItem[],
  {
    search,
    category,
    fundingStage,
    industry,
    sort,
  }: {
    search: string;
    category: string;
    fundingStage: string;
    industry: string;
    sort: SortOption;
  },
) {
  const query = search.trim().toLowerCase();

  let result = startups.filter((startup) => {
    const matchesSearch =
      !query ||
      startup.name.toLowerCase().includes(query) ||
      startup.category.toLowerCase().includes(query) ||
      startup.industry.toLowerCase().includes(query) ||
      startup.description.toLowerCase().includes(query);

    const matchesCategory = category === "All" || startup.category === category;
    const matchesFunding = fundingStage === "All" || startup.fundingStage === fundingStage;
    const matchesIndustry = industry === "All" || startup.industry === industry;

    return matchesSearch && matchesCategory && matchesFunding && matchesIndustry;
  });

  result = [...result].sort((a, b) => {
    switch (sort) {
      case "oldest":
        return a.founded - b.founded;
      case "popular":
        return b.popularity - a.popularity;
      case "recent":
        return b.addedOrder - a.addedOrder;
      case "newest":
      default:
        return b.founded - a.founded;
    }
  });

  return result;
}

export function fundingBadgeStyle(stage: string) {
  switch (stage) {
    case "Seed":
      return "bg-[#DCFCE7] text-[#166534]";
    case "Series A":
      return "bg-[#DBEAFE] text-[#1E40AF]";
    case "Pre-Seed":
      return "bg-[#E0F2FE] text-[#0369A1]";
    case "Bootstrapped":
      return "bg-[#F3F4F6] text-[#4B5563]";
    default:
      return "bg-[#FFF4E8] text-[#B45309]";
  }
}
