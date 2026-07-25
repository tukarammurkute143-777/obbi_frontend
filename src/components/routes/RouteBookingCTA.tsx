import { MessageCircle, Phone } from "lucide-react";
import { routeWhatsappMessage, telHref, whatsappHref } from "@/lib/contactLinks";

export default function RouteBookingCTA({ from, to }: { from: string; to: string }) {
  return (
    <section className="rounded-2xl border border-gold/40 bg-glass p-6 text-center backdrop-blur-sm sm:p-10">
      <p className="font-display text-2xl text-text sm:text-3xl">Is Route Pe Cab Chahiye? 🚗</p>
      <p className="mt-2 font-body text-sm text-text-muted sm:text-base">
        Obii Cabs se book karo — {from} to {to}, best rates guaranteed!
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={telHref()}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Call Now
        </a>
        <a
          href={whatsappHref(routeWhatsappMessage(from, to))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-body font-medium text-gold-light transition-colors hover:bg-gold/10"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
