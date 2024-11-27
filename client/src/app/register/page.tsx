"use client";

import logo from "@/assets/2.svg";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import Image from "next/image";
import Link from "next/link";
import bgImg from "@/assets/background-gradient.png";
import { Suspense } from "react";
import handleCreateUser from "./action";

const Register = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FF5F1F] to-[#FF8A33]"
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="Shopee"
              width={250}
              height={112}
              className="mb-1"
            />
          </div>
          <ClientFlashComponent />
          {/* Form */}
          <div className="mt-8 w-full max-w-md bg-white px-6 py-8 shadow-md rounded-lg">
            <form className="space-y-4" action={handleCreateUser}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-shopee-100 focus:border-shopee sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-shopee-100 focus:border-shopee sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-shopee-100 focus:border-shopee sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-shopee-100 focus:border-shopee sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-shopee hover:bg-shopee-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-shopee hover:text-shopee-100"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Register;
