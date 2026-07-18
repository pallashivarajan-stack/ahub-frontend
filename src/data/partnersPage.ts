import { resolveLegacyAsset } from "@/lib/assets";

const [alcoveLogo, atpiLogo, avantiLogo, icompassLogo, ministryLogo, msmeLogo, nasscomLogo, rosysLogo, sandlogicLogo, tieLogo, meityLogo, niMsmeLogo, edLogo, ciiLogo, tieWomenLogo, youngIndiansLogo, tieULogo, sandhyaAquaLogo, purudeLogo, acirLogo, wageningenLogo, pblTransportLogo] = [
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
    href: "https://vizag.tie.org/",
  },
  {
    name: "Avanti Feeds",
    logo: avantiLogo,
    description: "Industry leader fostering aquaculture innovation and sustainable partnerships.",
    href: "https://avantifeeds.com/",
  },
  {
    name: "ATPI",
    logo: atpiLogo,
    description: "Promoting technology parks and industrial innovation infrastructure.",
    href: "#",
  },
  {
    name: "NASSCOM",
    logo: nasscomLogo,
    description: "Driving technology innovation and startup ecosystem growth across India.",
    href: "https://nasscom.in/",
  },
  {
    name: "Ministry of Science",
    logo: ministryLogo,
    description: "Supporting scientific research and technology-led innovation initiatives.",
    href: "https://dst.gov.in/",
  },
  {
    name: "iCompass",
    logo: icompassLogo,
    description: "Education technology partner supporting student entrepreneurship.",
    href: "https://www.icompasstech.com/",
  },
  {
    name: "SandLogic",
    logo: sandlogicLogo,
    description: "AI and deep-tech partner supporting product innovation.",
    href: "https://www.sandlogic.com/",
  },
  {
    name: "Alcove",
    logo: alcoveLogo,
    description: "Collaborative workspaces for startups and innovators.",
    href: "https://alcovepartners.com/home",
  },
  {
    name: "Rosys",
    logo: rosysLogo,
    description: "Technology solutions partner driving digital transformation.",
    href: "https://www.ross-tech.com/",
  },
  {
    name: "MSME",
    logo: msmeLogo,
    description: "Micro, Small and Medium Enterprises support and development initiatives.",
    href: "https://www.msme.gov.in/",
  },
  {
    name: "MeitY",
    logo: meityLogo,
    description: "Ministry of Electronics and Information Technology driving digital India initiatives.",
    href: "https://www.meity.gov.in/",
  },
  {
    name: "NI MSME",
    logo: niMsmeLogo,
    description: "National Institute for MSME supporting small business growth and innovation.",
    href: "https://www.nimsme.gov.in/",
  },
  {
    name: "ED (APEDCL)",
    logo: edLogo,
    description: "Electricity Distribution partner supporting energy and infrastructure development.",
    href: "#",
  },
  {
    name: "CII",
    logo: ciiLogo,
    description: "Confederation of Indian Industry fostering industrial growth and partnerships.",
    href: "https://www.cii.in/",
  },
  {
    name: "TiE Women",
    logo: tieWomenLogo,
    description: "Empowering women entrepreneurs through mentorship and global networking.",
    href: "https://www.tiewomen.org/",
  },
  {
    name: "Young Indians",
    logo: youngIndiansLogo,
    description: "Youth-driven initiative by CII fostering leadership and entrepreneurship.",
    href: "https://youngindians.net/",
  },
  {
    name: "TiE-U",
    logo: tieULogo,
    description: "University-focused TiE initiative nurturing student startups and innovation.",
    href: "#",
  },
  {
    name: "Sandhya Aqua",
    logo: sandhyaAquaLogo,
    description: "Aquaculture enterprise driving sustainable farming and seafood innovation.",
    href: "#",
  },
  {
    name: "Purdue University",
    logo: purudeLogo,
    description: "Global research university partnering in technology and innovation programs.",
    href: "https://www.purdue.edu/",
  },
  {
    name: "ACIR",
    logo: acirLogo,
    description: "Research and innovation center driving collaborative industry partnerships.",
    href: "#",
  },
  {
    name: "Wageningen",
    logo: wageningenLogo,
    description: "World-renowned university for life sciences, agriculture, and food innovation.",
    href: "https://www.wur.nl/",
  },
  {
    name: "PBL Transport",
    logo: pblTransportLogo,
    description: "Logistics and transport solutions supporting efficient supply chain operations.",
    href: "#",
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
    href: "https://www.icompasstech.com/",
  },
  {
    name: "SandLogic",
    logo: sandlogicLogo,
    description: "AI and deep-tech partner supporting product innovation and scalable solutions.",
    href: "https://www.sandlogic.com/",
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
    href: "https://www.msme.gov.in/",
  },
  {
    name: "MeitY",
    logo: meityLogo,
    description: "Ministry of Electronics and Information Technology driving digital India initiatives.",
    href: "https://www.meity.gov.in/",
  },
  {
    name: "NI MSME",
    logo: niMsmeLogo,
    description: "National Institute for MSME supporting small business growth and innovation.",
    href: "https://www.nimsme.gov.in/",
  },
  {
    name: "ED (APEDCL)",
    logo: edLogo,
    description: "Electricity Distribution partner supporting energy and infrastructure development.",
    href: "#",
  },
  {
    name: "CII",
    logo: ciiLogo,
    description: "Confederation of Indian Industry fostering industrial growth and partnerships.",
    href: "https://www.cii.in/",
  },
  {
    name: "TiE Women",
    logo: tieWomenLogo,
    description: "Empowering women entrepreneurs through mentorship and global networking.",
    href: "https://www.tiewomen.org/",
  },
  {
    name: "Young Indians",
    logo: youngIndiansLogo,
    description: "Youth-driven initiative by CII fostering leadership and entrepreneurship.",
    href: "https://youngindians.net/",
  },
  {
    name: "TiE-U",
    logo: tieULogo,
    description: "University-focused TiE initiative nurturing student startups and innovation.",
    href: "#",
  },
  {
    name: "Sandhya Aqua",
    logo: sandhyaAquaLogo,
    description: "Aquaculture enterprise driving sustainable farming and seafood innovation.",
    href: "#",
  },
  {
    name: "Purdue University",
    logo: purudeLogo,
    description: "Global research university partnering in technology and innovation programs.",
    href: "https://www.purdue.edu/",
  },
  {
    name: "ACIR",
    logo: acirLogo,
    description: "Research and innovation center driving collaborative industry partnerships.",
    href: "#",
  },
  {
    name: "Wageningen",
    logo: wageningenLogo,
    description: "World-renowned university for life sciences, agriculture, and food innovation.",
    href: "https://www.wur.nl/",
  },
  {
    name: "PBL Transport",
    logo: pblTransportLogo,
    description: "Logistics and transport solutions supporting efficient supply chain operations.",
    href: "#",
  },
];
