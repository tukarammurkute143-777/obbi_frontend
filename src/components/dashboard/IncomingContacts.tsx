"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { MOCK_INCOMING } from "@/lib/dashboard/constants";
import { getIncomingStatusOverrides, setIncomingStatus } from "@/lib/dashboard/storage";

type Tab = "calls" | "whatsapp";

export default function IncomingContacts() {
  const [tab, setTab] = useState<Tab>("calls");
  const [calls, setCalls] = useState(() => {
    const overrides = getIncomingStatusOverrides();
    return MOCK_INCOMING.calls.map((c) => ({
      ...c,
      status: overrides[`calls-${c.id}`] ?? c.status,
    }));
  });
  const [whatsapp, setWhatsapp] = useState(() => {
    const overrides = getIncomingStatusOverrides();
    return MOCK_INCOMING.whatsapp.map((w) => ({
      ...w,
      status: overrides[`whatsapp-${w.id}`] ?? w.status,
    }));
  });

  const markDone = (type: Tab, id: number) => {
    setIncomingStatus(type, id, "done");
    if (type === "calls") {
      setCalls((prev) => prev.map((c) => (c.id === id ? { ...c, status: "done" } : c)));
    } else {
      setWhatsapp((prev) => prev.map((w) => (w.id === id ? { ...w, status: "done" } : w)));
    }
  };

  return (
    <div id="incoming-contacts" className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <h2 className="font-display text-2xl text-text">📥 Incoming Reminder</h2>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("calls")}
          className={`rounded-full border px-4 py-1.5 font-body text-sm transition-colors ${
            tab === "calls"
              ? "border-gold bg-gold text-dark"
              : "border-gold/40 text-gold-light hover:bg-gold/10"
          }`}
        >
          📞 Calls ({calls.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("whatsapp")}
          className={`rounded-full border px-4 py-1.5 font-body text-sm transition-colors ${
            tab === "whatsapp"
              ? "border-gold bg-gold text-dark"
              : "border-gold/40 text-gold-light hover:bg-gold/10"
          }`}
        >
          💬 WhatsApp ({whatsapp.length})
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse font-body text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-text-muted">
              <th className="py-2 pr-3">#</th>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Number</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {(tab === "calls" ? calls : whatsapp).map((entry, index) => {
              const doubleIntent = "hasWhatsApp" in entry ? entry.hasWhatsApp : entry.hasCall;
              return (
                <tr key={entry.id} className="border-b border-border/60">
                  <td className="py-3 pr-3 text-text-muted">{index + 1}</td>
                  <td className="py-3 pr-3">
                    <span className="text-text">{entry.name}</span>
                    {doubleIntent && (
                      <span className="ml-2 rounded-full bg-orange/15 px-2 py-0.5 text-xs text-orange">
                        🔥 Double Intent — Call First!
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-text-muted">+91 {entry.number}</td>
                  <td className="py-3 pr-3 text-text-muted">{entry.time}</td>
                  <td className="py-3 pr-3">
                    {entry.status === "done" ? (
                      <span className="text-green">🟢 Done</span>
                    ) : (
                      <span className="text-red">🔴 Pending</span>
                    )}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      {tab === "calls" ? (
                        <a
                          href={`tel:+91${entry.number}`}
                          className="flex items-center gap-1 rounded-full border border-gold px-3 py-1.5 text-xs text-gold-light transition-colors hover:bg-gold/10"
                        >
                          <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                          Call Back
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/91${entry.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-full bg-[#25D366]/15 px-3 py-1.5 text-xs text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                        >
                          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                          Reply
                        </a>
                      )}
                      {entry.status !== "done" && (
                        <button
                          type="button"
                          onClick={() => markDone(tab, entry.id)}
                          className="rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-green hover:text-green"
                        >
                          ✅
                        </button>
                      )}
                    </div>
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
