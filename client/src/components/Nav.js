import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Loading from "./Loading";

function Nav() {
  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }

  const { loading, data } = useQuery(QUERY_ME);

  const [isOpen, setIsOpen] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <nav className="bg-pergamino">
          <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center max-w-6xl w-full h-16">
              <div className="hidden md:flex grow items-baseline space-x-4">
                <Link
                  to="/home"
                  className=" text-black hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>

                <Link
                  to={{ pathname: `/rsvp/user/${data.me._id}` }}
                  className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  R.S.V.P
                </Link>

                <Link
                  to="/comingsoon"
                  className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Messages
                </Link>
                {data.me.admin && (
                  <Link
                    to="/guests"
                    className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Guests-Dashboard
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-items-end  md:flex">
                <span className=" text-black px-2 py-2 text-lg font-medium lg:text-sm lg:px-5">
                  Hello {data.me.name}
                  {data.me.plusOne && <span> and {data.me.namePlusOne}</span>}!
                </span>
              </div>
              <div className="w-auto hidden md:flex">
                <button
                  className="bg-gray-700 text-white hover:bg-rose-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-4 my-2 mx-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className=" md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3  ">
                  <div className="divide-y-2 divide-dashed">
                    <Link
                      to="/home"
                      className="border-solid text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Home
                    </Link>

                    <Link
                      to={{ pathname: `/rsvp/user/${data.me._id}` }}
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      R.S.V.P
                    </Link>

                    <Link
                      to="/comingsoon"
                      className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Messages
                    </Link>
                    {data.me.admin && (
                      <Link
                        to="/guests"
                        className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Guests-Dashboard
                      </Link>
                    )}
                  </div>
                  <button
                    className="bg-gray-700 text-white hover:bg-rose-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium w-full"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      )}
    </>
  );
}

export default Nav;
