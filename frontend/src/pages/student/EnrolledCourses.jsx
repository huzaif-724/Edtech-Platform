import React, { useEffect, useState } from "react";
import EnrolledCourseCard from "../../components/student/EnrolledCourseCard";
import EnrolledCourseCardSmall from "../../components/student/EnrolledCourseCardSmall";
import { useSelector, useDispatch } from "react-redux";
import { getEnrolledCourses } from "../../services/courseAPI";
import Footer from "../../components/Footer";

const EnrolledCourses = () => {
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getEnrolledCourses(token, dispatch);

      if (response?.data.success) {
        setCourses(response.data.data);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    //console.log("courses :>> ", courses);
  }, [courses]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className=" w-full flex justify-center items-center">
        <div className=" text-white mt-16 min-h-screen h-auto w-full lg:w-[1200px] mb-12 ">
          <div className=" flex justify-between px-5 pt-10">
            <h1 className=" text-[#F1F2FF] font-semibold text-[25px] lg:text-[30px] ">
              Enrolled Courses
            </h1>
          </div>

          <div className=" hidden lg:block">
            {courses.length > 0 ? (
              <div className="flex justify-center items-center flex-col mt-10">
                {courses.map((course, index) => (
                  <EnrolledCourseCard
                    key={course._id}
                    course={course}
                    token={token}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-richblack-200 text-2xl mt-48 text-center ">
                No courses found
              </p>
            )}
          </div>

          <div className=" block lg:hidden">
            {courses.length > 0 ? (
              <div className="flex justify-center items-center flex-col mt-10 gap-10">
                {courses.map((course, index) => (
                  <EnrolledCourseCardSmall
                    key={course._id}
                    course={course}
                    token={token}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-richblack-200 text-2xl mt-48 text-center ">
                No courses found
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EnrolledCourses;
