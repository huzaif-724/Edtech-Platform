import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero image.webp";
import { PiShareFatFill } from "react-icons/pi";
import TimelineSection from "../components/HomePage/TimeLine";
import InstructorSection from "../components/HomePage/InstructorSection";
import LearningLanguageSection from "../components/HomePage/LearningLanguagesSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen h-auto flex w-full  flex-col justify-center items-center">
      <div className="  bg-richblack-900 lg:pt-24 lg:min-h-screen relative mx-auto flex flex-col md:flex-row  w-full max-w-screen-xl items-center justify-between gap-9 lg:gap-5 text-white">
        {/* Left Section - Text & Button */}

        <div className="text-center md:text-left space-y-6 pt-28  lg:pt-0 w-[90%] ">
          <motion.div
            variants={textVariant()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl pb-1 font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
              Empower Your Future with Coding Skills
            </h1>
          </motion.div>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-secondary mt-4 max-w-3xl  text-[17px] leading-[30px]"
          >
            <p className="text-lg text-richblack-200">
              With our coding courses, you can learn at your own pace, from
              anywhere in the world, and get access to a wealth of resources,
              including hands-on projects, quizzes, and personalized feedback
              from instructors.
            </p>
          </motion.p>

          {/* Share Button */}
          <button
            onClick={() => navigate("/login")}
            className={`bg-yellow-50 mx-auto lg:mx-0  text-black text-center text-[13px] sm:text-[16px] px-4 flex gap-2 items-center py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 hover:bg-richblack-800 hover:text-yellow-50 transition-all duration-200 `}
          >
            <span className="bg-gradient-to-b from-[#1FA2FF] text-[16px] via-[#12D8FA] to-[#A6FFCB] bg-clip-text">
              Learn More
            </span>
            <PiShareFatFill className="text-black" />
          </button>
        </div>

        {/* Right Section - Image */}

        <img
          src={heroImg}
          alt="Hero"
          className="w-full md:w-[58%] h-auto max-h-full rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full bg-[#F9F9F9] px-4 sm:px-6">
        <div className="mx-auto mt-36 lg:mt-0 flex max-w-maxContent flex-col items-center justify-evenly gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10  mt-[-100px]  flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                job that is in demand.
              </span>
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[15px] text-[#2C333F] font-semibold">
                The modern SmartLearn is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>

              <div
                onClick={() => navigate("/login")}
                className={`bg-yellow-50 text-black text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 hover:bg-richblack-800 hover:text-yellow-50 transition-all duration-200 `}
              >
                Learn More
              </div>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />
      </div>

      <div className=" w-full">
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
