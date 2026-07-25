import type { RouteRow } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function RouteSection({ routes }: { routes: RouteRow[] }) {
  const maxRevenue = Math.max(...routes.map((r) => r.revenue));

  return (
    <ReportSectionCard title="🛣️ Route Breakdown">
      <div className="flex flex-col gap-3">
        {routes.map((r) => (
          <div key={r.route}>
            <div className="flex items-center justify-between text-sm text-report-text">
              <span>{r.route}</span>
              <span className="text-report-text/70">
                {r.bookings} bookings · ₹{r.revenue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-report-light">
              <div
                className="h-full rounded-full bg-report-gold"
                style={{ width: `${(r.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </ReportSectionCard>
  );
}
