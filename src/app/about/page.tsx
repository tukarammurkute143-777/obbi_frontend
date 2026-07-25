import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import WhyObbi from "@/components/about/WhyObbi";
import OurCities from "@/components/about/OurCities";
import OurPromise from "@/components/about/OurPromise";
import AboutReviews from "@/components/about/AboutReviews";

export const metadata: Metadata = {
  title: "About Us — Obii Cabs | Best Cab Service Maharashtra Since 2020",
  description:
    "Obii Cabs — One Booking, Infinite Independence. Best cab service in Maharashtra since 2020. 1247+ happy customers, 4.8 rating, 120+ routes.",
  keywords: [
    "about obii cabs",
    "best cab service pune",
    "maharashtra cab company",
    "trusted cab service",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <AboutHero />
        <OurStory />
        <WhyObbi />
        <OurCities />
        <OurPromise />
        <AboutReviews />
      </main>
      <Footer />
    </>
  );
}
