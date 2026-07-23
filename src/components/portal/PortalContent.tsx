"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import PortalBackground from "./PortalBackground";
import PortalNavbar from "./PortalNavbar";
import SearchSection from "./SearchSection";
import PopularRoutes from "./PopularRoutes";
import FleetPreview from "./FleetPreview";
import MyBookings from "./MyBookings";
import SafarBot from "./SafarBot";

export default function PortalContent() {
  const { user, loading, logout } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold-light" />
      </div>
    );
  }

  return (
    <>
      <PortalBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PortalNavbar user={user} onLogout={logout} />
      </motion.div>

      <main className="pb-20">
        <Suspense fallback={null}>
          <SearchSection user={user} />
        </Suspense>
        <PopularRoutes />
        <FleetPreview />
        <MyBookings />
      </main>

      <SafarBot />
    </>
  );
}
