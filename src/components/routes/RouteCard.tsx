import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { CATEGORY_META } from "@/lib/routes/categories";
import PhotoCredit from "./PhotoCredit";
import type { RouteListItem } from "./types";

export default function RouteCard({ route }: { route: RouteListItem }) {
  const { image } = route;
  const category = CATEGORY_META[route.category];

  return (
    // The whole card is clickable through the stretched title link, so the
    // photo credit below can be a real link too (a link inside a link is invalid).
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-dark/70 px-2.5 py-1 font-body text-[11px] text-gold-light backdrop-blur-sm">
          {category.emoji} {category.label}
        </span>
        <PhotoCredit show={image.fromPixabay} className="absolute bottom-2 right-3 z-10 max-w-[85%] text-right" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-text">
          <Link
            href={`/routes/${route.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {route.from} <span className="text-gold-light">→</span> {route.to}
          </Link>
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

        <p className="mt-2 font-body text-xs text-text-muted">{route.popularFor}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm text-gold-light">
          View Route
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </article>
  );
}
