"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/dashboard/constants";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-gold-light transition-colors hover:border-gold"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[10px] font-semibold text-white">
          {MOCK_NOTIFICATIONS.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-72 overflow-hidden rounded-2xl border border-border bg-dark-2/95 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <p className="px-4 py-2 font-body text-xs font-semibold tracking-wide text-gold-dark">
            RECENT ALERTS
          </p>
          {MOCK_NOTIFICATIONS.map((note) => (
            <div
              key={note.id}
              className="border-t border-border px-4 py-3 font-body text-sm text-text"
            >
              {note.text}
              <p className="mt-1 font-body text-xs text-text-muted">{note.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
