import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEnrolledCourse } from "../../services/courseAPI";
import Section from "../../components/student/Section";

const CourseContent = () => {
  const token = useSelector((state) => state.auth.token);
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [subSection, setSubSection] = useState();

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetchEnrolledCourse(courseId, token);
        if (response.status === 200) {
          const courseData = response.data.data.courseDetails;
          setCourse(courseData);
          if (
            courseData.courseContent?.length > 0 &&
            courseData.courseContent[0].subSection?.length > 0
          ) {
            setSelectedVideo(
              courseData.courseContent[0].subSection[0].videoUrl
            );
            setSubSection(courseData.courseContent[0].subSection[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId, token]);

  const handleVideoClick = (subSec) => {
    setSelectedVideo(subSec.videoUrl);
    setSubSection(subSec);
  };

  return (
    <div className=" min-h-screen h-auto flex flex-col-reverse md:flex-row gap-4 w-full">
      <div className=" w-[95%] mx-auto md:w-[40%] lg:w-[25%] min-h-screen lg:bg-richblack-800 ">
        <h1 className=" text-white hidden md:block  md:pt-24 text-[18px] font-bold pl-5">
          {course?.title}
        </h1>
        <div className="  md:w-[90%] mx-auto lg:pt-4 hidden  lg:flex items-center border-b-2 border-richblack-700"></div>
        <div className=" md:pt-5 ">
          {course?.courseContent.map((section) => (
            <Section
              key={section._id}
              section={section}
              isActive={isActive}
              handleActive={handleActive}
              handleVideoClick={handleVideoClick}
              selectedSubSec = {subSection}
            />
          ))}
        </div>
      </div>

      <div className=" md:hidden block pt-3">
        <h1 className=" text-white pl-5">{subSection?.title}</h1>
        <p className=" pl-5 text-richblack-400">{subSection?.description}</p>
      </div>

     <div className=" w-full">
        <div className="w-[100%] flex-col mx-auto md:mt-16 lg:mt-20 sm:h-[300px] md:h-[400px] lg:h-[600px] flex justify-center items-center">
            {selectedVideo ? (
              <video
                key={selectedVideo}
                src={selectedVideo}
                controls
                // autoPlay
                controlsList="nodownload"
                className="w-full max-w-[95%] aspect-video max-h-[590px] bg-black border border-richblack-800 rounded-lg"
              />
            ) : (
              <p className="text-white text-lg">Select a lecture to watch</p>
            )}
          </div>

          <div className=" hidden md:block lg:pt-3 lg:pl-4 lg:mb-6 lg:w-[80%]">
        <h1 className=" text-white pl-5">{subSection?.title}</h1>
        <p className=" pl-5 text-richblack-400">{subSection?.description}</p>
      </div>


     </div>
      

      <h1 className=" text-white md:hidden block pt-24 mb-2 text-[18px] font-bold pl-5">
        {course?.title}
      </h1>
    </div>
  );
};

export default CourseContent;
