"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string): string {
  const number = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
}

export default function ContactOptions() {
  return (
    <section className="relative px-5 py-8 sm:px-8">
      <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center rounded-2xl border-2 border-gold bg-glass p-8 text-center shadow-[0_0_32px_rgba(201,168,76,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_44px_rgba(201,168,76,0.3)] sm:col-span-3 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="text-5xl">📞</div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-wide text-text">
            CALL US
          </h2>
          <p className="mt-1 font-body text-lg text-gold-light">
            {CONTACT.phone}
          </p>
          <p className="mt-4 font-body text-sm text-text-muted">
            &ldquo;Seedha baat karo humse!&rdquo;
            <br />
            &ldquo;Rates, booking, queries — sab ek call mein!&rdquo;
          </p>
          <a
            href={`tel:${toDialNumber(CONTACT.phone)}`}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] sm:w-auto sm:px-10"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            Call Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center rounded-2xl border border-[#25D366]/40 bg-glass p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#25D366] hover:shadow-[0_0_28px_rgba(37,211,102,0.2)]"
        >
          <div className="text-4xl">💬</div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-wide text-text">
            WHATSAPP
          </h3>
          <p className="mt-1 font-body text-base text-[#25D366]">
            {CONTACT.whatsapp}
          </p>
          <p className="mt-3 font-body text-sm text-text-muted">
            &ldquo;Message karo kabhi bhi!&rdquo;
          </p>
          <a
            href={toWhatsappHref(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-body font-medium text-dark transition-transform duration-150 hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            WhatsApp Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center rounded-2xl border border-border bg-glass p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]"
        >
          <div className="text-4xl">📧</div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-wide text-text">
            EMAIL
          </h3>
          <p className="mt-1 break-all font-body text-base text-gold-light">
            {CONTACT.email}
          </p>
          <p className="mt-3 font-body text-sm text-text-muted">
            &ldquo;Mail karein — 24hrs mein reply guaranteed!&rdquo;
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-gold px-5 py-3 font-body font-medium text-gold-light transition-colors duration-200 hover:bg-gold hover:text-dark"
          >
            <Mail className="h-4 w-4" strokeWidth={2} />
            Send Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
