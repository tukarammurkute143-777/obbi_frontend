import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

function ordinal(n: number): string {
  const rule = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };
  return `${n}${suffixes[rule.select(n)]}`;
}

export default function BestCustomer({ bestCustomer }: { bestCustomer: ReportData["bestCustomer"] }) {
  return (
    <ReportSectionCard title="👑 Best Customer of the Period">
      <div className="rounded-lg bg-report-light p-4">
        <p className="text-base font-semibold text-report-text">
          {bestCustomer.name} — {bestCustomer.mobile}
        </p>
        <p className="mt-1 text-sm text-report-text/70">
          {bestCustomer.route} — {bestCustomer.cab}
        </p>
        <p className="mt-2 text-sm font-medium text-report-gold">
          &ldquo;Repeat customer — {ordinal(bestCustomer.bookingCount)} booking! 🔥&rdquo;
        </p>
      </div>
    </ReportSectionCard>
  );
}
