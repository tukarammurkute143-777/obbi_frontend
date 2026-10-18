"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";
import { SHOWCASE_VEHICLES } from "@/lib/vehicleShowcase";

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
          <p className="mt-3 font-body text-sm text-text-muted">
            From a 4 seater sedan to a 50 seater bus. Swipe to see them all.
          </p>
        </div>

        {/* Horizontal scroll on every screen size; the extra vertical padding
            leaves room for the hover lift and glow. */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-3 sm:mx-0 sm:px-1">
          {SHOWCASE_VEHICLES.map((vehicle, index) => (
            <motion.article
              key={vehicle.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative w-72 shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-glass backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.25)]"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full border border-gold/40 bg-dark/70 px-3 py-1 font-body text-xs text-gold-light backdrop-blur-sm">
                  {vehicle.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold text-text">{vehicle.name}</h3>

                <div className="mt-3 flex items-center justify-between font-body text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" strokeWidth={1.5} />
                    {vehicle.seats} Seater
                  </span>
                  <span
                    className="flex items-center gap-1"
                    aria-label={`Rated ${vehicle.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.round(vehicle.rating)
                            ? "fill-gold-light text-gold-light"
                            : "text-text-muted/40"
                        }`}
                        strokeWidth={1.5}
                      />
                    ))}
                    <span className="ml-1 text-text">{vehicle.rating}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
