"use client";

import { motion } from "framer-motion";

export default function SuccessScreen() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
      >
        <motion.circle
          cx="36"
          cy="36"
          r="33"
          stroke="#C9A84C"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M22 37 L32 47 L50 27"
          stroke="#E8C97A"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-6 font-display text-2xl font-semibold text-text"
      >
        Login Successful! 🎉
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-2 font-body text-sm text-text-muted"
      >
        Redirecting to your portal...
      </motion.p>
    </div>
  );
}
