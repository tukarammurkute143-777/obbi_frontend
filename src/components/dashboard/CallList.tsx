"use client";

import { useMemo, useState } from "react";
import { Phone } from "lucide-react";
import { MOCK_CALL_LIST } from "@/lib/dashboard/constants";
import { getCallStatusOverrides, setCallStatus } from "@/lib/dashboard/storage";

function parseTimeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

const FILTERS = ["All", "Not Called", "Called"] as const;

export default function CallList() {
  const [entries, setEntries] = useState(() => {
    const overrides = getCallStatusOverrides();
    return MOCK_CALL_LIST.map((entry) => ({
      ...entry,
      called: overrides[entry.id] ?? entry.called,
    }));
  });
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const sorted = useMemo(
    () => [...entries].sort((a, b) => parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time)),
    [entries]
  );

  const filtered = sorted.filter((entry) => {
    if (filter === "Not Called") return !entry.called;
    if (filter === "Called") return entry.called;
    return true;
  });

  const markDone = (id: number) => {
    setCallStatus(id, true);
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, called: true } : e)));
  };

  return (
    <div id="call-list" className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-text">📞 Aaj Ke Call List</h2>
          <p className="mt-1 font-body text-sm text-text-muted">
            Mobile se login karne wale customers
          </p>
        </div>
        <div className="flex gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`rounded-full border px-3 py-1.5 font-body text-xs transition-colors duration-200 ${
                filter === option
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/40 text-gold-light hover:bg-gold/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse font-body text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-text-muted">
              <th className="py-2 pr-3">#</th>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Mobile</th>
              <th className="py-2 pr-3">Login Time</th>
              <th className="py-2 pr-3">Visits Today</th>
              <th className="py-2 pr-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-border/60 ${
                  entry.called ? "bg-green/5" : "bg-red/5"
                }`}
              >
                <td className="py-3 pr-3 text-text-muted">{index + 1}</td>
                <td className="py-3 pr-3 text-text">{entry.name}</td>
                <td className="py-3 pr-3 text-text-muted">+91 {entry.mobile}</td>
                <td className="py-3 pr-3 text-text-muted">{entry.time}</td>
                <td className="py-3 pr-3">
                  {entry.visits > 2 ? (
                    <span className="rounded-full bg-orange/15 px-2.5 py-1 text-xs text-orange">
                      🔥 Hot Lead · {entry.visits} visits
                    </span>
                  ) : (
                    <span className="text-text-muted">
                      {entry.visits} visit{entry.visits === 1 ? "" : "s"}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:+91${entry.mobile}`}
                      className="flex items-center gap-1 rounded-full border border-gold px-3 py-1.5 text-xs text-gold-light transition-colors hover:bg-gold/10"
                    >
                      <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                      Call
                    </a>
                    {entry.called ? (
                      <span className="rounded-full bg-green/15 px-3 py-1.5 text-xs text-green">
                        🟢 Called
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markDone(entry.id)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-green hover:text-green"
                      >
                        ✅ Done
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-text-muted">
                  Koi entry nahi mili.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
