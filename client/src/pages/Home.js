import React from "react";
const Home = () => {
  return (
    <main className="bg-cover bg-home-bkg">
      <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg">
          <div className="flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="mb-5 underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
              Home Page
            </div>
            <div className="text-center text-gray-900">
              <p>
                For some it may be close, <br />
                but for others it may be the other side of the world. <br /> We
                hope to see you all there in Cartagena, Colombia. <br /> P.S. We
                will still love you even if you don't make it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
