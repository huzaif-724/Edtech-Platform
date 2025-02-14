import axios from "axios";
import { endpoints } from "./api";
import toast from "react-hot-toast";

const { GET_ALL_CATEGORIES, CREATE_COURSE_API } = endpoints;

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

export const createCourse = async (token, formData) => {
  const toastId = toast.loading("Loading...")
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

    toast.success("Course Details Added Successfully")
    result = response?.data;
    

  } catch (error) {
    console.log("error :>> ", error);
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result;
};
