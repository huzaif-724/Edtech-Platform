import React, { useEffect } from "react";
import { MdDone } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetCourseState } from "../../slices/courseSlice";
import { deleteCourse } from "../../services/courseAPI";



const PublishCourse = () => {

const token = useSelector((state)=> state.auth.token)
const courseDetails = useSelector((state)=>state.course.course);
const dispatch = useDispatch();

const navigate = useNavigate();

useEffect(()=>{

    if(!courseDetails)
    {
       navigate("/dashboard/add-course");
       return;
    }

},[])

const courseId = courseDetails?._id;


const publishHandler = () => {

    const toastId = toast.loading("Publishing...");
  
    setTimeout(() => {
     navigate("/dashboard/my-courses");
      toast.dismiss(toastId);
      toast.success("Published successfully!");
      dispatch(resetCourseState()); 
    }, 2000);
  };

  const cancelPublished = async ()=>{

      const response = await deleteCourse(courseId, token);

      if (response.data.success) {
        navigate("/dashboard/my-courses")
      }

  }





  return (
    <div className=" min-h-screen flex flex-col h-auto pt-20 mt-12 mx-auto w-[90%]     gap-5  ">
      <div className=" flex items-center  mx-auto w-[90%] lg:w-[50%]  lg:pl-28 ">
        <div className=" flex flex-col">
          <div className=" w-[40px] h-[40px] rounded-full bg-[#FFD60A] border border-[#251400] text-richblack-900 text-[25px] flex justify-center items-center">
            <MdDone />
          </div>
        </div>

        <div className="w-[33%] border-dashed border-b-2 border-[#FFD60A]"></div>

        <div className=" w-[40px] h-[40px] rounded-full bg-[#FFD60A] border border-[#251400] text-richblack-900 text-[25px] flex justify-center items-center">
          <MdDone />
        </div>
        <div className="w-[33%] border-dashed border-b-2 border-[#FFD60A]"></div>
        <div className=" w-[40px] h-[40px] rounded-full bg-[#251400] border border-[#FFD60A] text-[#FFD60A] text-[18px] flex justify-center items-center">
          3
        </div>
      </div>

      <div className=" flex  justify-center gap-4 mt-14  ">
        <div className="w-[98%] lg:w-[40%] rounded-2xl  h-[200px] bg-richblack-800 ">
          <h1 className=" text-[#F1F2FF] font-semibold text-[24px] py-5 px-5">
            Publish Settings
          </h1>

        <p className=" text-richblack-50 ml-5">Make this Course Public</p>

          <div className=" flex gap-5 mt-8">
            <button className="ml-5  gap-2 bg-richblack-900 py-3 px-3 rounded-lg border border-richblack-500 text-richblack-50"
            onClick={cancelPublished}
            >
              Cancel
            </button>
            <button className=" mr-5  gap-2 bg-yellow-200 text-[#000814] py-2 px-3 rounded-lg border border-richblack-500"
             onClick={publishHandler}>
              Save and Publish
            </button>
          </div>
        </div>

        <div className=" w-[400px] ml-20 rounded-2xl h-[350px] p-5 bg-richblack-800 hidden lg:block">
          <h1 className=" text-white font-semibold text-xl">
            ⚡Course Upload Tips
          </h1>
          <p className=" text-richblack-100  pl-5 text-[15px] ">
            ‣ Set the Course Price option or make it free.
            <br /> ‣ Standard size for the course thumbnail is 1024x576. <br />‣
            Video section controls the course overview video.
            <br />‣ Course Builder is where you create & organize a course.{" "}
            <br />
            ‣ Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
            <br />‣ Information from the Additional Data section shows up on the
            course single page.
            <br />‣ Make Announcements to notify any important
            <br />‣ Notes to all enrolled students at once.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;
