"use client";

import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";
import { VEHICLES } from "@/lib/constants";

export default function VehicleShowcase() {
  return (
    <section id="fleet" className="relative bg-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            OUR FLEET
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Most Booked{" "}
            <span className="text-gold-light">Vehicles</span>
          </h2>
        </div>

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
          {VEHICLES.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative w-72 shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-glass p-6 backdrop-blur-sm transition-shadow duration-300 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.25)] sm:w-auto"
            >
              <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-dark/60 px-3 py-1 font-body text-xs text-gold-light">
                {vehicle.tag}
              </span>

              <div className="flex h-32 items-center justify-center text-7xl">
                {vehicle.emoji}
              </div>

              <h3 className="mt-4 text-center font-display text-2xl font-semibold text-text">
                {vehicle.name}
              </h3>

              <div className="mt-3 flex items-center justify-center gap-4 font-body text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Star
                    className="h-4 w-4 fill-gold-light text-gold-light"
                    strokeWidth={1.5}
                  />
                  {vehicle.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" strokeWidth={1.5} />
                  {vehicle.seats} Seater
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
