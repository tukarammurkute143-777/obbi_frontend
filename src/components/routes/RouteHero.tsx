import Image from "next/image";
import { Clock, MapPin, MessageCircle, Phone, Sun } from "lucide-react";
import type { RouteData } from "@/lib/routes/routesData";
import { routeWhatsappMessage, telHref, whatsappHref } from "@/lib/contactLinks";

export default function RouteHero({ route }: { route: RouteData }) {
  return (
    <section className="relative h-[250px] w-full overflow-hidden sm:h-[400px]">
      <Image
        src={route.image}
        alt={`${route.from} to ${route.to} cab service`}
        fill
        // The hero is the LCP element on every route page, so it loads eagerly
        // and is preloaded from the document head.
        preload
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-6xl px-5 pb-7 sm:px-8 sm:pb-10">
          <div className="flex flex-wrap gap-2">
            {route.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-gold/40 bg-dark/70 px-3 py-1 font-body text-[11px] text-gold-light backdrop-blur-sm sm:text-xs"
              >
                {highlight}
              </span>
            ))}
          </div>

          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-text sm:text-6xl">
            {route.from} <span className="text-gold-light">→</span> {route.to}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-body text-sm text-text-muted sm:text-base">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold-light" strokeWidth={2} />
              {route.distance}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold-light" strokeWidth={2} />
              {route.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-gold-light" strokeWidth={2} />
              Best: {route.bestTime}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref()}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Book This Trip
            </a>
            <a
              href={whatsappHref(routeWhatsappMessage(route.from, route.to))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-dark/60 px-6 py-3 font-body font-medium text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/10"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
