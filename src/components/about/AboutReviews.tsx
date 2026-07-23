"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { RECENT_REVIEWS } from "@/lib/about/constants";

const SLIDE_INTERVAL = 3000;

export default function AboutReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + RECENT_REVIEWS.length) % RECENT_REVIEWS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % RECENT_REVIEWS.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const review = RECENT_REVIEWS[index];

  return (
    <section className="relative bg-dark-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            CUSTOMER LOVE
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Woh Kya Kehte Hai
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-glass p-8 backdrop-blur-sm sm:min-h-[220px] sm:p-10">
            <motion.div
              key={review.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-gold-light text-gold-light"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className="mt-5 font-body text-lg italic text-text sm:text-xl">
                &ldquo;{review.text}&rdquo;
              </p>

              <p className="mt-5 font-display text-lg text-gold-light">
                — {review.name} | {review.route}
              </p>

              <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-dark/60 px-4 py-1.5 font-body text-xs text-text-muted">
                <BadgeCheck className="h-4 w-4 text-gold-light" strokeWidth={2} />
                Verified Trip · {review.vehicle}
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {RECENT_REVIEWS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                aria-label={`Show review from ${r.name}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-gold-light" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/reviews"
            className="flex items-center gap-1.5 rounded-full border border-gold px-5 py-2.5 font-body text-sm text-gold-light transition-colors duration-200 hover:bg-gold hover:text-dark"
          >
            Saari Reviews Dekho
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
