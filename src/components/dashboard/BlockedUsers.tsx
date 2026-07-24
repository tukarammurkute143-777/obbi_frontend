"use client";

import { useState } from "react";
import { MOCK_BLOCKED, MOCK_BLOCKED_THIS_MONTH } from "@/lib/dashboard/constants";
import { getUnblockedIds, unblockUser } from "@/lib/dashboard/storage";

const REASON_STYLES: Record<string, string> = {
  "Multi-account": "bg-red/15 text-red",
  "Suspicious IP": "bg-red/15 text-red",
  "Rate limit": "bg-orange/15 text-orange",
  "VPN detected": "bg-blue-500/15 text-blue-400",
};

const REASON_DOT: Record<string, string> = {
  "Multi-account": "🔴",
  "Suspicious IP": "🔴",
  "Rate limit": "🟡",
  "VPN detected": "🔵",
};

export default function BlockedUsers() {
  const [unblockedIds, setUnblockedIds] = useState<number[]>(() => getUnblockedIds());

  const handleUnblock = (id: number, account: string) => {
    const confirmed = window.confirm(`Unblock ${account}? They'll be able to log in again.`);
    if (!confirmed) return;
    setUnblockedIds(unblockUser(id));
  };

  return (
    <div id="blocked-users" className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <h2 className="font-display text-2xl text-text">🛡️ Fraud Shield</h2>
      <p className="mt-1 font-body text-sm text-text-muted">
        Blocked Today: {MOCK_BLOCKED.length} | Total This Month: {MOCK_BLOCKED_THIS_MONTH}
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse font-body text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-text-muted">
              <th className="py-2 pr-3">#</th>
              <th className="py-2 pr-3">IP Address</th>
              <th className="py-2 pr-3">Email/Mobile</th>
              <th className="py-2 pr-3">Reason</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BLOCKED.map((entry, index) => {
              const isUnblocked = unblockedIds.includes(entry.id);
              return (
                <tr key={entry.id} className="border-b border-border/60">
                  <td className="py-3 pr-3 text-text-muted">{index + 1}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-text-muted">{entry.ip}</td>
                  <td className="py-3 pr-3 text-text">{entry.account}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${REASON_STYLES[entry.reason]}`}
                    >
                      {REASON_DOT[entry.reason]} {entry.reason}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-text-muted">{entry.time}</td>
                  <td className="py-3 pr-3">
                    {isUnblocked ? (
                      <span className="text-green">Unblocked ✅</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-red">Blocked 🔴</span>
                        <button
                          type="button"
                          onClick={() => handleUnblock(entry.id, entry.account)}
                          className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-gold hover:text-gold-light"
                        >
                          Unblock
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
