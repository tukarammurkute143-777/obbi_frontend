"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MountainsSilhouette from "@/components/shared/MountainsSilhouette";

const CITY_DOTS = [
  { name: "Pune", x: 150, y: 235, isPune: true },
  { name: "Mumbai", x: 85, y: 185 },
  { name: "Nashik", x: 135, y: 120 },
  { name: "Shirdi", x: 195, y: 145 },
  { name: "Sambhajinagar", x: 265, y: 185 },
];

const TOTAL_SECONDS = 30;
const PHASE_BOUNDARIES = [3, 14, 25, 30];

function phaseFor(elapsed: number): 1 | 2 | 3 | 4 {
  if (elapsed < PHASE_BOUNDARIES[0]) return 1;
  if (elapsed < PHASE_BOUNDARIES[1]) return 2;
  if (elapsed < PHASE_BOUNDARIES[2]) return 3;
  return 4;
}

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.25;
        if (next >= TOTAL_SECONDS) {
          clearInterval(interval);
          onComplete();
        }
        return next;
      });
    }, 250);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phase = phaseFor(elapsed);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-dark">
      {phase === 1 && (
        <motion.div
          key="phase1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-3 w-3 rounded-full bg-gold-light shadow-[0_0_30px_10px_rgba(232,201,122,0.6)]"
          />
        </motion.div>
      )}

      {phase === 2 && (
        <motion.div
          key="phase2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-5"
        >
          <svg viewBox="0 0 400 400" className="w-full max-w-sm">
            <motion.path
              d="M70,140 L110,90 L170,75 L230,60 L290,95 L330,150 L340,220 L310,270 L260,310 L200,330 L140,320 L95,290 L60,230 L50,180 Z"
              fill="rgba(201,168,76,0.05)"
              stroke="#C9A84C"
              strokeOpacity="0.5"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {CITY_DOTS.filter((c) => !c.isPune).map((city, index) => {
              const pune = CITY_DOTS[0];
              return (
                <motion.line
                  key={`line-${city.name}`}
                  x1={pune.x}
                  y1={pune.y}
                  x2={city.x}
                  y2={city.y}
                  stroke="#E8C97A"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.8 + index * 0.7, ease: "easeInOut" }}
                />
              );
            })}

            {CITY_DOTS.map((city, index) => (
              <motion.g
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: city.isPune ? 0.3 : 2 + index * 0.7,
                }}
              >
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={10}
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  animate={{ r: [6, 16], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
                <circle cx={city.x} cy={city.y} r={5} fill="#E8C97A" />
              </motion.g>
            ))}
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6, duration: 0.8 }}
            className="text-center font-display text-2xl text-gold-light sm:text-3xl"
          >
            Tera raaj... teri sadak 🚗
          </motion.p>
        </motion.div>
      )}

      {phase === 3 && (
        <motion.div
          key="phase3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-dark via-dark-2 to-dark"
        >
          <motion.div
            aria-hidden="true"
            initial={{ y: 60, opacity: 0.3 }}
            animate={{ y: -10, opacity: 0.9 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-light to-gold-dark blur-md"
          />
          <MountainsSilhouette className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-56" />

          <motion.div
            aria-hidden="true"
            initial={{ x: "-15vw" }}
            animate={{ x: "115vw" }}
            transition={{ duration: 9, ease: "linear" }}
            className="pointer-events-none absolute bottom-8 text-4xl sm:bottom-12 sm:text-5xl"
          >
            🚗
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="relative z-10 mx-auto max-w-lg px-5 text-center font-display text-2xl leading-snug text-text sm:text-3xl"
          >
            Tu sirf cab nahi chalaata —
            <br />
            Tu logon ke sapne poore karta hai! 🙏
          </motion.p>
        </motion.div>
      )}

      {phase === 4 && (
        <motion.div
          key="phase4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl font-semibold text-gold-light sm:text-6xl"
          >
            Obbi Cabs
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-body text-sm tracking-wide text-text-muted"
          >
            One Booking · Infinite Independence
          </motion.p>
        </motion.div>
      )}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {[1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              dot === phase ? "bg-gold-light" : "bg-border"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-6 right-6 flex items-center gap-1 rounded-full border border-border px-4 py-2 font-body text-xs text-text-muted transition-colors hover:border-gold hover:text-gold-light"
      >
        Skip →
      </button>
    </div>
  );
}
