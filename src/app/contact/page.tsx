import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactOptions from "@/components/contact/ContactOptions";
import CitiesCovered from "@/components/contact/CitiesCovered";
import BusinessHours from "@/components/contact/BusinessHours";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us — Obii Cabs | 24/7 Cab Booking Maharashtra",
  description:
    "Contact Obii Cabs for cab booking in Maharashtra. Call or WhatsApp anytime. Pune, Mumbai, Nashik, Shirdi, Sambhajinagar routes available 24/7.",
  keywords: [
    "contact obii cabs",
    "cab booking pune contact",
    "maharashtra cab number",
    "obii cabs phone",
  ],
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <ContactHero />
        <ContactOptions />
        <CitiesCovered />
        <BusinessHours />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
