import { hash } from "@/db/helpers/bycrpt";
import { db } from "../config";
import { ObjectId } from "mongodb";
import { z } from "zod";

const UserSchema = z.object({
  _id: z.optional(z.instanceof(ObjectId)),
  name: z.string(),
  username: z.string().min(1, {
    message: "Username can't be empty",
  }),
  email: z.string().email().min(1, {
    message: "Email can't be empty",
  }),
  password: z.string().min(5, {
    message: "Password can't be empty",
  }),
});

export type UserType = z.infer<typeof UserSchema>;

export default class User {
  static getCollection() {
    return db.collection<UserType>("Users");
  }

  static async find(): Promise<UserType[]> {
    const collection = this.getCollection();

    const users: UserType[] = await collection.find().toArray();

    return users;
  }

  static async findById(id: string): Promise<UserType> {
    const collection = this.getCollection();
    const objectId = new ObjectId(id);

    const user = (await collection.findOne(
      { _id: objectId },
      {
        projection: {
          password: 0,
        },
      }
    )) as UserType;

    return user;
  }

  static async create(body: UserType): Promise<{ message: string }> {
    const collection = this.getCollection();

    const findEmail = await collection.findOne({ email: body.email });
    if (findEmail) throw new Error("Email already exists");

    const findUsername = await collection.findOne({
      username: body.username,
    });

    if (findUsername) throw new Error("Username already exists");

    const modifiedUser = {
      ...body,
      password: hash(body.password),
    };

    UserSchema.parse(modifiedUser); //untuk validasi
    await collection.insertOne(modifiedUser);

    return { message: "Successfully added new user" };
  }

  static async getUserByEmail(email: string) {
    const collection = this.getCollection();
    const user = await collection.findOne({ email });
    return user;
  }
}
