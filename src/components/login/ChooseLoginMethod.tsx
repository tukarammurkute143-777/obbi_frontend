"use client";

import { Lock, Smartphone } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import FormError from "./FormError";

interface ChooseLoginMethodProps {
  onMobile: () => void;
  onGoogle: () => void;
  googleLoading: boolean;
  error: string;
  onDismissError: () => void;
}

export default function ChooseLoginMethod({
  onMobile,
  onGoogle,
  googleLoading,
  error,
  onDismissError,
}: ChooseLoginMethodProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-display text-3xl font-semibold text-gold-light">
        🚗 Obbi Cabs
      </span>
      <p className="mt-2 font-display text-lg text-text">
        एक login, अनंत प्रवास!
      </p>

      <div className="my-8 h-px w-full bg-border" />

      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={onMobile}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] active:scale-[0.97]"
        >
          <Smartphone className="h-5 w-5" strokeWidth={2} />
          Mobile Number se Login
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="font-body text-xs text-text-muted">ya</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleLoginButton onClick={onGoogle} loading={googleLoading} />
      </div>

      <FormError message={error} onDismiss={onDismissError} />

      <div className="mt-8 h-px w-full bg-border" />

      <p className="mt-6 flex items-center justify-center gap-1.5 font-body text-xs text-text-muted">
        <Lock className="h-3.5 w-3.5 text-gold-dark" strokeWidth={2} />
        Aapka data safe hai — Sirf trip planning ke liye
      </p>
    </div>
  );
}
