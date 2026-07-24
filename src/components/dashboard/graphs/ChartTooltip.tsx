"use client";

interface ChartTooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: ChartTooltipPayloadItem[];
  formatter?: (item: ChartTooltipPayloadItem) => string;
}

export default function ChartTooltip({ active, label, payload, formatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-dark-2/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {label && (
        <p className="mb-1 font-body text-xs font-semibold text-gold-light">{label}</p>
      )}
      {payload.map((item, index) => (
        <p key={index} className="font-body text-xs text-text">
          <span style={{ color: item.color }}>●</span>{" "}
          {formatter ? formatter(item) : `${item.name}: ${item.value}`}
        </p>
      ))}
    </div>
  );
}
