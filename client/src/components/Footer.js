import React from "react";
import Countdown from "react-countdown";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  const Completionist = () => <span>Wedding time!</span>;
  const rendered = ({ days, hours, minutes, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span className=" text-2xl font-header-font text-gray-900">
          Time left: {days} days, {hours} hours and {minutes} minutes
        </span>
      );
    }
  };

  return (
    <footer className="bg-pergamino">
      <div className="max-w-7xl mx-auto px-4 pt-2 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center lg:justify-between md:flex-row items-center h-auto md:h-16 md:justify-between">
          <div className=" text-2xl font-header-font text-gray-900">
            Made with ❤️
          </div>
          <div>
            <Countdown date="2023-02-25T16:00:00" renderer={rendered} />
          </div>
          <div className="flex">
            <a
              href="mailto:lana@pablozambrano@gmail.com"
              target="_blank"
              className="px-3"
            >
              <HiOutlineMail size={40} color={"rgb(17 24 39)"} />
            </a>
            <a href="http://wa.me/610450726664" target="_blank">
              <IoLogoWhatsapp size={40} color={"rgb(17 24 39)"} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
