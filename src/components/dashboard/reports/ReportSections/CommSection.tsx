import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function CommSection({ communication }: { communication: ReportData["communication"] }) {
  const stats = [
    { label: "Calls Made", value: communication.callsMade },
    { label: "WhatsApp Sent", value: communication.whatsappSent },
    { label: "Mails Sent", value: communication.mailsSent },
    { label: "Response Rate", value: `${communication.responseRate}%` },
  ];

  return (
    <ReportSectionCard title="📞 Communication Summary">
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
