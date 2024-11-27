"use client";

import Image from "next/image";
import logo from "@/assets/2.svg";

import { useEffect, useState } from "react";
import { ProductType } from "@/db/models/Product";
import handleLogout from "@/app/login/action";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/products/search?q=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-[#EE4D2D] to-[#F36F54] shadow-md z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Image alt="Dellybee" src={logo} width={200} height={200} />
          </a>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <a
            href="/products"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Product
          </a>
          <a
            href="/wishlists"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Wishlist
          </a>

          {/* search */}
          <input
            type="text"
            placeholder="Quick search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        <div className="hidden lg:flex items-center gap-x-4">
          {isLoggedIn ? (
            <form action={handleLogout}>
              <button
                type="submit"
                className="text-sm font-semibold text-white hover:text-gray-200"
              >
                Log out →
              </button>
            </form>
          ) : (
            <a
              href="/login"
              className="rounded-md bg-blue-400 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </a>
          )}
        </div>
      </nav>

      {search && products.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg z-40">
          <ul className="max-h-64 overflow-y-auto">
            {products.map((product) => (
              <li
                key={product._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <a
                  href={`/products/${product.slug}`}
                  className="block text-sm text-gray-800"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
