"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import DashboardNavbar from "../DashboardNavbar";
import ReportFilters from "./ReportFilters";
import ReportPreview from "./ReportPreview";
import DownloadButtons, { type ExportJob } from "./DownloadButtons";
import {
  DEFAULT_SECTION_TOGGLES,
  MOCK_REPORT,
  type ReportFormat,
  type ReportSectionToggles,
} from "@/lib/reports/mockReportData";
import {
  downloadReportPDF,
  downloadReportPNG,
  shareReportWhatsApp,
} from "@/lib/reports/exportReport";

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function formatRangeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ReportsContent() {
  const [format, setFormat] = useState<ReportFormat>("PDF");
  const [period, setPeriod] = useState("Last 7 Days");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState(todayISO());
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const [sections, setSections] = useState<ReportSectionToggles>(DEFAULT_SECTION_TOGGLES);
  const [busy, setBusy] = useState<ExportJob>(null);
  const [error, setError] = useState<string | null>(null);

  // The preview and every exported file share this label, so the heading in the
  // PDF always matches the range the owner actually selected.
  const periodLabel =
    period === "Custom" && appliedRange
      ? `${formatRangeDate(appliedRange.from)} — ${formatRangeDate(appliedRange.to)}`
      : period;

  const toggleSection = (key: keyof ReportSectionToggles) => {
    setSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const applyCustomRange = () => {
    setAppliedRange({ from: customFrom, to: customTo });
    setPeriod("Custom");
  };

  const runExport = async (job: Exclude<ExportJob, null>) => {
    setBusy(job);
    setError(null);
    try {
      if (job === "pdf") {
        await downloadReportPDF(periodLabel);
      } else {
        await downloadReportPNG(periodLabel);
      }
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not generate the report — please try again."
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <DashboardNavbar />

      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Dashboard
        </Link>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,30%)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
            <ReportFilters
              format={format}
              onFormatChange={setFormat}
              period={period}
              onPeriodChange={setPeriod}
              customFrom={customFrom}
              customTo={customTo}
              onCustomFromChange={setCustomFrom}
              onCustomToChange={setCustomTo}
              onApplyCustomRange={applyCustomRange}
              sections={sections}
              onToggleSection={toggleSection}
              onGenerate={() => runExport(format === "PDF" ? "pdf" : "png")}
              generating={busy !== null}
            />

            <DownloadButtons
              busy={busy}
              onDownloadPDF={() => runExport("pdf")}
              onDownloadPNG={() => runExport("png")}
              onShareWhatsApp={() => shareReportWhatsApp(periodLabel, MOCK_REPORT)}
            />

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red/40 bg-red/10 px-4 py-3 font-body text-sm text-red"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                {error}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <ReportPreview period={periodLabel} sections={sections} />
          </div>
        </div>
      </main>
    </div>
  );
}
