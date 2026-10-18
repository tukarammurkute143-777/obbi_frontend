// Vehicles shown on the landing page. Photos are downloaded ahead of time into
// public/images/vehicles/ by scripts/fetch-vehicle-images.mjs. There is no
// pricing here by design. Pixabay has few photos of these exact models, so the
// alt text describes the kind of vehicle, not the model.

export interface ShowcaseVehicle {
  name: string;
  seats: number;
  category: "Economy" | "Comfort" | "Premium" | "SUV" | "Group" | "Corporate";
  rating: number;
  image: string;
  alt: string;
}

export const SHOWCASE_VEHICLES: ShowcaseVehicle[] = [
  { name: "Swift Dzire", seats: 4, category: "Economy", rating: 4.7, image: "/images/vehicles/dzire.jpg", alt: "Compact car for city and airport rides" },
  { name: "Maruti Ertiga", seats: 6, category: "Comfort", rating: 4.8, image: "/images/vehicles/ertiga.jpg", alt: "Family MPV cab" },
  { name: "Innova Crysta", seats: 7, category: "Premium", rating: 4.9, image: "/images/vehicles/crysta.jpg", alt: "Premium family car" },
  { name: "Kia Carens", seats: 7, category: "Comfort", rating: 4.8, image: "/images/vehicles/carens.jpg", alt: "Comfortable family car" },
  { name: "Scorpio N", seats: 7, category: "SUV", rating: 4.8, image: "/images/vehicles/scorpio.jpg", alt: "SUV for hills and long trips" },
  { name: "Urbania", seats: 17, category: "Group", rating: 4.8, image: "/images/vehicles/urbania.jpg", alt: "Van for group trips" },
  { name: "Mini Bus", seats: 26, category: "Group", rating: 4.7, image: "/images/vehicles/bus.jpg", alt: "Mini bus for large groups" },
  { name: "Full Bus", seats: 50, category: "Corporate", rating: 4.8, image: "/images/vehicles/coach.jpg", alt: "Full-size coach bus" },
];
