"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyStat } from "@/lib/dashboard/constants";
import ChartTooltip from "./ChartTooltip";

interface CompetitorAttackGraphProps {
  data: DailyStat[];
}

const ATTACK_THRESHOLD = 5;

interface WarningLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

function WarningLabel({ x, y, width, value }: WarningLabelProps) {
  if (value === undefined || value <= ATTACK_THRESHOLD || x === undefined || y === undefined || width === undefined) {
    return null;
  }
  return (
    <text x={x + width / 2} y={y - 8} textAnchor="middle" fontSize={14}>
      ⚠️
    </text>
  );
}

export default function CompetitorAttackGraph({ data }: CompetitorAttackGraphProps) {
  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">COMPETITOR ATTACK</p>
      <h3 className="mt-1 font-display text-xl text-text">Blocked IPs — Last 7 Days</h3>

      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="#1A1A26" vertical={false} />
            <XAxis dataKey="day" stroke="#6B6455" fontSize={12} tickLine={false} axisLine={{ stroke: "#1A1A26" }} />
            <YAxis stroke="#6B6455" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              content={
                <ChartTooltip
                  formatter={(item) =>
                    `${item.value} blocks${Number(item.value) > ATTACK_THRESHOLD ? " ⚠️ Attack day!" : ""}`
                  }
                />
              }
              cursor={{ fill: "rgba(239,68,68,0.06)" }}
            />
            <Bar dataKey="blocked" name="Blocked IPs" fill="#EF4444" radius={[4, 4, 0, 0]} label={<WarningLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
