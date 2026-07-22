"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  onComplete: (otp: string) => void;
  error?: boolean;
}

export default function OTPInput({
  length,
  onChange,
  onComplete,
  error = false,
}: OTPInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateDigits = (next: string[]) => {
    setDigits(next);
    const otp = next.join("");
    onChange(otp);
    if (otp.length === length && next.every((d) => d !== "")) {
      onComplete(otp);
    }
  };

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "");
    if (!value) {
      const next = [...digits];
      next[index] = "";
      updateDigits(next);
      return;
    }

    const next = [...digits];
    next[index] = value[value.length - 1];
    updateDigits(next);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        updateDigits(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = "";
        updateDigits(next);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;

    const next = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    updateDigits(next);

    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <motion.div
      role="group"
      aria-label="One-time password"
      animate={error ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center gap-1.5 sm:gap-3"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          aria-label={`OTP digit ${index + 1} of ${length}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`h-12 w-9 rounded-xl border bg-glass text-center font-display text-2xl text-text outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.25)] sm:h-14 sm:w-12 ${
            error
              ? "border-red-500"
              : digit
              ? "border-gold"
              : "border-border"
          }`}
        />
      ))}
    </motion.div>
  );
}
