import type { ReportData } from "@/lib/reports/mockReportData";
import ReportSectionCard from "./ReportSectionCard";

function inr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between py-1 text-sm ${
        bold ? "font-semibold text-report-text" : "text-report-text/80"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function PLSummarySection({ pl }: { pl: ReportData["pl"] }) {
  return (
    <ReportSectionCard title="💰 Profit & Loss Summary">
      <p className="mb-2 text-xs font-semibold tracking-wide text-report-text/50">INCOME</p>
      <Row label="My Vehicle Revenue" value={inr(pl.myVehicleRevenue)} />
      <Row label="Partner Commission" value={inr(pl.partnerCommission)} />
      <div className="my-2 border-t border-report-border" />
      <Row label="Total Income" value={inr(pl.totalIncome)} bold />

      <p className="mb-2 mt-5 text-xs font-semibold tracking-wide text-report-text/50">EXPENSES</p>
      <Row label="Google Ad Recharge" value={inr(pl.adRecharge)} />
      <Row label="Fuel Cost" value={inr(pl.fuel)} />
      <Row label="Toll Charges" value={inr(pl.toll)} />
      <Row label="Driver Cost" value={inr(pl.driver)} />
      <Row label="Maintenance" value={inr(pl.maintenance)} />
      <Row label="Partner Payouts" value={inr(pl.partnerPayouts)} />
      <div className="my-2 border-t border-report-border" />
      <Row label="Total Expenses" value={inr(pl.totalExpenses)} bold />

      <div className="my-3 border-t-2 border-report-text/20" />
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-report-text">Net Profit</span>
        <span className="text-base font-bold text-green">{inr(pl.netProfit)} ✅</span>
      </div>
      <div className="mt-1 text-right text-sm font-medium text-green">
        vs Last Period ↑ {pl.growthPercent}% 📈
      </div>
    </ReportSectionCard>
  );
}
