import { db } from "../config";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const ProductSchema = z.object({
  // _id: z.optional(z.instanceof(ObjectId)),
  _id: z.optional(z.string()),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  price: z.number(),
  tags: z.string().array(),
  thumbnail: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export default class Product {
  static getCollection() {
    return db.collection<ProductType[]>("Products");
  }

  static async findAll() {
    const collection = this.getCollection();
    const products = await collection.find().toArray(); // Returns all products
    return products;
  }

  static async findById(id: string) {
    const collection = this.getCollection();
    const product = await collection.findOne({ _id: new ObjectId(id) }); // Find a product by ID
    return product;
  }

  static async findBySlug(slug: string) {
    const collection = this.getCollection();
    const product = await collection.findOne({ slug });

    return product;
  }

  static async search(query: string) {
    const collection = this.getCollection();

    const products = await collection
      .find({
        name: { $regex: query, $options: "i" },
      })
      .toArray();

    return products;
  }
}
