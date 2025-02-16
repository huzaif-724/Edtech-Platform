import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { deleteSection } from "../../services/courseAPI";
import InstructorSubsection from "./InstructorSubsection";
import { useState } from "react";
import CreateSubsectionModel from "./CreateSubsectionModal";

const InstructorSection = ({
  name,
  sectionId,
  subsections,
  onDelete,
  courseId,
  token,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const deleteHandler = async () => {
    const response = await deleteSection(sectionId, courseId, token);
    onDelete(sectionId);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className=" flex flex-col ">
        <div className=" overflow-hidden h-auto flex flex-col text-center w-[100%] lg:w-[100%] border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 mt-3">
          <div className=" flex items-center h-[50px] justify-between w-full  ">
            <p className="text-md ml-4 lg:hidden">
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </p>

            <p className="text-md ml-4  hidden lg:block">
              {name.length > 40 ? name.slice(0, 40) + "..." : name}
            </p>

            <div className="text-sm font-medium text-richblack-100">
              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                <CiCirclePlus size={22} />
              </button>

              <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                <FiEdit2 size={20} />
              </button>

              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={deleteHandler}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
          <div className=" w-full h-[1px] bg-richblack-400"></div>
          {subsections.map((subSection) => (
            <InstructorSubsection
              key={subSection._id}
              subSectionId={subSection._id}
              title={subSection.title}
              sectionId={sectionId}
              token={token}
            />
          ))}
        </div>
      </div>

    {/* Modal Component */}
    <CreateSubsectionModel 
        isModalOpen={isModalOpen} 
        closeModal={closeModal}
        sectionId={sectionId}
    />
    
    </>
  );
};

export default InstructorSection;
