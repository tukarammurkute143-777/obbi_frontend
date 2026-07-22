"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string;
  onDismiss?: () => void;
}

export default function FormError({ message, onDismiss }: FormErrorProps) {
  useEffect(() => {
    if (!message || !onDismiss) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-2 flex items-center justify-center gap-1.5 text-center font-body text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
