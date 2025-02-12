import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { endpoints } from "../services/api";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const { GET_ALL_COURSES_API } = endpoints;

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = useSelector((value) => value.auth.token);
  const navigate = useNavigate();

  useEffect(()=>{

    if(token === null)
    {
       navigate("/login")
    }

  }, [])

  useEffect(() => {
    const toastId = toast.loading("Loading...");

    async function fetchCourses() {
      try {
        const response = await axios.get(GET_ALL_COURSES_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        });

        console.log("response :>> ", response);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        setCourses(response.data.data);
      } catch (error) {
        console.log(
          "Fechting courses error............",
          error.response || error
        );
        toast.error(error.response?.data?.message || "Could Not Fetch Courses");
      }

      toast.dismiss(toastId);
    }

    fetchCourses();
  }, []);

  return (
    <div className="bg-richblack-900 min-h-screen w-[90%] mx-auto flex flex-col items-center px-4 py-8">
      <div
        className= " flex flex-col gap-10 pt-36 lg:flex-row flex-wrap "
      
      >
        {/* Rendering Courses */}
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            courseId={course._id}
            category={course.category.name}
            price={course.price}
            thumbnail={course.thumbnail}
            instructor={course.instructor.name}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
