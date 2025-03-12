import axios from "axios";
import { endpoints } from "./api";
import toast from "react-hot-toast";

const { LOGOUT_API } = endpoints;

export const logoutUser = async () => {
  try {
    const response = await axios.post(LOGOUT_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    //console.log("error :>> ", error);
  }
};
