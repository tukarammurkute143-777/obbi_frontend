"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StarsBackground from "@/components/landing/StarsBackground";
import { useAuth } from "@/lib/auth/AuthContext";

const REDIRECT_DELAY_MS = 5000;

export default function WelcomePage() {
  const router = useRouter();
  const { user, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const timer = setTimeout(() => {
      router.push("/portal");
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [initialized, user, router]);

  if (!user) return null;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-dark via-dark-2 to-dark px-5">
      <StarsBackground />

      <motion.div
        aria-hidden="true"
        initial={{ x: "-10vw" }}
        animate={{ x: "110vw" }}
        transition={{ duration: 4, ease: "easeInOut", delay: 0.6 }}
        className="pointer-events-none absolute bottom-24 text-5xl sm:bottom-32 sm:text-6xl"
      >
        🚗
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex max-w-xl flex-col items-center text-center"
      >
        <h1 className="font-display text-4xl font-semibold text-text sm:text-5xl">
          Namaste {user.name}! 🙏
        </h1>
        <p className="mt-4 font-body text-lg text-gold-light">
          Obii Cabs mein aapka swagat hai!
        </p>
        <p className="mt-2 font-body text-base text-text-muted">
          Maharashtra ki best cab service ab aapki muthi mein! 🚗
        </p>

        <button
          type="button"
          onClick={() => router.push("/portal")}
          className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-8 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] active:scale-[0.97]"
        >
          Start Exploring
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </motion.div>
    </main>
  );
}
