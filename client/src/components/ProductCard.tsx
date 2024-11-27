"use client";
import { ProductType } from "@/db/models/Product";
import { StarIcon, MapPinIcon } from "@heroicons/react/20/solid";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product._id}
      className="group relative rounded-lg border border-gray-200 p-4 hover:shadow-lg"
    >
      {/* Product Image */}
      <a href={`/products/${product.slug}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-90"
        />
      </a>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={product.thumbnail}>{product.name}</a>
        </h3>
        <div className="mt-2 flex flex-col items-center">
          <p className="mt-1 text-sm text-gray-500">{product.excerpt}</p>
        </div>

        <div className="flex items-center mt-5">
          <StarIcon
            aria-hidden="true"
            className="text-yellow-400 size-5 shrink-0"
          />
          <StarIcon
            aria-hidden="true"
            className="text-yellow-400 size-5 shrink-0"
          />
          <StarIcon
            aria-hidden="true"
            className="text-yellow-400 size-5 shrink-0"
          />
          <StarIcon
            aria-hidden="true"
            className="text-yellow-400 size-5 shrink-0"
          />
          <StarIcon
            aria-hidden="true"
            className="text-gray-200 size-5 shrink-0"
          />
        </div>
        <p className="flex items-center mt-4 text-base font-semibold text-shopee">
          {product.price.toLocaleString("en-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <div className="flex items-center text-gray-500 mt-5">
          <MapPinIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">KOTA JAKARTA TIMUR</span>
        </div>
      </div>
    </div>
  );
}
