import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustCounters from "@/components/landing/TrustCounters";
import VehicleShowcase from "@/components/landing/VehicleShowcase";
import RatingsSection from "@/components/landing/RatingsSection";
import LoginSection from "@/components/landing/LoginSection";
import CitiesSection from "@/components/landing/CitiesSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <TrustCounters />
        <VehicleShowcase />
        <RatingsSection />
        <LoginSection />
        <CitiesSection />
      </main>
      <Footer />
    </>
  );
}
