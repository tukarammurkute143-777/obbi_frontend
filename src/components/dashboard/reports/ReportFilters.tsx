"use client";

import { useState } from "react";
import {
  REPORT_PERIODS,
  SECTION_LABELS,
  type ReportFormat,
  type ReportSectionToggles,
} from "@/lib/reports/mockReportData";

interface ReportFiltersProps {
  format: ReportFormat;
  onFormatChange: (format: ReportFormat) => void;
  period: string;
  onPeriodChange: (period: string) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onApplyCustomRange: () => void;
  sections: ReportSectionToggles;
  onToggleSection: (key: keyof ReportSectionToggles) => void;
  onGenerate: () => void;
  generating: boolean;
}

export default function ReportFilters({
  format,
  onFormatChange,
  period,
  onPeriodChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
  onApplyCustomRange,
  sections,
  onToggleSection,
  onGenerate,
  generating,
}: ReportFiltersProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <h2 className="font-display text-2xl text-text">📊 Generate Report</h2>

      <div>
        <p className="mb-2 font-body text-xs font-semibold tracking-wide text-gold-dark">FORMAT</p>
        <div className="flex gap-2">
          {(["PDF", "PNG"] as ReportFormat[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onFormatChange(option)}
              className={`flex-1 rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                format === option
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/40 text-gold-light hover:bg-gold/10"
              }`}
            >
              {option === "PDF" ? "📄 PDF" : "🖼️ PNG"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-body text-xs font-semibold tracking-wide text-gold-dark">PERIOD</p>
        <div className="flex flex-wrap gap-2">
          {REPORT_PERIODS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onPeriodChange(option)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors ${
                period === option
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/40 text-gold-light hover:bg-gold/10"
              }`}
            >
              {option}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomPicker((s) => !s)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors ${
              period === "Custom"
                ? "border-gold bg-gold text-dark"
                : "border-gold/40 text-gold-light hover:bg-gold/10"
            }`}
          >
            Custom Range 📅
          </button>
        </div>

        {showCustomPicker && (
          <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-dark/40 p-3">
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

      <div>
        <p className="mb-2 font-body text-xs font-semibold tracking-wide text-gold-dark">
          SECTIONS TO INCLUDE
        </p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-body text-sm text-text-muted opacity-60">
            <input type="checkbox" checked disabled className="h-4 w-4 accent-[#C9A84C]" />
            P&L Summary (always on)
          </label>
          {SECTION_LABELS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 font-body text-sm text-text-muted">
              <input
                type="checkbox"
                checked={sections[key]}
                onChange={() => onToggleSection(key)}
                className="h-4 w-4 accent-[#C9A84C]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={generating}
        className="rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {generating ? `Building ${format}…` : "Generate Report 📊"}
      </button>
    </div>
  );
}
