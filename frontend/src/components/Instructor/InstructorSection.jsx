import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { deleteSection } from "../../services/courseAPI";


const InstructorSection = ({ name, sectionId, subsections, onDelete, courseId, token }) => {

    const deleteHandler = async ()=>{

        const response = await deleteSection(sectionId, courseId, token);
        onDelete(sectionId);
    }

  return (
    <div className=" overflow-hidden h-[50px] flex text-center w-[100%] lg:w-[100%] border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 mt-3">
      <div className=" flex items-center justify-between w-full  ">
        <p className="text-md ml-4 lg:hidden">
          {name.length > 20 ? name.slice(0, 20) + "..." : name}
        </p>

        <p className="text-md ml-4  hidden lg:block">
          {name.length > 40 ? name.slice(0, 40) + "..." : name}
        </p>

        <div className="text-sm font-medium text-richblack-100">
          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
            <CiCirclePlus size={22} />
          </button>

          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
            <FiEdit2 size={20} />
          </button>

          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
            onClick={deleteHandler}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
