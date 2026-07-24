"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyStat } from "@/lib/dashboard/constants";
import ChartTooltip from "./ChartTooltip";

interface DailyOverviewGraphProps {
  data: DailyStat[];
  dataTypeFilter: string;
}

export default function DailyOverviewGraph({ data, dataTypeFilter }: DailyOverviewGraphProps) {
  const showLogins = dataTypeFilter === "All" || dataTypeFilter === "Logins";
  const showBookings = dataTypeFilter === "All" || dataTypeFilter === "Bookings";
  const showBlocked = dataTypeFilter === "All" || dataTypeFilter === "Blocked";

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">DAILY OVERVIEW</p>
      <h3 className="mt-1 font-display text-xl text-text">Last 7 Days</h3>

      <div className="mt-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="#1A1A26" vertical={false} />
            <XAxis dataKey="day" stroke="#6B6455" fontSize={12} tickLine={false} axisLine={{ stroke: "#1A1A26" }} />
            <YAxis stroke="#6B6455" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(201,168,76,0.06)" }} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#6B6455" }} />
            {showLogins && <Bar dataKey="logins" name="Logins" fill="#C9A84C" radius={[4, 4, 0, 0]} />}
            {showBookings && <Bar dataKey="bookings" name="Bookings" fill="#22C55E" radius={[4, 4, 0, 0]} />}
            {showBlocked && <Bar dataKey="blocked" name="Blocked" fill="#EF4444" radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
