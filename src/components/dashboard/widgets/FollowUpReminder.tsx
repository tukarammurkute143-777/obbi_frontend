"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addReminder, getReminders, removeReminder, type Reminder } from "@/lib/dashboard/storage";

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export default function FollowUpReminder() {
  const [reminders, setReminders] = useState<Reminder[]>(() => getReminders());
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");

  const upcoming = [...reminders].sort((a, b) => a.date.localeCompare(b.date));

  const handleAdd = () => {
    if (!customer.trim() || !date) return;
    setReminders(addReminder({ customer: customer.trim(), date, note: note.trim() }));
    setCustomer("");
    setNote("");
    setDate(todayISO());
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    setReminders(removeReminder(id));
  };

  return (
    <div className="rounded-2xl border border-border bg-glass p-5">
      <div className="flex items-center justify-between">
        <p className="font-body text-xs font-semibold tracking-wide text-gold-dark">
          ⏰ FOLLOW UP REMINDERS
        </p>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="rounded-full border border-gold/40 px-3 py-1 font-body text-xs text-gold-light transition-colors hover:bg-gold/10"
        >
          {showForm ? "Cancel" : "+ Add Reminder"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 flex flex-col gap-2">
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer name"
            className="rounded-lg border border-border bg-dark/40 px-3 py-2 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
          />
          <input
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-border bg-dark/40 px-3 py-2 font-body text-sm text-text outline-none focus:border-gold [color-scheme:dark]"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className="rounded-lg border border-border bg-dark/40 px-3 py-2 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!customer.trim() || !date}
            className="self-start rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-4 py-1.5 font-body text-xs font-medium text-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save Reminder
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {upcoming.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-start justify-between gap-2 rounded-lg border border-border bg-dark/30 px-3 py-2"
          >
            <div>
              <p className="font-body text-sm text-text">{reminder.customer}</p>
              {reminder.note && (
                <p className="font-body text-xs text-text-muted">{reminder.note}</p>
              )}
              <p className="mt-1 font-body text-[11px] text-gold-light">{reminder.date}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(reminder.id)}
              aria-label="Remove reminder"
              className="shrink-0 text-text-muted transition-colors hover:text-red"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        ))}
        {upcoming.length === 0 && (
          <p className="font-body text-xs text-text-muted">Koi reminder set nahi hai.</p>
        )}
      </div>
    </div>
  );
}
