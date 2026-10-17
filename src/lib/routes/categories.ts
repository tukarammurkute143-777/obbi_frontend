// Kept apart from allRoutes.ts so client components can use the category
// labels without pulling the whole route dataset into the browser bundle.

export type RouteCategory = "pilgrimage" | "hill_station" | "coastal" | "city" | "airport";

export const CATEGORY_META: Record<RouteCategory, { label: string; emoji: string }> = {
  pilgrimage: { label: "Pilgrimage", emoji: "🛕" },
  hill_station: { label: "Hill Station", emoji: "⛰️" },
  coastal: { label: "Coastal", emoji: "🏖️" },
  city: { label: "City", emoji: "🏙️" },
  airport: { label: "Airport", emoji: "✈️" },
};

export const ROUTE_CATEGORIES: ("all" | RouteCategory)[] = [
  "all",
  "pilgrimage",
  "hill_station",
  "coastal",
  "city",
  "airport",
];
