"use client";

import { useState } from "react";
import {
  DATA_TYPE_FILTERS,
  DATE_FILTERS,
  LOGIN_TYPE_FILTERS,
  TIME_FILTERS,
} from "@/lib/dashboard/constants";

interface DashboardFiltersProps {
  dateFilter: string;
  onDateChange: (value: string) => void;
  timeFilter: string;
  onTimeChange: (value: string) => void;
  dataTypeFilter: string;
  onDataTypeChange: (value: string) => void;
  loginTypeFilter: string;
  onLoginTypeChange: (value: string) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onApplyCustomRange: () => void;
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
          className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors duration-200 sm:text-sm ${
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

export default function DashboardFilters({
  dateFilter,
  onDateChange,
  timeFilter,
  onTimeChange,
  dataTypeFilter,
  onDataTypeChange,
  loginTypeFilter,
  onLoginTypeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
  onApplyCustomRange,
}: DashboardFiltersProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  return (
    <div className="sticky top-[64px] z-30 border-b border-border bg-dark-2/90 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 sm:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {DATE_FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onDateChange(option)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors duration-200 sm:text-sm ${
                dateFilter === option
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
              }`}
            >
              {option}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomPicker((s) => !s)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors duration-200 sm:text-sm ${
              dateFilter === "Custom"
                ? "border-gold bg-gold text-dark"
                : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
            }`}
          >
            Custom Range 📅
          </button>
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

        {dateFilter === "Today" && (
          <FilterRow options={TIME_FILTERS} active={timeFilter} onChange={onTimeChange} />
        )}

        <FilterRow
          options={DATA_TYPE_FILTERS}
          active={dataTypeFilter}
          onChange={onDataTypeChange}
        />

        <FilterRow
          options={LOGIN_TYPE_FILTERS}
          active={loginTypeFilter}
          onChange={onLoginTypeChange}
        />
      </div>
    </div>
  );
}
