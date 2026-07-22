"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  target,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const hasAnimatedRef = useRef(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={spanRef}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
