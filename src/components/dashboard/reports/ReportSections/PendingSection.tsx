import type { PendingLead } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function PendingSection({ leads }: { leads: PendingLead[] }) {
  return (
    <ReportSectionCard title="🟡 Pending Leads">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["#", "Customer", "Mobile", "Last Contact", "Status"]} />
          <tbody>
            {leads.map((lead, i) => (
              <tr key={lead.id} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                <td className="py-2 pr-3">{lead.customer}</td>
                <td className="py-2 pr-3 text-report-text/70">{lead.mobile}</td>
                <td className="py-2 pr-3 text-report-text/70">{lead.lastContact}</td>
                <td className="py-2 pr-3">{lead.status} 🟡</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  );
}
