import React, { useEffect, useState } from "react"
import {useSelector} from "react-redux";
import { endpoints } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { VscAdd } from "react-icons/vsc"
import InstructorCourseCard from "../../components/InstructorCourseCard";

const {GET_INSTRUCTOR_COURSES} = endpoints;

const MyCourses = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const token = useSelector((state)=> state.auth.token);
    
    useEffect(()=>{

        if(token === null)
        {
            navigate("/login")
        }

    }, [])

    useEffect(()=>{

        const toastId = toast.loading("Loading...");

        const fetchCourses = async ()=>{

            try{
                const response = await axios.get(GET_INSTRUCTOR_COURSES,  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,} );
    
                    console.log("response", response)
    
                if(!response.data.success)
                {
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

       



    }, [])

    console.log('courses :>> ', courses);

  return (
    <div className=" w-full flex justify-center items-center">
        <div className=" text-white mt-16 min-h-screen h-auto w-full lg:w-[1200px] ">
            <div className=" flex justify-between px-5 pt-10">
                <h1 className=" text-[#F1F2FF] font-semibold text-[25px] lg:text-[30px] ">My Courses</h1>
                <button className="CTAbutton flex justify-center items-center gap-2 text-[15px]" ><p>New</p> <VscAdd /> </button>
            </div>
        
        <div className=" hidden lg:block">
        {
                courses.length > 0 ? (

                    <div className="flex justify-center items-center flex-col mt-10"> 
                        {
                            courses.map((course)=>(

                                <InstructorCourseCard 
                                key={course._id}
                                course = {course}
                                />

                            ))
                        }
                    </div>

                ):
                (
                    <p className="text-richblack-200 text-2xl mt-48 text-center ">
                        Looks like you haven’t created any courses yet. Get started today!
                    </p>
                )
                    

            }
        </div>

        <div className=" block lg:hidden">
        {
                courses.length > 0 ? (

                    <div className="flex justify-center items-center flex-col mt-10"> 
                        {
                            courses.map((course)=>(

                                <InstructorCourseCard 
                                key={course._id}
                                course = {course}
                                large = {true}
                                />

                            ))
                        }
                    </div>

                ):
                (
                    <p className="text-richblack-200 text-2xl mt-48 text-center ">
                        Looks like you haven’t created any courses yet. Get started today!
                    </p>
                )
                    

            }
        </div>



           

           
            


    </div>
    </div>
  )
};

export default MyCourses;
