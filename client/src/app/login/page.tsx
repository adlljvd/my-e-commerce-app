"use client";

import Image from "next/image";
import logo from "@/assets/1.svg";
import loginBackground from "@/assets/sale-backgrund.svg";
import Link from "next/link";
import { doLogin } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { Suspense } from "react";

const Login = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <div className="flex justify-center">
                  <Link href="/">
                    <Image alt="Dellybee" src={logo} className="h-16 w-auto" />
                  </Link>
                </div>
                <h2 className="mt-8 ml-16 text-2xl/9 font-sans font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <ClientFlashComponent />
              <div className="mt-10">
                <div>
                  <form action={doLogin} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-shopee-100 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-shopee-100 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-shopee px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-shopee-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>

                <p className="mt-5 text-center text-sm/6 text-gray-500">
                  Don&apos;t have any account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-shopee hover:text-shopee-100"
                  >
                    Register
                  </Link>
                </p>

                <div className="mt-5">
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm/6 font-medium">
                      <span className="bg-white px-6 text-gray-900">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                          fill="#34A853"
                        />
                      </svg>
                      <span className="text-sm/6 font-semibold">Google</span>
                    </a>

                    <a
                      href="#"
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-5 fill-[#1877F2]"
                      >
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.655-4.788 1.325 0 2.464.099 2.797.143v3.246h-1.918c-1.506 0-1.797.715-1.797 1.763v2.311h3.594l-.468 3.622h-3.126V24h6.127C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                      </svg>
                      <span className="text-sm/6 font-semibold">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <Image
              alt="Shopee"
              src={loginBackground}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Login;
