"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Mic, MessageSquare, Send, X } from "lucide-react";
import type { ChatMessage } from "@/lib/portal/types";
import Toast from "./Toast";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  text: "Namaste! Main Safar hu — aapka AI travel companion. Kahan jaana hai? 🗺️",
  sender: "bot",
  timestamp: new Date(),
};

function botReply(userText: string): string {
  return `Bahut achha! ${userText} ke liye itinerary bana raha hu... 🗺️ Kitne log hai aur kab jaana hai? 😊`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SafarBot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "voice">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [toast, setToast] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, botTyping]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          text: botReply(text),
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setBotTyping(false);
    }, 1000);
  };

  const handleVoiceClick = () => {
    setMode("voice");
    setToast("Voice feature coming soon!");
  };

  return (
    <>
      <div className="fixed bottom-[140px] right-5 z-50 flex flex-col items-center sm:bottom-[164px] sm:right-6">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close Safar chat" : "Open Safar chat"}
            aria-expanded={open}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark shadow-[0_0_24px_rgba(201,168,76,0.5)] transition-shadow hover:shadow-[0_0_32px_rgba(201,168,76,0.75)]"
          >
            <Compass className="h-6 w-6" strokeWidth={2} />
          </button>
        </motion.div>
        <span className="mt-1 font-body text-[11px] font-medium text-gold-light">
          Safar
        </span>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-[232px] right-5 z-50 flex h-[min(480px,70vh)] w-[min(320px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-dark-2/95 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md sm:bottom-[264px] sm:right-6"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 font-display text-base text-gold-light">
              <Compass className="h-4 w-4" strokeWidth={2} />
              Safar
              <span className="flex items-center gap-1 font-body text-[10px] font-normal text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Online
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-text-muted transition-colors hover:text-gold-light"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div className="flex gap-1 border-b border-border px-3 py-2">
            <button
              type="button"
              onClick={() => setMode("chat")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs transition-colors ${
                mode === "chat"
                  ? "bg-gold/15 text-gold-light"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
              Chat
            </button>
            <button
              type="button"
              onClick={handleVoiceClick}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs transition-colors ${
                mode === "voice"
                  ? "bg-gold/15 text-gold-light"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <Mic className="h-3.5 w-3.5" strokeWidth={2} />
              Voice
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.sender === "bot" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 font-body text-sm ${
                    message.sender === "bot"
                      ? "border border-border bg-glass text-text"
                      : "bg-gold-light/15 text-text"
                  }`}
                >
                  {message.text}
                </div>
                <span className="mt-1 font-body text-[10px] text-text-muted">
                  {formatTime(message.timestamp)}
                </span>
              </motion.div>
            ))}

            {botTyping && (
              <div className="flex items-start">
                <div className="rounded-2xl border border-border bg-glass px-3.5 py-2.5 font-body text-sm text-text-muted">
                  Safar is typing…
                </div>
              </div>
            )}
          </div>

          {mode === "voice" ? (
            <div className="flex items-center justify-center gap-3 border-t border-border px-4 py-4">
              <button
                type="button"
                onClick={handleVoiceClick}
                aria-label="Record voice message"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark shadow-[0_0_20px_rgba(201,168,76,0.4)]"
              >
                <Mic className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-border px-3 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                aria-label="Message Safar"
                className="w-full rounded-full border border-border bg-dark/40 px-4 py-2 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          )}
        </motion.div>
      )}

      {toast && <Toast message={toast} onDismiss={() => setToast("")} />}
    </>
  );
}
