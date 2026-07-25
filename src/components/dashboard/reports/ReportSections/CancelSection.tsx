import type { CancellationRow } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function CancelSection({
  cancellations,
  leadsReceived,
}: {
  cancellations: CancellationRow[];
  leadsReceived: number;
}) {
  const revenueLost = cancellations.reduce((sum, c) => sum + c.amount, 0);
  const cancellationRate = leadsReceived > 0 ? Math.round((cancellations.length / leadsReceived) * 100) : 0;

  return (
    <ReportSectionCard title="❌ Cancellation Report">
      <p className="mb-3 text-sm text-report-text/70">
        Total Cancellations → <span className="font-semibold text-report-text">{cancellations.length}</span>
      </p>
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["#", "Customer", "Route", "Reason", "Date"]} />
          <tbody>
            {cancellations.map((c, i) => (
              <tr key={`${c.customer}-${c.date}`} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                <td className="py-2 pr-3">{c.customer}</td>
                <td className="py-2 pr-3">{c.route}</td>
                <td className="py-2 pr-3">{c.reason}</td>
                <td className="py-2 pr-3 text-report-text/70">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-6 text-sm font-medium text-report-text">
        <span>Revenue Lost → ₹{revenueLost.toLocaleString("en-IN")}</span>
        <span>Cancellation Rate → {cancellationRate}%</span>
      </div>
    </ReportSectionCard>
  );
}
