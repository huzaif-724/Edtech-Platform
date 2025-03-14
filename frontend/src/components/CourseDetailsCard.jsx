import React from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const CourseDetailsCard = ({ course, handleBuyCourse }) => {
  const navigate = useNavigate();
  const user = useSelector((value) => value.auth.user);
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 1 * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 w-[320px] ml-20`}
      >
        {/* Course Image */}
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {course.price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
              onClick={
                user && course?.studentsEnroled?.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnroled?.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>
          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              <p className={`flex gap-2 flex-col`}>
                {/* <BsFillCaretRightFill /> */}
                <p>8 hours on-demand video</p>
                <p>Full Lifetime access</p>
                <p>Access on Mobile and TV</p>
                <p>Certificate of completion</p>
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetailsCard;
