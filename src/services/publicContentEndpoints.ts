/**
 * Public read-only API endpoints for the backend (FastAPI).
 * Backend developer: implement these GET routes; frontend falls back to static data when unavailable.
 */
export const PUBLIC_CONTENT_ENDPOINTS = {
  portfolio: "/api/public/portfolio-companies",
  events: "/api/public/events",
  team: "/api/public/team",
  mentors: "/api/public/mentors",
  board: "/api/public/board",
  partners: "/api/public/partners",
  incubators: "/api/public/incubators",
  statistics: "/api/public/statistics",
  hero: "/api/public/hero",
  socialLinks: "/api/public/social-links",
  awards: "/api/public/awards",
  infrastructure: "/api/public/infrastructure",
  startupPortfolio: "/api/public/startup-portfolio",
  startupsTicker: "/api/public/startups-ticker",
  eventsCalendar: "/api/public/events-calendar",
  visionRoadmap: "/api/public/vision-roadmap",
  whatWeDo: "/api/public/what-we-do",
  studentDashboard: "/api/public/student-dashboard",
  startupEvents: "/api/public/startup-events-list",
  startupEventsCollage: "/api/public/startup-events-collage",
  rewards: "/api/public/rewards",
  internshipRegistration: "/api/public/internship-registration",
  internshipCalendar: "/api/public/internship-calendar",
  institutionsClubs: "/api/public/institutions-clubs",
  startupBlog: "/api/public/startup-blog",
  startupFunding: "/api/public/startup-funding",
  investors: "/api/public/investors",
  ahubNetwork: "/api/public/ahub-network",
  distinguishedVisitors: "/api/public/distinguished-visitors",
  partnersPage: "/api/public/partners-page",
  partnerItems: "/api/public/partner-items",
  impact: "/api/public/impact",
  operationalModel: "/api/public/operational-model",
  joinUs: "/api/public/join-us",
  joinUsConfig: "/api/public/join-us/config",
  pitchToUs: "/api/public/pitch-to-us",
  startupRegistration: "/api/public/startup-registration",
  /** Team page metadata (title, subtitle, description, group photo) */
  teamPage: "/api/public/team-page",
  /** Full seed dump — optional convenience endpoint for DB import */
  contentSeed: "/api/public/content-seed",
  /** Single file: GET /api/public/media/{category}/{filename} */
  media: "/api/public/media",
  /** Case studies */
  caseStudies: "/api/public/case-studies",
  /** Press / media coverage */
  press: "/api/public/press",
  /** Press page metadata */
  pressPage: "/api/public/press-page",
  /** Reports — startup reports and AHUB reports */
  reports: "/api/public/reports",
  /** Internship listings from dedicated table */
  internshipListings: "/api/public/internship-listings",
} as const;

export type PublicContentKey = keyof typeof PUBLIC_CONTENT_ENDPOINTS;
