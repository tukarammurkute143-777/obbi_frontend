import type { Metadata } from "next";
import DashboardContent from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Owner Dashboard — Obii Cabs",
  description: "Private owner dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-dark">
      <DashboardContent />
    </div>
  );
}
