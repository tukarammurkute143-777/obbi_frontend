import { MessageCircle, Phone } from "lucide-react";
import { routeWhatsappMessage, telHref, whatsappHref } from "@/lib/contactLinks";

export default function RouteQuickBook({ from, to }: { from: string; to: string }) {
  return (
    <div className="rounded-2xl border border-gold/40 bg-glass p-5 backdrop-blur-sm">
      <h3 className="font-display text-lg font-semibold text-text">Quick Inquiry</h3>

      <div className="mt-3 rounded-xl border border-border bg-dark/40 px-4 py-3 text-center">
        <p className="font-display text-lg text-gold-light">
          {from} → {to}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={telHref()}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-5 py-2.5 font-body text-sm font-medium text-dark transition-transform duration-150 hover:scale-[1.02]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Call for Rates
        </a>
        <a
          href={whatsappHref(routeWhatsappMessage(from, to))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 font-body text-sm font-medium text-gold-light transition-colors hover:bg-gold/10"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
