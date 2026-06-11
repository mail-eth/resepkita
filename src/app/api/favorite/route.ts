import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { recipeId } = await req.json();

  const existing = await prisma.favorite.findUnique({ where: { recipeId } });
  if (existing) {
    await prisma.favorite.delete({ where: { recipeId } });
    return NextResponse.json({ status: "removed" });
  } else {
    await prisma.favorite.create({ data: { recipeId } });
    return NextResponse.json({ status: "added" });
  }
}
