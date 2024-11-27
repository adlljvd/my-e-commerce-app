import User, { UserType } from "@/db/models/User";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload: UserType = {
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const user = await User.create(payload);

    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error, "<<< error");
      const errors: string[] = error.errors.map((el) => el.message);
      return Response.json({ message: errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
