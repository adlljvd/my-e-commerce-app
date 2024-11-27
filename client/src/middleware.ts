import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTokenJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api/register") &&
    !request.url.includes("/api/login") &&
    !request.url.includes("/api/products") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/wishlists")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token");
    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    console.log(tokenData, "<<<token data");
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  if (request.url.includes("/wishlists")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token");
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?message=Unauthorized`, request.url)
      );
    }
    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    console.log(tokenData, "<<<token data");
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
