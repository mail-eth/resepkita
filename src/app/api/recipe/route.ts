import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const recipe = await prisma.recipe.create({
    data: {
      title: body.title,
      description: body.description || null,
      category: body.category || "Lainnya",
      cookTime: body.cookTime || null,
      servings: body.servings || null,
      imageUrl: body.imageUrl || null,
      ingredients: {
        create: (body.ingredients || []).map((i: { name: string; amount: string }) => ({
          name: i.name,
          amount: i.amount,
        })),
      },
      steps: {
        create: (body.steps || []).map((s: { stepNumber: number; instruction: string }) => ({
          stepNumber: s.stepNumber,
          instruction: s.instruction,
        })),
      },
      videoLinks: {
        create: (body.videoLinks || []).map((v: { platform: string; url: string }) => ({
          platform: v.platform,
          url: v.url,
        })),
      },
    },
  });

  return NextResponse.json({ id: recipe.id });
}
