"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { Review } from "@/lib/reviews/constants";
import ReviewCard from "./ReviewCard";

interface ReviewsGridProps {
  reviews: Review[];
  onClearAll: () => void;
}

export default function ReviewsGrid({ reviews, onClearAll }: ReviewsGridProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-glass px-6 py-16 text-center">
        <span className="text-4xl">🔍</span>
        <p className="mt-4 font-display text-xl text-text">
          Koi review nahi mila!
        </p>
        <p className="mt-1 font-body text-sm text-text-muted">
          Filters clear karo ya alag route try karo
        </p>
        <button
          type="button"
          onClick={onClearAll}
          className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
        >
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </div>
  );
}
