import React from "react";
import { formatDate } from "../../utils/formateDate";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { deleteCourse } from "../../services/courseAPI";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const InstructorCourseCardSmall = ({ course, token, onDelete, index }) => {
  const TRUNCATE_LENGTH = 10;
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const deleteHandler = async () => {
    const response = await deleteCourse(course._id, token);

    if (response.status === 200) {
      onDelete(course._id);
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
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

              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={openModal}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-[0_5px_15px_rgba(255,_255,_255,_0.5)] text-white bg-richblack-800 w-[80%] max-w-lg h-[35vh] relative overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800">
              Confirm Deletion{" "}
            </h1>
            <p className=" text-richblack-100 mt-5">
              Once deleted, this course and all its content will be permanently
              removed. This action is irreversible.
            </p>

            <div className=" flex justify-evenly mt-11 ">
              <button
                className="CTAbuttonModal flex justify-center items-center gap-2 text-[15px]"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <button
                className=" bg-white CTAbuttonModal flex justify-center items-center gap-2 text-[15px]"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InstructorCourseCardSmall;
