import {
  mediaFetchUrl,
  resolveDisplayUrl,
  resolveBackendMediaUrl,
} from "@/lib/media";

/** Vite-resolved local URLs for every file under src/assets */
const assetModules = import.meta.glob<string>(
  "../assets/**/*.{jpg,jpeg,png,gif,webp,avif,mp4,heic}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export type AssetMeta = {
  /** Stable id, e.g. `team/akilesh kumar(...).jpg` */
  id: string;
  /** Legacy path used in data files, e.g. `/src/assets/team/foo.jpg` */
  legacyPath: string;
  /** Bundled Vite URL (works offline / without backend) */
  localUrl: string;
  /** Relative path for backend storage, e.g. `team/foo.jpg` */
  fetchPath: string;
  /** Full URL backend should return in API responses */
  fetchUrl: string;
};

function globKeyToFetchPath(globKey: string): string {
  return globKey.replace(/^\.\.\/assets\//, "");
}

function legacyPathToGlobKey(legacyPath: string): string {
  return legacyPath.replace(/^\/src\/assets\//, "../assets/");
}

function buildCatalog(): AssetMeta[] {
  return Object.entries(assetModules).map(([globKey, localUrl]) => {
    const fetchPath = globKeyToFetchPath(globKey);
    return {
      id: fetchPath,
      legacyPath: `/src/assets/${fetchPath}`,
      localUrl,
      fetchPath,
      fetchUrl: mediaFetchUrl(fetchPath),
    };
  });
}

const catalog = buildCatalog();

const byLegacyPath = new Map(catalog.map((a) => [a.legacyPath, a]));
const byLocalUrl = new Map(catalog.map((a) => [a.localUrl, a]));
const byFetchPath = new Map(catalog.map((a) => [a.fetchPath, a]));

/** All website assets with fetch URLs — hand this to your backend developer */
export function getAssetCatalog(): AssetMeta[] {
  return catalog;
}

export function getAssetByLegacyPath(legacyPath: string): AssetMeta | undefined {
  return byLegacyPath.get(legacyPath);
}

export function getAssetByLocalUrl(localUrl: string): AssetMeta | undefined {
  return byLocalUrl.get(localUrl);
}

export function getAssetByFetchPath(fetchPath: string): AssetMeta | undefined {
  return byFetchPath.get(fetchPath);
}

/**
 * Resolve a legacy `/src/assets/...` path to a display URL.
 * Components keep using the returned string in `<img src={...}>` — no layout change.
 */
export function resolveLegacyAsset(legacyPath: string): string {
  const meta = getAssetByLegacyPath(legacyPath);
  if (!meta) {
    console.warn(`[assets] Unknown legacy path: ${legacyPath}`);
    return legacyPath;
  }
  return resolveDisplayUrl(meta.fetchPath, meta.localUrl);
}

/** Full metadata for a legacy path (used in content seed / backend docs) */
export function resolveLegacyAssetMeta(legacyPath: string): AssetMeta | null {
  return getAssetByLegacyPath(legacyPath) ?? null;
}

/**
 * Resolve a Vite-imported asset URL.
 * Display stays the same; fetchUrl is available via getFetchUrlForDisplayUrl().
 */
export function resolveImportedAsset(localUrl: string): string {
  return localUrl;
}

/** Get backend fetch URL for a bundled local URL (from static import) */
export function getFetchUrlForDisplayUrl(displayUrl: string): string | undefined {
  return getAssetByLocalUrl(displayUrl)?.fetchUrl;
}

/** Get backend fetch URL for a legacy `/src/assets/...` path */
export function getFetchUrlForLegacyPath(legacyPath: string): string | undefined {
  return getAssetByLegacyPath(legacyPath)?.fetchUrl;
}

/** Normalize any image value to { displayUrl, fetchUrl } for seed export */
export function resolveImageField(value: string): {
  displayUrl: string;
  fetchUrl: string | null;
  legacyPath: string | null;
} {
  if (value.startsWith("/src/assets/")) {
    const meta = getAssetByLegacyPath(value);
    if (meta) {
      return {
        displayUrl: resolveDisplayUrl(meta.fetchPath, meta.localUrl),
        fetchUrl: meta.fetchUrl,
        legacyPath: meta.legacyPath,
      };
    }
    return { displayUrl: value, fetchUrl: null, legacyPath: value };
  }

  const meta = getAssetByLocalUrl(value);
  if (meta) {
    return {
      displayUrl: value,
      fetchUrl: meta.fetchUrl,
      legacyPath: meta.legacyPath,
    };
  }

  if (value.startsWith("http")) {
    return { displayUrl: value, fetchUrl: value, legacyPath: null };
  }

  return { displayUrl: value, fetchUrl: resolveBackendMediaUrl(value), legacyPath: null };
}
