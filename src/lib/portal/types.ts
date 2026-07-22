export interface Route {
  from: string;
  to: string;
  rating: number;
  trips: number;
  tag?: string;
  slug: string;
}

export interface Vehicle {
  emoji: string;
  name: string;
  seats: number;
  rating: number;
  features: string[];
  category: "Economy" | "Comfort" | "Premium" | "Group" | "Corporate";
}

export interface Booking {
  id: string;
  route: string;
  date: string;
  vehicle: string;
  status: "confirmed" | "completed" | "cancelled";
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}
