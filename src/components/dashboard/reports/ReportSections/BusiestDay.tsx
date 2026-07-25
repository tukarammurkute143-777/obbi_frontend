import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function BusiestDay({ busiestDay }: { busiestDay: ReportData["busiestDay"] }) {
  const stats = [
    { label: "Busiest Day", value: `${busiestDay.day} 🔥` },
    { label: "Most Bookings", value: `${busiestDay.bookings} trips` },
    { label: "Peak Time", value: busiestDay.peakTime },
  ];

  return (
    <ReportSectionCard title="📅 Busiest Day">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-report-light p-3">
            <p className="text-xs text-report-text/60">{stat.label}</p>
            <p className="mt-1 text-lg font-semibold text-report-text">{stat.value}</p>
          </div>
        ))}
      </div>
    </ReportSectionCard>
  );
}
