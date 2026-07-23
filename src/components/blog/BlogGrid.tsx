"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { BLOG_POSTS, CATEGORIES } from "@/lib/blog/constants";
import BlogFilters from "./BlogFilters";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    if (category === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === category);
  }, [category]);

  const featuredPost = category === "All" ? BLOG_POSTS.find((p) => p.featured) : undefined;
  const gridPosts = featuredPost
    ? filtered.filter((post) => post.id !== featuredPost.id)
    : filtered;

  return (
    <>
      <BlogFilters
        categories={CATEGORIES}
        active={category}
        onChange={setCategory}
        resultCount={filtered.length}
      />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {featuredPost && <BlogCard post={featuredPost} featured />}

        {gridPosts.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-border bg-glass px-6 py-16 text-center">
            <span className="text-4xl">📝</span>
            <p className="mt-4 font-display text-xl text-text">
              Is category mein abhi koi article nahi hai
            </p>
            <button
              type="button"
              onClick={() => setCategory("All")}
              className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-6 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-105 hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2} />
              Saare Articles Dekho
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              featuredPost ? "mt-10" : ""
            }`}
          >
            {gridPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
