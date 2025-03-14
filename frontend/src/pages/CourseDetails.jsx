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
import { useSelector, useDispatch } from "react-redux";
import { isAction } from "@reduxjs/toolkit";
import { formatDate } from "../utils/formateDate";
import CourseDetailsCard from "../components/CourseDetailsCard";
import { BuyCourse } from "../services/studentFeaturesAPI";
import { setLoading } from "../slices/authSlice";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";

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
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [course, setCourse] = useState({});
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courseId) {
      //console.log("Error: courseId is undefined");
      return;
    }

    const fetchCourse = async () => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        //console.log("Sending request with token:", token);

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

        //console.log("Response received:", response);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        if (!response.data.data || !response.data.data.courseDetails) {
          throw new Error("Course details not found");
        }

        //console.log(response.data.data.courseDetails);
        setCourse(response.data.data.courseDetails);
        setDuration(response.data.data.totalDuration);
      } catch (error) {
        //console.log("Fetching course error:", error.response || error);
        toast.error(error.response?.data?.message || "Could Not Fetch Course");
      }
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    };

    fetchCourse();
  }, [courseId]);

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
      BuyCourse(token, [courseId], user, navigate);
      return;
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen mb-12">
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
                  <motion.div
                    variants={textVariant()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <p className=" leading-10 lg:pt-8 font-semibold text-richblack-5 text-[25px] lg:text-[35px]">
                      {course?.title}
                    </p>
                  </motion.div>
                </div>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-secondary mt-4 max-w-3xl  text-[17px] leading-[30px]"
                >
                  <p className={`text-richblack-200`}>{course?.description}</p>
                </motion.p>
                <div className="text-md text-[#DBDDEA] flex flex-wrap items-center gap-2">
                  <span>{`${course.studentsEnroled?.length} Students Enrolled`}</span>
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
                  onClick={
                    user && course?.studentsEnroled?.includes(user?._id)
                      ? () => navigate("/dashboard/enrolled-courses")
                      : handleBuyCourse
                  }
                >
                  {user && course?.studentsEnroled?.includes(user?._id)
                    ? "Go To Course"
                    : "Buy Now"}
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
              <motion.div
                variants={textVariant()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-3xl font-semibold">What you'll learn</p>
              </motion.div>
              <div className="mt-5">
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-secondary mt-4 max-w-3xl  text-[17px] leading-[30px]"
                >
                  <ReactMarkdown>{course?.whatYouWillLearn}</ReactMarkdown>
                </motion.p>
              </div>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <motion.div
                variants={textVariant()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-[28px] font-semibold">Course Content</p>
              </motion.div>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {" "}
                    {`${course?.courseContent?.length || 0} sections`}
                  </span>
                  <span> {`${totalNoOfLectures} lectures`}</span>
                  <span>{`${duration} total length`}</span>
                </div>

                {/* Course Details Accordion */}
                <div className="py-4">
                  {course.courseContent?.map((course, index) => (
                    <Section
                      course={course}
                      key={index}
                      index={index}
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

      <Footer />
    </>
  );
};

export default CourseDetails;
