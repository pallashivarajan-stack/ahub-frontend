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
    tagline: item.tagline ? String(item.tagline) : undefined,
    visitLink: item.visit_link ? String(item.visit_link) : item.visitLink ? String(item.visitLink) : undefined,
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
  };
}

/** Map backend team page metadata → TeamPageMeta shape */
export function mapTeamPageFromApi(item: Record<string, unknown>) {
  return {
    groupPhoto: resolveBackendMediaUrl(String(item.group_photo ?? item.groupPhoto ?? "")),
    title: String(item.title ?? ""),
    subtitle: String(item.subtitle ?? ""),
    description: String(item.description ?? ""),
    memberCountLabel: String(item.member_count_label ?? item.memberCountLabel ?? ""),
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

export async function fetchPublicTeamPage() {
  const data = await fetchPublic<Record<string, unknown>>(
    PUBLIC_CONTENT_ENDPOINTS.teamPage,
  );
  if (!data) return null;
  return mapTeamPageFromApi(data);
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
  return resolveBackendMediaUrl(String(item.logo_url ?? item.logo ?? item.image ?? item.url ?? ""));
}

/** Map backend partner item → frontend PartnerItem shape (marquee / popular) */
export function mapPartnerItemFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    logo: resolveBackendMediaUrl(String(item.logo_url ?? "")),
    description: String(item.description ?? ""),
    href: item.website_url ? String(item.website_url) : undefined,
  };
}

export async function fetchPublicPartnerItems() {
  const data = await fetchPublic<Record<string, unknown>[]>(
    PUBLIC_CONTENT_ENDPOINTS.partnerItems,
  );
  if (!data?.length) return null;
  const all = data.map(mapPartnerItemFromApi);
  return { marqueePartners: all };
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

export async function fetchPublicStartupsTicker() {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.startupsTicker);
  if (!data?.length) return null;
  // We can reuse mapPartnerFromApi since the ticker is also just a list of logos
  return data.map(mapPartnerFromApi);
}

export async function fetchPublicGenericData(endpoint: string) {
  const data = await fetchPublic<any>(endpoint);
  return data ?? null;
}

export function mapMentorFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    title: String(item.title ?? ""),
    organization: String(item.company ?? item.organization ?? item.org ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? "")),
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
    tags: Array.isArray(item.tags) ? item.tags : undefined,
  };
}

export function mapBoardMemberFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    title: String(item.title ?? ""),
    bio: String(item.bio ?? item.description ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? "")),
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
  };
}

export function mapVisitorFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    role: String(item.role ?? item.title ?? ""),
    org: String(item.org ?? item.organization ?? item.company ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? "")),
  };
}

export function mapStatisticFromApi(item: Record<string, unknown>) {
  return {
    label: String(item.label ?? item.title ?? ""),
    value: String(item.value ?? item.count ?? ""),
  };
}

export function mapImpactMetricFromApi(item: Record<string, unknown>) {
  return {
    id: String(item.id ?? ""),
    value: String(item.value ?? ""),
    label: String(item.label ?? ""),
    subLabel: item.sub_label ? String(item.sub_label) : item.subLabel ? String(item.subLabel) : undefined,
  };
}

export function mapStartupEventFromApi(item: Record<string, unknown>) {
  return {
    id: String(item.id ?? ""),
    title: String(item.title ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? item.image ?? "")),
    logo: item.logo_url ? resolveBackendMediaUrl(String(item.logo_url)) : String(item.logo ?? ""),
    date: {
      month: String(item.month ?? "").toUpperCase(),
      day: String(item.day ?? ""),
      year: String(item.year ?? ""),
    },
    type: String(item.type ?? ""),
    category: String(item.category ?? "all") as "workshops" | "webinars" | "hackathons" | "networking" | "pitch sessions" | "demo days" | "all",
    location: String(item.location ?? ""),
    time: String(item.time ?? ""),
    description: String(item.description ?? ""),
    status: String(item.status ?? "Upcoming") as "Upcoming" | "Live" | "Completed",
    speakers: Array.isArray(item.speakers) ? item.speakers.map(mapSpeakerFromApi) : undefined,
    detailedDescription: item.detailed_description ? String(item.detailed_description) : item.detailedDescription ? String(item.detailedDescription) : undefined,
  };
}

export function mapSpeakerFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    role: String(item.role ?? ""),
    avatar: resolveBackendMediaUrl(String(item.avatar_url ?? item.image_url ?? item.avatar ?? "")),
  };
}

export function mapStudentDashboardFromApi(item: Record<string, unknown>) {
  return {
    startups: Array.isArray(item.startups) ? item.startups.map(mapStartupOpportunityFromApi) : [],
    roadmap: Array.isArray(item.roadmap) ? item.roadmap.map(mapRoadmapStepFromApi) : [],
  };
}

export function mapStartupOpportunityFromApi(item: Record<string, unknown>) {
  return {
    id: String(item.id ?? ""),
    name: String(item.name ?? ""),
    role: String(item.role ?? ""),
    duration: String(item.duration ?? ""),
    stipend: String(item.stipend ?? ""),
    locationType: String(item.location_type ?? item.locationType ?? "Remote") as "Remote" | "Hybrid" | "On-site",
    logoUrl: resolveBackendMediaUrl(String(item.logo_url ?? item.logo ?? "")),
  };
}

export function mapRoadmapStepFromApi(item: Record<string, unknown>) {
  return {
    id: String(item.id ?? ""),
    title: String(item.title ?? ""),
    date: String(item.date ?? ""),
    desc: String(item.desc ?? item.description ?? ""),
    status: String(item.status ?? "upcoming") as "completed" | "upcoming",
  };
}

export const fetchPublicMentors = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.mentors);
  return data?.length ? data.map(mapMentorFromApi) : null;
};
export const fetchPublicBoard = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.board);
  return data?.length ? data.map(mapBoardMemberFromApi) : null;
};
export const fetchPublicStatistics = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.statistics);
  return data?.length ? data.map(mapStatisticFromApi) : null;
};
export const fetchPublicInfrastructure = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.infrastructure);
export function mapStartupPortfolioFromApi(data: Record<string, unknown>) {
  if (!data) return null;
  const directory = ((data.startupDirectory ?? []) as any[]).map((s: any) => ({
    id: String(s.id ?? ""),
    name: String(s.name ?? ""),
    logo: resolveBackendMediaUrl(s.logo),
    category: String(s.category ?? ""),
    industry: String(s.industry ?? ""),
    founded: Number(s.founded ?? 0),
    fundingStage: String(s.fundingStage ?? ""),
    description: String(s.description ?? ""),
    website: s.website ? String(s.website) : undefined,
    popularity: Number(s.popularity ?? 0),
    addedOrder: Number(s.addedOrder ?? 0),
  }));
  const marquee = ((data.logoMarquee ?? []) as any[]).map((m: any) => ({
    name: String(m.name ?? ""),
    logo: resolveBackendMediaUrl(m.logo),
  }));
  return {
    startupDirectory: directory,
    logoMarquee: marquee,
    categories: Array.isArray(data.categories) ? data.categories as string[] : ["All"],
    fundingStages: Array.isArray(data.fundingStages) ? data.fundingStages as string[] : ["All"],
    industries: Array.isArray(data.industries) ? data.industries as string[] : ["All"],
  };
}

export const fetchPublicStartupPortfolio = async () => {
  const data = await fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.startupPortfolio);
  return data ? mapStartupPortfolioFromApi(data) : null;
};
export const fetchPublicEventsCalendar = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.eventsCalendar);
export const fetchPublicVisionRoadmap = async () => {
  const data = await fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.visionRoadmap);
  if (!data) return null;
  return {
    visionData: ((data.visionData ?? []) as any[]).map((v: any) => ({
      ...v,
      image: resolveBackendMediaUrl(v.image),
    })),
    roadmapData: {
      ...(data.roadmapData as any),
      image: resolveBackendMediaUrl((data.roadmapData as any)?.image),
    },
    timelineYears: ((data.timelineYears ?? []) as any[]).map((t: any) => ({
      ...t,
      image: resolveBackendMediaUrl(t.image),
    })),
  };
};
export const fetchPublicWhatWeDo = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.whatWeDo);
export const fetchPublicStudentDashboard = async () => {
  const data = await fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.studentDashboard);
  if (!data) return null;
  const mapped = mapStudentDashboardFromApi(data);
  if (!mapped.startups.length && !mapped.roadmap.length) return null;
  return mapped;
};
export const fetchPublicStartupEvents = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.startupEvents);
  if (!data?.length) return null;
  return data.map(mapStartupEventFromApi);
};
export const fetchPublicRewards = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.rewards);
export const fetchPublicInternshipRegistration = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.internshipRegistration);
export const fetchPublicInternshipCalendar = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.internshipCalendar);
export const fetchPublicInstitutionsClubs = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.institutionsClubs);
export const fetchPublicStartupBlog = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.startupBlog);
export const fetchPublicStartupFunding = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.startupFunding);
export const fetchPublicInvestors = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.investors);
export const fetchPublicAhubNetwork = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.ahubNetwork);
export const fetchPublicDistinguishedVisitors = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.distinguishedVisitors);
  return data?.length ? data.map(mapVisitorFromApi) : null;
};
export const fetchPublicPartnersPage = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.partnersPage);
export const fetchPublicImpact = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.impact);
  if (!data?.length) return null;
  return data.map(mapImpactMetricFromApi);
};
export const fetchPublicOperationalModel = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.operationalModel);
export const fetchPublicJoinUs = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.joinUs);
export const fetchPublicPitchToUs = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.pitchToUs);
export const fetchPublicStartupRegistration = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.startupRegistration);

export function mapCaseStudyFromApi(item: Record<string, unknown>) {
  const title = String(item.title ?? "");
  const companyMatch = title.match(/^([^:]+)/);
  return {
    number: String(item.id ?? "").padStart(2, "0"),
    company: companyMatch ? companyMatch[1].trim().toUpperCase() : title,
    title,
    category: "",
    description: String(item.description ?? ""),
    image: resolveBackendMediaUrl(String(item.image_url ?? "")),
    url: String(item.visit_link ?? item.url ?? ""),
    stats: [],
  };
}

export const fetchPublicCaseStudies = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.caseStudies);
  return data?.length ? data.map(mapCaseStudyFromApi) : null;
};

export function mapPressFromApi(item: Record<string, unknown>) {
  return {
    title: String(item.title ?? ""),
    date: String(item.date ?? ""),
    url: String(item.url ?? ""),
    description: String(item.description ?? ""),
    source: String(item.source ?? ""),
    tag: String(item.tag ?? ""),
  };
}

export function mapPressPageFromApi(item: Record<string, unknown>) {
  return {
    heading: String(item.heading ?? "Press"),
    subheading: String(item.subheading ?? ""),
  };
}

export const fetchPublicPress = async () => {
  const data = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.press);
  return data?.length ? data.map(mapPressFromApi) : null;
};

export const fetchPublicPressPage = async () => {
  const data = await fetchPublic<Record<string, unknown>>(PUBLIC_CONTENT_ENDPOINTS.pressPage);
  return data ? mapPressPageFromApi(data) : null;
};
