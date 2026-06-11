import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";

export const dynamic = "force-dynamic";

export default async function AddRecipePage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;
  const editId = params.edit ? parseInt(params.edit) : null;

  let recipe = null;
  if (editId && !isNaN(editId)) {
    recipe = await prisma.recipe.findUnique({
      where: { id: editId },
      include: { ingredients: true, steps: true, videoLinks: true },
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="text-sm text-gray-400 mb-4">
        <a href="/" className="hover:text-primary-500">Beranda</a>
        <span className="mx-2">→</span>
        <span className="text-gray-600">{recipe ? "Edit Resep" : "Tambah Resep"}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-6">
        {recipe ? "✏️ Edit Resep" : "📝 Tambah Resep Baru"}
      </h1>

      <RecipeForm recipe={recipe} />
    </div>
  );
}
