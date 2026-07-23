import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FleetHero from "@/components/fleet/FleetHero";
import FleetContent from "@/components/fleet/FleetContent";
import FleetCTA from "@/components/fleet/FleetCTA";

export const metadata: Metadata = {
  title: "Our Fleet — Obbi Cabs | 4 to 50 Seater Cabs in Maharashtra",
  description:
    "Choose from Dzire, Ertiga, Innova Crysta, Urbania, Mini Bus and Full Bus. Premium cab service in Pune, Mumbai, Nashik, Shirdi.",
  keywords: [
    "innova crysta cab pune",
    "urbania on rent pune",
    "mini bus hire pune",
    "cab fleet maharashtra",
  ],
};

export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <FleetHero />
        <FleetContent />
        <FleetCTA />
      </main>
      <Footer />
    </>
  );
}
