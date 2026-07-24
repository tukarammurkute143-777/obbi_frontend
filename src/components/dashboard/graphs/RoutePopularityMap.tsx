"use client";

import { motion } from "framer-motion";
import { MOCK_ROUTE_POPULARITY } from "@/lib/dashboard/constants";

export default function RoutePopularityMap() {
  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">ROUTE POPULARITY</p>
      <h3 className="mt-1 font-display text-xl text-text">Top 5 Routes</h3>

      <div className="mt-6 flex flex-col gap-4">
        {MOCK_ROUTE_POPULARITY.map((route, index) => (
          <div key={route.route}>
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
                transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
