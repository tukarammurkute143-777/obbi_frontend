export interface FleetVehicle {
  id: number;
  emoji: string;
  name: string;
  category: "Economy" | "Comfort" | "Premium" | "Group" | "Corporate";
  seats: number;
  rating: number;
  totalTrips: number;
  features: string[];
  bestFor: string[];
  popularRoute: string;
  description: string;
  badge?: string;
}

export const VEHICLES: FleetVehicle[] = [
  {
    id: 1,
    emoji: "🚗",
    name: "Swift Dzire",
    category: "Economy",
    seats: 4,
    rating: 4.7,
    totalTrips: 189,
    features: ["AC", "Music", "Comfortable Seats"],
    bestFor: ["Airport Transfers", "City Rides", "Solo/Couple Trips"],
    popularRoute: "Pune → Mumbai",
    description:
      "Perfect for small groups and budget-conscious travelers. Comfortable and fuel-efficient.",
  },
  {
    id: 2,
    emoji: "🚙",
    name: "Maruti Ertiga",
    category: "Comfort",
    seats: 6,
    rating: 4.8,
    totalTrips: 234,
    features: ["AC", "Music", "Luggage Space", "Comfortable"],
    bestFor: ["Family Trips", "Small Groups", "Weekend Getaways"],
    popularRoute: "Pune → Mahabaleshwar",
    description:
      "Ideal for families and small groups. Spacious interiors with ample luggage space.",
  },
  {
    id: 3,
    emoji: "🚐",
    name: "Innova Crysta",
    category: "Premium",
    seats: 7,
    rating: 4.9,
    totalTrips: 342,
    features: ["AC", "Music", "Luggage Space", "Premium Interiors", "USB Charging"],
    bestFor: ["Family Trips", "Pilgrimages", "Corporate Travel", "Long Routes"],
    popularRoute: "Pune → Shirdi",
    description:
      "Our most popular vehicle. Premium comfort for long journeys with spacious seating.",
    badge: "⭐ Most Popular",
  },
  {
    id: 4,
    emoji: "🚌",
    name: "Kia Carens",
    category: "Comfort",
    seats: 7,
    rating: 4.8,
    totalTrips: 156,
    features: ["AC", "Music", "Modern Interiors", "USB Charging"],
    bestFor: ["Family Trips", "Friend Groups", "Weekend Trips"],
    popularRoute: "Pune → Nashik",
    description:
      "Modern and stylish. Perfect for those who want comfort with a contemporary feel.",
  },
  {
    id: 5,
    emoji: "🚍",
    name: "Force Urbania",
    category: "Group",
    seats: 17,
    rating: 4.8,
    totalTrips: 98,
    features: ["AC", "Music", "Luggage Space", "Push-back Seats", "Large Windows"],
    bestFor: ["Group Tours", "Office Trips", "Wedding Functions", "Picnics"],
    popularRoute: "Pune → Mumbai",
    description:
      "Perfect for medium-sized groups. Luxury mini-bus with push-back seats and panoramic windows.",
  },
  {
    id: 6,
    emoji: "🚌",
    name: "Mini Bus",
    category: "Group",
    seats: 26,
    rating: 4.7,
    totalTrips: 67,
    features: ["AC", "Music", "Luggage Space", "Reclining Seats"],
    bestFor: ["Large Groups", "Corporate Events", "School Trips", "Pilgrimage Groups"],
    popularRoute: "Pune → Shirdi",
    description:
      "Ideal for large group travel. Comfortable reclining seats for long journeys.",
  },
  {
    id: 7,
    emoji: "🚎",
    name: "Full Bus",
    category: "Corporate",
    seats: 50,
    rating: 4.8,
    totalTrips: 45,
    features: ["AC", "Music", "Luggage Space", "Reclining Seats", "PA System"],
    bestFor: ["Corporate Events", "Large Pilgrimages", "College Trips", "Mass Transportation"],
    popularRoute: "Pune → Shirdi",
    description: "Maximum capacity for large events. Full-size bus with all modern amenities.",
  },
];

export const CATEGORIES = ["All", "Economy", "Comfort", "Premium", "Group", "Corporate"] as const;

export const SEATERS = [
  "All",
  "4 Seater",
  "6 Seater",
  "7 Seater",
  "17 Seater",
  "26 Seater",
  "50 Seater",
] as const;
