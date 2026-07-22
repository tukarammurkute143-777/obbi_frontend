"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Sparkles } from "lucide-react";
import { MOCK_BOOKINGS } from "@/lib/portal/constants";

function scrollToSearch() {
  document
    .getElementById("search-section")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MyBookings() {
  return (
    <section id="bookings" className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            My Bookings
          </h2>
        </div>

        {MOCK_BOOKINGS.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center rounded-3xl border border-border bg-glass p-10 text-center backdrop-blur-sm sm:p-14"
          >
            <span className="text-5xl">🗺️</span>
            <p className="mt-5 font-display text-xl text-text sm:text-2xl">
              Abhi tak koi safar nahi hua
            </p>
            <p className="mt-2 font-body text-sm text-text-muted">
              Apni pehli Maharashtra trip plan karo!
            </p>
            <button
              type="button"
              onClick={scrollToSearch}
              className="mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
            >
              Plan a Trip
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {MOCK_BOOKINGS.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-body text-sm text-gold-dark">
                    <ClipboardList className="h-4 w-4" strokeWidth={2} />
                    Booking #{booking.id}
                  </div>
                  <p className="mt-1 font-display text-lg text-text">
                    {booking.route} | {booking.date}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-body text-sm text-text-muted">
                    {booking.vehicle} · Status:{" "}
                    <span className="flex items-center gap-1 text-gold-light">
                      {booking.status === "confirmed" && (
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                      {booking.status[0].toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-gold px-5 py-2 font-body text-sm text-gold-light transition-colors hover:bg-gold/10"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
