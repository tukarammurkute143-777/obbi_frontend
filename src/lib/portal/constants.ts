import type { Booking, Route, Vehicle } from "./types";

export const POPULAR_ROUTES: Route[] = [
  { from: "Pune", to: "Shirdi", rating: 4.9, trips: 342, tag: "🔥 Trending", slug: "pune-to-shirdi" },
  { from: "Pune", to: "Mumbai", rating: 4.8, trips: 289, slug: "pune-to-mumbai" },
  { from: "Pune", to: "Nashik", rating: 4.7, trips: 198, slug: "pune-to-nashik" },
  { from: "Pune", to: "Sambhajinagar", rating: 4.8, trips: 156, slug: "pune-to-sambhajinagar" },
  { from: "Mumbai", to: "Shirdi", rating: 4.9, trips: 211, slug: "mumbai-to-shirdi" },
  { from: "Pune", to: "Mahabaleshwar", rating: 4.9, trips: 178, tag: "⛰️ Hill Station", slug: "pune-to-mahabaleshwar" },
];

export const PORTAL_FLEET: Vehicle[] = [
  { emoji: "🚗", name: "Dzire", seats: 4, rating: 4.7, features: ["AC", "Music"], category: "Economy" },
  { emoji: "🚙", name: "Ertiga", seats: 6, rating: 4.8, features: ["AC", "Music", "Luggage"], category: "Comfort" },
  { emoji: "🚐", name: "Innova Crysta", seats: 7, rating: 4.9, features: ["AC", "Music", "Luggage", "Premium"], category: "Premium" },
  { emoji: "🚌", name: "Kia Carens", seats: 7, rating: 4.8, features: ["AC", "Music"], category: "Comfort" },
  { emoji: "🚍", name: "Urbania", seats: 17, rating: 4.8, features: ["AC", "Music", "Luggage"], category: "Group" },
  { emoji: "🚎", name: "Full Bus", seats: 50, rating: 4.8, features: ["AC", "Music"], category: "Corporate" },
];

export const MOCK_BOOKINGS: Booking[] = [];
