const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  //auth
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login", 

  //course
  GET_ALL_COURSES_API : BASE_URL + "/course/getAllCourses",
  GET_COURSE_DETAILS : BASE_URL + "/course/getCourseDetails",
  CREATE_COURSE_API : BASE_URL + "/course/createCourse",
  DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAIL : BASE_URL + "/course/getFullCourseDetails",

  //instructor
  GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",

  //student
  GET_ENROLLED_COURSES : BASE_URL + "/course/getEnrolledCourses",


  //category
  GET_ALL_CATEGORIES : BASE_URL + "/course/showAllCategories",

  //section
  ADD_SECTION_API : BASE_URL +"/course/createSection",
  DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
  UPDATE_SECTION_API : BASE_URL + "/course/updateSection",

  //SubSection
  CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
  DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
  




}