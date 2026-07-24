"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";

interface LoginTypePieChartProps {
  mobilePercent: number;
  gmailPercent: number;
  total: number;
  loginTypeFilter: string;
}

export default function LoginTypePieChart({
  mobilePercent,
  gmailPercent,
  total,
  loginTypeFilter,
}: LoginTypePieChartProps) {
  const data =
    loginTypeFilter === "Mobile Only"
      ? [{ name: "Mobile OTP", value: 100 }]
      : loginTypeFilter === "Gmail Only"
        ? [{ name: "Gmail", value: 100 }]
        : [
            { name: "Mobile OTP", value: mobilePercent },
            { name: "Gmail", value: gmailPercent },
          ];

  const colors = ["#C9A84C", "#3B82F6"];

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">LOGIN TYPE SPLIT</p>
      <h3 className="mt-1 font-display text-xl text-text">📱 Mobile vs 📧 Gmail</h3>

      <div className="relative mt-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip formatter={(item) => `${item.name}: ${item.value}%`} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-semibold text-text">{total}</span>
          <span className="font-body text-xs text-text-muted">Total Logins</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-6 font-body text-sm text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          Mobile OTP {loginTypeFilter === "Gmail Only" ? "" : `— ${loginTypeFilter === "Mobile Only" ? 100 : mobilePercent}%`}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
          Gmail {loginTypeFilter === "Mobile Only" ? "" : `— ${loginTypeFilter === "Gmail Only" ? 100 : gmailPercent}%`}
        </span>
      </div>
    </div>
  );
}
