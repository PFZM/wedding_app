import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="bg-pearl-white shadow">
      <Nav />
      <div className="max-w-7xl mx-auto pt-8 pb-2 px-4 sm:px-6 lg:px-8">
        <h1 className="underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
          Lana & Pablo
        </h1>
        <h2 className="text-3xl text-center font-header-font text-gray-900 pt-2">
          25/02/2023
        </h2>
      </div>
    </header>
  );
}

export default Header;
