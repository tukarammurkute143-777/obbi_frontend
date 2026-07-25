import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function RatingSection({ ratings }: { ratings: ReportData["ratings"] }) {
  const bars = [
    { label: "5 Star", count: ratings.fiveStar },
    { label: "4 Star", count: ratings.fourStar },
    { label: "3 Star", count: ratings.threeStar },
  ];
  const maxCount = Math.max(...bars.map((b) => b.count), 1);

  return (
    <ReportSectionCard title="⭐ Rating Summary">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl font-bold text-report-text">{ratings.average}</span>
        <span className="text-report-gold">⭐</span>
        <span className="text-sm text-report-text/60">
          Verified Trips: {ratings.verifiedTrips}/{ratings.verifiedTrips}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-16 text-sm text-report-text/70">{bar.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-report-light">
              <div
                className="h-full rounded-full bg-report-gold"
                style={{ width: `${(bar.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="w-24 text-right text-sm text-report-text/70">{bar.count} customers</span>
          </div>
        ))}
      </div>
    </ReportSectionCard>
  );
}
