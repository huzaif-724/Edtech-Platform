import React from "react";
import { Link } from "react-router-dom";


const CourseCard = ({ title, category, price, thumbnail, instructor, courseId}) => {
  return (
    <Link to={`/courses/${courseId}`} className="block w-full">
      <div className="bg-richblack-800 w-[290px] h-[370px] lg:w-[300px]  text-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
        {/* Course Thumbnail */}
        <img
          src={thumbnail}
          alt="Course Thumbnail"
          className="h-[210px] w-full object-cover"
          loading="lazy"
        />

        {/* Course Details */}
        <div className="p-4">
          <h2 className="text-base font-semibold line-clamp-2">The Complete Python Bootcamp From Zero To Hero</h2>
          <p className="text-sm text-[#838894] line-clamp-2 mt-1">
            Category : {category}
          </p>

          {/* Instructor Name */}
          <p className="mt-2 text-sm text-[#c8cbd3]">By {instructor}</p>

          {/* Price */}
          <p className="text-lg font-bold mt-3">Rs. {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
