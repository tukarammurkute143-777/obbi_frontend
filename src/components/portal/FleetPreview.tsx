"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Star } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { PORTAL_FLEET } from "@/lib/portal/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string, vehicleName: string): string {
  const number = phone.replace(/[^\d]/g, "");
  const message = `Namaste Obbi Cabs! 🙏 Mujhe ${vehicleName} book karni hai.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default function FleetPreview() {
  return (
    <section id="fleet" className="relative px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 font-body text-xs tracking-[0.2em] text-gold-dark sm:text-sm">
            CHOOSE YOUR RIDE
          </span>
          <h2 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            Our Fleet
          </h2>
        </div>

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {PORTAL_FLEET.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="w-64 shrink-0 snap-center rounded-2xl border border-border bg-glass p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.22)] sm:w-auto"
            >
              <div className="text-6xl">{vehicle.emoji}</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {vehicle.name}
              </h3>
              <p className="mt-1 font-body text-sm text-text-muted">
                {vehicle.seats} Seater · {vehicle.category}
              </p>
              <div className="mt-2 flex items-center justify-center gap-1 font-body text-sm text-text-muted">
                <Star
                  className="h-4 w-4 fill-gold-light text-gold-light"
                  strokeWidth={1.5}
                />
                {vehicle.rating}
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {vehicle.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-border px-2.5 py-0.5 font-body text-xs text-text-muted"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`tel:${toDialNumber(CONTACT.phone)}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gold px-3 py-2 font-body text-xs text-gold-light transition-colors hover:bg-gold/10"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  Call
                </a>
                <a
                  href={toWhatsappHref(CONTACT.whatsapp, vehicle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366]/15 px-3 py-2 font-body text-xs text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                  WA
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
