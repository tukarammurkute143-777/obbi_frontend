"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-border bg-dark-2/95 px-5 py-2.5 font-body text-sm text-gold-light shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      {message}
    </div>
  );
}
