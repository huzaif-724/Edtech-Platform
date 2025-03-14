import React from "react";
import { formatDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const EnrolledCourseCard = ({ course, token, index }) => {
  const TRUNCATE_LENGTH = 30;
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
      <Link to={`/dashboard/course-content/${course._id}`}>
        <div className=" w-[1100px]  h-[180px] flex items-center border-b-2 border-richblack-700">
          <div className=" w-[767px]  flex  h-[148px]">
            <img
              src={course.thumbnail}
              className="h-[148px] w-[220px] rounded-lg object-cover "
            />
            <div className="flex flex-col justify-between pl-5">
              <h1 className="text-lg font-semibold text-richblack-5">
                {course.title}
              </h1>
              <p className="text-xs text-richblack-300">
                {course?.description.split(" ").length > TRUNCATE_LENGTH
                  ? course?.description
                      .split(" ")
                      .slice(0, TRUNCATE_LENGTH)
                      .join(" ") + "..."
                  : course?.description}
              </p>
              <div>
                <p className="text-[12px] text-white">
                  Created: {formatDate(course.createdAt)}
                </p>
                <p className="mt-2 text-[12px] text-[#c8cbd3]">
                  Instructor: {course.instructor.name}
                </p>
              </div>
            </div>
          </div>

          <div className="w-[333px] h-[148px] flex items-center justify-between pl-10">
            <p className="text-sm font-medium text-richblack-100"> 2hr 30min</p>
            <p className="text-sm font-medium text-richblack-100">
              Validity : Lifetime
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EnrolledCourseCard;
