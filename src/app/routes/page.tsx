import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RoutesHero from "@/components/routes/RoutesHero";
import AllRoutesGrid from "@/components/routes/AllRoutesGrid";
import type { RouteListItem } from "@/components/routes/types";
import { ALL_ROUTES } from "@/lib/routes/allRoutes";
import { getRouteImage } from "@/lib/imageService";

export const metadata: Metadata = {
  title: "All Routes — Obii Cabs | Pilgrimage, Hill Station, Konkan & City Cab Routes",
  description:
    "Explore 120+ Obii Cabs routes across Maharashtra — Shirdi, Trimbakeshwar, Pandharpur, Ashtavinayak, Mahabaleshwar, Lonavala, Konkan, Goa, airport transfers and more. Distance, driving time and top places for every route.",
  keywords:
    "maharashtra cab routes, pune to shirdi cab, ashtavinayak darshan cab, jyotirlinga cab maharashtra, mumbai cab routes, obii cabs routes, outstation cab maharashtra",
  alternates: {
    canonical: "/routes",
  },
};

export default function RoutesPage() {
  const items: RouteListItem[] = ALL_ROUTES.map((route) => ({
    slug: route.slug,
    from: route.from,
    to: route.to,
    category: route.category,
    distance: route.distance,
    duration: route.duration,
    popularFor: route.popularFor,
    image: getRouteImage(route.slug, route.fallbackImage, `${route.from} to ${route.to} cab service`),
  }));

  const placeCount = new Set(ALL_ROUTES.flatMap((r) => [r.from, r.to])).size;

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <RoutesHero routeCount={ALL_ROUTES.length} placeCount={placeCount} />
        <AllRoutesGrid routes={items} />
      </main>
      <Footer />
    </>
  );
}
