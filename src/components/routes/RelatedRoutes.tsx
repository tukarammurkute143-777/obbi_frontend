import Image from "next/image";
import Link from "next/link";
import type { RouteData } from "@/lib/routes/routesData";

export default function RelatedRoutes({ routes }: { routes: RouteData[] }) {
  if (routes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm">
      <h3 className="font-display text-lg font-semibold text-text">Related Routes</h3>

      <div className="mt-4 flex flex-col gap-3">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-border/60 p-2 transition-colors duration-200 hover:border-gold/50 hover:bg-gold/5"
          >
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={route.image}
                alt={`${route.from} to ${route.to} cab`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-body text-sm font-medium text-text group-hover:text-gold-light">
                {route.from} → {route.to}
              </p>
              <p className="font-body text-xs text-text-muted">
                {route.distance} · ⭐ {route.rating}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
