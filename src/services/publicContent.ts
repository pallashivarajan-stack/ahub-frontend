import { API_BASE_URL } from "@/lib/media";
import { resolveBackendMediaUrl } from "@/lib/media";
import { PUBLIC_CONTENT_ENDPOINTS } from "@/services/publicContentEndpoints";

async function fetchPublic<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch {
    return null;
  }
}

/** Map backend portfolio row → frontend portfolio card shape (same as PortfolioCompanies) */
export function mapPortfolioFromApi(item: Record<string, unknown>) {
  return {
    startup: String(item.company_name ?? item.startup ?? ""),
    industry: String(item.tag ?? item.industry ?? ""),
    category: String(item.tag ?? item.category ?? "").toUpperCase(),
    desc: String(item.description ?? item.desc ?? ""),
    achievements: Array.isArray(item.achievements)
      ? (item.achievements as string[])
      : ["AI Powered", "Incubated", "Innovator"],
    funding: item.funding ? String(item.funding) : undefined,
    logo: resolveBackendMediaUrl(String(item.logo_image ?? item.logo ?? "")),
    founder: String(item.founder_name ?? item.founder ?? ""),
    founderTitle: String(item.founder_designation ?? item.founderTitle ?? ""),
    founderImage: resolveBackendMediaUrl(
      String(item.founder_image ?? item.founderImage ?? ""),
    ),
    websiteUrl: item.website_url
      ? String(item.website_url)
      : item.websiteUrl
        ? String(item.websiteUrl)
        : undefined,
  };
}

/** Map backend event row → homepage events marquee shape */
export function mapEventFromApi(item: Record<string, unknown>) {
  return {
    title: String(item.title ?? ""),
    date: String(item.date ?? ""),
    tag: String(item.tag ?? ""),
    desc: String(item.description ?? item.desc ?? ""),
    img: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? item.img ?? "")),
    imageFetchUrl: resolveBackendMediaUrl(
      String(item.image_url ?? item.image ?? item.img ?? ""),
    ),
  };
}

/** Map backend team member row → TeamMember shape */
export function mapTeamMemberFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    title: String(item.title ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? "")),
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
  };
}

export async function fetchPublicPortfolio() {
  const data = await fetchPublic<Record<string, unknown>[]>(
    PUBLIC_CONTENT_ENDPOINTS.portfolio,
  );
  if (!data?.length) return null;
  return data.map(mapPortfolioFromApi);
}

export async function fetchPublicEvents() {
  const data = await fetchPublic<Record<string, unknown>[]>(
    PUBLIC_CONTENT_ENDPOINTS.events,
  );
  if (!data?.length) return null;
  return data.map(mapEventFromApi);
}

export async function fetchPublicTeam() {
  const data = await fetchPublic<Record<string, unknown>[]>(
    PUBLIC_CONTENT_ENDPOINTS.team,
  );
  if (!data?.length) return null;
  return data.map(mapTeamMemberFromApi);
}

export async function fetchPublicContentSeed() {
  return fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.contentSeed);
}

export function mapHeroFromApi(item: Record<string, unknown>) {
  return {
    poster: item.poster ? resolveBackendMediaUrl(String(item.poster)) : undefined,
    video: item.video ? resolveBackendMediaUrl(String(item.video)) : undefined,
    heading: item.heading ? String(item.heading) : undefined,
    subheading: item.subheading ? String(item.subheading) : undefined,
  };
}

export function mapIncubatorFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    tagline: String(item.tagline ?? ""),
    short: String(item.short ?? ""),
    long: String(item.long ?? ""),
    blurb: String(item.blurb ?? ""),
    image: item.image ? resolveBackendMediaUrl(String(item.image)) : "",
    card: item.card ? resolveBackendMediaUrl(String(item.card)) : "",
    stats: Array.isArray(item.stats) ? item.stats : undefined,
  };
}

export function mapPartnerFromApi(item: Record<string, unknown>) {
  return resolveBackendMediaUrl(String(item.logo ?? item.image ?? item.url ?? ""));
}

export function mapSocialLinkFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    username: String(item.username ?? ""),
    description: String(item.description ?? ""),
    href: String(item.href ?? item.url ?? ""),
    iconName: String(item.icon ?? item.iconName ?? ""),
    accent: item.accent ? String(item.accent) : undefined,
    glow: item.glow ? String(item.glow) : undefined,
    testimonial: item.testimonial ? item.testimonial : undefined,
  };
}

export async function fetchPublicHero() {
  const data = await fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.hero);
  if (!data) return null;
  return mapHeroFromApi(data);
}

export async function fetchPublicIncubators() {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.incubators);
  if (!data?.length) return null;
  return data.map(mapIncubatorFromApi);
}

export async function fetchPublicPartners() {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.partners);
  if (!data?.length) return null;
  return data.map(mapPartnerFromApi);
}

export async function fetchPublicSocialLinks() {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.socialLinks);
  if (!data?.length) return null;
  return data.map(mapSocialLinkFromApi);
}
