// All Obii Cabs routes (pilgrimage, hill station, coastal, city, airport).
//
// Where the numbers come from
//   * Which routes exist and their category:  routeSeeds.json
//   * Distance and driving time:              routeMetrics.json, measured with
//     OpenStreetMap road data (OSRM) for every route. Distances are rounded to
//     the nearest 5 km, and the free-flow driving time is multiplied by 1.5 and
//     rounded, which matches typical Maharashtra highway and ghat conditions.
//     They are estimates; real trips vary with traffic and the route taken.
//   * What each place is known for:           destinations.ts
// A route already written by hand in routesData.ts keeps its own distance,
// duration, best-time and description, so existing pages do not change.
//
// There is no pricing anywhere in this data, by design.

import seeds from "./routeSeeds.json";
import metrics from "./routeMetrics.json";
import { DESTINATIONS } from "./destinations";
import type { RouteCategory } from "./categories";

export { CATEGORY_META, ROUTE_CATEGORIES } from "./categories";
export type { RouteCategory } from "./categories";
import { VEHICLES as FLEET } from "@/lib/fleet/constants";
import { getRouteBySlug as getLegacyRoute } from "./routesData";

export interface Route {
  slug: string;
  from: string;
  to: string;
  category: RouteCategory;
  distance: string;
  duration: string;
  description: string;
  highlights: string[];
  bestTime: string;
  /** Extra advice about timing (e.g. weekly closing days), shown under the stats. */
  bestTimeNote?: string;
  vehicles: string[];
  popularFor: string;
  /** True for multi-stop tours (Ashtavinayak, Konkan Darshan). */
  isCircuit: boolean;
  /** Shown when no Pixabay photo was downloaded. */
  fallbackImage: string;
}

export const DEFAULT_ROUTE_IMAGE = "/images/routes/mahabaleshwar.jpg";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

// ── formatting ────────────────────────────────────────────────────────────

function formatDistance(km: number): string {
  const rounded = km < 30 ? Math.round(km) : Math.round(km / 5) * 5;
  return `${rounded} km`;
}

function formatDuration(osrmMinutes: number): string {
  const minutes = osrmMinutes * 1.5;
  if (minutes < 60) return `${Math.max(5, Math.round(minutes / 5) * 5)} minutes`;
  const hours = Math.round((minutes / 60) * 2) / 2;
  return `${hours} hours`;
}

// ── vehicles (names come from the real fleet list; none has a price) ──────

const FLEET_NAMES = new Set(FLEET.map((v) => v.name));

function pickVehicles(category: RouteCategory, km: number, isCircuit: boolean): string[] {
  let names: string[];
  if (category === "airport" || category === "city") {
    names = ["Swift Dzire", "Maruti Ertiga", "Innova Crysta"];
  } else if (category === "pilgrimage") {
    names = ["Innova Crysta", "Maruti Ertiga", "Force Urbania"];
  } else {
    names = ["Maruti Ertiga", "Innova Crysta", "Kia Carens"];
  }
  if (isCircuit || km > 400) names = [...new Set([...names, "Force Urbania"])].slice(0, 3);
  return names.filter((n) => FLEET_NAMES.has(n));
}

// ── copy ─────────────────────────────────────────────────────────────────

function describe(
  from: string,
  to: string,
  category: RouteCategory,
  isCircuit: boolean,
  distance: string,
  duration: string,
  blurb: string
): string {
  const drive = isCircuit
    ? `Obii Cabs runs this tour from ${from}: about ${distance} of driving in total, around ${duration} behind the wheel, usually spread over more than one day.`
    : category === "airport"
      ? `Obii Cabs airport transfer from ${from} to ${to}: about ${distance}, around ${duration} by road, with pickup timed to your flight.`
      : `Book a ${from} to ${to} cab with Obii Cabs: about ${distance} by road, around ${duration} of driving.`;
  return `${blurb} ${drive} Call or WhatsApp us to plan your pickup and vehicle.`;
}

// ── build ────────────────────────────────────────────────────────────────

const circuits = seeds.circuits as Record<string, string[]>;

function build(): Route[] {
  const out: Route[] = [];
  for (const [from, to, category] of seeds.routes as [string, string, RouteCategory][]) {
    const slug = `${slugify(from)}-to-${slugify(to)}`;
    const m = (metrics as Record<string, { km: number; minutes: number }>)[slug];
    const info = DESTINATIONS[to];
    if (!m || !info) continue;   // never publish a route without measured data

    const legacy = getLegacyRoute(slug);
    // "October to March (usually closed on Mondays)" -> time + note
    const timing = info.bestTime.match(/^(.*?)\s*\((.*)\)\s*$/);
    const isCircuit = to in circuits;
    const distance = legacy?.distance ?? formatDistance(m.km);
    const duration = legacy?.duration ?? formatDuration(m.minutes);

    out.push({
      slug,
      from,
      to,
      category,
      distance,
      duration,
      description:
        legacy?.description ??
        describe(from, to, category, isCircuit, distance, duration, info.blurb),
      highlights: info.highlights,
      bestTime: legacy?.bestTime ?? (timing ? timing[1] : info.bestTime),
      bestTimeNote: legacy || !timing ? undefined : timing[2].charAt(0).toUpperCase() + timing[2].slice(1),
      vehicles: pickVehicles(category, m.km, isCircuit),
      popularFor: info.popularFor,
      isCircuit,
      fallbackImage: legacy?.image ?? DEFAULT_ROUTE_IMAGE,
    });
  }
  return out;
}

export const ALL_ROUTES: Route[] = build();

export function getRoute(slug: string): Route | undefined {
  return ALL_ROUTES.find((r) => r.slug === slug);
}

/**
 * Spiritual routes to suggest beside any route page: the same destination from
 * other cities first, then pilgrimage routes from the same city, then the rest.
 */
export function getRelatedPilgrimageRoutes(route: Route, limit = 5): Route[] {
  const pilgrimage = ALL_ROUTES.filter((r) => r.category === "pilgrimage" && r.slug !== route.slug);
  const sameDestination = pilgrimage.filter((r) => r.to === route.to);
  const sameOrigin = pilgrimage.filter((r) => r.from === route.from && r.to !== route.to);
  const rest = pilgrimage.filter((r) => r.from === "Pune");
  return [...new Set([...sameDestination, ...sameOrigin, ...rest])].slice(0, limit);
}

/** "Pune → Shirdi" style SEO text, shared by the page and its metadata. */
export function routeSeo(route: Route) {
  const legacy = getLegacyRoute(route.slug);
  if (legacy) {
    return { title: legacy.seoTitle, description: legacy.seoDescription, keywords: legacy.seoKeywords };
  }
  const top = route.highlights.slice(0, 3).join(", ");
  return {
    title: `${route.from} to ${route.to} Cab Service | Obii Cabs`,
    description: `${route.from} to ${route.to} cab with Obii Cabs: about ${route.distance}, ${route.duration}. Visit ${top}. Call or WhatsApp to book.`,
    keywords: `${route.from.toLowerCase()} to ${route.to.toLowerCase()} cab, ${route.from.toLowerCase()} ${route.to.toLowerCase()} taxi, ${route.to.toLowerCase()} cab booking, obii cabs`,
  };
}
