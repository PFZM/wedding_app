import React from "react";
import { useMutation } from "@apollo/client";
import { ATTEND_WEDDING } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Loading from "../components/Loading";
import YesAttending from "../components/YesAttending";
import NoAttending from "../components/NoAttending";

const Rsvp = () => {
  const [attendingWedding, { error }] = useMutation(ATTEND_WEDDING);

  const { loading, data } = useQuery(QUERY_ME);

  const attendingYes = async (event) => {
    event.preventDefault();

    try {
      const { data } = await attendingWedding({
        variables: { attending: true },
      });
      window.location.reload();
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
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className="bg-cover bg-home-bkg h-full">
          <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0 bg-slate-300  bg-opacity-90 border-4  border-gray-200 rounded-lg">
              {data.me.attending === null ? (
                <div className="flex flex-col px-4 sm:px-6 lg:px-8">
                  <div className="mb-5 underline underline-offset-8 decoration-2  text-5xl text-center font-header-font text-gray-900">
                    Let us know if you can make it
                  </div>
                  <div className="text-center text-gray-900">
                    <p>
                      For some it may be close, <br />
                      but for others it may be the other side of the world.{" "}
                      <br /> We hope to see you all there in Cartagena,
                      Colombia. <br /> P.S. We will still love you even if you
                      don't make it.
                    </p>
                  </div>
                  <div className="p-5 text-center text-gray-900">
                    Please RSVP by: 30 May 2022
                  </div>
                  <div className="flex flex-col items-center justify-evenly mx-auto px-4 sm:px-6 md:flex-row md:mx-5 md:justify-around lg:px-8  h-16">
                    <button
                      className="bg-gray-700 text-white hover:bg-emerald-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={attendingYes}
                    >
                      Yes, see you there!
                    </button>
                    <button
                      className="bg-gray-700 text-white hover:bg-emerald-800 hover:text-white px-3 py-2 mt-2 rounded-md text-sm font-medium"
                      onClick={attendingNo}
                    >
                      No, wish you lots of love!
                    </button>
                  </div>
                </div>
              ) : data.me.attending === true ? (
                <YesAttending />
              ) : (
                <NoAttending />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Rsvp;
