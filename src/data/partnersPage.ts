import { resolveLegacyAsset } from "@/lib/assets";

const [alcoveLogo, atpiLogo, avantiLogo, icompassLogo, ministryLogo, msmeLogo, nasscomLogo, rosysLogo, sandlogicLogo, tieLogo] = [
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
].map(resolveLegacyAsset);

export type PartnerItem = {
  name: string;
  logo: string;
  description: string;
  href?: string;
};

export const marqueePartners: PartnerItem[] = [
  {
    name: "TiE Vizag",
    logo: tieLogo,
    description: "Empowering entrepreneurs with mentorship, funding access, and global networking.",
  },
  {
    name: "Avanti Feeds",
    logo: avantiLogo,
    description: "Industry leader fostering aquaculture innovation and sustainable partnerships.",
  },
  {
    name: "ATPI",
    logo: atpiLogo,
    description: "Promoting technology parks and industrial innovation infrastructure.",
  },
  {
    name: "NASSCOM",
    logo: nasscomLogo,
    description: "Driving technology innovation and startup ecosystem growth across India.",
  },
  {
    name: "Ministry of Science",
    logo: ministryLogo,
    description: "Supporting scientific research and technology-led innovation initiatives.",
  },
  {
    name: "iCompass",
    logo: icompassLogo,
    description: "Education technology partner supporting student entrepreneurship.",
  },
  {
    name: "SandLogic",
    logo: sandlogicLogo,
    description: "AI and deep-tech partner supporting product innovation.",
  },
  {
    name: "Alcove",
    logo: alcoveLogo,
    description: "Collaborative workspaces for startups and innovators.",
  },
  {
    name: "Rosys",
    logo: rosysLogo,
    description: "Technology solutions partner driving digital transformation.",
  },
  {
    name: "MSME",
    logo: msmeLogo,
    description: "Micro, Small and Medium Enterprises support and development initiatives.",
  },
];

export const popularPartners: PartnerItem[] = [
  {
    name: "TiE Vizag",
    logo: tieLogo,
    description: "Empowering entrepreneurs with mentorship, funding access, and global networking opportunities.",
    href: "https://vizag.tie.org/",
  },
  {
    name: "Avanti Feeds",
    logo: avantiLogo,
    description: "Industry leader fostering aquaculture innovation and sustainable business partnerships.",
    href: "https://avantifeeds.com/",
  },
  {
    name: "NASSCOM",
    logo: nasscomLogo,
    description: "Driving technology innovation and startup ecosystem growth across India.",
    href: "https://nasscom.in/",
  },
  {
    name: "iCompass",
    logo: icompassLogo,
    description: "Education technology partner supporting student entrepreneurship and innovation.",
    href: "#",
  },
  {
    name: "SandLogic",
    logo: sandlogicLogo,
    description: "AI and deep-tech partner supporting product innovation and scalable solutions.",
    href: "#",
  },
  {
    name: "ATPI",
    logo: atpiLogo,
    description: "Promoting technology parks and industrial innovation infrastructure across regions.",
    href: "#",
  },
  {
    name: "MSME",
    logo: msmeLogo,
    description: "Micro, Small and Medium Enterprises support and development initiatives.",
    href: "#",
  },
];
