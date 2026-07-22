"use client";

import { useMemo } from "react";

function seededRandom(seed: number) {
  let t = seed;
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarsBackgroundProps {
  starCount?: number;
  particleCount?: number;
}

export default function StarsBackground({
  starCount = 140,
  particleCount = 18,
}: StarsBackgroundProps) {
  const stars = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: rand() * 1.8 + 0.6,
      duration: rand() * 3 + 2,
      delay: rand() * 4,
    }));
  }, [starCount]);

  const particles = useMemo(() => {
    const rand = seededRandom(1337);
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: rand() * 3 + 2,
      duration: rand() * 6 + 7,
      delay: rand() * 8,
    }));
  }, [particleCount]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star) => (
        <span
          key={`star-${star.id}`}
          className="absolute animate-twinkle rounded-full bg-text"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {particles.map((particle) => (
        <span
          key={`particle-${particle.id}`}
          className="absolute bottom-0 animate-float rounded-full bg-gold-light/70"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
