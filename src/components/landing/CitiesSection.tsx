"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/lib/constants";

export default function CitiesSection() {
  return (
    <section id="cities" className="relative bg-dark py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="mb-6 block font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
          CITIES WE COVER
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-4">
          {CITIES.map((city, index) => (
            <motion.span
              key={city}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex items-center gap-3"
            >
              <span className="font-display text-xl text-text sm:text-2xl">
                {city}
              </span>
              {index < CITIES.length - 1 && (
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
