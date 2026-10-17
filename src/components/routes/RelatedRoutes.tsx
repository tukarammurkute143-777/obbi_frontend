import Link from "next/link";
import { CATEGORY_META } from "@/lib/routes/categories";
import type { RouteListItem } from "./types";

interface RelatedRoutesProps {
  routes: Omit<RouteListItem, "image">[];
  title?: string;
}

// Text-only on purpose: Unsplash requires a visible credit next to every photo
// it supplies, which does not fit on a thumbnail.
export default function RelatedRoutes({
  routes,
  title = "Related Pilgrimage Routes",
}: RelatedRoutesProps) {
  if (routes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm">
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>

      <div className="mt-4 flex flex-col gap-2">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-border/60 px-3 py-2.5 transition-colors duration-200 hover:border-gold/50 hover:bg-gold/5"
          >
            <span className="text-2xl" aria-hidden="true">
              {CATEGORY_META[route.category].emoji}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-body text-sm font-medium text-text group-hover:text-gold-light">
                {route.from} → {route.to}
              </span>
              <span className="block font-body text-xs text-text-muted">
                {route.distance} · {route.popularFor}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
