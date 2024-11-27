import { ObjectId } from "mongodb";
import { db } from "../config";
import { z } from "zod";
import Product from "./Product";

export const WishlistSchema = z.object({
  _id: z.optional(z.instanceof(ObjectId)),
  userId: z.instanceof(ObjectId),
  productId: z.instanceof(ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
  Product: z.object({
    _id: z.optional(z.instanceof(ObjectId)),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type WishlistType = z.infer<typeof WishlistSchema>;

type WishlistBaseType = Omit<WishlistType, "Product">; // Hapus properti Product pake omit

export default class Wishlist {
  static getCollection() {
    return db.collection<WishlistBaseType>("Wishlists");
  }

  // cari wishlist berdasarkan userId
  static async findByUserId(userId: string): Promise<WishlistType[]> {
    const collection = this.getCollection();

    const wishlists = await collection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Products",
            localField: "productId",
            foreignField: "_id",
            as: "Product",
          },
        },
        {
          $unwind: {
            path: "$Product",
            preserveNullAndEmptyArrays: false,
          },
        },
      ])
      .toArray();

    if (!wishlists || wishlists.length === 0) {
      throw new Error("Wishlist is empty");
    }

    return wishlists as WishlistType[];
  }

  static async addWishlist(userId: string, productId: string) {
    const collection = this.getCollection();

    // Cek apakah produk ada
    const findProduct = await Product.findById(productId);
    if (!findProduct) throw new Error("Product not found");

    // Cek apakah wishlist dh ada untuk user dan produk ini
    const existingWishlist = await collection.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (existingWishlist) {
      throw new Error("Wishlist already exists for this product");
    }

    await collection.insertOne({
      userId: new ObjectId(userId),
      productId: findProduct._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { message: "Wishlist added successfully" };
  }

  static async deleteById(id: string) {
    const collection = this.getCollection();

    const findWishlist = await collection.findOne({ _id: new ObjectId(id) });
    if (!findWishlist) throw new Error("Wishlist not found");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return { message: "Wishlist deleted successfully" };
  }
}
