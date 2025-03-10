import React from "react";
import Know_your_progress from "../../assets/Know_your_progress.svg";
import Compare_with_others from "../../assets/Compare_with_others.svg";
import Plan_your_lessons from "../../assets/Plan_your_lessons.svg";
import { useNavigate } from "react-router-dom";

const LearningLanguageSection = () => {

  const navigate = useNavigate()
  return (
    <div>
      <div className="text-4xl font-semibold text-center my-10">
        Your swiss knife for
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
          {" "}
          learning any language
        </span>
        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img
            src={Know_your_progress}
            alt=""
            className="object-contain  lg:-mr-32 "
          />
          <img
            src={Compare_with_others}
            alt=""
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={Plan_your_lessons}
            alt=""
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>
      </div>

      <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
        <div
                        onClick={() => navigate("/signup")}
                        className={`bg-yellow-50 flex items-center gap-2 text-black text-center text-[13px] sm:text-[16px] px-4 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 hover:bg-richblack-800 hover:text-yellow-50 transition-all duration-200 `}
                      >
                       Learn More
                      </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
