"use client";

import { useMemo, useState } from "react";
import { VEHICLES } from "@/lib/fleet/constants";
import FleetFilters from "./FleetFilters";
import VehicleGrid from "./VehicleGrid";

export default function FleetContent() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [seaterFilter, setSeaterFilter] = useState("All");

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      const categoryMatch =
        categoryFilter === "All" || vehicle.category === categoryFilter;
      const seaterMatch =
        seaterFilter === "All" || vehicle.seats === parseInt(seaterFilter, 10);
      return categoryMatch && seaterMatch;
    });
  }, [categoryFilter, seaterFilter]);

  return (
    <>
      <FleetFilters
        categoryFilter={categoryFilter}
        seaterFilter={seaterFilter}
        onCategoryChange={setCategoryFilter}
        onSeaterChange={setSeaterFilter}
        resultCount={filteredVehicles.length}
      />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <VehicleGrid vehicles={filteredVehicles} />
      </div>
    </>
  );
}
