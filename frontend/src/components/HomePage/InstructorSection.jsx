import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../assets/Instructor.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

const InstructorSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="lg:w-[50%] flex gap-8 flex-col">
          <motion.div
            variants={textVariant()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                {" "}
                instructor
              </span>
            </h1>
          </motion.div>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-medium text-[16px] text-justify lg:w-[80%] text-richblack-300">
              Instructors from around the world teach millions of students on
              SmartLearn. We provide the tools and skills to teach what you
              love.
            </p>
          </motion.p>

          <div className="w-fit">
            <div
              onClick={() => navigate("/signup")}
              className={`bg-yellow-50 flex items-center gap-2 text-black text-center text-[13px] sm:text-[16px] px-4 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 hover:bg-richblack-800 hover:text-yellow-50 transition-all duration-200 `}
            >
              Start Teaching Today
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
