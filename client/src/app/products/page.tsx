import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { ProductType } from "@/db/models/Product";
import { cookies } from "next/headers";

export default async function ProductPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error("API Error:", await response.text());
    throw new Error("Failed to fetch data");
  }
  const products: ProductType[] = await response.json();

  const isLoggedIn = cookies().has("access_token"); //boolean

  return (
    <div>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Products Section */}
      <div className="bg-white pt-16 mb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>

          {/* Products Grid */}
          <ProductGrid products={products} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
