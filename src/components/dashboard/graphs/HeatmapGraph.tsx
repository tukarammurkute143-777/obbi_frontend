"use client";

import { Fragment, useState } from "react";
import { HEATMAP_DAYS, HEATMAP_SLOTS, MOCK_HEATMAP } from "@/lib/dashboard/constants";

export default function HeatmapGraph() {
  const [hovered, setHovered] = useState<{ slot: number; day: number } | null>(null);

  const max = Math.max(...MOCK_HEATMAP.flat());

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">LOGIN HEATMAP</p>
      <h3 className="mt-1 font-display text-xl text-text">Day vs Time</h3>

      <div className="relative mt-5 overflow-x-auto">
        <div className="grid min-w-[420px] grid-cols-[60px_repeat(7,1fr)] gap-1.5">
          <div />
          {HEATMAP_DAYS.map((day) => (
            <div key={day} className="text-center font-body text-xs text-text-muted">
              {day}
            </div>
          ))}

          {HEATMAP_SLOTS.map((slot, slotIndex) => (
            <Fragment key={slot}>
              <div className="flex items-center font-body text-xs text-text-muted">{slot}</div>
              {HEATMAP_DAYS.map((day, dayIndex) => {
                const value = MOCK_HEATMAP[slotIndex][dayIndex];
                const intensity = 0.12 + (value / max) * 0.88;
                const isHovered = hovered?.slot === slotIndex && hovered?.day === dayIndex;
                return (
                  <div key={`${slot}-${day}`} className="relative">
                    <div
                      onMouseEnter={() => setHovered({ slot: slotIndex, day: dayIndex })}
                      onMouseLeave={() => setHovered(null)}
                      className="aspect-square w-full cursor-default rounded-md transition-transform duration-150 hover:scale-110"
                      style={{ backgroundColor: `rgba(201, 168, 76, ${intensity})` }}
                    />
                    {isHovered && (
                      <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-dark-2 px-2.5 py-1 font-body text-xs text-text shadow-lg">
                        {day} {slot} — {value} logins
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 font-body text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(201,168,76,0.15)" }} />
          Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(201,168,76,0.55)" }} />
          Medium
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(201,168,76,1)" }} />
          High
        </span>
      </div>
    </div>
  );
}
