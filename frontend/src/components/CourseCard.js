import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const CourseCard = ({
  title,
  category,
  price,
  thumbnail,
  instructor,
  courseId,
  index,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
      <Link to={`/courses/${courseId}`}>
        <div className="bg-richblack-800 w-[300px] h-[370px]  text-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
          {/* Course Thumbnail */}
          <img
            src={thumbnail}
            alt="Course Thumbnail"
            className="h-[210px] w-full object-cover"
            loading="lazy"
          />

          {/* Course Details */}
          <div className="p-4">
            <h2 className="text-base font-semibold line-clamp-2">{title}</h2>
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
    </motion.div>
  );
};

export default CourseCard;
