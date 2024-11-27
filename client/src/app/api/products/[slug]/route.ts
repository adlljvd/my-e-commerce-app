import Product from "@/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    NextResponse.json({ message: "Slug not defined" }, { status: 404 });
  }
  const product = await Product.findBySlug(params.slug);
  if (!product)
    NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product, { status: 200 });
}
