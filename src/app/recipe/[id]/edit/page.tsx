import { prisma } from "@/lib/prisma";
import RecipeForm from "@/components/RecipeForm";

export const dynamic = "force-dynamic";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipeId = parseInt(id);

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { ingredients: true, steps: true, videoLinks: true },
  });

  if (!recipe) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>Resep tidak ditemukan.</p>
        <a href="/" className="text-primary-500 hover:underline">← Kembali ke Beranda</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="text-sm text-gray-400 mb-4">
        <a href="/" className="hover:text-primary-500">Beranda</a>
        <span className="mx-2">→</span>
        <a href={`/recipe/${recipeId}`} className="hover:text-primary-500">{recipe.title}</a>
        <span className="mx-2">→</span>
        <span className="text-gray-600">Edit</span>
      </nav>

      <h1 className="text-2xl font-bold mb-6">✏️ Edit Resep</h1>

      <RecipeForm recipe={recipe} />
    </div>
  );
}
