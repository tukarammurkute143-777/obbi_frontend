"use client";

import { motion, type Variants } from "framer-motion";
import StarsBackground from "@/components/landing/StarsBackground";

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

const STATS = ["24 Articles", "5 Categories", "Updated Weekly"];

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark pb-12 pt-28 sm:pt-32">
      <StarsBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8"
      >
        <motion.span
          variants={item}
          className="mb-6 rounded-full border border-border bg-glass px-4 py-1.5 font-body text-xs tracking-wide text-gold-light sm:text-sm"
        >
          TRAVEL BLOG ✦
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
        >
          Obii Cabs
          <br />
          <span className="italic text-gold-light">Travel Stories</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-body text-base font-light text-text-muted sm:text-lg md:text-xl"
        >
          Maharashtra ke safar ki kahaniyan, tips aur guides!
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {STATS.map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-border bg-glass px-4 py-1.5 font-body text-xs text-text-muted sm:text-sm"
            >
              {stat}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
