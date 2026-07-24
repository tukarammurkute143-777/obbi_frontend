import type { DATE_FILTERS } from "./constants";

/**
 * Mock dashboard data represents a single "Today" snapshot. Since there's
 * no real per-day backend yet, date-range filters apply a deterministic
 * scale factor so the whole dashboard visibly responds to filter changes
 * without fabricating a fake historical dataset.
 */
export const FILTER_SCALE: Record<(typeof DATE_FILTERS)[number], number> = {
  Today: 1,
  Yesterday: 0.85,
  "Last 7 Days": 6.4,
  "Last 30 Days": 22,
  "Last 60 Days": 41,
  "Last 90 Days": 58,
  "This Month": 17,
  "Last Month": 24,
  "This Year": 210,
};

export function scaleValue(value: number, scale: number): number {
  return Math.round(value * scale);
}
