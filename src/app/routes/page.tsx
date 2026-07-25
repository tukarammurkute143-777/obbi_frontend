import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RoutesHero from "@/components/routes/RoutesHero";
import AllRoutesGrid from "@/components/routes/AllRoutesGrid";

export const metadata: Metadata = {
  title: "All Routes — Obii Cabs | Maharashtra Cab Routes",
  description:
    "Explore all Obii Cabs routes across Maharashtra — Pune to Shirdi, Mumbai, Nashik, Mahabaleshwar, Goa and more. Distance, duration, top places and vehicles for every route.",
  keywords:
    "maharashtra cab routes, pune cab routes, mumbai cab routes, obii cabs routes, outstation cab maharashtra",
  alternates: {
    canonical: "/routes",
  },
};

export default function RoutesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <RoutesHero />
        <AllRoutesGrid />
      </main>
      <Footer />
    </>
  );
}
