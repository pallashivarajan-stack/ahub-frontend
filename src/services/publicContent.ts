import { API_BASE_URL, resolveBackendMediaUrl } from "@/lib/media";
import { resolveLegacyAsset } from "@/lib/assets";
import { PUBLIC_CONTENT_ENDPOINTS } from "@/services/publicContentEndpoints";

export function resolveSafeMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  const strPath = String(path);
  if (strPath.startsWith("/src/assets/")) {
    return resolveLegacyAsset(strPath);
  }
  return resolveBackendMediaUrl(strPath);
}

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
  let stats: any[] | undefined = undefined;
  if (item.linkedin_url && typeof item.linkedin_url === "string") {
    try {
      const parsed = JSON.parse(item.linkedin_url);
      if (Array.isArray(parsed)) {
        stats = parsed;
      }
    } catch {
      // not a json array
    }
  }

  return {
    startup: String(item.name ?? item.company_name ?? item.startup ?? ""),
    industry: String(item.industry ?? item.tag ?? ""),
    category: String(item.category ?? item.tag ?? item.industry ?? "").toUpperCase(),
    desc: String(item.short_description ?? item.description ?? item.desc ?? ""),
    achievements: Array.isArray(item.achievements)
      ? (item.achievements as string[])
      : [String(item.industry ?? "Innovator"), "Incubated", "AI Powered"],
    funding: item.funding_stage ? String(item.funding_stage) : item.funding ? String(item.funding) : undefined,
    logo: resolveSafeMediaUrl(String(item.logo_url ?? item.logo_image ?? item.logo ?? "")),
    founder: String(item.founder_name ?? item.founder ?? ""),
    founderTitle: String(item.founder_title ?? item.founder_designation ?? item.founderTitle ?? "Founder & CEO"),
    founderImage: resolveSafeMediaUrl(
      String(item.founder_image_url ?? item.founder_image ?? item.founderImage ?? ""),
    ),
    website: item.website_url
      ? String(item.website_url)
      : item.websiteUrl
        ? String(item.websiteUrl)
        : undefined,
    websiteUrl: item.website_url
      ? String(item.website_url)
      : item.websiteUrl
        ? String(item.websiteUrl)
        : undefined,
    stats,
  };
}

/** Map backend event row → homepage events marquee shape */
export function mapEventFromApi(item: Record<string, unknown>) {
  return {
    title: String(item.title ?? ""),
    date: String(item.date ?? ""),
    tag: String(item.tag ?? ""),
    desc: String(item.description ?? item.desc ?? ""),
    img: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? item.img ?? "")),
    imageFetchUrl: resolveSafeMediaUrl(
      String(item.image_url ?? item.image ?? item.img ?? ""),
    ),
  };
}

/** Map backend team member row → TeamMember shape */
export function mapTeamMemberFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    title: String(item.title ?? ""),
    image: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? "")),
    tagline: item.tagline ? String(item.tagline) : undefined,
    visitLink: item.visit_link ? String(item.visit_link) : item.visitLink ? String(item.visitLink) : undefined,
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
  };
}

/** Map backend team page metadata → TeamPageMeta shape */
export function mapTeamPageFromApi(item: Record<string, unknown>) {
  return {
    groupPhoto: resolveSafeMediaUrl(String(item.group_photo ?? item.groupPhoto ?? "")),
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
    poster: item.poster ? resolveSafeMediaUrl(String(item.poster)) : undefined,
    video: item.video ? resolveSafeMediaUrl(String(item.video)) : undefined,
    heading: item.heading ? String(item.heading) : undefined,
    subheading: item.subheading ? String(item.subheading) : undefined,
  };
}

export function mapIncubatorFromApi(item: Record<string, unknown>) {
  let short = String(item.short ?? "");
  let long = String(item.long ?? "");
  let blurb = String(item.blurb ?? "");
  let card = item.card ? resolveSafeMediaUrl(String(item.card)) : "";
  let stats = Array.isArray(item.stats) ? item.stats : undefined;

  if (item.description && typeof item.description === "string") {
    try {
      const parsed = JSON.parse(item.description);
      if (parsed.short) short = String(parsed.short);
      if (parsed.long) long = String(parsed.long);
      if (parsed.blurb) blurb = String(parsed.blurb);
      if (parsed.card) card = resolveSafeMediaUrl(String(parsed.card));
      if (Array.isArray(parsed.stats)) stats = parsed.stats;
    } catch {
      if (!short) short = String(item.description);
    }
  }

  const image = resolveSafeMediaUrl(String(item.image ?? item.image_url ?? ""));

  return {
    name: String(item.name ?? item.heading ?? ""),
    tagline: String(item.tagline ?? item.subheading ?? ""),
    short,
    long,
    blurb,
    image,
    card: card || image,
    stats,
    display_order: typeof item.display_order === "number" ? item.display_order : 0,
  };
}

export function mapPartnerFromApi(item: Record<string, unknown>) {
  return resolveSafeMediaUrl(String(item.logo_url ?? item.logo ?? item.image ?? item.url ?? ""));
}

/** Map backend partner item → frontend PartnerItem shape (marquee / popular) */
export function mapPartnerItemFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    logo: resolveSafeMediaUrl(String(item.logo_url ?? "")),
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
    embed: item.embed ? String(item.embed) : undefined,
    tweetUrl: item.tweetUrl ? String(item.tweetUrl) : item.tweet_url ? String(item.tweet_url) : undefined,
    instagramEmbed: item.instagramEmbed ? String(item.instagramEmbed) : item.instagram_embed ? String(item.instagram_embed) : undefined,
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
    image: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? "")),
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
    tags: Array.isArray(item.tags) ? item.tags : undefined,
  };
}

export function mapBoardMemberFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    title: String(item.title ?? ""),
    bio: String(item.bio ?? item.description ?? ""),
    image: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? "")),
    linkedIn: item.linked_in ? String(item.linked_in) : item.linkedIn ? String(item.linkedIn) : undefined,
  };
}

export function mapVisitorFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    role: String(item.role ?? item.title ?? ""),
    org: String(item.org ?? item.organization ?? item.company ?? ""),
    image: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? "")),
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
    image: resolveSafeMediaUrl(String(item.image_url ?? item.image ?? "")),
    logo: item.logo_url ? resolveSafeMediaUrl(String(item.logo_url)) : String(item.logo ?? ""),
    date: {
      month: String(item.month ?? "").toUpperCase(),
      day: String(item.day ?? ""),
      year: String(item.year ?? ""),
    },
    type: String(item.event_type ?? item.type ?? ""),
    category: String(item.category ?? "all") as "workshops" | "webinars" | "hackathons" | "networking" | "pitch sessions" | "demo days" | "all",
    location: String(item.location ?? ""),
    time: String(item.time ?? ""),
    description: String(item.description ?? ""),
    status: String(item.status ?? "Upcoming") as "Upcoming" | "Live" | "Completed",
    speakers: Array.isArray(item.speakers) ? item.speakers.map(mapSpeakerFromApi) : undefined,
    detailedDescription: item.detailed_description ? String(item.detailed_description) : item.detailedDescription ? String(item.detailedDescription) : undefined,
    instagramLink: item.instagram_link ? String(item.instagram_link) : item.instagramLink ? String(item.instagramLink) : undefined,
    featured: Boolean(item.featured ?? false),
    panelDetails: item.panel_details ? String(item.panel_details) : item.panelDetails ? String(item.panelDetails) : undefined,
    registrationLink: item.registration_link ? String(item.registration_link) : item.registrationLink ? String(item.registrationLink) : undefined,
  };
}

export function mapSpeakerFromApi(item: Record<string, unknown>) {
  return {
    name: String(item.name ?? ""),
    role: String(item.role ?? ""),
    avatar: resolveSafeMediaUrl(String(item.avatar_url ?? item.image_url ?? item.avatar ?? "")),
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
    logoUrl: resolveSafeMediaUrl(String(item.logo_url ?? item.logo ?? "")),
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
export const fetchPublicInfrastructure = async () => {
  // Backend returns an array of { section, label, image_url, display_order }
  const items = await fetchPublic<Record<string, unknown>[]>(PUBLIC_CONTENT_ENDPOINTS.infrastructure);
  if (!items?.length) return null;

  // Build a lookup by (section, label) -> resolved image URL
  const lookup = new Map<string, string>();
  for (const item of items) {
    const section = String(item.section ?? "");
    const label = String(item.label ?? "");
    const imageUrl = resolveSafeMediaUrl(String(item.image_url ?? ""));
    if (section && label && imageUrl) {
      lookup.set(`${section}::${label}`, imageUrl);
    }
  }

  const get = (section: string, label: string, fallback = "") =>
    lookup.get(`${section}::${label}`) || fallback;

  // Map to the infrastructureImages shape the frontend page expects
  const infrastructureImages = {
    hero: get("hero", "hero image"),
    collaborative: get("side", "Collaborative Environment"),
    conference: get("side", "Events & Community Spaces"),
    labs: get("side", "Advanced Research Facilities"),
    campus: get("side", "Facility Gallery"),
    galleryCoworking: get("gallery", "Coworking Space"),
    galleryStartupBays: get("gallery", "Startup Bays"),
    galleryEventHall: get("gallery", "Event Hall"),
    gallerySeminarRoom: get("gallery", "Seminar Room"),
    galleryInnovationLabs: get("gallery", "Innovation Labs"),
    masonryCampus: get("masonry", "AHUB Campus"),
    masonryIoT: get("masonry", "IoT & Robotics Lab"),
    masonryCollaborative: get("masonry", "Collaborative Zones"),
    masonryConference: get("masonry", "Conference Hall"),
    masonryWorkspace: get("masonry", "Founder Workspace"),
    masonryResearch: get("masonry", "Research Lab"),
  };

  return { infrastructureImages };
};
export function mapStartupPortfolioFromApi(data: Record<string, unknown>) {
  if (!data) return null;
  const directory = ((data.startupDirectory ?? []) as any[]).map((s: any) => ({
    id: String(s.id ?? ""),
    name: String(s.name ?? ""),
    logo: resolveSafeMediaUrl(s.logo),
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
    logo: resolveSafeMediaUrl(m.logo),
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
      image: resolveSafeMediaUrl(v.image),
    })),
    roadmapData: {
      ...(data.roadmapData as any),
      image: resolveSafeMediaUrl((data.roadmapData as any)?.image),
    },
    timelineYears: ((data.timelineYears ?? []) as any[]).map((t: any) => ({
      ...t,
      image: resolveSafeMediaUrl(t.image),
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
export const fetchPublicStartupEventsCollage = async () => {
  const data = await fetchPublic<Record<string, string | null>>(PUBLIC_CONTENT_ENDPOINTS.startupEventsCollage);
  if (!data) return null;
  return {
    main: data.main ? resolveSafeMediaUrl(data.main) : null,
    card1: data.card1 ? resolveSafeMediaUrl(data.card1) : null,
    card2: data.card2 ? resolveSafeMediaUrl(data.card2) : null,
    card3: data.card3 ? resolveSafeMediaUrl(data.card3) : null,
  };
};
export const fetchPublicRewards = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.rewards);
export const fetchPublicInternshipRegistration = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.internshipRegistration);
export const fetchPublicInternshipCalendar = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.internshipCalendar);
export const fetchPublicInstitutionsClubs = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.institutionsClubs);
export const fetchPublicStartupBlog = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.startupBlog);
export const fetchPublicReports = () => fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.reports);
export const fetchPublicInternshipListings = async () => {
  const data = await fetchPublic<any[]>(PUBLIC_CONTENT_ENDPOINTS.internshipListings);
  if (!data) return null;
  return data.map((item) => ({
    ...item,
    logo: resolveSafeMediaUrl(item.logo),
  }));
};
export const fetchPublicStartupFunding = async () => {
  const data = await fetchPublicGenericData(PUBLIC_CONTENT_ENDPOINTS.startupFunding);
  if (!data?.content) return null;
  try {
    const parsed = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
    return parsed;
  } catch {
    return null;
  }
};
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
    image: resolveSafeMediaUrl(String(item.image_url ?? "")),
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

export async function fetchPageVisibility() {
  return fetchPublic<Record<string, any>[]>(PUBLIC_CONTENT_ENDPOINTS.pageVisibility);
}

