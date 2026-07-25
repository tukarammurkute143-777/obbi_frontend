import type { CabRow } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function CabSection({ cabs }: { cabs: CabRow[] }) {
  return (
    <ReportSectionCard title="🚗 Cab Breakdown">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["Cab", "Bookings", ""]} />
          <tbody>
            {cabs.map((c) => (
              <tr key={c.cab} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3">{c.cab}</td>
                <td className="py-2 pr-3">{c.bookings} bookings</td>
                <td className="py-2 pr-3 font-medium text-report-gold">{c.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  );
}
