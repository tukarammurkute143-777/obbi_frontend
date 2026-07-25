import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Travel Blog — Obii Cabs | Maharashtra Trip Guides & Tips",
  description:
    "Maharashtra travel guides, cab tips, route guides, and pilgrimage information. Plan your perfect Maharashtra trip with Obii Cabs blog.",
  keywords: [
    "maharashtra travel blog",
    "pune shirdi guide",
    "mahabaleshwar trip tips",
    "cab travel tips",
  ],
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <BlogHero />
        <BlogGrid />
      </main>
      <Footer />
    </>
  );
}
