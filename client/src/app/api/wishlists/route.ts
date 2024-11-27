import Wishlist from "@/db/models/Wishlist";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  try {
    console.log("Headers:", request.headers);
    const userId = request.headers.get("x-user-id");
    console.log(userId, "<<<user id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wishlist = await Wishlist.findByUserId(userId);

    return NextResponse.json({ wishlist });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: string[] = error.errors.map((el) => el.message);
      return Response.json({ message: errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Bad Request: Product ID not found" },
        { status: 400 }
      );
    }

    await Wishlist.addWishlist(userId, productId);

    return NextResponse.json({ message: "Wishlist item added successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: string[] = error.errors.map((el) => el.message);
      return Response.json({ message: errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    console.log("Headers:", request.headers);

    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: User ID not provided" },
        { status: 401 }
      );
    }

    const { wishlistId } = await request.json();

    if (!wishlistId) {
      return NextResponse.json(
        { error: "Bad Request: Wishlist ID is required" },
        { status: 400 }
      );
    }

    const result = await Wishlist.deleteById(wishlistId);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: string[] = error.errors.map((el) => el.message);
      return Response.json({ message: errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
