"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ClipboardList, LogOut, Search, Star } from "lucide-react";
import type { AuthUser } from "@/lib/auth/loginUtils";
import Toast from "./Toast";

interface PortalNavbarProps {
  user: AuthUser;
  onLogout: () => void;
}

function scrollToSearch() {
  document
    .getElementById("search-section")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PortalNavbar({ user, onLogout }: PortalNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [toast, setToast] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const firstName = user.name.split(" ")[0];
  const avatarLetter = user.name.charAt(0).toUpperCase();

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleQuickSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    scrollToSearch();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-dark/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/portal"
          className="shrink-0 font-display text-2xl font-semibold tracking-wide text-gold-light"
        >
          Obbi Cabs
        </Link>

        <form
          onSubmit={handleQuickSearchSubmit}
          className="hidden max-w-md flex-1 items-center gap-2 rounded-full border border-border bg-glass px-4 py-2 md:flex"
        >
          <Search className="h-4 w-4 shrink-0 text-text-muted" strokeWidth={2} />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Kahan jaana hai? Search karo..."
            className="w-full bg-transparent font-body text-sm text-text outline-none placeholder:text-text-muted/60"
          />
        </form>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden font-body text-sm text-text-muted sm:inline">
            Namaste, {firstName}! 🙏
          </span>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark font-display text-lg font-semibold text-dark transition-transform duration-150 hover:scale-105"
            >
              {avatarLetter}
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-border bg-dark-2/95 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <a
                  href="#bookings"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-text transition-colors hover:bg-glass hover:text-gold-light"
                >
                  <ClipboardList className="h-4 w-4" strokeWidth={2} />
                  My Bookings
                </a>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setToast("My Reviews coming soon!");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-body text-sm text-text transition-colors hover:bg-glass hover:text-gold-light"
                >
                  <Star className="h-4 w-4" strokeWidth={2} />
                  My Reviews
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setToast("No new notifications");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-body text-sm text-text transition-colors hover:bg-glass hover:text-gold-light"
                >
                  <Bell className="h-4 w-4" strokeWidth={2} />
                  Notifications
                </button>
                <div className="my-1 h-px bg-border" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-body text-sm text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" strokeWidth={2} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {toast && <Toast message={toast} onDismiss={() => setToast("")} />}
    </header>
  );
}
