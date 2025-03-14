import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../utils/formateDate";
import { deleteCourse } from "../../services/courseAPI";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const InstructorCourseCard = ({ course, token, onDelete, index }) => {
  const TRUNCATE_LENGTH = 30;

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const deleteHandler = async () => {
    const response = await deleteCourse(course._id, token);

    onDelete(course._id);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      animate="show"
    >
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
            <p className="text-[12px] text-white">
              Created: {formatDate(course.createdAt)}
            </p>
          </div>
        </div>

        <div className="w-[333px] h-[148px] flex items-center justify-between pl-10">
          <p className="text-sm font-medium text-richblack-100"> 2hr 30min</p>
          <p className="text-sm font-medium text-richblack-100">
            {course.price}
          </p>
          <div className="text-sm font-medium text-richblack-100">
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 border rounded-xl text-white bg-richblack-800 w-[80%] max-w-lg h-[35vh] relative overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800">
              Confirm Deletion{" "}
            </h1>
            <p className=" text-richblack-100 mt-5">
              Once deleted, this course and all its content will be permanently
              removed. This action is irreversible.
            </p>

            <div className=" flex justify-evenly mt-12">
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

export default InstructorCourseCard;
