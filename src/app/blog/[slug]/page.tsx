import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogPost from "@/components/blog/BlogPost";
import { BLOG_POSTS } from "@/lib/blog/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found — Obii Cabs Blog" };
  }

  return {
    title: `${post.title} — Obii Cabs Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-dark">
        <BlogPost post={post} />
      </main>
      <Footer />
    </>
  );
}
