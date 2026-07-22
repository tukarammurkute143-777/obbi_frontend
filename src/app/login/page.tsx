"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoginBackground from "@/components/login/LoginBackground";
import ChooseLoginMethod from "@/components/login/ChooseLoginMethod";
import MobileLoginForm from "@/components/login/MobileLoginForm";
import OTPVerification from "@/components/login/OTPVerification";
import SuccessScreen from "@/components/login/SuccessScreen";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  determineRedirectPath,
  ERROR_MESSAGES,
  getClientIP,
  googleLogin,
  recordLoginAttempt,
  type AuthUser,
} from "@/lib/auth/loginUtils";

type Step = "choose" | "mobile" | "otp" | "success";

const SUCCESS_DELAY_MS = 1800;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>("choose");
  const [mobile, setMobile] = useState("");
  const [chooseError, setChooseError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const redirectPathRef = useRef("/portal");

  const completeLogin = (user: AuthUser, isNewUser: boolean) => {
    login({ ...user, isNewUser });
    redirectPathRef.current = determineRedirectPath(user, isNewUser);
    setStep("success");
    setTimeout(() => {
      router.push(redirectPathRef.current);
    }, SUCCESS_DELAY_MS);
  };

  const handleGoogleLogin = async () => {
    setChooseError("");
    setGoogleLoading(true);
    try {
      const response = await googleLogin();

      getClientIP().then((ip) => {
        recordLoginAttempt(ip, response.user?.email ?? "google-user", response.success);
      });

      if (response.success && response.user) {
        completeLogin(response.user, response.isNewUser ?? true);
      } else {
        setChooseError(response.message ?? ERROR_MESSAGES.googleFailed);
      }
    } catch {
      setChooseError(ERROR_MESSAGES.googleFailed);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen">
      <LoginBackground />

      <div className="flex min-h-screen items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[440px] overflow-hidden border border-border bg-glass px-6 py-10 backdrop-blur-md sm:rounded-3xl sm:px-10 sm:py-10"
        >
          {step === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChooseLoginMethod
                onMobile={() => setStep("mobile")}
                onGoogle={handleGoogleLogin}
                googleLoading={googleLoading}
                error={chooseError}
                onDismissError={() => setChooseError("")}
              />
            </motion.div>
          )}

          {step === "mobile" && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MobileLoginForm
                onBack={() => setStep("choose")}
                onOTPSent={(sentMobile) => {
                  setMobile(sentMobile);
                  setStep("otp");
                }}
              />
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OTPVerification
                mobile={mobile}
                onBack={() => setStep("mobile")}
                onVerified={completeLogin}
              />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessScreen />
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
