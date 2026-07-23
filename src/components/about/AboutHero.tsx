"use client";

import { motion, type Variants } from "framer-motion";
import StarsBackground from "@/components/landing/StarsBackground";
import MountainsSilhouette from "@/components/shared/MountainsSilhouette";
import AnimatedCounter from "@/components/landing/AnimatedCounter";
import { STATS } from "@/lib/about/constants";

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

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark pb-16 pt-28 sm:pt-32">
      <StarsBackground />
      <MountainsSilhouette className="absolute inset-x-0 bottom-0 h-32 w-full opacity-70 sm:h-44" />

      <motion.div
        aria-hidden="true"
        initial={{ x: "-10vw" }}
        animate={{ x: "110vw" }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        className="pointer-events-none absolute bottom-6 text-4xl sm:bottom-10 sm:text-5xl"
      >
        🚗
      </motion.div>

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
          ABOUT OBBI CABS ✦
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
        >
          Har Safar Mein
          <br />
          <span className="italic text-gold-light">Aapke Saath!</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-body text-base font-light text-text-muted sm:text-lg md:text-xl"
        >
          Maharashtra ki best cab service — Pune se shuru, poore Maharashtra
          mein!
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-glass px-4 py-5"
            >
              <span className="font-display text-2xl font-semibold text-gold-light sm:text-3xl">
                {stat.emoji && <span className="mr-1">{stat.emoji}</span>}
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix ?? ""}
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
      </motion.div>
    </section>
  );
}
