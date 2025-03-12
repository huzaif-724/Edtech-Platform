import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tab from "../components/Tab";
import { setSignupData, setLoading } from "../slices/authSlice";
import signupImage from "../assets/signupImage.png";
import axios from "axios";
import { endpoints } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SENDOTP_API } = endpoints;

  const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
  };

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));

    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.post(SENDOTP_API, { email: formData.email });
      //console.log("response :>> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      //console.log("SENDOTP API ERROR............", error.response || error); // Log the full error response
      toast.error(error.response?.data?.message || "Could Not Send OTP");
    }

    toast.dismiss(toastId);

    // Reset
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
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
      <div className="bg-richblack-900 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Welcome!!
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">Empower Your Learning,</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              Shape Your Future
            </span>
          </p>
        </div>
        {/* Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6 mt-6">
          {/* Name */}
          <label>
            <p className="text-sm font-medium text-richblack-5 mb-2">
              Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
            />
          </label>

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
                Create Password <sup className="text-pink-200">*</sup>
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

            {/* Confirm Password */}
            <label className="relative w-full">
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer hover:text-yellow-50"
              >
                {showConfirmPassword ? (
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
            Create Account
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

export default Signup;
