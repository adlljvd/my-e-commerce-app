"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <p className="animate-pulse rounded bg-red-500 px-4 py-2 text-center text-white mt-5">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ClientFlashComponent;
