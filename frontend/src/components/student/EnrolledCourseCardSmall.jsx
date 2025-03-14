import React from "react";
import { formatDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const InstructorCourseCardSmall = ({ course, index }) => {
  const TRUNCATE_LENGTH = 10;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
      <Link to={`/dashboard/course-content/${course._id}`}>
        <div className="bg-richblack-800 w-[300px] h-[390px]  text-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
          {/* Course Thumbnail */}
          <img
            src={course.thumbnail}
            alt="Course Thumbnail"
            className="h-[210px] w-full object-cover"
            loading="lazy"
          />

          {/* Course Details */}
          <div className="p-4">
            <h2 className="text-base font-semibold line-clamp-2">
              {course.title}
            </h2>
            <p className="text-sm text-[#838894] line-clamp-2 mt-1">
              {course?.description.split(" ").length > TRUNCATE_LENGTH
                ? course?.description
                    .split(" ")
                    .slice(0, TRUNCATE_LENGTH)
                    .join(" ") + "..."
                : course?.description}
            </p>

            {/* Instructor Name */}
            <p className="mt-2 text-sm text-[#c8cbd3]">
              Created: {formatDate(course.createdAt)}
            </p>
            <p className="mt-2 text-sm text-[#c8cbd3]">
              Instructor: {course.instructor.name}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default InstructorCourseCardSmall;
