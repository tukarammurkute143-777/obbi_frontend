"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Send, X } from "lucide-react";
import { getMyBookings } from "@/lib/api";
import { getToken } from "@/lib/auth/loginUtils";
import { CONTACT } from "@/lib/constants";

interface Message {
  id: number;
  sender: "user" | "safar";
  text: string;
  time: Date;
}

const WELCOME =
  "Namaste! 🙏 Main Safar hoon, aapki Maharashtra travel guide. Kahan jaana hai aaj?";

const NOT_LOGGED_IN = "Pehle login karo! Booking track karne ke liye login zaroori hai. 🔐";
const BOOKING_CONFIRMED = "Aapki booking confirm hai! ✅ Ab main aapka itinerary bana sakti hoon.";
const NO_BOOKING = `Abhi koi confirmed booking nahi hai. Booking ke liye call karo: ${CONTACT.phone} 📞`;
const BACKEND_PENDING =
  "Main abhi backend se connect ho rahi hoon... 🙏 Backend deploy hone ke baad main poori tarah kaam karongi!";

// Itinerary and hotel help are for customers with a confirmed booking, so
// anything that sounds like booking, itinerary or hotel goes through the check.
const BOOKING_WORDS = /\b(book|booking|bookings|itinerary|hotel|hotels|ticket|reservation|trip plan)\b/i;

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

// The token key is "obbi_token" (see loginUtils); "obii_token" is accepted too.
function readToken(): string | null {
  const token = getToken();
  if (token) return token;
  try {
    return window.localStorage.getItem("obii_token");
  } catch {
    return null;
  }
}

async function answerBookingQuestion(): Promise<string> {
  const token = readToken();
  if (!token) return NOT_LOGGED_IN;

  const result = await getMyBookings(token);
  if (result.status === 401 || result.status === 403) return NOT_LOGGED_IN;
  if (!result.ok) return BACKEND_PENDING;
  return result.bookings.length > 0 ? BOOKING_CONFIRMED : NO_BOOKING;
}

export default function SafarChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 0, sender: "safar", text: WELCOME, time: new Date() },
  ]);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  // The customer portal has its own Safar bot.
  if (pathname.startsWith("/portal")) return null;

  const push = (sender: Message["sender"], text: string) =>
    setMessages((prev) => [...prev, { id: nextId.current++, sender, text, time: new Date() }]);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    push("user", text);
    setTyping(true);
    const reply = BOOKING_WORDS.test(text) ? await answerBookingQuestion() : BACKEND_PENDING;
    setTyping(false);
    push("safar", reply);
  };

  return (
    <>
      {/* Sits above the WhatsApp and call buttons (bottom-right stack). */}
      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Safar chat"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[9.5rem] right-5 z-50 flex flex-col items-center gap-0.5 sm:bottom-[10.5rem] sm:right-6"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-2xl shadow-[0_0_20px_rgba(201,168,76,0.45)] sm:h-14 sm:w-14">
            <span aria-hidden>🧭</span>
          </span>
          <span className="rounded-full bg-dark/80 px-2 py-0.5 font-body text-[10px] font-medium text-gold-light">
            Safar
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Safar chat"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-3 z-[60] flex h-[min(34rem,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-dark-2 shadow-[0_0_40px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96"
          >
            <header className="flex items-center gap-3 border-b border-border bg-dark-3 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark">
                <Compass className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-semibold leading-tight text-text">Safar 🧭</h2>
                <p className="flex items-center gap-1.5 font-body text-xs text-text-muted">
                  <span className="h-2 w-2 rounded-full bg-green" aria-hidden />
                  Maharashtra Travel Assistant · Online
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Safar chat"
                className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-glass hover:text-text"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-dark px-4 py-4" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 font-body text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "rounded-br-sm bg-gradient-to-br from-gold-light to-gold text-dark"
                        : "rounded-bl-sm border border-border bg-dark-3 text-text"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <p
                      className={`mt-1 text-right text-[10px] ${
                        m.sender === "user" ? "text-dark/60" : "text-text-muted"
                      }`}
                    >
                      {formatTime(m.time)}
                    </p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-border bg-dark-3 px-4 py-3 font-body text-sm text-text-muted">
                    Safar typing...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-border bg-dark-3 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Safar se poochho..."
                aria-label="Message to Safar"
                className="min-w-0 flex-1 rounded-full border border-border bg-dark/60 px-4 py-2.5 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
