import {
  Armchair,
  Briefcase,
  CheckCircle2,
  Crown,
  MapPin,
  Megaphone,
  Music,
  Sparkles,
  Star,
  Usb,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import type { FleetVehicle } from "@/lib/fleet/constants";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  AC: Wind,
  Music: Music,
  "Luggage Space": Briefcase,
  "Comfortable Seats": Armchair,
  Comfortable: Armchair,
  "Premium Interiors": Crown,
  "USB Charging": Usb,
  "Modern Interiors": Sparkles,
  "Push-back Seats": Armchair,
  "Large Windows": Sparkles,
  "Reclining Seats": Armchair,
  "PA System": Megaphone,
};

function toDialNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsappHref(phone: string, vehicleName: string): string {
  const number = phone.replace(/[^\d]/g, "");
  const message = `Namaste Obbi Cabs! 🙏 ${vehicleName} ke liye rates batao please.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

interface VehicleCardProps {
  vehicle: FleetVehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.22)]">
      <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-center justify-between">
        <span className="rounded-full border border-gold/40 bg-dark/60 px-3 py-1 font-body text-xs text-gold-light">
          {vehicle.category}
        </span>
        {vehicle.badge && (
          <span className="rounded-full bg-gold/15 px-3 py-1 font-body text-xs text-gold-light">
            {vehicle.badge}
          </span>
        )}
      </div>

      <div className="mt-4 text-7xl">{vehicle.emoji}</div>

      <h3 className="mt-3 font-display text-2xl font-semibold text-text">
        {vehicle.name}
      </h3>
      <p className="mt-1 font-body text-sm text-text-muted">
        {vehicle.category} · {vehicle.seats} Seater
      </p>

      <p className="mt-3 font-body text-sm text-text-muted">
        {vehicle.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-body text-xs text-text-muted transition-transform duration-150 hover:scale-105">
          <Star className="h-3.5 w-3.5 fill-gold-light text-gold-light" strokeWidth={1.5} />
          {vehicle.rating}
        </span>
        {vehicle.features.map((feature) => {
          const Icon = FEATURE_ICONS[feature] ?? CheckCircle2;
          return (
            <span
              key={feature}
              className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-body text-xs text-text-muted transition-transform duration-150 hover:scale-105"
            >
              <Icon className="h-3.5 w-3.5 text-gold-light" strokeWidth={1.5} />
              {feature}
            </span>
          );
        })}
      </div>

      <div className="mt-5 text-left">
        <p className="font-body text-xs font-medium tracking-wide text-gold-dark">
          BEST FOR
        </p>
        <p className="mt-1 font-body text-sm text-text-muted">
          {vehicle.bestFor.join(", ")}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-left font-body text-sm text-text-muted">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-dark" strokeWidth={2} />
        Popular route: {vehicle.popularRoute}
      </div>

      <div className="mt-6 flex gap-2">
        <a
          href={`tel:${toDialNumber(CONTACT.phone)}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gold px-4 py-2.5 font-body text-sm text-gold-light transition-colors hover:bg-gold/10"
        >
          📞 Call
        </a>
        <a
          href={toWhatsappHref(CONTACT.whatsapp, vehicle.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366]/15 px-4 py-2.5 font-body text-sm text-[#25D366] transition-colors hover:bg-[#25D366]/25"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}
