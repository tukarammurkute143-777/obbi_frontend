import { Droplets, Wind } from "lucide-react";
import { MOCK_WEATHER } from "@/lib/dashboard/constants";

interface WeatherWidgetProps {
  compact?: boolean;
}

export default function WeatherWidget({ compact = false }: WeatherWidgetProps) {
  if (compact) {
    return (
      <div className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 font-body text-xs text-text-muted sm:flex">
        <span>{MOCK_WEATHER.emoji}</span>
        {MOCK_WEATHER.tempC}°C
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-glass p-5">
      <p className="font-body text-xs font-semibold tracking-wide text-gold-dark">
        🌦️ WEATHER
      </p>
      <p className="mt-2 font-display text-lg text-text">{MOCK_WEATHER.location}</p>
      <p className="mt-1 font-display text-3xl text-gold-light">
        {MOCK_WEATHER.emoji} {MOCK_WEATHER.tempC}°C
        <span className="ml-2 font-body text-sm text-text-muted">
          {MOCK_WEATHER.condition}
        </span>
      </p>
      <div className="mt-3 flex items-center gap-4 font-body text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <Droplets className="h-3.5 w-3.5" strokeWidth={2} />
          Humidity: {MOCK_WEATHER.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <Wind className="h-3.5 w-3.5" strokeWidth={2} />
          Wind: {MOCK_WEATHER.windKmh} km/h
        </span>
      </div>
      <p className="mt-3 font-body text-sm text-green">{MOCK_WEATHER.travelNote}</p>
    </div>
  );
}
