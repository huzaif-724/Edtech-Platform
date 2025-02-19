import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoints } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { VscAdd } from "react-icons/vsc";
import InstructorCourseCard from "../../components/Instructor/InstructorCourseCard";
import InstructorCourseCardSmall from "../../components/Instructor/InstructorCourseCardSmall";
import { fetchInstructorCourses } from "../../services/courseAPI";

const { GET_INSTRUCTOR_COURSES } = endpoints;

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);

      setCourses(result);
    };

    fetchCourses();
  }, [navigate]);

  const deleteHandler = (courseId) => {
    setCourses((prev) => prev.filter((course) => course._id !== courseId));
  };

  // console.log("courses :>> ", courses);

  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" text-white mt-16 min-h-screen h-auto w-full lg:w-[1200px] ">
        <div className=" flex justify-between px-5 pt-10">
          <h1 className=" text-[#F1F2FF] font-semibold text-[25px] lg:text-[30px] ">
            My Courses
          </h1>
          <button
            className="CTAbutton flex justify-center items-center gap-2 text-[15px]"
            onClick={() => {
              navigate("/dashboard/add-course");
            }}
          >
            <p>New</p> <VscAdd />{" "}
          </button>
        </div>

        <div className=" hidden lg:block">
          {courses.length > 0 ? (
            <div className="flex justify-center items-center flex-col mt-10">
              {courses.map((course) => (
                <InstructorCourseCard
                  key={course._id}
                  course={course}
                  token={token}
                  onDelete={deleteHandler}
                />
              ))}
            </div>
          ) : (
            <p className="text-richblack-200 text-2xl mt-48 text-center ">
              Looks like you haven’t created any courses yet. Get started today!
            </p>
          )}
        </div>

        <div className=" block lg:hidden">
          {courses.length > 0 ? (
            <div className="flex justify-center items-center flex-col mt-10 gap-10">
              {courses.map((course) => (
                <InstructorCourseCardSmall
                  key={course._id}
                  course={course}
                  token={token}
                  onDelete={deleteHandler}
                />
              ))}
            </div>
          ) : (
            <p className="text-richblack-200 text-2xl mt-48 text-center ">
              Looks like you haven't created any courses yet. Get started today!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
