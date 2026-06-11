"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Ingredient = { name: string; amount: string };
type Step = { instruction: string };
type Video = { platform: string; url: string };

type RecipeData = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  cookTime: string | null;
  servings: string | null;
  imageUrl: string | null;
  ingredients: { name: string; amount: string | null }[];
  steps: { stepNumber: number; instruction: string }[];
  videoLinks: { platform: string; url: string }[];
} | null;

const CATEGORIES = ["Makanan Utama", "Minuman", "Dessert", "Snack", "Sarapan"];

export default function RecipeForm({ recipe }: { recipe: RecipeData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients.map((i) => ({ name: i.name, amount: i.amount || "" })) || [
      { name: "", amount: "" },
    ]
  );
  const [steps, setSteps] = useState<Step[]>(
    recipe?.steps.map((s) => ({ instruction: s.instruction })) || [
      { instruction: "" },
    ]
  );
  const [videos, setVideos] = useState<Video[]>(
    recipe?.videoLinks.map((v) => ({ platform: v.platform, url: v.url })) || [
      { platform: "youtube", url: "" },
    ]
  );

  const addIngredient = () => setIngredients([...ingredients, { name: "", amount: "" }]);
  const addStep = () => setSteps([...steps, { instruction: "" }]);
  const addVideo = () => setVideos([...videos, { platform: "youtube", url: "" }]);

  const removeIngredient = (i: number) => setIngredients(ingredients.filter((_, idx) => idx !== i));
  const removeStep = (i: number) => setSteps(steps.filter((_, idx) => idx !== i));
  const removeVideo = (i: number) => setVideos(videos.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      cookTime: form.get("cookTime"),
      servings: form.get("servings"),
      imageUrl: form.get("imageUrl"),
      ingredients: ingredients.filter((i) => i.name.trim()),
      steps: steps
        .filter((s) => s.instruction.trim())
        .map((s, i) => ({ stepNumber: i + 1, instruction: s.instruction })),
      videoLinks: videos.filter((v) => v.url.trim()),
    };

    const url = recipe
      ? `/api/recipe/${recipe.id}`
      : "/api/recipe";
    const method = recipe ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/recipe/${data.id}`);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
        <h2 className="font-semibold text-gray-700">Informasi Dasar</h2>
        <div>
          <label className="text-sm font-medium text-gray-600">Judul Resep *</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={recipe?.title || ""}
            className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
            placeholder="Contoh: Nasi Goreng Spesial"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={recipe?.description || ""}
            className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
            placeholder="Ceritakan tentang resep ini..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Kategori</label>
            <select
              name="category"
              defaultValue={recipe?.category || "Makanan Utama"}
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Waktu Masak</label>
            <input
              type="text"
              name="cookTime"
              defaultValue={recipe?.cookTime || ""}
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="30 menit"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Porsi</label>
            <input
              type="text"
              name="servings"
              defaultValue={recipe?.servings || ""}
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="4 porsi"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">URL Gambar</label>
          <input
            type="url"
            name="imageUrl"
            defaultValue={recipe?.imageUrl || ""}
            className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
            placeholder="https://contoh.com/gambar.jpg"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">🧾 Bahan-bahan</h2>
          <button type="button" onClick={addIngredient} className="text-sm text-primary-500 font-medium hover:text-primary-700">
            + Tambah Bahan
          </button>
        </div>
        <div className="space-y-3">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-3">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => {
                  const next = [...ingredients];
                  next[i].name = e.target.value;
                  setIngredients(next);
                }}
                placeholder="Nama bahan"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <input
                type="text"
                value={ing.amount}
                onChange={(e) => {
                  const next = [...ingredients];
                  next[i].amount = e.target.value;
                  setIngredients(next);
                }}
                placeholder="Jumlah"
                className="w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">👨‍🍳 Langkah-langkah</h2>
          <button type="button" onClick={addStep} className="text-sm text-primary-500 font-medium hover:text-primary-700">
            + Tambah Langkah
          </button>
        </div>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                {i + 1}
              </span>
              <textarea
                value={step.instruction}
                onChange={(e) => {
                  const next = [...steps];
                  next[i].instruction = e.target.value;
                  setSteps(next);
                }}
                rows={2}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Jelaskan langkah ini..."
              />
              {steps.length > 1 && (
                <button type="button" onClick={() => removeStep(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">🎬 Link Video</h2>
          <button type="button" onClick={addVideo} className="text-sm text-primary-500 font-medium hover:text-primary-700">
            + Tambah Video
          </button>
        </div>
        <div className="space-y-3">
          {videos.map((v, i) => (
            <div key={i} className="flex gap-3">
              <select
                value={v.platform}
                onChange={(e) => {
                  const next = [...videos];
                  next[i].platform = e.target.value;
                  setVideos(next);
                }}
                className="w-36 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              >
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="other">Lainnya</option>
              </select>
              <input
                type="url"
                value={v.url}
                onChange={(e) => {
                  const next = [...videos];
                  next[i].url = e.target.value;
                  setVideos(next);
                }}
                placeholder="https://youtube.com/..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              {videos.length > 1 && (
                <button type="button" onClick={() => removeVideo(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : recipe ? "💾 Simpan Perubahan" : "📝 Tambah Resep"}
        </button>
        <a
          href={recipe ? `/recipe/${recipe.id}` : "/"}
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200"
        >
          Batal
        </a>
      </div>
    </form>
  );
}
