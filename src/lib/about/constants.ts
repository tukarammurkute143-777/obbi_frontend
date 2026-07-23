export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
  emoji: string;
  prefix?: string;
  decimals?: number;
}

export const STATS: AboutStat[] = [
  { value: 1247, suffix: "+", label: "Happy Customers", emoji: "🚗" },
  { value: 4.8, suffix: "⭐", label: "Average Rating", emoji: "", decimals: 1 },
  { value: 120, suffix: "+", label: "Routes Covered", emoji: "🗺️" },
  { value: 2020, suffix: "", label: "Established", emoji: "📅", prefix: "Since " },
];

export interface Feature {
  emoji: string;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  {
    emoji: "🚗",
    title: "Huge Fleet",
    desc: "4 Seater se 50 Seater — Dzire se Full Bus, sab available!",
  },
  {
    emoji: "⭐",
    title: "Top Rated",
    desc: "4.8 Average Rating — 1,247+ happy customers ka bharosa",
  },
  {
    emoji: "🗺️",
    title: "120+ Routes",
    desc: "Maharashtra ke 120+ routes — Har destination covered!",
  },
  {
    emoji: "👨‍✈️",
    title: "Pro Drivers",
    desc: "Trained professional drivers — Polite, punctual, experienced",
  },
  {
    emoji: "📞",
    title: "24/7 Support",
    desc: "Kabhi bhi call karein — Hum hamesha available hai!",
  },
  {
    emoji: "🔒",
    title: "Safe & Secure",
    desc: "GPS tracked vehicles — Aapki safety humari priority",
  },
];

export interface AboutCity {
  emoji: string;
  name: string;
  tag: string;
  highlight: string;
}

export const CITIES: AboutCity[] = [
  { emoji: "📍", name: "Pune", tag: "Base Location", highlight: "Most Routes" },
  { emoji: "🏙️", name: "Mumbai", tag: "Financial Capital", highlight: "Premium Service" },
  { emoji: "🍇", name: "Nashik", tag: "Wine City", highlight: "Weekend Trips" },
  { emoji: "🛕", name: "Shirdi", tag: "Spiritual Heart", highlight: "Pilgrimage Routes" },
  { emoji: "🏰", name: "Sambhajinagar", tag: "Historical City", highlight: "Heritage Tours" },
];

export interface AboutReview {
  name: string;
  rating: number;
  text: string;
  route: string;
  vehicle: string;
}

export const RECENT_REVIEWS: AboutReview[] = [
  {
    name: "Rahul S.",
    rating: 5,
    text: "Amazing Shirdi trip! Driver was very professional.",
    route: "Pune → Shirdi",
    vehicle: "Innova Crysta",
  },
  {
    name: "Priya M.",
    rating: 5,
    text: "Best family trip to Mahabaleshwar. Clean cab, on time!",
    route: "Pune → Mahabaleshwar",
    vehicle: "Ertiga",
  },
  {
    name: "Amit K.",
    rating: 5,
    text: "Urbania for office trip was perfect. Highly recommended!",
    route: "Pune → Mumbai",
    vehicle: "Urbania",
  },
  {
    name: "Sneha R.",
    rating: 5,
    text: "Very comfortable journey. Will definitely book again!",
    route: "Mumbai → Shirdi",
    vehicle: "Innova Crysta",
  },
  {
    name: "Vijay P.",
    rating: 5,
    text: "Excellent service. Driver was polite and helpful.",
    route: "Pune → Nashik",
    vehicle: "Ertiga",
  },
];
