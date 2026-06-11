"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ recipeId }: { recipeId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Yakin hapus resep ini?")) return;
    await fetch(`/api/recipe/${recipeId}`, { method: "DELETE" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100"
    >
      🗑️ Hapus
    </button>
  );
}
