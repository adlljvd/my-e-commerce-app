//server action
"use server";

import { compare } from "@/db/helpers/bycrpt";
import User from "@/db/models/User";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const doLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${errFinalMessage}`
    );
  }

  const user = await User.getUserByEmail(parsedData.data.email);

  if (!user || !compare(parsedData.data.password, user.password)) {
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=Invalid%20credentials`
    );
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = signToken(payload);

  cookies().set("access_token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict",
  });

  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
};

export default async function handleLogout() {
  const cookieStore = cookies();

  if (cookieStore.get("access_token")) {
    cookieStore.delete("access_token");
  }

  return redirect("/");
}
