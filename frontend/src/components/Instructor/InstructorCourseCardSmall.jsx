import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const InstructorCourseCardSmall = ({ course }) => {
  const TRUNCATE_LENGTH = 10;
  return (
    <Link to={`/courses/${course._id}`}>
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

          <div className="flex items-center justify-between">
            {/* Price */}
            <p className="text-lg font-bold mt-3">Rs. {course.price}</p>

            <div className="text-sm font-medium text-richblack-100 pt-3">
              <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                <FiEdit2 size={20} />
              </button>

              <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InstructorCourseCardSmall;
