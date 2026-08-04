import { usePageVisibility as useQueryPageVisibility } from "@/hooks/usePublicContent";

const PATH_TO_KEY_MAP: Record<string, string> = {
  "/about/vision-roadmap": "approach_vision_roadmap",
  "/approach/operational-model": "approach_operational_model",
  "/startups/startup-portfolio": "aspire_startup_portfolio",
  "/ecosystem/infrastructure": "aspire_infrastructure",
  "/ecosystem/partners": "aspire_partners",
  "/events/startups-events": "aspire_startup_events",
  "/programs/join-us": "associate_join_us",
  "/programs/pitch-to-us": "associate_pitch_to_us",
  "/startups/startup-funding": "associate_startup_funding",
  "/achieve/impact": "achieve_impact",
  "/about/rewards": "achieve_rewards",
  "/achieve/reports": "achieve_reports",
  "/about/press": "announcement_press",
  "/events/case-studies": "announcement_case_studies",
  "/events/calendar": "announcement_events_calendar",
  "/startups/blog": "announcement_startup_blogs",
  "/events/event-registration": "announcement_event_registration",
  "/startups/startup-registration": "announcement_startup_registration",
  "/students/internship-registration": "announcement_internship_registration",
  "/about/mentors": "about_mentors",
  "/about/board": "about_board",
  "/about/team": "about_team",
};

export function usePageVisibilityHelper() {
  const { data } = useQueryPageVisibility();

  const isVisible = (pageKeyOrPath: string): boolean => {
    if (!data) return true; // Default to visible before data loads or if API fails
    
    // Resolve key from path if path is passed
    const pageKey = PATH_TO_KEY_MAP[pageKeyOrPath] || pageKeyOrPath;
    
    const match = data.find((item: any) => item.page_key === pageKey);
    return match ? match.is_visible : true;
  };

  return { isVisible, loading: !data };
}
