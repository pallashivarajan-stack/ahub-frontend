/**
 * Backend seed data — every image includes a `fetchUrl` your API should store & return.
 * Import this JSON into your database or implement GET /api/public/content-seed with the same shape.
 */
import {
  portfolio,
  events,
  institutions,
  mentors,
  board,
  stats,
  visitors,
} from "@/data";
import { teamMembers, groupPhoto, teamPageData } from "@/data/teamPage";
import { boardMembers } from "@/data/boardPage";
import { pressItems, defaultPressPageMeta } from "@/data/pressPage";
import { marqueePartners, popularPartners } from "@/data/partnersPage";
import { ecosystemEvents } from "@/data/eventsCalendar";
import { startupDirectory } from "@/data/startupPortfolio";
import { visionData, roadmapData, timelineYears } from "@/data/visionRoadmap";
import { infrastructureImages } from "@/data/infrastructurePage";
import {
  getAssetCatalog,
  resolveImageField,
  getFetchUrlForDisplayUrl,
} from "@/lib/assets";
import { PUBLIC_CONTENT_ENDPOINTS } from "@/services/publicContentEndpoints";
import { API_BASE_URL } from "@/lib/media";

function enrichImages<T extends Record<string, unknown>>(
  items: T[],
  imageKeys: string[],
) {
  return items.map((item) => {
    const enriched = { ...item } as Record<string, unknown>;
    for (const key of imageKeys) {
      const val = item[key];
      if (typeof val === "string" && val) {
        const resolved = resolveImageField(val);
        enriched[`${key}FetchUrl`] = resolved.fetchUrl;
        enriched[`${key}LegacyPath`] = resolved.legacyPath;
      }
    }
    return enriched;
  });
}

function enrichSingle(obj: Record<string, unknown>, imageKeys: string[]) {
  const enriched = { ...obj } as Record<string, unknown>;
  for (const key of imageKeys) {
    const val = obj[key];
    if (typeof val === "string" && val) {
      const resolved = resolveImageField(val);
      enriched[`${key}FetchUrl`] = resolved.fetchUrl;
      enriched[`${key}LegacyPath`] = resolved.legacyPath;
    }
  }
  return enriched;
}

function enrichInfrastructureImages() {
  return Object.fromEntries(
    Object.entries(infrastructureImages).map(([key, localUrl]) => [
      key,
      {
        displayUrl: localUrl,
        fetchUrl: getFetchUrlForDisplayUrl(localUrl as string) ?? null,
      },
    ]),
  );
}

export function buildContentSeed() {
  return {
    meta: {
      generatedAt: new Date().toISOString(),
      apiBaseUrl: API_BASE_URL,
      endpoints: PUBLIC_CONTENT_ENDPOINTS,
      notes: [
        "Store fetchUrl values in your database image columns.",
        "Public GET responses should return the same field names as static data, with image fields as fetchUrl strings.",
        "Serve binary files at GET /api/public/media/{category}/{filename}",
        "Set VITE_USE_API_MEDIA=true in frontend .env once backend is live.",
      ],
    },
    assets: getAssetCatalog().map(({ id, legacyPath, fetchPath, fetchUrl }) => ({
      id,
      legacyPath,
      fetchPath,
      fetchUrl,
    })),
    content: {
      portfolio: enrichImages(portfolio, ["logo", "founderImage"]),
      events: enrichImages(events, ["img"]),
      institutions: enrichImages(institutions, ["img"]),
      mentors: enrichImages(mentors, ["image"]),
      board: enrichImages(board, ["image"]),
      team: teamMembers.map((m) => ({
        ...m,
        tagline: m.tagline ?? null,
        visitLink: m.visitLink ?? null,
        imageFetchUrl: getFetchUrlForDisplayUrl(m.image) ?? null,
        imageLegacyPath: m.image,
      })),
      teamGroupPhoto: {
        displayUrl: groupPhoto,
        fetchUrl: getFetchUrlForDisplayUrl(groupPhoto) ?? null,
        legacyPath: null,
      },
      teamPage: {
        groupPhoto: {
          displayUrl: teamPageData.groupPhoto,
          fetchUrl: getFetchUrlForDisplayUrl(teamPageData.groupPhoto) ?? null,
          legacyPath: null,
        },
        title: teamPageData.title,
        subtitle: teamPageData.subtitle,
        description: teamPageData.description,
        memberCountLabel: teamPageData.memberCountLabel,
      },
      boardPage: enrichImages(boardMembers, ["image"]),
      partners: enrichImages([...marqueePartners, ...popularPartners], ["logo"]),
      eventsCalendar: enrichImages(ecosystemEvents, ["image"]),
      startupPortfolio: enrichImages(startupDirectory, ["logo"]),
      vision: enrichImages(visionData, ["image"]),
      roadmap: enrichSingle(roadmapData as unknown as Record<string, unknown>, [
        "image",
      ]),
      timelineYears: enrichImages(timelineYears, ["image"]),
      infrastructureImages: enrichInfrastructureImages(),
      press: pressItems,
      pressPage: defaultPressPageMeta,
      stats,
      visitors,
    },
  };
}

/** Ready-to-import JSON for backend developer */
export const contentSeed = buildContentSeed();

export default contentSeed;
