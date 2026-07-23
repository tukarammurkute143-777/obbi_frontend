export interface ContactCity {
  emoji: string;
  name: string;
}

export const CITIES: ContactCity[] = [
  { emoji: "📍", name: "Pune" },
  { emoji: "🏙️", name: "Mumbai" },
  { emoji: "🍇", name: "Nashik" },
  { emoji: "🛕", name: "Shirdi" },
  { emoji: "🏰", name: "Sambhajinagar" },
];

export interface QuickLink {
  emoji: string;
  label: string;
  href: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { emoji: "🚗", label: "Fleet Dekho", href: "/fleet" },
  { emoji: "⭐", label: "Reviews Padho", href: "/reviews" },
  { emoji: "ℹ️", label: "About Us", href: "/about" },
];
