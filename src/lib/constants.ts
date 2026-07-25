export interface Vehicle {
  name: string;
  seats: number;
  rating: number;
  tag: string;
  emoji: string;
}

export const VEHICLES: Vehicle[] = [
  { name: "Innova Crysta", seats: 7, rating: 4.9, tag: "Most Popular", emoji: "🚙" },
  { name: "Ertiga", seats: 6, rating: 4.8, tag: "Family Favourite", emoji: "🚗" },
  { name: "Urbania", seats: 17, rating: 4.8, tag: "Group Trips", emoji: "🚐" },
];

export interface Review {
  name: string;
  rating: number;
  text: string;
  route: string;
  vehicle: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Rahul S.",
    rating: 5,
    text: "Amazing Shirdi trip! Driver was very professional and cab was spotless.",
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
    text: "Urbania for our office trip was perfect. Highly recommended!",
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
    text: "Excellent service. Driver was polite and helpful throughout.",
    route: "Pune → Nashik",
    vehicle: "Ertiga",
  },
];

export const CITIES = ["Pune", "Mumbai", "Nashik", "Shirdi", "Sambhajinagar"];

export interface Stat {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  emoji: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  { value: 1247, label: "Happy Customers", prefix: "", suffix: "+", emoji: "🚗" },
  { value: 4.8, label: "Average Rating", prefix: "", suffix: "⭐", emoji: "", decimals: 1 },
  { value: 120, label: "Routes Covered", prefix: "", suffix: "+", emoji: "🗺️" },
];

export const CONTACT = {
  phone: "+91 7499313125",
  whatsapp: "+91 7499313125",
  email: "info@obiicabs.com",
  whatsappMessage: "Namaste Obii Cabs! 🙏 Mujhe cab booking karni hai. Please contact me.",
};

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Routes", href: "/routes" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Cities", href: "/#cities" },
];
