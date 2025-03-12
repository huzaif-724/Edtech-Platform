import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Tab from "../components/Tab";
import signupImage from "../assets/signupImage.png";
import axios from "axios";
import { endpoints } from "../services/api";
import { setToken, setUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const { LOGIN_API } = endpoints;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
  };

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.post(LOGIN_API, {
        email: email,
        password: password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      //console.log("response :>> ", response.data.user);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      toast.success("Logged In");
      navigate("/allCourses");
    } catch (error) {
      //console.log("error :>> ", error);
      toast.error(error.response?.data?.message || "Login Failed");
    }

    toast.dismiss(toastId);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className=" w-full min-h-screen lg:h-screen pt-24 lg:pt-10 bg-richblack-900 flex justify-center items-center lg:flex-row flex-col-reverse">
      <div className="bg-richblack-900 p-6 rounded-lg shadow-lg max-w-lg mx-auto lg:w-[450px]">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Welcome Back
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">Discover your passions,</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              Be Unstoppable
            </span>
          </p>
        </div>

        {/* Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        {/*Heading */}

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6 mt-6">
          {/* Email */}
          <label>
            <p className="text-sm font-medium text-richblack-5 mb-2">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
            />
          </label>

          {/* Password & Confirm Password */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Password */}
            <label className="relative w-full">
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer hover:text-yellow-50"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-yellow-50 text-richblack-900 font-medium py-2 px-4 rounded-md hover:bg-yellow-100 transition-all"
          >
            Log in
          </button>
        </form>
      </div>

      <div>
        <img
          src={signupImage}
          alt=""
          width={600}
          height={500}
          className=" mr-20"
        />
      </div>
    </div>
  );
};

export default Login;
