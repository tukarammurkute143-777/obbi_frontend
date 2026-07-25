"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/about/constants";

export default function WhyObbi() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            WHY CHOOSE US
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Kyun Chunein Obii Cabs?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              className="rounded-2xl border border-border bg-glass p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]"
            >
              <div className="text-4xl">{feature.emoji}</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {feature.title}
              </h3>
              <p className="mt-2 font-body text-sm text-text-muted">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
