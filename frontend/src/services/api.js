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

  //instructor
  GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",

  //category
  GET_ALL_CATEGORIES : BASE_URL + "/course/showAllCategories",

  //section
  ADD_SECTION_API : BASE_URL +"/course/createSection",
  DELETE_SECTION_API : BASE_URL + "/course/deleteSection",

  //SubSection
  CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
  
  




}