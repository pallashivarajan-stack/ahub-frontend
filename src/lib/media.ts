/** Shared media URL helpers for frontend ↔ backend integration */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

/** Public media path prefix — backend serves uploaded files here */
export const PUBLIC_MEDIA_PATH = "/api/public/media";

/** When true, `<img src>` uses API fetch URLs instead of bundled local URLs */
export const USE_API_MEDIA = import.meta.env.VITE_USE_API_MEDIA === "true";

/** Build full fetch URL for a relative asset path (e.g. `team/photo.jpg`) */
export function mediaFetchUrl(relativePath: string): string {
  const normalized = relativePath.replace(/^\/+/, "");
  return `${API_BASE_URL}${PUBLIC_MEDIA_PATH}/${normalized}`;
}

/** Resolve relative or absolute backend path to a full URL */
export function resolveBackendMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith(API_BASE_URL)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

/** Pick display URL: API fetch URL when enabled, otherwise local bundled URL */
export function resolveDisplayUrl(
  fetchRelativePath: string,
  localUrl: string,
): string {
  return USE_API_MEDIA ? mediaFetchUrl(fetchRelativePath) : localUrl;
}
