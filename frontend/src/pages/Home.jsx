import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero image.webp";
import { PiShareFatFill } from "react-icons/pi";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-richblack-900 w-full h-screen flex justify-center items-center mt-12">
      <div className="relative mx-auto flex flex-col md:flex-row w-11/12 max-w-screen-xl items-center justify-between gap-8 text-white">
        
        {/* Left Section - Text & Button */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
            Every Thought Matters <br /> Write, Share & Inspire.
          </h1>
          <p className="text-lg text-gray-400">
            Start exploring and sharing your ideas today!
          </p>

          {/* Share Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-3 w-[150px] px-4 py-2 rounded-lg border border-white bg-richblack-800 text-white text-xl hover:bg-richblack-700 transition duration-300 mx-auto md:mx-0"
          >
            <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
              Share
            </span>
            <PiShareFatFill className="text-white" />
          </button>
        </div>

        {/* Right Section - Image */}
        <img
          src={heroImg}
          alt="Hero"
          className="w-full md:w-[58%] h-auto max-h-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
