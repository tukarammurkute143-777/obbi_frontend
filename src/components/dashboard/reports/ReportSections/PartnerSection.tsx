import type { PartnerRow } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function PartnerSection({
  partners,
  totalCommission,
  totalPayouts,
}: {
  partners: PartnerRow[];
  totalCommission: number;
  totalPayouts: number;
}) {
  return (
    <ReportSectionCard title="🤝 Partner / Vendor">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["#", "Partner", "Vehicle", "Route", "Total", "Commission", "Payout"]} />
          <tbody>
            {partners.map((p, i) => (
              <tr key={p.partner} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                <td className="py-2 pr-3">{p.partner}</td>
                <td className="py-2 pr-3">{p.vehicle}</td>
                <td className="py-2 pr-3">{p.route}</td>
                <td className="py-2 pr-3">₹{p.total.toLocaleString("en-IN")}</td>
                <td className="py-2 pr-3">₹{p.commission.toLocaleString("en-IN")}</td>
                <td className="py-2 pr-3 font-medium">₹{p.payout.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-6 text-sm font-medium text-report-text">
        <span>Total Commission → ₹{totalCommission.toLocaleString("en-IN")} 💰</span>
        <span>Total Payouts → ₹{totalPayouts.toLocaleString("en-IN")}</span>
      </div>
    </ReportSectionCard>
  );
}
