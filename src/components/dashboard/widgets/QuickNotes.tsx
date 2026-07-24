"use client";

import { useState } from "react";
import { addNote, getNotes, type QuickNote } from "@/lib/dashboard/storage";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function QuickNotes() {
  const [notes, setNotes] = useState<QuickNote[]>(() => getNotes());
  const [text, setText] = useState("");

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNotes(addNote(trimmed));
    setText("");
  };

  return (
    <div className="rounded-2xl border border-border bg-glass p-5">
      <p className="font-body text-xs font-semibold tracking-wide text-gold-dark">
        📋 QUICK NOTES
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Jot a quick note..."
        className="mt-3 w-full rounded-xl border border-border bg-dark/40 px-3.5 py-2.5 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={!text.trim()}
        className="mt-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-4 py-1.5 font-body text-xs font-medium text-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Save Note
      </button>

      <div className="mt-4 flex flex-col gap-2">
        {notes.slice(0, 3).map((note) => (
          <div key={note.id} className="rounded-lg border border-border bg-dark/30 px-3 py-2">
            <p className="font-body text-sm text-text">{note.text}</p>
            <p className="mt-1 font-body text-[11px] text-text-muted">
              {formatTimestamp(note.timestamp)}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="font-body text-xs text-text-muted">Koi note nahi hai abhi.</p>
        )}
      </div>
    </div>
  );
}
