import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ProductType } from "@/db/models/Product";
import { cookies } from "next/headers";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const products: ProductType[] = await response.json();

  if (!response.ok) {
    console.error("API Error:", await response.text());
    throw new Error("Failed to fetch data");
  }

  const latestProducts = products.slice(0, 4);

  const isLoggedIn = cookies().has("access_token"); //boolean

  return (
    <div>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Banner */}
        <Banner />
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Shop Latest Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="group relative border rounded-lg bg-white shadow hover:shadow-lg p-4"
            >
              {/* Product Image */}
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center">
                <p className="text-shopee text-lg font-bold mt-1">
                  {product.price.toLocaleString("en-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  <Link href={`/products/${product.slug}`}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
        {/* See All Products Button */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-block px-6 py-3 text-white bg-shopee hover:bg-shopee-100 rounded-md font-medium"
          >
            See All Products →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
