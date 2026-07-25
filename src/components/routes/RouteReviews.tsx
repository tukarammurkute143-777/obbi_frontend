import { BadgeCheck, Star } from "lucide-react";
import type { RouteReview } from "@/lib/routes/routesData";

interface RouteReviewsProps {
  reviews: RouteReview[];
  from: string;
  to: string;
}

export default function RouteReviews({ reviews, from, to }: RouteReviewsProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
        Customer Reviews for {from} → {to}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={`${review.name}-${review.vehicle}`}
            className="flex h-full flex-col rounded-2xl border border-border bg-glass p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={
                    i < review.rating
                      ? "h-4 w-4 fill-gold-light text-gold-light"
                      : "h-4 w-4 text-text-muted"
                  }
                  strokeWidth={2}
                />
              ))}
            </div>

            <p className="mt-3 flex-1 font-body text-sm italic leading-relaxed text-text">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="font-body text-sm font-medium text-text">{review.name}</span>
              <span className="rounded-full border border-border bg-dark/60 px-2.5 py-0.5 font-body text-xs text-text-muted">
                {review.vehicle}
              </span>
              <span className="flex items-center gap-1 font-body text-xs text-green">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                Verified Trip
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
