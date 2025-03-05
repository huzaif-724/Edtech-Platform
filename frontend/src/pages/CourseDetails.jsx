import React from "react";
import img from "../assets/hero image.webp";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import Section from "../components/Section";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { endpoints } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAction } from "@reduxjs/toolkit";
import { formatDate } from "../utils/formateDate";
import CourseDetailsCard from "../components/CourseDetailsCard";
import { BuyCourse } from "../services/studentFeaturesAPI";

const { GET_COURSE_DETAILS } = endpoints;

const markdownContent = `

- Introduction to Python and Python 3
- Understand the basics: Data types, Loops, Conditional statements, Functions and Modules
- Learn object oriented programming in Python
- Learn how to make your own web-scraping tool using Python
- Know how to Read and Parse JSON and XML files

`;

const CourseDetails = () => {
  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state)=> state.auth.user);
  const [course, setCourse] = useState({});
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) {
      console.log("Error: courseId is undefined");
      return;
    }

    const fetchCourse = async () => {
      const toastId = toast.loading("Loading...");
      try {
        console.log("Sending request with token:", token);

        const response = await axios.post(
          GET_COURSE_DETAILS,
          { courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log("Response received:", response);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        if (!response.data.data || !response.data.data.courseDetails) {
          throw new Error("Course details not found");
        }

        console.log(response.data.data.courseDetails);
        setCourse(response.data.data.courseDetails);
        setDuration(response.data.data.totalDuration);
      } catch (error) {
        console.log("Fetching course error:", error.response || error);
        toast.error(error.response?.data?.message || "Could Not Fetch Course");
      }
      toast.dismiss(toastId);
    };

    fetchCourse();
  }, [courseId, token]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    course?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [course]);

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate)
      return
    }
  }

  return (
    <div className=" min-h-screen">
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[350px] max-w-maxContentTab justify-items-center py-8 my-10 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={course?.thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full mt-10"
              />
            </div>

            <div
              className={`z-20 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className=" leading-10 lg:pt-8 font-semibold text-richblack-5 text-[25px] lg:text-[35px]">
                  {course?.title}
                </p>
              </div>
              <p className={`text-richblack-200`}>{course?.description}</p>
              <div className="text-md text-[#DBDDEA] flex flex-wrap items-center gap-2">
                <span>{`2300 students enrolled`}</span>
              </div>
              <div>
                <p className="text-[#DBDDEA]">{`Created by ${
                  course?.instructor?.name || "Unknown Instructor"
                }`}</p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(course?.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {course?.price}
              </p>
              <button
                className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={course}
              // setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{course?.whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="max-w-[830px] ">
          <div className="flex flex-col gap-3">
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <span> {`${course?.courseContent?.length || 0} sections`}</span>
                <span> {`${totalNoOfLectures} lectures`}</span>
                <span>{`${duration} total length`}</span>
              </div>

              {/* Course Details Accordion */}
              <div className="py-4">
                {course.courseContent?.map((course, index) => (
                  <Section
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
