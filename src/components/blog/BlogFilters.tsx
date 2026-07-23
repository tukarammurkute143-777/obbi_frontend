"use client";

interface BlogFiltersProps {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
  resultCount: number;
}

export default function BlogFilters({
  categories,
  active,
  onChange,
  resultCount,
}: BlogFiltersProps) {
  return (
    <div className="sticky top-[76px] z-30 border-b border-border bg-dark-2/90 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-body text-sm transition-colors duration-200 ${
                active === category
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/40 bg-transparent text-gold-light hover:bg-gold/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="font-body text-xs text-text-muted">
          Showing {resultCount} article{resultCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
