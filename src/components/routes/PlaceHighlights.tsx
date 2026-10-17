import { CATEGORY_META, type RouteCategory } from "@/lib/routes/categories";

interface PlaceHighlightsProps {
  places: string[];
  to: string;
  category: RouteCategory;
}

export default function PlaceHighlights({ places, to, category }: PlaceHighlightsProps) {
  const emoji = CATEGORY_META[category].emoji;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
        Top Places to Visit — {to}
      </h2>

      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {places.map((place) => (
          <li
            key={place}
            className="flex items-center gap-3 rounded-xl border border-border bg-glass px-4 py-3 font-body text-sm text-text backdrop-blur-sm transition-colors duration-300 hover:border-gold/50"
          >
            <span className="text-2xl" aria-hidden="true">
              {emoji}
            </span>
            {place}
          </li>
        ))}
      </ul>
    </section>
  );
}
