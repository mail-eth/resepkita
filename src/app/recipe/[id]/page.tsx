import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

const PLATFORM_LABELS: Record<string, string> = {
  youtube: "🔴 YouTube",
  tiktok: "⚫ TikTok",
  instagram: "🟣 Instagram",
  other: "🔗 Video",
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipeId = parseInt(id);
  if (isNaN(recipeId)) notFound();

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { ingredients: true, steps: true, videoLinks: true },
  });

  if (!recipe) notFound();

  const favorite = await prisma.favorite.findUnique({
    where: { recipeId: recipeId },
  });

  return (
    <>
      <nav className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">Beranda</Link>
        <span className="mx-2">→</span>
        <span className="text-gray-600">{recipe.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            <div className="h-64 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl">🍽️</span>
              )}
            </div>
          </div>

          {/* Title & Meta */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3">
                  {recipe.title}
                </h1>
                {recipe.description && (
                  <p className="text-gray-500 mt-2">{recipe.description}</p>
                )}
              </div>
              <FavoriteButton recipeId={recipeId} isFav={!!favorite} />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
              {recipe.cookTime && <span>⏱️ {recipe.cookTime}</span>}
              {recipe.servings && <span>👥 {recipe.servings}</span>}
            </div>
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <Link
                href={`/recipe/${recipeId}/edit`}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                ✏️ Edit
              </Link>
              <DeleteButton recipeId={recipeId} />
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4">👨‍🍳 Langkah Memasak</h2>
            <ol className="space-y-4">
              {recipe.steps
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((step) => (
                  <li key={step.id} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.stepNumber}
                    </span>
                    <p className="text-gray-700 pt-1">{step.instruction}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ingredients */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4">🧾 Bahan-bahan</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id} className="flex items-start gap-3 text-sm">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-800 font-medium">{ing.name}</span>
                    {ing.amount && (
                      <span className="text-gray-400 ml-1">— {ing.amount}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Links */}
          {recipe.videoLinks.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4">🎬 Video Resep</h2>
              <div className="space-y-3">
                {recipe.videoLinks.map((v) => (
                  <a
                    key={v.id}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <span className="text-lg">{PLATFORM_LABELS[v.platform] || "🔗 Video"}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">
                        {v.platform.charAt(0).toUpperCase() + v.platform.slice(1)}
                      </span>
                    </div>
                    <span className="text-gray-300 group-hover:text-primary-500">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
