import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Loading from "../components/Loading";

const GuestDashBoard = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  console.log(data);

  const addGuest = (event) => {
    event.preventDefault();
    window.location.assign("/guests/admin/addguest");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className="min-h- bg-cover bg-home-bkg h-59v md:h-63v">
          <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0 bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg">
              <div className="flex flex-col px-4 sm:px-6 lg:px-8">
                <div className="mb-5 underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
                  GuestDashBoard
                </div>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Admin?</th>
                      <th>Attending?</th>
                      <th>View/Edit</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {data &&
                      data.users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>
                            {user.admin ? (
                              <span>&#10004;</span>
                            ) : (
                              <span>&#10006;</span>
                            )}
                          </td>
                          <td>
                            {user.attending === null ? (
                              <span>&#10067;</span>
                            ) : user.attending === true ? (
                              <span>&#9989;</span>
                            ) : (
                              <span>&#10062;</span>
                            )}
                          </td>
                          <td>
                            <button
                              className="bg-gray-700 text-white hover:bg-emerald-800 hover:text-white px-3 py-2 mt-2 rounded-md text-sm font-medium"
                              // onClick={attendingNo}
                            >
                              Click!
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  className="bg-gray-700 text-white hover:bg-emerald-800 hover:text-white px-3 py-2 mt-2 rounded-md text-sm font-medium"
                  onClick={addGuest}
                >
                  ADD GUEST
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default GuestDashBoard;
