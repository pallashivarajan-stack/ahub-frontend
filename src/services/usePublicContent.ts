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
  fetchPublicRewards,
  fetchPublicInternshipRegistration,
  fetchPublicInternshipCalendar,
  fetchPublicInstitutionsClubs,
  fetchPublicStartupBlog,
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
} from "@/services/publicContent";
import { portfolio as staticPortfolio, events as staticEvents } from "@/data";

/* ── Specialised hooks (custom fallback logic) ─────────────────────────── */

/** Portfolio with static fallback — UI receives identical shape either way */
export function usePublicPortfolio() {
  return useQuery({
    queryKey: ["public", "portfolio"],
    queryFn: async () => {
      const data = await fetchPublicPortfolio();
      return data?.length ? data : staticPortfolio;
    },
    staleTime: 60_000,
    placeholderData: staticPortfolio,
  });
}

export function usePublicEvents() {
  return useQuery({
    queryKey: ["public", "events"],
    queryFn: async () => {
      const data = await fetchPublicEvents();
      return data?.length ? data : staticEvents;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data?.length ? (data as any) : fallbackData;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data?.length ? (data as any) : fallbackData;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data?.length ? (data as any) : fallbackData;
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
export const usePublicRewards = <T>(fallbackData: T) => useGenericPublicContent("rewards", fetchPublicRewards, fallbackData);
export const usePublicInternshipRegistration = <T>(fallbackData: T) => useGenericPublicContent("internshipRegistration", fetchPublicInternshipRegistration, fallbackData);
export const usePublicInternshipCalendar = <T>(fallbackData: T) => useGenericPublicContent("internshipCalendar", fetchPublicInternshipCalendar, fallbackData);
export const usePublicInstitutionsClubs = <T>(fallbackData: T) => useGenericPublicContent("institutionsClubs", fetchPublicInstitutionsClubs, fallbackData);
export const usePublicStartupBlog = <T>(fallbackData: T) => useGenericPublicContent("startupBlog", fetchPublicStartupBlog, fallbackData);
export const usePublicStartupFunding = <T>(fallbackData: T) => useGenericPublicContent("startupFunding", fetchPublicStartupFunding, fallbackData);
export const usePublicInvestors = <T>(fallbackData: T) => useGenericPublicContent("investors", fetchPublicInvestors, fallbackData);
export const usePublicAhubNetwork = <T>(fallbackData: T) => useGenericPublicContent("ahubNetwork", fetchPublicAhubNetwork, fallbackData);
export const usePublicDistinguishedVisitors = <T>(fallbackData: T) => useGenericPublicContent("distinguishedVisitors", fetchPublicDistinguishedVisitors, fallbackData);
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
