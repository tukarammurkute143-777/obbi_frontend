"use client";

import { motion, type Variants } from "framer-motion";
import StarsBackground from "./StarsBackground";
import LoginButtons from "./LoginButtons";

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

function MountainsSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-56 md:h-72"
      aria-hidden="true"
    >
      <path
        d="M0,320 L0,180 L120,110 L220,170 L340,60 L460,150 L580,90 L700,180 L820,40 L950,160 L1080,100 L1200,190 L1320,120 L1440,200 L1440,320 Z"
        fill="#1A1A26"
        opacity="0.85"
      />
      <path
        d="M0,320 L0,230 L150,170 L280,220 L420,140 L560,210 L700,150 L860,230 L1000,170 L1160,240 L1300,190 L1440,240 L1440,320 Z"
        fill="#12121A"
      />
    </svg>
  );
}

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
