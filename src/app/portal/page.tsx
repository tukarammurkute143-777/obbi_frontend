import type { Metadata } from "next";
import PortalContent from "@/components/portal/PortalContent";
import { ALL_ROUTES } from "@/lib/routes/allRoutes";

export const metadata: Metadata = {
  title: "My Portal — Obii Cabs | Book Cab in Maharashtra",
  description:
    "Book premium cabs in Maharashtra. Pune to Shirdi, Mumbai, Nashik. AI-powered travel planning with Safar bot.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalPage() {
  // Only the three fields the search needs, so the full route data (copy,
  // highlights) stays out of the client bundle.
  const routeIndex = ALL_ROUTES.map(({ slug, from, to }) => ({ slug, from, to }));
  return <PortalContent routes={routeIndex} />;
}
