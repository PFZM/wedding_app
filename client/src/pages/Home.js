import React from "react";
import pabloLanaPic from "../assets/images/pablo_lana.jpg";

const Home = () => {
  return (
    <main className="bg-cover bg-home-bkg h-59v md:h-63v">
      <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg">
          <div className="flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-5xl text-center decoration-2 font-header-font text-gray-900">
              Save the date!
            </div>
            <div className="text-center text-gray-900">
              <p>25th February 2023</p>
              <p className="pb-3 pt-1">Cartagena, Colombia</p>
            </div>
            <img
              className="object-scale-down self-center h-48 w-96"
              src={pabloLanaPic}
              alt="Pablo & Lana"
            />
            <div className="text-center pt-3 text-gray-900">
              <p>Formal invitation to follow</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
