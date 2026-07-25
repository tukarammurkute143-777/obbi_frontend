import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import FloatingButtons from "@/components/landing/FloatingButtons";
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://obiicabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Obii Cabs — Best Cab Service in Maharashtra | Pune Mumbai Nashik Shirdi",
  description:
    "Book premium cabs in Maharashtra. Pune to Shirdi, Mumbai, Nashik, Sambhajinagar. 4 seater to 50 seater. 1247+ happy customers. 4.8 rating.",
  keywords: [
    "cab service pune",
    "pune to shirdi cab",
    "maharashtra cab booking",
    "obii cabs",
    "tourist cab pune",
  ],
  openGraph: {
    title: "Obii Cabs — एक login, अनंत प्रवास!",
    description: "Maharashtra ki best cab service",
    type: "website",
    url: siteUrl,
    siteName: "Obii Cabs",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obii Cabs — एक login, अनंत प्रवास!",
    description: "Maharashtra ki best cab service",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-dark font-body text-text">
        <AuthProvider>
          {children}
          <FloatingButtons />
        </AuthProvider>
      </body>
    </html>
  );
}
