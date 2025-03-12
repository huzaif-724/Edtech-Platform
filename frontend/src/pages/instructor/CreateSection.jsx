import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { createSection } from "../../services/courseAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InstructorSection from "../../components/Instructor/InstructorSection";
import { removeSection, setSections } from "../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";

const CreateSection = () => {
  const courseDetails = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);
  const sections = useSelector((state) => state.course.sections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [section, setSection] = useState({
    sectionName: "",
  });

  const { sectionName } = section;

  useEffect(() => {
    if (courseDetails === null) {
      toast.error("Enter Course Details");
      navigate("/dashboard/add-course");
      return;
    }
  }, []);

  const courseId = courseDetails?._id;

  const onChangeHandler = (e) => {
    setSection((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await createSection(sectionName, courseId, token);

    if (response.status === 200) {
      //console.log("response :>> ", response);

      dispatch(setSections(response.data.updatedCourse.courseContent));

      setSection({ sectionName: "" });
    }
  };

  const deleteHandler = (sectionId) => {
    dispatch(removeSection(sectionId));
  };

  return (
    <div className=" min-h-screen flex flex-col h-auto pt-20 mt-12 mx-auto w-[90%]     gap-5  ">
      <div className=" flex items-center  mx-auto w-[90%] lg:w-[50%]  lg:pl-28 ">
        <div className=" flex flex-col">
          <div className=" w-[40px] h-[40px] rounded-full bg-[#FFD60A] border border-[#251400] text-richblack-900 text-[25px] flex justify-center items-center">
            <MdDone />
          </div>
        </div>

        <div className="w-[33%] border-dashed border-b-2 border-[#FFD60A]"></div>

        <div className=" w-[40px] h-[40px] rounded-full bg-[#251400] border border-[#FFD60A] text-[#FFD60A] text-[18px] flex justify-center items-center">
          2
        </div>
        <div className="w-[33%] border-dashed border-b-2 border-[#424854]"></div>
        <div className=" w-[40px] h-[40px] rounded-full bg-[#161D29] border border-[#2C333F] text-[#838894] text-[18px] flex justify-center items-center">
          3
        </div>
      </div>

      <div className=" flex  justify-center gap-4 mt-14  ">
        <div className="w-[98%] lg:w-[40%]   min-h-[400px] h-auto">
          <h1 className=" text-[#F1F2FF] font-semibold text-[24px]">
            Course Builder
          </h1>

          <div>
            {sections.length > 0 &&
              sections.map((sec) => (
                <InstructorSection
                  key={sec._id}
                  sectionId={sec._id}
                  name={sec.sectionName}
                  subsections={sec.subSection}
                  onDelete={deleteHandler}
                  courseId={courseId}
                  token={token}
                />
              ))}
          </div>

          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-y-6 mt-6  "
          >
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Section Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="sectionName"
                name="sectionName"
                value={sectionName}
                onChange={onChangeHandler}
                placeholder="Add a section to build your course"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

           <div className=" flex justify-between">
           <button
              type="submit"
              className="bg-[#161D29] w-[170px] text-[#FFD60A] border border-[#FFD60A] flex justify-between items-center  font-medium py-4 px-4 rounded-md  transition-all"
            >
              <FaPlus /> <p>Create Section</p>
            </button>

            <button
              
              className="bg-[#161D29] w-[100px] text-[#FFD60A] border border-[#FFD60A] flex justify-between items-center h-[50px] font-medium py-4 px-4 rounded-md  transition-all"
              onClick={()=> navigate("/dashboard/publish-course")}
            >
              <p>Next</p> <MdNavigateNext />
            </button>
           </div>

          </form>
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

export default CreateSection;
