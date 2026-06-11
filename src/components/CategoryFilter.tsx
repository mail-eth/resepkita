"use client";

import Link from "next/link";

export default function CategoryFilter({
  categories,
  active,
}: {
  categories: string[];
  active: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !active
            ? "bg-primary-500 text-white"
            : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
        }`}
      >
        Semua
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/?category=${encodeURIComponent(cat)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === cat
              ? "bg-primary-500 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
