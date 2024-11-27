"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Swal from "sweetalert2";
import { WishlistType } from "@/db/models/Wishlist";
import { CheckIcon } from "@heroicons/react/20/solid";

type DeleteResponse = {
  message: string;
};

export default function Wishlist() {
  const [products, setProducts] = useState<WishlistType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
          {}
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in.");
          }
          throw new Error("Failed to fetch wishlist.");
        }

        const data: { wishlist: WishlistType[] } = await response.json();

        if (data && Array.isArray(data.wishlist)) {
          setProducts(data.wishlist);
        } else {
          throw new Error(
            "Invalid data format: 'wishlist' property is missing or not an array."
          );
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error(errorMessage);
        setError(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (wishlistId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wishlistId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item from wishlist.");
      }

      const result: DeleteResponse = await response.json();
      console.log("Delete success:", result);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id?.toString() !== wishlistId)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Item removed from your wishlist.",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error deleting wishlist item:", errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  const confirmDelete = async (wishlistId: string, productName: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to remove "${productName}" from your wishlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        await handleDelete(wishlistId);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error during delete confirmation:", errorMessage);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Navbar isLoggedIn={true} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-10">
          Your Wishlist
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your Wishlist
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {products.map((wishlist) => (
                <li key={wishlist._id?.toString()} className="flex py-6">
                  <div className="shrink-0">
                    <img
                      alt={wishlist.Product.name}
                      src={wishlist.Product.thumbnail}
                      className="size-24 rounded-md object-cover sm:size-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a
                            href={`/products/${wishlist.Product.slug}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {wishlist.Product.name}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900 text-shopee">
                          {wishlist.Product.price.toLocaleString("en-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <p className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-green-500"
                        />{" "}
                        In stock
                      </p>
                      <div className="ml-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={async () =>
                            await confirmDelete(
                              wishlist._id?.toString() || "",
                              wishlist.Product.name
                            )
                          }
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </div>
    </div>
  );
}
