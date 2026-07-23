"use client";

import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import AnimatedCounter from "@/components/landing/AnimatedCounter";
import { OVERALL_STATS, RATING_BREAKDOWN } from "@/lib/reviews/constants";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ReviewsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark pb-16 pt-28 sm:pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8"
      >
        <motion.span
          variants={item}
          className="mb-6 rounded-full border border-border bg-glass px-4 py-1.5 font-body text-xs tracking-wide text-gold-light sm:text-sm"
        >
          CUSTOMER REVIEWS ✦
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
        >
          Hamare Customers
          <br />
          <span className="italic text-gold-light">Kya Kehte Hai?</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {OVERALL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-glass px-4 py-5"
            >
              <span className="font-display text-3xl font-semibold text-gold-light sm:text-4xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </span>
              <span className="font-body text-xs text-text-muted sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 w-full max-w-lg rounded-2xl border border-border bg-glass p-5 text-left sm:p-6"
        >
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars} className="mb-2 flex items-center gap-3 last:mb-0">
              <span className="flex w-8 shrink-0 items-center gap-0.5 font-body text-xs text-text-muted">
                {row.stars}
                <Star className="h-3 w-3 fill-gold-light text-gold-light" strokeWidth={1.5} />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-dark-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.percent}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
                />
              </div>
              <span className="w-20 shrink-0 text-right font-body text-xs text-text-muted">
                {row.count} ({row.percent}%)
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
