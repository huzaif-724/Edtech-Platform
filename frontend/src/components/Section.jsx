import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import SubSection from "../components/SubSection";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Section = ({ course, isActive, handleActive, index }) => {
  const contentEl = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(course._id));
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
      <div className="overflow-hidden w-[98%] lg:w-[800px] border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
        <div>
          <div
            className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
            onClick={() => {
              handleActive(course._id);
            }}
          >
            <div className="flex items-center gap-2">
              <i
                className={
                  isActive.includes(course._id) ? "rotate-180" : "rotate-0"
                }
              >
                <AiOutlineDown />
              </i>
              <p>{course?.sectionName}</p>
            </div>
            <div className="space-x-4">
              <span className="text-yellow-25">
                {`${course.subSection.length || 0} lecture(s)`}
              </span>
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
          <div className="text-textHead flex flex-col gap-2 px-7 py-6 ">
            {course?.subSection?.map((subSec, i) => {
              return <SubSection subSec={subSec} key={i} />;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
