"use client";

import { ProductType } from "@/db/models/Product";
import ProductCard from "@/components/ProductCard";

type ProductGridProps = {
  products: ProductType[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
