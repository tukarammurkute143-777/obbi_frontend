"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function BusinessHours() {
  return (
    <section className="relative px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-lg">
        <span className="mb-3 block text-center font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
          AVAILABILITY
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center rounded-2xl border border-border bg-glass p-8 text-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="h-10 w-10 text-gold-light" strokeWidth={1.5} />
          </motion.div>

          <h3 className="mt-4 font-display text-2xl font-semibold text-text">
            24/7 Available
          </h3>
          <p className="mt-2 font-body text-sm text-text-muted">
            &ldquo;Kabhi bhi call karein — hum hamesha yahan hai!&rdquo;
          </p>

          <div className="mt-5 border-t border-border pt-5 font-body text-sm text-text-muted">
            <p>Monday - Sunday</p>
            <p className="mt-1 text-gold-light">24 Hours · 365 Days</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
