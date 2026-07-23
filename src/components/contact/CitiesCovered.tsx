"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CITIES } from "@/lib/contact/constants";

export default function CitiesCovered() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
          WE SERVE
        </span>
        <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
          Hamare Sheher
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {CITIES.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href="/fleet"
                className="flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 font-body text-sm text-gold-light transition-colors duration-200 hover:bg-gold hover:text-dark"
              >
                {city.emoji} {city.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 font-body text-sm text-text-muted">
          Aur bhi routes available hai — Call karo pata karo!
        </p>
      </div>
    </section>
  );
}
