"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { POPULAR_ROUTES } from "@/lib/portal/constants";

export default function PopularRoutes() {
  return (
    <section id="routes" className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            MOST BOOKED
          </span>
          <h2 className="font-display text-4xl font-semibold italic text-gold-light sm:text-5xl">
            Popular Routes
          </h2>
        </div>

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {POPULAR_ROUTES.map((route, index) => (
            <motion.div
              key={route.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="w-72 shrink-0 snap-center sm:w-auto"
            >
              <Link
                href={`/routes/${route.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-glass p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.22)]"
              >
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />

                {route.tag && (
                  <span className="mb-4 inline-block rounded-full border border-gold/40 bg-dark/60 px-3 py-1 font-body text-xs text-gold-light">
                    {route.tag}
                  </span>
                )}

                <div className="flex items-center justify-center gap-3 font-display text-xl text-text sm:text-2xl">
                  <span>{route.from}</span>
                  <span className="flex items-center text-gold-dark">
                    - - - <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span>{route.to}</span>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 font-body text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Star
                      className="h-4 w-4 fill-gold-light text-gold-light"
                      strokeWidth={1.5}
                    />
                    {route.rating}
                  </span>
                  <span>· {route.trips} trips</span>
                </div>

                <p className="mt-3 text-center font-body text-xs text-text-muted">
                  📞 Call for rates
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
