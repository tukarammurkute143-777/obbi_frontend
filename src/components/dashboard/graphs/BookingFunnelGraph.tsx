"use client";

import { motion } from "framer-motion";
import { MOCK_FUNNEL } from "@/lib/dashboard/constants";

export default function BookingFunnelGraph() {
  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <p className="font-body text-xs tracking-wide text-gold-dark">BOOKING FUNNEL</p>
      <h3 className="mt-1 font-display text-xl text-text">Visitor → Booking</h3>

      <div className="mt-6 flex flex-col gap-4">
        {MOCK_FUNNEL.map((stage, index) => (
          <div key={stage.label}>
            <div className="mb-1.5 flex items-center justify-between font-body text-sm text-text">
              <span>{stage.label}</span>
              <span className="text-text-muted">
                {stage.percent}% · {stage.count}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-dark-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stage.percent}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #8B6914, #E8C97A)`,
                  opacity: 0.4 + (stage.percent / 100) * 0.6,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
