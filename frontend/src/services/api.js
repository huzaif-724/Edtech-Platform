const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login", 

  GET_ALL_COURSES_API : BASE_URL + "/course/getAllCourses",
  GET_COURSE_DETAILS : BASE_URL + "/course/getCourseDetails",
  CREATE_COURSE_API : BASE_URL + "/course/createCourse",

  GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",

  GET_ALL_CATEGORIES : BASE_URL + "/course/showAllCategories"
  
  




}