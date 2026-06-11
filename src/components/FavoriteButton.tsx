"use client";

import { useState } from "react";

export default function FavoriteButton({
  recipeId,
  isFav,
}: {
  recipeId: number;
  isFav: boolean;
}) {
  const [saved, setSaved] = useState(isFav);

  const toggle = async () => {
    const res = await fetch(`/api/favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId }),
    });
    const data = await res.json();
    setSaved(data.status === "added");
  };

  return (
    <button
      onClick={toggle}
      className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        saved
          ? "bg-red-50 border-red-200 text-red-600"
          : "bg-gray-50 border-gray-200 text-gray-600"
      }`}
    >
      {saved ? "❤️" : "🤍"}{" "}
      <span className="ml-1">{saved ? "Tersimpan" : "Simpan"}</span>
    </button>
  );
}
