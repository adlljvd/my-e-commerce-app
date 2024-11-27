import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ProductType } from "@/db/models/Product";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import AddToWishlist from "@/components/AddToWishlist";
import { Metadata } from "next";

type Props = {
  params: Params;
};

type Params = {
  slug: string;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = props.params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`
  );
  const product: ProductType = await response.json();

  // console.log(product, "<<<response dari metadata");

  return { title: product.slug };
}

export default async function ProductDetail(props: Props) {
  const { slug } = props.params;
  // console.log(slug, "<<<slug");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Product not found (status: ${response.status})`);
  }

  const product: ProductType = await response.json();

  const isLoggedIn = cookies().has("access_token"); //boolean

  return (
    <div className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mt-10">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product?.images.map((image) => (
                  <Tab
                    key={image}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt={product.name}
                        src={image}
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {product.images.map((image) => (
                <TabPanel key={image}>
                  <img
                    alt={product.name}
                    src={image}
                    className="aspect-square w-full object-cover sm:rounded-lg"
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price.toLocaleString("en-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>

            <div className="mt-6">
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="space-y-6 text-base text-gray-700"
              />
            </div>

            {product._id && <AddToWishlist productId={product._id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
