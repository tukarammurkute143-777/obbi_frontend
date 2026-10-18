// Route photos. Server-side friendly and synchronous: every photo was downloaded
// ahead of time by scripts/fetch-route-images.mjs into public/images/routes/ and
// listed in routeImages.json, so pages never call Pixabay.
//
// A route without a downloaded photo gets the Sahyadri fallback photo, then the
// route's own local image.

import manifest from "@/lib/routes/routeImages.json";

export interface RouteImage {
  /** Local path under /images/routes/. */
  url: string;
  alt: string;
}

interface ManifestEntry {
  file: string;
  alt: string;
}

const entries = manifest as Record<string, ManifestEntry | undefined>;

export function getRouteImage(slug: string, fallback: string, alt: string): RouteImage {
  const own = entries[slug];
  if (own) return { url: own.file, alt };

  const sahyadri = entries.fallback;
  if (sahyadri) return { url: sahyadri.file, alt };

  return { url: fallback, alt };
}
