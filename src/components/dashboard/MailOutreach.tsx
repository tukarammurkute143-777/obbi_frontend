"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_MAIL_OUTREACH, MOCK_MAIL_RECIPIENTS } from "@/lib/dashboard/constants";

export default function MailOutreach() {
  const [showDrilldown, setShowDrilldown] = useState(false);
  const maxDaily = Math.max(...MOCK_MAIL_OUTREACH.daily.map((d) => d.count));

  const stats = [
    { label: "Total Sent Today", value: MOCK_MAIL_OUTREACH.today.total },
    { label: "Welcome", value: MOCK_MAIL_OUTREACH.today.welcome },
    { label: "Re-engage", value: MOCK_MAIL_OUTREACH.today.reengage },
    { label: "This Week", value: MOCK_MAIL_OUTREACH.week },
    { label: "This Month", value: MOCK_MAIL_OUTREACH.month },
  ];

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <h2 className="font-display text-2xl text-text">📧 Mail Outreach</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => setShowDrilldown((s) => !s)}
            className="flex flex-col items-start rounded-xl border border-border bg-dark/40 p-3.5 text-left transition-colors hover:border-gold"
          >
            <span className="font-display text-2xl text-gold-light">{stat.value}</span>
            <span className="mt-0.5 font-body text-xs text-text-muted">{stat.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {MOCK_MAIL_OUTREACH.daily.map((day) => (
          <div key={day.day} className="flex items-center gap-3">
            <span className="w-10 shrink-0 font-body text-xs text-text-muted">{day.day}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-dark-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
                style={{ width: `${(day.count / maxDaily) * 100}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-body text-xs text-text-muted">
              {day.count}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowDrilldown((s) => !s)}
        className="mt-5 flex items-center gap-1.5 font-body text-sm text-gold-light hover:underline"
      >
        {showDrilldown ? "Hide" : "View"} recipient details
        {showDrilldown ? (
          <ChevronUp className="h-4 w-4" strokeWidth={2} />
        ) : (
          <ChevronDown className="h-4 w-4" strokeWidth={2} />
        )}
      </button>

      {showDrilldown && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-text-muted">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Customer</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Mail Type</th>
                <th className="py-2 pr-3">Visits</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MAIL_RECIPIENTS.map((recipient, index) => (
                <tr key={recipient.id} className="border-b border-border/60">
                  <td className="py-2.5 pr-3 text-text-muted">{index + 1}</td>
                  <td className="py-2.5 pr-3 text-text">{recipient.customer}</td>
                  <td className="py-2.5 pr-3 text-text-muted">{recipient.email}</td>
                  <td className="py-2.5 pr-3 text-text-muted">{recipient.time}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        recipient.mailType === "Welcome"
                          ? "bg-gold/15 text-gold-light"
                          : "bg-orange/15 text-orange"
                      }`}
                    >
                      {recipient.mailType}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-text-muted">{recipient.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
