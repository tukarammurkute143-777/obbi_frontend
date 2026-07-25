import { MessageCircle, Phone } from "lucide-react";
import type { RouteVehicle } from "@/lib/routes/routesData";
import { telHref, whatsappHref } from "@/lib/contactLinks";

interface AvailableVehiclesProps {
  vehicles: RouteVehicle[];
  from: string;
  to: string;
}

export default function AvailableVehicles({ vehicles, from, to }: AvailableVehiclesProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
        Available Vehicles
      </h2>
      <p className="mt-1 font-body text-sm text-text-muted">
        Rates depend on dates and pickup time — call or WhatsApp for an exact quote.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.name}
            className="flex h-full flex-col rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <span className="text-4xl">{vehicle.emoji}</span>
            <h3 className="mt-3 font-display text-xl font-semibold text-text">{vehicle.name}</h3>
            <p className="mt-2 flex-1 font-body text-sm text-text-muted">{vehicle.reason}</p>

            <div className="mt-4 flex gap-2">
              <a
                href={telHref()}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-4 py-2 font-body text-sm font-medium text-dark transition-transform duration-150 hover:scale-[1.03]"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                Call
              </a>
              <a
                href={whatsappHref(
                  `Namaste Obii Cabs! 🙏 ${from} to ${to} ke liye ${vehicle.name} chahiye. Rates batao please.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gold/50 px-4 py-2 font-body text-sm font-medium text-gold-light transition-colors hover:bg-gold/10"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
