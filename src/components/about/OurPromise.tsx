"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, Phone, Quote } from "lucide-react";
import { CONTACT } from "@/lib/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string): string {
  const number = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
}

const QUOTE_LINE = "Hum aapke sapno ka safar complete karte hai!";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function OurPromise() {
  return (
    <section className="relative overflow-hidden bg-dark-3 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-8">
        <Quote
          className="h-10 w-10 text-gold-dark"
          strokeWidth={1.5}
          fill="currentColor"
          fillOpacity={0.15}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-6 font-display text-2xl text-text-muted sm:text-3xl"
        >
          Hum sirf cab nahi dete —
        </motion.p>

        <motion.p
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-3 flex flex-wrap justify-center gap-x-2 font-display text-3xl italic text-gold-light sm:text-5xl"
        >
          {QUOTE_LINE.split(" ").map((w, i) => (
            <motion.span key={i} variants={word}>
              {w}
            </motion.span>
          ))}
        </motion.p>

        <p className="mt-6 font-body text-sm text-text-muted">
          — Obii Cabs Team 🙏
        </p>

        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a
            href={`tel:${toDialNumber(CONTACT.phone)}`}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            Call Us Now
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
      </div>
    </section>
  );
}
