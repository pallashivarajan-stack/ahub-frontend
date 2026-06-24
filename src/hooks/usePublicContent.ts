import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicEvents,
  fetchPublicPortfolio,
  fetchPublicTeam,
  fetchPublicHero,
  fetchPublicIncubators,
  fetchPublicPartners,
  fetchPublicSocialLinks,
} from "@/services/publicContent";
import { portfolio as staticPortfolio, events as staticEvents } from "@/data";
import { teamMembers as staticTeam } from "@/data/teamPage";

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

export function usePublicTeam() {
  return useQuery({
    queryKey: ["public", "team"],
    queryFn: async () => {
      const data = await fetchPublicTeam();
      return data?.length ? data : staticTeam;
    },
    staleTime: 60_000,
    placeholderData: staticTeam,
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
