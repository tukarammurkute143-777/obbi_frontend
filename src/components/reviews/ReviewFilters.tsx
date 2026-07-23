"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  DATE_FILTERS,
  RATING_OPTIONS,
  ROUTES_LIST,
  VEHICLES_LIST,
} from "@/lib/reviews/constants";

const VISIBLE_ROUTES_COUNT = 6;

interface ReviewFiltersProps {
  routeFilter: string;
  vehicleFilter: string;
  ratingFilter: string;
  dateFilter: string;
  customFrom: string;
  customTo: string;
  onRouteChange: (value: string) => void;
  onVehicleChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onApplyCustomRange: () => void;
  onClearFilter: (key: "route" | "vehicle" | "rating" | "date") => void;
  onClearAll: () => void;
  resultCount: number;
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-body text-sm transition-colors duration-200 ${
        active
          ? "border-gold bg-gold text-dark"
          : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
      }`}
    >
      {children}
    </button>
  );
}

export default function ReviewFilters({
  routeFilter,
  vehicleFilter,
  ratingFilter,
  dateFilter,
  customFrom,
  customTo,
  onRouteChange,
  onVehicleChange,
  onRatingChange,
  onDateChange,
  onCustomFromChange,
  onCustomToChange,
  onApplyCustomRange,
  onClearFilter,
  onClearAll,
  resultCount,
}: ReviewFiltersProps) {
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const visibleRoutes = showAllRoutes
    ? ROUTES_LIST
    : ROUTES_LIST.slice(0, VISIBLE_ROUTES_COUNT);

  const activeFilters: { key: "route" | "vehicle" | "rating" | "date"; label: string }[] = [];
  if (routeFilter !== "All Routes")
    activeFilters.push({ key: "route", label: routeFilter });
  if (vehicleFilter !== "All Vehicles")
    activeFilters.push({ key: "vehicle", label: vehicleFilter });
  if (ratingFilter !== "All")
    activeFilters.push({ key: "rating", label: `${ratingFilter}⭐` });
  if (dateFilter !== "All")
    activeFilters.push({
      key: "date",
      label: dateFilter === "Custom" ? `${customFrom || "…"} → ${customTo || "…"}` : dateFilter,
    });

  return (
    <div className="sticky top-[76px] z-30 border-b border-border bg-dark-2/90 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {visibleRoutes.map((route) => (
            <FilterChip
              key={route}
              active={routeFilter === route}
              onClick={() => onRouteChange(route)}
            >
              {route}
            </FilterChip>
          ))}
          {ROUTES_LIST.length > VISIBLE_ROUTES_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllRoutes((s) => !s)}
              className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-border px-4 py-1.5 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
            >
              {showAllRoutes ? "Less Routes" : "More Routes"}
              {showAllRoutes ? (
                <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
              )}
            </button>
          )}
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {VEHICLES_LIST.map((vehicle) => (
            <FilterChip
              key={vehicle}
              active={vehicleFilter === vehicle}
              onClick={() => onVehicleChange(vehicle)}
            >
              {vehicle}
            </FilterChip>
          ))}
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {RATING_OPTIONS.map((rating) => (
            <FilterChip
              key={rating}
              active={ratingFilter === rating}
              onClick={() => onRatingChange(rating)}
            >
              {rating === "All" ? "All" : "⭐".repeat(parseInt(rating, 10))}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
            {DATE_FILTERS.map((date) => (
              <FilterChip
                key={date}
                active={dateFilter === date}
                onClick={() => onDateChange(date)}
              >
                {date}
              </FilterChip>
            ))}
            <FilterChip
              active={dateFilter === "Custom"}
              onClick={() => setShowCustomPicker((s) => !s)}
            >
              Custom Date Range 📅
            </FilterChip>
          </div>

          {showCustomPicker && (
            <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-dark/40 p-3">
              <label className="flex flex-col gap-1 font-body text-xs text-text-muted">
                From
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => onCustomFromChange(e.target.value)}
                  className="rounded-lg border border-border bg-dark px-3 py-2 font-body text-sm text-text outline-none focus:border-gold [color-scheme:dark]"
                />
              </label>
              <label className="flex flex-col gap-1 font-body text-xs text-text-muted">
                To
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => onCustomToChange(e.target.value)}
                  className="rounded-lg border border-border bg-dark px-3 py-2 font-body text-sm text-text outline-none focus:border-gold [color-scheme:dark]"
                />
              </label>
              <button
                type="button"
                disabled={!customFrom || !customTo}
                onClick={() => {
                  onApplyCustomRange();
                  setShowCustomPicker(false);
                }}
                className="rounded-lg bg-gradient-to-r from-gold-light to-gold-dark px-4 py-2 font-body text-sm font-medium text-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => onClearFilter(filter.key)}
                className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 font-body text-xs text-gold-light transition-colors hover:bg-gold/25"
              >
                {filter.label}
                <X className="h-3 w-3" strokeWidth={2} />
              </button>
            ))}
            <button
              type="button"
              onClick={onClearAll}
              className="font-body text-xs text-text-muted underline-offset-2 hover:text-gold-light hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        <p className="font-body text-xs text-text-muted">
          Showing {resultCount} review{resultCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
