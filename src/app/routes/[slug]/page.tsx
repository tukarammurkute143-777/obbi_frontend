import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RouteHero from "@/components/routes/RouteHero";
import RouteStats from "@/components/routes/RouteStats";
import TopPlaces from "@/components/routes/TopPlaces";
import AvailableVehicles from "@/components/routes/AvailableVehicles";
import RouteReviews from "@/components/routes/RouteReviews";
import RouteBookingCTA from "@/components/routes/RouteBookingCTA";
import RouteQuickBook from "@/components/routes/RouteQuickBook";
import RelatedRoutes from "@/components/routes/RelatedRoutes";
import { ROUTES_DATA, getRelatedRoutes, getRouteBySlug } from "@/lib/routes/routesData";

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROUTES_DATA.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    return { title: "Route Not Found — Obii Cabs" };
  }

  return {
    title: route.seoTitle,
    description: route.seoDescription,
    keywords: route.seoKeywords,
    alternates: {
      canonical: `/routes/${route.slug}`,
    },
    openGraph: {
      title: route.seoTitle,
      description: route.seoDescription,
      url: `/routes/${route.slug}`,
      images: [{ url: route.image }],
    },
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const related = getRelatedRoutes(route.relatedRoutes);

  return (
    <>
      <Navbar />

      <main className="flex flex-1 flex-col bg-dark">
        <RouteHero route={route} />

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

              <TopPlaces places={route.topPlaces} to={route.to} />

              <AvailableVehicles
                vehicles={route.recommendedVehicles}
                from={route.from}
                to={route.to}
              />

              <RouteReviews reviews={route.reviews} from={route.from} to={route.to} />

              <RouteBookingCTA from={route.from} to={route.to} />
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
              <RouteQuickBook from={route.from} to={route.to} />
              <RelatedRoutes routes={related} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
