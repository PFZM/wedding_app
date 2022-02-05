import React from "react";

export default function NoAttending() {
  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="mb-5 decoration-2  text-5xl text-center font-header-font text-gray-900">
        So sad you can't join us!
      </div>
      <div className="text-center text-gray-900">
        <p>RSVP: No, I am not attending</p>
      </div>
      <div className="p-5 text-center text-gray-900">
        We hope to celebrate with you on another occasion.
      </div>
    </div>
  );
}
