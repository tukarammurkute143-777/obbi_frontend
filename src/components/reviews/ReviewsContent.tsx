"use client";

import { useMemo, useState } from "react";
import { REVIEWS, type Review } from "@/lib/reviews/constants";
import ReviewFilters from "./ReviewFilters";
import ReviewsGrid from "./ReviewsGrid";

function filterByDate(
  review: Review,
  dateFilter: string,
  customFrom: string,
  customTo: string
): boolean {
  const reviewDate = new Date(review.date);
  const now = new Date();

  switch (dateFilter) {
    case "Today":
      return reviewDate.toDateString() === now.toDateString();
    case "Last 7 Days":
      return reviewDate >= new Date(new Date().setDate(now.getDate() - 7));
    case "Last 30 Days":
      return reviewDate >= new Date(new Date().setDate(now.getDate() - 30));
    case "Last 60 Days":
      return reviewDate >= new Date(new Date().setDate(now.getDate() - 60));
    case "Last 6 Months":
      return reviewDate >= new Date(new Date().setMonth(now.getMonth() - 6));
    case "Last 1 Year":
      return reviewDate >= new Date(new Date().setFullYear(now.getFullYear() - 1));
    case "Custom":
      if (!customFrom || !customTo) return true;
      return reviewDate >= new Date(customFrom) && reviewDate <= new Date(customTo);
    default:
      return true;
  }
}

export default function ReviewsContent() {
  const [routeFilter, setRouteFilter] = useState("All Routes");
  const [vehicleFilter, setVehicleFilter] = useState("All Vehicles");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const filteredReviews = useMemo(() => {
    return REVIEWS.filter((review) => {
      const routeMatch = routeFilter === "All Routes" || review.route === routeFilter;
      const vehicleMatch =
        vehicleFilter === "All Vehicles" || review.vehicle === vehicleFilter;
      const ratingMatch =
        ratingFilter === "All" || review.rating === parseInt(ratingFilter, 10);
      const dateMatch = filterByDate(review, dateFilter, customFrom, customTo);
      return routeMatch && vehicleMatch && ratingMatch && dateMatch;
    });
  }, [routeFilter, vehicleFilter, ratingFilter, dateFilter, customFrom, customTo]);

  const clearAll = () => {
    setRouteFilter("All Routes");
    setVehicleFilter("All Vehicles");
    setRatingFilter("All");
    setDateFilter("All");
    setCustomFrom("");
    setCustomTo("");
  };

  const clearFilter = (key: "route" | "vehicle" | "rating" | "date") => {
    if (key === "route") setRouteFilter("All Routes");
    if (key === "vehicle") setVehicleFilter("All Vehicles");
    if (key === "rating") setRatingFilter("All");
    if (key === "date") {
      setDateFilter("All");
      setCustomFrom("");
      setCustomTo("");
    }
  };

  return (
    <>
      <ReviewFilters
        routeFilter={routeFilter}
        vehicleFilter={vehicleFilter}
        ratingFilter={ratingFilter}
        dateFilter={dateFilter}
        customFrom={customFrom}
        customTo={customTo}
        onRouteChange={setRouteFilter}
        onVehicleChange={setVehicleFilter}
        onRatingChange={setRatingFilter}
        onDateChange={setDateFilter}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
        onApplyCustomRange={() => setDateFilter("Custom")}
        onClearFilter={clearFilter}
        onClearAll={clearAll}
        resultCount={filteredReviews.length}
      />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <ReviewsGrid reviews={filteredReviews} onClearAll={clearAll} />
      </div>
    </>
  );
}
