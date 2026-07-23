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

export default function ContactHero() {
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
          GET IN TOUCH ✦
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
        >
          Baat Karein Humse!
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-body text-base font-light text-text-muted sm:text-lg md:text-xl"
        >
          Hum 24/7 ready hai aapke liye 🙏
        </motion.p>
      </motion.div>
    </section>
  );
}
