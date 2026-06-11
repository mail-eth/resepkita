import { prisma } from "@/lib/prisma";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Makanan Utama", "Minuman", "Dessert", "Snack", "Sarapan"];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "";

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const featured = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Masak Apa Hari Ini? 🍽️</h1>
        <p className="text-primary-100 mb-6 text-lg">
          Temukan resep masakan Indonesia yang lezat dan mudah dibuat
        </p>
        <SearchBar defaultValue={q} />
      </div>

      {/* Category Filter */}
      <CategoryFilter categories={CATEGORIES} active={category} />

      {/* Featured */}
      {!category && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🔥 Resep Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {/* All Recipes */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          {category ? `📂 ${category}` : "📋 Semua Resep"}
        </h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <span className="text-5xl block mb-4">🍳</span>
            <p>Belum ada resep{category ? ` untuk kategori ${category}` : ""}.</p>
          </div>
        )}
      </section>
    </>
  );
}
