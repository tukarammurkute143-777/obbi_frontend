import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function PaymentSection({ paymentMode }: { paymentMode: ReportData["paymentMode"] }) {
  const rows = [
    { label: "Cash", count: paymentMode.cash },
    { label: "Online", count: paymentMode.online },
    { label: "Pending", count: paymentMode.pending },
  ];
  const maxCount = Math.max(...rows.map((r) => r.count), 1);

  return (
    <ReportSectionCard title="💳 Payment Mode">
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-16 text-sm text-report-text/70">{row.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-report-light">
              <div
                className="h-full rounded-full bg-report-gold"
                style={{ width: `${(row.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="w-24 text-right text-sm text-report-text/70">{row.count} bookings</span>
          </div>
        ))}
      </div>
    </ReportSectionCard>
  );
}
