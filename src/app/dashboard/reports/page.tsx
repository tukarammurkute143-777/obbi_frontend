import type { Metadata } from "next";
import ReportsContent from "@/components/dashboard/reports/ReportsContent";

export const metadata: Metadata = {
  title: "Reports — Obbi Cabs Dashboard",
  description: "Business report generation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportsPage() {
  return <ReportsContent />;
}
