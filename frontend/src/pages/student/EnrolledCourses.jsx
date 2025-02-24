import React, { useEffect, useState } from "react"
import EnrolledCourseCard from "../../components/student/EnrolledCourseCard";
import EnrolledCourseCardSmall from "../../components/student/EnrolledCourseCardSmall";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../services/courseAPI";

const EnrolledCourses = () => {

  const token = useSelector((state)=> state.auth.token);
  const [courses, setCourses] = useState([]); 

  useEffect(()=>{

    const fetchCourses = async ()=>{
      const response = await getEnrolledCourses(token);

      if(response.status === 200)
      {
          setCourses(response.data.data);
      }
    }
    fetchCourses();
    

  },[token])

  useEffect(()=>{
    console.log('courses :>> ', courses);
  }, [courses])





  return (
    <div className=" w-full flex justify-center items-center">
    <div className=" text-white mt-16 min-h-screen h-auto w-full lg:w-[1200px] ">
      <div className=" flex justify-between px-5 pt-10">
        <h1 className=" text-[#F1F2FF] font-semibold text-[25px] lg:text-[30px] ">
          Enrolled Courses
        </h1>
        
      </div>

      <div className=" hidden lg:block">
        {courses.length > 0 ? (
          <div className="flex justify-center items-center flex-col mt-10">
            {courses.map((course) => (
              <EnrolledCourseCard
                key={course._id}
                course={course}
                token={token}
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
            {courses.map((course) => (
              <EnrolledCourseCardSmall 
                key={course._id}
                course={course}
                token={token}
                
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
  )
};

export default EnrolledCourses;
