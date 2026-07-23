"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ROUTE_POPULARITY } from "@/lib/reviews/constants";

export default function RatingSummary() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-glass p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 font-body text-xs tracking-wide text-gold-dark">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            AI SUMMARY
          </div>
          <p className="mt-3 font-body text-sm text-text sm:text-base">
            Customers consistently praise punctuality, spotless cabs, and
            professional drivers — especially on the Pune–Shirdi pilgrimage
            route and family trips to Mahabaleshwar. Group bookings with the
            Urbania and Full Bus routinely get called out for handling large
            parties without a hitch.
          </p>
        </motion.div>

        <div className="mt-12">
          <h2 className="text-center font-display text-3xl font-semibold text-text sm:text-4xl">
            Popular Routes This Month
          </h2>

          <div className="mt-8 flex flex-col gap-5">
            {ROUTE_POPULARITY.map((route, index) => (
              <motion.div
                key={route.route}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="mb-1.5 flex items-center justify-between font-body text-sm text-text">
                  <span className="flex items-center gap-1.5">
                    {route.route}
                    {route.trending && <span>🔥</span>}
                  </span>
                  <span className="text-text-muted">{route.percent}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-dark-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${route.percent}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, delay: index * 0.08 + 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
