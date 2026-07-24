"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { revokeOwnerAccess } from "@/lib/dashboard/storage";
import NotificationBell from "./widgets/NotificationBell";
import WeatherWidget from "./widgets/WeatherWidget";

export default function DashboardNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    revokeOwnerAccess();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <span className="whitespace-nowrap font-display text-lg font-semibold text-gold-light sm:text-xl">
          👑 Obbi Cabs — Owner Dashboard
        </span>

        <div className="flex shrink-0 items-center gap-3">
          <WeatherWidget compact />
          <NotificationBell />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark font-display text-lg font-semibold text-dark">
            T
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-red hover:text-red"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
