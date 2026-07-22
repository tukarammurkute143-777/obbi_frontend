"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone, KeyRound } from "lucide-react";

interface LoginButtonsProps {
  size?: "compact" | "full";
}

export default function LoginButtons({ size = "full" }: LoginButtonsProps) {
  const padding = size === "full" ? "px-8 py-4" : "px-6 py-3";
  const textSize = size === "full" ? "text-base" : "text-sm";

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/login"
          className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-shadow hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] sm:w-auto ${padding} ${textSize}`}
        >
          <Smartphone className="h-5 w-5" strokeWidth={2} />
          Mobile Number se Login
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/login"
          className={`flex w-full items-center justify-center gap-2 rounded-full border border-gold bg-transparent font-body font-medium text-gold-light transition-all hover:bg-gold/10 hover:shadow-[0_0_28px_rgba(201,168,76,0.35)] sm:w-auto ${padding} ${textSize}`}
        >
          <KeyRound className="h-5 w-5" strokeWidth={2} />
          Login with Google
        </Link>
      </motion.div>
    </div>
  );
}
