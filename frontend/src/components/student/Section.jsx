import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import StudentSubSection from "./StudentSubSection";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Section = ({
  section,
  isActive,
  handleActive,
  handleVideoClick,
  selectedSubSec,
  index,
}) => {
  const contentEl = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(section._id));
  }, [isActive]);

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }} // Ensures animation happens only once
    >
      <div className="overflow-hidden rounded-lg mt-3 lg:w-[90%] min-h-[50px] h-auto mx-auto border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
        <div>
          <div
            className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
            onClick={() => {
              handleActive(section._id);
            }}
          >
            <div className="flex items-center gap-2">
              <i
                className={
                  isActive.includes(section._id) ? "rotate-180" : "rotate-0"
                }
              >
                <AiOutlineDown />
              </i>
              <p className=" text-sm">{section?.sectionName}</p>
            </div>
          </div>
        </div>
        <div
          ref={contentEl}
          className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
          style={{
            height: sectionHeight,
          }}
        >
          <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
            {section?.subSection?.map((subSec, i) => {
              return (
                <StudentSubSection
                  subSec={subSec}
                  key={i}
                  handleVideoClick={handleVideoClick}
                  isSelected={selectedSubSec._id === subSec._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
