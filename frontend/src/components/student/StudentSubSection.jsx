import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

const StudentSubSection = ({ subSec, handleVideoClick }) => {
  return (
    <div onClick={() => handleVideoClick(subSec)} className=" cursor-pointer">
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p className=" text-[12px]">{subSec?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSubSection;
