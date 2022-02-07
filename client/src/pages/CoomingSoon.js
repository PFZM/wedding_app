import React from "react";
import { useHistory } from "react-router-dom";

function CoomingSoon() {
  let history = useHistory();

  return (
    <main className="bg-cover bg-pearl-white shadow max-w-none flex flex-col h-screen justify-center items-center">
      <div>
        <h1 className=" text-5xl text-center font-header-font text-gray-900">
          Coming soon...
        </h1>
      </div>
      <button
        className="text-white bg-blue-600 hover:bg-rose-900 focus:ring-4 focus:ring-red-800 mt-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => history.goBack()}
      >
        Go back!
      </button>
    </main>
  );
}

export default CoomingSoon;
