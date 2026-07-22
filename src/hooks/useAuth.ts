"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth as useAuthContext } from "@/lib/auth/AuthContext";
import type { AuthUser } from "@/lib/auth/loginUtils";

interface UseAuthResult {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
}

export function useAuth(): UseAuthResult {
  const router = useRouter();
  const { user, initialized, logout } = useAuthContext();

  useEffect(() => {
    if (!initialized) return;
    if (!user) {
      router.replace("/login");
    }
  }, [initialized, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return { user, loading: !initialized, logout: handleLogout };
}
