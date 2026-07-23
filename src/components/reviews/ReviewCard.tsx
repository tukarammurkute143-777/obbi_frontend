"use client";

import Link from "next/link";
import { BadgeCheck, Calendar, Car, MapPin, Star } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Review } from "@/lib/reviews/constants";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function destinationOf(route: string): string {
  const parts = route.split("→");
  return parts[parts.length - 1]?.trim() ?? route;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user } = useAuth();

  const bookHref = user
    ? `/portal?to=${encodeURIComponent(destinationOf(review.route))}#search-section`
    : "/login";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]">
      <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-gold-light text-gold-light"
              strokeWidth={1.5}
            />
          ))}
        </div>
        {review.verified && (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 font-body text-xs text-green-400">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
            Verified Trip
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 font-body text-sm text-text sm:text-base">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-display text-base text-gold-light">— {review.name}</p>
        <div className="mt-2 flex flex-col gap-1 font-body text-xs text-text-muted sm:text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {review.route}
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {review.vehicle}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {formatDate(review.date)}
          </span>
        </div>
      </div>

      <Link
        href={bookHref}
        className="mt-5 flex items-center justify-center gap-1.5 rounded-full border border-gold px-5 py-2.5 font-body text-sm text-gold-light transition-colors duration-200 hover:bg-gold hover:text-dark"
      >
        Book Same Trip →
      </Link>
    </div>
  );
}
