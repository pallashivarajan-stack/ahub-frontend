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
  eventsCalendar: "/api/public/events-calendar",
  visionRoadmap: "/api/public/vision-roadmap",
  /** Full seed dump — optional convenience endpoint for DB import */
  contentSeed: "/api/public/content-seed",
  /** Single file: GET /api/public/media/{category}/{filename} */
  media: "/api/public/media",
} as const;

export type PublicContentKey = keyof typeof PUBLIC_CONTENT_ENDPOINTS;
