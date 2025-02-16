import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";


const InstructorSubsection = ({ subSectionId, title, sectionId, token }) => {
  return (
    <div>
      <div className=" w-full h-[50px] flex items-center ml-10  justify-between ">
        <div className=" flex items-center ">
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p className="text-md ml-4 lg:hidden">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </p>

            <p className="text-md ml-4  hidden lg:block">
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </p>

        </div>

        <div className="text-sm font-medium text-richblack-100 mr-10">

          <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
            <FiEdit2 size={20} />
          </button>

          <button
            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
        
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default InstructorSubsection;
