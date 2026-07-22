"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import LoginButtons from "./LoginButtons";

export default function LoginSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-dark-3 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-8"
      >
        <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
          एक login, अनंत प्रवास! 🚗
        </h2>
        <p className="mt-4 font-body text-base font-light text-text-muted sm:text-lg">
          Free Itinerary&nbsp;|&nbsp;Best Routes&nbsp;|&nbsp;AI Travel Bot
        </p>
        <p className="mt-2 flex items-center gap-1.5 font-body text-sm text-gold-dark">
          Login karo — It&apos;s Free!
          <Lock className="h-3.5 w-3.5" strokeWidth={2} />
          Google Secured
        </p>

        <div className="mt-10 w-full">
          <LoginButtons size="full" />
        </div>

        <p className="mt-6 font-body text-xs text-text-muted">
          Aapka data safe hai — Sirf trip planning ke liye
        </p>
      </motion.div>
    </section>
  );
}
