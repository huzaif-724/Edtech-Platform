import React from "react";
import img from "../assets/work-in-progress.png"

const Setting = () => {
  return (
    <div className=" min-h-screen bg-richblack-900 flex justify-center items-center flex-col">
      <img src={img} width={400} />

      <h1 className=" text-white text-4xl">Coming Soon...</h1>
    </div>
  );
};

export default Setting;
