import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog/constants";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-glass p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.22)] sm:flex-row sm:items-center sm:gap-8 sm:p-10"
      >
        <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />

        <div className="flex shrink-0 items-center justify-center text-8xl sm:h-40 sm:w-40">
          {post.emoji}
        </div>

        <div className="mt-6 sm:mt-0">
          <div className="flex flex-wrap items-center gap-3">
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

          <h2 className="mt-4 font-display text-3xl font-semibold text-text sm:text-4xl">
            {post.title}
          </h2>

          <p className="mt-3 font-body text-sm text-text-muted sm:text-base">
            {post.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm text-gold-light">
            Read More
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-glass p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_0_28px_rgba(201,168,76,0.2)]"
    >
      <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />

      <span className="self-start rounded-full border border-gold/40 bg-dark/60 px-3 py-1 font-body text-xs text-gold-light">
        {post.category}
      </span>

      <div className="mt-4 text-6xl">{post.emoji}</div>

      <h3 className="mt-3 font-display text-xl font-semibold text-text">
        {post.title}
      </h3>

      <p className="mt-2 flex-1 font-body text-sm text-text-muted">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center gap-4 font-body text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {post.readTime} min
        </span>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm text-gold-light">
        Read More
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </Link>
  );
}
