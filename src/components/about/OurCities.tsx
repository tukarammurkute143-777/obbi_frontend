"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/lib/about/constants";

export default function OurCities() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            WHERE WE OPERATE
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Hamare Sheher
          </h2>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent sm:block"
          />

          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
            {CITIES.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 w-40 shrink-0 rounded-2xl border border-border bg-dark/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold sm:w-auto"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-xl">
                  {city.emoji}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-text">
                  {city.name}
                </h3>
                <p className="mt-1 font-body text-xs text-text-muted">
                  {city.tag}
                </p>
                <p className="mt-2 font-body text-xs text-gold-light">
                  ★ {city.highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
