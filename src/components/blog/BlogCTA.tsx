import { MessageCircle, Phone, Pin } from "lucide-react";
import { CONTACT } from "@/lib/constants";

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string): string {
  const number = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
}

export default function BlogCTA() {
  return (
    <div className="my-8 rounded-2xl border border-gold/40 bg-glass p-6 text-center sm:p-8">
      <div className="flex items-center justify-center gap-1.5 font-body text-xs tracking-wide text-gold-dark">
        <Pin className="h-3.5 w-3.5" strokeWidth={2} />
        BOOK A CAB
      </div>
      <p className="mt-2 font-display text-xl text-text sm:text-2xl">
        Is route pe cab chahiye?
        <br />
        Obii Cabs se book karo!
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={`tel:${toDialNumber(CONTACT.phone)}`}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Call
        </a>
        <a
          href={toWhatsappHref(CONTACT.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body font-medium text-dark transition-transform duration-150 hover:scale-[1.02]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
