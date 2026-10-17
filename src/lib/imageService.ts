// Route photos. Server-side friendly and synchronous: every photo was downloaded
// ahead of time by scripts/fetch-route-images.mjs into public/images/routes/ and
// listed in routeImages.json, so pages never call Pixabay.
//
// A route without a downloaded photo gets the Sahyadri fallback photo, then the
// route's own local image.
//
// Pixabay does not require attribution; the pages show a simple
// "Photo from Pixabay" line (<PhotoCredit>) on every Pixabay photo.

import manifest from "@/lib/routes/routeImages.json";

export interface RouteImage {
  /** Local path under /images/routes/. */
  url: string;
  alt: string;
  /** True when the photo came from Pixabay, so the credit line is shown. */
  fromPixabay: boolean;
}

interface ManifestEntry {
  file: string;
  alt: string;
}

export const PIXABAY_HOME = "https://pixabay.com/";

const entries = manifest as Record<string, ManifestEntry | undefined>;

export function getRouteImage(slug: string, fallback: string, alt: string): RouteImage {
  const own = entries[slug];
  if (own) return { url: own.file, alt, fromPixabay: true };

  const sahyadri = entries.fallback;
  if (sahyadri) return { url: sahyadri.file, alt, fromPixabay: true };

  return { url: fallback, alt, fromPixabay: false };
}
