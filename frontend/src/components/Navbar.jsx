import React, { useState } from "react";
import logo from "../assets/edtechLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, toggleDashboard } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="flex h-16 z-30 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700 top-0 fixed w-full">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={70} height={32} />
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <button className="rounded-md border  px-1 py-2 border-none bg-richblack-900  lg:px-4 lg:py-2 text-white hover:bg-blue-800"
              onClick={()=> dispatch(toggleDashboard())}>
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-md border px-1 py-2 border-none bg-richblack-900  lg:px-4 lg:py-2 text-white hover:bg-blue-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-md border px-2 py-2 border-none bg-richblack-900   lg:px-4 lg:py-2 text-white hover:bg-blue-800">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border px-2 py-2 border-none bg-richblack-900  lg:px-4 lg:py-2 text-white hover:bg-blue-800">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
