"use client";

import { motion, type Variants } from "framer-motion";
import { Car, Clock, Star, Users } from "lucide-react";
import StarsBackground from "@/components/landing/StarsBackground";
import MountainsSilhouette from "@/components/shared/MountainsSilhouette";

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

const STATS = [
  { icon: Car, label: "6+ Vehicle Types" },
  { icon: Users, label: "50 Max Seater" },
  { icon: Star, label: "4.8 Avg Rating" },
  { icon: Clock, label: "24/7 Available" },
];

export default function FleetHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark pb-16 pt-28 sm:pt-32">
      <StarsBackground />
      <MountainsSilhouette className="absolute inset-x-0 bottom-0 h-32 w-full opacity-60 sm:h-44" />

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
          OUR FLEET ✦
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-text sm:text-6xl md:text-7xl"
        >
          Har Trip ke liye
          <br />
          <span className="italic text-gold-light">Sahi Gaadi!</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-body text-base font-light text-text-muted sm:text-lg md:text-xl"
        >
          4 Seater se 50 Seater — Maharashtra ke liye ready!
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-2 font-body text-sm text-text-muted"
            >
              <stat.icon className="h-4 w-4 text-gold-light" strokeWidth={2} />
              {stat.label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
