"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Search } from "lucide-react";
import { CATEGORY_META, ROUTE_CATEGORIES, type RouteCategory } from "@/lib/routes/categories";
import RouteCard from "./RouteCard";
import type { RouteListItem } from "./types";

type Tab = "all" | RouteCategory;

const tabLabel = (tab: Tab) =>
  tab === "all" ? "All" : `${CATEGORY_META[tab].label} ${CATEGORY_META[tab].emoji}`;

export default function AllRoutesGrid({ routes }: { routes: RouteListItem[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const counts = useMemo(() => {
    const byTab: Record<string, number> = { all: routes.length };
    for (const r of routes) byTab[r.category] = (byTab[r.category] ?? 0) + 1;
    return byTab;
  }, [routes]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return routes.filter((route) => {
      if (tab !== "all" && route.category !== tab) return false;
      if (!needle) return true;
      // Matches either end, the combined "pune shirdi" phrasing people type,
      // and what the place is known for ("jyotirlinga", "beach").
      return `${route.from} ${route.to} ${route.popularFor} ${CATEGORY_META[route.category].label}`
        .toLowerCase()
        .includes(needle);
    });
  }, [routes, query, tab]);

  const reset = () => {
    setQuery("");
    setTab("all");
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
              placeholder="Search routes..."
              aria-label="Search routes"
              className="w-full rounded-full border border-border bg-dark/60 py-2.5 pl-11 pr-4 font-body text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-gold"
            />
          </label>

          <div
            role="tablist"
            aria-label="Route type"
            className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible"
          >
            {ROUTE_CATEGORIES.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-body text-sm transition-colors duration-200 ${
                  tab === t
                    ? "border-gold bg-gold text-dark"
                    : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
                }`}
              >
                {tabLabel(t)} <span className="opacity-70">({counts[t] ?? 0})</span>
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
            <p className="mt-4 font-display text-xl text-text">Is search ka koi route nahi mila</p>
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
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
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
