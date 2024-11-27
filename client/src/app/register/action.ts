"use server";

import { redirect } from "next/navigation";

export default async function handleCreateUser(formData: FormData) {
  "use server";
  const payload = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(payload, "<<<payload");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register?error=${data.message}`
    );
  }

  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}
