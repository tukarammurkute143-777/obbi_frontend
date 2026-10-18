import Image from "next/image";
import { MessageCircle, Phone, Users } from "lucide-react";
import { SHOWCASE_VEHICLES } from "@/lib/vehicleShowcase";
import { telHref, whatsappHref } from "@/lib/contactLinks";

interface AvailableVehiclesProps {
  from: string;
  to: string;
}

export default function AvailableVehicles({
  from,
  to,
}: AvailableVehiclesProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
        Available Vehicles
      </h2>
      <p className="mt-1 font-body text-sm text-text-muted">
        Rates depend on dates and pickup time — call or WhatsApp for an exact
        quote.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SHOWCASE_VEHICLES.map((vehicle) => (
          <div
            key={vehicle.name}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-xl font-semibold text-text">
                {vehicle.name}
              </h3>
              <p className="mt-1 flex flex-1 items-start gap-1.5 font-body text-sm text-text-muted">
                <Users className="mt-0.5 h-4 w-4" strokeWidth={1.5} />
                {vehicle.seats} Seater
              </p>

              <div className="mt-4 flex gap-2">
                <a
                  href={telHref()}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-3 py-2 font-body text-sm font-medium text-dark transition-transform duration-150 hover:scale-[1.03]"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  Call
                </a>
                <a
                  href={whatsappHref(
                    `Namaste Obii Cabs! 🙏 ${from} to ${to} ke liye ${vehicle.name} chahiye. Rates batao please.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gold/50 px-3 py-2 font-body text-sm font-medium text-gold-light transition-colors hover:bg-gold/10"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
