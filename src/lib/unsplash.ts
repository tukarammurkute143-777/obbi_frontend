// Unsplash photos for route pages. Server-side only: import this from Server
// Components, never from a "use client" file (the access key must not reach the
// browser bundle).
//
// Order of attempts for a route page:
//   1. unsplashManifest.json  - a photo of the place itself, picked ahead of
//      time by scripts/fetch-route-images.mjs. No API call, so builds stay fast
//      and inside Unsplash's hourly rate limit (50/hour for demo apps).
//   2. The live Unsplash search API, cached by Next.js for a week. Only a photo
//      whose own text (description, tags, location) names the place is used, so
//      a Shirdi page never shows a photo of somewhere else.
//   3. A generic photo for the route's category (a temple, a hill road, a beach)
//      from the manifest. It is shown with a neutral caption, not the place name.
//   4. A local Maharashtra photo. The page never breaks without Unsplash.
//
// Unsplash's terms require showing "Photo by <name> on Unsplash" with links to
// the photographer and to Unsplash (with the UTM parameters below). Every
// RouteImage that came from Unsplash carries that credit; use <PhotoCredit>.

import manifest from "@/lib/routes/unsplashManifest.json";

export interface PhotoCredit {
  name: string;
  /** Photographer's Unsplash profile, with UTM parameters. */
  profileUrl: string;
  /** This photo's page on Unsplash, with UTM parameters. */
  photoUrl: string;
}

export interface RouteImage {
  /** Photo URL at the requested width (Unsplash CDN, or a local path). */
  url: string;
  alt: string;
  /** null for the local fallback, which needs no Unsplash credit. */
  credit: PhotoCredit | null;
  fromUnsplash: boolean;
}

interface ManifestEntry {
  raw: string;
  alt: string;
  name: string;
  username: string;
  link: string;
}

export const UNSPLASH_HOME = "https://unsplash.com/?utm_source=obii_cabs&utm_medium=referral";
const UTM = "utm_source=obii_cabs&utm_medium=referral";
const REVALIDATE_SECONDS = 7 * 24 * 60 * 60;
const SEARCH_TIMEOUT_MS = 8000;

// Server-only variable preferred; the NEXT_PUBLIC_ name is accepted because
// that is how it was first configured. It is only read here, so it is never
// inlined into client code.
function accessKey(): string | undefined {
  return process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || undefined;
}

function sizedUrl(raw: string, width: number): string {
  const sep = raw.includes("?") ? "&" : "?";
  return `${raw}${sep}w=${width}&q=75&auto=format&fit=crop`;
}

function toCredit(name: string, username: string, link: string): PhotoCredit {
  const photoUrl = link.includes("?") ? `${link}&${UTM}` : `${link}?${UTM}`;
  return { name, profileUrl: `https://unsplash.com/@${username}?${UTM}`, photoUrl };
}

function fromEntry(entry: ManifestEntry, width: number): RouteImage {
  return {
    url: sizedUrl(entry.raw, width),
    alt: entry.alt,
    credit: toCredit(entry.name, entry.username, entry.link),
    fromUnsplash: true,
  };
}

function fallbackImage(path: string, alt: string): RouteImage {
  return { url: path, alt, credit: null, fromUnsplash: false };
}

interface SearchPhoto {
  alt_description: string | null;
  description: string | null;
  tags?: { title: string }[];
  location?: { name?: string | null; city?: string | null } | null;
  urls: { raw: string };
  links: { html: string };
  user: { name: string; username: string };
}

/** The first result whose own text (description, tags, location) mentions the place. */
export function pickRelevantPhoto(results: SearchPhoto[], placeToken: string): SearchPhoto | null {
  const token = placeToken.toLowerCase();
  const text = (p: SearchPhoto) =>
    [
      p.alt_description,
      p.description,
      p.location?.name,
      p.location?.city,
      ...(p.tags ?? []).map((t) => t.title),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  return results.find((p) => text(p).includes(token)) ?? null;
}

// After Unsplash answers 403/429 (hourly rate limit) stop calling it for a
// while instead of hammering it once per page during a build.
let liveSearchPausedUntil = 0;
const PAUSE_MS = 10 * 60 * 1000;

// Concurrent requests for the same query share one lookup.
const inFlight = new Map<string, Promise<ManifestEntry | null>>();

function searchLive(query: string, placeToken: string): Promise<ManifestEntry | null> {
  const existing = inFlight.get(query);
  if (existing) return existing;
  const request = searchLiveOnce(query, placeToken).finally(() => inFlight.delete(query));
  inFlight.set(query, request);
  return request;
}

async function searchLiveOnce(query: string, placeToken: string): Promise<ManifestEntry | null> {
  const key = accessKey();
  if (!key || Date.now() < liveSearchPausedUntil) return null;

  const url =
    "https://api.unsplash.com/search/photos?" +
    new URLSearchParams({
      query,
      orientation: "landscape",
      per_page: "10",
      content_filter: "high",
    });
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      // 403 means the hourly rate limit; the page falls back until the pause ends.
      console.warn(`[unsplash] search "${query}" failed: HTTP ${res.status}`);
      if (res.status === 403 || res.status === 429) liveSearchPausedUntil = Date.now() + PAUSE_MS;
      return null;
    }
    const data = (await res.json()) as { results?: SearchPhoto[] };
    const photo = pickRelevantPhoto(data.results ?? [], placeToken);
    if (!photo) return null;
    return {
      raw: photo.urls.raw,
      alt: photo.alt_description || photo.description || query,
      name: photo.user.name,
      username: photo.user.username,
      link: photo.links.html,
    };
  } catch (error) {
    console.warn(`[unsplash] search "${query}" error:`, (error as Error).message);
    return null;
  }
}

export interface FetchRouteImageOptions {
  /** Route category; selects the generic photo used when the place has none. */
  category?: string;
  /** Local image to use when Unsplash has nothing suitable. */
  fallback?: string;
  /** Width in pixels of the returned URL. */
  width?: number;
  /** A word the photo's description must contain (default: first word of the query). */
  placeToken?: string;
  /** Alt text for the fallback image. */
  alt?: string;
}

export async function fetchRouteImage(
  query: string,
  { category, fallback = "/images/routes/mahabaleshwar.jpg", width = 1200, placeToken, alt }: FetchRouteImageOptions = {}
): Promise<RouteImage> {
  const token = placeToken ?? query.split(/\s+/)[0];

  const saved = (manifest as Record<string, ManifestEntry | null>)[query];
  if (saved) return fromEntry(saved, width);

  const live = await searchLive(query, token);
  if (live) return fromEntry(live, width);

  const generic = category
    ? (manifest as Record<string, ManifestEntry | null>)[`generic:${category}`]
    : null;
  if (generic) {
    // Not a photo of this place, so it is not captioned as one.
    return { ...fromEntry(generic, width), alt: "Scenic Maharashtra travel photo" };
  }

  return fallbackImage(fallback, alt ?? query);
}

/** Many images at once, a few at a time, so a cold build cannot burst past
 *  Unsplash's rate limit. Results are in the same order as `jobs`. */
export async function fetchRouteImages(
  jobs: { query: string; options?: FetchRouteImageOptions }[],
  concurrency = 4
): Promise<RouteImage[]> {
  const results: RouteImage[] = new Array(jobs.length);
  let next = 0;
  async function worker() {
    while (next < jobs.length) {
      const i = next++;
      results[i] = await fetchRouteImage(jobs[i].query, jobs[i].options);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, jobs.length) }, worker));
  return results;
}
