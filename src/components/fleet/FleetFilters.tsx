"use client";

import { CATEGORIES, SEATERS } from "@/lib/fleet/constants";

interface FleetFiltersProps {
  categoryFilter: string;
  seaterFilter: string;
  onCategoryChange: (category: string) => void;
  onSeaterChange: (seater: string) => void;
  resultCount: number;
}

function FilterRow({
  options,
  active,
  onChange,
}: {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-body text-sm transition-colors duration-200 ${
            active === option
              ? "border-gold bg-gold text-dark"
              : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function FleetFilters({
  categoryFilter,
  seaterFilter,
  onCategoryChange,
  onSeaterChange,
  resultCount,
}: FleetFiltersProps) {
  return (
    <div className="sticky top-[76px] z-30 border-b border-border bg-dark-2/90 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8">
        <FilterRow
          options={SEATERS}
          active={seaterFilter}
          onChange={onSeaterChange}
        />
        <FilterRow
          options={CATEGORIES}
          active={categoryFilter}
          onChange={onCategoryChange}
        />
        <p className="font-body text-xs text-text-muted">
          Showing {resultCount} vehicle{resultCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
