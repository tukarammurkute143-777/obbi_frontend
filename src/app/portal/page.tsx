import type { Metadata } from "next";
import PortalContent from "@/components/portal/PortalContent";

export const metadata: Metadata = {
  title: "My Portal — Obbi Cabs | Book Cab in Maharashtra",
  description:
    "Book premium cabs in Maharashtra. Pune to Shirdi, Mumbai, Nashik. AI-powered travel planning with Safar bot.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalPage() {
  return <PortalContent />;
}
