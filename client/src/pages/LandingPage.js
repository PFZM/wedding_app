import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

function LandingPage() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data;
  console.log(user);

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-cover bg-landing-bkg max-w-none mx-auto  flex h-screen justify-center items-center">
          <div className="bg-pearl-white shadow border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pt-6 pb-4 px-4 sm:px-6 lg:px-8">
              <h1 className="underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
                Lana & Pablo
              </h1>
              <h2 className="text-3xl text-center font-header-font text-gray-900 pt-2">
                25/02/2023
              </h2>
            </div>
            <Link to="/login">
              <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login to your account
              </button>
            </Link>
            <div className="text-sm font-medium pt-5 text-gray-500">
              Not registered?{" "}
              <Link
                to="/signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
