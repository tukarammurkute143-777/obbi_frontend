import type { DriverRow } from "@/lib/reports/mockReportData";
import ReportSectionCard, { reportTableClass, ReportTableHead } from "./ReportSectionCard";

const KM_PER_TRIP = 242;

export default function DriverSection({ drivers }: { drivers: DriverRow[] }) {
  return (
    <ReportSectionCard title="🧑‍✈️ Driver Details">
      <div className="overflow-x-auto">
        <table className={reportTableClass()}>
          <ReportTableHead columns={["#", "Driver Name", "Trips", "Routes", "Cab", "Total KM"]} />
          <tbody>
            {drivers.map((d, i) => (
              <tr key={d.name} className="border-b border-report-border text-report-text">
                <td className="py-2 pr-3 text-report-text/60">{i + 1}</td>
                <td className="py-2 pr-3">{d.name}</td>
                <td className="py-2 pr-3">{d.trips}</td>
                <td className="py-2 pr-3">{d.routes}</td>
                <td className="py-2 pr-3">{d.cab}</td>
                <td className="py-2 pr-3">{d.trips * KM_PER_TRIP} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  );
}
