"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

type AddToWishlistProps = {
  productId: string;
};

export default function AddToWishlist({ productId }: AddToWishlistProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToWishlist = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        throw new Error(errorData.error || "Failed to add to wishlist");
      }

      const successData = await response.json();
      console.log("Success response from API:", successData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Added to wishlist successfully!",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You must be logged in to add items to your wishlist.",
          });
          router.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong! Please try again.",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="mt-10 flex">
        <button
          onClick={handleAddToWishlist}
          type="button"
          disabled={isLoading}
          className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Adding..." : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
