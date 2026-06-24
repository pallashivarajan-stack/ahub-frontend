export type InvestorItem = {
  name: string;
  org: string;
  role: string;
  description: string;
  initials: string;
  href?: string;
};

export const marqueeInvestors: InvestorItem[] = [
  { name: "Sequoia India", org: "Sequoia", role: "Venture Capital", description: "Category-defining growth capital for ambitious founders.", initials: "SI" },
  { name: "Peak XV", org: "Peak XV", role: "Platform Partner", description: "Operator support across fundraising, hiring, and scaling.", initials: "PX" },
  { name: "Blume Ventures", org: "Blume", role: "Seed Partner", description: "Early conviction capital for emerging founders.", initials: "BV" },
  { name: "Accel", org: "Accel", role: "Venture Partner", description: "Global venture firm backing product-led startups.", initials: "AC" },
  { name: "Lightspeed", org: "Lightspeed", role: "Growth Capital", description: "Multi-stage investments in consumer and enterprise.", initials: "LS" },
  { name: "Matrix Partners", org: "Matrix", role: "Seed & Series A", description: "Partnering with founders from day zero.", initials: "MP" },
  { name: "AHUB Angel Circle", org: "AHUB", role: "Angel Syndicate", description: "Founders, operators, and alumni backing new ventures.", initials: "AA" },
  { name: "Matrix Partners", org: "Matrix", role: "Series A", description: "Partnering with founders from seed through scale.", initials: "MX" },
];

export const featuredInvestors: InvestorItem[] = [
  {
    name: "Sequoia India",
    org: "Growth Capital",
    role: "Venture Partner",
    description: "Long-horizon bets on category-defining founders building for India and the world.",
    initials: "SI",
    href: "https://www.sequoiacap.com/india/",
  },
  {
    name: "Peak XV",
    org: "Venture Capital",
    role: "Platform Partner",
    description: "Operator support across fundraising, hiring, and scaling for high-growth startups.",
    initials: "PX",
    href: "https://www.peakxv.com/",
  },
  {
    name: "Blume Ventures",
    org: "Seed & Pre-A",
    role: "Seed Partner",
    description: "Early conviction capital and mentorship for emerging founders at the pre-seed stage.",
    initials: "BV",
    href: "https://blume.vc/",
  },
  {
    name: "Accel",
    org: "Global VC",
    role: "Venture Partner",
    description: "Backing exceptional teams building transformative products from seed to scale.",
    initials: "AC",
    href: "https://www.accel.com/",
  },
  {
    name: "Lightspeed",
    org: "Multi-Stage VC",
    role: "Growth Partner",
    description: "Partnering with founders across consumer, enterprise, and deep-tech sectors.",
    initials: "LS",
    href: "https://lsvp.com/",
  },
  {
    name: "AHUB Angel Circle",
    org: "Network Capital",
    role: "Angel Syndicate",
    description: "Founders, operators, and alumni investors backing ventures from the AHUB ecosystem.",
    initials: "AA",
    href: "/programs/pitch-to-us",
  },
];
