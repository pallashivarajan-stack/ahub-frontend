/**
 * Public content React Query hooks.
 * Each hook fetches from the backend API and falls back to static data when the API is unavailable.
 *
 * Architecture:
 *   publicContentEndpoints.ts  →  publicContent.ts  →  usePublicContent.ts  →  Section Components
 */
import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicEvents,
  fetchPublicPortfolio,
  fetchPublicHero,
  fetchPublicIncubators,
  fetchPublicPartners,
  fetchPublicSocialLinks,
  fetchPublicStartupsTicker,
  fetchPublicTeam,
  fetchPublicTeamPage,
  fetchPublicMentors,
  fetchPublicBoard,
  fetchPublicStatistics,
  fetchPublicInfrastructure,
  fetchPublicStartupPortfolio,
  fetchPublicEventsCalendar,
  fetchPublicVisionRoadmap,
  fetchPublicWhatWeDo,
  fetchPublicStudentDashboard,
  fetchPublicStartupEvents,
  fetchPublicStartupEventsCollage,
  fetchPublicRewards,
  fetchPublicInternshipRegistration,
  fetchPublicInternshipCalendar,
  fetchPublicInstitutionsClubs,
  fetchPublicStartupBlog,
  fetchPublicReports,
  fetchPublicStartupFunding,
  fetchPublicInvestors,
  fetchPublicAhubNetwork,
  fetchPublicDistinguishedVisitors,
  fetchPublicPartnersPage,
  fetchPublicImpact,
  fetchPublicOperationalModel,
  fetchPublicJoinUs,
  fetchPublicPitchToUs,
  fetchPublicStartupRegistration,
  fetchPublicCaseStudies,
  fetchPublicPress,
  fetchPublicPressPage,
  fetchPublicPartnerItems,
  fetchPublicInternshipListings,
  resolveSafeMediaUrl,
  fetchPageVisibility,
} from "@/services/publicContent";
import { portfolio as staticPortfolio, events as staticEvents } from "@/data";

/* ── Specialised hooks (custom fallback logic) ─────────────────────────── */

/** Portfolio — always shows exactly the 5 fixed companies.
 *  DB entries override their matching static slot by name; defaults fill remaining slots. */
export function usePublicPortfolio() {
  return useQuery({
    queryKey: ["public", "portfolio"],
    queryFn: async () => {
      const data = await fetchPublicPortfolio();
      // Build a lookup from DB data by startup name (lowercase)
      const dbByName = new Map(
        (data || []).map((d: any) => [String(d.startup ?? "").toLowerCase().trim(), d])
      );
      // For each of the 5 fixed slots, use DB version if available, else static default
      return (staticPortfolio as any[]).map((s: any) => {
        const slotKey = String(s.startup ?? "").toLowerCase().trim();
        const match = dbByName.get(slotKey);
        const _slotId = slotKey.replace(/\s+/g, "");

        if (!match) {
          return { ...s, _slotId };
        }

        // Merge match into s, only overriding properties that are actually set in match
        const merged = { ...s, _slotId };
        if (match.startup) merged.startup = match.startup;
        if (match.industry) merged.industry = match.industry;
        if (match.category) merged.category = match.category;
        if (match.desc) merged.desc = match.desc;
        if (match.funding) merged.funding = match.funding;
        if (match.logo) merged.logo = match.logo;
        if (match.founder) merged.founder = match.founder;
        if (match.founderTitle) merged.founderTitle = match.founderTitle;
        if (match.founderImage) merged.founderImage = match.founderImage;
        if (match.website) merged.website = match.website;
        if (match.websiteUrl) merged.websiteUrl = match.websiteUrl;
        if (match.stats) merged.stats = match.stats;
        return merged;
      });
    },
    staleTime: 60_000,
    placeholderData: staticPortfolio.map(s => ({
      ...s,
      _slotId: String(s.startup ?? "").toLowerCase().trim().replace(/\s+/g, "")
    })),
  });
}

export function usePublicEvents() {
  return useQuery({
    queryKey: ["public", "events"],
    queryFn: async () => {
      const data = await fetchPublicEvents();
      if (data?.length) return data;
      const admin = getAdminLocalStorage<any[]>(ADMIN_LATEST_EVENTS_KEY);
      if (admin?.length) return admin;
      return staticEvents;
    },
    staleTime: 60_000,
    placeholderData: staticEvents,
  });
}

export function usePublicHero<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "hero"],
    queryFn: async () => {
      const data = await fetchPublicHero();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data ? (data as any) : fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicIncubators<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "incubators"],
    queryFn: async () => {
      const data = await fetchPublicIncubators();
      
      // If we don't have an array as fallback (e.g. initial render weirdness), just return data
      if (!Array.isArray(fallbackData)) {
        return data?.length ? (data as any) : fallbackData;
      }

      // Build a lookup from DB data by incubator heading (name)
      const dbByName = new Map(
        (data || []).map((d: any) => [String(d.name ?? "").toLowerCase().trim(), d])
      );

      const fixedNames = new Set(
        fallbackData.map((s: any) => String(s.name ?? "").toLowerCase().trim())
      );

      const mergeDbMatch = (base: any, match: any) => {
        const merged = { ...base };
        if (match.name) merged.name = match.name;
        if (match.tagline) merged.tagline = match.tagline;
        if (match.image) merged.image = match.image;
        if (match.short) merged.short = match.short;
        if (match.long) merged.long = match.long;
        if (match.blurb) merged.blurb = match.blurb;
        if (match.card) merged.card = match.card;
        if (match.stats) merged.stats = match.stats;
        return merged;
      };

      const mergedFixed = fallbackData.map((s: any) => {
        const slotKey = String(s.name ?? "").toLowerCase().trim();
        const match = dbByName.get(slotKey);
        return match ? mergeDbMatch(s, match) : s;
      });

      const customItems = (data || [])
        .filter((d: any) => !fixedNames.has(String(d.name ?? "").toLowerCase().trim()))
        .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((d: any) => ({
          name: d.name ?? "",
          tagline: d.tagline ?? "",
          short: d.short ?? "",
          long: d.long ?? "",
          blurb: d.blurb ?? "",
          image: d.image ?? "",
          card: d.card ?? d.image ?? "",
          stats: d.stats ?? [],
        }));

      return [...mergedFixed, ...customItems];
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicPartners<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "partners"],
    queryFn: async () => {
      const data = await fetchPublicPartners();
      if (data?.length) return data as any;
      const admin = getAdminLocalStorage<string[]>(ADMIN_PARTNERS_LOGOS_KEY);
      if (admin?.length) return admin as any;
      return fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicSocialLinks<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "socialLinks"],
    queryFn: async () => {
      const data = await fetchPublicSocialLinks();
      if (data?.length) return data as any;
      const admin = getAdminLocalStorage<any[]>(ADMIN_SOCIAL_LINKS_KEY);
      if (admin?.length) return admin as any;
      return fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicStartupsTicker<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "startupsTicker"],
    queryFn: async () => {
      const data = await fetchPublicStartupsTicker();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data?.length ? (data as any) : fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

/* ── Generic helper ────────────────────────────────────────────────────── */

function useGenericPublicContent<T>(key: string, fetcher: () => Promise<any>, fallbackData: T) {
  return useQuery({
    queryKey: ["public", key],
    queryFn: async () => {
      const data = await fetcher();
      return data ?? fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

function getAdminLocalStorage<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return null;
}

const ADMIN_MENTORS_KEY = "ahub_admin_mentors_data";
const ADMIN_TEAM_KEY = "ahub_admin_team_data";
const ADMIN_INFRASTRUCTURE_KEY = "ahub_admin_infrastructure_data";
const ADMIN_LATEST_EVENTS_KEY = "ahub_admin_latest_events_data";
const ADMIN_PARTNERS_LOGOS_KEY = "ahub_admin_partners_logos_data";
const ADMIN_MESH_NETWORK_KEY = "ahub_admin_mesh_network_data";
const ADMIN_ASSOCIATED_WITH_KEY = "ahub_admin_associated_with_data";
const ADMIN_VISITORS_KEY = "ahub_admin_visitors_data";
const ADMIN_SOCIAL_LINKS_KEY = "ahub_admin_social_links_data";
const ADMIN_TESTIMONIALS_KEY = "ahub_admin_testimonials_data";

/* ── Generic-based hooks ───────────────────────────────────────────────── */

export const usePublicMentors = <T>(fallbackData: T) =>
  useGenericPublicContent("mentors", async () => {
    const data = await fetchPublicMentors();
    if (data) return data;
    const admin = getAdminLocalStorage<T>(ADMIN_MENTORS_KEY);
    return admin ?? fallbackData;
  }, fallbackData);

export const usePublicTeam = <T>(fallbackData: T) =>
  useGenericPublicContent("team", async () => {
    const data = await fetchPublicTeam();
    if (data) return data;
    const stored = getAdminLocalStorage<{ meta: unknown; members: T }>(ADMIN_TEAM_KEY);
    if (stored?.members) return stored.members;
    return fallbackData;
  }, fallbackData);

export const usePublicTeamPage = <T>(fallbackData: T) =>
  useGenericPublicContent("teamPage", async () => {
    const data = await fetchPublicTeamPage();
    if (data) return data;
    const stored = getAdminLocalStorage<{ meta: T; members: unknown }>(ADMIN_TEAM_KEY);
    if (stored?.meta) return stored.meta;
    return fallbackData;
  }, fallbackData);
export const usePublicBoard = <T>(fallbackData: T) => useGenericPublicContent("board", fetchPublicBoard, fallbackData);
export const usePublicStatistics = <T>(fallbackData: T) => useGenericPublicContent("statistics", fetchPublicStatistics, fallbackData);
export const usePublicInfrastructure = <T extends Record<string, unknown>>(fallbackData: T) =>
  useGenericPublicContent("infrastructure", async () => {
    const data = await fetchPublicInfrastructure();
    if (data) return { ...fallbackData, ...data } as T;
    const stored = getAdminLocalStorage<Record<string, string>>(ADMIN_INFRASTRUCTURE_KEY);
    if (stored?.hero) {
      const merged = { ...fallbackData } as Record<string, unknown>;
      const imgKey = "infrastructureImages" as const;
      const currentImages = (merged[imgKey] ?? {}) as Record<string, string>;
      merged[imgKey] = { ...currentImages, ...stored };
      return merged as T;
    }
    return fallbackData;
  }, fallbackData);
export const usePublicStartupPortfolio = <T>(fallbackData: T) => useGenericPublicContent("startupPortfolio", fetchPublicStartupPortfolio, fallbackData);
export const usePublicEventsCalendar = <T>(fallbackData: T) => useGenericPublicContent("eventsCalendar", fetchPublicEventsCalendar, fallbackData);
export const usePublicVisionRoadmap = <T>(fallbackData: T) => useGenericPublicContent("visionRoadmap", fetchPublicVisionRoadmap, fallbackData);
export const usePublicWhatWeDo = <T>(fallbackData: T) => useGenericPublicContent("whatWeDo", fetchPublicWhatWeDo, fallbackData);
export const usePublicStudentDashboard = <T>(fallbackData: T) => useGenericPublicContent("studentDashboard", fetchPublicStudentDashboard, fallbackData);
export const usePublicStartupEvents = <T>(fallbackData: T) => useGenericPublicContent("startupEvents", fetchPublicStartupEvents, fallbackData);
export const usePublicStartupEventsCollage = <T>(fallbackData: T) => useGenericPublicContent("startupEventsCollage", fetchPublicStartupEventsCollage, fallbackData);
export const usePublicRewards = <T>(fallbackData: T) => useGenericPublicContent("rewards", fetchPublicRewards, fallbackData);
export const usePublicInternshipRegistration = <T>(fallbackData: T) => useGenericPublicContent("internshipRegistration", fetchPublicInternshipRegistration, fallbackData);
export const usePublicInternshipCalendar = <T>(fallbackData: T) => useGenericPublicContent("internshipCalendar", fetchPublicInternshipCalendar, fallbackData);
export const usePublicInstitutionsClubs = <T>(fallbackData: T) => useGenericPublicContent("institutionsClubs", fetchPublicInstitutionsClubs, fallbackData);
export const usePublicStartupBlog = <T>(fallbackData: T) => useGenericPublicContent("startupBlog", fetchPublicStartupBlog, fallbackData);
export const usePublicReports = <T>(fallbackData: T) => useGenericPublicContent("reports", fetchPublicReports, fallbackData);
export const usePublicStartupFunding = <T>(fallbackData: T) => useGenericPublicContent("startupFunding", fetchPublicStartupFunding, fallbackData);
export const usePublicInvestors = <T>(fallbackData: T) => useGenericPublicContent("investors", fetchPublicInvestors, fallbackData);
export const usePublicAhubNetwork = <T>(fallbackData: T) => useGenericPublicContent("ahubNetwork", fetchPublicAhubNetwork, fallbackData);
export const usePublicDistinguishedVisitors = <T>(fallbackData: T) =>
  useGenericPublicContent("distinguishedVisitors", async () => {
    const data = await fetchPublicDistinguishedVisitors();
    if (data) return data as any;
    const admin = getAdminLocalStorage<T>(ADMIN_VISITORS_KEY);
    return admin ?? fallbackData;
  }, fallbackData);
export const usePublicPartnersPage = <T>(fallbackData: T) => useGenericPublicContent("partnersPage", fetchPublicPartnersPage, fallbackData);
export const usePublicImpact = <T>(fallbackData: T) => useGenericPublicContent("impact", fetchPublicImpact, fallbackData);
export const usePublicOperationalModel = <T>(fallbackData: T) => useGenericPublicContent("operationalModel", fetchPublicOperationalModel, fallbackData);
export const usePublicJoinUs = <T>(fallbackData: T) => useGenericPublicContent("joinUs", fetchPublicJoinUs, fallbackData);
export const usePublicPitchToUs = <T>(fallbackData: T) => useGenericPublicContent("pitchToUs", fetchPublicPitchToUs, fallbackData);
export const usePublicStartupRegistration = <T>(fallbackData: T) => useGenericPublicContent("startupRegistration", fetchPublicStartupRegistration, fallbackData);
export const usePublicCaseStudies = <T>(fallbackData: T) => useGenericPublicContent("caseStudies", fetchPublicCaseStudies, fallbackData);
export const usePublicPress = <T>(fallbackData: T) => useGenericPublicContent("press", fetchPublicPress, fallbackData);
export const usePublicPressPage = <T>(fallbackData: T) => useGenericPublicContent("pressPage", fetchPublicPressPage, fallbackData);
export const usePublicPartnerItems = <T>(fallbackData: T) => useGenericPublicContent("partnerItems", fetchPublicPartnerItems, fallbackData);
export function usePublicInternshipListings<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "internshipListings"],
    queryFn: async () => {
      const data = await fetchPublicInternshipListings();
      return data?.length ? data : fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicTestimonials<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "testimonials"],
    queryFn: async () => {
      const admin = getAdminLocalStorage<T>(ADMIN_TESTIMONIALS_KEY);
      return admin ?? fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicMeshNetwork<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "meshNetwork"],
    queryFn: async () => {
      const admin = getAdminLocalStorage<any[]>(ADMIN_MESH_NETWORK_KEY);
      if (admin?.length) return admin.map(a => resolveSafeMediaUrl(typeof a === 'string' ? a : (a.logo_url || a.image_url || a.image || ''))) as any;
      return fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePublicAssociatedWith<T>(fallbackData: T) {
  return useQuery({
    queryKey: ["public", "associatedWith"],
    queryFn: async () => {
      const admin = getAdminLocalStorage<any[]>(ADMIN_ASSOCIATED_WITH_KEY);
      if (admin?.length) return admin.map(a => resolveSafeMediaUrl(typeof a === 'string' ? a : (a.logo_url || a.image_url || a.image || ''))) as any;
      return fallbackData;
    },
    staleTime: 60_000,
    placeholderData: fallbackData,
  });
}

export function usePageVisibility() {
  return useQuery({
    queryKey: ["public", "pageVisibility"],
    queryFn: async () => {
      const data = await fetchPageVisibility();
      return data || [];
    },
    staleTime: 60_000,
  });
}

