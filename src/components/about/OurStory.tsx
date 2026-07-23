"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/lib/about/constants";

const CITY_DOTS = [
  { name: "Mumbai", x: 85, y: 185 },
  { name: "Pune", x: 150, y: 235 },
  { name: "Nashik", x: 135, y: 120 },
  { name: "Shirdi", x: 195, y: 145 },
  { name: "Sambhajinagar", x: 265, y: 185 },
];

function MaharashtraOutline() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto w-full max-w-md"
      aria-hidden="true"
    >
      <path
        d="M70,140 L110,90 L170,75 L230,60 L290,95 L330,150 L340,220 L310,270 L260,310 L200,330 L140,320 L95,290 L60,230 L50,180 Z"
        fill="rgba(201,168,76,0.05)"
        stroke="#C9A84C"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      {CITY_DOTS.map((dot, index) => (
        <g key={dot.name}>
          <motion.circle
            cx={dot.x}
            cy={dot.y}
            r={7}
            fill="#C9A84C"
            fillOpacity="0.15"
            animate={{ r: [7, 13, 7], opacity: [0.5, 0.15, 0.5] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
          <circle cx={dot.x} cy={dot.y} r={3.5} fill="#E8C97A" />
        </g>
      ))}
    </svg>
  );
}

export default function OurStory() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 block font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            OUR STORY
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Obbi Cabs ki Kahani
          </h2>

          <p className="mt-6 font-body text-base leading-relaxed text-text-muted sm:text-lg">
            Ek simple soch se shuru hua yeh safar — &ldquo;Har customer ko
            best travel experience milna chahiye!&rdquo; Maharashtra ke kone
            kone mein log travel karte hai — Shirdi ki yatra ho, Mumbai ka
            business trip ho, ya Mahabaleshwar ki family trip — Obbi Cabs
            hamesha aapke saath hai!
          </p>

          <p className="mt-4 font-body text-base leading-relaxed text-text-muted sm:text-lg">
            Humara naam Obbi hai — One Booking, Infinite Independence. Ek
            call, ek booking — aur baaki sab humpe! Aapko bas apni manzil
            batani hai — hum aapko safely, comfortably wahan pahunchayenge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <MaharashtraOutline />
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 font-body text-xs text-text-muted">
            {CITIES.map((city) => (
              <span key={city.name}>{city.name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
