"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { RevenuePoint } from "@/lib/dashboard/constants";
import ChartTooltip from "./ChartTooltip";

interface RevenueTrendGraphProps {
  data: RevenuePoint[];
}

export default function RevenueTrendGraph({ data }: RevenueTrendGraphProps) {
  const first = data[0]?.revenue ?? 0;
  const last = data[data.length - 1]?.revenue ?? 0;
  const growthPercent = first > 0 ? Math.round(((last - first) / first) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-xs tracking-wide text-gold-dark">REVENUE TREND</p>
          <h3 className="mt-1 font-display text-xl text-text">Last 4 Weeks</h3>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-3 py-1 font-body text-xs text-green">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
          {growthPercent >= 0 ? "+" : ""}
          {growthPercent}%
        </span>
      </div>

      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1A1A26" vertical={false} />
            <XAxis dataKey="week" stroke="#6B6455" fontSize={12} tickLine={false} axisLine={{ stroke: "#1A1A26" }} />
            <YAxis
              stroke="#6B6455"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `₹${value / 1000}k`}
            />
            <Tooltip
              content={<ChartTooltip formatter={(item) => `${item.name}: ₹${item.value?.toLocaleString("en-IN")}`} />}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#E8C97A"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
