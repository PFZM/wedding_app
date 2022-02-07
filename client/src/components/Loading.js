import React from "react";

export default function Loading() {
  return (
    <main className="bg-cover bg-pearl-white shadow max-w-none flex h-screen justify-center items-center">
      <div
        className=" flex spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      ></div>
    </main>
  );
}
