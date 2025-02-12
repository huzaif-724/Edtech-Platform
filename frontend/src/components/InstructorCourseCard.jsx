import React, { useEffect } from "react";
import courseImg from "../assets/course.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../utils/formateDate";

const InstructorCourseCard = ({course,}) => {
  const TRUNCATE_LENGTH = 30;

  return (
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
          <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}</p>
        </div>
      </div>

      <div className="w-[333px] h-[148px] flex items-center justify-between pl-10">
        <p className="text-sm font-medium text-richblack-100"> 2hr 30min</p>
        <p className="text-sm font-medium text-richblack-100">{course.price}</p>
        <div className="text-sm font-medium text-richblack-100">
          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
            <FiEdit2 size={20} />
          </button>

          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;
