import type { RouteData } from "@/lib/routes/routesData";

export default function RouteStats({ route }: { route: RouteData }) {
  const stats = [
    { emoji: "📍", label: "Distance", value: route.distance },
    { emoji: "⏱️", label: "Duration", value: route.duration },
    { emoji: "🌤️", label: "Best Time", value: route.bestTime },
    { emoji: "⭐", label: `${route.trips} trips`, value: `${route.rating}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-glass px-4 py-3 text-center backdrop-blur-sm"
        >
          <span className="text-xl">{stat.emoji}</span>
          <p className="mt-1 font-display text-lg font-semibold text-text">{stat.value}</p>
          <p className="font-body text-xs text-text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
