'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black">
      <h1 className="text-2xl font-light text-white mb-4">
        500 <span className="mx-3 text-4xl">|</span> Internal Server Error Occurred
      </h1>
      <button
        className="px-4 py-2 bg-white text-black rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}