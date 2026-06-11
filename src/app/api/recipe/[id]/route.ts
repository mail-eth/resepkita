import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipeId = parseInt(id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  // Delete old relations
  await prisma.$transaction([
    prisma.ingredient.deleteMany({ where: { recipeId } }),
    prisma.step.deleteMany({ where: { recipeId } }),
    prisma.videoLink.deleteMany({ where: { recipeId } }),
  ]);

  const recipe = await prisma.recipe.update({
    where: { id: recipeId },
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipeId = parseInt(id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  await prisma.recipe.delete({ where: { id: recipeId } });
  return NextResponse.json({ status: "deleted" });
}
