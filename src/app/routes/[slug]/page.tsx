import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RouteHero from "@/components/routes/RouteHero";
import RouteStats from "@/components/routes/RouteStats";
import TopPlaces from "@/components/routes/TopPlaces";
import PlaceHighlights from "@/components/routes/PlaceHighlights";
import AvailableVehicles from "@/components/routes/AvailableVehicles";
import RouteReviews from "@/components/routes/RouteReviews";
import RouteBookingCTA from "@/components/routes/RouteBookingCTA";
import RouteQuickBook from "@/components/routes/RouteQuickBook";
import RelatedRoutes from "@/components/routes/RelatedRoutes";
import {
  ALL_ROUTES,
  getRelatedPilgrimageRoutes,
  getRoute,
  routeSeo,
  type Route,
} from "@/lib/routes/allRoutes";
import { getRouteBySlug as getLegacyRoute, type RouteVehicle } from "@/lib/routes/routesData";
import { VEHICLES as FLEET } from "@/lib/fleet/constants";
import { fetchRouteImage } from "@/lib/unsplash";

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_ROUTES.map((route) => ({ slug: route.slug }));
}

function routeImage(route: Route, width: number) {
  return fetchRouteImage(route.unsplashQuery, {
    category: route.category,
    fallback: route.fallbackImage,
    width,
    alt: `${route.from} to ${route.to} cab service`,
  });
}

// Vehicle cards for routes without hand-written ones. Names come from the real
// fleet list; there is no price on any card.
function fleetCards(names: string[]): RouteVehicle[] {
  return names.flatMap((name) => {
    const v = FLEET.find((f) => f.name === name);
    if (!v) return [];
    return [
      {
        name: v.name,
        emoji: v.emoji,
        reason: `Seats up to ${v.seats} passengers. Good for ${v.bestFor.slice(0, 2).join(" and ").toLowerCase()}.`,
      },
    ];
  });
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) {
    return { title: "Route Not Found — Obii Cabs" };
  }

  const seo = routeSeo(route);
  const image = await routeImage(route, 1200);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/routes/${route.slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/routes/${route.slug}`,
      images: [{ url: image.url }],
    },
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) {
    notFound();
  }

  // Routes that were written by hand keep their detailed places and reviews.
  const legacy = getLegacyRoute(route.slug);
  const image = await routeImage(route, 1600);
  const related = getRelatedPilgrimageRoutes(route);

  return (
    <>
      <Navbar />

      <main className="flex flex-1 flex-col bg-dark">
        <RouteHero route={route} image={image} />

        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 font-body text-xs text-text-muted"
          >
            <Link href="/" className="transition-colors hover:text-gold-light">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            <Link href="/routes" className="transition-colors hover:text-gold-light">
              Routes
            </Link>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-text">
              {route.from} → {route.to}
            </span>
          </nav>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
            <div className="flex min-w-0 flex-col gap-10">
              <RouteStats route={route} />

              <p className="font-body text-base leading-[1.8] text-text-muted sm:text-lg">
                {route.description}
              </p>

              {legacy ? (
                <TopPlaces places={legacy.topPlaces} to={route.to} />
              ) : (
                <PlaceHighlights
                  places={route.highlights}
                  to={route.to}
                  category={route.category}
                />
              )}

              <AvailableVehicles
                vehicles={legacy ? legacy.recommendedVehicles : fleetCards(route.vehicles)}
                from={route.from}
                to={route.to}
              />

              {legacy && (
                <RouteReviews reviews={legacy.reviews} from={route.from} to={route.to} />
              )}

              <RouteBookingCTA from={route.from} to={route.to} />
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
              <RouteQuickBook from={route.from} to={route.to} />
              <RelatedRoutes
                routes={related}
                title={
                  route.category === "pilgrimage"
                    ? "Related Pilgrimage Routes"
                    : "Popular Pilgrimage Routes"
                }
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
