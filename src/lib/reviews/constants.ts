export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  route: string;
  vehicle: string;
  date: string;
  verified: boolean;
  location: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Rahul S.",
    rating: 5,
    text: "Amazing Shirdi trip! Driver was very professional and the Innova was spotless. Will definitely book again!",
    route: "Pune → Shirdi",
    vehicle: "Innova Crysta",
    date: "2026-06-15",
    verified: true,
    location: "Pune",
  },
  {
    id: 2,
    name: "Priya M.",
    rating: 5,
    text: "Best family trip to Mahabaleshwar. Clean cab, on time pickup, very helpful driver. Kids loved it!",
    route: "Pune → Mahabaleshwar",
    vehicle: "Ertiga",
    date: "2026-06-20",
    verified: true,
    location: "Pune",
  },
  {
    id: 3,
    name: "Amit K.",
    rating: 5,
    text: "Urbania for our office trip was perfect. All 15 colleagues were very comfortable. Highly recommended for group trips!",
    route: "Pune → Mumbai",
    vehicle: "Urbania",
    date: "2026-06-25",
    verified: true,
    location: "Pune",
  },
  {
    id: 4,
    name: "Sneha R.",
    rating: 5,
    text: "Very comfortable journey from Mumbai to Shirdi. Driver was polite and knowledgeable about the route.",
    route: "Mumbai → Shirdi",
    vehicle: "Innova Crysta",
    date: "2026-07-01",
    verified: true,
    location: "Mumbai",
  },
  {
    id: 5,
    name: "Vijay P.",
    rating: 5,
    text: "Excellent service for Nashik wine tour. On-time pickup, clean Dzire, very professional experience overall.",
    route: "Pune → Nashik",
    vehicle: "Ertiga",
    date: "2026-07-05",
    verified: true,
    location: "Pune",
  },
  {
    id: 6,
    name: "Meera T.",
    rating: 4,
    text: "Good service overall. Cab was clean and driver was courteous. Minor delay in pickup but overall satisfied.",
    route: "Pune → Shirdi",
    vehicle: "Innova Crysta",
    date: "2026-07-08",
    verified: true,
    location: "Nashik",
  },
  {
    id: 7,
    name: "Suresh B.",
    rating: 5,
    text: "Booked full bus for our company picnic. 48 employees, zero complaints! Great service at great value.",
    route: "Pune → Lonavala",
    vehicle: "Full Bus",
    date: "2026-07-10",
    verified: true,
    location: "Pune",
  },
  {
    id: 8,
    name: "Anita D.",
    rating: 5,
    text: "Second time booking with Obii Cabs. Consistent quality every time. The Innova Crysta is always spotless!",
    route: "Pune → Shirdi",
    vehicle: "Innova Crysta",
    date: "2026-07-12",
    verified: true,
    location: "Pune",
  },
  {
    id: 9,
    name: "Rohan K.",
    rating: 5,
    text: "Airport transfer was smooth. Driver was waiting with name board. Very professional service!",
    route: "Pune → Mumbai Airport",
    vehicle: "Swift Dzire",
    date: "2026-07-14",
    verified: true,
    location: "Pune",
  },
  {
    id: 10,
    name: "Kavita S.",
    rating: 4,
    text: "Good experience for Sambhajinagar trip. Long journey but cab was comfortable throughout.",
    route: "Pune → Sambhajinagar",
    vehicle: "Innova Crysta",
    date: "2026-07-16",
    verified: true,
    location: "Pune",
  },
  {
    id: 11,
    name: "Deepak M.",
    rating: 5,
    text: "Urbania for family reunion was perfect choice. All family members were happy. Driver was like family!",
    route: "Mumbai → Nashik",
    vehicle: "Urbania",
    date: "2026-07-18",
    verified: true,
    location: "Mumbai",
  },
  {
    id: 12,
    name: "Pooja R.",
    rating: 5,
    text: "Kia Carens is so comfortable! Modern interiors, great AC, very smooth ride to Mahabaleshwar.",
    route: "Pune → Mahabaleshwar",
    vehicle: "Kia Carens",
    date: "2026-07-20",
    verified: true,
    location: "Pune",
  },
];

export const ROUTES_LIST = [
  "All Routes",
  "Pune → Shirdi",
  "Pune → Mumbai",
  "Pune → Nashik",
  "Pune → Mahabaleshwar",
  "Mumbai → Shirdi",
  "Pune → Sambhajinagar",
  "Pune → Lonavala",
  "Mumbai → Nashik",
  "Pune → Mumbai Airport",
];

export const VEHICLES_LIST = [
  "All Vehicles",
  "Swift Dzire",
  "Ertiga",
  "Innova Crysta",
  "Kia Carens",
  "Urbania",
  "Full Bus",
];

export const RATING_OPTIONS = ["All", "5", "4", "3"];

export const DATE_FILTERS = [
  "All",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Last 60 Days",
  "Last 6 Months",
  "Last 1 Year",
] as const;

export interface OverallStat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const OVERALL_STATS: OverallStat[] = [
  { value: 4.8, suffix: "⭐", label: "Rating", decimals: 1 },
  { value: 1247, suffix: "+", label: "Customers" },
  { value: 342, suffix: "+", label: "Trips" },
  { value: 98, suffix: "%", label: "Satisfied" },
];

export interface RatingBreakdownRow {
  stars: number;
  count: number;
  percent: number;
}

export const RATING_BREAKDOWN: RatingBreakdownRow[] = [
  { stars: 5, count: 847, percent: 68 },
  { stars: 4, count: 312, percent: 25 },
  { stars: 3, count: 76, percent: 6 },
  { stars: 2, count: 12, percent: 1 },
  { stars: 1, count: 0, percent: 0 },
];

export interface RoutePopularity {
  route: string;
  percent: number;
  trending?: boolean;
}

export const ROUTE_POPULARITY: RoutePopularity[] = [
  { route: "Pune → Shirdi", percent: 85, trending: true },
  { route: "Pune → Mumbai", percent: 72 },
  { route: "Pune → Nashik", percent: 58 },
  { route: "Mumbai → Shirdi", percent: 45 },
  { route: "Pune → Mahabaleshwar", percent: 38 },
];
