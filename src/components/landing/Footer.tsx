import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(
    /[^\d]/g,
    ""
  )}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <footer className="relative border-t border-border bg-dark-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <span className="font-display text-2xl font-semibold text-gold-light">
            Obii Cabs
          </span>
          <span className="font-body text-sm text-text-muted">
            One Booking — Infinite Independence
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm text-text-muted md:justify-start">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
          <Link href="/login" className="transition-colors hover:text-gold-light">
            Login
          </Link>
        </nav>

        <div className="flex flex-col items-center gap-3 text-center md:items-end md:text-right">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center font-body text-xs text-text-muted">
        © 2026 Obii Cabs. All rights reserved.
      </div>
    </footer>
  );
}
