import type { ReactNode } from "react";

interface ReportSectionCardProps {
  title: string;
  children: ReactNode;
}

export default function ReportSectionCard({ title, children }: ReportSectionCardProps) {
  return (
    <section className="border-b border-report-border px-6 py-6 last:border-b-0">
      <h3 className="font-display text-lg font-semibold text-report-text">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function reportTableClass() {
  return "w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm";
}

export function ReportTableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-report-border text-report-text/60">
        {columns.map((col) => (
          <th key={col} className="py-2 pr-3 font-medium">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
