import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { RouteData } from "@/lib/routes/routesData";

export default function RouteCard({ route }: { route: RouteData }) {
  return (
    <Link
      href={`/routes/${route.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]"
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={route.image}
          alt={`${route.from} to ${route.to} cab service`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-text">
          {route.from} <span className="text-gold-light">→</span> {route.to}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            {route.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            {route.duration}
          </span>
        </div>

        <p className="mt-2 font-body text-xs text-text-muted">
          ⭐ {route.rating} · {route.trips} trips
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm text-gold-light">
          View Route
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
