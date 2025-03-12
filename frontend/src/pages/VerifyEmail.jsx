import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { endpoints } from "../services/api";

const { SIGNUP_API, SENDOTP_API } = endpoints;

const VerifyEmail = () => {
  const [otp, setOtp] = useState(null);
  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { accountType, name, email, password, confirmPassword } = signupData;

    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.post(SIGNUP_API, {
        email: email,
        name: name,
        accountType: accountType,
        password: password,
        confirmPassword: confirmPassword,
        otp: otp,
      });

      //console.log("response :>> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      //console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    toast.dismiss(toastId);
  };

  const resendHandler = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.post(SENDOTP_API, {
        email: signupData.email,
      });
      //console.log("response :>> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
    } catch (error) {
      //console.log("SENDOTP API ERROR............", error.response || error); // Log the full error response
      toast.error(error.response?.data?.message || "Could Not Send OTP");
    }

    toast.dismiss(toastId);
  };

  return (
    <div className="bg-richblack-900 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full sm:w-[90%] md:w-[80%] lg:w-[400px] px-4">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>

        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 text-center">
          A verification code has been sent to you. Enter the code below
        </p>

        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col gap-y-4"
        >
          <div className="flex gap-x-4">
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="form-input w-full text-white border border-richblack-600 bg-richblack-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between w-full text-sm">
          <Link to="/signup">
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            className="flex items-center text-blue-100 gap-x-2"
            onClick={resendHandler}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
