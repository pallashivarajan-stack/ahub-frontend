import alcoveLogo from "@/assets/partners/alcove.jpg";
import atpiLogo from "@/assets/partners/atpi.jpg";
import avantiLogo from "@/assets/partners/avanti.png";
import digifacLogo from "@/assets/partners/digifac.png";
import icompassLogo from "@/assets/partners/icompass.png";
import ministryLogo from "@/assets/partners/ministry of sceince.png";
import nasscomLogo from "@/assets/partners/nasscom.png";
import rosysLogo from "@/assets/partners/rosys.jpg";
import sandlogicLogo from "@/assets/partners/sandlogic.jpg";
import tieLogo from "@/assets/partners/tie.jpg";

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
    name: "Digifac",
    logo: digifacLogo,
    description: "Digital factory solutions enabling industry 4.0 transformation.",
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
];
