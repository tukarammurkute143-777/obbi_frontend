"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Flag, MapPin } from "lucide-react";
import type { AuthUser } from "@/lib/auth/loginUtils";
import { getLastTrip } from "@/lib/auth/loginUtils";
import { POPULAR_ROUTES } from "@/lib/portal/constants";

interface SearchSectionProps {
  user: AuthUser;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function buildGreeting(user: AuthUser, lastTripRoute: string | null): string {
  const firstName = user.name.split(" ")[0];
  if (user.isNewUser) {
    return `Namaste ${firstName}! Maharashtra explore karein 🚗`;
  }
  if (lastTripRoute) {
    return `Welcome back ${firstName}! Last time ${lastTripRoute} gaye the 🙏`;
  }
  return `Welcome back ${firstName}! Kahan jaana hai aaj? 😊`;
}

export default function SearchSection({ user }: SearchSectionProps) {
  const router = useRouter();
  const lastTrip = getLastTrip();

  const [from, setFrom] = useState(user.location ?? "Pune");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(todayISO());
  const [notice, setNotice] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setNotice("");

    const match = POPULAR_ROUTES.find(
      (route) =>
        route.from.toLowerCase() === from.trim().toLowerCase() &&
        route.to.toLowerCase() === to.trim().toLowerCase()
    );

    if (match) {
      router.push(`/routes/${match.slug}`);
      return;
    }

    setNotice(
      "Yeh route abhi hamari list mein nahi hai — call karo, hum custom booking arrange kar denge! 📞"
    );
  };

  return (
    <section
      id="search-section"
      className="relative px-5 pt-16 sm:px-8 sm:pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <h1 className="font-display text-3xl font-semibold text-text sm:text-4xl md:text-5xl">
          {buildGreeting(user, lastTrip?.route ?? null)}
        </h1>
        <p className="mt-3 font-body text-base font-light text-text-muted sm:text-lg">
          Maharashtra ki shaan — aapki cab, aapki marzi
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 w-full rounded-3xl border border-border bg-glass p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="flex items-center gap-1.5 font-body text-xs tracking-wide text-gold-dark">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                FROM
              </span>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Pune"
                className="rounded-xl border border-border bg-dark/40 px-3.5 py-3 font-body text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="flex items-center gap-1.5 font-body text-xs tracking-wide text-gold-dark">
                <Flag className="h-3.5 w-3.5" strokeWidth={2} />
                TO
              </span>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Shirdi, Mumbai..."
                className="rounded-xl border border-border bg-dark/40 px-3.5 py-3 font-body text-text outline-none placeholder:text-text-muted/60 focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="flex items-center gap-1.5 font-body text-xs tracking-wide text-gold-dark">
                <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                DATE
              </span>
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-border bg-dark/40 px-3.5 py-3 font-body text-text outline-none focus:border-gold [color-scheme:dark]"
              />
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] sm:col-span-2 md:col-span-1"
            >
              Find Cabs
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {notice && (
            <p className="mt-4 font-body text-sm text-gold-light">{notice}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
