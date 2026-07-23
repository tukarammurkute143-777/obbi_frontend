"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string): string {
  const number = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
}

export default function FleetCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-dark-3 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-8"
      >
        <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">
          Apni Perfect Cab Nahi Mili? 🤔
        </h2>
        <p className="mt-3 font-body text-base text-text-muted">
          Hum aapke liye sahi gaadi dhundhenge!
        </p>
        <p className="mt-1 font-body text-sm text-gold-dark">
          Bas call karo — hum sab handle karenge!
        </p>

        <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a
            href={`tel:${toDialNumber(CONTACT.phone)}`}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            Call Now — {CONTACT.phone}
          </a>
          <a
            href={toWhatsappHref(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-gold bg-transparent px-6 py-3.5 font-body font-medium text-gold-light transition-all hover:bg-gold/10 hover:shadow-[0_0_28px_rgba(201,168,76,0.35)]"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            WhatsApp Karo
          </a>
        </div>
      </motion.div>
    </section>
  );
}
