"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Search } from "lucide-react";
import { ROUTES_DATA, ROUTE_ORIGINS } from "@/lib/routes/routesData";
import RouteCard from "./RouteCard";

export default function AllRoutesGrid() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return ROUTES_DATA.filter((route) => {
      const matchesOrigin = origin === "All" || route.from === origin;
      if (!matchesOrigin) return false;
      if (!needle) return true;

      // Match either endpoint or the combined "pune shirdi" phrasing people type.
      return `${route.from} ${route.to}`.toLowerCase().includes(needle);
    });
  }, [query, origin]);

  const reset = () => {
    setQuery("");
    setOrigin("All");
  };

  return (
    <>
      <div className="sticky top-[76px] z-30 border-b border-border bg-dark-2/90 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8">
          <label className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-4 h-4 w-4 text-text-muted"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Route search… e.g. Shirdi"
              aria-label="Search routes"
              className="w-full rounded-full border border-border bg-dark/60 py-2.5 pl-11 pr-4 font-body text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-gold"
            />
          </label>

          <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
            {ROUTE_ORIGINS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setOrigin(city)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-body text-sm transition-colors duration-200 ${
                  origin === city
                    ? "border-gold bg-gold text-dark"
                    : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
                }`}
              >
                {city === "All" ? "All" : `From ${city}`}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-text-muted">
            Showing {filtered.length} route{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-border bg-glass px-6 py-16 text-center">
            <span className="text-4xl">🗺️</span>
            <p className="mt-4 font-display text-xl text-text">
              Is search ka koi route nahi mila
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2} />
              Saare Routes Dekho
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((route, index) => (
              <motion.div
                key={route.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              >
                <RouteCard route={route} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
