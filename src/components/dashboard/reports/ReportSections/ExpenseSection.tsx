import type { ExpenseRow } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function ExpenseSection({ expenses }: { expenses: ExpenseRow[] }) {
  return (
    <ReportSectionCard title="🧾 Expense Tracking">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead
            columns={["#", "Customer", "Vehicle", "Route", "Date", "Fuel", "Toll", "Driver", "Maint.", "Total"]}
          />
          <tbody>
            {expenses.map((e, i) => {
              const total = e.fuel + e.toll + e.driver + e.maintenance;
              return (
                <tr key={`${e.customer}-${e.date}`} className="border-b border-report-border text-report-text">
                  <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                  <td className="py-2 pr-3">{e.customer}</td>
                  <td className="py-2 pr-3">{e.vehicle}</td>
                  <td className="py-2 pr-3">{e.route}</td>
                  <td className="py-2 pr-3 text-report-text/70">{e.date}</td>
                  <td className="py-2 pr-3">₹{e.fuel}</td>
                  <td className="py-2 pr-3">₹{e.toll}</td>
                  <td className="py-2 pr-3">₹{e.driver}</td>
                  <td className="py-2 pr-3">₹{e.maintenance}</td>
                  <td className="py-2 pr-3 font-medium">₹{total.toLocaleString("en-IN")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  );
}
