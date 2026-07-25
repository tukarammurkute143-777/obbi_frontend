import type { ClosedBooking } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

export default function BookingsSection({ bookings }: { bookings: ClosedBooking[] }) {
  return (
    <ReportSectionCard title="✅ Closed Bookings">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["#", "Customer", "Mobile", "Route", "Cab", "Date", "Amount"]} />
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b.id} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                <td className="py-2 pr-3">{b.customer}</td>
                <td className="py-2 pr-3 text-report-text/70">{b.mobile}</td>
                <td className="py-2 pr-3">{b.route}</td>
                <td className="py-2 pr-3">{b.cab}</td>
                <td className="py-2 pr-3 text-report-text/70">{b.date}</td>
                <td className="py-2 pr-3 font-medium">₹{b.amount.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  );
}
