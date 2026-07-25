import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReviewsHero from "@/components/reviews/ReviewsHero";
import ReviewsContent from "@/components/reviews/ReviewsContent";
import RatingSummary from "@/components/reviews/RatingSummary";
import ReviewsCTA from "@/components/reviews/ReviewsCTA";

export const metadata: Metadata = {
  title: "Customer Reviews — Obii Cabs | 4.8⭐ Rating | 1247+ Happy Customers",
  description:
    "Read genuine reviews from 1247+ happy customers. Obii Cabs — best cab service in Maharashtra. Pune, Mumbai, Nashik, Shirdi routes.",
  keywords: [
    "obii cabs reviews",
    "cab service pune reviews",
    "shirdi cab reviews",
    "maharashtra cab reviews",
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <ReviewsHero />
        <ReviewsContent />
        <RatingSummary />
        <ReviewsCTA />
      </main>
      <Footer />
    </>
  );
}
