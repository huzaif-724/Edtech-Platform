import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoints } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import InstructorCourseCard from "../../components/Instructor/InstructorCourseCard";
import InstructorCourseCardSmall from "../../components/Instructor/InstructorCourseCardSmall";
import { fetchInstructorCourses } from "../../services/courseAPI";
import Footer from "../../components/Footer";

const { GET_INSTRUCTOR_COURSES } = endpoints;

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token, dispatch);

      setCourses(result);
    };

    fetchCourses();
  }, [navigate]);

  const deleteHandler = (courseId) => {
    setCourses((prev) => prev.filter((course) => course._id !== courseId));
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
      <div className=" w-full flex justify-center items-center h-auto ">
        <div className=" text-white mt-16 min-h-screen h-auto w-full  mb-10 lg:w-[1200px] ">
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
            {courses?.length > 0 ? (
              <div className="flex justify-center items-center flex-col mt-10">
                {courses.map((course, index) => (
                  <InstructorCourseCard
                    key={course._id}
                    course={course}
                    token={token}
                    onDelete={deleteHandler}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-richblack-200 text-2xl mt-48 text-center ">
                Looks like you haven’t created any courses yet. Get started
                today!
              </p>
            )}
          </div>

          <div className=" block lg:hidden">
            {courses?.length > 0 ? (
              <div className="flex justify-center items-center flex-col mt-10 gap-10 mb-10">
                {courses.map((course, index) => (
                  <InstructorCourseCardSmall
                    key={course._id}
                    course={course}
                    token={token}
                    onDelete={deleteHandler}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-richblack-200 text-2xl mt-48 text-center ">
                Looks like you haven't created any courses yet. Get started
                today!
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;
