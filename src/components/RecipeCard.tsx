import Link from "next/link";
import Image from "next/image";

type Recipe = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  cookTime: string | null;
  servings: string | null;
  imageUrl: string | null;
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="card-hover bg-white rounded-xl overflow-hidden border border-gray-100 block"
    >
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl">🍽️</span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
          {recipe.category}
        </span>
        <h3 className="font-bold text-gray-800 mt-2">{recipe.title}</h3>
        {recipe.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          {recipe.cookTime && <span>⏱️ {recipe.cookTime}</span>}
          {recipe.servings && <span>👥 {recipe.servings}</span>}
        </div>
      </div>
    </Link>
  );
}
