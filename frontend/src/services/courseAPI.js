import axios from "axios";
import { endpoints } from "./api";
import toast from "react-hot-toast";
import { setLoading } from "../slices/authSlice";

const {
  GET_ALL_CATEGORIES,
  CREATE_COURSE_API,
  ADD_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  GET_INSTRUCTOR_COURSES,
  DELETE_COURSE_API,
  DELETE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  GET_ENROLLED_COURSES,
  GET_FULL_COURSE_DETAIL,
} = endpoints;

//Course
//Create Course
export const createCourse = async (token, formData) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await axios.post(CREATE_COURSE_API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course Details Added Successfully");
    result = response?.data;
  } catch (error) {
    console.log("error :>> ", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

//Get Instructor Courses
export const fetchInstructorCourses = async (token, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  let result = null;

  try {
    const response = await axios.get(GET_INSTRUCTOR_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // console.log("response", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.log("Fechting courses error............", error.response || error);
    toast.error(error.response?.data?.message || "Could Not Fetch Courses");
  }

  toast.dismiss(toastId);
  dispatch(setLoading(false))
  return result;
};

//Fetch Enrolled Courses
export const getEnrolledCourses = async(token, dispatch)=>{

  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  let result = null;

  try {
    const response = await axios.get(GET_ENROLLED_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    //console.log('response :>> ', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response;
  } catch (error) {
    console.log("Fechting courses error............", error.response || error);
    toast.error(error.response?.data?.message || "Could Not Fetch Courses");
  }

  toast.dismiss(toastId);
  dispatch(setLoading(false));
  return result;

}

// Get Full Course Details

export const fetchEnrolledCourse = async (courseId, token, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  let result;
  try {

    const response = await axios.get(GET_FULL_COURSE_DETAIL, {
      params: { courseId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    

    //console.log("Enrolled Course Details Response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response;

  } catch (error) {
    console.log("Fetching course error:", error.response || error);
    toast.error(error.response?.data?.message || "Could Not Fetch Course");
  }
  toast.dismiss(toastId);
  dispatch(setLoading(false));
  return result;
};

// Delete Course
export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await axios.delete(DELETE_COURSE_API, {
      data: { courseId }, // Pass courseId inside the data object
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    //console.log("Course Delete Response", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response;
    toast.success("Course Deleted Successfuly")
  } catch (error) {
    console.log("Deleting courses error............", error.response || error);
    toast.error(error.response?.data?.message || "Could Not Delete Courses");
  }

  toast.dismiss(toastId);
  return result;
};


//Category
//Get All Getogory
export const fetchCategories = async () => {
  let result = [];
  try {
    const response = await axios.get(GET_ALL_CATEGORIES);

    // console.log("category :>> ", response.data.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;

    // console.log("result :>> ", result);
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
  }

  return result;
};

//Section
//Create Section
export const createSection = async (sectionName, courseId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(
      ADD_SECTION_API,
      {
        sectionName,
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Section Added Successfully");
    result = response;
  } catch (error) {
    console.log("error :>> ", error);
  }

  toast.dismiss(toastId);
  return result;
};


//Delete Section
export const deleteSection = async (sectionId, courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.post(
      DELETE_SECTION_API,
      { sectionId, courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Section Deleted Successfully");
  } catch (error) {
    console.log("error :>> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

//editSection
export const editSection = async(sectionName, sectionId, courseId, token)=>{

  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(
      UPDATE_SECTION_API,
      {
        sectionName,
        sectionId,
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Section Added Successfully");
    result = response;
  } catch (error) {
    console.log("error :>> ", error);
  }

  toast.dismiss(toastId);
  return result;
   
}

//SubSection
//Create Subsection
export const addSubsection = async (formData, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await axios.post(CREATE_SUBSECTION_API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    // console.log("response :>> ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Lecture Added Successfully");
    result = response;
  } catch (error) {
    console.log("error :>> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Update SubSection
export const editSubsection = async (formData, token)=>{

  const toastId = toast.loading("Loading...");
  let result = null;

  try{
    const response = await axios.post(UPDATE_SUBSECTION_API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    //console.log('upadte subsection response :>> ', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Lecture Updated Successfully");
    result = response;

  }
  catch(error)
  {
    console.log("error :>> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;

}


//Delete Subsection
export const deleteSubsection = async (subSectionId, sectionId, token)=>{

  const toastId = toast.loading("Loading...");
  let result = null;

  try{

    const response = await axios.post(DELETE_SUBSECTION_API, 
      {
        subSectionId, 
        sectionId
      },
      {
        headers : {
          Authorization : `Bearer ${token}`,
        },
        withCredentials : true,
      });

      // console.log('delete subsection response :>> ', response);
      toast.success("Lecture Deleted Successfully");
      result = response;

  }
  catch(error)
  {
    console.log("error :>> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}