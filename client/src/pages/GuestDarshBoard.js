import React from "react";
const GuestDashBoard = () => {
  return (
    <main className="min-h- bg-cover bg-home-bkg h-59v md:h-63v">
      <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg">
          <div className="flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="mb-5 underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
              GuestDashBoard Page
            </div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Attending</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuestDashBoard;
