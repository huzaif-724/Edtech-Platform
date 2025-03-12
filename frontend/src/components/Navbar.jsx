import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleDashboard } from "../slices/authSlice";
import logo from "../assets/Logo-Full-Light.png";
import menuIcon from "../assets/menu.svg";
import closeIcon from "../assets/close.svg";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  return (
    <>
      <div className="flex h-16 z-30 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700 top-0 fixed w-full">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="object-contain lg:w-8 w-7" />
              <p className="lg:text-xl text-lg font-semibold text-white">SmartLearn</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            {token ? (
              <>
                <button
                  className="rounded-md px-4 py-2 bg-richblack-900 text-white hover:bg-yellow-50 hover:scale-95 hover:text-richblack-900 transition-all duration-200"
                  onClick={() => dispatch(toggleDashboard())}
                >
                  Dashboard
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You will be logged out of your account.",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => {
                        dispatch(logout());
                        setConfirmationModal(false);
                        navigate("/");
                      },
                      btn2Handler: () => setConfirmationModal(false),
                    })
                  }
                  className="rounded-md px-4 py-2 bg-richblack-900 text-white hover:bg-yellow-50 hover:scale-95 hover:text-richblack-900 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button  className="rounded-md px-4 py-2 bg-richblack-900 text-white hover:bg-yellow-50 hover:scale-95 hover:text-richblack-900 transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md px-4 py-2 bg-richblack-900 text-white hover:bg-yellow-50 hover:scale-95 hover:text-richblack-900 transition-all duration-200">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden relative">
            <img
              src={toggle ? closeIcon : menuIcon}
              alt="menu"
              className="h-7 w-7 cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />

            {/* Mobile Dropdown Menu */}
            {toggle && (
              <div className="absolute right-0 top-12 z-10 w-40 rounded-lg bg-richblack-800 p-4 shadow-lg">
                <ul className="flex flex-col gap-4">
                  {token ? (
                    <>
                      <li>
                        <button
                          className="w-full text-left text-white hover:text-gray-400"
                          onClick={() => {
                            dispatch(toggleDashboard());
                            setToggle(false);
                          }}
                        >
                          Dashboard
                        </button>
                      </li>
                      <li>
                      <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You will be logged out of your account.",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => {
                        dispatch(logout());
                        setConfirmationModal(false);
                        navigate("/");
                      },
                      btn2Handler: () => setConfirmationModal(false),
                    })
                  }
                  className="w-full text-left text-white hover:text-gray-400"
                >
                  Logout
                </button>
                      </li>
                    </>
                  ) : (
                    <> 
                      <li>
                        <Link
                          to="/login"
                          className="text-white hover:text-gray-400"
                          onClick={() => setToggle(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className="text-white hover:text-gray-400"
                          onClick={() => setToggle(false)}
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Navbar;
