"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { grantOwnerAccess, isOwner } from "@/lib/dashboard/storage";

// Temporary mock owner gate — a real Supabase role check replaces this
// once the backend phase lands.
const OWNER_KEY_PARAM = "obbi2026";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold-light" />
    </div>
  );
}

function OwnerGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Deferred to an effect (rather than lazy initial state) so this never
    // reads localStorage during the server render, matching the pattern in
    // AuthContext.
    const keyParam = searchParams.get("key");

    if (keyParam === OWNER_KEY_PARAM) {
      grantOwnerAccess();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(true);
      return;
    }

    if (isOwner()) {
      setAuthorized(true);
      return;
    }

    setAuthorized(false);
    router.replace("/");
  }, [searchParams, router]);

  if (authorized !== true) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <OwnerGate>{children}</OwnerGate>
    </Suspense>
  );
}
