import { prisma } from "@/lib/prisma";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MyRecipesPage() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">📚 Koleksi Resep</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <Link
          href="/my"
          className="px-5 py-3 text-sm font-medium border-b-2 text-primary-600 border-primary-500"
        >
          📋 Resep Saya
        </Link>
        <Link
          href="/saved"
          className="px-5 py-3 text-sm font-medium border-b-2 text-gray-400 border-transparent hover:text-gray-600"
        >
          ❤️ Tersimpan
        </Link>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-4">📝</span>
          <p>Belum ada resep yang dibuat.</p>
          <Link href="/add" className="inline-block mt-3 text-primary-500 font-medium hover:underline">
            Buat Resep Pertama →
          </Link>
        </div>
      )}
    </>
  );
}
