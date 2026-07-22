"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StarsBackground from "@/components/landing/StarsBackground";
import { useAuth } from "@/lib/auth/AuthContext";
import { getLastTrip } from "@/lib/auth/loginUtils";

const REDIRECT_DELAY_MS = 5000;

export default function WelcomeBackPage() {
  const router = useRouter();
  const { user, initialized } = useAuth();
  const [lastTrip, setLastTrip] = useState<{ route: string } | null>(null);

  useEffect(() => {
    if (!initialized) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, client-only
    setLastTrip(getLastTrip());
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex max-w-xl flex-col items-center text-center"
      >
        <h1 className="font-display text-4xl font-semibold text-text sm:text-5xl">
          Welcome back {user.name}! 😊
        </h1>
        <p className="mt-4 font-body text-lg text-gold-light">
          Aapka safar humara gaurav hai! 🙏
        </p>
        {lastTrip && (
          <p className="mt-2 font-body text-base text-text-muted">
            Last time {lastTrip.route} gaye the — kuch naya plan hai?
          </p>
        )}

        <button
          type="button"
          onClick={() => router.push("/portal")}
          className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-8 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] active:scale-[0.97]"
        >
          Continue
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </motion.div>
    </main>
  );
}
