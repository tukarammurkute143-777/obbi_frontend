import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function OverviewSection({ overview }: { overview: ReportData["overview"] }) {
  const stats = [
    { label: "Google Leads Received", value: `${overview.leadsReceived}` },
    { label: "Leads Closed", value: `${overview.leadsClosed} ✅ (${overview.conversionRate}%)` },
    { label: "Leads Pending", value: `${overview.leadsPending} 🟡` },
    { label: "Conversion Rate", value: `${overview.conversionRate}% 🔥` },
  ];

  return (
    <ReportSectionCard title="📈 Overview">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
