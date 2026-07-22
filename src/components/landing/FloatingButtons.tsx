"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappNumber(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export default function FloatingButtons() {
  const whatsappHref = `https://wa.me/${toWhatsappNumber(
    CONTACT.whatsapp
  )}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-dark shadow-[0_0_20px_rgba(37,211,102,0.45)] transition-shadow hover:shadow-[0_0_28px_rgba(37,211,102,0.7)] sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </motion.a>
      <motion.a
        href={`tel:${toDialNumber(CONTACT.phone)}`}
        aria-label="Call Obbi Cabs"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-dark shadow-[0_0_20px_rgba(201,168,76,0.45)] transition-shadow hover:shadow-[0_0_28px_rgba(201,168,76,0.75)] sm:h-14 sm:w-14"
      >
        <Phone className="h-6 w-6" strokeWidth={2} />
      </motion.a>
    </div>
  );
}
