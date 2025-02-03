import React from "react";
import img from "../assets/hero image.webp";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

const markdownContent = `

- Introduction to Python and Python 3
- Understand the basics: Data types, Loops, Conditional statements, Functions and Modules
- Learn object oriented programming in Python
- Learn how to make your own web-scraping tool using Python
- Know how to Read and Parse JSON and XML files

`;

const CourseDetails = () => {
  return (
    <div>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[350px] max-w-maxContentTab justify-items-center py-8 my-10 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={img}
                alt="course thumbnail"
                className="aspect-auto w-full mt-10"
              />
            </div>

            <div
              className={`z-20 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className=" leading-10 lg:pt-8 font-semibold text-richblack-5 text-[25px] lg:text-[35px]">
                  The Complete Python Bootcamp From Zero To Hero
                </p>
              </div>
              <p className={`text-richblack-200`}>
              This Python for beginners course will help you to become Zero to Hero. Learn Python Programming in Easy Way.
              </p>
              <div className="text-md text-[#DBDDEA] flex flex-wrap items-center gap-2">
                <span>{`2300 students enrolled`}</span>
              </div>
              <div>
                <p className="text-[#DBDDEA]">Created By Huzaif</p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at 02/2020
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
         <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
            <ReactMarkdown>{
                markdownContent}
            </ReactMarkdown>
            </div>
          </div>
         </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    12 {`section(s)`}
                  </span>
                  <span>
                    25 {`lecture(s)`}
                  </span>
                  <span> 7h 30 min total length</span>
                </div>
            
                
              </div>
            </div>

            
            
          </div>

         

      
      </div>


    </div>
  );
};

export default CourseDetails;
