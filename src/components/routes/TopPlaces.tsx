import type { RoutePlace } from "@/lib/routes/routesData";

export default function TopPlaces({ places, to }: { places: RoutePlace[]; to: string }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
        Top Places to Visit in {to}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {places.map((place) => (
          <div
            key={place.name}
            className="rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold/50"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{place.emoji}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-text">{place.name}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-text-muted">
                  {place.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
