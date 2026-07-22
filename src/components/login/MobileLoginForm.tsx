"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Info, Loader2 } from "lucide-react";
import {
  checkRateLimit,
  ERROR_MESSAGES,
  getClientIP,
  recordLoginAttempt,
  recordOtpRequest,
  sendOTP,
  validateMobile,
} from "@/lib/auth/loginUtils";
import FormError from "./FormError";

interface MobileLoginFormProps {
  onBack: () => void;
  onOTPSent: (mobile: string) => void;
}

export default function MobileLoginForm({
  onBack,
  onOTPSent,
}: MobileLoginFormProps) {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!validateMobile(mobile)) {
      setError(ERROR_MESSAGES.invalidMobile);
      return;
    }

    const rateLimit = checkRateLimit(mobile);
    if (!rateLimit.allowed) {
      setCooldown(rateLimit.retryAfterSeconds);
      setError(ERROR_MESSAGES.tooManyRequests);
      return;
    }

    setLoading(true);
    try {
      const response = await sendOTP(mobile);

      getClientIP().then((ip) => {
        recordLoginAttempt(ip, mobile, response.success);
      });

      if (response.success) {
        recordOtpRequest(mobile);
        onOTPSent(mobile);
      } else {
        setError(ERROR_MESSAGES.otpSendFailed);
      }
    } catch {
      setError(ERROR_MESSAGES.otpSendFailed);
    } finally {
      setLoading(false);
    }
  };

  const cooldownLabel =
    cooldown > 0
      ? cooldown >= 60
        ? `${Math.ceil(cooldown / 60)} min baad try karo`
        : `${cooldown}s baad try karo`
      : null;

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex items-center gap-1.5 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back
      </button>

      <div className="mt-6 text-center">
        <h1 className="font-display text-2xl font-semibold text-text">
          📱 Mobile Number
        </h1>
        <p className="mt-1 font-body text-sm text-text-muted">
          Maharashtra ka number daalo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <label htmlFor="mobile-input" className="sr-only">
          Mobile number
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-glass px-4 py-3.5 focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.2)]">
          <span className="font-body text-text-muted">+91</span>
          <span className="h-5 w-px bg-border" />
          <input
            ref={inputRef}
            id="mobile-input"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98XXXXXXXX"
            value={mobile}
            maxLength={10}
            aria-invalid={Boolean(error)}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className="w-full bg-transparent font-body text-text outline-none placeholder:text-text-muted/60"
          />
        </div>

        <FormError message={error} onDismiss={() => setError("")} />

        <button
          type="submit"
          disabled={loading || cooldown > 0}
          aria-busy={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} />
          ) : cooldown > 0 ? (
            cooldownLabel
          ) : (
            <>
              WhatsApp OTP Bhejo
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center font-body text-xs text-text-muted">
        <Info className="h-3.5 w-3.5" strokeWidth={2} />
        OTP WhatsApp pe aayega
      </p>
    </div>
  );
}
