"use client";

import { motion, type Variants } from "framer-motion";
import StarsBackground from "./StarsBackground";
import LoginButtons from "./LoginButtons";
import MountainsSilhouette from "@/components/shared/MountainsSilhouette";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark pt-24"
    >
      <StarsBackground />
      <MountainsSilhouette />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-16 text-center sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.span
            variants={item}
            className="mb-6 rounded-full border border-border bg-glass px-4 py-1.5 font-body text-xs tracking-wide text-gold-light sm:text-sm"
          >
            Maharashtra ki Best Cab Service ✦
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
              एक login, अनंत प्रवास!
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-body text-base font-light text-text-muted sm:text-lg md:text-xl"
          >
            Free Itinerary&nbsp;|&nbsp;Best Routes&nbsp;|&nbsp;AI Travel Bot
          </motion.p>

          <motion.div variants={item} className="mt-10 w-full sm:w-auto">
            <LoginButtons size="compact" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
