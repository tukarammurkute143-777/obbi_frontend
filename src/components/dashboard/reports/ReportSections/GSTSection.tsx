import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

export default function GSTSection({ gst }: { gst: ReportData["gst"] }) {
  const rows = [
    { label: "Total Revenue", value: gst.totalRevenue },
    { label: `GST (${gst.gstRate}%)`, value: gst.gstAmount },
    { label: "Net Revenue", value: gst.netRevenue },
    { label: "Tax Payable", value: gst.gstAmount },
  ];

  return (
    <ReportSectionCard title="🧮 GST Summary">
      <div className="flex flex-col gap-1">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm text-report-text/80">
            <span>{row.label}</span>
            <span className="font-medium text-report-text">₹{row.value.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic text-report-text/50">(For CA use)</p>
    </ReportSectionCard>
  );
}
