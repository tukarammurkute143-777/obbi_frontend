import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, type BlogPost as BlogPostType } from "@/lib/blog/constants";
import { renderMarkdown } from "@/lib/blog/markdown";
import BlogCard from "./BlogCard";
import BlogCTA from "./BlogCTA";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRelatedPosts(post: BlogPostType): BlogPostType[] {
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category
  );
  const others = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.category !== post.category
  );
  return [...sameCategory, ...others].slice(0, 3);
}

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const related = getRelatedPosts(post);

  return (
    <article className="relative px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[720px]">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 font-body text-sm text-text-muted transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-gold/40 bg-dark/60 px-3 py-1 font-body text-xs text-gold-light">
            {post.category}
          </span>
          <span className="flex items-center gap-1 font-body text-xs text-text-muted">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1 font-body text-xs text-text-muted">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            {post.readTime} min read
          </span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-text sm:text-5xl">
          {post.title}
        </h1>

        <div className="my-8 text-center text-7xl">{post.emoji}</div>

        <div className="border-t border-border pt-8">{renderMarkdown(post.content)}</div>

        <BlogCTA />

        {related.length > 0 && (
          <div className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-semibold text-text">
              Related Posts
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
