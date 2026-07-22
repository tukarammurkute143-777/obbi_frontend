import { STATS } from "@/lib/constants";
import AnimatedCounter from "./AnimatedCounter";

export default function TrustCounters() {
  return (
    <section className="relative border-y border-border bg-dark-2/60 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-5 sm:grid-cols-3 sm:gap-4 sm:px-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 text-center"
          >
            <div className="font-display text-4xl font-semibold text-gold-light sm:text-5xl">
              {stat.emoji && <span className="mr-2">{stat.emoji}</span>}
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            </div>
            <span className="font-body text-sm text-text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
