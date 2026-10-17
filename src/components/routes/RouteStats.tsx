import type { Route } from "@/lib/routes/allRoutes";

export default function RouteStats({
  route,
}: {
  route: Pick<Route, "distance" | "duration" | "bestTime" | "bestTimeNote" | "popularFor">;
}) {
  const stats = [
    { emoji: "📍", label: "Distance", value: route.distance },
    { emoji: "⏱️", label: "Driving time", value: route.duration },
    { emoji: "🌤️", label: "Best time", value: route.bestTime },
    { emoji: "✨", label: "Popular for", value: route.popularFor },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-glass px-4 py-3 text-center backdrop-blur-sm"
          >
            <span className="text-xl">{stat.emoji}</span>
            <p className="mt-1 font-display text-base font-semibold leading-snug text-text sm:text-lg">
              {stat.value}
            </p>
            <p className="font-body text-xs text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 font-body text-xs text-text-muted">
        {route.bestTimeNote ? `${route.bestTimeNote}. ` : ""}
        Distance and driving time are approximate and vary with the route taken and traffic.
      </p>
    </div>
  );
}
