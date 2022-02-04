import React from "react";
import { useMutation } from "@apollo/client";
import { ATTEND_WEDDING } from "../utils/mutations";
import Auth from "../utils/auth";

const Rsvp = () => {
  const [attendingWedding, { error }] = useMutation(ATTEND_WEDDING);

  const attendingYes = async (event) => {
    event.preventDefault();

    try {
      const { data } = await attendingWedding({
        variables: { attending: true },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const attendingNo = async (event) => {
    event.preventDefault();

    try {
      const { data } = await attendingWedding({
        variables: { attending: false },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="bg-cover bg-home-bkg">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg h-96">
            <div className="m-5 px-4 sm:px-6 lg:px-8">
              <div className="my-5 underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
                Let us know if you can make it
              </div>
              <div>
                orem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
              <div>Please reserve by: 30 May 2022</div>
              <div className="flex items-center justify-evenly mx-auto px-4 sm:px-6 lg:px-8  h-16">
                <button
                  className="bg-gray-700 text-white hover:bg-rose-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={attendingYes}
                >
                  Yes, see you there!
                </button>
                <button
                  className="bg-gray-700 text-white hover:bg-rose-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={attendingNo}
                >
                  No, wish you lots of love!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rsvp;
