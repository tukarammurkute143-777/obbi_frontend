"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  checkRateLimit,
  ERROR_MESSAGES,
  getClientIP,
  recordLoginAttempt,
  recordOtpRequest,
  sendOTP,
  verifyOTP,
  type AuthUser,
} from "@/lib/auth/loginUtils";
import OTPInput from "./OTPInput";
import FormError from "./FormError";

const RESEND_SECONDS = 30;

interface OTPVerificationProps {
  mobile: string;
  onBack: () => void;
  onVerified: (user: AuthUser, isNewUser: boolean) => void;
}

export default function OTPVerification({
  mobile,
  onBack,
  onVerified,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleVerify = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      const response = await verifyOTP(mobile, code);

      getClientIP().then((ip) => {
        recordLoginAttempt(ip, mobile, response.success);
      });

      if (response.success && response.user) {
        onVerified(response.user, response.isNewUser ?? true);
      } else {
        setError(response.message ?? ERROR_MESSAGES.wrongOTP);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError(ERROR_MESSAGES.wrongOTP);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resending) return;

    const rateLimit = checkRateLimit(mobile);
    if (!rateLimit.allowed) {
      setError(ERROR_MESSAGES.tooManyRequests);
      return;
    }

    setResending(true);
    setError("");
    try {
      const response = await sendOTP(mobile);
      if (response.success) {
        recordOtpRequest(mobile);
        setResendTimer(RESEND_SECONDS);
      } else {
        setError(ERROR_MESSAGES.otpSendFailed);
      }
    } catch {
      setError(ERROR_MESSAGES.otpSendFailed);
    } finally {
      setResending(false);
    }
  };

  const maskedMobile = `+91 ${mobile.slice(0, 2)}XXXXXX${mobile.slice(-2)}`;

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex items-center gap-1.5 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
      >
        ← Back
      </button>

      <div className="mt-6 text-center">
        <h1 className="font-display text-2xl font-semibold text-text">
          🔐 OTP Enter Karo
        </h1>
        <p className="mt-1 font-body text-sm text-text-muted">
          WhatsApp pe OTP bheja hai {maskedMobile} pe
        </p>
      </div>

      <div className="mt-8">
        <OTPInput
          length={6}
          error={shake}
          onChange={setOtp}
          onComplete={handleVerify}
        />
      </div>

      <FormError message={error} onDismiss={() => setError("")} />

      <button
        type="button"
        disabled={loading || otp.length !== 6}
        aria-busy={loading}
        onClick={() => handleVerify(otp)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3.5 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} />
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
            Verify Karo
          </>
        )}
      </button>

      <div className="mt-5 flex flex-col items-center gap-2 text-center">
        <span className="font-body text-xs text-text-muted">
          {resendTimer > 0 ? (
            `⏱️ Resend OTP in ${resendTimer}s`
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-body text-xs text-gold-light underline-offset-2 hover:underline disabled:opacity-60"
            >
              {resending ? "Resending…" : "Resend OTP"}
            </button>
          )}
        </span>
        <button
          type="button"
          onClick={onBack}
          className="font-body text-xs text-text-muted underline-offset-2 hover:text-gold-light hover:underline"
        >
          Galat number? Change karo
        </button>
      </div>
    </div>
  );
}
